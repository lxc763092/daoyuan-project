import React from 'react';
import type { FanrenWorldState } from '../types';
import type { PlayerStats } from '../../types';
import { formatTime } from '../engine/clock';
import { canonRealmDisplay } from '../engine/realm';
import { SealMark } from './Brand';

interface Props {
  world: FanrenWorldState;
  player: PlayerStats;
  onRestart: () => void;
}

const CanonGameOver: React.FC<Props> = ({ world, player, onRestart }) => {
  const go = world.gameOver;
  const years = Math.max(1, Math.round((world.clock?.totalDays || 0) / 360));
  const diverged = (world.divergences || []).length;
  const important = (world.memory || []).filter((m) => m.important).slice(-8);
  const arts = Object.values(world.baiyi || {}).filter((b) => b.rank >= 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto ink-wash p-4 text-zinc-100">
      <div className="my-6 w-full max-w-2xl space-y-4 text-center">
        <SealMark size={76} className="mx-auto opacity-70 grayscale" />
        <h1 className="brand-serif text-3xl font-bold tracking-widest text-rose-300">身死道消</h1>
        <p className="px-4 text-sm text-zinc-300">{go?.cause || '你的仙途，至此終結。'}</p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-left text-sm text-zinc-300">
          <div className="space-y-1">
            <div><span className="text-zinc-500">道號：</span>{player.name}（{canonRealmDisplay(world, player.realm, player.realmLevel)}）</div>
            <div><span className="text-zinc-500">享修真歲月：</span>約 {years} 載（歿於 {formatTime(world.clock)}）</div>
            <div><span className="text-zinc-500">改寫的命運：</span>{diverged} 樁時間線變局</div>
            {arts.length > 0 && <div><span className="text-zinc-500">所成百藝：</span>{arts.map((a) => a.name).join('、')}</div>}
            {world.party?.members?.length ? <div><span className="text-zinc-500">同行至終：</span>{world.party.members.map((m) => m.name).join('、')}</div> : null}
          </div>
        </div>

        {important.length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left">
            <div className="mb-2 text-sm font-semibold text-amber-300/90">此生要事</div>
            <div className="space-y-1 text-xs text-zinc-400">
              {important.map((m, i) => (
                <div key={i}>· 第{Math.floor(m.day / 360) + 1}年　{m.summary}</div>
              ))}
            </div>
          </div>
        )}

        <p className="px-6 text-xs leading-relaxed text-zinc-500">
          仙途凶險，一步踏錯便是萬劫不復。此身既已隕落，神魂俱滅，再無重來之機——<br />
          這方天地的因果長河，從此少了你這道漣漪。唯有另起爐灶，以新身重入紅塵，再走一遭。
        </p>

        <button
          onClick={onRestart}
          className="rounded-lg border border-[#4f8f78] bg-emerald-950/40 px-6 py-2.5 text-sm font-semibold text-[#9fdcc4] transition hover:border-[#74b69b]"
        >
          重啟仙途（以新身入世）
        </button>
      </div>
    </div>
  );
};

export default CanonGameOver;
