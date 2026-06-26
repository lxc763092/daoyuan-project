/** 輸入治理：反「機械降神」＋反「出戲(OOC)」。把玩家輸入分類為合法行動、需重構、或拒絕。 */
import type { GovernorVerdict, ParsedIntent } from '../types';
import { screenCanon } from './canonGuard';

interface Pattern {
  re: RegExp;
  type: NonNullable<GovernorVerdict['violationType']>;
  decision: 'reject' | 'reframe';
  reason: string;
}

// 越權樣式（順序＝嚴重度）
const PATTERNS: Pattern[] = [
  {
    re: /(直接|立刻|瞬間|馬上|秒)?(飛昇|飞升|成仙|羽化登仙|位列仙班)/,
    type: 'godmode', decision: 'reject',
    reason: '飛昇成仙需經歷完整修煉與飛昇天劫，無法以一句話達成。',
  },
  {
    re: /(突破到|晉升到|直接到達|一步登天到?)\s*(築基|筑基|金丹|結丹|元嬰|元婴|化神|煉虛|炼虚|合體|合体|大乘|渡劫|真仙|長生|长生)/,
    type: 'godmode', decision: 'reject',
    reason: '境界突破受修為、丹藥、瓶頸與天劫制約，不能直接宣告達成。',
  },
  {
    re: /(我|主角)?(就此|從此|已經|瞬間)?(無敵|無人能敵|天下無敵|秒殺一切|不死之身|長生不老)/,
    type: 'godmode', decision: 'reject',
    reason: '此世界無絕對無敵；任何力量皆有代價與盲區。',
  },
  {
    re: /(遇到|出現|來了)(一位|個)?(老神仙|上古大能|仙人|大羅金仙).*(傳功|傳承|送我|賜予|收我為徒|傳授絕世)/,
    type: 'godmode', decision: 'reframe',
    reason: '機緣需自然觸發；不能憑空安排大能傳功。',
  },
  {
    re: /(憑空|突然|瞬間)?(獲得|擁有|出現|得到|多出)(了)?\s*[\d一二三四五六七八九十百千万萬無数無數海量頂級頂尖極品]+\s*(靈石|灵石|頂級法寶|至寶|仙器|神丹|無數丹藥)/,
    type: 'teleport_resource', decision: 'reject',
    reason: '資源須透過機緣、交易、煉製或戰利取得，不能憑空生成。',
  },
  {
    re: /(背包|储物袋|儲物袋|乾坤袋)(裡|中)?(突然|憑空)?(出現|多了)/,
    type: 'teleport_resource', decision: 'reframe',
    reason: '背包內容由遊戲狀態決定，不能自行宣告新增。',
  },
  {
    re: /(所有人|全宗門|全城|天下人|眾人|所有.*修士)(都)?(臣服|拜我為主|聽我號令|愛上我|為我而死|俯首)/,
    type: 'narrate_world', decision: 'reframe',
    reason: '他人意志與世界事實不由玩家單方宣告，只能透過行動影響。',
  },
  {
    re: /(讓|命令|使)\s*\S+\s*(立刻)?(去死|自殺|自爆|聽我的|背叛|臣服)/,
    type: 'control_npc', decision: 'reframe',
    reason: '無法直接操控他人；可嘗試說服、威脅或戰鬥，結果由其性格與實力決定。',
  },
  {
    re: /(修改|作弊|debug|gm模式|系統指令|控制台|console|給我加|set\s|cheat)/i,
    type: 'meta', decision: 'reject',
    reason: '此為遊戲內角色行動，不接受元遊戲/作弊指令。',
  },
];

/**
 * 裁決玩家輸入。violations = 玩家累計越權次數（升級懲戒）。
 */
export function govern(
  rawText: string,
  intent: ParsedIntent,
  violations: number
): GovernorVerdict {
  const text = (rawText || '').trim();
  if (!text) return { decision: 'reject', reason: '請輸入你的行動。', violationType: 'meta' };

  // 出戲(OOC)守衛優先：現代/科幻/異界事物 → 改寫為修仙界對應或以世界觀回絕（非作弊，故不施天道業力）
  const ooc = screenCanon(text);
  if (ooc) {
    return { decision: ooc.decision, reason: ooc.reason, violationType: 'ooc', sanctionKarma: 0, reframedAs: ooc.reframedAs };
  }

  for (const p of PATTERNS) {
    if (p.re.test(text)) {
      // 升級懲戒：越權越多，天道感應越強
      const baseKarma = p.decision === 'reject' ? 8 : 3;
      const sanctionKarma = baseKarma + Math.min(violations, 5) * 4;
      let reframedAs: string | undefined;
      if (p.decision === 'reframe') {
        reframedAs = `你嘗試「${text}」——但這只是你的意圖，結果取決於世界的回應。`;
      }
      return {
        decision: p.decision,
        reason: p.reason,
        violationType: p.type,
        sanctionKarma,
        reframedAs,
      };
    }
  }

  // 預設放行（freeform 也放行，交給 GM 在世界規則內裁決敘事）
  return { decision: 'allow', reason: '合法行動。' };
}

/** 給玩家的越權回饋文案（含天道感應分級）。 */
export function violationFeedback(verdict: GovernorVerdict, violations: number): string {
  if (verdict.decision === 'allow') return '';
  const omen =
    violations >= 4
      ? '\n\n【天道感應】你一再妄圖逆亂法則，冥冥中一道無形之威鎖定了你，業力纏身、心神震盪。'
      : violations >= 2
      ? '\n\n【天道示警】你心生妄念，識海隱隱一陣刺痛，似有天威垂注。'
      : '';
  if (verdict.decision === 'reject') {
    return `（你的念頭無法成真）${verdict.reason}${omen}`;
  }
  return `${verdict.reframedAs || ''}\n（${verdict.reason}）${omen}`;
}
