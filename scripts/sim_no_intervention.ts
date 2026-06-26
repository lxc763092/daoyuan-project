/**
 * 不介入模擬：玩家完全不動，世界從 day0 推進到人界終點（章1265＋緩衝），
 * 驗證韓立沿原著正史自動走完全程、最終偷渡空間節點入靈界。
 * 跑法： npx esbuild scripts/sim_no_intervention.ts --bundle --platform=node --format=cjs --outfile=scripts/.sim_tmp.cjs && node scripts/.sim_tmp.cjs
 */
import {
  SCHEDULED_EVENTS,
  buildInitialNpcStates,
  resolveNpcAtDay,
  getNpc,
  getRegion,
  realmRank,
} from '../fanren/engine/canonLoader';
import { evolveWorld } from '../fanren/engine/worldEvolution';
import { chapterToDay } from '../fanren/engine/clock';
import { allTrials, hanliRealmAt } from '../fanren/engine/hanliCanonPath';
import { CANON_NPC_FATES } from '../fanren/data/canonNpcFates';
import type { FanrenWorldState } from '../fanren/types';

const END_CH = 1265;
const endDay = chapterToDay(END_CH) + 360; // 終章後再走一年，確保末段節拍全數觸發

let failures = 0;
let warnings = 0;
const fail = (msg: string) => { failures++; console.log('  ✗ ' + msg); };
const warn = (msg: string) => { warnings++; console.log('  ⚠ ' + msg); };
const ok = (msg: string) => console.log('  ✓ ' + msg);

// ── 靜態檢查：節拍資料品質 ──
console.log('【靜態檢查】');
const beats = SCHEDULED_EVENTS.filter((e) => e.tier === 'beat');
const renjie = SCHEDULED_EVENTS.filter((e) => e.chapterAnchor <= END_CH);
console.log(`  事件總數 ${SCHEDULED_EVENTS.length}（人界 ${renjie.length}；其中節拍 ${beats.length}）`);
if (beats.length < 400) fail(`節拍數 ${beats.length} 過少，疑似 gen_beats 未跑或弧段缺漏`);
else ok(`節拍數 ${beats.length}`);

// 人界節拍章覆蓋：主線不得有 >12 章的空洞（節拍以 ch 計，弧界 30 章內應有 ~15+ 拍）
const chList = beats.filter((b) => b.chapterAnchor <= END_CH).map((b) => b.chapterEnd ?? b.chapterAnchor).sort((a, b) => a - b);
let maxGap = 0; let gapAt = 0;
for (let i = 1; i < chList.length; i++) {
  const g = chList[i] - chList[i - 1];
  if (g > maxGap) { maxGap = g; gapAt = chList[i - 1]; }
}
if (maxGap > 12) warn(`節拍最大章空洞 ${maxGap}（在章 ${gapAt} 之後）`);
else ok(`節拍最大章空洞 ${maxGap}`);

// 地點與 NPC 可解析
let badLoc = 0; let badNpc = 0;
for (const b of beats) {
  if (!getRegion(b.locationId)) badLoc++;
  for (const n of b.involvedNpcIds) if (!getNpc(n)) badNpc++;
}
if (badLoc) warn(`${badLoc} 個節拍 locationId 無法解析為地圖節點`);
else ok('全部節拍 locationId 可解析');
if (badNpc) warn(`${badNpc} 個節拍 NPC 名無法解析（不影響觸發，僅少 NPC 反應）`);
else ok('全部節拍 NPC 可解析');

// ── 動態模擬：90 天一步推進 ──
console.log('【動態模擬】不介入推進到人界終點……');
let state = {
  currentLocationId: '七玄門',
  npcStates: buildInitialNpcStates(0),
  worldEventStates: {},
  clock: { totalDays: 0, year: 1, month: 1, day: 1 },
  progressChapter: 1,
} as unknown as FanrenWorldState;

const firedOrder: string[] = [];
const STEP = 90;
// 先補觸發 day 0 的事件（首拍 ch1＝day0，evolveWorld 視窗為 (old, new]，須自 -1 起算）
{
  const evo0 = evolveWorld(state, -1, 0);
  state = { ...state, npcStates: evo0.npcStates, worldEventStates: evo0.worldEventStates } as FanrenWorldState;
  firedOrder.push(...evo0.firedEventIds);
}
let old = 0;
for (let d = STEP; d <= endDay + STEP; d += STEP) {
  const evo = evolveWorld(state, old, d);
  state = { ...state, npcStates: evo.npcStates, worldEventStates: evo.worldEventStates } as FanrenWorldState;
  firedOrder.push(...evo.firedEventIds);
  old = d;
}

const byId = new Map(SCHEDULED_EVENTS.map((e) => [e.id, e]));

// 1) 觸發順序 = 章序（非遞減）
let orderBad = 0; let lastCh = 0;
for (const id of firedOrder) {
  const e = byId.get(id)!;
  if (e.chapterAnchor < lastCh) orderBad++;
  lastCh = Math.max(lastCh, e.chapterAnchor);
}
if (orderBad) fail(`${orderBad} 件事件觸發順序與章序顛倒`);
else ok('觸發順序與章序一致');

// 2) 人界事件全數觸發
const firedSet = new Set(firedOrder);
const missing = renjie.filter((e) => !firedSet.has(e.id));
if (missing.length) fail(`人界事件 ${missing.length} 件未觸發：${missing.slice(0, 5).map((e) => e.id).join('、')}…`);
else ok(`人界 ${renjie.length} 件事件全數自動觸發`);

// 3) 終點：偷渡空間節點
const finale = [...firedOrder].map((id) => byId.get(id)!).filter((e) => e.chapterAnchor >= 1255 && e.chapterAnchor <= END_CH);
const KEY = /(空間節點|偷渡|節點|冰鳳)/;
const hasFinale = finale.some((e) => KEY.test(e.title) || KEY.test(e.summary));
if (!hasFinale) fail('章1255–1265 區間沒有任何「空間節點／偷渡／冰鳳」事件觸發——韓立沒走到偷渡靈界');
else ok(`偷渡靈界終點事件已觸發：${finale.filter((e) => KEY.test(e.title) || KEY.test(e.summary)).map((e) => `${e.id}@${e.chapterAnchor}`).join('、')}`);

// 4) 韓立境界里程碑（依正史窗格解析）
const hanli = getNpc('韓立');
if (!hanli) fail('canonNpcs 找不到韓立');
else {
  const expectAt: Array<[ch: number, tokens: string[]]> = [
    [50, ['凡人', '煉氣']],
    [250, ['築基']],
    [460, ['結丹']],
    [700, ['元嬰']],
    [1262, ['化神']],
  ];
  for (const [ch, tokens] of expectAt) {
    const r = resolveNpcAtDay(hanli, chapterToDay(ch));
    const hit = tokens.some((t) => r.realm.includes(t));
    if (!hit) fail(`章${ch} 韓立境界「${r.realm}」不含預期 ${tokens.join('/')}（地點 ${r.locationId}）`);
    else ok(`章${ch} 韓立＝${r.realm} @ ${r.locationId}`);
  }
  // 窗格無縫：人界每 10 章抽樣，狀態不得為 unknown
  let unknownAt: number[] = [];
  for (let ch = 5; ch <= END_CH; ch += 10) {
    const r = resolveNpcAtDay(hanli, chapterToDay(ch));
    if (r.status === 'unknown') unknownAt.push(ch);
  }
  if (unknownAt.length) warn(`韓立窗格在 ${unknownAt.length} 個抽樣章呈 unknown（如章 ${unknownAt.slice(0, 5).join('、')}）`);
  else ok('韓立人界窗格無縫（每10章抽樣皆有狀態）');
  // 境界曲線：除原著「已知修為大降段」外不得倒退
  //  - 章352–370：誤救南宮屏，真元被輪迴真訣吸走，築基中期暴跌煉氣三四層。
  //  - 章850–920：降靈符附體之力反噬／五鬼鎖神大法封印，元嬰假象跌回築基，再自煉氣逐步恢復。
  const KNOWN_DIPS: Array<[number, number]> = [[348, 372], [850, 922]];
  const inDip = (c: number) => KNOWN_DIPS.some(([a, b]) => c >= a && c <= b);
  let lastRank = 0; let regress = 0; const regAt: number[] = [];
  for (let ch = 5; ch <= END_CH; ch += 5) {
    const r = resolveNpcAtDay(hanli, chapterToDay(ch));
    const rk = realmRank(r.realm);
    if (rk < lastRank && !inDip(ch)) { regress++; regAt.push(ch); }
    lastRank = rk;
  }
  if (regress) warn(`韓立境界曲線出現 ${regress} 次未注釋的倒退（章 ${regAt.slice(0, 6).join('、')}；已豁免真元被吸/降靈符反噬段）`);
  else ok('韓立境界曲線單調（已豁免正史修為大降段）');
}

// ── 5) 試煉台帳：韓立依序面對全部試煉、入場境界達門檻、終局＝偷渡靈界 ──
console.log('【試煉台帳】嚴格依原著的生死大考');
const trials = allTrials();
console.log(`  試煉總數 ${trials.length}（涵蓋章 ${trials[0].chapterStart}–${trials[trials.length - 1].chapterEnd}）`);
let trialOrderBad = 0; let lastStart = -1;
for (const t of trials) {
  if (t.chapterStart < lastStart) trialOrderBad++; // 起始章須非遞減（試煉窗可重疊，如荒島求生與結丹並行）
  lastStart = t.chapterStart;
}
if (trialOrderBad) fail(`${trialOrderBad} 道試煉起始章序錯亂`); else ok('試煉依章序排列（窗可重疊，如孤島求生×凝丹並行）');
// 入場境界門檻：韓立進入每道試煉時的境界須 ≥ realmGate
let gateBad = 0; const gateMiss: string[] = [];
for (const t of trials) {
  const realmAtStart = hanliRealmAt(chapterToDay(t.chapterStart));
  if (realmRank(realmAtStart) < realmRank(t.realmGate)) { gateBad++; gateMiss.push(`${t.id}(${realmAtStart}<${t.realmGate})`); }
}
if (gateBad) fail(`${gateBad} 道試煉韓立入場境界低於門檻：${gateMiss.slice(0, 4).join('、')}`);
else ok('韓立入場境界皆達各試煉門檻（修仙之難：步步生死大考）');
// 終局試煉＝偷渡靈界
const last = trials[trials.length - 1];
if (/節點|偷渡|靈界/.test(last.title) && last.realmGate.includes('化神')) ok(`終局試煉＝${last.title}（${last.realmGate}）`);
else fail(`終局試煉非偷渡靈界：${last.title}`);

// ── 6) 主要 NPC 走完原著結局 ──
console.log('【主要 NPC 結局】不介入推演下，各自命運是否落定');
const fatesMajor = CANON_NPC_FATES.filter((f) => f.importance === 'major' || f.appearances >= 4);
console.log(`  追蹤 ${fatesMajor.length} 位要角的結局里程碑`);
// 抽查標誌性 NPC 死亡是否在終點前落定
const deathChecks: Array<[string, number]> = [
  ['墨居仁', 60], ['李化元', 720], ['金光上人', 99],
];
let fateBad = 0;
for (const [name, byCh] of deathChecks) {
  const npc = getNpc(name);
  if (!npc) { warn(`結局抽查找不到 NPC：${name}`); continue; }
  const r = resolveNpcAtDay(npc, chapterToDay(byCh + 30));
  if (r.status === 'dead') ok(`${name} 於第${byCh}章前已隕落（結局落定）`);
  else { fateBad++; fail(`${name} 至第${byCh}章仍未依正史隕落（status=${r.status}）`); }
}
// 結局里程碑在人界終點前觸發數
const firedFates = CANON_NPC_FATES.filter((f) => chapterToDay(f.fateChapter) <= endDay).length;
ok(`人界終點前共 ${firedFates}/${CANON_NPC_FATES.length} 位 NPC 結局里程碑到期`);

console.log(`\n結果：${failures} 失敗、${warnings} 警告`);
process.exit(failures ? 1 : 0);
