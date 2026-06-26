/**
 * 原著功法的「傳承出處」：仙俠世界裡，名門法術不應隨處可習——須親至其傳承之地、拜入其宗、或得其秘譜玉簡。
 * 參考《凡人修仙傳》：長春功出於七玄門神手谷（墨大夫）、陰陽牽引術／素女輪迴功出於掩月宗……
 * 未列於此表者視為散傳/通用法門，可自行摸索；列於此表者，習得受地點/宗門/信物之限（見 canLearnTechnique）。
 */
import type { FanrenWorldState } from '../types';
import { WORLD_MAP } from '../data/worldMap';
import { findMapNode } from './mapIntel';

export interface TechSource {
  place?: string; // 傳承之地（地圖節點中文名；在此地或其子地點即可習）
  sect?: string; // 傳承宗門（為其門人即可習）
  hint: string; // 何處可得（給玩家的提示）
}

// 名稱須與 data/techniques.ts 的功法名完全相符。
export const TECHNIQUE_SOURCE: Record<string, TechSource> = {
  長春功: { place: '神手谷', sect: '七玄門', hint: '七玄門彩霞山「神手谷」，墨大夫一脈所傳' },
  // ── 第一卷・七玄門時期可習（韓立於神手谷墨大夫遺秘所附／厲飛雨所授）──
  火彈術: { place: '神手谷', sect: '七玄門', hint: '七玄門神手谷墨大夫遺秘所附（長春功衍生的初階火術）' },
  驅物術: { place: '神手谷', sect: '七玄門', hint: '七玄門神手谷墨大夫遺秘所附（遠程御物之術）' },
  御風訣: { place: '神手谷', sect: '七玄門', hint: '七玄門神手谷墨大夫遺秘所附之入門遁術（亦為修仙界散傳通用遁法）' },
  眨眼劍法: { place: '七玄門', sect: '七玄門', hint: '七玄門七絕堂厲飛雨所授的快劍劍法' },
  羅煙步: { place: '七玄門', sect: '七玄門', hint: '七玄門厲飛雨所授（眨眼劍法配套的步法秘技）' },
  五行遁術: { place: '黃楓谷', sect: '黃楓谷', hint: '黃楓谷一脈的五行遁法' },
  陰陽牽引術: { sect: '掩月宗', hint: '掩月宗雙修一脈的合擊採集秘術' },
  素女輪迴功: { sect: '掩月宗', hint: '掩月宗鎮宗功法（南宮婉一脈真傳）' },
  換形訣: { sect: '掩月宗', hint: '掩月宗的潛行易容之術' },
  玄月吸陰功: { sect: '合歡宗', hint: '合歡宗媚術吸陰一脈的魔功' },
  御靈馭獸訣: { sect: '御靈宗', hint: '御靈宗馭靈蟲靈獸的秘傳' },
  五行靈嬰秘法: { sect: '御靈宗', hint: '御靈宗鎮宗靈嬰秘法，馭五行靈獸之核心機密' },
  巨劍術: { sect: '巨劍門', hint: '巨劍門御使無鞘巨劍、雙手擲射的鎮派劍術' },
  鬼靈攝魂大法: { sect: '鬼靈門', hint: '鬼靈門驅鬼攝魂的魔法' },
  血雲遁術: { sect: '鬼靈門', hint: '鬼靈門的血遁之術' },
  化血神功: { sect: '化血教', hint: '化血教采血煉氣的魔道功法' },
  青元劍訣: { place: '黃楓谷', sect: '黃楓谷', hint: '黃楓谷鎮派法訣，可修出青元劍芒、御劍殺敵——然每進一境略有法力流失之弊，故谷中以丹道補強' },
  隴家無情道: { sect: '隴家', hint: '隴家不傳外人的無情道傳承' },
  天瀾聖獸傳承: { place: '天瀾聖殿', sect: '天瀾聖殿', hint: '慕蘭草原天瀾聖殿的聖獸傳承' },
  大衍訣: { hint: '此乃機緣天授之神通（非凡間宗門可傳），唯持掌天瓶之奇遇者得之' },
  // ── 化神／元嬰級絕學：須機緣、頓悟或老怪傳承，非修為到即可習 ──
  千機傀儡術: { hint: '傀儡之術精妙全賴大衍訣分神分念——須先修大衍訣，分神愈多、操傀愈眾（操控傀儡上限隨大衍訣層數而增）' },
  金剛訣: { hint: '佛門體修一脈護體神功，須得其殘卷或佛宗傳承方可修習' },
  梵聖真魔法相: { hint: '亦正亦魔的佛門至高法相神通，唯機緣巧合得其傳承者可習' },
  元磁神光: { hint: '掌控元磁之力的化神大神通，韓立於坐魔谷得殘圖、歷二百餘年方成——須得其圖譜傳承' },
  驚蟄訣: { hint: '以真靈之血為引的變身神通，須得真靈血脈或其秘傳' },
};

/** 某地（節點 id/名）是否在 placeName 節點或其子地點之內（沿 parentId 上溯）。 */
function atPlace(currentLocationId: string, placeName: string): boolean {
  const home = findMapNode(placeName);
  if (!home) return false;
  let cur = findMapNode(currentLocationId);
  const seen = new Set<string>();
  while (cur && !seen.has(cur.id)) {
    if (cur.id === home.id) return true;
    seen.add(cur.id);
    if (!cur.parentId) break;
    cur = WORLD_MAP.find((n) => n.id === cur!.parentId);
  }
  return false;
}

export function techSourceOf(name: string): TechSource | undefined {
  return TECHNIQUE_SOURCE[name];
}

/** 列出某宗門可傳承之原著功法名（TECHNIQUE_SOURCE 中 sect 命中者）。供「功法閣」設施就地列示。 */
export function sectTechniques(sectName: string): string[] {
  if (!sectName) return [];
  return Object.entries(TECHNIQUE_SOURCE)
    .filter(([, s]) => s.sect === sectName)
    .map(([name]) => name);
}

export interface LearnCheck { ok: boolean; reason: string }
/** 能否在此情境習得某原著功法：無出處＝可自習；有出處＝須在其地／為其門人／持其秘譜玉簡。 */
export function canLearnTechnique(name: string, world: FanrenWorldState, inventoryNames: string[] = []): LearnCheck {
  // 千機傀儡術之精妙全賴大衍訣分神分念——須先修大衍訣方能掌握（操傀數量另隨大衍訣層數而增）
  if (name === '千機傀儡術') {
    const hasDaYan = (world.techniques || []).some((t) => t.name === '大衍訣');
    if (!hasDaYan) return { ok: false, reason: '「千機傀儡術」之精妙全賴大衍訣分神分念——須先修「大衍訣」，方能掌握傀儡操控之術。' };
  }
  const src = TECHNIQUE_SOURCE[name];
  if (!src) return { ok: true, reason: '' }; // 散傳/通用法門
  // 特殊機緣（無 place 無 sect）：凡間不可習
  if (!src.place && !src.sect) {
    return { ok: false, reason: `「${name}」${src.hint}——非可於此修習。` };
  }
  // 持秘譜/玉簡/口訣（物品名含功法名）即可自行參詳
  if (inventoryNames.some((n) => n.includes(name) && /譜|訣|簡|冊|錄|篇|圖|玉|口訣|殘篇/.test(n))) return { ok: true, reason: '' };
  if (src.place && atPlace(world.currentLocationId, src.place)) return { ok: true, reason: '' };
  if (src.sect && world.sect && (world.sect.sectName === src.sect || world.sect.sectId === src.sect)) return { ok: true, reason: '' };
  return { ok: false, reason: `「${name}」乃${src.hint}——須親至其傳承之地、拜入其宗、或得其秘譜，方能修習。你此刻無從習得。` };
}

/** 列出在當前情境「此地/本門可習」的原著功法名（供百藝面板就地呈現）。 */
export function techniquesLearnableHere(world: FanrenWorldState, inventoryNames: string[] = []): Set<string> {
  const out = new Set<string>();
  for (const name of Object.keys(TECHNIQUE_SOURCE)) {
    if (canLearnTechnique(name, world, inventoryNames).ok) out.add(name);
  }
  return out;
}
