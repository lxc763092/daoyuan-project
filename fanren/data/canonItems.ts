/**
 * canonItems 橋接文件
 * 將道元紀原創物品庫（DAOYUAN_ITEMS）映射為 CodexPanel 期望的舊介面格式。
 * 映射邏輯與 engine/loot.ts 保持一致。
 * 原凡人正史的 canonItems 寶物庫已全面替換為道元紀原創物品。
 */
import { DAOYUAN_ITEMS, type DaoyuanItem } from '../data_daoyuan/daoyuanItems';

export interface CanonItem {
  name: string;
  kind: string;
  rarity: string;
  realmTier: string;
  effect: string;
}

function mapKind(itemType: string): string {
  if (itemType === '0' || itemType === '1' || itemType === '2') return '丹藥';
  if (itemType === '3') return '材料';
  if (itemType === '4') return '草藥';
  return '法寶';
}

function mapRarity(tier: number): string {
  if (tier >= 4) return '仙品';
  if (tier >= 3) return '傳說';
  if (tier >= 2) return '稀有';
  return '普通';
}

function mapRealmTier(tier: number): string {
  const labels = ['凡人', '煉氣', '築基', '金丹', '元嬰', '化神', '道元'];
  return labels[Math.min(tier, labels.length - 1)] ?? '凡人';
}

const toCanon = (di: DaoyuanItem): CanonItem => ({
  name: di.itemName,
  kind: mapKind(di.itemType),
  rarity: mapRarity(di.tier),
  realmTier: mapRealmTier(di.tier),
  effect: Array.isArray(di.effects) ? di.effects.join('；') : (di.description || ''),
});

export const CANON_ITEMS: CanonItem[] = DAOYUAN_ITEMS.map(toCanon);
