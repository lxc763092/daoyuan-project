/**
 * 稟賦加成曲線：靈根 / 悟性 / 心性 對修煉、術法、學習、爭鬥、心魔等各方面的加成。
 * 「極端三倍」——屬性拉滿(100)時加成約 3 倍、中庸(50)約 1 倍、最低(0)約 1/3。
 */

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** 指數曲線：0→1/3、50→1、100→3。用於修煉/學習等「乘區」加成。 */
export function tripleFactor(v: number): number {
  return Math.pow(3, (clamp(v, 0, 100) - 50) / 50);
}

/** 靈根「資質強度」0-100：以最高單屬為準（越純越強，天靈根=100）。 */
export function rootPotency(roots: { metal: number; wood: number; water: number; fire: number; earth: number }): number {
  return clamp(Math.max(roots.metal, roots.wood, roots.water, roots.fire, roots.earth), 0, 100);
}

/** 悟性對修煉/學習/突破的乘區加成（極端 3x）。 */
export function comprehensionMult(comprehension: number): number {
  return tripleFactor(comprehension);
}

/** 心性 → 走火入魔/心魔/渡劫的抗性（0..0.33，100→0.33）。 */
export function daoHeartResist(daoHeart: number): number {
  return clamp((clamp(daoHeart, 0, 100) / 100) * 0.33, 0, 0.33);
}

/** 速度稟賦 → 旅行腳程倍率（0→1x、100→3x；遁速越快、路程越短）。 */
export function travelSpeedMult(agility: number): number {
  return 1 + (clamp(agility, 0, 100) / 100) * 2;
}

/** 速度稟賦 → 逃離追殺的成功率（0→0.45、100→0.9；越快越易甩脫追兵）。 */
export function fleeChance(agility: number, luck: number): number {
  return clamp(0.45 + (clamp(agility, 0, 100) / 100) * 0.45 + (luck || 0) * 0.01, 0.1, 0.95);
}

/**
 * 戰鬥/術法屬性的起手加成倍率（用於 buildCanonPlayer 將點數＋靈根悟性烘焙進初始屬性）。
 * 點數獨力可達 3x；神識（術法）另受靈根與悟性加成（仙俠：法力威能繫於靈根純度與悟性）；
 * 攻擊/速度（爭鬥）另受悟性些許加成。總倍率封頂 3x。
 */
export function combatStatMult(
  stat: 'attack' | 'defense' | 'spirit' | 'physique' | 'speed',
  allocValue: number, // 0-100 點數投入
  rootPot: number, // 0-100 靈根強度
  comprehension: number // 0-100 悟性
): number {
  const a = clamp(allocValue, 0, 100) / 100;
  const r = clamp(rootPot, 0, 100) / 100;
  const c = clamp(comprehension, 0, 100) / 100;
  let m: number;
  if (stat === 'spirit') {
    m = 1 + a * 1.5 + r * 0.75 + c * 0.75; // 術法威能：靈根＋悟性顯著加成
  } else if (stat === 'attack' || stat === 'speed') {
    m = 1 + a * 2 + c * 0.5; // 爭鬥：悟性略助領悟
  } else {
    m = 1 + a * 2; // 防禦/體魄：純點數
  }
  return clamp(m, 0.33, 3);
}
