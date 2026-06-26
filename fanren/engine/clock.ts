/** 自適應時間系統：絕對天數 ↔ 年月日，章號↔天數對映，行動耗時尺度。 */
import type { GameTime, TimeScale } from '../types';

export const DAYS_PER_MONTH = 30;
export const MONTHS_PER_YEAR = 12;
export const DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR; // 360

/** 由絕對天數重建年月日。 */
export function dayToGameTime(totalDays: number): GameTime {
  const d = Math.max(0, Math.floor(totalDays));
  const year = Math.floor(d / DAYS_PER_YEAR) + 1;
  const rem = d % DAYS_PER_YEAR;
  const month = Math.floor(rem / DAYS_PER_MONTH) + 1;
  const day = (rem % DAYS_PER_MONTH) + 1;
  return { totalDays: d, year, month, day };
}

export function advanceTime(time: GameTime, days: number): GameTime {
  return dayToGameTime(time.totalDays + Math.max(0, Math.round(days)));
}

export function formatTime(time: GameTime): string {
  return `修真曆 第${time.year}年 ${time.month}月 ${time.day}日`;
}

/** 章號→世界紀元天數。以原著時間跨度的分段線性插值（人界~200餘年，靈界以後更長）。 */
const CHAPTER_ANCHORS: Array<[chapter: number, year: number]> = [
  [1, 0],
  [99, 5], // 七玄門卷末
  [270, 22], // 黃楓谷築基
  [500, 60], // 亂星海初臨
  [760, 160], // 結丹後期
  [900, 230], // 元嬰・名震天南
  [1180, 330], // 化神・入靈界
  [1500, 520], // 煉虛
  [1750, 760], // 合體
  [2050, 1080], // 大乘・魔界
  [2350, 1280],
  [2446, 1320], // 飛升
];

export function chapterToDay(chapter: number): number {
  const a = CHAPTER_ANCHORS;
  if (chapter <= a[0][0]) return Math.round(a[0][1] * DAYS_PER_YEAR);
  if (chapter >= a[a.length - 1][0]) return Math.round(a[a.length - 1][1] * DAYS_PER_YEAR);
  for (let i = 0; i < a.length - 1; i++) {
    const [c0, y0] = a[i];
    const [c1, y1] = a[i + 1];
    if (chapter >= c0 && chapter <= c1) {
      const t = (chapter - c0) / (c1 - c0);
      return Math.round((y0 + t * (y1 - y0)) * DAYS_PER_YEAR);
    }
  }
  return Math.round(a[a.length - 1][1] * DAYS_PER_YEAR);
}

/** 由天數粗估對應到的「進度章號」（chapterToDay 的反查），用於 RAG 防劇透過濾。 */
export function dayToChapter(totalDays: number): number {
  const years = totalDays / DAYS_PER_YEAR;
  const a = CHAPTER_ANCHORS;
  if (years <= a[0][1]) return a[0][0];
  if (years >= a[a.length - 1][1]) return a[a.length - 1][0];
  for (let i = 0; i < a.length - 1; i++) {
    const [c0, y0] = a[i];
    const [c1, y1] = a[i + 1];
    if (years >= y0 && years <= y1) {
      const t = y1 === y0 ? 0 : (years - y0) / (y1 - y0);
      return Math.round(c0 + t * (c1 - c0));
    }
  }
  return a[a.length - 1][0];
}

export interface ScaleRange {
  min: number;
  max: number;
  label: string;
}
export const TIME_SCALE_DAYS: Record<TimeScale, ScaleRange> = {
  instant: { min: 0, max: 0, label: '瞬間' },
  short: { min: 1, max: 7, label: '數日' },
  medium: { min: 15, max: 60, label: '旬月' },
  long: { min: 180, max: 2160, label: '數月至數年（閉關，可被打斷）' },
  epoch: { min: 3600, max: 36000, label: '數十至數百年（長期閉關/跨歷史節點）' },
};

/** 在尺度區間內取一個天數（避免依賴 Math.random 的同時提供可控預設）。 */
export function daysForScale(scale: TimeScale, requestedDays?: number): number {
  const r = TIME_SCALE_DAYS[scale];
  if (typeof requestedDays === 'number' && requestedDays > 0) {
    return Math.min(Math.max(requestedDays, r.min), r.max === 0 ? requestedDays : Math.max(r.max, requestedDays));
  }
  return Math.round((r.min + r.max) / 2);
}
