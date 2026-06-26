/**
 * 地圖探索（霧中探明）：世界地圖隨玩家移動逐步揭露——基於原著的地點，
 * 抵達一地即探明該大區與其主要地點，並得知鄰接地域之名，輿圖隨足跡而擴展。
 */
import { WORLD_MAP } from '../data/worldMap';
import { findMapNode } from './mapIntel';

// 各界「界根」的預設落腳大區（與 travel 一致：人界＝天南）
const ROOT_DEFAULT: Record<string, string> = { human: 'tianNan', spirit: 'fengYuanDaLu' };

function byId(id: string) {
  return WORLD_MAP.find((n) => n.id === id);
}
function directChildren(id: string): string[] {
  return WORLD_MAP.filter((n) => n.parentId === id).map((n) => n.id);
}
function isRealmRoot(node: { parentId?: string } | undefined): boolean {
  return !!node && !node.parentId;
}
/** 解析 connections（可能為 id 或中文名）為地圖節點 id。 */
function resolveConns(id: string): string[] {
  const n = byId(id);
  if (!n || !n.connections) return [];
  return n.connections.map((c) => findMapNode(c)?.id || c).filter((cid) => !!byId(cid));
}
/** 站在界根時，以該界預設大區為實際落腳點。 */
function effectiveId(locId: string): string | undefined {
  const node = findMapNode(locId);
  if (!node) return undefined;
  if (isRealmRoot(node)) {
    const def = ROOT_DEFAULT[node.tier];
    if (def && byId(def)) return def;
    const firstRegion = WORLD_MAP.find((n) => n.tier === node.tier && n.parentId === node.id);
    return firstRegion?.id || node.id;
  }
  return node.id;
}
/** 某節點所屬「大區」（界根直屬子節點）。 */
function regionOf(id: string): string | undefined {
  let cur = byId(id);
  if (!cur) return undefined;
  while (cur.parentId) {
    const parent = byId(cur.parentId);
    if (!parent || !parent.parentId) return cur.id; // 父為界根 → 自己即大區
    cur = parent;
  }
  return cur.id; // 自己即界根
}

/**
 * 抵達 locId 時應揭露的原著地點 id 集合：
 * 界根 + 所屬大區及其主要地點 + 抵達地及其子地點 + 沿途連結之鄰地/鄰區。
 */
export function discoverAround(locId: string): string[] {
  const eff = effectiveId(locId);
  const start = eff ? byId(eff) : undefined;
  if (!start) return [];
  const out = new Set<string>();
  // 界根（你知道身處哪一界）
  const root = WORLD_MAP.find((n) => n.tier === start.tier && !n.parentId);
  if (root) out.add(root.id);
  // 所屬大區 + 其主要（直屬）地點
  const region = regionOf(start.id);
  if (region) {
    out.add(region);
    for (const c of directChildren(region)) out.add(c);
    for (const c of resolveConns(region)) out.add(c); // 鄰接大區/地（得其名）
  }
  // 抵達地本身 + 其子地點 + 其連結
  out.add(start.id);
  for (const c of directChildren(start.id)) out.add(c);
  for (const c of resolveConns(start.id)) out.add(c);
  return Array.from(out);
}

/** 初始探明：起點及其周邊。 */
export function initialDiscoveries(locId: string): string[] {
  const d = discoverAround(locId);
  if (d.length) return d;
  // 連起點都不在地圖（如自訂地名）→ 至少記下起點本身
  const n = findMapNode(locId);
  return n ? [n.id] : [];
}

/** 取地點顯示名；界根與未知者回傳 null（不列入「新探明」播報）。 */
export function labelFor(id: string): string | null {
  const n = byId(id);
  if (!n || !n.parentId) return null;
  return n.name;
}
