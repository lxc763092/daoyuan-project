/**
 * 聲望/名號：以正邪兩軸聲望值決定玩家的「名號」，世界（NPC 反應、勢力關係、可接內容）據此改觀。
 * 純資料+邏輯；揚名事蹟由各系統（任務/戰鬥/正史介入）呼叫 applyDeed 累積。
 */
import type { Reputation, ReputationTitle } from '../types';

// 基礎名號（fallback）；agent 授權的名號由 setReputationTitles union 併入。
export const FALLBACK_TITLES: ReputationTitle[] = [
  { axis: '正道', tier: 1, name: '略有俠名', threshold: 30, effect: '正道散修略生好感。' },
  { axis: '正道', tier: 2, name: '一方俠士', threshold: 120, effect: '正道勢力友善相待，魔修暗生警惕。' },
  { axis: '正道', tier: 3, name: '正道大俠', threshold: 360, effect: '正道大開方便之門，魔道視為眼中釘。' },
  { axis: '正道', tier: 4, name: '正道魁首', threshold: 900, effect: '正道景從、登高一呼；魔道必欲除之而後快。' },
  { axis: '魔道', tier: 1, name: '初露兇名', threshold: 30, effect: '散修見之忌憚三分。' },
  { axis: '魔道', tier: 2, name: '一方魔頭', threshold: 120, effect: '凡夫散修聞風喪膽，正道開始追緝。' },
  { axis: '魔道', tier: 3, name: '魔道巨梟', threshold: 360, effect: '魔道爭相歸附，正道高懸懸賞圍剿。' },
  { axis: '魔道', tier: 4, name: '魔道巨擘', threshold: 900, effect: '一身兇名鎮壓一方，所過之處正道膽寒。' },
];

let TITLES: ReputationTitle[] = FALLBACK_TITLES.slice();
/** 併入 agent 授權名號（去重 by axis+tier+name）。 */
export function setReputationTitles(authored: ReputationTitle[]): void {
  if (!authored || !authored.length) return;
  const seen = new Set(FALLBACK_TITLES.map((t) => t.axis + t.tier + t.name));
  const extra = authored.filter((t) => t && t.name && !seen.has(t.axis + t.tier + t.name));
  TITLES = [...FALLBACK_TITLES, ...extra];
}

export function initReputation(): Reputation {
  return { righteous: 0, demonic: 0, deeds: 0 };
}

/** 主導軸（正/魔）與其聲望值。 */
function dominant(rep: Reputation): { axis: '正道' | '魔道'; value: number } {
  return rep.righteous >= rep.demonic ? { axis: '正道', value: rep.righteous } : { axis: '魔道', value: rep.demonic };
}

/** 當前名號（取主導軸下、閾值已達的最高階）。 */
export function currentTitle(rep: Reputation): ReputationTitle | null {
  const d = dominant(rep);
  if (d.value < (TITLES[0]?.threshold ?? 30)) return null; // 籍籍無名
  const cands = TITLES.filter((t) => t.axis === d.axis && t.threshold <= d.value).sort((a, b) => b.threshold - a.threshold);
  return cands[0] || null;
}

export function titleName(rep: Reputation): string {
  return currentTitle(rep)?.name || '籍籍無名';
}

/** 累積揚名事蹟，回傳新的 Reputation（含更新後名號）。 */
export function applyDeed(rep: Reputation | undefined, d: { righteous?: number; demonic?: number }): { rep: Reputation; promoted: boolean; title: string } {
  const base = rep || initReputation();
  const before = titleName(base);
  const next: Reputation = {
    righteous: Math.max(0, base.righteous + (d.righteous || 0)),
    demonic: Math.max(0, base.demonic + (d.demonic || 0)),
    deeds: base.deeds + 1,
  };
  const title = titleName(next);
  next.titleName = title;
  return { rep: next, promoted: title !== before && title !== '籍籍無名', title };
}

/**
 * 依玩家名號對某勢力/NPC 陣營的反應偏置（-好感…+好感）。
 * 同陣營加分、敵對陣營扣分；聲望越高幅度越大。
 */
export function reactionBias(rep: Reputation | undefined, alignment?: string): number {
  if (!rep || !alignment) return 0;
  const d = dominant(rep);
  const mag = Math.min(25, Math.round(d.value / 36));
  if (mag <= 0) return 0;
  const a = alignment;
  const isRighteous = /正|俠|名門|仙/.test(a);
  const isDemonic = /魔|邪|兇|血/.test(a);
  if (d.axis === '正道') { if (isRighteous) return mag; if (isDemonic) return -mag; }
  else { if (isDemonic) return mag; if (isRighteous) return -mag; }
  return 0;
}
