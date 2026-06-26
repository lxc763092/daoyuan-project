/** GM-AI 服務：以世界規則敘事化回合結果。可用 LLM（依既有 aiConfig/proxy），無金鑰時用確定性後備敘事。 */
import type {
  FanrenWorldState,
  GovernorVerdict,
  NpcReaction,
  ParsedIntent,
} from '../types';
import { getAIConfig, validateAIConfig } from '../../config/aiConfig';
import { formatTime } from './clock';
import { getRegion } from './daoyuanLoader';

export interface GmContext {
  world: FanrenWorldState;
  intent: ParsedIntent;
  verdict: GovernorVerdict;
  daysElapsed: number;
  mechanicalOutcome: string; // 引擎已決定的數值/狀態結果（GM 不得推翻）
  firedSummaries: string[];
  reactions: NpcReaction[];
  playerRealm: string;
  playerName: string;
  mechanics?: { name: string; category: string; summary: string }[]; // 玩家自訂異能/功法
  activeMechanic?: string; // 本回合發動的異能名（若有）
  presentNpcs?: { name: string; activity: string; realm: string }[]; // 此刻確實在場、可登場的原著人物
  party?: string[]; // 同行隊友名單
}

const GM_SYSTEM_PROMPT = `你是修仙文字冒險遊戲《道元紀》的遊戲主持人（GM）。鐵則：
1. 你是「裁判與敘事者」，不是玩家的盟友，也不替玩家開掛。
2. 【數值結果由引擎決定】下方會給你「機制結果」，你只能把它敘事化，絕不可推翻、誇大或新增引擎未授予的收穫（不得讓玩家憑空獲得境界、法寶、靈石或擊敗遠超實力的對手）。
3. 嚴守世界觀（《凡人修仙傳》設定）與玩家「當前進度」，不得洩漏玩家修為/進度尚不該知道的未來秘辛。
4. NPC 有自己的意志與實力；依其性格與境界合理反應。
5. 【玩家自訂異能】玩家可能身懷自創的異能/功法（下方〔玩家異能〕列出其名稱、類型與本質）。當其於本回合發動時（見〔本回合發動〕），務必依該異能的「性質與風味」生動描寫其施展過程、外顯異象與身心感受，使敘事與該設定一致；但具體得失一律以〔機制結果〕為準，不得新增引擎未授予的效果。禁忌類（如吞噬屍體）應寫出其陰森、招業力與反噬的代價感。
6. 【嚴守人物時空】只有〔在場人物〕列出者方可於此刻此地登場互動。凡未列出的原著角色，一律不得出現於敘事中（其或尚未登場/出生、或身在他方、或正閉關渡劫）——絕不可讓他們憑空現身或與玩家攀談、組隊。〔同行〕為玩家現有隊友。
7. 【絕不出戲·即興本界化】敘事中絕不可出現現代、科幻或異世界事物（手機、槍砲、電腦、汽車、外星人、機器人、西方魔法師等）。若玩家輸入夾帶此類詞語（見〔裁決〕），一律以《凡人修仙傳》對應之物代換（傳音符、飛劍、遁光、靈石、夜明珠…），或視為本界所無，維持古典東方修真氛圍。當玩家提及遊戲未明文涵蓋、但合乎世界觀的玩法／制度／事物（如賭坊、懸賞、結拜、藥園拍賣…）時，請依本界邏輯即興將其合理化，使之自然成為這方天地的一部分，而非生硬拒絕。
8. 第二人稱、現在式，文風凝練有畫面感，120–220 字，繁體中文。只輸出敘事，不要列點、不要解釋規則、不要 JSON。`;

/** 組裝給 LLM 的上下文。 */
function buildUserPrompt(ctx: GmContext): string {
  const region = getRegion(ctx.world.currentLocationId);
  const reacts = ctx.reactions.length
    ? ctx.reactions.map((r) => `${r.npcName}：${r.action}`).join('；')
    : '無明顯他人反應';
  const world = ctx.firedSummaries.length ? ctx.firedSummaries.join('；') : '天下暫無大事波及此處';
  return [
    `【時間】${formatTime(ctx.world.clock)}（流逝約${ctx.daysElapsed}日）`,
    `【地點】${region?.name || ctx.world.currentLocationId}：${region?.description || ''}`,
    `【玩家】${ctx.playerName}，修為${ctx.playerRealm}`,
    `【玩家行動】${ctx.intent.rawText}（意圖：${ctx.intent.type}）`,
    ctx.verdict.decision !== 'allow' ? `【裁決】${ctx.verdict.decision}：${ctx.verdict.reason}` : '',
    `【機制結果（不可推翻）】${ctx.mechanicalOutcome}`,
    ctx.mechanics && ctx.mechanics.length ? `【玩家異能】${ctx.mechanics.map((m) => `${m.name}（${m.category}）：${m.summary}`).join('；')}` : '',
    ctx.activeMechanic ? `【本回合發動】${ctx.activeMechanic}` : '',
    ctx.presentNpcs && ctx.presentNpcs.length
      ? `【在場人物（僅此數人可登場，餘者不得出現）】${ctx.presentNpcs.map((n) => `${n.name}（${n.realm}；${(n.activity || '').slice(0, 24)}）`).join('；')}`
      : '【在場人物】此處別無相識的原著人物，不要讓任何具名角色登場',
    ctx.party && ctx.party.length ? `【同行】${ctx.party.join('、')}` : '',
    `【周遭反應】${reacts}`,
    `【天下動向】${world}`,
    `請將以上敘事化為一段沉浸式描述。`,
  ]
    .filter(Boolean)
    .join('\n');
}

/** 後備確定性敘事（無 LLM 或失敗時）。完全可離線遊玩。 */
export function fallbackNarrate(ctx: GmContext): string {
  const region = getRegion(ctx.world.currentLocationId);
  const place = region?.name || ctx.world.currentLocationId;
  const parts: string[] = [];
  if (ctx.verdict.decision === 'reject') {
    return ctx.mechanicalOutcome; // 已含越權回饋
  }
  if (ctx.verdict.decision === 'reframe' && ctx.verdict.reframedAs) {
    parts.push(ctx.verdict.reframedAs);
  }
  let head = `${place}，${formatTime(ctx.world.clock)}。`;
  if (ctx.daysElapsed >= 360) head += `（不知不覺間，${Math.round(ctx.daysElapsed / 360)}載春秋已逝）`;
  else if (ctx.daysElapsed >= 30) head += `（約莫${Math.round(ctx.daysElapsed / 30)}月光陰流轉）`;
  parts.push(head);
  parts.push(ctx.mechanicalOutcome);
  const reacts = ctx.reactions.slice(0, 3).map((r) => `${r.npcName}${r.action}`);
  if (reacts.length) parts.push(reacts.join('；'));
  for (const s of ctx.firedSummaries.slice(0, 3)) parts.push(s);
  return parts.join('\n\n');
}

interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

/** 呼叫 LLM（OpenAI 相容介面：GLM/SiliconFlow）。失敗則回 null。 */
async function callLLM(messages: ChatMessage[]): Promise<string | null> {
  try {
    const cfg = getAIConfig();
    const v = validateAIConfig(cfg);
    if (!v.valid) return null;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;
    const res = await fetch(cfg.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: cfg.model,
        messages,
        temperature: 0.85,
        max_tokens: 500,
        stream: false,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const content: string | undefined = data?.choices?.[0]?.message?.content;
    return content ? String(content).trim() : null;
  } catch {
    return null;
  }
}

/** 主敘事入口：優先 LLM，否則後備。永不拋錯。 */
export async function narrate(ctx: GmContext): Promise<{ text: string; usedLLM: boolean }> {
  if (ctx.verdict.decision === 'reject') {
    return { text: ctx.mechanicalOutcome, usedLLM: false };
  }
  const llm = await callLLM([
    { role: 'system', content: GM_SYSTEM_PROMPT },
    { role: 'user', content: buildUserPrompt(ctx) },
  ]);
  if (llm) return { text: llm, usedLLM: true };
  return { text: fallbackNarrate(ctx), usedLLM: false };
}
