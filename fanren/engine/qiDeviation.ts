/**
 * 走火入魔／心魔／壽元壓力：為修煉與突破注入「即時風險」，讓選擇有重量。
 * 純邏輯；由 turnEngine 在 cultivate/breakthrough/devour 時呼叫，回傳機制後果與敘事。
 * 風險隨「境界、業力、閉關時長、道心」浮動——高境界閉關久、業力重者最易出事。
 */
import type { QiEvent } from '../types';

// 基礎心魔事件（fallback）；agent 授權事件由 setQiEvents union 併入。
export const FALLBACK_QI_EVENTS: QiEvent[] = [
  { id: 'qd_minor_1', trigger: 'cultivate', severity: 1, name: '心浮氣躁', desc: '靈氣運轉間忽生雜念，丹田一陣翻湧。', effect: '修為微損' },
  { id: 'qd_minor_2', trigger: 'cultivate', severity: 2, name: '經脈逆衝', desc: '一道真氣走岔了經脈，胸口窒悶、隱隱作痛。', effect: '氣血受損、修為小損' },
  { id: 'qd_inner_1', trigger: 'cultivate', severity: 3, name: '心魔暗生', desc: '靜室之中，往昔仇怨與貪欲化作魅影叩擊道心。', effect: '業力增、修為損；道心穩者可化解' },
  { id: 'qd_devour_1', trigger: 'devour', severity: 4, name: '噬念反噬', desc: '吞噬的精粹中夾雜怨念，沿經脈反咬己身神魂。', effect: '氣血重創、業力大增' },
  { id: 'qd_break_1', trigger: 'breakthrough', severity: 3, name: '衝關氣亂', desc: '衝擊瓶頸之際真氣紊亂，險些前功盡棄。', effect: '修為損、氣血傷' },
  { id: 'qd_break_2', trigger: 'breakthrough', severity: 5, name: '心魔劫起', desc: '突破關頭心魔化作至親至愛、宿敵故人，亂你道心、奪你神智。', effect: '重創、損壽、業力增；敗則入魔之危' },
  { id: 'qd_karma_1', trigger: 'karma', severity: 4, name: '業力纏身', desc: '積年業力翻湧，冥冥中似有天道垂注，諸事不順、心緒難寧。', effect: '修為損、氣運跌' },
];

let EVENTS: QiEvent[] = FALLBACK_QI_EVENTS.slice();
export function setQiEvents(authored: QiEvent[]): void {
  if (!authored || !authored.length) return;
  const seen = new Set(FALLBACK_QI_EVENTS.map((e) => e.id));
  EVENTS = [...FALLBACK_QI_EVENTS, ...authored.filter((e) => e && e.id && !seen.has(e.id))];
}

export interface QiContext {
  realmRank: number; // 0 煉氣 … 9 真仙
  karma: number;
  daysElapsed: number; // 本次行動跨越天數（閉關越久越險）
  daoHeartResist?: number; // 道心抗性（breakthroughBonus/karmaResist 之類，0..1）
  rng?: () => number;
}
export interface QiOutcome {
  event: QiEvent | null;
  deltas: { exp?: number; hp?: number; lifespan?: number; luck?: number };
  karma: number;
  narrative: string;
}

/** 觸發機率：境界×業力×閉關時長，減去道心抗性。 */
function deviationChance(trigger: QiEvent['trigger'], ctx: QiContext): number {
  const base = trigger === 'breakthrough' ? 0.28 : trigger === 'devour' ? 0.22 : trigger === 'karma' ? 0.18 : 0.06;
  const realmF = ctx.realmRank * 0.012; // 越高境界心魔越烈
  const karmaF = Math.min(0.3, (ctx.karma || 0) / 200);
  const seclusionF = trigger === 'cultivate' ? Math.min(0.12, (ctx.daysElapsed || 0) / 3600 * 0.12) : 0;
  const resist = Math.min(0.35, ctx.daoHeartResist || 0);
  return Math.max(0, Math.min(0.85, base + realmF + karmaF + seclusionF - resist));
}

/** 擲算走火入魔／心魔。安然無事則 event=null。 */
export function rollQiDeviation(trigger: QiEvent['trigger'], ctx: QiContext): QiOutcome {
  const rng = ctx.rng || Math.random;
  const chance = deviationChance(trigger, ctx);
  if (rng() >= chance) return { event: null, deltas: {}, karma: 0, narrative: '' };

  const pool = EVENTS.filter((e) => e.trigger === trigger);
  const pick = (pool.length ? pool : EVENTS)[Math.floor(rng() * (pool.length ? pool.length : EVENTS.length))];
  const sev = pick.severity || 2;
  // 機制後果隨嚴重度縮放
  const deltas: QiOutcome['deltas'] = {};
  deltas.hp = -Math.round(sev * (8 + ctx.realmRank * 2));
  let karma = 0;
  let narrative = `\n\n⚠️【${pick.name}】${pick.desc}`;
  // 道心抗性可減輕後果
  const mitigate = (ctx.daoHeartResist || 0) > 0.2 && rng() < 0.5;
  if (mitigate) {
    narrative += ` 幸你道心堅凝，強自鎮壓下來，未釀大禍。`;
    deltas.hp = Math.round((deltas.hp || 0) * 0.4);
  } else {
    if (sev >= 2) deltas.exp = -Math.round(sev * 0.0006 * (1 + ctx.realmRank) * 100000); // 損修為（與境界相關）
    if (sev >= 3) karma += sev * 2;
    if (sev >= 4) deltas.lifespan = -sev * 0.5; // 損壽（年）
    if (pick.trigger === 'karma') deltas.luck = -sev;
    narrative += ` （${pick.effect}）`;
  }
  return { event: pick, deltas, karma, narrative };
}
