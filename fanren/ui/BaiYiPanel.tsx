import React, { useState } from 'react';
import type { FanrenWorldState } from '../types';
import type { PlayerStats } from '../../types';
import { BAIYI_CATALOG } from '../data/baiyi';
import { rankName } from '../engine/baiyi';
import { TECHNIQUES, getTechnique } from '../data/techniques';
import { TECHNIQUE_SOURCE, techniquesLearnableHere, techSourceOf } from '../engine/techniqueSource';

interface Props {
  world: FanrenWorldState;
  player?: PlayerStats;
  busy: boolean;
  onClose: () => void;
  onAction: (text: string) => void;
}

const section = 'rounded-xl border border-zinc-800 bg-zinc-900/60 p-3';
const h = 'mb-2 text-sm font-semibold text-[#9fdcc4]';

const ORG_SUGGEST = [
  { label: '商團', text: '成立一個商團，名為' },
  { label: '船隊', text: '創立一支船隊，名為' },
  { label: '護衛團', text: '組建一個護衛團，名為' },
  { label: '拍賣行', text: '開設一間拍賣行，名為' },
  { label: '宗門', text: '開山立派，創立宗門，名為' },
];

const BaiYiPanel: React.FC<Props> = ({ world, player, busy, onClose, onAction }) => {
  const invNames = (player?.inventory || []).map((i) => i.name);
  const techHereSet = techniquesLearnableHere(world, invNames); // 此地/本門/持秘譜可習的原著法術
  const learnedTechIds = new Set((world.techniques || []).map((t) => t.id));
  // 已收錄之原著名法（有傳承出處者），分「此地可習」與「他處傳承」
  const sourcedTechs = TECHNIQUES.filter((t) => TECHNIQUE_SOURCE[t.name] && !learnedTechIds.has(t.id));
  const learnHere = sourcedTechs.filter((t) => techHereSet.has(t.name));
  const learnElsewhere = sourcedTechs.filter((t) => !techHereSet.has(t.name));
  const learned = Object.values(world.baiyi || {}).sort((a, b) => b.exp - a.exp);
  const learnedIds = new Set(learned.map((p) => p.artId));
  const unlearned = BAIYI_CATALOG.filter((a) => !learnedIds.has(a.id));
  const orgs = world.organizations || [];
  const [orgName, setOrgName] = useState('');

  const go = (text: string) => { if (busy) return; onAction(text); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-4 w-full max-w-3xl space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="brand-serif text-xl font-bold text-[#9fdcc4]">🛠️ 修仙百藝 · 基業</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-[#74b69b]">關閉</button>
        </div>

        {/* 已習百藝 */}
        <div className={section}>
          <div className={h}>已習百藝（{learned.length}）</div>
          {learned.length === 0 ? (
            <div className="text-xs text-zinc-500">你尚未專研任何技藝。試著「煉丹／制符／布陣／馴獸／修習○○之術」，熟能生巧。</div>
          ) : (
            <div className="space-y-1.5">
              {learned.map((p) => {
                const pct = Math.min(100, Math.round((p.rank / 5) * 100));
                return (
                  <div key={p.artId}>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-16 shrink-0 text-zinc-200">{p.name}</span>
                      <span className="rounded border border-amber-700/50 px-1 text-[10px] text-amber-200">{rankName(p.rank)}</span>
                      {p.generated && <span className="rounded border border-fuchsia-700/50 px-1 text-[10px] text-fuchsia-300">自創</span>}
                      <span className="h-1.5 flex-1 overflow-hidden rounded bg-zinc-800">
                        <span className="block h-full bg-gradient-to-r from-[#4f8f78] to-[#9fdcc4]" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="w-12 text-right text-zinc-600">熟練 {p.exp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {unlearned.length > 0 && (
            <div className="mt-2 border-t border-zinc-800 pt-2">
              <div className="mb-1 text-[11px] text-zinc-500">可修習（點選即修習）：</div>
              <div className="flex flex-wrap gap-1">
                {unlearned.map((a) => (
                  <button key={a.id} disabled={busy} onClick={() => go(`修習${a.name}`)} title={a.description}
                    className="rounded border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-[11px] text-zinc-300 transition hover:border-[#4f8f78] disabled:opacity-50">
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 具名功法 / 神通 */}
        <div className={section}>
          <div className={h}>具名功法・神通（{(world.techniques || []).length}）</div>
          <div className="mb-2 text-[10px] leading-relaxed text-zinc-500">施展之法：於下方<span className="text-zinc-300">行動欄</span>直接敘述，如「以火彈術轟殺來敵」「運御風訣遁走」「催青元劍訣禦敵」——天機自會演繹。所習功法之屬性加成已融入你的修為（戰時自然生效），層數越高、解鎖神通越強。</div>
          {(world.techniques || []).length > 0 && (
            <div className="mb-2 space-y-1.5 text-xs text-zinc-300">
              {(world.techniques || []).map((t) => {
                const def = getTechnique(t.id);
                const un = (def?.neigong || []).filter((n) => n.level <= t.level).map((n) => n.name);
                return (
                  <div key={t.id} className="border-l-2 border-amber-700/50 pl-2">
                    <span className="font-semibold text-amber-200">{t.name}</span>
                    <span className="text-zinc-500"> · 第{t.level}/{def?.maxLevel || t.level}層</span>
                    {un.length > 0 && <div className="text-[10px] text-emerald-300/70">神通：{un.join('、')}</div>}
                  </div>
                );
              })}
            </div>
          )}
          {/* 仙俠世界：原著名法不隨處可習——須親至其傳承之地、拜入其宗、或得其秘譜。 */}
          <div className="text-[11px] text-emerald-300/80">此地／本門可習的原著法術（點選即修習，需符合修為）：</div>
          {learnHere.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {learnHere.map((tc) => (
                <button key={tc.id} disabled={busy} onClick={() => go(`修習${tc.name}`)} title={`${tc.desc}（需${tc.realmReq}）`}
                  className="rounded border border-amber-700/60 bg-amber-950/30 px-2 py-0.5 text-[11px] text-amber-200 transition hover:border-amber-400 disabled:opacity-50">
                  {tc.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-1 text-[10px] text-zinc-600">此地無名門法術之傳承——原著法術各有出處，須親至其地或拜入其宗方得習之。</div>
          )}
          {learnElsewhere.length > 0 && (
            <div className="mt-2 border-t border-zinc-800 pt-1.5">
              <div className="mb-1 text-[10px] text-zinc-500">他處傳承（須前往對應之地／宗門）：</div>
              <div className="flex flex-wrap gap-1">
                {learnElsewhere.map((tc) => (
                  <span key={tc.id} title={`${tc.desc}（需${tc.realmReq}）`}
                    className="rounded border border-zinc-800 bg-zinc-900/40 px-2 py-0.5 text-[10px] text-zinc-500">
                    {tc.name}<span className="text-zinc-600">·{techSourceOf(tc.name)?.hint || ''}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 組織 / 基業 */}
        <div className={section}>
          <div className={h}>你的基業 · 組織（{orgs.length}）</div>
          {orgs.length === 0 ? (
            <div className="text-xs text-zinc-500">你尚未開創任何組織。船隊、商團、宗門……皆可白手起家。</div>
          ) : (
            <div className="space-y-1.5 text-xs text-zinc-300">
              {orgs.map((o) => (
                <div key={o.id} className="border-l-2 border-[#4f8f78]/60 pl-2">
                  <div>
                    <span className="font-semibold text-[#9fdcc4]">{o.name}</span>
                    <span className="text-zinc-500"> · {o.type}{o.generated ? '（自創型）' : ''}</span>
                  </div>
                  <div className="text-zinc-400">{o.description}</div>
                  <div className="text-[10px] text-zinc-600">成員 {o.members} · 影響力 {o.influence} · 資產 {o.assets} 靈石</div>
                </div>
              ))}
            </div>
          )}
          {/* 創立組織 */}
          <div className="mt-2 border-t border-zinc-800 pt-2">
            <div className="mb-1 text-[11px] text-zinc-500">創立新組織（輸入名號後點類型）：</div>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="名號（如：聚寶、青雲、四海…）"
              className="mb-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-sm outline-none focus:border-[#4f8f78]"
            />
            <div className="flex flex-wrap gap-1">
              {ORG_SUGGEST.map((s) => (
                <button key={s.label} disabled={busy || !orgName.trim()} onClick={() => go(`${s.text}${orgName.trim()}`)}
                  className="rounded border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-[11px] text-zinc-300 transition hover:border-[#4f8f78] disabled:opacity-40">
                  立{s.label}
                </button>
              ))}
            </div>
            <div className="mt-1 text-[10px] text-zinc-600">提示：也可直接在行動框輸入「成立一個販賣靈符的商行，名為…」——系統會為未定義的型別即時開創。</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaiYiPanel;
