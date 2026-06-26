/** 動態回合引擎：玩家行動 → 輸入治理 → 數值結算 → 時間推進 → 世界演化 → 敘事 → 提醒/記憶。 */
import type {
  FanrenWorldState,
  MemoryEntry,
  NpcReaction,
  PartyState,
  TurnChoice,
  TurnResult,
} from '../types';
import { advanceTime, dayToChapter, dayToGameTime, daysForScale } from './clock';
import { isLocalRosterQuery, parseIntent } from './keywordRouter';
import { govern, violationFeedback } from './governor';
import { AWAKEN_NAMES, regenGoldenFinger, useGoldenFinger } from './goldenFinger';
import { evolveWorld } from './worldEvolution';
import { allLocationNames, allNpcNames, eventsInWindow, getEvent, getNpc, getRegion, realmRank, resolveNpcAtDay, spoilerBudget } from './daoyuanLoader';
import { generateRegion, isUnknownDestination } from './worldExpansion';
import { buildReminders, makeMemory, recall } from './reminderRecall';
import { catalyzeHerb, rollExploreLoot, type ItemGrant } from './loot';
import { applyTrigger, matchActivation } from './mechanics';
import { planTravel, rollTravelEncounter, humanizeDays, realmScale, type TravelPlan } from './travel';
import { gateForLocation } from './mapGate';
import { cultivationLingMaiMult } from './lingMai';
import { findSectByName } from './sect';
import { isAtSectHome, sectHomeName } from './sectRitual';
import { canLearnTechnique } from './techniqueSource';
import { discoverAround, initialDiscoveries, labelFor } from './mapDiscovery';
import { npcAvailability, presentNpcs, presentNpcsHere } from './npcAvailability';
import { settleLoot, willingToJoin, transmitInRange } from './party';
import { findAvailableOpportunity, magnitudeLabel } from './cascade';
import { resolveBaiYi, practiceBaiYi, isMakingProduct, rankName } from './baiyi';
import { findTechniqueByName } from '../data/techniques';
import { foundOrganization, growOrganizations } from './organizations';
import { abodeCultivationBonus } from './abode';
import { genMonster, genNpc, genFaction, genItem } from './procGen';
import { sectSiteOf } from './sectSites';
import { tickDemographics } from './demographics';
import { tickCensus } from './census';
import { rollQiDeviation } from './qiDeviation';
import { comprehensionMult, daoHeartResist, travelSpeedMult, fleeChance } from './aptitude';
import { realmCultDifficulty, getRealmIndex, majorRealmRank } from './realm';
import { narrate } from './gmService';

export interface TurnContext {
  world: FanrenWorldState;
  player: {
    name: string;
    realm: string;
    realmType: string; // 純境界（RealmType 列舉值），供戰鬥敵人生成
    exp: number;
    maxExp: number;
    hp: number;
    maxHp: number;
    spiritStones: number;
    lifespan: number;
    luck: number;
    cultivationMult: number; // 由靈根決定的修煉倍率
    comprehension?: number; // 悟性（1-100）：影響修煉效率
    daoHeart?: number; // 心性／道心（1-100）：影響走火入魔抗性
    agility?: number; // 速度稟賦（0-100）：旅行加速、逃離追殺
    spirit?: number; // 神識：遠程鎖定先機與術法威能
    attack?: number; // 攻擊：近戰威能（與神識比較判斷遠/近取向）
    defense?: number; // 防禦（連續成長用）
    physique?: number; // 體魄（連續成長用）
    speed?: number; // 速度（連續成長用）
    inventoryNames: string[];
  };
}

/** 觸發既有回合制戰鬥的請求（由 worldStore 接 openTurnBasedBattle）。 */
export interface BattleTrigger {
  realmMinRealm: string; // 敵人境界（RealmType）
  riskLevel: '低' | '中' | '高' | '极度危险';
  context: string; // 戰鬥緣由（敘事用）
  divergenceEventId?: string; // 若為正史介入戰鬥
}

export interface PlayerDeltas {
  exp?: number;
  hp?: number;
  spiritStones?: number;
  lifespan?: number; // 年
  attack?: number;
  defense?: number;
  spirit?: number;
  physique?: number;
  speed?: number;
  maxHp?: number;
  luck?: number;
}

/** 在某時機執行玩家所有機制，合併到 deltas，回傳業力/修煉加成/敘事。 */
function runMechHook(
  mechanics: any[],
  on: any,
  ctx: { day: number; maxHp: number },
  deltas: PlayerDeltas
): { karma: number; cultMult: number; narrative: string } {
  let karma = 0;
  let cultMult = 0;
  const notes: string[] = [];
  for (const spec of mechanics) {
    const r = applyTrigger(spec, on, ctx);
    if (!r.applied) continue;
    for (const k of Object.keys(r.deltas) as (keyof PlayerDeltas)[]) deltas[k] = (deltas[k] || 0) + (r.deltas as any)[k];
    karma += r.karma;
    cultMult += r.cultivationMultBonus;
    if (r.narrative) notes.push(`〔${spec.name}〕${r.narrative}`);
  }
  return { karma, cultMult, narrative: notes.join('；') };
}

export interface TurnOutcome {
  result: TurnResult;
  worldPatch: Partial<FanrenWorldState>;
  playerDeltas: PlayerDeltas;
  newMemory?: MemoryEntry;
  battle?: BattleTrigger; // 若本回合應開啟回合制戰鬥
  itemsGranted?: ItemGrant[]; // 本回合落地到背包的物品
  sectJoin?: { sectId: string; viaItem?: string }; // 敘事中拜入宗門 → 由 worldStore 落地為真實師門（劇情/AI 結合）
}

function cultivateExpPerDay(maxExp: number, mult: number): number {
  return Math.max(1, (maxExp * 0.0008) * mult);
}

function describeLocalRoster(world: FanrenWorldState, currentDay: number): string {
  const place = getRegion(world.currentLocationId)?.name || world.currentLocationId;
  const nearby = presentNpcsHere(world, currentDay, 12);
  const lines = nearby.map((npc) => `· ${npc.name}（${npc.realm || '境界不明'}${npc.activity ? `，${npc.activity.slice(0, 42)}` : ''}）`);
  const sect = findSectByName(place);

  if (lines.length) {
    const background = sect
      ? `\n此外，${sect.name}中尚有不少${sect.ranks.slice(0, 3).map((rank) => rank.name).join('、')}往來；未通名者不逐一列出。`
      : '';
    return `【${place}・眼前人物】\n你只將神識在近處輕輕一掃，沒有驚動旁人。此刻能確認身分、可與你接觸的修士有：\n${lines.join('\n')}${background}`;
  }

  if (sect) {
    const ranks = sect.ranks.slice(0, 4).map((rank) => rank.name).join('、');
    return `【${place}・眼前人物】\n${place}並非無人，只是你初來乍到，眼前沒有能確認身分的具名修士。近處往來者多為${ranks}；若想找某一人，可直接說出姓名尋訪。`;
  }

  return `【${place}・眼前人物】\n你只將神識在近處輕輕一掃。此刻未發現能確認身分、且可與你接觸的具名修士；零星行人多收斂氣息，不宜僅憑一眼妄斷來歷。`;
}

/** 執行一個回合。永不拋錯。 */
export async function runTurn(rawText: string, ctx: TurnContext): Promise<TurnOutcome> {
  const w = ctx.world;
  const oldDay = w.clock.totalDays;
  const intent = parseIntent(rawText, {
    npcNames: allNpcNames(),
    locationNames: allLocationNames(),
    itemNames: ctx.player.inventoryNames,
  });
  const verdict = govern(rawText, intent, w.governorViolations);

  // ── 劇情進行中：功能與行動受限，須先做出抉擇 ──
  if (w.pendingChoice) {
    return {
      result: { narrative: '【劇情進行中】你正深陷局中，諸事須待眼前抉擇定奪——請先就劇情選項做出決斷，方能再有其他作為。', intent, verdict, daysElapsed: 0, worldEventsFired: [], npcReactions: [], logType: 'normal' },
      worldPatch: {},
      playerDeltas: {},
    };
  }

  // ── 越權：拒絕 ──
  if (verdict.decision === 'reject') {
    const isOoc = verdict.violationType === 'ooc';
    const violations = isOoc ? w.governorViolations : w.governorViolations + 1; // 出戲非作弊，不累計天道感應
    const feedback = isOoc ? `【此非此界之物】${verdict.reason}` : violationFeedback(verdict, violations);
    const gfRt = !isOoc && w.goldenFingerRuntime && verdict.sanctionKarma
      ? { ...w.goldenFingerRuntime, karma: w.goldenFingerRuntime.karma + verdict.sanctionKarma }
      : w.goldenFingerRuntime;
    const result: TurnResult = {
      narrative: feedback,
      intent,
      verdict,
      daysElapsed: 0,
      worldEventsFired: [],
      npcReactions: [],
      logType: 'danger',
    };
    return { result, worldPatch: { governorViolations: violations, goldenFingerRuntime: gfRt }, playerDeltas: {} };
  }

  // ── 純查詢類（不耗時）──
  // 在地人物查詢優先於所有模板路由，避免「看看／環視」被誤當成天下情報。
  if (isLocalRosterQuery(rawText)) {
    return {
      result: {
        narrative: describeLocalRoster(w, oldDay),
        intent,
        verdict,
        daysElapsed: 0,
        worldEventsFired: [],
        npcReactions: [],
        logType: 'normal',
      },
      worldPatch: {},
      playerDeltas: {},
    };
  }
  if (intent.type === 'inspect') {
    const reminders = buildReminders(w);
    const text = reminders.map((r) => `· ${r.text}`).join('\n');
    return {
      result: { narrative: `【打探天下消息】\n${text}`, intent, verdict, daysElapsed: 0, worldEventsFired: [], npcReactions: [], reminders, logType: 'normal' },
      worldPatch: {},
      playerDeltas: {},
    };
  }
  if (intent.type === 'recall') {
    // 僅以捕獲到的已知人/地名作檢索鍵；否則回顧重點往事
    const q = intent.targets[0];
    return {
      result: { narrative: recall(w.memory, q), intent, verdict, daysElapsed: 0, worldEventsFired: [], npcReactions: [], logType: 'special' },
      worldPatch: {},
      playerDeltas: {},
    };
  }

  // ── 決定耗時 ──
  let days = daysForScale(intent.durationScale, intent.durationDays);
  if (verdict.decision === 'reframe') days = Math.min(days, 7); // 被重構的行動先小步推進

  // ── 旅行：依境界遁速與距離預先規劃（須在推進時間前定案，以確保時鐘一致）──
  let travelPlan: TravelPlan | null = null;
  let travelTarget: string | undefined;
  let travelGateReason = ''; // 劇情閘攔阻（地點尚未開放/隱匿/需信物/需解封）
  if (intent.type === 'travel') {
    travelTarget = intent.targets.find((t) => getRegion(t)) || intent.targets[0];
    if (!travelTarget) {
      const m = intent.rawText.match(/(?:前往|趕往|去往|飛往|遁往|前去|去|往)\s*([^\s，。,.！!？?]{2,12})/);
      if (m) travelTarget = m[1].replace(/(探索|拜師|一帶|附近|看看|遊歷|歷練|去|的)+$/g, '').trim();
    }
    if (travelTarget && !isUnknownDestination(travelTarget)) {
      // 劇情閘：遠期/隱匿/需信物之地，當下不可前往
      const g = gateForLocation(travelTarget, w, ctx.player.inventoryNames);
      if (!g.accessible) {
        travelGateReason = g.reason;
        days = 0;
      } else {
        travelPlan = planTravel(w.currentLocationId, travelTarget, ctx.player.realmType, ctx.player.spiritStones, travelSpeedMult(ctx.player.agility ?? 0));
        if (travelPlan.mode === 'here' || travelPlan.mode === 'blocked' || (travelPlan.mode === 'teleport' && !travelPlan.feasible)) {
          days = 0; // 原地／受阻：不耗時
        } else if (travelPlan.mode === 'walk' || travelPlan.mode === 'fly' || travelPlan.mode === 'teleport') {
          days = travelPlan.days;
        }
      }
    }
  }

  const playerDeltas: PlayerDeltas = {};
  let mechanical = '';
  let worldPatch: Partial<FanrenWorldState> = {};
  let logType: TurnResult['logType'] = 'normal';
  let newLocationId = w.currentLocationId;
  let gfRuntime = w.goldenFingerRuntime;
  let memoryNote: { summary: string; tags: string[]; important: boolean } | null = null;
  let battle: BattleTrigger | undefined;
  let itemsGranted: ItemGrant[] | undefined;
  let sectJoinOut: { sectId: string; viaItem?: string } | undefined; // 敘事拜入 → worldStore 落地
  let mechKarma = 0;

  // 演繹引擎：複製機制（執行期會更新上限/累積），偵測主動施展（如吞噬屍體）
  const mechanics = (w.mechanics || []).map((m) => ({ ...m, gainedByEffect: { ...m.gainedByEffect }, dailyByEffect: { ...m.dailyByEffect } }));
  const activation = matchActivation(mechanics, rawText);
  const isDevour = !!activation && activation.on === 'devour';
  if (isDevour) days = 0;

  const newDay = oldDay + days;

  if (isDevour && activation) {
    const r = applyTrigger(activation.spec, 'devour', { day: newDay, maxHp: ctx.player.maxHp });
    for (const k of Object.keys(r.deltas) as (keyof PlayerDeltas)[]) playerDeltas[k] = (playerDeltas[k] || 0) + (r.deltas as any)[k];
    mechKarma += r.karma;
    mechanical = `你催動「${activation.spec.name}」——${r.narrative || '攫取對方精粹，自身為之一壯'}。`;
    if (r.karma > 0) mechanical += `（業力 +${Math.round(r.karma)}，恐招反噬與心魔）`;
    logType = 'danger';
    memoryNote = { summary: `施展${activation.spec.name}`, tags: ['異能', activation.spec.category], important: true };
  } else
  switch (intent.type) {
    case 'cultivate': {
      const mh = runMechHook(mechanics, 'cultivate', { day: newDay, maxHp: ctx.player.maxHp }, playerDeltas);
      mechKarma += mh.karma;
      const abodeBonus = abodeCultivationBonus(w);
      // 靈脈：此地地脈靈氣濃淡決定閉關效率（仙凡有別之根本——凡地修煉事倍功半，靈脈一日千里）。
      const { mult: lmMult, lm } = cultivationLingMaiMult(w.currentLocationId, !!w.abode);
      // 悟性：極端三倍曲線（0→1/3、50→1、100→3），領悟越高閉關越速。
      const compMult = comprehensionMult(ctx.player.comprehension ?? 50);
      // 化神受天地法則所限：人界靈氣再難支撐化神久留，閉關進益銳減，當早圖飛升靈界（原著設定）
      const pIdxCult = getRealmIndex(w, ctx.player.realmType);
      const tierCult = getRegion(w.currentLocationId)?.tier || 'human';
      const lawMult = pIdxCult === 4 && tierCult === 'human' ? 0.5 : 1;
      const effMult = ctx.player.cultivationMult * (1 + mh.cultMult + abodeBonus) * lmMult * compMult * lawMult;
      // 後期修練難度指數遞增（境界越高、瓶頸越巨，閉關進益遞減）
      const cultDiff = realmCultDifficulty(realmRank(ctx.player.realmType));
      const expGain = Math.max(1, Math.round((cultivateExpPerDay(ctx.player.maxExp, effMult) * days) / cultDiff));
      const huashenNote = lawMult < 1 ? '（你已臻化神之境——人界靈氣再難支撐你寸進，閉關事倍功半；唯有飛升靈界，方得海闊天空）' : '';
      playerDeltas.exp = (playerDeltas.exp || 0) + expGain;
      // 連續性屬性增長：閉關修為精進，氣血法力隨之水漲船高（填滿一個子境界約共 +6%；突破關口另有一波大增）
      const prog = Math.min(1, expGain / Math.max(1, ctx.player.maxExp));
      const grow = (v: number | undefined) => Math.round((v || 0) * prog * 0.06);
      playerDeltas.attack = (playerDeltas.attack || 0) + grow(ctx.player.attack);
      playerDeltas.defense = (playerDeltas.defense || 0) + grow(ctx.player.defense);
      playerDeltas.spirit = (playerDeltas.spirit || 0) + grow(ctx.player.spirit);
      playerDeltas.physique = (playerDeltas.physique || 0) + grow(ctx.player.physique);
      playerDeltas.speed = (playerDeltas.speed || 0) + grow(ctx.player.speed);
      playerDeltas.maxHp = (playerDeltas.maxHp || 0) + grow(ctx.player.maxHp);
      playerDeltas.lifespan = (playerDeltas.lifespan || 0) - days / 360;
      const lmNote = lm.grade <= 1 ? `（此地${lm.name}、靈氣${lm.grade === 0 ? '匱乏' : '稀薄'}，閉關事倍功半——修士當擇靈脈而修）` : lm.grade >= 4 ? `（此地乃${lm.name}、靈氣奔湧，修煉一日千里！）` : `（此地${lm.name}）`;
      const diffNote = cultDiff >= 8 ? '（境界愈高、瓶頸愈巨，此境閉關進益已遠非低階可比，須以漫長歲月磨之）' : cultDiff >= 4 ? '（境界漸高，進境較昔日遲緩）' : '';
      mechanical = `你${w.abode ? `於洞府「${w.abode.name}」中` : ''}凝神入定，吐納天地靈氣。${days}日苦修，修為精進（修為 +${expGain}${abodeBonus > 0 ? `，聚靈陣加成 +${Math.round(abodeBonus * 100)}%` : ''}）。${lmNote}${huashenNote}${diffNote}${mh.narrative ? ' ' + mh.narrative : ''}`;
      // 走火入魔/心魔：閉關越久、業力越重、境界越高越易出岔
      // 心性／道心：定力越高越能鎮壓心魔、避免走火入魔（100→抗性0.33）。
      const daoResist = daoHeartResist(ctx.player.daoHeart ?? 50);
      const qi = rollQiDeviation('cultivate', { realmRank: realmRank(ctx.player.realmType), karma: w.karma + mechKarma, daysElapsed: days, daoHeartResist: daoResist });
      if (qi.event) {
        for (const k of Object.keys(qi.deltas) as (keyof PlayerDeltas)[]) playerDeltas[k] = (playerDeltas[k] || 0) + (qi.deltas as any)[k];
        mechKarma += qi.karma;
        mechanical += qi.narrative;
        logType = 'danger';
      }
      memoryNote = { summary: `閉關修煉約${Math.max(1, Math.round(days / 360))}年`, tags: ['修煉', w.currentLocationId], important: days >= 1800 || !!qi.event };
      break;
    }
    case 'use_golden_finger': {
      if (!w.goldenFinger || !w.goldenFingerRuntime) {
        mechanical = '你並無可動用的金手指。';
        logType = 'normal';
        break;
      }
      const ur = useGoldenFinger(w.goldenFingerRuntime, w.goldenFinger, newDay);
      gfRuntime = ur.runtime;
      if (!ur.ok) {
        mechanical = ur.reason || '金手指此刻無法發動。';
        logType = 'danger';
      } else {
        const eff = ur.effect!;
        if (eff.hook === 'cultivationRateMult') {
          const burst = Math.round(cultivateExpPerDay(ctx.player.maxExp, ctx.player.cultivationMult) * 30 * eff.magnitude);
          playerDeltas.exp = burst;
          mechanical = `你催動「${w.goldenFinger.name}」，靈氣如百川歸海般湧入經脈，修為暴漲（修為 +${burst}）。`;
        } else if (eff.hook === 'herbMaturation') {
          const stones = Math.round(20 * eff.magnitude * (1 + dayToChapter(newDay) / 200));
          playerDeltas.spiritStones = stones;
          const herb = catalyzeHerb(ctx.player.realmType, eff.magnitude);
          itemsGranted = [herb];
          // 掌天瓶・瓶內空間：催熟的靈藥移入瓶中一方天地，繼續溫養、隔絕神識探查；灌注日久，瓶靈覺醒
          const space = w.bottleSpace || { herbs: [], lingZhiAwakened: false };
          const herbs = [...space.herbs, { name: herb.name, quality: Math.round(100 * (eff.magnitude / 100)) }].slice(-12);
          const awaken = (gfRuntime?.awakenLevel || 0) >= 3 && !space.lingZhiAwakened;
          worldPatch.bottleSpace = { herbs, lingZhiAwakened: space.lingZhiAwakened || awaken };
          mechanical = `你以「${w.goldenFinger.name}」催熟靈藥，得「${herb.name}×${herb.quantity}」，並引入瓶內那一方天地溫養（瓶中已蓄 ${herbs.length} 株靈植，神識難窺、外人難察）。餘藥售與坊市得靈石 +${stones}。${awaken ? '\n\n✦ 異變！瓶底那點一直沉寂的乳白光芒驀地明滅起伏——一縷沉睡已久的「瓶靈」，似被你經年的灌注悄然喚醒了……' : ''}`;
        } else if (eff.hook === 'luckBonus') {
          mechanical = `「${w.goldenFinger.name}」之力流轉周身，冥冥中氣運攀升，近日諸事似有貴人相助。`;
        } else if (eff.hook === 'appraise') {
          mechanical = `「${w.goldenFinger.name}」開啟，萬物來歷真偽在你眼中纖毫畢現。`;
        } else if (eff.hook === 'craftSuccess') {
          mechanical = `「${w.goldenFinger.name}」加持，你對火候藥理的掌控臻於圓融，成丹率大增。`;
        } else {
          mechanical = `你發動了「${w.goldenFinger.name}」，獨特之力悄然生效。`;
        }
        logType = 'special';
        if (ur.awakened) {
          const nm = AWAKEN_NAMES[Math.min(AWAKEN_NAMES.length, ur.awakenLevel || 1) - 1];
          mechanical += `\n\n✦ 金手指覺醒！「${w.goldenFinger.name}」臻入「${nm}」之境（覺醒第${ur.awakenLevel}階），自此威能更勝往昔。`;
        }
        if (ur.anomaly) {
          mechanical += `\n但業力陡增，引動「系統異常」——金手指暫陷沉寂，須待時日方能復原。`;
          logType = 'danger';
        }
      }
      memoryNote = { summary: `動用金手指「${w.goldenFinger.name}」`, tags: ['金手指'], important: !!ur.anomaly || !!ur.awakened };
      break;
    }
    case 'travel': {
      // 劇情閘：地點尚未開放/隱匿/需信物 → 不移動，據實說明
      if (travelGateReason) {
        mechanical = travelGateReason;
        logType = 'normal';
        break;
      }
      // 受阻（跨海無陣／跨界域／靈石不足）→ 不移動，據實說明
      if (travelPlan && (travelPlan.mode === 'blocked' || (travelPlan.mode === 'teleport' && !travelPlan.feasible))) {
        mechanical = travelPlan.reason;
        logType = 'danger';
        break;
      }
      if (travelPlan && travelPlan.mode === 'here') {
        mechanical = '你已身在此地，無需遠行。';
        break;
      }
      if (travelTarget && isUnknownDestination(travelTarget)) {
        const region = getRegion(w.currentLocationId);
        const tier = (region?.tier || 'human') as 'human' | 'spirit' | 'demon' | 'immortal';
        const gen = generateRegion({ fromRegionId: w.currentLocationId, tier, day: newDay, existingCount: w.expandedRegions.length, hint: intent.rawText });
        newLocationId = gen.id;
        worldPatch.expandedRegions = [...w.expandedRegions, gen];
        mechanical = `你循未知之向而行，歷經${days}日跋涉，抵達一處輿圖未載之地——${gen.name}。${gen.description}`;
        logType = 'special';
      } else if (travelTarget && travelPlan) {
        newLocationId = travelPlan.toId;
        const reg = getRegion(newLocationId);
        const name = reg?.name || travelPlan.toName;
        if (travelPlan.mode === 'teleport') {
          playerDeltas.spiritStones = (playerDeltas.spiritStones || 0) - travelPlan.spiritStoneCost;
          mechanical = `你尋至傳送大陣，靈光大放，跨越千山萬水，現身於${name}（耗靈石 ${travelPlan.spiritStoneCost}，歷${humanizeDays(days)}）。`;
          logType = 'special';
        } else if (travelPlan.mode === 'fly') {
          mechanical = `你御劍凌空、破風飛渡，${humanizeDays(days)}（${days}日）後落於${name}。`;
        } else {
          mechanical = `你動身前往${name}，${humanizeDays(days)}（${days}日）腳程後抵達。`;
        }
        if (reg?.description) mechanical += ` ${reg.description}`;
        // 旅途奇遇
        const enc = rollTravelEncounter(reg?.tier || 'human', realmScale(ctx.player.realmType), days, ctx.player.luck || 0, Math.random());
        if (enc) {
          mechanical += `\n\n${enc.text}`;
          if (enc.deltas) {
            for (const k of Object.keys(enc.deltas) as (keyof PlayerDeltas)[]) playerDeltas[k] = (playerDeltas[k] || 0) + (enc.deltas as any)[k];
          }
          if (enc.logType !== 'normal' && logType === 'normal') logType = enc.logType;
        }
      } else if (travelTarget) {
        // 目的地已知但無法規劃（如當前位置未上圖）→ 沿用基本行為
        newLocationId = getRegion(travelTarget)?.id || travelTarget;
        const reg = getRegion(newLocationId);
        mechanical = `你動身前往${reg?.name || newLocationId}，${days}日後抵達。${reg?.description || ''}`;
      } else {
        mechanical = `你漫無目的地遊走了${days}日。`;
      }
      memoryNote = { summary: `前往${getRegion(newLocationId)?.name || newLocationId}`, tags: ['行旅', newLocationId], important: false };
      break;
    }
    case 'talk': {
      const npcName = intent.targets.find((t) => getNpc(t));
      if (npcName) {
        const npc = getNpc(npcName)!;
        const rt = w.npcStates[npc.id];
        if (rt && rt.status === 'dead') {
          mechanical = `${npc.name}早已不在人世，你遍尋不見。`;
        } else if (rt && rt.locationId !== w.currentLocationId) {
          const here = getRegion(rt.locationId);
          mechanical = `${npc.name}並不在此處，據聞其人正在${here?.name || rt.locationId}一帶（${resolveNpcAtDay(npc, newDay).activity}）。`;
        } else if (npc.firstChapter > w.progressChapter + 30) {
          mechanical = `你打聽${npcName}，卻無人聽過此名——或許時機未到。`;
        } else {
          worldPatch.npcStates = { ...w.npcStates, [npc.id]: { ...(rt || w.npcStates[npc.id]), knownToPlayer: true } };
          mechanical = `你尋到${npc.name}，與之攀談。${npc.bio.slice(0, 60)}……對方${rt && rt.relationship > 0 ? '態度和善' : '不置可否'}。`;
          memoryNote = { summary: `結識/會晤${npc.name}`, tags: ['人物', npc.name], important: npc.importance !== 'minor' };
        }
      } else {
        mechanical = `你與當地修士寒暄了一番，打探些許消息。`;
      }
      break;
    }
    case 'party': {
      const party = w.party;
      // 解散 / 離隊 / 分贓
      if (/解散|離隊|离队|退隊|退队|分道揚鑣|分贓|分赃/.test(rawText)) {
        if (!party || !party.members.length) { mechanical = '你目前並未組隊，無從解散。'; break; }
        const settle = settleLoot(party.lootPool, party.members.length);
        if (settle.playerShare.length) {
          itemsGranted = settle.playerShare.map((s) => ({ name: s.name, type: (s.type || '材料') as any, quantity: s.quantity, rarity: (s.rarity || '普通') as any, description: '隊伍分贓所得' }));
        }
        const names = party.members.map((m) => m.name).join('、');
        mechanical = `你與${names}就此別過，隊伍解散。\n${settle.narrative}`;
        worldPatch.party = undefined;
        logType = 'special';
        memoryNote = { summary: `解散隊伍（${names}）`, tags: ['組隊', '分贓'], important: true };
        break;
      }
      // 接受他人/系統邀請
      if (/接受|答應|同意/.test(rawText) && party?.pendingInviteFromNpcId) {
        const inviter = getNpc(party.pendingInviteFromNpcId);
        const members = [...party.members];
        if (inviter && !members.some((m) => m.npcId === inviter.id)) members.push({ npcId: inviter.id, name: inviter.name, joinedDay: newDay, realm: String(w.npcStates[inviter.id]?.realm || '') });
        worldPatch.party = { ...party, members, pendingInviteFromNpcId: undefined, pendingInviteName: undefined };
        mechanical = `你應下了${inviter?.name || '對方'}的邀約，自此結伴同行。（隊伍：${members.map((m) => m.name).join('、')}）`;
        logType = 'special';
        break;
      }
      // 邀請某 NPC 入隊
      const targetName = intent.targets.find((t) => getNpc(t));
      if (!targetName) { mechanical = '你想招攬誰同行？請指明對象（須是此時已現於世、且在你身邊之人）。'; break; }
      const avail = npcAvailability(targetName, w, newDay);
      if (!avail.available) { mechanical = avail.reason; break; }
      if (party?.members.some((m) => m.npcId === avail.npcId)) { mechanical = `${avail.name}已在你的隊伍之中。`; break; }
      const pnpc = getNpc(targetName)!;
      const prt = w.npcStates[pnpc.id];
      const will = willingToJoin(pnpc.importance, prt?.relationship || 0, ctx.player.realmType, String(avail.resolved?.realm || prt?.realm || ''));
      if (!will.willing) { mechanical = `你向${pnpc.name}提出同行之邀，但${pnpc.name}${will.reason}`; break; }
      const members = [...(party?.members || []), { npcId: pnpc.id, name: pnpc.name, joinedDay: newDay, realm: String(avail.resolved?.realm || '') }];
      const storyBind = w.pendingChoice?.sourceEventId;
      const newParty: PartyState = party
        ? { ...party, members }
        : { members, lootPool: [], formedDay: newDay, storyEventId: storyBind, storyTitle: storyBind ? getEvent(storyBind)?.title : undefined };
      worldPatch.party = newParty;
      worldPatch.npcStates = { ...w.npcStates, [pnpc.id]: { ...(prt || w.npcStates[pnpc.id]), knownToPlayer: true, relationship: (prt?.relationship || 0) + 5 } };
      mechanical = `你向${pnpc.name}提出同行之邀，對方欣然應允，自此並肩。（隊伍：${members.map((m) => m.name).join('、')}${newParty.storyTitle ? `；劇情：${newParty.storyTitle}` : ''}）`;
      logType = 'special';
      memoryNote = { summary: `招攬${pnpc.name}入隊`, tags: ['組隊', pnpc.name], important: pnpc.importance !== 'minor' };
      break;
    }
    case 'transmit': {
      const targetName = intent.targets.find((t) => getNpc(t));
      if (!targetName) { mechanical = '你欲向誰傳音？請指明對象。'; break; }
      const tnpc = getNpc(targetName)!;
      const avail = npcAvailability(targetName, w, newDay);
      if (!avail.debuted) { mechanical = `${tnpc.name}此時尚未現於世，你連其神識氣息也尋不著。`; break; }
      if (!avail.alive) { mechanical = `${tnpc.name}已魂歸幽冥，神識再難傳達。`; break; }
      const npcLoc = (avail.rt?.diverged ? avail.rt.locationId : avail.resolved?.locationId) || '';
      const range = transmitInRange(ctx.player.realmType, w.currentLocationId, npcLoc);
      if (!range.inRange) { mechanical = range.reason; break; }
      const trt = w.npcStates[tnpc.id];
      let nextStates = { ...w.npcStates, [tnpc.id]: { ...(trt || w.npcStates[tnpc.id]), knownToPlayer: true } };
      const content = rawText.replace(/^.*?(傳音|传音|神識傳音|神识传音|傳訊|密語傳)\s*[給给]?\s*/, '').replace(tnpc.name, '').trim();
      let extra = '';
      if (/組隊|同行|加入|結伴|一起/.test(rawText)) {
        const will = willingToJoin(tnpc.importance, trt?.relationship || 0, ctx.player.realmType, String(avail.resolved?.realm || ''));
        extra = will.willing ? (avail.present ? ' 對方領會你的邀約，有意相從。' : ' 對方有意相從，但須你親至其處方能正式結伴。') : ` 然${tnpc.name}${will.reason}`;
      } else if (/警告|小心|危險|危机|危機|提防|當心|留意/.test(rawText)) {
        extra = ' 你以神識急傳警訊，對方神色一凜，默默記下。';
        nextStates = { ...nextStates, [tnpc.id]: { ...nextStates[tnpc.id], relationship: (trt?.relationship || 0) + 3 } };
      } else if (/情報|消息|打聽|請教|詢問|消息/.test(rawText)) {
        extra = ' 對方以神識回你三言兩語，透了些許風聲。';
      } else {
        nextStates = { ...nextStates, [tnpc.id]: { ...nextStates[tnpc.id], relationship: (trt?.relationship || 0) + 1 } };
      }
      worldPatch.npcStates = nextStates;
      mechanical = `你斂去聲息，以神識向${tnpc.name}暗暗傳音：「${content || '……'}」——此訊隱秘，旁人難以截聽。${extra}`;
      logType = 'special';
      memoryNote = { summary: `神識傳音予${tnpc.name}`, tags: ['傳音', tnpc.name], important: false };
      break;
    }
    case 'explore': {
      const mh = runMechHook(mechanics, 'explore', { day: newDay, maxHp: ctx.player.maxHp }, playerDeltas);
      mechKarma += mh.karma;
      const stones = Math.round(5 + dayToChapter(newDay) / 50);
      const expGain = Math.round(cultivateExpPerDay(ctx.player.maxExp, 1) * days * 0.3);
      playerDeltas.spiritStones = (playerDeltas.spiritStones || 0) + stones;
      playerDeltas.exp = (playerDeltas.exp || 0) + expGain;
      const tier = getRegion(w.currentLocationId)?.tier || 'human';
      itemsGranted = rollExploreLoot(tier, ctx.player.realmType, ctx.player.luck);
      const lootTxt = itemsGranted.length ? ` 途中尋得：${itemsGranted.map((g) => `${g.name}×${g.quantity}`).join('、')}。` : '';
      // 程序生成遭遇：野怪／散修（必帶功法與隨身物）／新立小勢力——使野外不空、NPC 手中有物
      const regionName0 = getRegion(w.currentLocationId)?.name || '此地';
      let encTxt = '';
      const encRoll = Math.random();
      if (encRoll < 0.30) {
        const mon = genMonster(tier, ctx.player.realmType);
        itemsGranted = [...itemsGranted, ...mon.drops];
        encTxt = `\n\n途中驚起一頭「${mon.name}」（${mon.realm}·${mon.beastType}），你謹慎周旋將其擊退，自其身上得：${mon.drops.map((d) => `${d.name}×${d.quantity}`).join('、')}。`;
        if (logType === 'normal') logType = 'gain';
      } else if (encRoll < 0.50) {
        const npc = genNpc(tier, ctx.player.realmType);
        const cost = { 普通: 8, 稀有: 30, 传说: 120, 仙品: 500 }[npc.item.rarity] ?? 8;
        if (ctx.player.spiritStones + (playerDeltas.spiritStones || 0) >= cost) {
          playerDeltas.spiritStones = (playerDeltas.spiritStones || 0) - cost;
          itemsGranted = [...itemsGranted, npc.item];
          encTxt = `\n\n路遇${npc.faction === '散修' ? '一名散修' : `${npc.faction}的修士`}「${npc.name}」（${npc.realm}，習《${npc.technique}》）。一番交道後，你以靈石 ${cost} 換得他隨身的「${npc.item.name}」。`;
        } else {
          encTxt = `\n\n路遇${npc.faction === '散修' ? '一名散修' : `${npc.faction}的修士`}「${npc.name}」（${npc.realm}，習《${npc.technique}》），對方有意兜售隨身的「${npc.item.name}」，惜你囊中靈石不足，只得擦肩而過。`;
        }
      } else if (encRoll < 0.62) {
        const fac = genFaction(regionName0);
        encTxt = `\n\n你遠遠望見一處新立的勢力旗號——「${fac.name}」（${fac.type}·${fac.alignment}）。${fac.note}`;
      }
      // 修仙門派據點設施採集：靈脈採氣／藥園採藥／礦脈採材（30 日冷卻，落地 sectSiteState）
      const exploreSite = sectSiteOf(w.currentLocationId);
      if (exploreSite) {
        const st = w.sectSiteState || {};
        const nextState = { ...st };
        const gained: string[] = [];
        for (const fac of exploreSite.facilities) {
          if (fac.kind !== '靈脈' && fac.kind !== '藥園' && fac.kind !== '礦脈') continue;
          const key = `${exploreSite.nodeId}:${fac.kind}`;
          const last = nextState[key]?.lastHarvestDay ?? -99999;
          if (newDay - last < 30) continue;
          if (fac.kind === '靈脈') {
            const bonus = Math.max(1, Math.round(expGain * 0.6));
            playerDeltas.exp = (playerDeltas.exp || 0) + bonus;
            gained.push(`於「${fac.name}」值守採氣（修為 +${bonus}）`);
          } else {
            const it = genItem(ctx.player.realmType, fac.kind === '藥園' ? '草药' : '材料');
            itemsGranted = [...(itemsGranted || []), it];
            gained.push(`於「${fac.name}」採得 ${it.name}×${it.quantity}`);
          }
          nextState[key] = { ...(nextState[key] || {}), lastHarvestDay: newDay };
        }
        if (gained.length) {
          worldPatch.sectSiteState = nextState;
          encTxt += `\n\n此地乃「${exploreSite.sectName}」據點，你趁隙${gained.join('；')}。`;
          if (logType === 'normal') logType = 'gain';
        }
      }
      mechanical = `你在${regionName0}遊歷查探${days}日，略有所獲（靈石 +${stones}，修為 +${expGain}）。${lootTxt}${mh.narrative ? ' ' + mh.narrative : ''}${encTxt}`;
      memoryNote = { summary: `於${w.currentLocationId}歷練`, tags: ['歷練', w.currentLocationId], important: false };
      break;
    }
    case 'fight': {
      const foe = intent.targets.find((t) => getNpc(t));
      const foeNpc = foe ? getNpc(foe) : undefined;
      const foeRealm = foeNpc ? String(w.npcStates[foeNpc.id]?.realm || ctx.player.realmType) : ctx.player.realmType;
      const foeName = foe || '那來犯之敵';
      // ── 跨大境界戰力差（原著考據：跨一大境界 ≈18 倍碾壓、跨二境視若螻蟻；低境界對高境界傷害近乎為零）──
      // 玩家用權威 canonRealmIndex；敵方以穩健解析（含「結丹後期／合體中後期」等後綴字串）取大境界。
      const realmGap = getRealmIndex(w, ctx.player.realmType) - majorRealmRank(foeRealm); // >0 玩家高、<0 敵高
      if (realmGap >= 1) {
        // 玩家高出一個以上大境界 → 輾壓，不勞開戰
        const tier = getRegion(w.currentLocationId)?.tier || 'human';
        const loot = rollExploreLoot(tier, foeRealm, Math.round(ctx.player.luck || 0));
        if (loot.length) itemsGranted = loot;
        mechanical = realmGap >= 2
          ? `${foeName}竟敢攖你之鋒？在高出整整 ${realmGap} 個大境界的你眼中，此輩不過螻蟻——你一念壓落，對方神形俱滅，連還手之機也無。（大境界之差，視之如螻蟻）`
          : `大境界之差，雲泥之別。你不及催全力，一個照面便將${foeName}輕鬆轟潰，${foeName}自始至終連你衣袂都沾不到。（原著：低境界對高境界傷害近乎為零）`;
        logType = 'special';
        memoryNote = { summary: `越階輾壓${foeName}`, tags: ['戰鬥', '越階輾壓'], important: false };
        break;
      }
      if (realmGap <= -2) {
        // 敵高出兩個以上大境界 → 絕對壓制：高人不屑取命，隨手震飛、重傷瀕死
        const cur = ctx.player.hp ?? ctx.player.maxHp ?? 100;
        playerDeltas.hp = Math.max(1, Math.round(cur * 0.1)) - cur; // 震至僅餘一成血
        mechanical = `你竟向高你 ${-realmGap} 個大境界的${foeName}出手？對方眼神微凝，便是一種「境界上的絕對壓制」——你通體一寒、渾身一麻，連一根手指都動彈不得。${foeName}不屑取你性命，隨手一拂，你已如斷線紙鳶般被震飛出去，重傷瀕死。（原著：跨二境視若螻蟻，低境界毫無還手之力）`;
        logType = 'danger';
        memoryNote = { summary: `以卵擊石・慘敗於${foeName}`, tags: ['戰鬥', '絕對壓制'], important: true };
        break;
      }
      // ── 神識先機（輕量距離層）：神識越盛、越偏遠程，鎖定越遠、先發法術齊射越凶；體修可選貼身近戰 ──
      const spirit = ctx.player.spirit ?? 0;
      const atk = Math.max(1, ctx.player.attack ?? 1);
      const wantClose = /貼身|近戰|肉搏|近身|衝上|衝前|拼命|短兵|纏鬥/.test(intent.rawText);
      const wantRanged = /法術|法术|遠|远|施法|御劍|御剑|神念|神識攻|飛劍|飞剑|隔空|拉開距離|拉开距离|遠程|远程|放術|箭|符/.test(intent.rawText);
      const spiritFocus = spirit / atk; // >1 偏神識（法修），<1 偏體修
      const useRanged = !wantClose && (wantRanged || spiritFocus >= 0.9);
      const RISKS: BattleTrigger['riskLevel'][] = ['低', '中', '高', '极度危险'];
      let riskIdx = 1; // 中
      let opening = '一場惡鬥一觸即發。';
      if (useRanged) {
        const edge = Math.max(0, Math.min(1, (spiritFocus - 0.6) / 1.6)); // 0..1：神識相對越強，先機越大
        const volleys = 1 + Math.round(edge * 3); // 1..4 道
        riskIdx = edge >= 0.6 ? 0 : 1; // 神識遠鎖、先發制人 → 戰局佔優
        opening = `你神識遠鎖，搶在敵近身之前發難——${volleys} 道法術裹挾威勢隔空轟落，先發制人（神識先機，${edge >= 0.6 ? '遠遠壓制' : '略佔上風'}；神識越盛、鎖得越遠、傷得越重）。`;
      } else if (wantClose) {
        riskIdx = 2; // 捨遠程先機、欺身肉搏，直入險境（利體魄攻擊近戰流）
        opening = '你不取遠攻，足尖一點欺身直進、短兵相接——以近身搶攻定勝負。';
      }
      // ── 組隊助戰：同伴並肩迎敵、結陣禦敵，分擔攻勢、壓低戰局凶險 ──
      const allies = w.party?.members || [];
      if (allies.length) {
        const strength = allies.reduce((s, m) => s + (realmRank(m.realm || ctx.player.realmType) >= realmRank(ctx.player.realmType) ? 1 : 0.6), 0);
        const reduce = Math.min(2, Math.max(1, Math.round(strength * 0.7)));
        riskIdx = Math.max(0, riskIdx - reduce);
        opening += ` 你的同伴${allies.map((a) => a.name).join('、')}與你並肩迎敵、合力夾攻，分擔了大半攻勢（${allies.length} 人助戰，凶險大減）。`;
      }
      if (realmGap === -1) {
        // 越階而戰：高你一個大境界，凶險陡增——唯仗精良法寶與神識先機方有一線生機
        riskIdx = Math.min(3, riskIdx + 2);
        opening = `【越階而戰】${foeName}高你一個大境界，尋常而言低境界對高境界近乎無法傷敵；你唯有仗精良法寶與神識先機，搏那一線生機。 ` + opening;
      }
      // 化神受天地法則所限：在人界（低階界域）不可隨意全力出手，威能受抑、束手束腳（原著設定）
      if (getRealmIndex(w, ctx.player.realmType) === 4 && (getRegion(w.currentLocationId)?.tier || 'human') === 'human') {
        riskIdx = Math.min(3, riskIdx + 1);
        opening += ' 然你身為化神，在人界受天地法則壓制——不敢、亦不能傾盡全力（強行盡全力恐引法則反噬、誘發天劫），縛手縛腳，平添兇險。';
      }
      const risk = RISKS[Math.max(0, Math.min(3, riskIdx))];
      battle = { realmMinRealm: foeRealm, riskLevel: risk, context: foe ? `與${foe}交手` : '與來犯之敵交手' };
      mechanical = `${foe ? `你向${foe}出手` : '你拔出兵刃，迎向來敵'}。${opening}`;
      logType = 'danger';
      break;
    }
    case 'craft': {
      // 具名原著功法（長春功/御風訣…）→ 走功法系統（受傳承出處之限）；其餘技藝（煉丹/制符/馴獸/布陣…）→ 修仙百藝熟練。
      const tech = findTechniqueByName(rawText);
      if (tech) {
        let txt = '';
        if (realmRank(ctx.player.realmType) < realmRank(tech.realmReq)) {
          txt = `「${tech.name}」需 ${tech.realmReq} 以上修為，你暫只能淺嘗皮毛。`;
          logType = 'normal';
        } else {
          const learned = (w.techniques || []).map((t) => ({ ...t }));
          const exist = learned.find((t) => t.id === tech.id);
          const lc = exist ? { ok: true, reason: '' } : canLearnTechnique(tech.name, w, ctx.player.inventoryNames);
          if (!exist && !lc.ok) {
            // 仙俠世界：名門法術須在傳承之地/拜入其宗/持秘譜方得初習，不隨處可學
            txt = lc.reason;
            logType = 'normal';
          } else if (!exist) {
            learned.push({ id: tech.id, name: tech.name, level: 1 });
            if (tech.statBonus) for (const k of Object.keys(tech.statBonus) as (keyof PlayerDeltas)[]) playerDeltas[k] = (playerDeltas[k] || 0) + ((tech.statBonus as any)[k] || 0);
            const un = (tech.neigong || []).filter((n) => n.level <= 1).map((n) => n.name);
            txt = `你尋得「${tech.name}」傳承，初窺門徑（第1層）。${un.length ? `習得神通：${un.join('、')}。` : ''}`;
            logType = 'special';
            worldPatch.techniques = learned;
          } else if (exist.level < tech.maxLevel) {
            exist.level += 1;
            const un = (tech.neigong || []).filter((n) => n.level === exist.level).map((n) => n.name);
            txt = `「${tech.name}」精進至第${exist.level}層。${un.length ? `解鎖神通：${un.join('、')}！` : ''}`;
            logType = 'special';
            worldPatch.techniques = learned;
          } else {
            txt = `「${tech.name}」你已臻第${exist.level}層大成，再難寸進。`;
          }
        }
        mechanical = `你潛心參研「${tech.name}」。${txt}`;
        memoryNote = { summary: `修習${tech.name}`, tags: ['功法', tech.name], important: logType === 'special' };
        break;
      }
      // 修仙百藝：解析所修技藝（目錄比對或引擎自製）→ 熟練成長 + 依品質產出
      const { art, matched } = resolveBaiYi(rawText);
      const prevProf = (w.baiyi || {})[art.id];
      const rr = realmRank(ctx.player.realmType);
      const pr = practiceBaiYi(art, prevProf, days, rr, ctx.player.luck || 0);
      worldPatch.baiyi = { ...(w.baiyi || {}), [art.id]: pr.prof };
      let txt = matched ? '' : `（你並無此藝的師承，姑且自行摸索——系統已為你立此一門「${art.name}」。）`;
      if (isMakingProduct(art.category, rawText)) {
        const tier = getRegion(w.currentLocationId)?.tier || 'human';
        const grants = rollExploreLoot(tier, ctx.player.realmType, Math.round((ctx.player.luck || 0) + pr.quality * 12));
        if (grants.length) {
          itemsGranted = grants;
          txt += ` 成品：${grants.map((g) => `${g.name}×${g.quantity}`).join('、')}（品質隨你${art.name}熟練而定）。`;
        } else {
          txt += ' 然火候未到，此番並無所成。';
        }
      } else {
        const expGain = Math.round(cultivateExpPerDay(ctx.player.maxExp, 1) * days * 0.15 * (0.5 + pr.quality));
        if (expGain) playerDeltas.exp = (playerDeltas.exp || 0) + expGain;
      }
      mechanical = `${pr.narrative}${txt}`;
      logType = pr.rankedUp ? 'special' : 'normal';
      memoryNote = { summary: `修習${art.name}${pr.rankedUp ? `（晉${rankName(pr.prof.rank)}）` : ''}`, tags: ['百藝', art.name], important: pr.rankedUp };
      break;
    }
    case 'join_sect': {
      // 劇情/AI 結合：敘事中拜入宗門 → 真實落地為師門（含入門大典與賜物）
      const sect = findSectByName(rawText);
      if (!sect) { mechanical = '你似有拜師入門之意，卻未言明欲投何門——且先打聽哪座宗門可投。'; logType = 'normal'; break; }
      if (sect.category === '武林門派') {
        mechanical = `「${sect.name}」乃凡俗武者的江湖門派——仙凡有別，你既已踏上仙途，所求乃長生大道，豈是江湖武門可羈？（你仍可前往該地尋訪故人）`;
        logType = 'normal'; break;
      }
      if (w.sect && w.sect.sectId === sect.id) { mechanical = `你已身在「${sect.name}」門下，何須再拜？`; logType = 'normal'; break; }
      if (w.sect) { mechanical = `你已是「${w.sect.sectName}」門下——欲改投「${sect.name}」，須先退出師門，方可另拜。`; logType = 'normal'; break; }
      const token = (ctx.player.inventoryNames || []).find((n) => /升仙令|引薦帖|招賢令|入門令/.test(n));
      const atHome = isAtSectHome(w.currentLocationId, sect);
      if (!atHome && !token) {
        const home = sectHomeName(sect);
        mechanical = `拜入「${sect.name}」須親至其山門，或持「升仙令」等引薦信物方得受招——你此刻不在門中，亦無引薦之物。${home ? `可先「前往${home}」再行拜入。` : ''}`;
        logType = 'normal'; break;
      }
      // 合格：交由 worldStore 落地（入門大典＋賜物；持令者另獲令中所附，如升仙令附築基丹）
      sectJoinOut = { sectId: sect.id, viaItem: token };
      mechanical = token
        ? `你執「${token}」尋至「${sect.name}」，門中執事驗過信物，知是升仙大會錄取之人，當即引你入門——`
        : `你親至「${sect.name}」山門，循禮表明拜師之意，門中納你為徒——`;
      logType = 'special';
      memoryNote = { summary: `拜入${sect.name}`, tags: ['宗門', sect.name, ...(token ? [token] : [])], important: true };
      break;
    }
    case 'organize': {
      const res = foundOrganization(rawText, ctx.player.realmType, ctx.player.spiritStones, newDay, newLocationId);
      if (!res.ok) { mechanical = res.reason || '此事一時難成。'; logType = 'normal'; break; }
      playerDeltas.spiritStones = (playerDeltas.spiritStones || 0) - res.cost;
      worldPatch.organizations = [...(w.organizations || []), res.org!];
      mechanical = `${res.org!.description}（耗靈石 ${res.cost}；初始成員 ${res.org!.members}、影響力 ${res.org!.influence}）${res.org!.generated ? `\n（此型組織原無定制，系統已依你所述為你開創「${res.org!.type}」一脈。）` : ''}`;
      logType = 'special';
      memoryNote = { summary: `創立${res.org!.type}「${res.org!.name}」`, tags: ['組織', res.org!.type], important: true };
      break;
    }
    case 'use_item':
    case 'trade': {
      mechanical = `你著手「${intent.rawText}」。此類行動的具體得失，依你的背包、配方與當地行情而定（可於對應介面操作）。`;
      break;
    }
    case 'flee': {
      // 逃離追殺：速度稟賦決定能否甩脫追兵
      const ag = ctx.player.agility ?? 0;
      const chance = fleeChance(ag, ctx.player.luck || 0);
      const escaped = Math.random() <= chance;
      if (escaped) {
        mechanical = `你足下遁光暴漲、身形化作一道流虹，左穿右插、瞬息已在數里之外——將追兵遠遠甩在身後。好快的身法！（速度稟賦 ${ag}，脫身成功）`;
        logType = 'normal';
      } else {
        const hpLoss = Math.round(ctx.player.maxHp * 0.18);
        playerDeltas.hp = (playerDeltas.hp || 0) - hpLoss;
        mechanical = `你拔腿急遁，怎奈對手遁速更勝一籌、緊追不捨——眼見將被截下，你硬挨了一記方勉強脫險（氣血 -${hpLoss}）。若速度再快些，當能全身而退。`;
        logType = 'danger';
        memoryNote = { summary: '逃離追殺時負傷', tags: ['逃離', '追殺'], important: false };
      }
      break;
    }
    case 'wait': {
      mechanical = `你按兵不動，靜觀其變，任${days}日悄然流逝。`;
      break;
    }
    default: {
      // freeform / reframe：盡量給出有實質的確定性回應（無 LLM 時尤要），而非空泛一句。
      const place = getRegion(w.currentLocationId)?.name || w.currentLocationId;
      const rt = intent.rawText;
      if (/掌天瓶|小綠瓶|小绿瓶|青色小瓶|綠瓶|绿瓶/.test(rt)) {
        // 掌天瓶乃韓立本命機緣、天授之物，非尋覓強求可得
        mechanical = `你四處探聽、暗中搜尋那只傳說中的青色小瓶。然此物乃機緣天授、冥冥中自有其主——翻找強求皆是徒勞，唯有緣者於命定之時方能得之。你一無所獲，徒耗${days}日光陰。`;
        logType = 'normal';
      } else if (/尋找|找尋|搜尋|尋覓|搜索|探尋|尋訪|淘換|蒐羅|搜羅/.test(rt)) {
        const r = Math.random();
        if (r < 0.65) mechanical = `你在${place}周遭翻找搜尋，奔走${days || 0}日，卻一無所獲——機緣可遇不可求，強求無益。`;
        else mechanical = `你在${place}一帶細細探尋，${days || 0}日後雖未得償所願，卻隱隱覺出此地別有蹊蹺，似有機緣藏於附近——或可循「探索」之途再探。`;
      } else {
        mechanical = `你${days > 0 ? `以${days}日` : ''}嘗試「${rt}」。你於${place}依此行事，世事如常流轉，暫未起波瀾。`;
      }
    }
  }

  // ── 時間推進 + 世界演化 ──
  const clock = dayToGameTime(newDay);
  const progressChapter = Math.max(w.progressChapter, dayToChapter(newDay));

  // 正史事件互動式介入：短行動且事件正發生於你所在地 → 暫扣住該事件、生成抉擇
  let pendingChoice: TurnChoice | null = null;
  const heldIds = new Set<string>();
  const interactiveScale = intent.durationScale === 'instant' || intent.durationScale === 'short' || intent.durationScale === 'medium';

  // 提前機緣：探索/抵達時，可能在所在地觸及一樁正史尚未公開的機緣 → 引動時間線級聯
  if (!pendingChoice && (intent.type === 'explore' || intent.type === 'travel') && !battle) {
    const opp = findAvailableOpportunity(w, newLocationId, newDay, ctx.player.luck || 0, Math.random(), progressChapter);
    if (opp) {
      pendingChoice = {
        prompt: `【機緣・${opp.name}】${opp.discoverHint}`,
        sourceOpportunityId: opp.id,
        options: opp.actions.map((a) => ({ id: a.id, text: a.label, hint: magnitudeLabel(a.magnitude) })),
      };
      mechanical += `\n\n你似乎觸及了一樁尚未被世人發現的機緣——你的抉擇，或將撥動時間線的弦。`;
      logType = 'special';
    }
  }

  if (!pendingChoice && interactiveScale && !battle) {
    const dueAtLoc = eventsInWindow(oldDay, newDay).filter(
      (e) =>
        e.locationId === newLocationId &&
        e.interventions && e.interventions.length > 0 &&
        e.spoilerLevel <= spoilerBudget(progressChapter) &&
        !w.worldEventStates[e.id]?.fired &&
        !w.worldEventStates[e.id]?.diverged
    );
    if (dueAtLoc.length) {
      const ev = dueAtLoc[0];
      heldIds.add(ev.id);
      pendingChoice = {
        prompt: `【正史節點・${ev.title}】${ev.summary}\n\n此刻你正身處其中——是否介入？`,
        sourceEventId: ev.id,
        options: [
          ...ev.interventions.slice(0, 4).map((iv) => ({ id: iv.id, text: iv.description, hint: iv.minRealm ? `需 ${iv.minRealm}` : undefined })),
          { id: '__observe__', text: '旁觀，任其依正史發生', hint: '不改寫歷史' },
        ],
      };
      mechanical += `\n\n你恰逢一樁正史變局，正身處其中——天機已動，你的抉擇將決定歷史是否轉向。`;
      logType = 'special';
    }
  }

  // ── 地圖擴展：隨移動／探查揭露原著地點（霧中探明）──
  {
    const known = w.discoveredLocationIds && w.discoveredLocationIds.length ? w.discoveredLocationIds : initialDiscoveries(w.currentLocationId);
    let revealed = discoverAround(newLocationId);
    if (newLocationId && !revealed.includes(newLocationId)) revealed = [...revealed, newLocationId];
    const knownSet = new Set(known);
    const newlyIds = revealed.filter((id) => !knownSet.has(id));
    if (newlyIds.length || !(w.discoveredLocationIds && w.discoveredLocationIds.length)) {
      worldPatch.discoveredLocationIds = Array.from(new Set([...known, ...revealed]));
    }
    if (newlyIds.length && newLocationId !== w.currentLocationId) {
      const names = newlyIds.map(labelFor).filter((n): n is string => !!n);
      const shown = names.slice(0, 6);
      if (shown.length) mechanical += `\n\n【輿圖擴展】循途見聞，你新探明了：${shown.join('、')}${names.length > shown.length ? ' 等地' : ''}。`;
    }
  }

  // ── 組織隨時間成長（影響力/資產/成員）──
  if ((worldPatch.organizations ?? w.organizations)?.length && days > 0) {
    worldPatch.organizations = growOrganizations(worldPatch.organizations ?? w.organizations, days);
  }

  const evolvingWorld: FanrenWorldState = { ...w, ...worldPatch, currentLocationId: newLocationId, clock, progressChapter };
  const evo = evolveWorld(evolvingWorld, oldDay, newDay, heldIds);

  // ── 活世界：背景人口繁衍／殞落（嚴格不影響正史 NPC 與事件）──
  const demo = tickDemographics(evolvingWorld, newDay, getRegion(newLocationId)?.name || '此地');
  worldPatch.population = demo.population;
  // ── 天下生靈・境界分層普查推進（~50萬，越高越少；純背景）──
  const cen = tickCensus(evolvingWorld.census, newDay);
  worldPatch.census = cen.census;

  // 金手指能量回復（若本回合未主動使用，也隨時間回能）
  if (intent.type !== 'use_golden_finger' && w.goldenFinger && gfRuntime) {
    gfRuntime = regenGoldenFinger(gfRuntime, w.goldenFinger, newDay);
  }

  worldPatch = {
    ...worldPatch,
    clock,
    progressChapter,
    currentLocationId: newLocationId,
    npcStates: evo.npcStates,
    worldEventStates: evo.worldEventStates,
    npcFateStates: evo.npcFateStates,
    goldenFingerRuntime: gfRuntime,
    pendingChoice,
    mechanics,
    karma: w.karma + mechKarma,
  };

  // ── 敘事 ──
  const reactions: NpcReaction[] = evo.reactions;
  const visibleFired = [...evo.firedSummaries, ...demo.lines]; // 正史天下事 + 背景人口近聞
  const { text } = await narrate({
    world: evolvingWorld,
    intent,
    verdict,
    daysElapsed: days,
    mechanicalOutcome: mechanical,
    firedSummaries: visibleFired,
    reactions,
    playerRealm: ctx.player.realm,
    playerName: ctx.player.name,
    mechanics: (w.mechanics || []).map((m) => ({ name: m.name, category: m.category, summary: m.summary })),
    activeMechanic: isDevour && activation ? activation.spec.name : undefined,
    presentNpcs: presentNpcs({ ...evolvingWorld, ...worldPatch } as FanrenWorldState, newDay),
    party: (worldPatch.party ?? w.party) ? (worldPatch.party ?? w.party)!.members.map((m) => m.name) : [],
  });

  const reminders = buildReminders({ ...evolvingWorld, ...worldPatch });
  const newMemory = memoryNote ? makeMemory(newDay, memoryNote.summary, memoryNote.tags, memoryNote.important) : undefined;

  const result: TurnResult = {
    narrative: text,
    intent,
    verdict,
    daysElapsed: days,
    statDeltas: playerDeltas as Record<string, number>,
    worldEventsFired: evo.firedEventIds,
    npcReactions: reactions,
    reminders,
    logType,
  };
  return { result, worldPatch, playerDeltas, newMemory, battle, itemsGranted, sectJoin: sectJoinOut };
}
