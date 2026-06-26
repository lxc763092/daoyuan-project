/**
 * AI 服务配置
 * 支持多种 AI 服务提供商，通过环境变量轻松切换
 *
 * 默认使用 GLM（智谱）作为 AI 接口
 * 如需切换，设置环境变量 VITE_AI_PROVIDER
 */

export type AIProvider = 'siliconflow' | 'glm' | 'openai' | 'custom';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  apiUrl: string;
  model: string;
  useProxy: boolean; // 是否使用代理（开发环境）
  proxyPath?: string; // 代理路径
}

// 预设的 AI 服务配置
const AI_PROVIDERS: Record<
  AIProvider,
  {
    defaultUrl: string;
    defaultModel: string;
    proxyPath: string;
  }
> = {
  siliconflow: {
    defaultUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    defaultModel: 'Qwen/Qwen2.5-72B-Instruct',
    proxyPath: '/api/v1/chat/completions',
  },
  glm: {
    defaultUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    defaultModel: 'glm-4.5v',
    proxyPath: '/api/paas/v4/chat/completions',
  },
  openai: {
    defaultUrl: 'https://api.openai.com/v1/chat/completions',
    defaultModel: 'gpt-4o-mini',
    proxyPath: '/api/v1/chat/completions',
  },
  custom: {
    defaultUrl: '',
    defaultModel: '',
    proxyPath: '/api/v1/chat/completions',
  },
};

// ──────────────────────────────────────────────
// 玩家自填設定（runtime override）：存於 localStorage，疊加於環境變數之上。
// 用途：分享版（免安裝 exe）不內建任何金鑰；每位玩家於遊戲內「AI 設定」面板填自己的 key，
// 即時生效、不需重新打包，也不會把金鑰編進分享檔。
// ──────────────────────────────────────────────
export const AI_OVERRIDE_KEY = 'fanren_ai_cfg_v1';

export interface AIOverride {
  provider?: AIProvider;
  apiKey?: string;
  apiUrl?: string;
  model?: string;
  useProxy?: boolean;
}

export function getAiOverride(): AIOverride {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(AI_OVERRIDE_KEY);
    return raw ? (JSON.parse(raw) as AIOverride) : {};
  } catch {
    return {};
  }
}

export function setAiOverride(o: AIOverride): void {
  try {
    localStorage.setItem(AI_OVERRIDE_KEY, JSON.stringify(o));
  } catch {
    /* localStorage 不可用時靜默 */
  }
}

export function clearAiOverride(): void {
  try {
    localStorage.removeItem(AI_OVERRIDE_KEY);
  } catch {
    /* ignore */
  }
}

/** 供 UI 取得各服務商的預設 URL／模型（顯示為 placeholder）。 */
export function providerDefaults(provider: AIProvider): { defaultUrl: string; defaultModel: string } {
  const p = AI_PROVIDERS[provider] || AI_PROVIDERS.siliconflow;
  return { defaultUrl: p.defaultUrl, defaultModel: p.defaultModel };
}

/**
 * 获取 AI 配置（玩家 localStorage 設定 > 環境變數 > 服務商預設）
 */
export function getAIConfig(): AIConfig {
  const isDev = import.meta.env.DEV;
  const ov = getAiOverride();

  // 优先玩家設定，其次环境变量
  const provider = (ov.provider ||
    import.meta.env.VITE_AI_PROVIDER ||
    'siliconflow') as AIProvider;
  const apiKey = (ov.apiKey ?? import.meta.env.VITE_AI_KEY) || '';
  const customApiUrl = ov.apiUrl || import.meta.env.VITE_AI_API_URL;
  const customModel = ov.model || import.meta.env.VITE_AI_MODEL;
  const proxyPreference =
    ov.useProxy === undefined ? import.meta.env.VITE_AI_USE_PROXY : String(ov.useProxy);

  // 获取预设配置
  const providerConfig = AI_PROVIDERS[provider] || AI_PROVIDERS.glm;

  // 构建配置
  const apiUrl = providerConfig.defaultUrl;
  const model = customModel || providerConfig.defaultModel;
  const proxyPath = providerConfig.proxyPath;

  // 是否应该使用内置代理路径
  let shouldUseProxy = false;
  if (!customApiUrl) {
    if (proxyPreference === 'true') {
      // 显式开启（适用于 Vercel 等生产环境）
      shouldUseProxy = true;
    } else if (proxyPreference === 'false') {
      shouldUseProxy = false;
    } else {
      // 未设置时，开发环境默认开启代理，生产环境默认关闭
      shouldUseProxy = isDev;
    }
  }

  // 确定最终使用的 URL
  let finalApiUrl: string;
  if (customApiUrl) {
    finalApiUrl = customApiUrl;
  } else if (shouldUseProxy) {
    finalApiUrl = proxyPath;
  } else {
    finalApiUrl = apiUrl;
  }

  return {
    provider,
    apiKey,
    apiUrl: finalApiUrl,
    model,
    useProxy: shouldUseProxy,
    proxyPath,
  };
}

/**
 * 验证配置
 */
export function validateAIConfig(config: AIConfig): {
  valid: boolean;
  error?: string;
} {
  // 只有在未启用代理且缺少前端密钥时才视为无效
  if (!config.apiKey && !config.useProxy) {
    return {
      valid: false,
      error:
        'VITE_AI_KEY 环境变量未设置。请创建 .env.local 文件并配置 API Key。',
    };
  }

  if (!config.apiUrl) {
    return {
      valid: false,
      error: 'API URL 未配置。请设置 VITE_AI_API_URL 环境变量。',
    };
  }

  if (!config.model) {
    return {
      valid: false,
      error: 'AI 模型未配置。请设置 VITE_AI_MODEL 环境变量。',
    };
  }

  return { valid: true };
}

/** 以一次極小請求測試目前設定是否可用。回傳 { ok, message }。 */
export async function testAiConnection(): Promise<{ ok: boolean; message: string }> {
  const cfg = getAIConfig();
  const v = validateAIConfig(cfg);
  if (!v.valid) return { ok: false, message: v.error || '設定無效' };
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;
    const res = await fetch(cfg.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: cfg.model,
        messages: [{ role: 'user', content: '回覆「ok」二字即可。' }],
        max_tokens: 4,
        stream: false,
      }),
    });
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.text()).slice(0, 160); } catch { /* ignore */ }
      return { ok: false, message: `連線失敗（HTTP ${res.status}）${detail ? '：' + detail : ''}` };
    }
    return { ok: true, message: '連線成功，AI 敘事已可使用。' };
  } catch (e) {
    return { ok: false, message: '無法連線：' + (e instanceof Error ? e.message : String(e)) };
  }
}

/**
 * 获取配置信息（用于调试）
 */
export function getAIConfigInfo(): string {
  const config = getAIConfig();
  const validation = validateAIConfig(config);

  return `
AI 服务配置:
- 提供商: ${config.provider}
- API URL: ${config.apiUrl}
- 模型: ${config.model}
- 使用代理: ${config.useProxy}
- API Key: ${config.apiKey ? '已设置' : '未设置'}
- 配置状态: ${validation.valid ? '✅ 有效' : '❌ 无效'}
${validation.error ? `- 错误: ${validation.error}` : ''}
  `.trim();
}
