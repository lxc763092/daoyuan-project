/** canon 境界推導：忠實顯示、突破規劃、壽元/修為上限。 */
import type { FanrenWorldState } from '../types';
import { CANON_REALMS, realmByIndex, realmLabel, realmIndexFromType, type CanonRealm } from '../data/realms';

export function getRealmIndex(world: FanrenWorldState, playerRealm: string): number {
  if (typeof world.canonRealmIndex === 'number') return world.canonRealmIndex;
  return realmIndexFromType(playerRealm);
}
export function getSubStage(world: FanrenWorldState): number {
  return typeof world.canonSubStage === 'number' ? world.canonSubStage : 0;
}

/** 忠實境界顯示（煉氣用層數＝playerRealmLevel；餘用子境界）。 */
export function canonRealmDisplay(world: FanrenWorldState, playerRealm: string, playerRealmLevel: number): string {
  return realmLabel(getRealmIndex(world, playerRealm), getSubStage(world), playerRealmLevel);
}

export interface BreakthroughPlan {
  realmJump: boolean;
  qiLayerUp: boolean;
  targetIndex: number;
  targetSub: number; // 非煉氣的目標子境界
  targetRealm: CanonRealm;
  needTribulation: boolean;
  targetLabel: string;
  curIndex: number;
}

/** 下一步突破：煉氣升層／子境界推進／大圓滿後跳境（可能渡劫）。 */
export function nextBreakthrough(world: FanrenWorldState, playerRealm: string, playerRealmLevel: number): BreakthroughPlan {
  const idx = getRealmIndex(world, playerRealm);
  const sub = getSubStage(world);
  const cur = realmByIndex(idx);
  if (cur.layers) {
    if (playerRealmLevel < cur.layers) {
      return { realmJump: false, qiLayerUp: true, targetIndex: idx, targetSub: 0, targetRealm: cur, needTribulation: false, targetLabel: `${cur.name}${playerRealmLevel + 1}層`, curIndex: idx };
    }
    const next = realmByIndex(idx + 1);
    return { realmJump: true, qiLayerUp: false, targetIndex: idx + 1, targetSub: 0, targetRealm: next, needTribulation: next.hasTribulation, targetLabel: realmLabel(idx + 1, 0), curIndex: idx };
  }
  if (sub < 3) {
    return { realmJump: false, qiLayerUp: false, targetIndex: idx, targetSub: sub + 1, targetRealm: cur, needTribulation: false, targetLabel: realmLabel(idx, sub + 1), curIndex: idx };
  }
  const next = realmByIndex(idx + 1);
  return { realmJump: true, qiLayerUp: false, targetIndex: idx + 1, targetSub: 0, targetRealm: next, needTribulation: next.hasTribulation, targetLabel: realmLabel(idx + 1, 0), curIndex: idx };
}

export function realmTypeOf(index: number): string {
  return realmByIndex(index).realmType;
}
export function realmLifespan(index: number): number {
  return realmByIndex(index).lifespan;
}
/** 該境界子境界的修為上限。 */
export function realmMaxExp(index: number, sub: number): number {
  return Math.round(realmByIndex(index).baseExp * (1 + sub * 0.6));
}

/**
 * 修練難度・指數遞增（參考《凡人修仙傳》，以韓立各段突破歲月×3≈資質中上者所需 為校準）。
 * 此為「閉關修為增速的除數」。煉氣(0)=1（煉氣→築基不另加重）；築基(1) 起以 5 為底、逐境約 ×2.5 遞增：
 *   築基5 / 結丹13 / 元嬰31 / 化神78 / 煉虛195 / 合體488 / 大乘1221 / 渡劫3052 / 真仙7629。
 * 之所以不採純 5^境界：那將使元嬰起所需閉關歲月超過該境壽元（永遠無法突破）。此校準下，
 * 每境全程閉關約佔該境壽元 2~4 成（與漸長壽元相稱），後期突破歲月仍呈指數攀升。
 */
export function realmCultDifficulty(index: number): number {
  const i = Math.max(0, index);
  return i === 0 ? 1 : Math.round(5 * Math.pow(2.5, i - 1));
}
export function isMaxRealm(index: number): boolean {
  return index >= CANON_REALMS.length - 1;
}

/**
 * 由任意境界字串（繁/簡、含初中後期後綴、含括號註記如「結丹後期」「合體中後期」「大乘（修為未復）」）
 * 穩健解析出 canon「大境界」索引（0 煉氣 … 9 真仙）。
 * 較 canonLoader.realmRank 可靠：後者以 .includes 比對「○○期」整詞，遇「結丹後期」「元嬰中期」會漏判為 0。
 * 由高而低判定，確保「聖祖（超越大乘）」之類落在最高可辨境界。
 */
export function majorRealmRank(realm: string | undefined): number {
  const r = realm || '';
  if (/真仙|仙界|飛升|飞升/.test(r)) return 9;
  if (/渡劫/.test(r)) return 8;
  if (/大乘|長生|长生|聖祖|圣祖/.test(r)) return 7;
  if (/合體|合体|合道/.test(r)) return 6;
  if (/煉虛|炼虚|煉虚|炼虛/.test(r)) return 5;
  if (/化神/.test(r)) return 4;
  if (/元嬰|元婴/.test(r)) return 3;
  if (/結丹|结丹|金丹/.test(r)) return 2;
  if (/築基|筑基/.test(r)) return 1;
  return 0; // 煉氣／凡人
}

/**
 * 跨大境界戰力倍率（原著考據）：跨一大境界呈指數級碾壓——
 * 元嬰初期即可輾壓二十倍於己的結丹後期巔峰；跨二境視若螻蟻、跨三境千倍之差。
 * 以 18 為底（介於原著 15~20 倍區間），每升一大境界戰力 ×18。
 */
export function realmPowerTier(index: number): number {
  return Math.pow(18, Math.max(0, index));
}

/**
 * 含子境界/煉氣層的綜合戰力係數。同一大境界內初→大圓滿約 3.5 倍、煉氣 1→13 層約 2.5 倍
 * （原著：同境子階 2~5 倍差距），再乘以大境界倍率 → 真正的「越階如越天塹」。
 */
export function combatPowerFactor(index: number, sub: number, playerRealmLevel: number): number {
  const r = realmByIndex(index);
  const within = r.layers
    ? 1 + (Math.max(1, Math.min(r.layers, playerRealmLevel)) - 1) / Math.max(1, r.layers - 1) * 1.5
    : 1 + Math.max(0, Math.min(3, sub)) / 3 * 2.5;
  return realmPowerTier(index) * within;
}
