/** 擴充式世界：玩家走出已知地圖時，依界層與劇情一致地程序生成新地域。 */
import type { ExpandedRegion } from '../types';
import { getRegion } from './daoyuanLoader';

const TIER_NAME_PARTS: Record<ExpandedRegion['tier'], { pre: string[]; mid: string[]; suf: string[] }> = {
  human: { pre: ['雲', '青', '蒼', '玄', '碧', '丹', '寒', '幽'], mid: ['霞', '溪', '嶺', '澤', '川', '荒', '陵', '原'], suf: ['谷', '城', '鎮', '坊市', '山', '島', '州'] },
  spirit: { pre: ['天', '靈', '星', '萬', '九', '太', '紫'], mid: ['淵', '雲', '荒', '冥', '霄', '墟', '塬'], suf: ['界', '大陸', '聖地', '秘域', '城', '海'] },
  demon: { pre: ['血', '魔', '幽', '噬', '骨', '陰'], mid: ['焰', '淵', '霧', '沙', '海', '獄'], suf: ['界', '原', '淵', '城', '沙漠', '秘藏'] },
  immortal: { pre: ['北寒', '太虛', '紫府', '瑤池', '九霄'], mid: ['仙', '雲', '星', '玄'], suf: ['仙域', '仙宮', '天', '界'] },
};

/** 以世界狀態為種子做確定性生成（避免隨機，使存檔可重現）。 */
function seeded(parts: string[], seed: number): string {
  return parts[Math.abs(seed) % parts.length];
}

export interface ExpansionInput {
  fromRegionId: string;
  tier: ExpandedRegion['tier'];
  day: number;
  existingCount: number;
  hint?: string; // 玩家描述的方向（如「往更深的荒漠」）
}

export function generateRegion(input: ExpansionInput): ExpandedRegion {
  const p = TIER_NAME_PARTS[input.tier];
  const s = input.day + input.existingCount * 7 + (input.hint?.length || 0);
  const name = `${seeded(p.pre, s)}${seeded(p.mid, s + 3)}${seeded(p.suf, s + 5)}`;
  const parent = getRegion(input.fromRegionId);
  const tierLabel = { human: '人界', spirit: '靈界', demon: '魔界', immortal: '仙界' }[input.tier];
  return {
    id: name,
    name,
    tier: input.tier,
    parentRegionId: input.fromRegionId,
    description: `${tierLabel}邊陲的一處新地——${name}。${input.hint ? `循「${input.hint}」之向而至，` : ''}此地不見於舊圖，靈氣與險惡並存，正待開拓者揭其面紗。${parent ? `與${parent.name}遙遙相鄰。` : ''}`,
    generatedDay: input.day,
  };
}

/** 判斷玩家移動目標是否為「未知之地」（需擴充世界）。 */
export function isUnknownDestination(target: string): boolean {
  return !!target && !getRegion(target);
}
