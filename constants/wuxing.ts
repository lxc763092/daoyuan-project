/**
 * 五行相剋與境界差：回合制戰鬥的屬性/境界傷害修正（純函式，零侵入）。
 * 還原原著「相剋即破防、跨境界碾壓」的鬥法味道，但數值對回合制收斂以免一擊秒殺。
 */
import type { SpiritualRootType } from './spiritualRoots';
import { RealmType } from '../types';
import { REALM_ORDER } from './realms';

// 相剋環：金剋木、木剋土、土剋水、水剋火、火剋金
const RESTRAINS: Record<SpiritualRootType, SpiritualRootType> = {
  metal: 'wood',
  wood: 'earth',
  earth: 'water',
  water: 'fire',
  fire: 'metal',
};

export interface ElementResult {
  mult: number; // 傷害倍率
  broke: boolean; // 是否「相剋破防」（攻方剋守方）
  restrained: boolean; // 是否「被剋」（守方剋攻方）
}

/** 攻方 element 對守方 element 的傷害倍率。相剋=破防×1.5；被剋×0.7；其餘×1.0。 */
export function elementMultiplier(atkEl?: SpiritualRootType, defEl?: SpiritualRootType): ElementResult {
  if (!atkEl || !defEl) return { mult: 1.0, broke: false, restrained: false };
  if (RESTRAINS[atkEl] === defEl) return { mult: 1.5, broke: true, restrained: false }; // 我剋敵 → 破防
  if (RESTRAINS[defEl] === atkEl) return { mult: 0.7, broke: false, restrained: true }; // 敵剋我
  return { mult: 1.0, broke: false, restrained: false };
}

/** 由玩家五行靈根向量取主屬性（最高分）。平手取固定優先序避免抖動。 */
export function dominantElement(roots?: Partial<Record<SpiritualRootType, number>>): SpiritualRootType | undefined {
  if (!roots) return undefined;
  const order: SpiritualRootType[] = ['metal', 'wood', 'water', 'fire', 'earth'];
  let best: SpiritualRootType | undefined;
  let bestV = 0;
  for (const k of order) {
    const v = roots[k] || 0;
    if (v > bestV) {
      bestV = v;
      best = k;
    }
  }
  return bestV > 0 ? best : undefined;
}

/**
 * 跨境界傷害修正。回合制宜收斂：每大階 ×1.5，封頂 ×3 / 地板 ×0.4。
 * （敘事層的越階碾壓用 Math.pow(18,…)，回合制絕不可用，會一擊秒殺。）
 */
export function realmGapMultiplier(attackerRealm?: RealmType, targetRealm?: RealmType): number {
  if (!attackerRealm || !targetRealm) return 1.0;
  const a = REALM_ORDER.indexOf(attackerRealm);
  const d = REALM_ORDER.indexOf(targetRealm);
  if (a < 0 || d < 0) return 1.0;
  const gap = a - d;
  if (gap === 0) return 1.0;
  const m = Math.pow(1.5, gap); // gap>0 攻方高→放大；gap<0→縮小
  return Math.min(3, Math.max(0.4, m));
}

/** 五行中文名（敘事用）。 */
export const ELEMENT_CN: Record<SpiritualRootType, string> = {
  metal: '金',
  wood: '木',
  water: '水',
  fire: '火',
  earth: '土',
};
