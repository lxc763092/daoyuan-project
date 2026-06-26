/**
 * 地點劇情閘：有些地點因正史走向「尚未開放」——
 *  · 進度閘（progress）：遠期之地（如亂星海＝第四卷、靈界以後）須劇情推進至該卷方得踏足，早期不顯於圖、不可前往。
 *  · 隱匿閘（hidden）：平時隱於虛無的秘境/禁地（如虛天殿），未得指引（圖/令）則不顯其蹤。
 *  · 信物閘（item）：入內須持特定信物（如「虛天殿圖」）。
 *  · 封印閘（seal）：入內須先解除封印（世界旗標，如「虛天殿封印解除」）。
 * 純邏輯：依世界進度章、玩家背包、世界旗標判定某節點的 visible（顯於圖）與 accessible（可前往）。
 */
import type { WorldMapNode, FanrenWorldState } from '../types';
import { WORLD_MAP } from '../data/worldMap';
import { findMapNode } from './mapIntel';
import { findSectByName } from './sect';
import { sectSiteOf } from './sectSites';

// ── 坊市：唯有人煙聚集的城鎮坊市、或修仙/魔道宗門所在，方有坊市可逛（凡人荒野山島無從交易）──
const MARKET_KW = /坊市|坊$|市集|市$|城$|鎮$|京$|埠$|墟$|集$|閣$|樓$|宮$|殿$/;
/** 此地是否有坊市可交易。 */
export function hasMarketAt(locationId: string): boolean {
  const node = findMapNode(locationId);
  if (!node) return false;
  if (MARKET_KW.test(node.name)) return true;
  const sect = findSectByName(node.name); // 修仙/魔道宗門設有門中坊市；武林門派（凡俗）不算
  if (sect && sect.category !== '武林門派') return true;
  if (sectSiteOf(node.id)?.facilities.some((f) => f.kind === '坊市')) return true; // 修仙門派據點坊市
  return false;
}

// 卷→首章（與 canonLoader VOL_FIRST_CHAPTER 一致）
const VOL_FIRST_CHAPTER: Record<number, number> = {
  1: 1, 2: 100, 3: 160, 4: 500, 5: 760, 6: 900, 7: 1180, 8: 1300, 9: 1500, 10: 1900, 11: 2350, 12: 2400, 13: 2440,
};

const BY_ID: Record<string, WorldMapNode> = {};
for (const n of WORLD_MAP) BY_ID[n.id] = n;

/** 某節點的解鎖章：access.unlockChapter 優先，否則由 firstVolume 推得。 */
export function nodeUnlockChapter(node: WorldMapNode): number {
  return node.access?.unlockChapter ?? VOL_FIRST_CHAPTER[node.firstVolume || 1] ?? 1;
}

/** 節點所屬「大區」（界根直屬子節點）。進度閘以大區為準——同一大區內自由探行，遠方大區方須劇情推進。 */
function regionNode(node: WorldMapNode): WorldMapNode {
  let cur = node;
  const seen = new Set<string>();
  while (cur.parentId && !seen.has(cur.id)) {
    seen.add(cur.id);
    const p = BY_ID[cur.parentId];
    if (!p || !p.parentId) return cur; // cur 的父為界根 → cur 即大區
    cur = p;
  }
  return cur;
}
/** 某地所屬大區的解鎖章（亂星海＝第四卷、大晉＝第六卷…）。 */
export function regionUnlockChapter(node: WorldMapNode): number {
  return node.access?.unlockChapter ?? nodeUnlockChapter(regionNode(node));
}

export interface MapGateCtx {
  progressChapter: number;
  inventoryNames?: string[];
  flags?: Record<string, boolean>;
}
export type GateKind = 'none' | 'progress' | 'item' | 'seal' | 'hidden';
export interface GateResult {
  accessible: boolean; // 可否前往
  visible: boolean; // 是否顯於輿圖（不可見者連存在都不揭露）
  gate: GateKind;
  reason: string; // 給玩家看的說明
}

const OPEN: GateResult = { accessible: true, visible: true, gate: 'none', reason: '' };

function hasItem(ctx: MapGateCtx, name?: string): boolean {
  if (!name) return true;
  return (ctx.inventoryNames || []).some((n) => n.includes(name) || name.includes(n));
}
function hasFlag(ctx: MapGateCtx, flag?: string): boolean {
  if (!flag) return true;
  return !!(ctx.flags || {})[flag];
}

/** 判定某地圖節點在當前情境下的可見性與可達性。 */
export function gateOf(node: WorldMapNode | undefined, ctx: MapGateCtx): GateResult {
  if (!node) return OPEN; // 未上圖（自訂/生成地）不設限，交由上層處理
  const acc = node.access || {};
  // 1. 進度閘（以大區為準）：所屬大區的劇情尚未行至 → 不顯、不可達
  const unlock = regionUnlockChapter(node);
  if (ctx.progressChapter < unlock) {
    return { accessible: false, visible: false, gate: 'progress', reason: `「${node.name}」遠在他方，與你當前的仙途尚遙——須待時運推移、機緣到來（劇情推進），方有踏足之日。` };
  }
  // 2. 隱匿之地：信物控制「能否尋得其蹤」(visible)、封印控制「能否入內」(accessible)。
  //    無信物要求者＝純隱匿（不落輿圖，須親知其名方可循名前往）；非以 hasItem(undefined)=true 誤判為公開。
  if (acc.hidden) {
    if (acc.requiresItem && !hasItem(ctx, acc.requiresItem)) {
      return { accessible: false, visible: false, gate: 'item', reason: `「${node.name}」平時隱於虛無、不落輿圖——非得「${acc.requiresItem}」指引，凡夫難覓其蹤。` };
    }
    if (acc.requiresFlag && !hasFlag(ctx, acc.requiresFlag)) {
      return { accessible: false, visible: !!acc.requiresItem, gate: 'seal', reason: `你按「${acc.requiresItem || '線索'}」尋至「${node.name}」之外，然其為禁制封印所鎖——須先「${acc.requiresFlag}」，方得其門而入。` };
    }
    // 過信物/封印之限：有信物指引者現於圖；純隱匿者仍不顯於圖，但已知其名者可前往。
    return { accessible: true, visible: !!acc.requiresItem, gate: acc.requiresItem ? 'none' : 'hidden', reason: '' };
  }
  // 3. 明面地點但設有信物/封印之限
  if (acc.requiresItem && !hasItem(ctx, acc.requiresItem)) {
    return { accessible: false, visible: true, gate: 'item', reason: `入「${node.name}」須持「${acc.requiresItem}」為憑。` };
  }
  if (acc.requiresFlag && !hasFlag(ctx, acc.requiresFlag)) {
    return { accessible: false, visible: true, gate: 'seal', reason: `「${node.name}」尚未開啟——須先「${acc.requiresFlag}」。` };
  }
  return OPEN;
}

/** 便捷：以世界狀態 + 背包名單判定某地（節點 id 或中文名）。 */
export function gateForLocation(idOrName: string, world: FanrenWorldState, inventoryNames?: string[]): GateResult {
  return gateOf(findMapNode(idOrName), {
    progressChapter: world.progressChapter,
    inventoryNames,
    flags: world.flags,
  });
}
