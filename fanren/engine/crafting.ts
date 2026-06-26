/**
 * 煉丹/煉器配方鏈：丹方/圖紙 → 檢材料 → 火候/品質/成功率 → 成品。
 * 純邏輯；wiring 於 turnEngine craft case 與 worldStore（消耗背包材料、產出入背包）。
 */
import type { Recipe } from '../types';

// 基礎配方（fallback）；agent 授權配方由 setRecipes 併入。
export const FALLBACK_RECIPES: Recipe[] = [
  { id: 'rc_juling', name: '聚靈丹方', craft: '丹道', realmReq: '炼气期', tool: '青陽丹爐', ingredients: [{ name: '聚靈草', qty: 2 }, { name: '靈砂', qty: 1 }], product: { name: '聚靈丹', rarity: '普通', effect: '服之加速煉氣期靈力凝聚，築基前常備。' }, difficulty: 1 },
  { id: 'rc_yangjing', name: '養精丹方', craft: '丹道', realmReq: '炼气期', tool: '青陽丹爐', ingredients: [{ name: '凝血草', qty: 2 }, { name: '靈乳', qty: 1 }], product: { name: '養精丹', rarity: '普通', effect: '溫養氣血、療傷補元。' }, difficulty: 1 },
  { id: 'rc_zhuji', name: '築基丹方', craft: '丹道', realmReq: '筑基期', tool: '紫金丹鼎', ingredients: [{ name: '築基靈藥', qty: 3 }, { name: '百年靈芝', qty: 1 }, { name: '玄靈髓', qty: 1 }], product: { name: '築基丹', rarity: '稀有', effect: '煉氣巔峰築基之聖藥，成丹不易。' }, difficulty: 3 },
  { id: 'rc_feijian', name: '青鋒飛劍圖紙', craft: '器道', realmReq: '筑基期', tool: '玄火煉爐', ingredients: [{ name: '精金', qty: 2 }, { name: '玄鐵', qty: 2 }, { name: '靈晶', qty: 1 }], product: { name: '青鋒飛劍', rarity: '稀有', effect: '可御使凌空、削金斷玉的入門飛劍。' }, difficulty: 2 },
  { id: 'rc_dunpai', name: '玄龜寶盾圖紙', craft: '器道', realmReq: '筑基期', tool: '玄火煉爐', ingredients: [{ name: '玄龜甲', qty: 1 }, { name: '寒玉', qty: 2 }], product: { name: '玄龜寶盾', rarity: '稀有', effect: '禦敵護身的厚重防禦法器。' }, difficulty: 2 },
];

let RECIPES: Recipe[] = FALLBACK_RECIPES.slice();
export function setRecipes(authored: Recipe[]): void {
  if (!authored || !authored.length) return;
  const seen = new Set(FALLBACK_RECIPES.map((r) => r.id));
  RECIPES = [...FALLBACK_RECIPES, ...authored.filter((r) => r && r.id && !seen.has(r.id))];
}
export function allRecipes(): Recipe[] { return RECIPES; }

const REALM_RANK: Record<string, number> = { 炼气期: 0, 煉氣期: 0, 筑基期: 1, 築基期: 1, 结丹期: 2, 結丹期: 2, 金丹期: 2, 元婴期: 3, 元嬰期: 3, 化神期: 4 };
function rankOf(r: string): number { return REALM_RANK[r] ?? 0; }

/** 由玩家文本找出欲煉製的配方（比對成品名/配方名）。 */
export function findRecipe(text: string): Recipe | undefined {
  if (!text) return undefined;
  return RECIPES.find((r) => text.includes(r.product.name)) || RECIPES.find((r) => text.includes(r.name) || (r.name.length > 2 && text.includes(r.name.slice(0, 3))));
}

export interface CraftCheck { ok: boolean; missing: { name: string; need: number; have: number }[] }
/** 檢查背包材料是否足夠（inv: 名稱→數量）。 */
export function canCraft(recipe: Recipe, inv: Record<string, number>): CraftCheck {
  const missing: CraftCheck['missing'] = [];
  for (const ing of recipe.ingredients) {
    const have = inv[ing.name] || 0;
    if (have < ing.qty) missing.push({ name: ing.name, need: ing.qty, have });
  }
  return { ok: missing.length === 0, missing };
}

export interface CraftResult {
  success: boolean;
  quality: number; // 60-100（丹藥品質/法器品階）
  product?: { name: string; rarity: string; effect: string; type: string };
  consume: { name: string; qty: number }[];
  narrative: string;
}
/** 嘗試煉製：成功率由境界對火候難度＋熟練＋氣運決定；成功則回品質與成品。 */
export function attemptCraft(recipe: Recipe, ctx: { realmRank: number; proficiency: number; luck: number; rng?: () => number }): CraftResult {
  const rng = ctx.rng || Math.random;
  const type = recipe.craft === '器道' ? '法宝' : '丹药';
  // 成功率：境界與難度差 + 熟練(0..5) + 氣運
  const realmEdge = ctx.realmRank - (rankOf(recipe.realmReq) + recipe.difficulty * 0.4);
  const base = 0.45 + realmEdge * 0.12 + (ctx.proficiency || 0) * 0.06 + Math.min(0.15, (ctx.luck || 0) / 300);
  const chance = Math.max(0.1, Math.min(0.95, base));
  const consume = recipe.ingredients.map((i) => ({ ...i }));
  if (rng() >= chance) {
    return { success: false, quality: 0, consume, narrative: `火候差了一線，「${recipe.product.name}」煉製失敗，材料盡毀。（成功率約 ${Math.round(chance * 100)}%）` };
  }
  const quality = Math.min(100, Math.round(60 + rng() * 20 + (ctx.proficiency || 0) * 3 + Math.max(0, realmEdge) * 2));
  return {
    success: true,
    quality,
    product: { name: recipe.product.name, rarity: recipe.product.rarity, effect: `${recipe.product.effect}（品質 ${quality}）`, type },
    consume,
    narrative: `丹爐生焰、靈材交融——「${recipe.product.name}」煉製成功！品質 ${quality}${quality >= 90 ? '，已臻上品！' : '。'}`,
  };
}
