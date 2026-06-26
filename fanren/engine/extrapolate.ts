/** AI 演繹器：以 LLM 把玩家自由文本推演成 MechanicSpec；無金鑰或失敗時退回離線規則演繹。最終一律經平衡器約束。 */
import { getAIConfig, validateAIConfig } from '../../config/aiConfig';
import { balanceSpec, extrapolateOffline } from './mechanics';
import type { MechEffect, MechEffectType, MechStatKey, MechTriggerOn, MechTriggerRule, MechanicSpec } from '../types';

const EFFECT_TYPES: MechEffectType[] = ['permanent_gain', 'cultivation_mult', 'exp', 'resource', 'luck', 'heal', 'craft_bonus', 'lifespan', 'karma', 'narrative'];
const STAT_KEYS: MechStatKey[] = ['attack', 'defense', 'spirit', 'physique', 'speed', 'maxHp'];
const TRIGGER_ONS: MechTriggerOn[] = ['devour', 'kill', 'cultivate', 'explore', 'craft', 'breakthrough', 'inspect', 'activate', 'passive', 'turn'];

const SYSTEM = `你是修仙文字遊戲的「規則演繹引擎」。玩家會用自由文本描述一種異能／功法／丹方，你要把它演繹成「結構化、平衡、可被程式執行」的機制規格，輸出純 JSON（不得有 JSON 以外文字）。
鐵則：
1. 任何力量都必須有「限制(limits)」與「風險(risks)」——不存在無代價、無上限、無敵的能力。
2. 禁忌類（吞噬屍體/奪舍/吸取他人修為等魔道手段）必須含 karma（業力）代價，並在 risks 標明心魔/反噬/正道仇視。
3. 數值要克制：powerTier 1–5；permanent_gain 每次觸發增量小（約 0.3×tier ~ 1×tier），務必設 capPerDay 與 capTotal 及 diminish(遞減)。
4. 緊扣《凡人修仙傳》世界觀（吞噬→魔功路線、業力天劫、靈根境界）。
5. triggers.on 僅能用：devour|kill|cultivate|explore|craft|breakthrough|inspect|activate|passive|turn。
6. effects.type 僅能用：permanent_gain|cultivation_mult|exp|resource|luck|heal|craft_bonus|lifespan|karma|narrative；permanent_gain 須帶 stat（attack|defense|spirit|physique|speed|maxHp）。

輸出 JSON 結構：
{"name":"精煉名稱","category":"forbidden|cultivation|combat|body|agility|craft|fortune|knowledge|drain|vitality|generic","powerTier":1-5,"summary":"一句機制說明","flavorVerbs":["觸發詞..."],"triggers":[{"on":"devour","effects":[{"type":"permanent_gain","stat":"attack","amount":1.5,"capPerDay":4,"capTotal":40,"diminish":0.02,"note":"..."},{"type":"karma","amount":3}]}],"limits":["..."],"risks":["..."]}`;

function buildUser(rawText: string, kind: string): string {
  const kindLabel = kind === 'art' ? '功法' : kind === 'recipe' ? '丹方' : kind === 'finger' ? '金手指' : '異能';
  return `玩家描述（類型：${kindLabel}）：\n「${rawText}」\n\n請演繹為合法 JSON MechanicSpec。`;
}

async function callMechanicLLM(rawText: string, kind: string): Promise<any | null> {
  try {
    const cfg = getAIConfig();
    if (!validateAIConfig(cfg).valid) return null;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;
    const res = await fetch(cfg.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model: cfg.model, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: buildUser(rawText, kind) }], temperature: 0.7, max_tokens: 700, stream: false }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    let content: string = data?.choices?.[0]?.message?.content || '';
    content = content.trim().replace(/^```json?/i, '').replace(/```$/, '').trim();
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start < 0 || end < 0) return null;
    return JSON.parse(content.slice(start, end + 1));
  } catch {
    return null;
  }
}

function sanitizeTriggers(raw: any): MechTriggerRule[] {
  if (!Array.isArray(raw)) return [];
  const out: MechTriggerRule[] = [];
  for (const tr of raw) {
    if (!tr || !TRIGGER_ONS.includes(tr.on)) continue;
    const effects: MechEffect[] = [];
    for (const e of tr.effects || []) {
      if (!e || !EFFECT_TYPES.includes(e.type)) continue;
      if (e.type === 'permanent_gain' && !STAT_KEYS.includes(e.stat)) continue;
      effects.push({
        type: e.type,
        stat: STAT_KEYS.includes(e.stat) ? e.stat : undefined,
        amount: typeof e.amount === 'number' ? e.amount : 0,
        capPerDay: typeof e.capPerDay === 'number' ? e.capPerDay : undefined,
        capTotal: typeof e.capTotal === 'number' ? e.capTotal : undefined,
        diminish: typeof e.diminish === 'number' ? e.diminish : undefined,
        note: typeof e.note === 'string' ? e.note : undefined,
      });
    }
    if (effects.length) out.push({ on: tr.on, effects });
  }
  return out;
}

/** 主入口：演繹一段文本為平衡後的 MechanicSpec。永不拋錯。 */
export async function extrapolateMechanic(rawText: string, kind: MechanicSpec['kind'], idSeed = 'm'): Promise<MechanicSpec> {
  const offline = extrapolateOffline(rawText, kind, idSeed);
  const llm = await callMechanicLLM(rawText, kind);
  if (!llm) return offline;
  const triggers = sanitizeTriggers(llm.triggers);
  if (!triggers.length) return offline; // LLM 結果不可用 → 用離線
  const spec: MechanicSpec = {
    id: offline.id,
    name: typeof llm.name === 'string' && llm.name.trim() ? llm.name.trim().slice(0, 10) : offline.name,
    kind,
    rawText,
    summary: typeof llm.summary === 'string' ? llm.summary : offline.summary,
    category: typeof llm.category === 'string' ? llm.category : offline.category,
    powerTier: typeof llm.powerTier === 'number' ? llm.powerTier : offline.powerTier,
    flavorVerbs: Array.isArray(llm.flavorVerbs) && llm.flavorVerbs.length ? llm.flavorVerbs.filter((v: any) => typeof v === 'string') : offline.flavorVerbs,
    triggers,
    limits: Array.isArray(llm.limits) ? llm.limits.filter((v: any) => typeof v === 'string') : offline.limits,
    risks: Array.isArray(llm.risks) ? llm.risks.filter((v: any) => typeof v === 'string') : offline.risks,
    source: 'llm',
    usesTotal: 0,
    gainedByEffect: {},
    dailyByEffect: {},
    lastDay: 0,
  };
  return balanceSpec(spec);
}

/** 同步版（創角等需即時、不等 LLM 的場合）：直接離線演繹。 */
export function extrapolateMechanicSync(rawText: string, kind: MechanicSpec['kind'], idSeed = 'm'): MechanicSpec {
  return extrapolateOffline(rawText, kind, idSeed);
}
