/**
 * 組隊與神識傳音的核心規則：
 *  - 神識傳音範圍依境界（境界越高，神識所及越廣）；私密、難以竊聽。
 *  - 入隊意願依好感、境界差、身份（主角級難招攬）。
 *  - 分贓：解散時依人數公平分配共同收穫。
 */
import type { LootShare } from '../types';
import { realmRank } from './daoyuanLoader';
import { findMapNode } from './mapIntel';
import { regionAnchorOf, landAdjacent } from './mapLayout';

// 神識傳音範圍等級（依玩家境界）
const TRANSMIT_RANK: Record<string, number> = { 炼气期: 0, 筑基期: 1, 金丹期: 2, 元婴期: 3, 化神期: 4 };
function transmitRank(realm: string): number {
  return TRANSMIT_RANK[realm] ?? 0;
}

/** 判定神識傳音能否觸及對方（依境界與距離）。 */
export function transmitInRange(playerRealm: string, playerLoc: string, npcLoc: string): { inRange: boolean; reason: string } {
  const a = findMapNode(playerLoc);
  const b = findMapNode(npcLoc);
  const rank = transmitRank(playerRealm);
  if (a && b && a.tier !== b.tier) {
    return { inRange: false, reason: '對方遠在另一界域，神識縱廣亦無從觸及。' };
  }
  const ra = a ? regionAnchorOf(a.id) : undefined;
  const rb = b ? regionAnchorOf(b.id) : undefined;
  const sameRegion = (a && b && a.id === b.id) || (ra && rb && ra === rb);
  if (sameRegion) return { inRange: true, reason: '' };
  // 不同大區
  if (rank >= 3) return { inRange: true, reason: '' }; // 元嬰起神識廣布全界
  if (rank >= 2 && ra && rb && landAdjacent(ra, rb)) return { inRange: true, reason: '' }; // 金丹可及鄰區
  const need = rank >= 2 ? '需與對方同處一域' : '神識僅及己身周遭一帶';
  return { inRange: false, reason: `傳音不達——對方相距太遠，以你${playerRealm}的神識${need}。` };
}

/** 神識所及範圍的文字描述（供提示）。 */
export function transmitRangeLabel(realm: string): string {
  const r = transmitRank(realm);
  if (r >= 3) return '神識廣布全界，可向同界任一相識傳音';
  if (r >= 2) return '神識可及本域與鄰接大區';
  if (r >= 1) return '神識可及周身與同一大區';
  return '神識淺薄，僅能向近在咫尺者傳音';
}

/** 判定 NPC 是否願意入隊。 */
export function willingToJoin(
  importance: 'protagonist' | 'major' | 'minor',
  relationship: number,
  playerRealm: string,
  npcRealm: string
): { willing: boolean; reason: string } {
  const gap = realmRank(npcRealm) - realmRank(playerRealm);
  if (importance === 'protagonist' && relationship < 60) {
    return { willing: false, reason: '乃當世獨行的人物，豈會輕易追隨於你？除非交情極深。' };
  }
  if (gap >= 4) {
    return { willing: false, reason: '修為遠勝於你，對你的邀約不過付之一哂。' };
  }
  if (relationship <= -10) {
    return { willing: false, reason: '對你並無好感，斷然回絕。' };
  }
  if (gap >= 2 && relationship < 25) {
    return { willing: false, reason: '修為高出你一截，需有更深的交情或實打實的好處方肯同行。' };
  }
  return { willing: true, reason: '' };
}

/** 解散分贓：依人數公平分配共同收穫，回傳玩家所得與分配敘述。 */
export function settleLoot(pool: LootShare[], npcMemberCount: number): { playerShare: LootShare[]; narrative: string } {
  const shares = Math.max(1, npcMemberCount + 1); // 含玩家
  if (!pool.length) return { playerShare: [], narrative: '此行並無共同收穫可分。' };
  const playerShare: LootShare[] = [];
  const lines: string[] = [];
  // 先依稀有度排序，貴重者隊長（玩家）優先取
  const order = ['传说', '傳說', '史诗', '史詩', '稀有', '精良', '普通'];
  const sorted = [...pool].sort((a, b) => order.indexOf(a.rarity || '普通') - order.indexOf(b.rarity || '普通'));
  sorted.forEach((it, idx) => {
    let mine = Math.floor(it.quantity / shares);
    const rem = it.quantity - mine * shares;
    // 餘數依序分配，隊長（idx 對 0 號）優先；單件貴重物由玩家取
    if (idx === 0 && it.quantity <= shares) mine = Math.max(mine, 1);
    else if (rem > 0) mine += 1; // 玩家分得一份餘數
    mine = Math.min(it.quantity, mine);
    const others = it.quantity - mine;
    if (mine > 0) playerShare.push({ name: it.name, quantity: mine, rarity: it.rarity, type: it.type });
    lines.push(`${it.name}×${it.quantity} → 你得 ${mine}${others > 0 ? `，餘 ${others} 由隊友均分` : ''}`);
  });
  return { playerShare, narrative: `【分贓】共 ${shares} 人均分此行收穫：\n${lines.join('；')}` };
}
