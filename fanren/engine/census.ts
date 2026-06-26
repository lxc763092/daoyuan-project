/**
 * 天下生靈・境界分層人口普查。
 *
 * 把「五十萬個 NPC，越高境界越少」實現為一座**人口金字塔**（而非靜態存 50 萬筆物件——
 * 那會讓封裝體積爆炸、載入卡死）。具體 NPC 於遭遇時由 registry 惰性、決定性生成；
 * 此處只維護各境界在世人數，使世界「實有五十萬眾」且永不空。
 *
 * 鐵則：純背景統計，從不讀寫正史 npcStates / worldEventStates。
 */
import { CANON_REALMS } from '../data/realms';

export interface WorldCensus {
  byRealm: number[]; // 對齊 CANON_REALMS（index 0 煉氣 … 9 真仙）的在世人數
  total: number;
  lastTickDay: number;
}

// 初始天下生靈分佈：指數遞減（越高越少），總和 ≈ 500,000。
// 跨境界呈「極端」金字塔（每升一境約 ≈8~12 倍人數驟減，遠陡於尋常）——
// 貼合原著：煉氣如過江之鯽、築基稀、結丹珍、元嬰已是一方老怪、化神舉世不過數十、
// 煉虛以上更屬靈界存在，人界幾近絕跡（渡劫／真仙世間無）。
export const BASE_DISTRIBUTION = [451000, 42000, 5400, 560, 48, 7, 2, 1, 0, 0];

export function initCensus(day: number): WorldCensus {
  const byRealm = BASE_DISTRIBUTION.slice(0, CANON_REALMS.length);
  return { byRealm, total: byRealm.reduce((a, b) => a + b, 0), lastTickDay: day };
}

/** 普查文字標籤（供 UI 顯示）。 */
export function censusBreakdown(c: WorldCensus): { name: string; count: number }[] {
  return CANON_REALMS.map((r, i) => ({ name: r.name, count: c.byRealm[i] || 0 }));
}

/** 將大數轉成「約 50 萬 / 約 1.8 萬」式中文概數。 */
export function humanizeCount(n: number): string {
  if (n >= 100000000) return `約 ${(n / 100000000).toFixed(2)} 億`;
  if (n >= 10000) return `約 ${(n / 10000).toFixed(n >= 100000 ? 0 : 1)} 萬`;
  if (n >= 1000) return `約 ${(n / 1000).toFixed(1)} 千`;
  return String(n);
}

/**
 * 推進普查：人口向初始分佈緩慢回歸（自穩），疊加隨機波動——低階波動大、高階近乎不動
 * （高境界唯有極罕見的突破方增，故近乎靜止）。總和恆在 ~50 萬上下浮動，永不歸零。
 */
export function tickCensus(prev: WorldCensus | undefined, newDay: number): { census: WorldCensus; births: number; deaths: number } {
  const c = prev || initCensus(newDay);
  const years = (newDay - c.lastTickDay) / 360;
  if (years < 0.25) return { census: c, births: 0, deaths: 0 };
  const cappedYears = Math.min(years, 80);
  const by = c.byRealm.slice();
  let births = 0, deaths = 0;
  for (let i = 0; i < by.length; i++) {
    const target = BASE_DISTRIBUTION[i] || 1;
    const volFactor = i <= 1 ? 0.03 : i <= 3 ? 0.008 : i <= 5 ? 0.002 : 0.0004;
    const volatility = target * volFactor * cappedYears;
    const regress = (target - by[i]) * Math.min(1, 0.04 * cappedYears); // 向承載量回歸
    const noise = (Math.random() * 2 - 1) * volatility;
    const delta = Math.round(regress + noise);
    if (delta >= 0) births += delta; else deaths += -delta;
    by[i] = Math.max(i >= 8 ? 0 : 1, by[i] + delta); // 渡劫/真仙 可為 0
  }
  const total = by.reduce((a, b) => a + b, 0);
  return { census: { byRealm: by, total, lastTickDay: newDay }, births, deaths };
}
