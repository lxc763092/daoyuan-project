/** 自定義金手指：把玩家自由描述解析為「受平衡約束」的結構化外掛，並管理執行期能量/業力。 */
import type {
  GoldenFinger,
  GoldenFingerCategory,
  GoldenFingerEffect,
  GoldenFingerRuntime,
} from '../types';

interface CatRule {
  cat: GoldenFingerCategory;
  re: RegExp;
  hook: GoldenFingerEffect['hook'];
  defaultName: string;
}
const CAT_RULES: CatRule[] = [
  { cat: 'cultivation', re: /修煉|修为|修為|閉關|靈氣|靈力|功力|催熟|靈藥|靈草|藥草|練氣|突破速度|事半功倍|加速/, hook: 'cultivationRateMult', defaultName: '玄之又玄' },
  { cat: 'crafting', re: /煉丹|煉器|丹藥|丹方|爐火|材料|種植|成丹率|品質/, hook: 'craftSuccess', defaultName: '匠心獨運' },
  { cat: 'knowledge', re: /鑑定|鑑寶|看穿|洞察|讀心|預知|分析|資訊|情報|來歷|底細|真偽|掃描/, hook: 'appraise', defaultName: '洞察之眼' },
  { cat: 'fortune', re: /氣運|運氣|機緣|奇遇|好運|逢凶化吉|貴人|掉落/, hook: 'luckBonus', defaultName: '氣運加身' },
  { cat: 'combat', re: /戰鬥|攻擊|傷害|防禦|劍法|刀法|神通|秒|爆發|威能|護體/, hook: 'combatBuff', defaultName: '殺伐果斷' },
  { cat: 'social', re: /聲望|好感|魅力|說服|人脈|名聲|交涉/, hook: 'custom', defaultName: '八面玲瓏' },
];

// 誇大用詞 → 越誇大，powerTier 越被「壓制」並加更多限制
const GRANDIOSE = /(無限|無敵|絕對|永久|秒殺|瞬間滿級|不消耗|沒有代價|一鍵|直接突破|逆天|至高|最強)/g;

const TIER_PARAMS: Record<number, { energyMax: number; regen: number; cost: number; karma: number }> = {
  1: { energyMax: 100, regen: 20, cost: 10, karma: 0.5 },
  2: { energyMax: 100, regen: 14, cost: 18, karma: 1 },
  3: { energyMax: 100, regen: 10, cost: 28, karma: 2 },
  4: { energyMax: 100, regen: 7, cost: 40, karma: 4 },
  5: { energyMax: 100, regen: 5, cost: 55, karma: 7 },
};

function estimateTier(text: string): number {
  // 基礎 2；描述越具體/克制 → 可稍高效率；越浮誇 → 反而壓 tier 並加限制
  let tier = 2;
  const grand = (text.match(GRANDIOSE) || []).length;
  if (grand >= 2) tier = 4; // 浮誇 → 高 tier（＝高代價、多限制），而非高收益
  else if (grand === 1) tier = 3;
  if (/(只能|僅能|每日|有限|需要|代價|風險|無法用於)/.test(text)) tier = Math.max(1, tier - 1); // 玩家自願設限 → 降代價
  return Math.min(5, Math.max(1, tier));
}

function magnitudeForTier(tier: number, hook: GoldenFingerEffect['hook']): number {
  // 修煉倍率：tier1→1.2x ... tier5→2.0x（受限，非無限）
  if (hook === 'cultivationRateMult') return 1.1 + tier * 0.18;
  if (hook === 'herbMaturation') return tier; // 催熟年份倍數
  if (hook === 'combatBuff') return 0.05 + tier * 0.05; // +5%~30%
  if (hook === 'luckBonus') return tier * 5;
  if (hook === 'craftSuccess') return 0.05 + tier * 0.06;
  if (hook === 'appraise') return tier;
  return tier;
}

/**
 * 解析玩家自由文本為平衡後的金手指。純規則式（離線可用）；
 * GM 模式下可再以 LLM 潤飾 name/description/limits，但數值仍由此處約束。
 */
export function parseGoldenFinger(rawText: string, playerName?: string): GoldenFinger {
  const text = (rawText || '').trim();
  let rule = CAT_RULES.find((r) => r.re.test(text)) || CAT_RULES[0];
  // 催熟靈藥（小綠瓶式）特判
  let hook: GoldenFingerEffect['hook'] = rule.hook;
  if (/催熟|靈藥|靈草|藥草成熟|藥園/.test(text)) hook = 'herbMaturation';

  const tier = estimateTier(text) as 1 | 2 | 3 | 4 | 5;
  const tp = TIER_PARAMS[tier];

  const limits: string[] = ['每次發動消耗能量，能量耗盡需待回復', '使用累積業力，業力過高會引動「系統異常」（暫時失效）與天劫風險'];
  const blindSpots: string[] = ['對遠高於自身境界者效果大減或無效', '在特定禁制/秘境/法則壓制之地可能失靈'];
  const grand = (text.match(GRANDIOSE) || []).length;
  if (grand > 0) {
    limits.push('你描述中過於誇大的部分被天道法則自動削弱——它強大，但絕非無敵');
    blindSpots.push('力量越張揚，越容易被高人察覺而招致覬覦');
  }
  if (hook === 'herbMaturation') limits.push('產出有上限，且催熟物離開器物片刻即逝，無法囤積');

  const name = (text.match(/叫做?「?([一-龥A-Za-z0-9]{2,8})」?/)?.[1]) || rule.defaultName;
  const category = (/催熟|靈藥/.test(text) ? 'cultivation' : rule.cat) as GoldenFingerCategory;

  return {
    id: `gf-${(playerName || 'p').slice(0, 4)}-${tier}`,
    name,
    rawText: text,
    category,
    description: `根據你的描述凝練而成的本命機緣（${rule.cat}型）。它能${effectDesc(hook)}，但受能量與業力約束。`,
    powerTier: tier,
    energyMax: tp.energyMax,
    energyRegenPerDay: tp.regen,
    energyCostPerUse: tp.cost,
    karmaPerUse: tp.karma,
    limits,
    blindSpots,
    effects: [{ hook, magnitude: magnitudeForTier(tier, hook), note: text.slice(0, 40) }],
  };
}

function effectDesc(hook: GoldenFingerEffect['hook']): string {
  switch (hook) {
    case 'cultivationRateMult': return '在發動期間顯著加速修煉';
    case 'herbMaturation': return '催熟靈草藥材，化腐朽為神奇';
    case 'combatBuff': return '短時強化你的戰力';
    case 'appraise': return '洞察事物的來歷與真偽';
    case 'luckBonus': return '提升一段時間的氣運與機緣';
    case 'craftSuccess': return '提升煉製成功率與品質';
    default: return '提供獨特的輔助之力';
  }
}

export function createGoldenFingerRuntime(gf: GoldenFinger, currentDay: number): GoldenFingerRuntime {
  return { energy: gf.energyMax, karma: 0, usesTotal: 0, lastRegenDay: currentDay, awakenLevel: 0 };
}

// 覺醒里程碑（累計使用次數）。每跨一階，威能上升。
export const AWAKEN_THRESHOLDS = [15, 40, 80, 150];
export const AWAKEN_NAMES = ['初窺門徑', '小有所成', '駕輕就熟', '臻於化境', '通神入聖'];
export function awakenBoost(level: number): number {
  return 1 + level * 0.3; // 每階 +30% 威能
}

/** 依經過天數回復能量（純函式，回傳新 runtime）。 */
export function regenGoldenFinger(rt: GoldenFingerRuntime, gf: GoldenFinger, currentDay: number): GoldenFingerRuntime {
  const days = Math.max(0, currentDay - rt.lastRegenDay);
  if (days <= 0) return rt;
  const energy = Math.min(gf.energyMax, rt.energy + days * gf.energyRegenPerDay);
  // 業力隨時間緩慢消解
  const karma = Math.max(0, rt.karma - days * 0.05);
  return { ...rt, energy, karma, lastRegenDay: currentDay };
}

export interface UseResult {
  ok: boolean;
  reason?: string;
  effect?: GoldenFingerEffect;
  runtime: GoldenFingerRuntime;
  anomaly?: boolean; // 是否觸發系統異常
  awakened?: boolean; // 本次是否跨入新覺醒階
  awakenLevel?: number; // 當前覺醒階
}

export const KARMA_ANOMALY_THRESHOLD = 60;

export function useGoldenFinger(rt: GoldenFingerRuntime, gf: GoldenFinger, currentDay: number): UseResult {
  const r = regenGoldenFinger(rt, gf, currentDay);
  if (r.suppressedUntilDay && currentDay < r.suppressedUntilDay) {
    return { ok: false, reason: `「${gf.name}」陷入異常維修中，尚需${r.suppressedUntilDay - currentDay}日方可再用。`, runtime: r };
  }
  if (r.energy < gf.energyCostPerUse) {
    return { ok: false, reason: `「${gf.name}」能量不足（${Math.floor(r.energy)}/${gf.energyCostPerUse}），需靜待回復。`, runtime: r };
  }
  const energy = r.energy - gf.energyCostPerUse;
  const karma = r.karma + gf.karmaPerUse;
  let runtime: GoldenFingerRuntime = { ...r, energy, karma, usesTotal: r.usesTotal + 1 };
  // 覺醒判定：使用次數跨越里程碑 → 提升覺醒階
  const prevAwaken = r.awakenLevel || 0;
  const newAwaken = AWAKEN_THRESHOLDS.filter((t) => runtime.usesTotal >= t).length;
  const awakened = newAwaken > prevAwaken;
  runtime.awakenLevel = newAwaken;
  // 依覺醒階放大威能
  const baseEff = gf.effects[0];
  const effect: GoldenFingerEffect = { ...baseEff, magnitude: baseEff.magnitude * awakenBoost(newAwaken) };
  let anomaly = false;
  if (karma >= KARMA_ANOMALY_THRESHOLD) {
    // 業力爆表 → 系統異常（維修期），業力清零
    runtime = { ...runtime, karma: 0, suppressedUntilDay: currentDay + 30 + gf.powerTier * 10 };
    anomaly = true;
  }
  return { ok: true, effect, runtime, anomaly, awakened, awakenLevel: newAwaken };
}
