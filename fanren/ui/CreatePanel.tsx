import React, { useState } from 'react';
import { useWorldStore } from '../worldStore';
import { extrapolateMechanicSync } from '../engine/extrapolate';

interface Props { onClose: () => void; }

const KINDS: { k: 'ability' | 'art' | 'recipe'; label: string; hint: string; ph: string }[] = [
  { k: 'art', label: '自創功法', hint: '描述一門功法，系統演繹其修煉/戰鬥效果', ph: '例：一門以心跳為節律、越戰越快的雷遁劍訣……' },
  { k: 'recipe', label: '自創/改良丹方', hint: '描述一爐丹藥，演繹其配方與效果（並煉成樣品）', ph: '例：以百年靈乳與凝血草為主，溫養神魂、助益築基的丹藥……' },
  { k: 'ability', label: '領悟異能', hint: '描述一種神通/異能/體質', ph: '例：我能短暫窺見一線天機，趨吉避凶……' },
];

const CreatePanel: React.FC<Props> = ({ onClose }) => {
  const createMechanic = useWorldStore((s) => s.createMechanic);
  const busy = useWorldStore((s) => s.busy);
  const [text, setText] = useState('');
  const [kind, setKind] = useState<'ability' | 'art' | 'recipe'>('art');
  const cur = KINDS.find((x) => x.k === kind)!;
  const preview = text.trim().length >= 4 ? extrapolateMechanicSync(text, kind) : null;

  const submit = async () => {
    if (!text.trim() || busy) return;
    await createMechanic(text.trim(), kind);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-6 w-full max-w-2xl rounded-2xl border border-amber-800/50 bg-zinc-900 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-300">✦ 演繹・自創</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-amber-500">關閉</button>
        </div>
        <div className="mb-3 flex gap-2">
          {KINDS.map((x) => (
            <button
              key={x.k}
              onClick={() => setKind(x.k)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition ${kind === x.k ? 'border-amber-400 bg-amber-500/20 text-amber-100' : 'border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-amber-600'}`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <div className="mb-2 text-xs text-zinc-400">{cur.hint}。系統將把你的文字「演繹」成受平衡約束、可執行的機制。</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder={cur.ph}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm outline-none focus:border-amber-500"
        />
        {preview && (
          <div className="mt-3 rounded-lg border border-amber-700/40 bg-amber-950/20 p-3 text-xs">
            <div className="font-semibold text-amber-300">即時推演（離線預覽）：「{preview.name}」 · {preview.category} · {preview.powerTier}/5階</div>
            <div className="mt-1 text-zinc-300">{preview.summary}</div>
            <div className="mt-1 text-zinc-400">觸發：{preview.triggers.map((t) => t.on).join('、')}</div>
            <div className="mt-1 text-rose-300/70">限制：{preview.limits.join('；')}　風險：{preview.risks.join('；')}</div>
            <div className="mt-1 text-cyan-300/70">＊確認後若已設定 AI 金鑰，將由 AI 進一步精煉並再經平衡器約束。</div>
          </div>
        )}
        <button
          disabled={!text.trim() || busy}
          onClick={submit}
          className="mt-3 w-full rounded-xl bg-amber-500 py-2.5 font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
        >
          {busy ? '演繹中……' : '演繹成形'}
        </button>
      </div>
    </div>
  );
};

export default CreatePanel;
