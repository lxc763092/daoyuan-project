/**
 * 修仙百藝引擎：由玩家文本解析其修習/施展的技藝（先比對目錄，否則即時生成一門），
 * 累積熟練度、晉階，並依熟練×境界決定成效。
 */
import type { BaiYiArt, BaiYiCategory, BaiYiProficiency } from '../types';
import { BAIYI_CATALOG } from '../data/baiyi';

const RANK_NAMES = ['初識', '入門', '小成', '大成', '圓滿', '宗師'];
const RANK_THRESH = [0, 12, 60, 140, 280, 500];

export function rankFromExp(exp: number): number {
  let r = 0;
  for (let i = 0; i < RANK_THRESH.length; i++) if (exp >= RANK_THRESH[i]) r = i;
  return r;
}
export function rankName(rank: number): string {
  return RANK_NAMES[Math.max(0, Math.min(5, rank))];
}

// 生成型百藝的關鍵詞分類
const GEN_CAT: { re: RegExp; cat: BaiYiCategory; name: string }[] = [
  { re: /丹|藥/, cat: 'alchemy', name: '丹道' },
  { re: /符/, cat: 'talisman', name: '符道' },
  { re: /陣|禁制/, cat: 'formation', name: '陣道' },
  { re: /傀儡/, cat: 'puppet', name: '傀儡術' },
  { re: /植|草|園|圃/, cat: 'plant', name: '靈植' },
  { re: /獸|寵|妖/, cat: 'beast', name: '馭獸' },
  { re: /魂|神識/, cat: 'soul', name: '魂道' },
  { re: /醫|療|毒/, cat: 'medicine', name: '醫道' },
  { re: /劍/, cat: 'sword', name: '劍道' },
  { re: /體|肉身/, cat: 'body', name: '煉體' },
  { re: /遁|身法|步/, cat: 'agility', name: '遁術' },
  { re: /鑑|鑒|辨/, cat: 'appraisal', name: '鑑術' },
  { re: /容|裝|匿/, cat: 'disguise', name: '易容' },
  { re: /器|寶|爐/, cat: 'refining', name: '器道' },
];

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36).slice(0, 4);
}
function extractArtName(text: string): string | null {
  const t = text.replace(/^(修習|研習|學習|学习|鑽研|钻研|練習|练习|習得|修練|修煉|練|学|學)\s*/, '');
  const m = t.match(/([一-龥]{1,4})(之術|之道|術|道|功|訣|法)/);
  if (m) return (m[1] + m[2]).slice(0, 6);
  return null;
}

/** 解析玩家修習/施展的百藝：先比對目錄，否則即時生成（引擎自製）。 */
export function resolveBaiYi(text: string): { art: BaiYiArt; matched: boolean } {
  for (const art of BAIYI_CATALOG) {
    if (art.practiceVerbs.some((v) => new RegExp(v).test(text))) return { art, matched: true };
  }
  const gen = GEN_CAT.find((g) => g.re.test(text));
  const cat: BaiYiCategory = gen?.cat || 'generic';
  const nm = extractArtName(text) || gen?.name || '雜學旁藝';
  return {
    art: {
      id: `gen-${cat}-${hash(nm)}`,
      name: nm,
      category: cat,
      description: `你自行摸索鑽研而成的一門技藝：${nm}。雖無名師傳承，亦能自成一格。`,
      practiceVerbs: [],
      generated: true,
    },
    matched: false,
  };
}

export interface PracticeResult {
  prof: BaiYiProficiency;
  gained: number;
  rankedUp: boolean;
  quality: number; // 0..1 成品/施展品質
  narrative: string;
}

/** 修習一門百藝：累積熟練、晉階，回傳成效。 */
export function practiceBaiYi(art: BaiYiArt, prev: BaiYiProficiency | undefined, days: number, realmRank: number, luck: number): PracticeResult {
  const cur: BaiYiProficiency = prev || { artId: art.id, name: art.name, category: art.category, exp: 0, rank: 0, generated: art.generated };
  const gain = Math.max(1, Math.round(2 + days / 8 + (luck || 0) * 0.2));
  const exp = cur.exp + gain;
  const rank = rankFromExp(exp);
  const rankedUp = rank > cur.rank;
  const prof: BaiYiProficiency = { artId: art.id, name: art.name, category: art.category, exp, rank, generated: art.generated || cur.generated };
  const quality = Math.min(1, 0.12 + rank * 0.16 + realmRank * 0.025 + (luck || 0) * 0.01);
  const narrative = `${rankedUp ? `你於${art.name}一道更進一階，臻入「${rankName(rank)}」之境！ ` : ''}你潛心${art.name}，技藝精進（熟練 +${gain}，現為${rankName(rank)}）。`;
  return { prof, gained: gain, rankedUp, quality, narrative };
}

/** 是否為「可產出成品」的造物類百藝（丹/器/符），且文本明確在「製作」。 */
export function isMakingProduct(category: string, text: string): boolean {
  if (!['alchemy', 'refining', 'talisman'].includes(category)) return false;
  return /煉製|煉丹|炼丹|煉器|炼器|制符|製符|畫符|開爐|祭煉|成丹|成器|繪.*符|打造|鍛造/.test(text);
}
