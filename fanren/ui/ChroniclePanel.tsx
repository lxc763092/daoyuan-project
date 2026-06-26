import React from 'react';
import type { FanrenWorldState } from '../types';
import type { PlayerStats } from '../../types';
import { SCHEDULED_EVENTS, spoilerBudget } from '../engine/daoyuanLoader';
import { factionTerritories } from '../engine/mapIntel';
import { allSectSites } from '../engine/sectSites';
import { allianceOf } from '../engine/alliances';
import { formatTime } from '../engine/clock';
import { canonRealmDisplay, getRealmIndex } from '../engine/realm';
import { CANON_REALMS } from '../data/realms';
import { initCensus, censusBreakdown, humanizeCount } from '../engine/census';
import { titleName } from '../engine/reputation';
import { ORIGINS, DAO_HEARTS } from '../data/creationOptions';

interface Props {
  world: FanrenWorldState;
  player: PlayerStats;
  onClose: () => void;
}

const section = 'rounded-xl border border-zinc-800 bg-zinc-900/60 p-3';
const h = 'mb-2 text-sm font-semibold text-amber-300';

/** 悟性／心性數值的品評。 */
function xingDesc(v: number, kind: 'wu' | 'xin'): string {
  if (kind === 'wu') return v >= 90 ? '一點就透' : v >= 75 ? '聰穎' : v >= 55 ? '尚可' : v >= 40 ? '尋常' : '駑鈍';
  return v >= 90 ? '古井不波' : v >= 75 ? '心如磐石' : v >= 55 ? '尚穩' : v >= 40 ? '尋常' : '心浮氣躁';
}

const ChroniclePanel: React.FC<Props> = ({ world, player, onClose }) => {
  const origin = ORIGINS.find((o) => o.id === world.originId);
  const dao = DAO_HEARTS.find((d) => d.id === world.daoHeartId);
  const budget = spoilerBudget(world.progressChapter);
  const importantMemories = world.memory.filter((m) => m.important).slice(-15);
  const diverged = SCHEDULED_EVENTS.filter((e) => world.worldEventStates[e.id]?.diverged);
  const fired = SCHEDULED_EVENTS.filter((e) => world.worldEventStates[e.id]?.fired && !world.worldEventStates[e.id]?.diverged);
  // 山雨欲來：大事件優先（節拍量大，最多帶 2 條近期者）
  const upcomingAll = SCHEDULED_EVENTS.filter(
    (e) => e.scheduledDay > world.clock.totalDays && e.spoilerLevel <= budget && !world.worldEventStates[e.id]?.fired
  );
  const upcoming = [
    ...upcomingAll.filter((e) => e.tier !== 'beat').slice(0, 4),
    ...upcomingAll.filter((e) => e.tier === 'beat').slice(0, 2),
  ].sort((a, b) => a.scheduledDay - b.scheduledDay).slice(0, 6);
  // 疊加各修仙門派的據點設施數，讓實質佔據洞天福地的宗門排名更高（修仙界由宗門主導）
  const siteBonus: Record<string, number> = {};
  for (const s of allSectSites()) siteBonus[s.sectName] = (siteBonus[s.sectName] || 0) + s.facilities.length;
  const territories = factionTerritories()
    .map((t) => ({ ...t, score: t.score + (siteBonus[t.name] || 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const maxTerr = territories[0]?.score || 1;
  const factionStatus = (name: string): string | undefined => (world.factionStates || {})[name]?.status;
  const gf = world.goldenFinger;
  const gfRt = world.goldenFingerRuntime;
  const mechanics = world.mechanics || [];
  const knownNpcs = Object.values(world.npcStates || {}).filter((n) => n.knownToPlayer);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-4 w-full max-w-3xl space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-300">📜 我的修仙史 · 天下大勢</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-amber-500">關閉</button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* 此身 */}
          <div className={section}>
            <div className={h}>此身來歷</div>
            <div className="space-y-1 text-sm text-zinc-300">
              <div><span className="text-zinc-500">道號：</span>{player.name}（{canonRealmDisplay(world, player.realm, player.realmLevel)}）</div>
              <div><span className="text-zinc-500">出身：</span>{origin?.name || '（未知）'}</div>
              <div><span className="text-zinc-500">道心：</span>{dao?.name || '（未定）'}</div>
              {world.reputation && (world.reputation.righteous > 0 || world.reputation.demonic > 0) && (
                <div><span className="text-zinc-500">名號：</span>{titleName(world.reputation)}<span className="text-[10px] text-zinc-600">（俠 {world.reputation.righteous}・魔 {world.reputation.demonic}）</span></div>
              )}
              <div><span className="text-zinc-500">壽元：</span>{Math.floor(player.lifespan)}/{player.maxLifespan} 年</div>
              <div>
                <span className="text-zinc-500">稟性：</span>
                悟性 <span className="text-[#9fdcc4]">{player.comprehension ?? 50}</span>
                <span className="text-[10px] text-zinc-600">（{xingDesc(player.comprehension ?? 50, 'wu')}）</span>
                <span className="mx-1 text-zinc-700">·</span>
                心性 <span className="text-[#9fdcc4]">{player.daoHeart ?? 50}</span>
                <span className="text-[10px] text-zinc-600">（{xingDesc(player.daoHeart ?? 50, 'xin')}）</span>
                {(player.agility ?? 0) > 0 && (
                  <>
                    <span className="mx-1 text-zinc-700">·</span>
                    速度 <span className="text-[#9fdcc4]">{player.agility}</span>
                    <span className="text-[10px] text-zinc-600">（旅行 ×{(1 + (player.agility ?? 0) / 100 * 2).toFixed(1)}・逃離）</span>
                  </>
                )}
              </div>
              {player.variantRoot && (
                <div><span className="text-zinc-500">異靈根：</span><span className="text-violet-300">{player.variantRoot.type}靈根</span><span className="text-[10px] text-zinc-600">（強度 {player.variantRoot.value}，較五行更純更利）</span></div>
              )}
              {(() => {
                const f = CANON_REALMS[getRealmIndex(world, player.realm)]?.features;
                if (!f) return null;
                const flags = [f.natalTreasure ? '本命法寶' : '', f.nascentSoul ? '元嬰' : '', f.lawRestricted ? '受天地法則限' : ''].filter(Boolean).join('・');
                return (
                  <div>
                    <span className="text-zinc-500">本境：</span>{f.trait}
                    <span className="text-[10px] text-zinc-600">（{f.flight}{flags ? `；${flags}` : ''}）</span>
                  </div>
                );
              })()}
              <div><span className="text-zinc-500">當世：</span>{formatTime(world.clock)}（進度約第{world.progressChapter}章）</div>
              {(() => {
                const census = world.census || initCensus(world.clock.totalDays);
                const bd = censusBreakdown(census).filter((x) => x.count > 0);
                return (
                  <div>
                    <span className="text-zinc-500">天下生靈：</span>{humanizeCount(census.total)}眾（境界越高越稀）
                    <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-zinc-500">
                      {bd.map((x) => (
                        <span key={x.name}>{x.name} {humanizeCount(x.count)}</span>
                      ))}
                    </div>
                  </div>
                );
              })()}
              {gf && gfRt && (
                <div><span className="text-zinc-500">金手指：</span>{gf.name}（{['一','二','三','四','五'][gf.powerTier - 1]}階；用 {gfRt.usesTotal} 次）</div>
              )}
              {world.bottleSpace && world.bottleSpace.herbs.length > 0 && (
                <div><span className="text-zinc-500">瓶中天地：</span>溫養靈植 {world.bottleSpace.herbs.length} 株{world.bottleSpace.lingZhiAwakened ? '・✦瓶靈已醒' : '（神識難窺）'}</div>
              )}
            </div>
          </div>

          {/* 改寫的命運 */}
          <div className={section}>
            <div className={h}>✦ 你改寫的命運（{diverged.length}）</div>
            {diverged.length === 0 ? (
              <div className="text-xs text-zinc-500">你尚未撼動正史的軌跡。世界仍依原貌流轉。</div>
            ) : (
              <div className="space-y-1 text-xs text-amber-200/90">
                {diverged.map((e) => (
                  <div key={e.id}>· {e.title}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 演繹異能 / 自創 */}
        {mechanics.length > 0 && (
          <div className={section}>
            <div className={h}>✦ 本命異能 / 自創（演繹引擎）　<span className="text-xs text-rose-300/70">業力 {Math.round(world.karma || 0)}</span></div>
            <div className="space-y-1.5 text-xs text-zinc-300">
              {mechanics.map((m) => (
                <div key={m.id} className="border-l-2 border-rose-700/50 pl-2">
                  <span className="font-semibold text-rose-200">{m.name}</span>
                  <span className="text-zinc-500"> · {m.category} · 第{m.powerTier}階 · {m.kind === 'art' ? '功法' : m.kind === 'recipe' ? '丹方' : '異能'}{m.source === 'llm' ? ' · AI演繹' : ''}</span>
                  <span className="text-zinc-400">　{m.summary}</span>
                  {m.usesTotal > 0 && <span className="text-zinc-600">（已施展 {m.usesTotal} 次）</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 時間線變局（蝴蝶效應） */}
        {(world.divergences || []).length > 0 && (
          <div className={section}>
            <div className={h}>🦋 時間線變局（蝴蝶效應）　<span className="text-xs text-zinc-500">{world.divergences.length} 樁</span></div>
            <div className="space-y-1.5 text-xs text-zinc-300">
              {world.divergences.slice(-8).reverse().map((d) => (
                <div key={d.id} className="border-l-2 border-rose-700/50 pl-2">
                  <div className="text-rose-200">
                    {d.cause}
                    {d.magnitude ? <span className="text-zinc-500"> · 震幅 {d.magnitude}</span> : null}
                  </div>
                  <div className="whitespace-pre-wrap text-zinc-400">{d.note}</div>
                  {d.affectedNpcIds && d.affectedNpcIds.length > 0 && <div className="text-[10px] text-zinc-600">牽連：{d.affectedNpcIds.join('、')}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 生平記事 */}
        <div className={section}>
          <div className={h}>生平記事（要事）</div>
          {importantMemories.length === 0 ? (
            <div className="text-xs text-zinc-500">仙途方啟，尚無要事入冊。</div>
          ) : (
            <div className="space-y-1 text-xs text-zinc-300">
              {importantMemories.map((m, i) => (
                <div key={i}>· 第{Math.floor(m.day / 360) + 1}年　{m.summary}</div>
              ))}
            </div>
          )}
        </div>

        {/* 天下大勢 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className={section}>
            <div className={h}>🌐 天下大勢</div>
            <div className="mb-2 text-xs text-zinc-400">已成正史（{fired.length}）：</div>
            <div className="mb-2 space-y-0.5 text-xs text-zinc-300">
              {fired.slice(-6).map((e) => <div key={e.id}>· {e.title}</div>)}
              {fired.length === 0 && <div className="text-zinc-500">天下暫無大事。</div>}
            </div>
            <div className="mb-1 text-xs text-zinc-400">山雨欲來：</div>
            <div className="space-y-0.5 text-xs text-amber-200/80">
              {upcoming.map((e) => <div key={e.id}>· 約第{Math.floor(e.scheduledDay / 360) + 1}年　{e.title}（{e.locationId}）</div>)}
              {upcoming.length === 0 && <div className="text-zinc-500">前路未明。</div>}
            </div>
          </div>

          <div className={section}>
            <div className={h}>勢力榜 <span className="text-xs text-zinc-500">（依地圖地盤）</span></div>
            <div className="space-y-1.5 text-xs text-zinc-300">
              {territories.map((t) => {
                const destroyed = factionStatus(t.name) === 'destroyed';
                return (
                  <div key={t.name}>
                    <div className="flex items-center gap-2">
                      <span className={`w-24 shrink-0 truncate ${destroyed ? 'text-zinc-600 line-through' : ''}`}>{t.name}</span>
                      {(() => { const al = allianceOf(t.name); return al && al !== t.name
                        ? <span className="shrink-0 rounded border border-indigo-700/50 px-1 text-[9px] text-indigo-300/80">{al}</span> : null; })()}
                      <span className="h-1.5 flex-1 overflow-hidden rounded bg-zinc-800">
                        <span className="block h-full bg-gradient-to-r from-amber-700 to-amber-400" style={{ width: `${Math.round((t.score / maxTerr) * 100)}%` }} />
                      </span>
                      <span className="w-10 text-right text-zinc-500">{t.locations.length}地</span>
                    </div>
                    <div className="pl-1 text-[10px] text-zinc-600">
                      {t.locations.slice(0, 4).join('、')}{t.locations.length > 4 ? '…' : ''}{destroyed ? '（已覆滅）' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
            {knownNpcs.length > 0 && (
              <div className="mt-2 border-t border-zinc-800 pt-2 text-xs text-zinc-400">
                相識：{knownNpcs.map((n) => n.id).slice(0, 10).join('、')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChroniclePanel;
