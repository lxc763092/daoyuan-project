/**
 * 道元纪数据存取层：替代原 canonLoader，提供执行期数据查询。
 * 保留通用工具函数（realmRank / getRegion），将正史事件/NPC系统替换为道元纪世界演化驱动。
 */
import type { RegionDef, NpcRuntimeState } from '../types';
import { REGIONS } from '../data/regions';
import { WORLD_MAP } from '../data/worldMap';

// ── 道元纪境界阶梯（10境，从引气入体到道元无极）──
const DAOYUAN_REALM_RANK: Record<string, number> = {
  '引气入体': 0,
  '炼气化神': 1,
  '筑基凝脉': 2,
  '金丹化婴': 3,
  '元婴出窍': 4,
  '化神归墟': 5,
  '合道通玄': 6,
  '大乘渡劫': 7,
  '真仙归一': 8,
  '道元无极': 9,
};

/**
 * 由境界字符串解析道元纪境界阶序（0-9）。
 * 兼容简繁体、子境界后缀（如"金丹化婴中期"→3）。
 */
export function realmRank(realm: string | undefined): number {
  const r = (realm || '').trim();
  // 从高阶到低阶匹配
  const ordered = [
    '道元无极', '真仙归一', '大乘渡劫', '合道通玄',
    '化神归墟', '元婴出窍', '金丹化婴', '筑基凝脉',
    '炼气化神', '引气入体',
  ];
  for (let i = 0; i < ordered.length; i++) {
    if (r.includes(ordered[i])) return ordered.length - 1 - i;
  }
  // 兼容凡人境界（过渡期）
  if (/真仙|仙界/.test(r)) return 9;
  if (/渡劫/.test(r)) return 8;
  if (/大乘|長生|长生/.test(r)) return 7;
  if (/合體|合体|合道/.test(r)) return 6;
  if (/煉虛|炼虚/.test(r)) return 6; // 映射到合道通玄
  if (/化神/.test(r)) return 5;
  if (/元嬰|元婴/.test(r)) return 4;
  if (/結丹|结丹|金丹/.test(r)) return 3;
  if (/築基|筑基/.test(r)) return 2;
  if (/煉氣|炼气/.test(r)) return 1;
  if (/凡人|普通人/.test(r)) return 0;
  return 0;
}

// ── 地域索引（保留通用功能）──
const REGION_MAP: Record<string, RegionDef> = {};
for (const r of REGIONS) REGION_MAP[r.id] = r;
for (const n of WORLD_MAP) {
  if (!REGION_MAP[n.name]) {
    REGION_MAP[n.name] = {
      id: n.name,
      name: n.name,
      tier: n.tier,
      parentId: n.parentId || undefined,
      description: n.description,
      unlockChapter: 1,
    };
  }
}

export function getRegion(id: string): RegionDef | undefined {
  return REGION_MAP[id];
}

export function allLocationNames(): string[] {
  return Array.from(new Set([...REGIONS.map((r) => r.name), ...WORLD_MAP.map((n) => n.name)]));
}

// ── 道元纪事件系统（替换正史 ScheduledEvent）──
export interface DaoyuanEvent {
  id: string;
  name: string;
  description: string;
  chapterAnchor: number;
  scheduledDay: number;
  tier: 'minor' | 'major' | 'epic';
  /** 触发条件：玩家最低境界阶序 */
  minRealm?: number;
  /** 关联道纹碎片ID */
  daoFragmentId?: string;
}

/** 道元纪世界事件表（从设计文档驱动，暂为占位——阶段3实现完整事件链） */
export const SCHEDULED_EVENTS: DaoyuanEvent[] = [
  {
    id: 'dao_awakening_001',
    name: '道纹初醒',
    description: '感应到天地间第一缕道纹波动，引气入体的修士均可隐约察觉',
    chapterAnchor: 1,
    scheduledDay: 1,
    tier: 'major',
    minRealm: 0,
  },
];

export function getEvent(id: string): DaoyuanEvent | undefined {
  return SCHEDULED_EVENTS.find((e) => e.id === id);
}

export function eventsInWindow(fromDay: number, toDay: number): DaoyuanEvent[] {
  return SCHEDULED_EVENTS.filter((e) => e.scheduledDay > fromDay && e.scheduledDay <= toDay);
}

export function eventsNear(day: number, windowDays: number): DaoyuanEvent[] {
  return SCHEDULED_EVENTS.filter((e) => Math.abs(e.scheduledDay - day) <= windowDays);
}

export function spoilerBudget(_chapter: number): number {
  return 0; // 道元纪无剧透限制
}

// ── NPC系统（道元纪：无固定正史NPC，由 procGen 动态生成）──
export function allNpcNames(): string[] {
  return [];
}

export function getNpc(_idOrName: string): undefined {
  return undefined;
}

export interface ResolvedNpc {
  locationId: string;
  realm: string;
  status: string;
  activity: string;
  canonEventIds?: string[];
}

export function resolveNpcAtDay(_npc: any, _day: number): ResolvedNpc {
  return { locationId: '道元大陆', realm: '引气入体', status: 'unknown', activity: '游历四方' };
}

export function buildInitialNpcStates(_startDay: number): Record<string, NpcRuntimeState> {
  return {};
}
