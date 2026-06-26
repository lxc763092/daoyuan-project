import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePlayer, useLogs, useGameStore } from '../../store/gameStore';
import { useUIStore } from '../../store/uiStore';
import { useWorldStore } from '../worldStore';
import ChroniclePanel from './ChroniclePanel';
import CreatePanel from './CreatePanel';
import WorldMapView from './WorldMapView';
import BaiYiPanel from './BaiYiPanel';
import AbodePanel from './AbodePanel';
import MarketPanel from './MarketPanel';
import CodexPanel from './CodexPanel';
import SectPanel from './SectPanel';
import AiSettingsPanel from './AiSettingsPanel';
import CanonCharacterPanel from './CanonCharacterPanel';
import { BrandLockup } from './Brand';
import { formatTime } from '../engine/clock';
import { buildReminders } from '../engine/reminderRecall';
import { getRegion } from '../engine/daoyuanLoader';
import { canonRealmDisplay } from '../engine/realm';
import { lingMaiOf } from '../engine/lingMai';
import { hasMarketAt } from '../engine/mapGate';

const logColor: Record<string, string> = {
  normal: 'text-zinc-300',
  gain: 'text-emerald-300',
  danger: 'text-rose-300',
  special: 'text-amber-300',
};

const QUICK = [
  { label: '閉關修煉十年', text: '閉關修煉十年' },
  { label: '外出歷練', text: '外出歷練查探一番' },
  { label: '查看四周有誰', text: '查看四周有哪些人物可結交' },
  { label: '回憶往事', text: '回憶我過去發生過什麼' },
  { label: '動用金手指', text: '發動我的金手指' },
];

// 系統工具列：開啟既有功能模態框（背包/角色/煉丹/洞府…）
const SYSTEM_TABS: { key: string; label: string; icon: string }[] = [
  // 「角色」改用 canon 專屬面板 CanonCharacterPanel（對應創角的天命/靈根/稟性/戰力），不再走舊引擎 CharacterModal。
  { key: 'isInventoryOpen', label: '背包', icon: '🎒' },
  // 功法（具名功法/神通）與煉丹（丹道百藝）已統一收於上方 🛠️ 百藝（fanren BaiYiPanel）；
  // 宗門→⛩️宗門、洞府→🏔️洞府。經典 SectModal/GrottoModal/ShopModal/CultivationModal/CraftingModal 在 canon 模式皆已抑制，避免雙系統突兀。
  { key: 'isPetOpen', label: '靈寵', icon: '🐉' },
  { key: 'isRealmOpen', label: '境界', icon: '🌌' },
  { key: 'isAchievementOpen', label: '成就', icon: '🏆' },
  { key: 'isSettingsOpen', label: '設定', icon: '⚙️' },
];

const CanonView: React.FC = () => {
  const player = usePlayer();
  const logs = useLogs();
  const world = useWorldStore((s) => s.world);
  const busy = useWorldStore((s) => s.busy);
  const submitAction = useWorldStore((s) => s.submitAction);
  const resolveChoice = useWorldStore((s) => s.resolveChoice);
  const onKill = useWorldStore((s) => s.onKill);
  const attemptBreakthrough = useWorldStore((s) => s.attemptBreakthrough);
  const setModal = useUIStore((s) => s.setModal);
  const [input, setInput] = useState('');
  const [showChronicle, setShowChronicle] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showBaiYi, setShowBaiYi] = useState(false);
  const [showAbode, setShowAbode] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [showCodex, setShowCodex] = useState(false);
  const [showSect, setShowSect] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const pendingChoice = world.pendingChoice;
  const storyLock = !!pendingChoice; // 進入劇情（待抉擇）時，限制功能與行動
  const gate = storyLock ? ' opacity-40' : ''; // 劇情中行動類按鈕灰化

  const reminders = useMemo(() => buildReminders(world), [world]);
  const region = getRegion(world.currentLocationId);
  const lingMai = useMemo(() => lingMaiOf(world.currentLocationId), [world.currentLocationId]);
  const atMarket = useMemo(() => hasMarketAt(world.currentLocationId), [world.currentLocationId]);
  const lmColor = lingMai.grade <= 1 ? 'text-zinc-500' : lingMai.grade === 2 ? 'text-teal-300/80' : lingMai.grade <= 4 ? 'text-emerald-300' : 'text-amber-300';

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs.length]);

  // 戰鬥擊殺自動觸發 on:'kill' 異能（吞噬/吸取）
  const killCount = player?.statistics?.killCount ?? 0;
  const prevKillRef = useRef(killCount);
  useEffect(() => {
    if (killCount > prevKillRef.current) onKill();
    prevKillRef.current = killCount;
  }, [killCount, onKill]);

  if (!player) return null;

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setInput('');
    void submitAction(t);
  };

  const expPct = Math.min(100, Math.round((player.exp / Math.max(1, player.maxExp)) * 100));
  const gf = world.goldenFinger;
  const gfRt = world.goldenFingerRuntime;
  const gfPct = gf && gfRt ? Math.round((gfRt.energy / gf.energyMax) * 100) : 0;

  return (
    <>
    <div className="h-screen w-full overflow-y-auto ink-wash text-zinc-100">
      <div className="mx-auto max-w-6xl px-3 py-4">
        {/* 品牌頁首 */}
        <div className="mb-3 flex items-center justify-between border-b border-[#3f5a50]/30 pb-2">
          <BrandLockup sealSize={30} titleClassName="text-base sm:text-lg" sub={false} />
          <span className="text-[10px] tracking-[0.25em] text-[#7c9d8f]/60">墨青朱印</span>
        </div>

        {/* 頂部狀態列 */}
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-amber-900/40 bg-zinc-900/70 px-4 py-2 text-sm">
          <span className="font-semibold text-amber-300">{player.name}</span>
          <span className="text-zinc-300">{canonRealmDisplay(world, player.realm, player.realmLevel)}</span>
          <span className="text-amber-200/80">{formatTime(world.clock)}</span>
          <span className="text-zinc-400">📍 {region?.name || world.currentLocationId}</span>
          <span className={lmColor} title={lingMai.desc}>⛰ 靈脈・{lingMai.name}</span>
          <span className="text-emerald-300/90">壽元 {Math.floor(player.lifespan)}/{player.maxLifespan}</span>
          <span className="ml-auto text-zinc-400">靈石 {player.spiritStones}</span>
        </div>

        {storyLock && (
          <div className="mb-2 rounded-lg border border-amber-700/50 bg-amber-950/30 px-3 py-1.5 text-xs text-amber-200">⚔ 劇情進行中——你正身處事中，須先就下方做出抉擇，無暇分心他顧（行動與多數功能暫時封閉）。</div>
        )}
        {/* 系統工具列：開啟既有功能（劇情中行動類功能停用，史冊/萬物譜唯讀可閱） */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          <button onClick={() => setShowCharacter(true)} className="rounded-lg border border-amber-700/60 bg-amber-950/40 px-2.5 py-1 text-xs text-amber-200 transition hover:border-amber-400">👤 角色</button>
          <button onClick={() => setShowChronicle(true)} className="rounded-lg border border-amber-700/60 bg-amber-950/40 px-2.5 py-1 text-xs text-amber-200 transition hover:border-amber-400">📜 史冊</button>
          <button disabled={storyLock} onClick={() => setShowCreate(true)} className={`rounded-lg border border-rose-700/60 bg-rose-950/30 px-2.5 py-1 text-xs text-rose-200 transition hover:border-rose-400${gate}`}>✦ 自創</button>
          <button disabled={storyLock} onClick={() => setShowMap(true)} className={`rounded-lg border border-emerald-700/60 bg-emerald-950/30 px-2.5 py-1 text-xs text-emerald-200 transition hover:border-emerald-400${gate}`}>🗺️ 地圖</button>
          <button disabled={storyLock} onClick={() => setShowBaiYi(true)} className={`rounded-lg border border-teal-700/60 bg-teal-950/30 px-2.5 py-1 text-xs text-teal-200 transition hover:border-teal-400${gate}`}>🛠️ 百藝・功法</button>
          <button disabled={storyLock} onClick={() => setShowAbode(true)} className={`rounded-lg border border-stone-600/60 bg-stone-900/40 px-2.5 py-1 text-xs text-stone-200 transition hover:border-stone-400${gate}`}>🏔️ 洞府</button>
          <button disabled={storyLock} title={atMarket ? '' : '此處無坊市，須往城鎮坊市或修仙宗門所在'} onClick={() => { if (atMarket) setShowMarket(true); else useGameStore.getState().addLog(`此處（${region?.name || world.currentLocationId}）荒僻無市，修士交易須往城鎮坊市、或修仙宗門所在——可開地圖尋一處坊市前往。`, 'normal'); }} className={`rounded-lg border px-2.5 py-1 text-xs transition ${atMarket ? 'border-yellow-700/60 bg-yellow-950/20 text-yellow-200 hover:border-yellow-400' : 'border-zinc-800 bg-zinc-900/40 text-zinc-500'}${gate}`}>💰 坊市{atMarket ? '' : '（無）'}</button>
          <button disabled={storyLock} onClick={() => setShowSect(true)} className={`rounded-lg border border-indigo-700/60 bg-indigo-950/20 px-2.5 py-1 text-xs text-indigo-200 transition hover:border-indigo-400${gate}`}>⛩️ 宗門</button>
          <button onClick={() => setShowCodex(true)} className="rounded-lg border border-teal-700/60 bg-teal-950/20 px-2.5 py-1 text-xs text-teal-200 transition hover:border-teal-400">📖 萬物譜</button>
          <button onClick={() => setShowAi(true)} title="填入你自己的 API 金鑰，啟用 AI 敘事（不填則用內建模板）" className="rounded-lg border border-sky-700/60 bg-sky-950/20 px-2.5 py-1 text-xs text-sky-200 transition hover:border-sky-400">🔑 AI 設定</button>
          {SYSTEM_TABS.map((t) => (
            <button key={t.key} disabled={storyLock} onClick={() => setModal(t.key as any, true)} className={`rounded-lg border border-zinc-700 bg-zinc-800/60 px-2.5 py-1 text-xs text-zinc-300 transition hover:border-amber-500 hover:text-amber-200${gate}`}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* 隊伍（含劇情組隊／分贓公帳） */}
        {world.party && world.party.members.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-[#3f6e5c]/60 bg-emerald-950/20 px-3 py-2 text-sm">
            <span className="font-semibold text-[#9fdcc4]">🤝 隊伍</span>
            <span className="text-zinc-300">{world.party.members.map((m) => m.name).join('、')}</span>
            {world.party.storyTitle && <span className="rounded border border-amber-700/50 px-1.5 text-[11px] text-amber-200">劇情：{world.party.storyTitle}</span>}
            {world.party.lootPool.length > 0 && <span className="text-[11px] text-cyan-300/80">公帳 {world.party.lootPool.reduce((s, l) => s + l.quantity, 0)} 件待分</span>}
            <button disabled={busy} onClick={() => submit('解散隊伍並分贓')} className="ml-auto rounded-lg border border-zinc-600 px-2 py-0.5 text-xs text-zinc-300 transition hover:border-rose-400 disabled:opacity-50">解散・分贓</button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* 左：敘事 + 輸入 */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="h-[58vh] overflow-y-auto rounded-xl border border-zinc-800 bg-black/40 p-4 leading-relaxed">
              {logs.length === 0 && <div className="text-zinc-500">你的仙途自此展開……輸入你的行動，或點選下方快捷。</div>}
              {logs.map((l) => (
                <p key={l.id} className={`mb-3 whitespace-pre-wrap ${logColor[l.type] || 'text-zinc-300'}`}>
                  {l.text}
                </p>
              ))}
              {busy && <p className="animate-pulse text-amber-400/70">（天機演算中……）</p>}
              <div ref={logEndRef} />
            </div>

            {/* 正史節點・介入抉擇 */}
            {pendingChoice && (
              <div className="mt-2 rounded-xl border border-amber-500/70 bg-amber-950/40 p-3 shadow-lg shadow-amber-900/20">
                <div className="mb-2 whitespace-pre-wrap text-sm text-amber-100">{pendingChoice.prompt}</div>
                <div className="flex flex-col gap-1.5">
                  {pendingChoice.options.map((o) => (
                    <button
                      key={o.id}
                      disabled={busy}
                      onClick={() => resolveChoice(o.id)}
                      className="rounded-lg border border-amber-700/60 bg-zinc-900/70 px-3 py-2 text-left text-sm text-amber-100 transition hover:border-amber-400 disabled:opacity-50"
                    >
                      ▸ {o.text}
                      {o.hint ? <span className="ml-2 text-xs text-zinc-400">（{o.hint}）</span> : null}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 快捷行動 */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK.map((q) => (
                <button
                  key={q.label}
                  disabled={busy || !!pendingChoice}
                  onClick={() => submit(q.text)}
                  className="rounded-lg border border-zinc-700 bg-zinc-800/70 px-2.5 py-1.5 text-xs text-zinc-200 transition hover:border-amber-500 disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* 輸入列 */}
            <div className="mt-2 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submit(input); }}
                disabled={busy || !!pendingChoice}
                placeholder={pendingChoice ? '請先就上方正史節點做出抉擇……' : '輸入你的行動……（例：前往黃楓谷拜師 / 招攬厲飛雨同行 / 以神識傳音給南宮婉：速離此地 / 出手攻擊邪修）'}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm outline-none focus:border-amber-500 disabled:opacity-50"
              />
              <button
                disabled={busy || !input.trim() || !!pendingChoice}
                onClick={() => submit(input)}
                className="rounded-lg bg-amber-500 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
              >
                行動
              </button>
            </div>
          </div>

          {/* 右：狀態 / 提醒 / 金手指 */}
          <div className="space-y-3">
            {/* 修為 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="mb-1 flex justify-between text-xs text-zinc-400">
                <span>修為</span><span>{expPct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded bg-zinc-800">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${expPct}%` }} />
              </div>
              {expPct >= 100 && (
                <button
                  disabled={busy}
                  onClick={() => attemptBreakthrough()}
                  className="mt-2 w-full rounded-lg border border-amber-600/60 bg-amber-950/40 py-1.5 text-xs font-semibold text-amber-200 transition hover:border-amber-400 disabled:opacity-50"
                >
                  ⚡ 修為圓滿・衝擊瓶頸（突破／渡劫）
                </button>
              )}
            </div>

            {/* 金手指 */}
            {gf && gfRt && (
              <div className="rounded-xl border border-amber-800/50 bg-amber-950/20 p-3">
                <div className="mb-0.5 text-sm font-semibold text-amber-300">金手指 · {gf.name}</div>
                <div className="mb-1 text-xs text-cyan-300/80">
                  {gfRt.awakenLevel ? `✦ 覺醒第${gfRt.awakenLevel}階（威能+${gfRt.awakenLevel * 30}%）` : '尚未覺醒'} · 已動用 {gfRt.usesTotal} 次
                </div>
                <div className="mb-1 flex justify-between text-xs text-zinc-400">
                  <span>能量</span><span>{Math.floor(gfRt.energy)}/{gf.energyMax}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded bg-zinc-800">
                  <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300" style={{ width: `${gfPct}%` }} />
                </div>
                <div className="mt-1 text-xs text-zinc-400">業力 {Math.floor(gfRt.karma)}/60 {gfRt.suppressedUntilDay && world.clock.totalDays < gfRt.suppressedUntilDay ? '· ⚠ 異常維修中' : ''}</div>
                <button disabled={busy} onClick={() => submit('發動金手指')} className="mt-2 w-full rounded-lg border border-cyan-700/60 bg-cyan-900/30 py-1.5 text-xs text-cyan-200 hover:border-cyan-400 disabled:opacity-50">
                  發動
                </button>
              </div>
            )}

            {/* 世界提醒 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="mb-2 text-sm font-semibold text-amber-300">📜 天機提醒</div>
              <div className="space-y-1.5 text-xs text-zinc-300">
                {reminders.map((r, i) => (
                  <div key={i} className="flex gap-1.5">
                    <span>{r.kind === 'opportunity' ? '✦' : r.kind === 'npc_nearby' ? '👤' : r.kind === 'danger' ? '⚠' : r.kind === 'world_event' ? '🌐' : r.kind === 'sect' ? '⛩️' : '·'}</span>
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 text-xs text-zinc-500">
              提示：世界依正史自然流轉。你可改寫命運，但無法憑空成神。閉關會跳過漫長歲月，期間天下大事照常發生。
            </div>
          </div>
        </div>
      </div>
    </div>
    {showChronicle && <ChroniclePanel world={world} player={player} onClose={() => setShowChronicle(false)} />}
    {showCreate && <CreatePanel onClose={() => setShowCreate(false)} />}
    {showMap && <WorldMapView onClose={() => setShowMap(false)} onTravel={(nm) => submitAction(`前往${nm}`)} />}
    {showBaiYi && <BaiYiPanel world={world} player={player} busy={busy} onClose={() => setShowBaiYi(false)} onAction={(t) => submitAction(t)} />}
    {showAbode && <AbodePanel world={world} player={player} busy={busy} onClose={() => setShowAbode(false)} />}
    {showMarket && <MarketPanel world={world} player={player} busy={busy} onClose={() => setShowMarket(false)} />}
    {showCodex && <CodexPanel world={world} onClose={() => setShowCodex(false)} />}
    {showSect && <SectPanel world={world} player={player} busy={busy} onClose={() => setShowSect(false)} />}
    {showAi && <AiSettingsPanel onClose={() => setShowAi(false)} />}
    {showCharacter && <CanonCharacterPanel world={world} player={player} onClose={() => setShowCharacter(false)} />}
    </>
  );
};

export default CanonView;
