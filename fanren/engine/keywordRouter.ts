/** 關鍵字捕獲 + 意圖解析：把玩家自由文本映射到遊戲機制。 */
import type { IntentType, ParsedIntent, TimeScale } from '../types';
import { DAYS_PER_YEAR, DAYS_PER_MONTH } from './clock';

// 中文數字 → 阿拉伯
const CN_NUM: Record<string, number> = {
  零: 0, 一: 1, 兩: 2, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 百: 100, 千: 1000, 万: 10000, 萬: 10000,
};
function parseCnNumber(s: string): number | null {
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  let total = 0;
  let section = 0;
  let num = 0;
  for (const ch of s) {
    const v = CN_NUM[ch];
    if (v === undefined) return null;
    if (v >= 10) {
      if (v === 10000) {
        section = (section + num) * v;
        total += section;
        section = 0;
      } else {
        section += (num || 1) * v;
      }
      num = 0;
    } else {
      num = num * 10 + v;
    }
  }
  return total + section + num;
}

/** 由文本擷取時間跨度（天）。支援「閉關十年」「三個月」「五日」「百年」。 */
export function extractDuration(text: string): { days?: number; scale: TimeScale } {
  const m = text.match(/([\d一二兩三四五六七八九十百千万萬]+)\s*(年|載|個月|月|旬|天|日|甲子)/);
  if (m) {
    let n = parseCnNumber(m[1]) ?? 1;
    const unit = m[2];
    let days: number;
    if (unit === '甲子') days = n * 60 * DAYS_PER_YEAR;
    else if (unit === '年' || unit === '載') days = n * DAYS_PER_YEAR;
    else if (unit === '個月' || unit === '月') days = n * DAYS_PER_MONTH;
    else if (unit === '旬') days = n * 10;
    else days = n; // 天/日
    let scale: TimeScale = 'short';
    if (days >= 3600) scale = 'epoch';
    else if (days >= 180) scale = 'long';
    else if (days >= 15) scale = 'medium';
    else if (days >= 1) scale = 'short';
    else scale = 'instant';
    return { days, scale };
  }
  return { scale: 'short' };
}

interface RouteRule {
  type: IntentType;
  patterns: RegExp[];
  scale?: TimeScale;
}

const NATURAL_QUERY_RE = /(?:哪些|那些|哪幾|有誰|何人|誰在|是誰|什麼|何事|如何|怎麼|哪裡|何處|多少|可有|是否|嗎|呢|[？?])(?:[^。！!]*$)/;
const PASSIVE_LOOK_RE = /^(?:查看|看看|觀察|观察|檢視|检视|打量|瞧瞧|環顧|环顾)/;
const LOCAL_SCOPE_RE = /(?:此地|此處|此处|這裡|这里|附近|四周|周圍|周围|周遭|眼前|在場|在场|谷內|谷内|宗內|宗内|城內|城内)/;
const LOCAL_PERSON_RE = /(?:修士|人物|弟子|長老|长老|同道|有誰|有谁|誰在|谁在|何人)/;
const LOCAL_QUERY_RE = /(?:哪些|那些|哪幾|哪几|有誰|有谁|誰在|谁在|何人|看看|查看|瞧瞧|觀察|观察|環視|环视|環顧|环顾|打量)/;

/**
 * 僅辨認「眼前／附近有誰」這類短查詢。
 * 必須同時具備在地範圍、人物目標與查詢語氣，避免模板吞掉帶有其他目的的自由行動。
 */
export function isLocalRosterQuery(rawText: string): boolean {
  const text = (rawText || '').trim().replace(/[？?。！!]+$/g, '');
  if (!text || text.length > 36) return false;
  if (/^(?:環視|环视|環顧|环顾|查看|看看|瞧瞧|觀察|观察)(?:一下)?(?:四周|周遭|附近|眼前)$/.test(text)) return true;
  return LOCAL_SCOPE_RE.test(text) && LOCAL_PERSON_RE.test(text) && LOCAL_QUERY_RE.test(text);
}

// 順序即優先序
const RULES: RouteRule[] = [
  { type: 'use_golden_finger', patterns: [/金手指|外掛|發動.*(瓶|外掛|系統)|催熟|系統面板/], scale: 'instant' },
  { type: 'recall', patterns: [/回憶|想起|回想|記得.*嗎|過去發生/], scale: 'instant' },
  { type: 'inspect', patterns: [
    /^(?:查看天下動向|查看世界局勢|打探消息|打聽風聲|探聽風聲)$/,
    /(?:世界|天下|修仙界).{0,6}(?:動向|局勢|大事|風聲)/,
    /(?:打聽|打探|探聽).{0,6}(?:消息|風聲|天下事|大事)/,
    /(?:最近|近日|近期).{0,6}(?:發生|有).{0,6}(?:什麼|何事|大事)/,
  ], scale: 'instant' },
  { type: 'organize', patterns: [
    /(成立|創立|创立|組建|组建|開設|开设|開創|开创|創建|创建|開宗|开宗|立宗|建派|開派|开派|開山立派|开山立派|招攬.{0,4}(弟子|手下|班底))/,
    /(建立|組成|组成|拉起|拉攏.{0,4}(成|為)).{0,8}(船隊|船团|商團|商团|商會|商行|宗門|宗门|門派|门派|宗派|拍賣行|拍卖行|坊市|護衛團|护卫团|镖局|鏢局|聯盟|联盟|丹閣|丹阁|幫派|帮派|工坊|貨棧|勢力|势力|組織|组织)/,
  ], scale: 'medium' },
  { type: 'cultivate', patterns: [/修煉|修练|閉關|闭关|打坐|吐納|煉化|淬體|沖關|衝關|参悟|參悟|練功/], scale: 'long' },
  { type: 'craft', patterns: [/煉丹|炼丹|煉器|炼器|煉製|炼制|煉寶|種(植|靈草|靈藥)|布陣|佈陣|擺陣|祭煉|制符|製符|畫符|繪符|傀儡|馴獸|御獸|馭獸|煉體|淬體|煉魂|攝魂|醫術|療傷|行醫|劍訣|御劍|練劍|遁術|身法|鑑寶|鑒寶|鑑定|辨識|易容|喬裝|修習|研習|鑽研|習得|練習|鑽研.*之道/], scale: 'medium' },
  { type: 'travel', patterns: [/前往|趕往|去往|去|前去|移動|趕路|飛往|遁往|離開.*前往|返回/], scale: 'medium' },
  // 拜入既有宗門（自行拜入／持升仙令等引薦信物受招）；置於 travel 後，故「前往X拜師」仍走 travel（先抵達）。
  { type: 'join_sect', patterns: [
    /拜入|投入|投奔|投靠|歸入|歸附/,
    /(加入|拜)[^\s，。,！!？?]{0,8}(宗|門|派|教|閣|觀|宮)/,
    /(持|憑|以).{1,6}(升仙令|引薦帖|招賢令|入門令|信物).{0,6}(拜入|入|投|求見|拜)/,
    /拜.{0,3}為師|拜師入門/,
  ], scale: 'medium' },
  { type: 'flee', patterns: [/逃跑|逃離|逃离|逃命|逃脫|逃脱|遁走|遁逃|逃竄|逃窜|撤退|開溜|开溜|溜走|落跑|奪路|夺路|甩脫|甩脱|逃出生天|拔腿|急遁|遠遁|远遁/], scale: 'short' },
  { type: 'fight', patterns: [/攻擊|攻击|出手|斬殺|擊殺|偷襲|交手|戰鬥|战斗|對戰|圍殺|拔劍|動手/], scale: 'short' },
  { type: 'trade', patterns: [/購買|买|購入|出售|賣|販賣|交易|拍賣|兌換/], scale: 'short' },
  { type: 'use_item', patterns: [/服用|服下|使用|取出.*(丹|符|寶)|吃下|飲下|催動.*法寶/], scale: 'instant' },
  { type: 'transmit', patterns: [/傳音|传音|神識傳音|神识传音|以神識.{0,3}(傳|告|語|知會)|密語傳|傳訊|心聲傳/], scale: 'instant' },
  { type: 'party', patterns: [/組隊|组队|結伴|结伴|招攬|招揽|入夥|入伙|拉.{0,3}入(隊|夥|伙)|邀.{0,5}(同行|加入|入隊|組隊|一起|結伴)|一起(走|行動|闖蕩|歷練)|同行|解散(隊伍)?|離隊|离队|退隊|退队|分道揚鑣|分贓|分赃|接受.{0,3}(邀|組隊|同行|入隊)|答應.{0,3}(組隊|同行|加入)/], scale: 'instant' },
  { type: 'talk', patterns: [/與|和|對.*說|交談|攀談|拜訪|請教|詢問|打招呼|結交|說服|威脅|求見/], scale: 'instant' },
  { type: 'explore', patterns: [/探索|歷練|历练|查探|搜尋|搜寻|尋找|尋寶|探查|遊歷|游历|闖/], scale: 'short' },
  { type: 'wait', patterns: [/等待|觀望|静观|靜觀|休息|靜待|蟄伏|蛰伏|按兵不動/], scale: 'medium' },
];

/**
 * 解析意圖。context 提供已知關鍵字（NPC/地點/物品名）以做目標擷取。
 */
export function parseIntent(
  rawText: string,
  context?: { npcNames?: string[]; locationNames?: string[]; itemNames?: string[] }
): ParsedIntent {
  const text = (rawText || '').trim();
  const dur = extractDuration(text);
  let matched: RouteRule | null = null;
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      matched = rule;
      break;
    }
  }
  const type: IntentType = matched ? matched.type : text.length ? 'freeform' : 'invalid';

  // 關鍵字捕獲：比對已知名詞
  const targets: string[] = [];
  const pools = [context?.npcNames, context?.locationNames, context?.itemNames];
  for (const pool of pools) {
    if (!pool) continue;
    for (const name of pool) {
      if (name && text.includes(name) && !targets.includes(name)) targets.push(name);
    }
  }

  const scale: TimeScale = dur.days !== undefined
    ? dur.scale
    : matched?.scale || (NATURAL_QUERY_RE.test(text) || PASSIVE_LOOK_RE.test(text) ? 'instant' : 'short');
  const confidence = matched ? (targets.length ? 0.9 : 0.7) : 0.3;
  return {
    type,
    rawText: text,
    targets,
    durationScale: scale,
    durationDays: dur.days,
    confidence,
    notes: matched ? undefined : '未匹配明確意圖，交由 GM 自由裁決',
  };
}
