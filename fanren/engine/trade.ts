/**
 * 交易系統：坊市擺攤（賣）、商會交易（市價買賣）、拍賣會（競標）、交換會（以物易物）。
 * 估價依物品品階 × 適配境界；貨源取自道元紀物品庫。
 */
import { DAOYUAN_ITEMS } from '../data_daoyuan/daoyuanItems';
import type { DaoyuanItem } from '../data_daoyuan/daoyuanItems';

// ── 適配層：道元紀物品 → 兼容舊 CanonItem 接口的查詢 ──
// 道元紀用 tier (0-5)、itemType 分類；凡人用 rarity/realmTier/kind。
// 此映射表使 engine/trade.ts 無需大改函數簽名，只換數據源。
// 適配策略：將 DaoyuanItem 的 itemName/effects 扁平化為 name/effect，
// 並附加 _rarity/_realmTier/_kind 計算屬性。

export interface TradeItem {
  itemId: string;
  name: string;          // 從 DaoyuanItem.itemName 映射
  description: string;
  price: number;
  effect: string;        // 從 DaoyuanItem.effects.join(', ') 映射
  tier: number;
  itemType: string;
  _rarity: string;
  _realmTier: string;
  _kind: string;
}

const TIER_TO_RARITY = ['普通', '精良', '稀有', '传说', '仙品', '仙品'];
const TIER_TO_REALM = ['通用', '通用', '通用', '通用', '通用', '通用'];
const TYPE_TO_KIND: Record<string, string> = {
  '0': '丹药',   // exp类
  '1': '丹药',   // hp/mp恢复类
  '2': '丹药',   // 突破类
  '3': '材料',   // 灵兽类
  '4': '符箓',   // 战斗buff类
};

function adaptItems(): TradeItem[] {
  return DAOYUAN_ITEMS.map((it) => ({
    itemId: it.itemId,
    name: it.itemName,
    description: it.description,
    price: it.price,
    effect: Array.isArray(it.effects) ? it.effects.join(', ') : String(it.effects ?? ''),
    tier: it.tier,
    itemType: it.itemType,
    _rarity: TIER_TO_RARITY[it.tier] || '普通',
    _realmTier: TIER_TO_REALM[it.tier] || '通用',
    _kind: TYPE_TO_KIND[it.itemType] || '材料',
  }));
}

const ADAPTED_ITEMS: TradeItem[] = adaptItems();

const RARITY_BASE: Record<string, number> = { 普通: 8, 精良: 25, 稀有: 90, 传说: 500, 仙品: 3000 };
const INV_RARITY: Record<string, number> = { 普通: 10, 精良: 25, 稀有: 90, 传说: 500, 仙品: 3000, 神品: 6000 };
const TIER_MULT: Record<string, number> = { 炼气: 1, 筑基: 2, 金丹: 4, 元婴: 8, 化神: 16, 炼虚以上: 32, 通用: 1.5 };
const TIER_RANK: Record<string, number> = { 炼气: 0, 筑基: 1, 金丹: 2, 元婴: 3, 化神: 4, 炼虚以上: 5, 通用: 0 };

// 道元紀境界適配（支持凡人舊名過渡）
export function realmTierRank(realm: string): number {
  if (/渡劫飞升|渡劫飛升/.test(realm)) return 5;
  if (/天人合一/.test(realm)) return 5;
  if (/虚空炼形|虛空煉形/.test(realm)) return 4;
  if (/化神合道/.test(realm)) return 4;
  if (/元婴出窍|元嬰出竅/.test(realm)) return 3;
  if (/元胎化婴|元胎化嬰/.test(realm)) return 2;
  if (/筑就道基|築就道基/.test(realm)) return 1;
  if (/通脉开窍|通脈開竅/.test(realm)) return 1;
  if (/引气入体|引氣入體/.test(realm)) return 0;
  // 兼容凡人舊名
  if (/化神/.test(realm)) return 4;
  if (/元婴|元嬰/.test(realm)) return 3;
  if (/金丹|結丹|结丹/.test(realm)) return 2;
  if (/筑基|築基/.test(realm)) return 1;
  if (/合体|合體|煉虛|炼虚|大乘|渡劫|真仙/.test(realm)) return 5;
  return 0;
}
export function canonItemValue(it: TradeItem): number {
  return Math.max(2, Math.round((RARITY_BASE[it._rarity] || 10) * (TIER_MULT[it._realmTier] || 1.5)));
}
/** 背包物品估價（依稀有度，擺攤收購約半價）。 */
export function invItemValue(rarity: string): number {
  return INV_RARITY[rarity] || 10;
}
export function sellPriceOf(rarity: string): number {
  return Math.max(1, Math.round(invItemValue(rarity) * 0.45));
}

/** 商會貨架：消耗/材料類，依玩家境界開放；自有商團/拍賣行享折扣。 */
export function guildGoods(playerRealm: string, hasGuild: boolean): { item: TradeItem; price: number }[] {
  const pr = realmTierRank(playerRealm);
  const disc = hasGuild ? 0.88 : 1;
  return ADAPTED_ITEMS.filter((i) => ['丹药', '材料', '灵植', '符箓'].includes(i._kind) && (TIER_RANK[i._realmTier] ?? 0) <= pr + 1 && i._rarity !== '仙品')
    .map((i) => ({ item: i, price: Math.round(canonItemValue(i) * disc) }))
    .sort((a, b) => a.price - b.price)
    .slice(0, 28);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
/** 拍賣會：每半年一輪，五件稀有以上拍品（含法寶/至寶）。 */
export function auctionLots(day: number): { item: TradeItem; startBid: number; estimate: number }[] {
  const seed = Math.floor(day / 180);
  const pool = ADAPTED_ITEMS.filter((i) => ['稀有', '传说', '仙品'].includes(i._rarity));
  if (!pool.length) return [];
  const out: { item: TradeItem; startBid: number; estimate: number }[] = [];
  const used = new Set<number>();
  for (let k = 0; k < 5; k++) {
    let idx = hash(`${seed}-${k}`) % pool.length;
    let guard = 0;
    while (used.has(idx) && guard++ < pool.length) idx = (idx + 1) % pool.length;
    used.add(idx);
    const it = pool[idx];
    const est = canonItemValue(it);
    out.push({ item: it, startBid: Math.round(est * 0.5), estimate: est });
  }
  return out;
}
/** 競標：對手會抬價到約 估價×(0.9~1.4)。 */
export function bidOutcome(bid: number, estimate: number, rnd: number): { win: boolean; rivalBid: number } {
  const rivalBid = Math.round(estimate * (0.9 + rnd * 0.5));
  return { win: bid >= rivalBid, rivalBid };
}
/** 交換會：以價值相近為原則，為玩家配一件可換的物品。 */
export function barterOffer(offeredValue: number, playerRealm: string, rnd: number): TradeItem | null {
  const pr = realmTierRank(playerRealm);
  const cands = ADAPTED_ITEMS.filter(
    (i) => i._rarity !== '仙品' && (TIER_RANK[i._realmTier] ?? 0) <= pr + 1 && Math.abs(canonItemValue(i) - offeredValue) <= Math.max(20, offeredValue * 0.6)
  );
  if (!cands.length) return null;
  return cands[Math.floor(rnd * cands.length) % cands.length];
}
