/**
 * 道元紀探索掉落：由道元紀物品庫產生符合地域層級／境界的物品。
 * 原凡人正史的 canonItems 寶物庫已全面替換為道元紀原創物品。
 */
import { realmRank } from './daoyuanLoader';
import { DAOYUAN_ITEMS, type DaoyuanItem } from '../data_daoyuan/daoyuanItems';

export interface ItemGrant {
  name: string;
  type: '草药' | '丹药' | '材料' | '法宝'; // 對應既有 ItemType 字串
  rarity: '普通' | '稀有' | '传说' | '仙品';
  quantity: number;
  description: string;
}

interface LootDef {
  name: string;
  type: ItemGrant['type'];
  rarity: ItemGrant['rarity'];
  desc: string;
  minRank: number;
}

function mapType(itemType: string): ItemGrant['type'] {
  if (itemType === '0' || itemType === '1' || itemType === '2') return '丹药';
  if (itemType === '3') return '材料';
  if (itemType === '4') return '草药';
  return '法宝';
}

function mapRarity(tier: number): ItemGrant['rarity'] {
  if (tier >= 4) return '仙品';
  if (tier >= 3) return '传说';
  if (tier >= 2) return '稀有';
  return '普通';
}

// 道元紀 tier（0-5）→ 境界階序對照
const TIER_RANK: number[] = [0, 2, 4, 6, 8, 10]; // tier 0→凡人, tier 5→道元级

function isExplorable(i: DaoyuanItem): boolean {
  // 道元紀：tier 5+ 物品為傳說至寶，不入隨機掉落
  if (i.tier >= 5) return false;
  return true;
}

const POOL: LootDef[] = DAOYUAN_ITEMS.filter(isExplorable).map((i) => ({
  name: i.itemName,
  type: mapType(i.itemType),
  rarity: mapRarity(i.tier),
  desc: Array.isArray(i.effects) ? i.effects.join('；') : String(i.effects || ''),
  minRank: TIER_RANK[i.tier] ?? 0,
}));

/** 依地域層級與玩家境界、氣運擲取探索掉落（0–2 件）。 */
export function rollExploreLoot(_tier: string, playerRealm: string, luck: number): ItemGrant[] {
  const rank = realmRank(playerRealm);
  const candidates = POOL.filter((d) => d.minRank <= rank + 2); // 允許略高一階的驚喜
  if (!candidates.length) return [];
  const out: ItemGrant[] = [];
  const baseChance = 0.55 + Math.min(0.3, (luck || 0) / 200);
  if (Math.random() < baseChance) out.push(pick(candidates, rank));
  if (Math.random() < baseChance * 0.4) out.push(pick(candidates, rank));
  return out;
}

function pick(cands: LootDef[], rank: number): ItemGrant {
  const weighted = cands.map((d) => ({ d, w: 1 / (1 + Math.abs(d.minRank - rank)) + (d.rarity === '仙品' ? 0.01 : 0) }));
  const total = weighted.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  let chosen = weighted[0].d;
  for (const x of weighted) {
    r -= x.w;
    if (r <= 0) { chosen = x.d; break; }
  }
  return { name: chosen.name, type: chosen.type, rarity: chosen.rarity, quantity: 1, description: chosen.desc };
}

/** 道元紀催熟靈藥（道紋催化式）→ 產出一株高階靈植/靈藥。 */
export function catalyzeHerb(playerRealm: string, magnitude: number): ItemGrant {
  const rank = realmRank(playerRealm);
  const herbs = POOL.filter((d) => d.type === '草药' && d.minRank <= rank + 3);
  const best = herbs.sort((a, b) => b.minRank - a.minRank)[0] || POOL[0];
  return { name: best.name, type: '草药', rarity: best.rarity, quantity: Math.max(1, Math.round(magnitude / 2)), description: `（道紋催化而得）${best.desc}` };
}
