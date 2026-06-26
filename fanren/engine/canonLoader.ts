/** 正史資料存取層：把章號錨點的來源資料轉成以「天」為單位的執行期查詢。 */
import type {
  CanonEventSource,
  CanonNpcSource,
  NpcRuntimeState,
  RegionDef,
} from '../types';
import { CANON_NPCS } from '../data/canonNpcs';
import { CANON_EVENTS } from '../data/canonTimeline';
import { CANON_BEATS } from '../data/canonBeats';
import { REGIONS } from '../data/regions';
import { WORLD_MAP } from '../data/worldMap';
import { chapterToDay } from './clock';

/**
 * 由任意境界字串穩健解析「大境界」階序（0 煉氣/凡人 … 11 真仙）。供 minRealm 門檻比較。
 * 由高而低判定，確保：
 *  - 簡繁變體等價（築/筑、結/结、嬰/婴、煉/炼、虛/虚、體/体）；
 *  - 含子境界後綴亦可辨（「元嬰中期」「結丹後期」不再漏判為 0）；
 *  - 偽裝/封印的低階描述不致蓋過本相（「結丹期（偽裝煉氣）」取結丹、「（本相元嬰）」取元嬰）。
 * 與 engine/realm.ts 的 majorRealmRank 同一階梯，但向上延伸涵蓋靈界以上，且各階間留間隔供未來細分。
 */
export function realmRank(realm: string | undefined): number {
  const r = realm || '';
  if (/真仙|仙界/.test(r)) return 11;
  if (/渡劫/.test(r)) return 10;
  if (/大乘|長生|长生|聖祖|圣祖/.test(r)) return 9;
  if (/合體|合体|合道/.test(r)) return 8;
  if (/煉虛|炼虚|煉虚|炼虛/.test(r)) return 7;
  if (/化神/.test(r)) return 6;
  if (/元嬰|元婴/.test(r)) return 5;
  if (/結丹|结丹|金丹/.test(r)) return 4;
  if (/築基|筑基/.test(r)) return 3;
  if (/煉氣|炼气|煉气|炼氣/.test(r)) return 2;
  if (/凡人|普通人|未修煉|未修炼/.test(r)) return 1;
  return 0;
}

// ── 索引 ──
// 卷次 → 約略解鎖章號（供詳細地圖節點換算 unlockChapter）
const VOL_FIRST_CHAPTER: Record<number, number> = {
  1: 1, 2: 100, 3: 160, 4: 500, 5: 760, 6: 900, 7: 1180, 8: 1300, 9: 1500, 10: 1900, 11: 2350, 12: 2400, 13: 2440,
};
const REGION_MAP: Record<string, RegionDef> = {};
for (const r of REGIONS) REGION_MAP[r.id] = r;
// 併入詳細世界地圖（以中文名為鍵；不覆蓋既有地點）
for (const n of WORLD_MAP) {
  if (!REGION_MAP[n.name]) {
    REGION_MAP[n.name] = {
      id: n.name,
      name: n.name,
      tier: n.tier,
      parentId: n.parentId,
      description: n.description,
      unlockChapter: VOL_FIRST_CHAPTER[n.firstVolume || 1] || 1,
    };
  }
}

const NPC_MAP: Record<string, CanonNpcSource> = {};
for (const n of CANON_NPCS) {
  NPC_MAP[n.id] = n;
  NPC_MAP[n.name] = n;
}

// 事件依世界日排序（手工策展大事件 ＋ game_db 逐章節拍；id 衝突時大事件優先）
export interface ScheduledEvent extends CanonEventSource {
  scheduledDay: number;
}
const MAJOR_IDS = new Set(CANON_EVENTS.map((e) => e.id));
export const SCHEDULED_EVENTS: ScheduledEvent[] = [
  ...CANON_EVENTS.map((e) => ({ ...e, tier: e.tier ?? ('major' as const) })),
  ...CANON_BEATS.filter((b) => !MAJOR_IDS.has(b.id)),
]
  .map((e) => ({
    ...e,
    scheduledDay: chapterToDay(e.chapterAnchor),
  }))
  .sort((a, b) => a.scheduledDay - b.scheduledDay || a.chapterAnchor - b.chapterAnchor);

export function getRegion(id: string): RegionDef | undefined {
  return REGION_MAP[id];
}
export function allNpcNames(): string[] {
  return CANON_NPCS.map((n) => n.name);
}
export function allLocationNames(): string[] {
  return Array.from(new Set([...REGIONS.map((r) => r.name), ...WORLD_MAP.map((n) => n.name)]));
}
export function getNpc(idOrName: string): CanonNpcSource | undefined {
  return NPC_MAP[idOrName];
}

const EVENT_MAP: Record<string, ScheduledEvent> = {};
for (const e of SCHEDULED_EVENTS) EVENT_MAP[e.id] = e;
export function getEvent(id: string): ScheduledEvent | undefined {
  return EVENT_MAP[id];
}

/** 進度章號 → 可見劇透層級預算（0 公開 → 3 終局）。 */
export function spoilerBudget(chapter: number): number {
  if (chapter >= 1900) return 3;
  if (chapter >= 1180) return 2;
  if (chapter >= 500) return 1;
  return 0;
}

export interface ResolvedNpc {
  locationId: string;
  realm: string;
  status: NpcRuntimeState['status'];
  activity: string;
  canonEventIds?: string[];
}

/** 解析某 NPC 在指定世界日的正史狀態（彈性時間窗）。 */
export function resolveNpcAtDay(npc: CanonNpcSource, day: number): ResolvedNpc {
  let chosen: ResolvedNpc | null = null;
  for (const c of npc.chronicle) {
    const from = chapterToDay(c.fromChapter);
    const to = chapterToDay(c.toChapter);
    if (day >= from && day <= to) {
      chosen = { locationId: c.locationId, realm: String(c.realm), status: c.status, activity: c.activity, canonEventIds: c.canonEventIds };
      break;
    }
    if (day < from) {
      // 尚未到此段：停在前一段或視為「未現身」
      break;
    }
    chosen = { locationId: c.locationId, realm: String(c.realm), status: c.status, activity: c.activity };
  }
  if (!chosen) {
    const first = npc.chronicle[0];
    if (first && day < chapterToDay(first.fromChapter)) {
      return { locationId: first.locationId, realm: String(first.realm), status: 'unknown', activity: '尚未現於世人眼前' };
    }
    const last = npc.chronicle[npc.chronicle.length - 1];
    if (last) return { locationId: last.locationId, realm: String(last.realm), status: last.status, activity: npc.canonFate };
  }
  return chosen || { locationId: '未知', realm: '凡人', status: 'unknown', activity: '行蹤不明' };
}

/** 建立遊戲開始時的 NPC 執行期狀態表。 */
export function buildInitialNpcStates(startDay: number): Record<string, NpcRuntimeState> {
  const out: Record<string, NpcRuntimeState> = {};
  for (const npc of CANON_NPCS) {
    const r = resolveNpcAtDay(npc, startDay);
    out[npc.id] = {
      id: npc.id,
      realm: r.realm,
      locationId: r.locationId,
      status: r.status,
      relationship: 0,
      knownToPlayer: false,
      diverged: false,
      lastSyncDay: startDay,
    };
  }
  return out;
}

/** 取得 (fromDay, toDay] 內預定發生的正史事件。 */
export function eventsInWindow(fromDay: number, toDay: number): ScheduledEvent[] {
  return SCHEDULED_EVENTS.filter((e) => e.scheduledDay > fromDay && e.scheduledDay <= toDay);
}

/** 取得目前時間點「附近」的正史事件（供世界提醒）。 */
export function eventsNear(day: number, windowDays: number): ScheduledEvent[] {
  return SCHEDULED_EVENTS.filter((e) => Math.abs(e.scheduledDay - day) <= windowDays);
}
