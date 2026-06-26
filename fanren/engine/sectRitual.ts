/**
 * 宗門儀軌：把「拜入／晉升／領俸／辦差／離宗」由乾巴巴的數值操作，化為有儀式感的修仙宗門生活。
 *  · 入門大典：測靈根（仙宗）／驗身投帖（武林）／血誓認主（魔道）→ 拜師 → 立門規誓 → 賜信物與傳承。
 *  · 晉升大典：論功亦論道，資歷與境界雙足方受擢升，行擢升禮、賜法器靈石、得榮銜。
 *  · 宗門月俸：依階給俸，積欠可領（封頂一年，免閉關歸來俸祿暴漲）。
 *  · 宗門辦差：耗時日、有變數，偶有橫財或兇險；魔道差事增業力兇名。
 *  · 離宗：正道自請出門，好聚好散；魔道叛教則遭追殺、兇名加身。
 *  · 宗門盛事：開壇講道／宗門大比／秘境開啟，使門中歲月有節律與盛典。
 * 純邏輯，不觸 store；wiring 於 worldStore，呈現於 SectPanel。
 */
import type { SectDef, SectMembership, SectCeremonyBeat, SectEventState } from '../types';
import { WORLD_MAP } from '../data/worldMap';
import { findMapNode } from './mapIntel';

// ── 宗門本門所在：宗門事務須親至本門，不可遠端隔空操辦（強化儀式感）──
const SECT_HOME: Record<string, string> = {
  七玄門: 'qiXuanMen',
  黃楓谷: 'huangFengGu',
  掩月宗: 'yanYueMen',
  落雲宗: 'luoYunZong',
  鸞鳴宗: 'luanMingZong',
  鬼靈門: 'guiLingMen',
  合歡宗: 'heHuanZong',
  御靈宗: 'yuLingZong',
  化血教: 'tianLuoGuo',
};
function nodeById(id: string) { return WORLD_MAP.find((n) => n.id === id); }

// 由 WORLD_MAP 動態索引宗門本門：canon 覆寫優先，否則找「同名節點／名稱含宗名／factions 列此宗」之地。
let _exactMap: Record<string, string> | null = null;
let _factionMap: Record<string, string> | null = null;
function buildHomeIndex(): void {
  if (_exactMap) return;
  _exactMap = {}; _factionMap = {};
  for (const n of WORLD_MAP) {
    if (_exactMap[n.name] === undefined) _exactMap[n.name] = n.id;
    for (const f of n.factions || []) if (_factionMap[f] === undefined) _factionMap[f] = n.id;
  }
}
function homeIdOf(sectName: string): string | null {
  if (SECT_HOME[sectName]) return SECT_HOME[sectName];
  buildHomeIndex();
  if (_exactMap![sectName]) return _exactMap![sectName];
  const contains = WORLD_MAP.find((n) => n.name.includes(sectName)); // 黃楓谷（彩霞山）等帶括號者
  if (contains) return contains.id;
  if (_factionMap![sectName]) return _factionMap![sectName];
  return null;
}
/** 某地（id/名）所屬大區 id（界根直屬子節點）。 */
function regionNodeId(idOrName: string): string | null {
  let cur = findMapNode(idOrName);
  const seen = new Set<string>();
  while (cur && cur.parentId && !seen.has(cur.id)) {
    seen.add(cur.id);
    const p = nodeById(cur.parentId);
    if (!p || !p.parentId) return cur.id;
    cur = p;
  }
  return cur ? cur.id : null;
}
/** 該宗本門是否與玩家現處同一大區（供宗門面板預設只列本區勢力）。 */
export function sectInRegion(sect: SectDef, currentLocationId: string): boolean {
  const home = homeIdOf(sect.name);
  if (!home) return false;
  const hr = regionNodeId(home), cr = regionNodeId(currentLocationId);
  return !!hr && hr === cr;
}
/** 該宗是否已可考據其本門所在（有 home 即視為「有定所」）。 */
export function sectHasHome(sect: SectDef): boolean {
  return !!homeIdOf(sect.name);
}

/** 該宗本門所在地點顯示名（供「前往○○」引導）；無對應地點則 null。 */
export function sectHomeName(sect: SectDef): string | null {
  const id = homeIdOf(sect.name);
  if (!id) return null;
  return nodeById(id)?.name || sect.name;
}
/** 是否身處該宗本門（本門節點或其子地點皆算）。無對應地點之宗門不設限（保守，免卡死）。 */
export function isAtSectHome(currentLocationId: string, sect: SectDef): boolean {
  const homeId = homeIdOf(sect.name);
  if (!homeId) return true;
  let cur = findMapNode(currentLocationId);
  const seen = new Set<string>();
  while (cur) {
    if (cur.id === homeId) return true;
    if (!cur.parentId || seen.has(cur.id)) break;
    seen.add(cur.id);
    cur = nodeById(cur.parentId);
  }
  return false;
}

// ── 各宗儀軌底蘊：正史名門覆寫；未列者依類別自動生成 ──
interface SectLore {
  motto: string; // 宗訓
  precepts: string[]; // 門規戒律
  mentors: string[]; // 可拜之師
  hall: string; // 入門所在山門／殿堂
  rite: string; // 入門驗身儀節敘述（{name} 代入弟子名）
  giftArt?: string; // 入門所授功法（覆寫；否則由 resources 推得）
}

const LORE: Record<string, SectLore> = {
  七玄門: {
    motto: '煉氣淬骨，以武證道；上不愧七玄列祖，下不負同門手足。',
    precepts: ['不得恃武凌弱、欺壓鄉鄰', '同門之危必援，門派之難必赴', '門中武典不得外傳野狼幫等仇敵', '長幼有序，見師長執弟子禮'],
    mentors: ['七絕堂主・墨大夫', '飛鳥堂・厲飛雨', '外刃堂・陸老堂主'],
    hall: '彩霞山七玄門山門',
    rite: '管事引{name}登彩霞山，於演武場前驗看筋骨根器，命試演一趟拳腳、舉石鎖以量氣力。',
    giftArt: '七玄門入門吐納口訣',
  },
  黃楓谷: {
    motto: '采靈煉丹，謹守谷規；道途漫漫，以勤補拙。',
    precepts: ['不得私吞谷中靈藥丹材', '不得與化血教等魔道私通', '同門切磋點到為止，不得傷人性命', '丹方爐火乃立谷之本，不得洩於外宗'],
    mentors: ['丹堂・莫大老', '辨藥堂・李化元', '守谷真傳・陳長老'],
    hall: '黃楓谷主峰落雲殿',
    rite: '司測長老取五行測靈盤，命{name}滴血於盤心，觀五色靈光以驗靈根成色。',
    giftArt: '長春功',
  },
  掩月宗: {
    motto: '陰陽相濟，剛柔並蓄；雙修同參，方窺大道。',
    precepts: ['雙修之道兩情相願，不得強人所難', '宗門密令不得洩於七派', '換形潛行之術不得用於私怨', '尊掩月聖女、敬宗門長老'],
    mentors: ['陰陽堂・蘇真人', '執法堂・銀月長老', '傳功長老・倪氏'],
    hall: '掩月宗陰陽殿',
    rite: '長老以陰陽二氣引{name}入殿，測其靈根陰陽偏性，定其所修一脈。',
  },
  落雲宗: {
    motto: '以丹立宗，封魔守界；天道盟同氣，九國共安瀾。',
    precepts: ['封魔淵之責重於性命，輪值不得擅離', '丹道真傳秘而不宣', '不得通敵赤蓮宗以外之魔道', '同盟有難，須赴援不疑'],
    mentors: ['丹堂・古真人', '守淵堂・雷長老', '傳法太上・雲氏'],
    hall: '落雲宗碧落丹殿',
    rite: '丹殿長老焚一爐辨靈香，觀{name}周身靈氣與爐煙交感之象，以斷丹道之緣。',
  },
  鸞鳴宗: {
    motto: '御劍鳴鸞，丹符兼修；正道一脈，斬妖除魔。',
    precepts: ['劍心須正，不得濫殺', '丹符之術精益求精', '盟中號令，赴湯蹈火', '不容魔道滲透半步'],
    mentors: ['御劍堂・鸞真人', '丹符堂・百里長老'],
    hall: '鸞鳴宗鳴鸞峰劍殿',
    rite: '劍殿長老引{name}立於劍碑之前，以一縷劍意拂體，觀其劍骨與靈根可堪造就否。',
  },
  鬼靈門: {
    motto: '驅鬼役妖，唯力是尊；入我門者，唯命是從。',
    precepts: ['鬼令一下，不得違逆', '同門相爭，敗者認命，門中不問', '所役鬼物不得反噬同門', '叛教者，魂飛魄散'],
    mentors: ['驅鬼長老・陰山', '役妖護法・骷髏叟'],
    hall: '鬼靈門幽冥血壇',
    rite: '護法割{name}指尖血滴入血壇認主，種下一道攝魂禁制，以為驅策之憑。',
    giftArt: '驅鬼煉魂訣',
  },
  合歡宗: {
    motto: '媚術噬陰，逆天奪命；情之一字，皆為我用。',
    precepts: ['採補之道隱秘行之，不得自曝行藏', '宗門吸陰秘術不得授外人', '聖女之命不可違', '叛宗者，生不如死'],
    mentors: ['媚音長老・柳氏', '吸陰護法・歡伯'],
    hall: '合歡宗合歡血壇',
    rite: '長老引{name}入壇，以一縷媚氣探其心魔深淺，種下歡蠱以驗忠順。',
    giftArt: '合歡採補心法',
  },
  御靈宗: {
    motto: '馭蟲役獸，隱於暗處；一擊不中，遠遁千里。',
    precepts: ['靈蟲靈獸乃立宗之本，不得擅殺', '滲透潛伏之事密而不宣', '宗門蟲術不得反用於同門', '叛宗者，蟲噬其魂'],
    mentors: ['馭蟲長老・蠱母', '役獸護法・荒氏'],
    hall: '御靈宗百蟲血窟',
    rite: '長老放出一隻認主靈蟲，命其鑽入{name}經脈認主，以蟲心通其忠逆。',
    giftArt: '御靈馭蟲術',
  },
};

function genLore(sect: SectDef): SectLore {
  if (sect.category === '武林門派') {
    return {
      motto: `${sect.name}立身江湖，重信守義，以武會友。`,
      precepts: ['不得恃強凌弱', '同門有難必相助', '門派絕學不得外傳', '尊師重道，長幼有序'],
      mentors: [`${sect.name}・教頭`, `${sect.name}・堂主`],
      hall: `${sect.name}總壇`,
      rite: `管事驗看{name}筋骨拳腳，量其氣力膽識，以定可造之材否。`,
    };
  }
  if (sect.category === '魔道宗門') {
    return {
      motto: `${sect.name}行事，唯力是尊，唯果是圖。`,
      precepts: ['上命難違，令出必行', '同門相爭，門中不問', '宗門邪術秘不外傳', '叛宗者，魂飛魄散'],
      mentors: [`${sect.name}・護法`, `${sect.name}・長老`],
      hall: `${sect.name}血壇`,
      rite: `護法取{name}心頭血認主，種下禁制以為驅策之憑。`,
    };
  }
  return {
    motto: `${sect.name}承仙道正脈，論功亦論道，勤修不輟。`,
    precepts: ['不得私吞宗門resources', '不與魔道私通', '同門切磋不得傷命', '尊師重道，謹守宗規'],
    mentors: [`${sect.name}・傳功長老`, `${sect.name}・執事`],
    hall: `${sect.name}主殿`,
    rite: `司測長老取測靈盤，驗{name}靈根成色，以斷仙緣深淺。`,
  };
}

export function getLore(sect: SectDef): SectLore {
  return LORE[sect.name] || genLore(sect);
}

/** 由 joinedDay 穩定挑選（避免每次渲染變動）。 */
function pick<T>(arr: T[], seed: number): T {
  if (!arr.length) return arr[0];
  return arr[Math.abs(Math.floor(seed)) % arr.length];
}

/** 入門所拜之師（由 joinedDay 穩定挑選，建立師徒關係）。入門大典本身由 engine/induction 司其儀。 */
export function pickMentor(sect: SectDef, seed: number): string {
  return pick(getLore(sect).mentors, seed + sect.name.length);
}
/** 入門所立門規誓（取一條戒律為誓詞）。 */
export function oathOf(sect: SectDef, seed: number): string {
  return `謹守「${pick(getLore(sect).precepts, seed)}」等門規，違者甘受門法處置。`;
}

// ── 宗門月俸 ──
/** 依階月俸（靈石／月）；高階偶有丹藥例給。 */
export function stipendPerMonth(sect: SectDef, rankIndex: number): number {
  const base = sect.category === '武林門派' ? 1 : 2;
  return base + rankIndex * (sect.category === '武林門派' ? 1 : 3);
}
export function stipendRationPill(sect: SectDef, rankIndex: number): string | null {
  if (sect.category === '武林門派') return rankIndex >= 3 ? '金創療傷藥' : null;
  if (rankIndex < 2) return null;
  if (sect.category === '魔道宗門') return rankIndex >= 4 ? '養魔丹' : '凝血丹';
  return rankIndex >= 4 ? '築基靈丹' : '聚靈丹';
}

const STIPEND_CAP_MONTHS = 12; // 積欠封頂一年，免閉關歸來俸祿暴漲
export interface StipendResult { stones: number; months: number; pill?: string | null; narrative: string }
/** 結算積欠月俸；不足一月則 null。 */
export function accrueStipend(m: SectMembership, sect: SectDef, day: number): StipendResult | null {
  const since = day - (m.lastStipendDay ?? m.joinedDay);
  const months = Math.floor(since / 30);
  if (months < 1) return null;
  const paid = Math.min(months, STIPEND_CAP_MONTHS);
  const stones = paid * stipendPerMonth(sect, m.rankIndex);
  const pill = stipendRationPill(sect, m.rankIndex);
  const capped = months > STIPEND_CAP_MONTHS;
  const unit = sect.category === '武林門派' ? '兩紋銀（折靈石）' : '靈石';
  const narrative = `你赴${getLore(sect).hall}支領積欠月俸：${paid} 個月例俸，共 ${stones} ${unit}${pill ? `，另得本階例給「${pill}」一份` : ''}。${capped ? `（積欠逾年，按例只追補一年；往後莫久疏門中事務。）` : ''}`;
  return { stones, months: paid, pill, narrative };
}

// ── 宗門辦差（耗時日、有變數、偶有橫財或兇險）──
export interface MissionResult {
  meritGain: number;
  daysCost: number;
  narrative: string;
  windfall?: { name: string; type: string; rarity: string; description: string; quantity: number };
  hpLossFrac?: number; // 兇險所傷（佔 maxHp 比例）
  rep?: { righteous?: number; demonic?: number; karma?: number };
}
function missionDays(contribution: number, seed: number): number {
  const r = (Math.sin(seed) + 1) / 2; // 0~1 穩定變數
  if (contribution <= 40) return 5 + Math.round(r * 15); // 5~20 日
  if (contribution <= 100) return 20 + Math.round(r * 40); // 20~60 日
  return 90 + Math.round(r * 210); // 3 月 ~ 1 年
}
export function runMission(sect: SectDef, missionIndex: number, ctx: { day: number; sectName: string }): MissionResult | null {
  const mission = sect.missions[missionIndex];
  if (!mission) return null;
  const seed = ctx.day + missionIndex * 7 + mission.name.length;
  const variance = 0.8 + ((Math.sin(seed * 1.3) + 1) / 2) * 0.5; // 0.8~1.3
  const meritGain = Math.max(1, Math.round(mission.contribution * variance));
  const daysCost = missionDays(mission.contribution, seed);
  const roll = (Math.sin(seed * 2.1) + 1) / 2; // 0~1

  // 魔道差事業力兇名；正道剿魔護道增俠名
  const txt = mission.name + mission.note;
  const rep: MissionResult['rep'] = {};
  if (sect.category === '魔道宗門' || /血祭|採生|伏殺|噬|魔/.test(txt)) { rep.demonic = 6; rep.karma = 8; }
  else if (/剿|除妖|護送|守|封魔|斬魔|緝拿|驅逐/.test(txt)) rep.righteous = 4;

  let windfall: MissionResult['windfall'] | undefined;
  let hpLossFrac: number | undefined;
  let extra = '';
  if (roll > 0.85) {
    // 橫財
    windfall = sect.category === '武林門派'
      ? { name: '江湖散碎財貨', type: '材料', rarity: '普通', description: '辦差途中所獲的散碎財物', quantity: 1 }
      : { name: '無主靈材', type: '材料', rarity: '稀有', description: '辦差途中意外尋得的一份靈材', quantity: 1 };
    extra = '途中更有意外之獲，可謂不虛此行。';
  } else if (roll < 0.15) {
    // 兇險
    hpLossFrac = 0.15 + roll; // 0.15~0.3
    extra = '途中遭逢凶險，雖勉力完差，卻也受了些傷。';
  }

  const narrative = `你為「${ctx.sectName}」辦「${mission.name}」——${mission.note}。歷時約 ${daysCost} 日，事畢得功勳 +${meritGain}（兼計可支貢獻）。${extra}`;
  return { meritGain, daysCost, narrative, windfall, hpLossFrac, rep };
}

// ── 晉升大典 ──
export interface PromotionResult { beats: SectCeremonyBeat[]; rewardStones: number; rewardItem?: { name: string; type: string; rarity: string; description: string; quantity: number }; title?: string }
export function buildPromotionCeremony(sect: SectDef, newRankIndex: number, ctx: { playerName: string }): PromotionResult {
  const rank = sect.ranks[newRankIndex];
  const lore = getLore(sect);
  const rewardStones = (newRankIndex + 1) * (sect.category === '武林門派' ? 3 : 8);
  const beats: SectCeremonyBeat[] = [
    { rite: '擢升', text: `${lore.hall}鐘鼓齊鳴，掌門當眾宣你功勳資歷俱足、修為已及，擢升為「${rank.name}」。`, tone: 'special' },
    { rite: '受任', text: `${rank.perk}另賜靈石 ${rewardStones} 以勵後進。`, tone: 'gain' },
  ];
  let rewardItem: PromotionResult['rewardItem'] | undefined;
  let title: string | undefined;
  // 入內門／核心／真傳等里程碑授信物或榮銜
  if (newRankIndex === Math.floor(sect.ranks.length / 2)) {
    rewardItem = { name: `${sect.name}內門信符`, type: '法宝', rarity: '稀有', description: '入主內門的憑信，可調閱藏經閣中階典籍', quantity: 1 };
    beats.push({ rite: '入室', text: `自此你得入藏經閣中殿，門中中階傳承向你敞開。`, tone: 'gain' });
  }
  if (newRankIndex >= sect.ranks.length - 1) {
    title = `${sect.name}長老`;
    beats.push({ rite: '列席', text: `你位列宗門高層，自此一言可動門中人手，亦肩一門興衰之責。`, tone: 'special' });
  }
  return { beats, rewardStones, rewardItem, title };
}

// ── 離宗：正道好聚好散；魔道叛教遭追殺 ──
export interface DepartureResult { betrayal: boolean; narrative: string; tone: 'normal' | 'danger'; rep?: { demonic?: number; karma?: number } }
export function departureOutcome(sect: SectDef, m: SectMembership): DepartureResult {
  if (sect.category === '魔道宗門') {
    return {
      betrayal: true,
      narrative: `你欲脫離「${sect.name}」——魔道豈容叛離？識海中的攝魂禁制驟然絞動，你拼力鎮壓方得保全神智。自此宗門視你為叛徒，必遣人追殺，兇名亦隨之加身。`,
      tone: 'danger',
      rep: { demonic: 10, karma: 12 },
    };
  }
  const honour = (m.merit ?? m.contribution) >= (sect.ranks[Math.min(2, sect.ranks.length - 1)]?.reqContribution ?? 0);
  return {
    betrayal: false,
    narrative: honour
      ? `你向掌門遞上辭呈，繳還信物。念你昔日功勳，門中以禮相送：「道途各異，他日江湖再會，仍是故人。」自此你與「${sect.name}」再無瓜葛，然師門情誼尚存。`
      : `你向管事言明去意，繳還信物，自請出門。門中不強留，淡淡一句「好自為之」，便由你去了。`,
    tone: 'normal',
  };
}

// ── 宗門盛事：開壇講道／宗門大比／秘境開啟 ──
const EVENT_DEFS: Record<SectEventState['kind'], { title: string; window: [number, number]; desc: (sect: SectDef) => string }> = {
  lecture: { title: '開壇講道', window: [90, 180], desc: (s) => `${getLore(s).hall}將有長老登壇講道，闡演${s.category === '魔道宗門' ? '魔功秘要' : '上乘道法'}，門中弟子皆可旁聽參悟，於修為大有裨益。` },
  tournament: { title: '宗門大比', window: [45, 90], desc: (s) => `${s.name}三年一度的內門大比將啟，弟子同台較技，魁首得記大功、受掌門賞賜，更可揚名門中。` },
  secret_realm: { title: '秘境開啟', window: [120, 240], desc: (s) => `${s.name}所轄一處${s.category === '魔道宗門' ? '魔淵秘窟' : '試煉秘境'}靈氣潮湧、禁制鬆動，宗門特許弟子入內歷練、搜尋機緣，然其中亦藏凶險。` },
};
/** 在門中辦事時，按機率催動一場宗門盛事；既有未過期者則沿用。 */
export function maybeRollSectEvent(sect: SectDef, day: number, existing: SectEventState | null | undefined): SectEventState | null {
  if (existing && existing.sectId === sect.id && day <= existing.endDay) return existing; // 沿用未過期者
  // 過期或無 → 以 45% 催生新盛事
  const seed = day + sect.name.length;
  if ((Math.sin(seed * 3.7) + 1) / 2 > 0.55) return null;
  const kinds: SectEventState['kind'][] = sect.category === '武林門派' ? ['tournament', 'secret_realm'] : ['lecture', 'tournament', 'secret_realm'];
  const kind = pick(kinds, seed);
  const def = EVENT_DEFS[kind];
  const span = def.window[0] + Math.round(((Math.sin(seed * 5.1) + 1) / 2) * (def.window[1] - def.window[0]));
  return { kind, sectId: sect.id, title: def.title, desc: def.desc(sect), startDay: day, endDay: day + span };
}

export interface EventResult { meritGain: number; expGain: number; stones: number; daysCost: number; narrative: string; item?: { name: string; type: string; rarity: string; description: string; quantity: number }; title?: string; tone: 'gain' | 'special' }
export function resolveSectEvent(event: SectEventState, sect: SectDef, ctx: { day: number; rankIndex: number; playerName: string }): EventResult {
  const seed = ctx.day + event.title.length;
  const roll = (Math.sin(seed * 4.3) + 1) / 2;
  if (event.kind === 'lecture') {
    const expGain = 200 + ctx.rankIndex * 150 + Math.round(roll * 300);
    return { meritGain: 5, expGain, stones: 0, daysCost: 7, tone: 'special', narrative: `你赴${getLore(sect).hall}旁聽長老講道，凝神參悟，胸中道理豁然開朗，修為精進不少（修為 +${expGain}）。` };
  }
  if (event.kind === 'tournament') {
    const win = roll > 0.5 || ctx.rankIndex >= 3;
    const meritGain = win ? 60 + ctx.rankIndex * 20 : 20;
    const stones = win ? 20 : 5;
    return {
      meritGain, expGain: 100, stones, daysCost: 10, tone: win ? 'special' : 'gain',
      title: win ? '內門大比魁首' : undefined,
      narrative: win
        ? `宗門大比之上，你過關斬將、力壓群雄，奪得魁首！掌門當眾賞功（功勳 +${meritGain}、靈石 +${stones}），「大比魁首」之名傳遍門中。`
        : `宗門大比之上，你雖未奪魁，亦有不俗表現，記功勳 +${meritGain}、靈石 +${stones}。`,
    };
  }
  // secret_realm
  const fortune = roll > 0.7;
  const item = fortune
    ? { name: sect.category === '魔道宗門' ? '魔淵異寶' : '秘境靈材', type: sect.category === '魔道宗門' ? '法宝' : '材料', rarity: '珍稀', description: '宗門秘境中搜得的一份難得收穫', quantity: 1 }
    : undefined;
  return {
    meritGain: 30, expGain: 150, stones: 0, daysCost: 30, tone: fortune ? 'special' : 'gain', item,
    narrative: fortune
      ? `你入宗門秘境歷練月餘，避過數重凶險，竟在深處尋得一份機緣！（功勳 +30，另有所獲）`
      : `你入宗門秘境歷練月餘，斬獲歷練之功（功勳 +30），雖無奇遇，亦增見識。`,
  };
}

/** 盛事剩餘時日描述（供提醒）。 */
export function eventCountdown(event: SectEventState, day: number): string {
  const left = event.endDay - day;
  if (left <= 0) return '（即將結束）';
  if (left < 30) return `（尚餘約 ${left} 日）`;
  return `（尚餘約 ${Math.round(left / 30)} 月）`;
}
