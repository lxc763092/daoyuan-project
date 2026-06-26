/**
 * 平面地圖佈局：在每個界域的 [0..1000] 平面上，為地圖節點推算座標（忠實小說相對方位）。
 * 大區（界根的直屬子節點）以羅盤定位種子擺放，其下子地點環繞父節點群聚。
 * 同時界定「傳送陣樞紐」與「陸路相鄰」的大區，供旅行系統判定步行/傳送/不可達。
 */
import { WORLD_MAP } from '../data/worldMap';

export interface MapPoint {
  id: string;
  name: string;
  tier: string;
  x: number;
  y: number;
  isRegion: boolean; // 是否為大區（界根直屬）
  isHub: boolean; // 是否設有傳送陣
}

// 各界主要大區的羅盤定位（macro 地理）。未列者以環狀回退分布。
const REGION_SEED: Record<string, { x: number; y: number }> = {
  // 人界
  tianNan: { x: 470, y: 775 }, // 天南大陸（南，韓立起點）
  muLanCaoYuan: { x: 235, y: 470 }, // 慕蘭（天瀾）草原（西）
  daJin: { x: 565, y: 235 }, // 大晉（北，幅員遼闊）
  wuLongHai: { x: 815, y: 560 }, // 五龍海（東海）
  tianShaDaLu: { x: 805, y: 225 }, // 天沙大陸（東北）
  luanXingHai: { x: 905, y: 825 }, // 亂星海（極東海外，須古傳送陣直達）
  // 靈界
  fengYuanDaLu: { x: 300, y: 300 },
  leiMingDaLu: { x: 715, y: 300 },
  mingHeZhiDi: { x: 250, y: 720 },
  manHuangShiJie: { x: 520, y: 870 },
  shengDao: { x: 800, y: 640 },
  xueTianDaLu: { x: 760, y: 820 },
};

// 傳送陣樞紐（小說考據 + 主要交易/門派大區）。未列大區＝無正式傳送陣，跨海須飛渡或暫不可達。
const TELEPORT_HUBS = new Set<string>([
  // 人界
  'tianNan', 'daJin', 'luanXingHai', 'tianXingCheng', 'yinYangKu', 'jinJing',
  // 靈界（綠光城/伏蛟城/天淵城等樞紐 + 主大區）
  'fengYuanDaLu', 'leiMingDaLu', 'shengDao', 'lvGuangCheng', 'fuJiaoCheng', 'tianYuanCheng',
]);

// 陸路相鄰的大區對（其餘跨大區須傳送陣或高境界飛渡）
const LAND_ADJ = new Set<string>([
  pairKey('tianNan', 'muLanCaoYuan'),
  pairKey('muLanCaoYuan', 'daJin'),
  pairKey('daJin', 'tianShaDaLu'),
]);

function pairKey(a: string, b: string): string {
  return [a, b].sort().join('__');
}
function clamp(v: number): number {
  return Math.max(42, Math.min(958, v));
}
// 由 id 推導穩定的小抖動角（避免 Math.random，保證每次佈局一致）
function hashAngle(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 360) * (Math.PI / 180);
}
function circlePos(i: number, n: number, cx: number, cy: number, r: number): { x: number; y: number } {
  const a = (i / Math.max(1, n)) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
}

const TIERS = ['human', 'spirit', 'demon', 'immortal'];

let _layout: Record<string, MapPoint> | null = null;
let _regionAnchor: Record<string, string> | null = null; // nodeId → 其大區 id
let _regionHasHub: Record<string, boolean> | null = null;

function build(): void {
  if (_layout) return;
  const layout: Record<string, MapPoint> = {};
  const regionAnchor: Record<string, string> = {};

  for (const tier of TIERS) {
    const nodes = WORLD_MAP.filter((n) => n.tier === tier);
    if (!nodes.length) continue;
    const ids = new Set(nodes.map((n) => n.id));
    const root = nodes.find((n) => !n.parentId || !ids.has(n.parentId)) || nodes[0];
    const regions = nodes.filter((n) => n.parentId === root.id);

    // 大區定位
    regions.forEach((r, i) => {
      const seed = REGION_SEED[r.id] || circlePos(i, regions.length, 500, 500, 350);
      layout[r.id] = { id: r.id, name: r.name, tier, x: clamp(seed.x), y: clamp(seed.y), isRegion: true, isHub: TELEPORT_HUBS.has(r.id) };
      regionAnchor[r.id] = r.id;
    });
    // 界根置中（地圖上不特別顯示）
    layout[root.id] = { id: root.id, name: root.name, tier, x: 500, y: 500, isRegion: true, isHub: false };
    regionAnchor[root.id] = root.id;

    // 子孫節點：環繞父節點群聚
    const placeChildren = (parentId: string, regionId: string, depth: number): void => {
      const kids = nodes.filter((n) => n.parentId === parentId);
      const pp = layout[parentId];
      kids.forEach((k, i) => {
        if (!layout[k.id]) {
          const ang = (i / Math.max(1, kids.length)) * Math.PI * 2 + hashAngle(k.id);
          const rad = (depth === 0 ? 78 : 50) + (i % 3) * 24;
          layout[k.id] = {
            id: k.id,
            name: k.name,
            tier,
            x: clamp(pp.x + Math.cos(ang) * rad),
            y: clamp(pp.y + Math.sin(ang) * rad),
            isRegion: false,
            isHub: TELEPORT_HUBS.has(k.id),
          };
        }
        regionAnchor[k.id] = regionId;
        placeChildren(k.id, regionId, depth + 1);
      });
    };
    regions.forEach((r) => placeChildren(r.id, r.id, 0));
  }

  // 各大區是否有傳送陣（區內任一節點為樞紐）
  const regionHasHub: Record<string, boolean> = {};
  for (const id in layout) {
    const rg = regionAnchor[id];
    if (layout[id].isHub) regionHasHub[rg] = true;
  }

  _layout = layout;
  _regionAnchor = regionAnchor;
  _regionHasHub = regionHasHub;
}

export function mapPoint(id: string): MapPoint | undefined {
  build();
  return _layout![id];
}
export function tierPoints(tier: string): MapPoint[] {
  build();
  return Object.values(_layout!).filter((p) => p.tier === tier);
}
export function regionAnchorOf(id: string): string | undefined {
  build();
  return _regionAnchor![id];
}
export function isTeleportHub(id: string): boolean {
  build();
  return !!_layout![id]?.isHub;
}
export function regionHasHub(regionId: string): boolean {
  build();
  return !!_regionHasHub![regionId];
}
export function landAdjacent(regionA: string, regionB: string): boolean {
  if (regionA === regionB) return true;
  return LAND_ADJ.has(pairKey(regionA, regionB));
}
export function distanceBetween(aId: string, bId: string): number {
  const a = mapPoint(aId);
  const b = mapPoint(bId);
  if (!a || !b) return Infinity;
  return Math.hypot(a.x - b.x, a.y - b.y);
}
