import React from 'react';
import { SealBadge, Wordmark } from './Brand';

interface Props {
  onCanon: () => void;
  onClassic: () => void;
}

const ModeChooser: React.FC<Props> = ({ onCanon, onClassic }) => {
  return (
    <div className="h-screen w-full overflow-y-auto ink-wash px-4 text-zinc-100">
      <div className="flex min-h-full items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center animate-fade-in">
          <SealBadge size={84} />
          <Wordmark className="mt-4" titleClassName="text-3xl sm:text-4xl" sub="一介凡人的修真編年史" />
          <p className="mt-3 text-sm text-[#8aa89b]">擇徑而行 · 你的仙途自此分流</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={onCanon}
            className="group rounded-2xl border border-[#3f6e5c] bg-gradient-to-b from-[#13352b]/60 to-zinc-900 p-6 text-left transition hover:border-[#74b69b] hover:shadow-lg hover:shadow-emerald-900/30"
          >
            <div className="mb-2 text-xl font-bold text-[#9fdcc4]">凡人 · 編年史模式</div>
            <div className="text-sm text-zinc-300">
              以《凡人修仙傳》正史為骨架的文字冒險。自定義金手指、動態回合、世界隨時間自然演化、可改寫他人命運。輸入文字驅動你的仙途。
            </div>
            <div className="mt-3 text-xs text-[#74b69b]/80">★ 全新主玩法</div>
          </button>
          <button
            onClick={onClassic}
            className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-6 text-left transition hover:border-zinc-500"
          >
            <div className="mb-2 text-xl font-bold text-zinc-200">經典 · 放置歷練模式</div>
            <div className="text-sm text-zinc-400">
              原有的點擊歷練／修煉／突破玩法，AI 隨機事件、裝備、靈寵、宗門、煉丹一應俱全。
            </div>
            <div className="mt-3 text-xs text-zinc-500">既有玩法</div>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ModeChooser;
