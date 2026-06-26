/**
 * 決定性世界註冊表：同一 seed 永遠生成同一實體，賦予程序生成內容「穩定身分」。
 *
 * 為何需要：要支撐「五十萬 NPC／十萬物品／五千野獸」而不靜態存檔——
 * 實體於遭遇時由 (種類, seed) 決定性生成；只要 seed 不變，名字、境界、功法、隨身物皆恆定，
 * 故玩家再次遇見同一散修/妖獸時，他還是他。真正互動過、需追蹤狀態者，才落地存入 world。
 */

/** 字串 → 32-bit 種子（FNV-1a）。 */
export function hashSeed(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 由種子產生決定性 PRNG（mulberry32），回傳 0..1。 */
export function rngFromSeed(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 由任意字鍵取決定性 RNG（同鍵同序列）。 */
export function rngFor(key: string): () => number {
  return rngFromSeed(hashSeed(key));
}

export type RNG = () => number;

/** 自陣列依 RNG 取一（決定性）。 */
export function pickWith<T>(arr: T[], rng: RNG): T {
  return arr[Math.floor(rng() * arr.length) % arr.length];
}
