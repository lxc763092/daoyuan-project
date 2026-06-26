import React, { useMemo, useState } from 'react';
import type { FanrenWorldState } from '../types';
import { TECHNIQUES } from '../data/techniques';
import { CANON_ITEMS } from '../data/canonItems';
import { NAMED_BEASTS } from '../data/beasts';
import { TECH_NAME_SPACE, ITEM_NAME_SPACE } from '../data/genBanks';
import { BEAST_NAME_SPACE } from '../data/beastBanks';
import { techniqueForSeed, itemForSeed, beastForSeed, npcForSeed } from '../engine/procGen';
import { initCensus, humanizeCount } from '../engine/census';
import { allSects } from '../engine/sect';
import { sectHomeName } from '../engine/sectRitual';
import { lingMaiOf } from '../engine/lingMai';
import { WORLD_MAP } from '../data/worldMap';
import { CANON_REALMS } from '../data/realms';

// 統整：宗門與地點圖鑑（把 200+ 門派與 1400+ 地點納入萬物譜）
const ALL_SECTS = allSects();
const PLACES = WORLD_MAP;
const NODE_NAME: Record<string, string> = {};
for (const n of WORLD_MAP) NODE_NAME[n.id] = n.name;
const TIER_LABEL: Record<string, string> = { human: '人界', spirit: '靈界', demon: '魔界', immortal: '仙界' };
const CAT_COLOR: Record<string, string> = { 武林門派: 'text-sky-300', 修仙宗門: 'text-emerald-300', 魔道宗門: 'text-rose-300' };

interface Props {
  world: FanrenWorldState;
  onClose: () => void;
}

type TabKey = 'tech' | 'item' | 'beast' | 'npc' | 'sect' | 'place' | 'realm';
const PER_PAGE = 24;

// 可瀏覽「種數」= 目標規模（真實組合空間遠大於此，見標頭）
const TABS: { key: TabKey; label: string; total: number; space: number }[] = [
  { key: 'realm', label: '境界', total: CANON_REALMS.length, space: 0 },
  { key: 'sect', label: '宗門勢力', total: ALL_SECTS.length, space: 0 },
  { key: 'place', label: '地點', total: PLACES.length, space: 0 },
  { key: 'tech', label: '功法', total: 5000, space: TECH_NAME_SPACE },
  { key: 'item', label: '物品', total: 100000, space: ITEM_NAME_SPACE },
  { key: 'beast', label: '野獸', total: 5000, space: BEAST_NAME_SPACE },
  { key: 'npc', label: '人物名錄', total: 500000, space: 0 },
];

const RAR_COLOR: Record<string, string> = { 普通: 'text-zinc-400', 精良: 'text-emerald-300', 稀有: 'text-sky-300', 优良: 'text-emerald-300', 優良: 'text-emerald-300', 传说: 'text-amber-300', 傳說: 'text-amber-300', 史詩: 'text-fuchsia-300', 仙品: 'text-rose-300', 神品: 'text-rose-400' };

const CodexPanel: React.FC<Props> = ({ world, onClose }) => {
  const [tab, setTab] = useState<TabKey>('sect');
  const [page, setPage] = useState(0);
  const cur = TABS.find((t) => t.key === tab)!;
  const maxPage = Math.ceil(cur.total / PER_PAGE) - 1;
  const census = world.census || initCensus(world.clock.totalDays);

  const rows = useMemo(() => {
    const start = page * PER_PAGE;
    const out: React.ReactNode[] = [];
    for (let k = 0; k < PER_PAGE; k++) {
      const i = start + k;
      if (i >= cur.total) break;
      out.push(<EntryRow key={i} tab={tab} index={i} />);
    }
    return out;
  }, [tab, page, cur.total]);

  const switchTab = (k: TabKey) => { setTab(k); setPage(0); };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-4 w-full max-w-3xl space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="brand-serif text-xl font-bold text-[#9fdcc4]">📖 萬物譜・天地圖鑑</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-[#74b69b]">關閉</button>
        </div>

        {/* 規模標頭 */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          <Stat label="宗門勢力" value={`${ALL_SECTS.length} 門`} sub="可投修仙/魔道" />
          <Stat label="天地輿圖" value={`${PLACES.length} 處`} sub="含靈脈/秘境" />
          <Stat label="功法" value="5,000+" sub={`組合 ${humanizeCount(TECH_NAME_SPACE)}`} />
          <Stat label="物品" value="100,000+" sub={`組合 ${humanizeCount(ITEM_NAME_SPACE)}`} />
          <Stat label="野獸" value="5,000+" sub={`組合 ${humanizeCount(BEAST_NAME_SPACE)}`} />
          <Stat label="天下生靈" value={`${humanizeCount(census.total)}眾`} sub="境界越高越稀" />
        </div>

        {/* 分頁籤 */}
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => switchTab(t.key)} className={`rounded-lg border px-3 py-1 text-sm transition ${tab === t.key ? 'border-[#74b69b] bg-emerald-500/15 text-[#9fdcc4]' : 'border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-[#4f8f78]'}`}>{t.label}</button>
          ))}
        </div>

        {/* 翻頁 */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <button disabled={page <= 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="rounded border border-zinc-700 px-2 py-0.5 disabled:opacity-40">‹ 上頁</button>
          <span>第 {page + 1} / {maxPage + 1} 頁</span>
          <button disabled={page >= maxPage} onClick={() => setPage((p) => Math.min(maxPage, p + 1))} className="rounded border border-zinc-700 px-2 py-0.5 disabled:opacity-40">下頁 ›</button>
          <input type="number" min={1} max={maxPage + 1} value={page + 1} onChange={(e) => setPage(Math.max(0, Math.min(maxPage, (Number(e.target.value) || 1) - 1)))} className="w-20 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5" />
          <button onClick={() => setPage(Math.floor(Math.random() * (maxPage + 1)))} className="ml-auto rounded border border-[#4f8f78] px-2 py-0.5 text-[#9fdcc4]">隨機一頁</button>
        </div>

        <div className="max-h-[58vh] space-y-1 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          {rows}
        </div>
        <div className="text-center text-[10px] text-zinc-600">圖鑑以決定性方式生成——同一編號永得同一條目；前列為原著正史錄入，其後由詞庫推演補全。</div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string; sub: string }> = ({ label, value, sub }) => (
  <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-1.5">
    <div className="text-[10px] text-zinc-500">{label}</div>
    <div className="text-sm font-semibold text-amber-200/90">{value}</div>
    <div className="text-[9px] text-zinc-600">{sub}</div>
  </div>
);

const RAR_BADGE = (r: string) => <span className={`text-[10px] ${RAR_COLOR[r] || 'text-zinc-500'}`}>{r}</span>;

const EntryRow: React.FC<{ tab: TabKey; index: number }> = ({ tab, index }) => {
  if (tab === 'realm') {
    const r = CANON_REALMS[index];
    if (!r) return null;
    const f = r.features;
    const flags = [f?.natalTreasure ? '可蘊養本命法寶' : '', f?.nascentSoul ? '具元嬰' : '', f?.lawRestricted ? '受天地法則限' : ''].filter(Boolean).join('・');
    const life = r.lifespan >= 10000 ? `${Math.round(r.lifespan / 10000)}萬` : `${r.lifespan}`;
    return (
      <Row
        title={r.name}
        tag={`${TIER_LABEL[r.tier] || r.tier}·壽元${life}年`}
        tagClass={r.tier === 'human' ? 'text-sky-300' : r.tier === 'spirit' ? 'text-emerald-300' : 'text-amber-300'}
        sub={flags || undefined}
        desc={`${f?.trait || ''}　｜飛行：${f?.flight || '—'}　｜突破考驗：${f?.trial || '—'}`}
        no={index + 1}
      />
    );
  }
  if (tab === 'sect') {
    const s = ALL_SECTS[index];
    if (!s) return null;
    const home = sectHomeName(s);
    const lm = home ? lingMaiOf(home).name : null;
    const ladder = s.ranks.map((r) => r.name).join(' → ');
    const joinable = s.category !== '武林門派';
    return (
      <Row
        title={s.name}
        tag={`${s.category}${joinable ? '' : '·凡俗不可投'}`}
        tagClass={CAT_COLOR[s.category] || 'text-zinc-400'}
        sub={s.alignment}
        desc={`本門：${home || '四海為家（暫無定所）'}${lm ? `（${lm}）` : ''}　·　階級：${ladder}`}
        no={index + 1}
      />
    );
  }
  if (tab === 'place') {
    const n = PLACES[index];
    if (!n) return null;
    const lm = lingMaiOf(n.id);
    const gate = n.access?.hidden ? '隱匿' : n.access?.requiresItem ? `需「${n.access.requiresItem}」` : n.access?.requiresFlag ? '需解封' : '';
    const lmClass = lm.grade <= 1 ? 'text-zinc-500' : lm.grade <= 4 ? 'text-emerald-300' : 'text-amber-300';
    return (
      <Row
        title={n.name}
        tag={`${TIER_LABEL[n.tier] || n.tier}·靈脈${lm.name}`}
        tagClass={lmClass}
        sub={n.parentId ? `屬 ${NODE_NAME[n.parentId] || n.parentId}` : '界根'}
        badge={gate ? <span className="text-[10px] text-rose-300/80">{gate}</span> : undefined}
        desc={n.description}
        no={index + 1}
      />
    );
  }
  if (tab === 'tech') {
    const t = index < TECHNIQUES.length ? TECHNIQUES[index] : techniqueForSeed('cat#' + index);
    const school = (t.canonRefs && t.canonRefs[0]) || t.category;
    return (
      <Row title={t.name} tag={`${school}·${t.realmReq}`} tagClass="text-violet-300" desc={t.desc} no={index + 1} />
    );
  }
  if (tab === 'item') {
    const it = index < CANON_ITEMS.length ? CANON_ITEMS[index] : itemForSeed('cat#' + index);
    return <Row title={it.name} tag={it.kind} tagClass="text-sky-300" badge={RAR_BADGE(it.rarity)} sub={it.realmTier} desc={it.effect} no={index + 1} />;
  }
  if (tab === 'beast') {
    const b = index < NAMED_BEASTS.length ? NAMED_BEASTS[index] : beastForSeed('cat#' + index);
    const drops = (b.drops || []).map((d) => d.name).join('、');
    return <Row title={b.name} tag={`${b.beastType}·${b.realm}`} tagClass="text-rose-300" desc={`${b.desc}${drops ? `　掉落：${drops}` : ''}`} no={index + 1} />;
  }
  // npc
  const n = npcForSeed('cat#' + index, index % 7 === 0 ? 'spirit' : 'human', index % 11 === 0 ? '元婴期' : '炼气期');
  return <Row title={`${n.title ? n.name + '·' + n.title : n.name}`} tag={`${n.realm}·${n.faction}`} tagClass="text-emerald-300" desc={`${n.origin}出身，${n.physique}，性${n.trait}；習《${n.technique}》，隨身「${n.item.name}」。`} no={index + 1} />;
};

const Row: React.FC<{ title: string; tag: string; tagClass?: string; badge?: React.ReactNode; sub?: string; desc: string; no: number }> = ({ title, tag, tagClass, badge, sub, desc, no }) => (
  <div className="rounded-lg border border-zinc-800/70 bg-zinc-900/40 px-2.5 py-1.5">
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-[10px] text-zinc-600">#{no}</span>
      <span className="text-sm font-semibold text-zinc-100">{title}</span>
      <span className={`text-[10px] ${tagClass || 'text-zinc-500'}`}>{tag}</span>
      {badge}
      {sub && <span className="text-[10px] text-zinc-600">{sub}</span>}
    </div>
    <div className="mt-0.5 pl-14 text-[11px] text-zinc-500">{desc}</div>
  </div>
);

export default CodexPanel;
