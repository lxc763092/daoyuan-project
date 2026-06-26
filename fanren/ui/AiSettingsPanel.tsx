import React, { useState } from 'react';
import {
  type AIProvider,
  getAiOverride,
  setAiOverride,
  clearAiOverride,
  providerDefaults,
  testAiConnection,
} from '../../config/aiConfig';

const PROVIDERS: { key: AIProvider; label: string }[] = [
  { key: 'siliconflow', label: 'SiliconFlow（矽基流動）' },
  { key: 'glm', label: 'GLM（智譜）' },
  { key: 'openai', label: 'OpenAI' },
  { key: 'custom', label: '自訂（OpenAI 相容介面）' },
];

const Props: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const init = getAiOverride();
  const [provider, setProvider] = useState<AIProvider>(init.provider || 'siliconflow');
  const [apiKey, setApiKey] = useState(init.apiKey || '');
  const [apiUrl, setApiUrl] = useState(init.apiUrl || '');
  const [model, setModel] = useState(init.model || '');
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<{ kind: 'idle' | 'ok' | 'err' | 'busy'; msg: string }>({ kind: 'idle', msg: '' });

  const def = providerDefaults(provider);

  const persist = () => {
    setAiOverride({
      provider,
      apiKey: apiKey.trim(),
      apiUrl: apiUrl.trim() || undefined,
      model: model.trim() || undefined,
      useProxy: false, // 桌面／單機版無代理伺服器，一律直連
    });
  };

  const onSave = () => {
    persist();
    setStatus({ kind: 'ok', msg: '已儲存。設定即時生效，下回合敘事即會採用。' });
  };

  const onClear = () => {
    clearAiOverride();
    setProvider('siliconflow'); setApiKey(''); setApiUrl(''); setModel('');
    setStatus({ kind: 'idle', msg: '已清除本機 AI 設定（將回到內建模板敘事）。' });
  };

  const onTest = async () => {
    persist(); // 先存再測，確保測的是當前輸入
    setStatus({ kind: 'busy', msg: '測試連線中…' });
    const r = await testAiConnection();
    setStatus({ kind: r.ok ? 'ok' : 'err', msg: r.message });
  };

  const field = 'w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-500';
  const label = 'mb-1 block text-xs text-zinc-400';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4" onClick={onClose}>
      <div className="my-6 w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-950/95 p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-300">🔑 AI 敘事設定</h2>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:border-amber-500">關閉</button>
        </div>

        <p className="mb-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-xs leading-relaxed text-zinc-400">
          填入<strong className="text-zinc-200">你自己的 API 金鑰</strong>後，遊戲敘事會交給 AI 潤飾。設定只存在<strong className="text-zinc-200">本機（這台電腦）</strong>，不會上傳、也不會包進分享檔。<br />
          留空不填亦可正常遊玩——此時採用<strong className="text-zinc-200">內建模板敘事</strong>（離線可用）。
        </p>

        <div className="space-y-3">
          <div>
            <label className={label}>服務商</label>
            <select className={field} value={provider} onChange={(e) => setProvider(e.target.value as AIProvider)}>
              {PROVIDERS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
          </div>

          <div>
            <label className={label}>API 金鑰（API Key）</label>
            <div className="flex gap-2">
              <input
                className={field}
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="貼上你的 API Key（如 sk-...）"
                autoComplete="off"
                spellCheck={false}
              />
              <button onClick={() => setShowKey((s) => !s)} className="shrink-0 rounded-lg border border-zinc-700 px-3 text-xs text-zinc-300 hover:border-amber-500">{showKey ? '隱藏' : '顯示'}</button>
            </div>
          </div>

          <div>
            <label className={label}>API 端點（留空＝用服務商預設）</label>
            <input className={field} value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} placeholder={def.defaultUrl || 'https://.../v1/chat/completions'} spellCheck={false} />
          </div>

          <div>
            <label className={label}>模型（留空＝用服務商預設）</label>
            <input className={field} value={model} onChange={(e) => setModel(e.target.value)} placeholder={def.defaultModel || 'model-name'} spellCheck={false} />
          </div>
        </div>

        {status.kind !== 'idle' && (
          <div className={`mt-3 rounded-lg border p-2.5 text-xs ${status.kind === 'ok' ? 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300' : status.kind === 'err' ? 'border-rose-700/60 bg-rose-950/30 text-rose-300' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300'}`}>
            {status.msg}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={onSave} className="rounded-lg border border-amber-600/70 bg-amber-950/40 px-4 py-1.5 text-sm text-amber-200 hover:border-amber-400">儲存</button>
          <button onClick={onTest} disabled={status.kind === 'busy'} className="rounded-lg border border-emerald-700/60 bg-emerald-950/30 px-4 py-1.5 text-sm text-emerald-200 hover:border-emerald-400 disabled:opacity-50">測試連線</button>
          <button onClick={onClear} className="ml-auto rounded-lg border border-zinc-700 px-4 py-1.5 text-sm text-zinc-400 hover:border-rose-500 hover:text-rose-300">清除設定</button>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
          注意：金鑰僅存於本機瀏覽器儲存空間（localStorage）。本作為非商業同人作品；AI 服務由你自行向所選服務商申請與付費，與本遊戲無涉。
        </p>
      </div>
    </div>
  );
};

export default Props;
