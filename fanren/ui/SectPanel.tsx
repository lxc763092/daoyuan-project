import React, { useState, useMemo } from 'react';
import type { FanrenWorldState, SectDef } from '../types';
import type { PlayerStats } from '../../types';
import { useWorldStore } from '../worldStore';
import { allSects, getSect, nextRank, canJoinSect, promotionGate, rankRealmReqName } from '../engine/sect';
import { getLore, accrueStipend, eventCountdown, isAtSectHome, sectHomeName, sectInRegion } from '../engine/sectRitual';
import { getRegion } from '../engine/daoyuanLoader';
import { buildCeremony, hasAnySpiritualRoot, type Ceremony } from '../engine/induction';

const EVENT_ICON: Record<string, string> = { lecture: '🪷', tournament: '⚔️', secret_realm: '🌀' };

interface Props {
  world: FanrenWorldState;
  player: PlayerStats;
  busy: boolean;
  onClose: () => void;
}

const section = 'rounded-xl border border-zinc-800 bg-zinc-900/60 p-3';
const h = 'mb-2 text-sm font-semibold text-[#9fdcc4]';
// 仙凡有別：修仙者只投修仙/魔道宗門。武林門派（江湖凡俗武者之所）不列入可投，僅作尋訪韓立等故人之地。
const CAT_ORDER: SectDef['category'][] = ['修仙宗門', '魔道宗門'];
const CAT_TAG: Record<string, string> = { 武林門派: 'text-sky-300 border-sky-700/60', 修仙宗門: 'text-emerald-300 border-emerald-700/60', 魔道宗門: 'text-rose-300 border-rose-700/60' };
const CAT_DESC: Record<string, string> = {
  修仙宗門: '真正的修仙勢力，須具靈根與修為方得入門，授功法、丹方、法器。',
  魔道宗門: '魔道邪宗，須有修為；授魔功邪術，然血祭伏殺自有業力與兇名之累。',
};

const SectPanel: React.FC<Props> = ({ world, player, busy, onClose }) => {
  const joinSect = useWorldStore((s) => s.joinSect);
  const doSectMission = useWorldStore((s) => s.doSectMission);
  const redeemSectResource = useWorldStore((s) => s.redeemSectResource);
  const claimSectStipend = useWorldStore((s) => s.claimSectStipend);
  const attemptSectPromotion = useWorldStore((s) => s.attemptSectPromotion);
  const participateSectEvent = useWorldStore((s) => s.participateSectEvent);
  const leaveSect = useWorldStore((s) => s.leaveSect);
  const submitAction = useWorldStore((s) => s.submitAction);

  const hereName = getRegion(world.currentLocationId)?.name || world.currentLocationId;
  const goTo = (name: string) => { void submitAction(`前往${name}`); onClose(); };

  const m = world.sect;
  const mySect = m ? getSect(m.sectId) : undefined;
  const next = mySect ? nextRank(mySect, m!.rankIndex) : null;
  const merit = m ? (m.merit ?? m.contribution) : 0;
  const lore = mySect ? getLore(mySect) : null;
  const gate = mySect && m ? promotionGate(mySect, merit, m.rankIndex, player.realm) : null;
  const promotable = !!(gate && next && gate.meritReady && !gate.realmBlocked);
  const stipend = mySect && m ? accrueStipend(m, mySect, world.clock.totalDays) : null;
  const ev = m && world.sectEvent && world.sectEvent.sectId === m.sectId && world.clock.totalDays <= world.sectEvent.endDay ? world.sectEvent : null;
  // 宗門事務須親至本門：當前師門是否在本門、本門地名
  const atMyHome = mySect ? isAtSectHome(world.currentLocationId, mySect) : true;
  const myHomeName = mySect ? sectHomeName(mySect) : null;
  const busyOrAway = busy || !atMyHome; // 不在本門則停用一切宗門行動

  // 仙凡有別：只收修仙/魔道宗門可投；武林門派（凡俗江湖）不列入。
  const allSectsList = useMemo(() => allSects().filter((s) => s.category !== '武林門派'), []);
  const [q, setQ] = useState('');
  // 數百門勢力：預設只列「本區」（本門所在與你同大區）；搜尋則跨天下尋之。
  const query = q.trim();
  const sects = useMemo(() => {
    if (query) return allSectsList.filter((s) => s.name.includes(query) || (s.alignment || '').includes(query));
    return allSectsList.filter((s) => s.id === m?.sectId || sectInRegion(s, world.currentLocationId));
  }, [allSectsList, query, world.currentLocationId, m?.sectId]);
  const hasRoot = hasAnySpiritualRoot(player.spiritualRoots, player.variantRoot);
  const [ceremony, setCeremony] = useState<Ceremony | null>(null);
  const [pendingId, setPendingId] = useState('');
  const [joinErr, setJoinErr] = useState('');

  const beginInduction = (s: SectDef) => {
    setJoinErr('');
    const chk = canJoinSect(s, { realmName: player.realm, hasRoot, currentSectId: m?.sectId });
    if (!chk.ok) { setJoinErr(chk.reason); return; }
    setCeremony(buildCeremony(s, {
      roots: player.spiritualRoots as any,
      variantRoot: player.variantRoot,
      playerName: player.name,
      realmName: player.realm,
    }));
    setPendingId(s.id);
  };
  const completeInduction = () => {
    if (pendingId) joinSect(pendingId);
    setCeremony(null);
    setPendingId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-4 w-full max-w-2xl space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="brand-serif text-xl font-bold text-[#9fdcc4]">⛩️ 宗門・門派</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-[#74b69b]">關閉</button>
        </div>
        {joinErr && <div className="rounded-lg border border-rose-800/50 bg-rose-950/30 px-3 py-1.5 text-xs text-rose-200">{joinErr}</div>}

        {/* 當前師門 */}
        {mySect && m ? (
          <div className={`${section} bg-gradient-to-b from-zinc-900/70 to-amber-950/5`}>
            <div className={h}>
              當前師門：{mySect.name}　<span className={`rounded border px-1 text-[10px] ${CAT_TAG[mySect.category]}`}>{mySect.category}</span>
              <span className="ml-2 text-xs text-amber-200/90">{mySect.ranks[m.rankIndex]?.name}</span>
            </div>
            {/* 師承・信物・宗訓 */}
            <div className="mb-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-zinc-500">
              {m.masterName && <span>師承：<span className="text-zinc-300">{m.masterName}</span></span>}
              {m.identityToken && <span>信物：<span className="text-amber-200/80">{m.identityToken}</span></span>}
              {m.rootTier && <span>根器：<span className="text-emerald-300/80">{m.rootTier}</span></span>}
              <span>入門：第 {Math.max(1, Math.floor(m.joinedDay / 360) + 1)} 年</span>
            </div>
            {lore && <div className="mb-1.5 border-l-2 border-amber-800/40 pl-2 text-[10px] italic leading-relaxed text-amber-200/60">宗訓・{lore.motto}</div>}
            <div className="text-[11px] text-zinc-500">{mySect.ranks[m.rankIndex]?.perk}</div>

            {/* 不在本門：宗門事務不可遠端操辦 */}
            {!atMyHome && (
              <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-rose-700/50 bg-rose-950/25 px-2.5 py-1.5">
                <span className="text-[11px] text-rose-200">⛩️ 你身在「{hereName}」，不在本門——宗門辦差、領俸、晉升、聽訓須親至{myHomeName ? `「${myHomeName}」` : '本門'}方能操辦。</span>
                {myHomeName && <button disabled={busy} onClick={() => goTo(myHomeName)} className="ml-auto shrink-0 rounded border border-[#4f8f78] bg-emerald-950/40 px-2 py-0.5 text-[11px] text-[#9fdcc4] transition hover:border-[#74b69b] disabled:opacity-40">前往本門・{myHomeName}</button>}
              </div>
            )}

            {/* 功勳／貢獻／晉升閘 */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-zinc-800 bg-black/30 px-2.5 py-1.5 text-[11px]">
              <span className="text-zinc-400">功勳（資歷） <span className="font-semibold text-[#9fdcc4]">{merit}</span></span>
              <span className="text-zinc-400">貢獻（可兌） <span className="font-semibold text-amber-300">{m.contribution}</span></span>
              {next ? (
                <span className="text-zinc-500">下階「{next.name}」須功勳 {next.reqContribution}・修為 {rankRealmReqName(mySect, m.rankIndex + 1)}</span>
              ) : (
                <span className="text-amber-300/70">已臻頂階</span>
              )}
              {promotable && (
                <button disabled={busyOrAway} onClick={() => attemptSectPromotion()} className="ml-auto shrink-0 rounded border border-amber-500/70 bg-amber-900/40 px-2 py-0.5 text-[10px] font-semibold text-amber-200 transition hover:border-amber-300 disabled:opacity-40">⛩️ 請受晉升大典</button>
              )}
              {gate && gate.realmBlocked && (
                <span className="ml-auto shrink-0 text-[10px] text-zinc-500">資歷已足，待修為及「{gate.needRealm}」</span>
              )}
            </div>

            {/* 月俸 + 榮銜 */}
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <button disabled={busyOrAway || !stipend} onClick={() => claimSectStipend()} className="rounded-lg border border-yellow-700/50 bg-yellow-950/20 px-2 py-0.5 text-[10px] text-yellow-200 transition hover:border-yellow-400 disabled:opacity-40">💰 支領月俸{stipend ? `（積欠 ${stipend.months} 月・${stipend.stones}石）` : '（未滿一月）'}</button>
              {(m.titles && m.titles.length > 0) && m.titles.map((t, i) => (
                <span key={i} className="rounded border border-amber-700/50 bg-amber-950/20 px-1.5 py-0.5 text-[10px] text-amber-200/90">🏅 {t}</span>
              ))}
            </div>

            {/* 宗門盛事 */}
            {ev && (
              <div className="mt-2 rounded-lg border border-indigo-700/50 bg-indigo-950/20 p-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-200">{EVENT_ICON[ev.kind]} 宗門盛事・{ev.title} <span className="text-[10px] font-normal text-indigo-300/60">{eventCountdown(ev, world.clock.totalDays)}</span></div>
                <div className="mt-0.5 text-[10px] leading-relaxed text-zinc-400">{ev.desc}</div>
                <button disabled={busyOrAway} onClick={() => participateSectEvent()} className="mt-1.5 rounded border border-indigo-500/60 bg-indigo-900/40 px-2 py-0.5 text-[10px] text-indigo-100 transition hover:border-indigo-300 disabled:opacity-40">赴會參與</button>
              </div>
            )}

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {/* 宗門辦差 */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2">
                <div className="mb-1 text-xs text-zinc-400">宗門辦差（立功勳・耗時日）</div>
                <div className="space-y-1">
                  {mySect.missions.map((ms, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-[11px] text-zinc-300">{ms.name}</span>
                      <span className="truncate text-[10px] text-zinc-600">{ms.note}</span>
                      <span className="ml-auto text-[10px] text-[#9fdcc4]/80">功+{ms.contribution}</span>
                      <button disabled={busyOrAway} onClick={() => doSectMission(i)} className="shrink-0 rounded border border-[#4f8f78] px-1.5 py-0.5 text-[10px] text-[#9fdcc4] disabled:opacity-40">接</button>
                    </div>
                  ))}
                </div>
              </div>
              {/* 資源兌換 */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2">
                <div className="mb-1 text-xs text-zinc-400">資源兌換（耗貢獻・不減資歷）</div>
                <div className="space-y-1">
                  {mySect.resources.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-[11px] text-zinc-300">{r.name}</span>
                      <span className="truncate text-[10px] text-zinc-600">{r.note}</span>
                      <span className="ml-auto text-[10px] text-amber-300/80">{r.cost}</span>
                      <button disabled={busyOrAway || m.contribution < r.cost} onClick={() => redeemSectResource(i)} className="shrink-0 rounded border border-amber-700/60 px-1.5 py-0.5 text-[10px] text-amber-200 disabled:opacity-40">兌</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 門規戒律 */}
            {lore && (
              <div className="mt-2 text-[10px] leading-relaxed text-zinc-600">
                <span className="text-zinc-500">門規：</span>{lore.precepts.join('　·　')}
              </div>
            )}
            <button disabled={busy} onClick={() => leaveSect()} className="mt-2 rounded-lg border border-zinc-700 px-2.5 py-1 text-[11px] text-zinc-400 transition hover:border-rose-500 hover:text-rose-300 disabled:opacity-40">{mySect.category === '魔道宗門' ? '叛離師門（兇險）' : '自請出門'}</button>
          </div>
        ) : (
          <div className={section}><div className="text-xs text-zinc-500">你尚未拜入任何門派。武林門派可廣納四方，修仙宗門則須靈根修為——擇一投身，方有靠山與傳承。</div></div>
        )}

        {/* 搜尋 / 範圍提示：天下勢力數百，預設只列本區，搜尋可遍覽 */}
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋天下勢力（如 星宮 / 葉家 / 魔焰宗）……"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/70 px-2.5 py-1.5 text-xs text-zinc-200 outline-none focus:border-indigo-500"
          />
          <span className="shrink-0 text-[10px] text-zinc-500">{query ? `搜得 ${sects.length} 門` : `本區 ${sects.length} 門 / 天下 ${allSectsList.length} 門`}</span>
        </div>
        {!query && <div className="text-[10px] text-zinc-600">＊預設僅列本區可訪之勢力；欲投他方之門，先搜其名、再前往拜山。</div>}
        <div className="rounded-lg border border-sky-900/40 bg-sky-950/15 px-2.5 py-1 text-[10px] leading-relaxed text-sky-300/70">仙凡有別：七玄門等<span className="text-sky-200">江湖武林門派</span>乃凡俗武者之所，與修仙者生命層次迥異、所求各異——你既已踏仙途，不投此等門派；然其地仍可前往，尋訪韓立等故人、打探消息。</div>

        {/* 可投門派（分類） */}
        {sects.length === 0 && (
          <div className={section}><div className="text-xs text-zinc-500">{query ? '遍尋天下，未見此名之勢力。' : '此地一帶並無可投之勢力——可搜尋他方門派，或往別處遊歷。'}</div></div>
        )}
        {CAT_ORDER.map((cat) => {
          const list = sects.filter((s) => s.category === cat);
          if (!list.length) return null;
          return (
            <div key={cat} className={section}>
              <div className={h}><span className={`rounded border px-1 text-[11px] ${CAT_TAG[cat]}`}>{cat}</span> <span className="ml-1 text-[10px] font-normal text-zinc-600">{CAT_DESC[cat]}</span></div>
              <div className="space-y-1.5">
                {list.map((s) => {
                  const isMine = m?.sectId === s.id;
                  const sHome = sectHomeName(s);
                  const atHome = isAtSectHome(world.currentLocationId, s);
                  return (
                    <div key={s.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-200">{s.name}</span>
                        <span className="text-[10px] text-zinc-500">{s.alignment} · 入門 {s.joinRealmReq || '炼气期'}{s.needRoot ? '·需靈根' : '·凡人可入'}</span>
                        {isMine ? (
                          <span className="ml-auto shrink-0 rounded border border-amber-700/50 px-2 py-0.5 text-[11px] text-amber-200/80">現居</span>
                        ) : atHome ? (
                          <button disabled={busy} onClick={() => beginInduction(s)} className="ml-auto shrink-0 rounded border border-[#4f8f78] bg-emerald-950/40 px-2 py-0.5 text-[11px] text-[#9fdcc4] transition hover:border-[#74b69b] disabled:opacity-40">拜入</button>
                        ) : sHome ? (
                          <button disabled={busy} onClick={() => goTo(sHome)} className="ml-auto shrink-0 rounded border border-sky-700/50 bg-sky-950/30 px-2 py-0.5 text-[11px] text-sky-200 transition hover:border-sky-400 disabled:opacity-40">前往拜山・{sHome}</button>
                        ) : (
                          <button disabled={busy} onClick={() => beginInduction(s)} className="ml-auto shrink-0 rounded border border-[#4f8f78] bg-emerald-950/40 px-2 py-0.5 text-[11px] text-[#9fdcc4] transition hover:border-[#74b69b] disabled:opacity-40">拜入</button>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-zinc-600">
                        <span>階級：{s.ranks.map((r) => r.name).join(' → ')}</span>
                        {sHome && <span className="text-zinc-500">📍 本門：{sHome}{atHome ? '（你已在此）' : ''}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 拜入山門・入門大典（儀式感） */}
      {ceremony && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/85 p-4" onClick={(e) => { e.stopPropagation(); setCeremony(null); }}>
          <div className="my-6 w-full max-w-xl rounded-2xl border border-amber-700/40 bg-gradient-to-b from-zinc-950 to-amber-950/10 p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="brand-serif mb-1 text-center text-lg font-bold text-amber-300">🕯️ 拜入山門・入門大典</div>
            <div className="mb-3 text-center text-xs text-zinc-500">{ceremony.sectName}　·　{ceremony.category}　·　主持：{ceremony.presider}</div>
            <div className="mb-3 rounded-lg border border-amber-800/40 bg-amber-950/20 py-1.5 text-center text-sm text-amber-200">測靈根：{ceremony.rootTest.tier}{ceremony.rootTest.attrs.length ? `（${ceremony.rootTest.attrs.join('')}）` : ''}</div>
            <div className="space-y-2.5">
              {ceremony.steps.map((st, i) => (
                <div key={i} className="border-l-2 border-amber-700/40 pl-3">
                  <div className="text-xs font-semibold text-amber-300/90">{st.title}</div>
                  <div className="mt-0.5 whitespace-pre-wrap text-[13px] leading-relaxed text-zinc-300">{st.text}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-2">
              <div className="mb-1 text-xs text-zinc-400">入門所賜</div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {ceremony.gifts.map((g, i) => <span key={i} className="rounded border border-amber-800/40 bg-amber-950/20 px-1.5 py-0.5 text-amber-200/90">{g.name}</span>)}
                {ceremony.stones > 0 && <span className="rounded border border-amber-800/40 bg-amber-950/20 px-1.5 py-0.5 text-amber-200/90">例俸靈石 ×{ceremony.stones}</span>}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setCeremony(null)} className="flex-1 rounded-lg border border-zinc-700 py-1.5 text-sm text-zinc-400 transition hover:border-zinc-500">再思量</button>
              <button disabled={busy} onClick={completeInduction} className="flex-[2] rounded-lg border border-amber-600/60 bg-amber-900/30 py-1.5 text-sm font-semibold text-amber-200 transition hover:border-amber-400 disabled:opacity-40">敬受門規・禮成入籍</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectPanel;
