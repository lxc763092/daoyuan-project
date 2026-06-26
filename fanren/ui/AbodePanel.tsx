import React, { useState } from 'react';
import type { FanrenWorldState } from '../types';
import type { PlayerStats } from '../../types';
import { ABODES } from '../data/abodes';
import { useWorldStore } from '../worldStore';
import { canEstablishAbodeHere } from '../engine/abode';
import { lingMaiOf } from '../engine/lingMai';

interface Props {
  world: FanrenWorldState;
  player: PlayerStats;
  busy: boolean;
  onClose: () => void;
}

const section = 'rounded-xl border border-zinc-800 bg-zinc-900/60 p-3';
const h = 'mb-2 text-sm font-semibold text-[#9fdcc4]';
const KIND_TAG: Record<string, string> = { 坊市: 'text-sky-300', 城內: 'text-amber-300', 宗門: 'text-violet-300', 野外: 'text-emerald-300', 秘境福地: 'text-rose-300' };

const AbodePanel: React.FC<Props> = ({ world, player, busy, onClose }) => {
  const acquireAbode = useWorldStore((s) => s.acquireAbode);
  const plantHerb = useWorldStore((s) => s.plantHerb);
  const harvestGarden = useWorldStore((s) => s.harvestGarden);
  const [seedSel, setSeedSel] = useState('');
  const abode = world.abode;
  const garden = world.garden || [];
  const day = world.clock.totalDays;
  const hereLm = lingMaiOf(world.currentLocationId);
  const herbsInBag = player.inventory.filter((i) => String(i.type).includes('草') || String(i.type) === '草药' || String(i.type) === '材料');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-4 w-full max-w-2xl space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="brand-serif text-xl font-bold text-[#9fdcc4]">🏔️ 洞府・安身之所</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-[#74b69b]">關閉</button>
        </div>

        {/* 現有洞府 + 藥園 */}
        {abode ? (
          <div className={section}>
            <div className={h}>當前洞府：{abode.name}　<span className="text-xs text-zinc-500">聚靈陣 +{Math.round(abode.spiritArray * 100)}% · 藥園 {garden.length}/{abode.herbPlots} · 禁制 {abode.wardLevel} 級{abode.rented ? ' · 租' : ''}</span></div>
            <div className="text-[11px] text-zinc-500">位於「{abode.locationName || '未知'}」{abode.protected ? '（勢力庇護）' : '（野外無庇護）'} · 洞府不可移動。閉關修煉時自動享聚靈陣加成，藏身禁制可避耳目。</div>
            {/* 藥園 */}
            <div className="mt-2 border-t border-zinc-800 pt-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-zinc-400">藥園靈田</span>
                <button disabled={busy || !garden.some((g) => g.matureDay <= day)} onClick={() => harvestGarden()} className="rounded border border-emerald-700/60 px-2 py-0.5 text-[11px] text-emerald-200 disabled:opacity-40">收成熟藥</button>
              </div>
              {garden.length > 0 ? (
                <div className="space-y-0.5 text-[11px] text-zinc-400">
                  {garden.map((g, i) => (
                    <div key={i}>· {g.herb}　{g.matureDay <= day ? <span className="text-emerald-300">已成熟，可收</span> : `約 ${Math.max(1, Math.round((g.matureDay - day) / 30))} 月後熟`}</div>
                  ))}
                </div>
              ) : (
                <div className="text-[11px] text-zinc-600">藥園空置。自背包擇一靈藥種下，借聚靈陣溫養增其品質。</div>
              )}
              {garden.length < abode.herbPlots && (
                <div className="mt-1.5 flex gap-1.5">
                  <select value={seedSel} onChange={(e) => setSeedSel(e.target.value)} className="flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                    <option value="">選擇背包靈藥作種苗…</option>
                    {herbsInBag.map((i) => <option key={i.id} value={i.name}>{i.name}（×{i.quantity}）</option>)}
                  </select>
                  <button disabled={busy || !seedSel} onClick={() => { plantHerb(seedSel); setSeedSel(''); }} className="rounded border border-[#4f8f78] px-2 py-1 text-xs text-[#9fdcc4] disabled:opacity-40">種下</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={section}><div className="text-xs text-zinc-500">你尚無洞府，居無定所、修煉效率低下。擇一安身之所，方能潛心精進。</div></div>
        )}

        {/* 可取得洞府 */}
        <div className={section}>
          <div className={h}>於此地開闢洞府（靈石 {player.spiritStones}）</div>
          <div className="mb-2 text-[11px] text-zinc-500">
            當前所在：<span className="text-zinc-300">{hereLm.name}</span>。洞府須建於有靈氣之處、且類型與地相符；勢力範圍內須納租／庇護費，野外則無人庇護。洞府一次只能有一個、且不可移動。
          </div>
          <div className="space-y-1.5">
            {ABODES.map((a) => {
              const owned = abode?.id === a.id;
              const cost = a.rentPerYear ?? a.costStones;
              const est = canEstablishAbodeHere(world, a);
              const blocked = !owned && !est.ok;
              return (
                <div key={a.id} className={`rounded-lg border px-2.5 py-1.5 ${blocked ? 'border-zinc-900 bg-zinc-900/20 opacity-60' : 'border-zinc-800 bg-zinc-900/40'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-200">{a.name}</span>
                    <span className={`rounded border border-zinc-700 px-1 text-[10px] ${KIND_TAG[a.locationKind] || ''}`}>{a.locationKind}</span>
                    <span className="text-[10px] text-zinc-500">聚靈+{Math.round(a.spiritArray * 100)}% · 藥園{a.herbPlots} · 禁制{a.wardLevel}</span>
                    <span className="ml-auto text-xs text-amber-300/80">{a.costStones === 0 && !a.rentPerYear ? (a.identityReq || '身分') : `靈石 ${cost}${a.rentPerYear ? '/年' : ''}`}</span>
                    <button
                      disabled={busy || owned || blocked}
                      title={blocked ? est.reason : ''}
                      onClick={() => acquireAbode(a.id)}
                      className="shrink-0 rounded border border-[#4f8f78] bg-emerald-950/40 px-2 py-0.5 text-[11px] text-[#9fdcc4] transition hover:border-[#74b69b] disabled:opacity-40"
                    >
                      {owned ? '現居' : blocked ? '此地不可' : a.rentPerYear ? '租賃' : a.costStones === 0 ? '入主' : '開闢'}
                    </button>
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">{a.desc}{a.identityReq ? `（需${a.identityReq}）` : ''}{a.realmReq ? `（適 ${a.realmReq}+）` : ''}</div>
                  {blocked && <div className="mt-0.5 text-[10px] text-rose-300/70">✗ {est.reason}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbodePanel;
