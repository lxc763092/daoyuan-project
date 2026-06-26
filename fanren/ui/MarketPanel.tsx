import React, { useMemo, useState } from 'react';
import type { FanrenWorldState } from '../types';
import type { PlayerStats } from '../../types';
import { useWorldStore } from '../worldStore';
import { guildGoods, auctionLots, bidOutcome, barterOffer, sellPriceOf, TradeItem } from '../engine/trade';

interface Props {
  world: FanrenWorldState;
  player: PlayerStats;
  busy: boolean;
  onClose: () => void;
}

const VENUES = [
  { key: 'guild', label: '商會交易' },
  { key: 'stall', label: '坊市擺攤' },
  { key: 'auction', label: '拍賣會' },
  { key: 'barter', label: '交換會' },
] as const;

function kindToType(kind: string): string {
  if (kind === '丹药') return '丹药';
  if (kind === '灵植') return '草药';
  if (kind === '材料') return '材料';
  return '法宝';
}

const MarketPanel: React.FC<Props> = ({ world, player, busy, onClose }) => {
  const applyTrade = useWorldStore((s) => s.applyTrade);
  const [tab, setTab] = useState<(typeof VENUES)[number]['key']>('guild');
  const [bids, setBids] = useState<Record<number, number>>({});
  const [barterSel, setBarterSel] = useState('');

  const hasGuild = (world.organizations || []).some((o) => ['商團', '商會', '拍賣行', '坊市', '丹閣'].includes(o.type));
  const goods = useMemo(() => guildGoods(player.realm, hasGuild), [player.realm, hasGuild]);
  const lots = useMemo(() => auctionLots(world.clock.totalDays), [world.clock.totalDays]);
  const stones = player.spiritStones;

  const buy = (it: TradeItem, price: number) => {
    if (busy || stones < price) return;
    applyTrade({ stoneDelta: -price, addItem: { name: it.name, type: kindToType(it._kind), rarity: it._rarity, description: it.effect, quantity: 1 }, log: `你於商會購得「${it.name}」（耗靈石 ${price}）。` });
  };
  const sell = (name: string, rarity: string) => {
    if (busy) return;
    const price = sellPriceOf(rarity);
    applyTrade({ stoneDelta: price, removeName: name, removeQty: 1, log: `你在坊市擺攤售出「${name}」，得靈石 ${price}。` });
  };
  const bid = (i: number, lot: { item: TradeItem; estimate: number }) => {
    const b = bids[i] || 0;
    if (busy || b <= 0 || b > stones) return;
    const out = bidOutcome(b, lot.estimate, Math.random());
    if (out.win) applyTrade({ stoneDelta: -b, addItem: { name: lot.item.name, type: kindToType(lot.item._kind), rarity: lot.item._rarity, description: lot.item.effect, quantity: 1 }, log: `✦ 拍賣會上你力壓群雄，以靈石 ${b} 拍得「${lot.item.name}」！`, logType: 'special' });
    else applyTrade({ log: `「${lot.item.name}」被人以靈石 ${out.rivalBid} 抬價奪走——你的 ${b} 終究低了一頭。`, logType: 'danger' });
  };
  const barter = () => {
    if (busy || !barterSel) return;
    const inv = player.inventory.find((x) => x.name === barterSel);
    if (!inv) return;
    const offered = barterOffer(canonItemValueFromRarity(String(inv.rarity)), player.realm, Math.random());
    if (!offered) { applyTrade({ log: '交換會上一時無人有相稱之物可與你互換。', logType: 'normal' }); return; }
    applyTrade({ removeName: barterSel, removeQty: 1, addItem: { name: offered.name, type: kindToType(offered._kind), rarity: offered._rarity, description: offered.effect, quantity: 1 }, log: `你以「${barterSel}」於交換會換得「${offered.name}」（以物易物，未動靈石）。`, logType: 'gain' });
    setBarterSel('');
  };

  const sellable = player.inventory.filter((i) => i.quantity > 0).slice(0, 60);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-4 w-full max-w-2xl space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="brand-serif text-xl font-bold text-[#9fdcc4]">💰 坊市・交易 <span className="text-xs text-zinc-500">靈石 {stones}</span></h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-[#74b69b]">關閉</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {VENUES.map((v) => (
            <button key={v.key} onClick={() => setTab(v.key)} className={`rounded-lg border px-3 py-1 text-sm transition ${tab === v.key ? 'border-[#74b69b] bg-emerald-500/15 text-[#9fdcc4]' : 'border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-[#4f8f78]'}`}>{v.label}</button>
          ))}
        </div>

        <div className="max-h-[62vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          {tab === 'guild' && (
            <div className="space-y-1">
              <div className="mb-1 text-[11px] text-zinc-500">商會以市價售丹藥、材料、靈植、符籙{hasGuild ? '（你名下有商號，享 12% 折扣）' : ''}。</div>
              {goods.map(({ item, price }) => (
                <div key={item.id} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-1.5">
                  <span className="text-sm text-zinc-200">{item.name}</span>
                  <span className="text-[10px] text-zinc-600">{item._kind}·{item._rarity}</span>
                  <span className="truncate text-[10px] text-zinc-600">{item.effect}</span>
                  <span className="ml-auto text-xs text-amber-300/80">靈石 {price}</span>
                  <button disabled={busy || stones < price} onClick={() => buy(item, price)} className="shrink-0 rounded border border-[#4f8f78] px-2 py-0.5 text-[11px] text-[#9fdcc4] disabled:opacity-40">購買</button>
                </div>
              ))}
            </div>
          )}
          {tab === 'stall' && (
            <div className="space-y-1">
              <div className="mb-1 text-[11px] text-zinc-500">在坊市擺攤變賣背包之物，換取靈石（約市價半數）。</div>
              {sellable.length === 0 && <div className="text-xs text-zinc-600">背包空空，無物可賣。</div>}
              {sellable.map((i) => (
                <div key={i.id} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-1.5">
                  <span className="text-sm text-zinc-200">{i.name}</span>
                  <span className="text-[10px] text-zinc-600">{String(i.type)}·{String(i.rarity)}·×{i.quantity}</span>
                  <span className="ml-auto text-xs text-amber-300/80">售 {sellPriceOf(String(i.rarity))}</span>
                  <button disabled={busy} onClick={() => sell(i.name, String(i.rarity))} className="shrink-0 rounded border border-amber-700/60 px-2 py-0.5 text-[11px] text-amber-200 disabled:opacity-40">賣出</button>
                </div>
              ))}
            </div>
          )}
          {tab === 'auction' && (
            <div className="space-y-1.5">
              <div className="mb-1 text-[11px] text-zinc-500">拍賣會半年一輪，珍稀之物在此競價——出價需足，否則為人抬價奪走。</div>
              {lots.map((lot, i) => (
                <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-rose-200">{lot.item.name}</span>
                    <span className="text-[10px] text-zinc-600">{lot.item._kind}·{lot.item._rarity}</span>
                    <span className="ml-auto text-[10px] text-zinc-500">估價 ~{lot.estimate} · 起標 {lot.startBid}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">{lot.item.effect}</div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <input type="number" min={lot.startBid} value={bids[i] ?? lot.startBid} onChange={(e) => setBids({ ...bids, [i]: Number(e.target.value) || 0 })} className="w-24 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs" />
                    <button disabled={busy || (bids[i] ?? lot.startBid) > stones} onClick={() => bid(i, lot)} className="rounded border border-rose-700/60 bg-rose-950/30 px-2 py-0.5 text-[11px] text-rose-200 disabled:opacity-40">競標</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'barter' && (
            <div className="space-y-2">
              <div className="text-[11px] text-zinc-500">交換會以物易物、不動靈石——適合靈石拮据時換取所需。</div>
              <select value={barterSel} onChange={(e) => setBarterSel(e.target.value)} className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-sm text-zinc-300">
                <option value="">擇背包一物，換取相稱之物…</option>
                {sellable.map((i) => <option key={i.id} value={i.name}>{i.name}（{String(i.rarity)}·×{i.quantity}）</option>)}
              </select>
              <button disabled={busy || !barterSel} onClick={barter} className="w-full rounded-lg border border-[#4f8f78] bg-emerald-950/40 py-1.5 text-xs text-[#9fdcc4] disabled:opacity-40">以此物參與交換</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function canonItemValueFromRarity(rarity: string): number {
  const m: Record<string, number> = { 普通: 10, 精良: 25, 稀有: 90, 传说: 500, 仙品: 3000, 神品: 6000 };
  return m[rarity] || 10;
}

export default MarketPanel;
