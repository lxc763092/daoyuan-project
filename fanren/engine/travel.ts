/**
 * 旅行系統：依「境界遁速 × 圖面距離」推算腳程；跨海越域須傳送陣（耗靈石），
 * 結丹以上可御劍飛渡；無陣可達之地則窮盡一生亦難抵——並在旅途中觸發奇遇。
 */
import { WORLD_MAP } from '../data/worldMap';
import type { WorldMapNode } from '../types';
import { findMapNode } from './mapIntel';
import { mapPoint, regionAnchorOf, landAdjacent, regionHasHub, distanceBetween } from './mapLayout';

// 各界「界根」的預設落腳大區（韓立人界起點為天南；其餘取首要大區）
const PREFERRED_ROOT_ORIGIN: Record<string, string> = { human: 'tianNan', spirit: 'fengYuanDaLu' };
function defaultRegionForRoot(root: WorldMapNode): WorldMapNode | undefined {
  const pref = PREFERRED_ROOT_ORIGIN[root.tier];
  if (pref) {
    const n = WORLD_MAP.find((x) => x.id === pref);
    if (n) return n;
  }
  return WORLD_MAP.find((x) => x.tier === root.tier && x.parentId === root.id);
}

// 各境界遁速（圖面單位／日）。境界越高，遁光神通越快——結丹禦器禦劍「瞬息百里」、元嬰御空「神遊萬里」。
const DUN_SPEED: Record<string, number> = {
  炼气期: 2,
  筑基期: 6,
  金丹期: 22,   // 結丹禦劍瞬息百里，遠超築基（~3.7×）
  元婴期: 70,   // 元嬰御空長程、神遊萬里
  化神期: 160,
};
// 境界序（御劍飛渡解鎖於結丹——結丹起禦器禦劍可越江海，符 realms.ts canon）
const REALM_INDEX: Record<string, number> = { 炼气期: 0, 筑基期: 1, 金丹期: 2, 元婴期: 3, 化神期: 4 };
const FLIGHT_REALM = 2; // 結丹起可禦器禦劍飛渡江海（築基御劍仍須仗法器、不足以遠渡）

function speedOf(realm: string): number {
  return DUN_SPEED[realm] || 2;
}
function realmIdx(realm: string): number {
  return REALM_INDEX[realm] ?? 0;
}
/** 境界對應的奇遇收益量級。 */
export function realmScale(realm: string): number {
  return [0.6, 1, 1.6, 2.4, 3.2][realmIdx(realm)] || 0.6;
}

export type TravelMode = 'here' | 'walk' | 'fly' | 'teleport' | 'blocked' | 'unknown';

export interface TravelPlan {
  fromId: string;
  toId: string;
  toName: string;
  mode: TravelMode;
  distance: number; // 圖面單位
  days: number;
  spiritStoneCost: number;
  feasible: boolean;
  reason: string; // 給玩家看的說明
  crossTier: boolean;
}

/** 將天數轉為「X年Y月」式說法。 */
export function humanizeDays(days: number): string {
  if (days <= 0) return '即刻';
  if (days < 30) return `約${days}日`;
  if (days < 360) return `約${Math.round(days / 30)}月`;
  const years = days / 360;
  if (years < 10) return `約${years.toFixed(years < 3 ? 1 : 0)}年`;
  return `逾${Math.round(years)}年`;
}

/**
 * 規劃由 fromRaw → toRaw 的旅程（兩者可為節點 id 或中文名）。
 */
export function planTravel(fromRaw: string, toRaw: string, realm: string, spiritStones: number, speedMult = 1): TravelPlan {
  let fromNode = findMapNode(fromRaw);
  const toNode = findMapNode(toRaw);
  // 站在界根（如「人界」尚未落腳）→ 以該界的預設大區為實際出發點
  if (fromNode && !fromNode.parentId) {
    const sub = defaultRegionForRoot(fromNode);
    if (sub) fromNode = sub;
  }
  const fromId = fromNode?.id || fromRaw;
  const toId = toNode?.id || toRaw;
  const toName = toNode?.name || toRaw;

  const blank: TravelPlan = { fromId, toId, toName, mode: 'unknown', distance: 0, days: 0, spiritStoneCost: 0, feasible: true, reason: '', crossTier: false };

  if (!fromNode || !toNode) {
    // 至少一端不在已知地圖 → 交由上層（未知地探索/世界擴充）處理，給保守腳程
    return { ...blank, mode: 'unknown', days: 30, reason: '路途未明' };
  }
  if (fromId === toId) {
    return { ...blank, mode: 'here', days: 0, reason: '你已身在此地。' };
  }

  const crossTier = fromNode.tier !== toNode.tier;
  const dist = distanceBetween(fromId, toId);
  const speed = speedOf(realm) * Math.max(0.5, speedMult); // 速度稟賦加速腳程/飛渡
  const regionA = regionAnchorOf(fromId) || fromId;
  const regionB = regionAnchorOf(toId) || toId;

  if (crossTier) {
    // 跨界域非傳送陣可達，須飛升或界域通道
    return {
      ...blank,
      mode: 'blocked',
      distance: dist,
      feasible: false,
      crossTier: true,
      reason: '此乃另一界域，非腳程或傳送陣可至——須循界域通道或飛升之機方能跨越。',
    };
  }

  const sameRegion = regionA === regionB;
  const canWalk = sameRegion || landAdjacent(regionA, regionB);
  const canFly = realmIdx(realm) >= FLIGHT_REALM; // 結丹起可越海飛渡

  if (canWalk) {
    const days = Math.max(1, Math.round(dist / speed));
    return {
      ...blank,
      mode: 'walk',
      distance: dist,
      days,
      reason: sameRegion ? `區內腳程，遁速${Math.round(speed)}，${humanizeDays(days)}可達。` : `循陸路跨區，遁速${Math.round(speed)}，${humanizeDays(days)}可達。`,
    };
  }

  // 跨海越域：結丹以上可御劍飛渡
  if (canFly) {
    const days = Math.max(1, Math.round((dist * 1.15) / speed));
    return {
      ...blank,
      mode: 'fly',
      distance: dist,
      days,
      reason: `江海相隔，然你已能御劍凌空——飛渡${humanizeDays(days)}可至。`,
    };
  }

  // 低境界跨海：須傳送陣。目的大區須設有傳送陣以承接（出發端就近尋陣，已折算入耗時與靈石）。
  const canTeleport = regionHasHub(regionB);
  if (canTeleport) {
    const cost = Math.round(dist * 0.6) + 20;
    const days = Math.max(3, Math.round(dist / 110) + 3); // 就近尋陣＋啟陣，與遁速無關，遠快於腳程
    const affordable = spiritStones >= cost;
    return {
      ...blank,
      mode: 'teleport',
      distance: dist,
      days,
      spiritStoneCost: cost,
      feasible: affordable,
      reason: affordable
        ? `跨海越域，徒步窮盡一生亦難抵達——須借傳送大陣，耗靈石 ${cost}，${humanizeDays(days)}可達。`
        : `須借傳送大陣（耗靈石 ${cost}），然你靈石不足（現有 ${spiritStones}）。`,
    };
  }

  // 無陣可達、又無法飛渡
  return {
    ...blank,
    mode: 'blocked',
    distance: dist,
    feasible: false,
    reason: '此地隔山跨海，沿途並無傳送大陣可借，徒步窮極一生亦難抵達——待你修為精進、能御劍飛渡，或另尋傳送之機。',
  };
}

// ─────────────────────────────────────────────
// 旅途奇遇
// ─────────────────────────────────────────────

export interface TravelEncounter {
  text: string;
  logType: 'normal' | 'gain' | 'danger' | 'special';
  deltas?: { exp?: number; spiritStones?: number; hp?: number; lifespan?: number };
  important?: boolean;
}

interface EncTemplate {
  weight: number;
  type: TravelEncounter['logType'];
  make: (tierLabel: string, scale: number) => TravelEncounter;
}

const TIER_LABEL: Record<string, string> = { human: '人界', spirit: '靈界', demon: '魔界', immortal: '仙界' };

const ENCOUNTERS: EncTemplate[] = [
  {
    weight: 30,
    type: 'normal',
    make: () => ({ text: '一路風塵僕僕，山水迢遞，倒也無甚波折。', logType: 'normal' }),
  },
  {
    weight: 12,
    type: 'gain',
    make: (_t, s) => ({
      text: '途經一處廢棄洞府，你謹慎搜檢，得些前人遺留的靈石。',
      logType: 'gain',
      deltas: { spiritStones: Math.round(15 * s) },
    }),
  },
  {
    weight: 10,
    type: 'gain',
    make: (_t, s) => ({
      text: '行旅之間偶遇雲遊散修，把酒論道，於修煉一途頗有所悟。',
      logType: 'gain',
      deltas: { exp: Math.round(40 * s) },
    }),
  },
  {
    weight: 9,
    type: 'danger',
    make: (t, s) => ({
      text: `途經${t}險地，半路殺出攔路的妖獸與劫修，你勉力脫身，受了些傷。`,
      logType: 'danger',
      deltas: { hp: -Math.round(20 * s) },
    }),
  },
  {
    weight: 8,
    type: 'special',
    make: (_t, s) => ({
      text: '✦ 旅途奇遇：你在荒徑旁的崖壁夾縫中，瞥見一株無主靈藥，小心採下收入囊中。',
      logType: 'special',
      deltas: { exp: Math.round(30 * s), spiritStones: Math.round(10 * s) },
      important: true,
    }),
  },
  {
    weight: 6,
    type: 'special',
    make: () => ({
      text: '✦ 旅途奇遇：夜宿古驛，夢中似有殘缺道韻流轉，醒來心境澄明了幾分。',
      logType: 'special',
      deltas: { exp: 50 },
      important: true,
    }),
  },
  {
    weight: 5,
    type: 'danger',
    make: (_t, s) => ({
      text: '途中誤入一片迷霧禁地，耗了不少時日才尋路而出，元氣與壽元都損耗了些。',
      logType: 'danger',
      deltas: { lifespan: -0.2, hp: -Math.round(10 * s) },
    }),
  },
];

/**
 * 依旅程天數擲一次奇遇（旅途越長越易遇事；無事亦是常態）。
 * scale 由境界決定收益量級；luck 微調奇遇機率。
 */
export function rollTravelEncounter(tier: string, realmScale: number, days: number, luck: number, rnd: number): TravelEncounter | null {
  if (days < 3) return null;
  // 觸發機率：旅程越長越高，封頂 0.85
  const chance = Math.min(0.85, 0.18 + days / 400 + (luck || 0) * 0.02);
  if (rnd > chance) return null;
  const pool = ENCOUNTERS;
  const total = pool.reduce((s, e) => s + e.weight, 0);
  // 以 rnd 的小數位再擲一次選池（避免額外亂源）
  let r = ((rnd * 1000) % 1) * total;
  let pick = pool[0];
  for (const e of pool) {
    if (r < e.weight) {
      pick = e;
      break;
    }
    r -= e.weight;
  }
  return pick.make(TIER_LABEL[tier] || '此', Math.max(0.5, realmScale));
}
