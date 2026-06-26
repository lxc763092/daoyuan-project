import React, { useMemo, useState } from 'react';
import { WORLD_MAP } from '../data/worldMap';
import type { WorldMapNode } from '../types';
import { useWorldStore } from '../worldStore';
import { usePlayer } from '../../store/gameStore';
import { mapPoint, tierPoints } from '../engine/mapLayout';
import { findMapNode } from '../engine/mapIntel';
import { planTravel, humanizeDays } from '../engine/travel';
import { gateOf } from '../engine/mapGate';
import { lingMaiOf } from '../engine/lingMai';
import { sectSiteOf } from '../engine/sectSites';
import { initialDiscoveries } from '../engine/mapDiscovery';

interface Props {
  onClose: () => void;
  onTravel: (name: string) => void;
}

const ROOT_IDS = new Set(['renJie', 'lingJie', 'moJie', 'xianJie']);

const TIERS: { t: WorldMapNode['tier']; label: string; unlock: number }[] = [
  { t: 'human', label: '人界', unlock: 0 },
  { t: 'spirit', label: '靈界', unlock: 1180 },
  { t: 'demon', label: '魔界', unlock: 1900 },
  { t: 'immortal', label: '仙界', unlock: 2350 },
];

const MODE_BADGE: Record<string, { label: string; cls: string }> = {
  here: { label: '所在地', cls: 'border-amber-500/50 text-amber-200' },
  walk: { label: '步行', cls: 'border-emerald-600/50 text-emerald-200' },
  fly: { label: '御劍飛渡', cls: 'border-sky-500/50 text-sky-200' },
  teleport: { label: '傳送陣', cls: 'border-cyan-400/50 text-cyan-200' },
  blocked: { label: '暫不可達', cls: 'border-rose-600/50 text-rose-300' },
  unknown: { label: '未明', cls: 'border-zinc-600/50 text-zinc-300' },
};

// 清單分組（依可達方式）
const LIST_GROUPS: { key: string; label: string; accent: string }[] = [
  { key: 'walk', label: '步行可達', accent: 'text-emerald-300' },
  { key: 'fly', label: '御劍飛渡', accent: 'text-sky-300' },
  { key: 'teleport', label: '傳送陣可達', accent: 'text-cyan-300' },
  { key: 'blocked', label: '暫不可達（待御劍飛渡或另尋傳送之機）', accent: 'text-rose-300/80' },
];

const WorldMapView: React.FC<Props> = ({ onClose, onTravel }) => {
  const world = useWorldStore((s) => s.world);
  const busy = useWorldStore((s) => s.busy);
  const player = usePlayer();
  const progress = world.progressChapter;
  const [tier, setTier] = useState<WorldMapNode['tier']>('human');
  const [sel, setSel] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');

  const hereNode = findMapNode(world.currentLocationId);
  const hereId = hereNode?.id;
  const tierLocked = (TIERS.find((x) => x.t === tier)?.unlock || 0) > progress;

  // 已探明地點（霧中探明）：隨移動擴展；舊存檔以起點周邊播種
  const known = useMemo(() => {
    const base = world.discoveredLocationIds && world.discoveredLocationIds.length ? world.discoveredLocationIds : initialDiscoveries(world.currentLocationId);
    const s = new Set(base);
    if (hereId) {
      s.add(hereId);
      // 所在地的直屬子地點恆可見（藥園/丹房/子峰/島嶼…），免新增子地點需重新抵達方顯
      for (const n of WORLD_MAP) if (n.parentId === hereId) s.add(n.id);
    }
    return s;
  }, [world.discoveredLocationIds, world.currentLocationId, hereId]);

  // 劇情閘情境（進度章/背包/世界旗標）→ 過濾「尚未開放」「隱匿未尋得」之地
  const gateCtx = useMemo(() => ({
    progressChapter: world.progressChapter,
    inventoryNames: player?.inventory?.map((i) => i.name) || [],
    flags: world.flags,
  }), [world.progressChapter, player?.inventory, world.flags]);
  const visible = useMemo(() => {
    const m: Record<string, boolean> = {};
    for (const n of WORLD_MAP) m[n.id] = gateOf(n, gateCtx).visible;
    return m;
  }, [gateCtx]);

  const isShown = (id: string) => visible[id] !== false || id === hereId; // 所在地恆顯
  const tierTotal = useMemo(() => tierPoints(tier).filter((p) => p.name && !ROOT_IDS.has(p.id) && isShown(p.id)).length, [tier, visible, hereId]);
  const points = useMemo(() => tierPoints(tier).filter((p) => p.name && !ROOT_IDS.has(p.id) && known.has(p.id) && isShown(p.id)), [tier, known, visible, hereId]);

  // 步行連結線（鄰接）
  const walkLines = useMemo(() => {
    const seen = new Set<string>();
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (const n of WORLD_MAP) {
      if (n.tier !== tier || !n.connections || !known.has(n.id) || visible[n.id] === false) continue;
      const a = mapPoint(n.id);
      if (!a) continue;
      for (const c of n.connections) {
        const b = mapPoint(c);
        if (!b || b.tier !== tier || !known.has(b.id) || visible[b.id] === false) continue;
        const key = [n.id, c].sort().join('_');
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      }
    }
    return out;
  }, [tier, known]);

  // 傳送陣連結（樞紐兩兩相連）
  const hubLines = useMemo(() => {
    const hubs = points.filter((p) => p.isHub);
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < hubs.length; i++)
      for (let j = i + 1; j < hubs.length; j++) out.push({ x1: hubs[i].x, y1: hubs[i].y, x2: hubs[j].x, y2: hubs[j].y });
    return out;
  }, [points]);

  // 由當前位置出發，對本界各地計算路線，依可達方式分組
  const grouped = useMemo(() => {
    const g: Record<string, { id: string; name: string; isRegion: boolean; plan: ReturnType<typeof planTravel> }[]> = {};
    if (!hereId || !player) return g;
    const realm = (player.realm as string) || '炼气期';
    const stones = player.spiritStones || 0;
    for (const p of points) {
      if (p.id === hereId) continue;
      const plan = planTravel(hereId, p.id, realm, stones);
      if (plan.mode === 'here' || plan.mode === 'unknown') continue;
      (g[plan.mode] = g[plan.mode] || []).push({ id: p.id, name: p.name, isRegion: p.isRegion, plan });
    }
    (g.walk || []).sort((a, b) => a.plan.days - b.plan.days);
    (g.fly || []).sort((a, b) => a.plan.days - b.plan.days);
    (g.teleport || []).sort((a, b) => a.plan.spiritStoneCost - b.plan.spiritStoneCost);
    (g.blocked || []).sort((a, b) => a.plan.distance - b.plan.distance);
    return g;
  }, [points, hereId, player]);
  const reachableCount = (grouped.walk?.length || 0) + (grouped.fly?.length || 0) + (grouped.teleport?.length || 0);

  const selNode = sel ? WORLD_MAP.find((n) => n.id === sel) : null;
  const plan = useMemo(() => {
    if (!sel || !hereId || !player) return null;
    return planTravel(hereId, sel, (player.realm as string) || '炼气期', player.spiritStones || 0);
  }, [sel, hereId, player]);

  const canGo = plan && player && !busy && !tierLocked && plan.mode !== 'here' && plan.mode !== 'blocked' && plan.feasible;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-3" onClick={onClose}>
      <div className="my-3 w-full max-w-4xl rounded-2xl border border-[#3f5a50]/50 bg-zinc-950 p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="brand-serif text-base font-bold text-[#9fdcc4] sm:text-lg">
            🗺️ 凡人修仙界・輿圖 <span className="text-xs text-zinc-500">（已探明 {points.length}/{tierTotal}）</span>
          </h2>
          <div className="flex items-center gap-1.5">
            <div className="flex overflow-hidden rounded-lg border border-zinc-700 text-xs">
              <button onClick={() => setView('map')} className={`px-2.5 py-1 transition ${view === 'map' ? 'bg-emerald-500/20 text-[#9fdcc4]' : 'text-zinc-400 hover:text-zinc-200'}`}>🗺️ 地圖</button>
              <button onClick={() => setView('list')} className={`border-l border-zinc-700 px-2.5 py-1 transition ${view === 'list' ? 'bg-emerald-500/20 text-[#9fdcc4]' : 'text-zinc-400 hover:text-zinc-200'}`}>☰ 清單</button>
            </div>
            <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-[#74b69b]">關閉</button>
          </div>
        </div>

        <div className="mb-2 flex flex-wrap gap-1.5">
          {TIERS.map((x) => {
            const locked = x.unlock > progress;
            return (
              <button
                key={x.t}
                onClick={() => { setTier(x.t); setSel(null); }}
                className={`rounded-lg border px-3 py-1 text-sm transition ${tier === x.t ? 'border-[#74b69b] bg-emerald-500/15 text-[#9fdcc4]' : 'border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-[#4f8f78]'}`}
              >
                {x.label} {locked ? '🔒' : ''}
              </button>
            );
          })}
          <span className="ml-auto flex items-center gap-3 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-sm bg-emerald-600/60" />陸路</span>
            <span className="flex items-center gap-1"><span className="inline-block h-0 w-3 border-t border-dashed border-cyan-400/70" />傳送陣</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full ring-2 ring-amber-400" />所在</span>
          </span>
        </div>

        {tierLocked ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center text-sm text-zinc-500">
            此界域非你目前修為與見識所能觸及——待境界精進、足跡漸遠，方能窺其全貌。
          </div>
        ) : points.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center text-sm text-zinc-500">
            此界尚未探明——你足跡未及之處，輿圖一片混沌。循路前行、四處查探，地圖將隨你的足跡逐步展開。
          </div>
        ) : view === 'map' ? (
          <div className="relative w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0b0f0d]">
            <svg viewBox="0 0 1000 1000" className="block w-full" style={{ aspectRatio: '1 / 1', maxHeight: '62vh' }}>
              <defs>
                <radialGradient id="mapglow" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#13312a" />
                  <stop offset="100%" stopColor="#0a0d0c" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="1000" height="1000" fill="url(#mapglow)" />

              {/* 傳送陣連結 */}
              {hubLines.map((l, i) => (
                <line key={`h${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#22d3ee" strokeOpacity={0.28} strokeWidth={1.4} strokeDasharray="7 7" />
              ))}
              {/* 陸路連結 */}
              {walkLines.map((l, i) => (
                <line key={`w${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#3f8f6f" strokeOpacity={0.35} strokeWidth={1.6} />
              ))}

              {/* 節點 */}
              {points.map((p) => {
                const isHere = p.id === hereId;
                const isSel = p.id === sel;
                const r = p.isRegion ? 9 : 5;
                return (
                  <g key={p.id} transform={`translate(${p.x},${p.y})`} style={{ cursor: 'pointer' }} onClick={() => setSel(p.id)}>
                    {isHere && <circle r={r + 6} fill="none" stroke="#fbbf24" strokeWidth={2}><animate attributeName="r" values={`${r + 4};${r + 9};${r + 4}`} dur="2.2s" repeatCount="indefinite" /></circle>}
                    {isSel && !isHere && <circle r={r + 5} fill="none" stroke="#9fdcc4" strokeWidth={2} />}
                    <circle
                      r={r}
                      fill={isHere ? '#fbbf24' : p.isRegion ? '#6ee7b7' : p.isHub ? '#67e8f9' : '#a8a29e'}
                      fillOpacity={p.isRegion ? 0.95 : 0.85}
                      stroke="#0b0f0d"
                      strokeWidth={1.5}
                    />
                    {p.isHub && <circle r={r + 2.5} fill="none" stroke="#22d3ee" strokeOpacity={0.8} strokeWidth={1} />}
                    {(p.isRegion || isSel || isHere) && (
                      <text x={0} y={-r - 5} textAnchor="middle" fontSize={p.isRegion ? 19 : 16} fontWeight={p.isRegion ? 700 : 500} fill={isHere ? '#fde68a' : p.isRegion ? '#d1fae5' : '#e7e5e4'} stroke="#0b0f0d" strokeWidth={0.6} paintOrder="stroke">
                        {p.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          <div className="max-h-[62vh] space-y-3 overflow-y-auto pr-1">
            <div className="text-[11px] text-zinc-500">由你當前位置出發 · 本界可達 {reachableCount} 處 · 你有靈石 {player?.spiritStones ?? 0}</div>
            {LIST_GROUPS.map((grp) => {
              const items = grouped[grp.key] || [];
              if (!items.length) return null;
              return (
                <div key={grp.key}>
                  <div className={`mb-1 text-xs font-semibold ${grp.accent}`}>{grp.label}（{items.length}）</div>
                  <div className="space-y-1">
                    {items.map(({ id, name, isRegion, plan: pl }) => {
                      const go = !busy && !tierLocked && pl.feasible && pl.mode !== 'blocked';
                      return (
                        <div key={id} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5">
                          <span className={`shrink-0 rounded border px-1 text-[10px] ${MODE_BADGE[pl.mode]?.cls || ''}`}>{MODE_BADGE[pl.mode]?.label}</span>
                          <span className="text-sm text-zinc-200">{name}</span>
                          {isRegion && <span className="text-[10px] text-zinc-600">大區</span>}
                          {pl.mode !== 'blocked' && <span className="text-xs text-zinc-500">{humanizeDays(pl.days)}</span>}
                          {pl.spiritStoneCost > 0 && (
                            <span className={`text-xs ${pl.feasible ? 'text-cyan-300/80' : 'text-rose-300/80'}`}>靈石{pl.spiritStoneCost}</span>
                          )}
                          <button
                            disabled={!go}
                            onClick={() => { onTravel(name); onClose(); }}
                            className="ml-auto shrink-0 rounded border border-[#4f8f78] bg-emerald-950/40 px-2 py-0.5 text-[11px] text-[#9fdcc4] transition hover:border-[#74b69b] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            前往
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {reachableCount === 0 && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-center text-xs text-zinc-500">
                以你當前所在與修為，暫無可前往之地——試著動用傳送陣前往大區樞紐，或精進修為以御劍飛渡。
              </div>
            )}
          </div>
        )}

        {/* 旅程規劃面板（地圖模式） */}
        {view === 'map' && selNode && plan && (
          <div className="mt-2 rounded-xl border border-[#3f5a50]/50 bg-zinc-900/70 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[#9fdcc4]">{selNode.name}</span>
              <span className={`rounded border px-1.5 py-0.5 text-[11px] ${MODE_BADGE[plan.mode]?.cls || ''}`}>{MODE_BADGE[plan.mode]?.label}</span>
              {plan.mode !== 'here' && plan.mode !== 'blocked' && (
                <span className="text-xs text-zinc-400">耗時 {humanizeDays(plan.days)}（{plan.days}日）</span>
              )}
              {plan.spiritStoneCost > 0 && <span className="text-xs text-cyan-300/80">靈石 {plan.spiritStoneCost}</span>}
              {plan.distance > 0 && <span className="text-[11px] text-zinc-600">圖距 {Math.round(plan.distance)}</span>}
              <button
                disabled={!canGo}
                onClick={() => { onTravel(selNode.name); onClose(); }}
                className="ml-auto rounded-lg border border-[#4f8f78] bg-emerald-950/40 px-3 py-1 text-xs text-[#9fdcc4] transition hover:border-[#74b69b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {plan.mode === 'teleport' ? '啟陣傳送' : plan.mode === 'fly' ? '御劍飛渡' : '前往'}
              </button>
            </div>
            <div className="mt-1.5 text-xs text-zinc-400">{plan.reason}</div>
            {(() => { const lm = lingMaiOf(selNode.id); return (
              <div className={`mt-1 text-[11px] ${lm.grade <= 1 ? 'text-zinc-500' : lm.grade <= 4 ? 'text-emerald-300/80' : 'text-amber-300/90'}`}>⛰ 靈脈：{lm.name}（閉關效率 ×{lm.mult}）</div>
            ); })()}
            {selNode.description && <div className="mt-1 text-[11px] text-zinc-500">{selNode.description}</div>}
            {selNode.factions && selNode.factions.length > 0 && (
              <div className="mt-1 text-[11px] text-zinc-600">勢力：{selNode.factions.slice(0, 5).join('、')}</div>
            )}
            {(() => {
              const site = sectSiteOf(selNode.id);
              if (!site || site.facilities.length === 0) return null;
              const gefa = site.facilities.find((f) => f.kind === '功法閣' && f.techniques && f.techniques.length > 0);
              return (
                <>
                  <div className="mt-1 text-[11px] text-cyan-300/70">
                    {site.sectName}據點設施：{site.facilities.map((f) => f.name).join('、')}
                  </div>
                  {gefa ? (
                    <div className="mt-0.5 text-[10px] text-amber-300/70">📜 {gefa.name}傳承：{gefa.techniques!.join('、')}</div>
                  ) : null}
                </>
              );
            })()}
          </div>
        )}
        {view === 'map' && !selNode && (
          <div className="mt-2 text-center text-xs text-zinc-500">點選地圖上的地點查看路線；或切換「☰ 清單」一覽所有可達之地。</div>
        )}
      </div>
    </div>
  );
};

export default WorldMapView;
