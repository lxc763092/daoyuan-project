/**
 * 宗門系統（全盤邏輯）：嚴格區分三類——
 *  · 武林門派：七玄門等江湖武林勢力，凡人/武者亦可入，授武技、外功、金創藥、江湖情報。
 *  · 修仙宗門：黃楓谷/落雲宗等真正修仙勢力，須靈根與修為方可入，授功法/丹方/法器。
 *  · 魔道宗門：化血教等，須修為，授魔功/煉屍/邪寶（業力與正道聲望有代價）。
 * 以「貢獻點」晉升；宗門任務賺貢獻、資源兌換。純邏輯；wiring 於 worldStore/UI。
 */
import type { SectDef, SectMembership } from '../types';
import { AUTHORED_SECTS } from '../data/sectsAuthored';
import { SECTS_GENERATED } from '../data/sectsGenerated';

// 基礎宗門（fallback，已正確分類）；agent 授權宗門由 setSects 併入並自動歸類。
export const FALLBACK_SECTS: SectDef[] = [
  {
    id: '七玄門', name: '七玄門', category: '武林門派', alignment: '江湖正派', joinRealmReq: '凡人', needRoot: false,
    ranks: [
      { name: '雜役弟子', reqContribution: 0, perk: '入門打雜，習粗淺拳腳、領微薄月銀' },
      { name: '外門弟子', reqContribution: 80, perk: '可習門中外功武技、領江湖歷練' },
      { name: '記名弟子', reqContribution: 300, perk: '得堂主指點、配兵器與療傷藥' },
      { name: '親傳弟子', reqContribution: 800, perk: '習門派絕學、執掌一隊' },
      { name: '堂主', reqContribution: 2000, perk: '主一堂事務、調用門派人手' },
      { name: '長老／門主', reqContribution: 5000, perk: '號令全門、掌七玄精要' },
    ],
    missions: [
      { name: '看守山門', contribution: 20, note: '巡守門派要隘' },
      { name: '緝拿盜匪', contribution: 35, note: '清剿擾境綠林' },
      { name: '比武較技', contribution: 30, note: '門中較技、揚名立威' },
      { name: '行走江湖', contribution: 45, note: '替門派辦江湖事' },
    ],
    resources: [
      { name: '七玄外功秘譜', cost: 60, note: '強身健體的外家武技' },
      { name: '眨眼劍譜', cost: 200, note: '七玄門快劍絕學' },
      { name: '金創療傷藥×3', cost: 50, note: '江湖跌打療傷' },
      { name: '精鐵兵器', cost: 150, note: '稱手的凡品利器' },
    ],
  },
  {
    id: '黃楓谷', name: '黃楓谷', category: '修仙宗門', alignment: '修仙正道', joinRealmReq: '炼气期', needRoot: true,
    ranks: [
      { name: '記名弟子', reqContribution: 0, perk: '丹道入門、靈石例俸' },
      { name: '外門弟子', reqContribution: 120, perk: '丹堂打雜、得丹方殘篇' },
      { name: '內門弟子', reqContribution: 500, perk: '配丹爐與靈田' },
      { name: '核心弟子', reqContribution: 1500, perk: '習上乘丹道、領珍材' },
      { name: '真傳弟子', reqContribution: 3500, perk: '得長老親傳、入秘藏' },
      { name: '長老', reqContribution: 8000, perk: '主一堂丹務、調用宗門資源' },
    ],
    missions: [
      { name: '採集靈藥', contribution: 40, note: '為丹堂供藥' },
      { name: '代煉丹藥', contribution: 60, note: '替宗門煉製丹藥' },
      { name: '守護靈脈', contribution: 70, note: '鎮守宗門靈脈禁地' },
    ],
    resources: [
      { name: '長春功', cost: 100, note: '木屬養氣功法' },
      { name: '築基丹方', cost: 400, note: '築基聖藥配方' },
      { name: '聚靈丹×5', cost: 120, note: '加速修煉' },
      { name: '青竹蜂雲劍胚', cost: 1200, note: '可祭煉的本命飛劍胚' },
    ],
  },
  {
    id: '落雲宗', name: '落雲宗', category: '修仙宗門', alignment: '修仙正道', joinRealmReq: '炼气期', needRoot: true,
    ranks: [
      { name: '記名弟子', reqContribution: 0, perk: '入門功法、靈石例俸' },
      { name: '外門弟子', reqContribution: 120, perk: '領歷練、入藏經閣外殿' },
      { name: '內門弟子', reqContribution: 500, perk: '配靈峰洞府' },
      { name: '核心弟子', reqContribution: 1500, perk: '習中階秘傳' },
      { name: '真傳弟子', reqContribution: 3500, perk: '長老親傳、執掌一峰' },
      { name: '長老', reqContribution: 8000, perk: '位列宗門高層' },
    ],
    missions: [
      { name: '歷練除妖', contribution: 50, note: '為宗門剿除妖患' },
      { name: '護送同門', contribution: 40, note: '護衛同門出入' },
      { name: '駐守靈礦', contribution: 60, note: '看守宗門靈礦' },
    ],
    resources: [
      { name: '玄冰訣', cost: 100, note: '水屬入門功法' },
      { name: '養精丹×5', cost: 120, note: '療傷補元' },
      { name: '中品法器', cost: 500, note: '趁手法器一件' },
    ],
  },
  {
    id: '化血教', name: '化血教', category: '魔道宗門', alignment: '魔道', joinRealmReq: '炼气期', needRoot: true,
    ranks: [
      { name: '血奴', reqContribution: 0, perk: '入教為奴、習粗淺魔功' },
      { name: '外壇弟子', reqContribution: 120, perk: '領血祭任務、得邪藥' },
      { name: '內壇弟子', reqContribution: 500, perk: '習化血秘術' },
      { name: '護法', reqContribution: 1500, perk: '掌一壇、得煉屍之法' },
      { name: '長老', reqContribution: 4000, perk: '位列教中高層' },
    ],
    missions: [
      { name: '血祭採生', contribution: 60, note: '為教中採集生魂血氣（業力大增）' },
      { name: '伏殺正道', contribution: 80, note: '狙殺正道修士（兇名大漲）' },
      { name: '看守魔窟', contribution: 40, note: '鎮守教中魔窟' },
    ],
    resources: [
      { name: '化血神功', cost: 120, note: '采血煉氣的魔道功法' },
      { name: '養屍秘術', cost: 400, note: '煉製屍傀的邪術' },
      { name: '血魔旗', cost: 800, note: '攝魂噬血的邪寶' },
    ],
  },
];

const REALM_RANK: Record<string, number> = { 凡人: -1, 炼气期: 0, 煉氣期: 0, 筑基期: 1, 築基期: 1, 结丹期: 2, 結丹期: 2, 金丹期: 2, 元婴期: 3, 元嬰期: 3, 化神期: 4 };
function rankOf(r: string): number { return REALM_RANK[r] ?? 0; }

/** 由 alignment/name 推斷 category（給未標註的授權宗門）。 */
export function inferCategory(s: { name?: string; alignment?: string; category?: string }): SectDef['category'] {
  if (s.category === '武林門派' || s.category === '修仙宗門' || s.category === '魔道宗門') return s.category;
  const a = (s.alignment || '') + (s.name || '');
  if (/武林|江湖|武館|鏢局|幫|七玄/.test(a)) return '武林門派';
  if (/魔|邪|血|鬼|陰煞|屍/.test(a)) return '魔道宗門';
  return '修仙宗門';
}

type SectInput = Omit<SectDef, 'category' | 'needRoot' | 'joinRealmReq'> & Partial<Pick<SectDef, 'category' | 'needRoot' | 'joinRealmReq'>>;
let SECTS: SectDef[] = FALLBACK_SECTS.slice();
/** 併入授權宗門：自動歸類、依名稱去重（授權優先於 fallback）。 */
export function setSects(authored: SectInput[]): void {
  if (!authored || !authored.length) return;
  const norm: SectDef[] = authored
    .filter((s) => s && s.id && s.ranks && s.ranks.length)
    .map((s) => {
      const category = inferCategory(s);
      return {
        ...s,
        category,
        needRoot: s.needRoot ?? category !== '武林門派',
        joinRealmReq: s.joinRealmReq ?? (category === '武林門派' ? '凡人' : '炼气期'),
      } as SectDef;
    });
  const authoredNames = new Set(norm.map((s) => s.name));
  const keptFallback = FALLBACK_SECTS.filter((s) => !authoredNames.has(s.name));
  SECTS = [...norm, ...keptFallback];
}
export function allSects(): SectDef[] { return SECTS; }
export function sectsByCategory(cat: SectDef['category']): SectDef[] { return SECTS.filter((s) => s.category === cat); }
export function getSect(id: string): SectDef | undefined { return SECTS.find((s) => s.id === id || s.name === id); }
export function findSectByName(text: string): SectDef | undefined {
  if (!text) return undefined;
  return SECTS.find((s) => text.includes(s.name));
}

// ── 凡俗江湖勢力黑名單：未登錄 SectDef 的幫派/世家（getSect 回 undefined，須名單兜底）──
const MORTAL_FACTION_NAMES = new Set(['野狼幫', '驚蛟會', '黑煞教', '燕家']);

/**
 * 是否為「凡俗/武林」勢力（不應列入修仙勢力榜與修仙界地塊佔領）。
 * 還原原著：修仙界由修仙宗門/魔道宗門主導，凡俗武林（七玄門等）不入修仙勢力排名。
 */
export function isMartialFaction(name: string): boolean {
  if (!name) return false;
  const s = getSect(name);
  if (s) return s.category === '武林門派'; // 七玄門 → true；黃楓谷 → false
  if (MORTAL_FACTION_NAMES.has(name)) return true; // 凡俗幫派不在 SECTS，名單兜底
  // 聚合名/種族（正道七派、魔道六宗、九國盟等）非單一武林門派，不排除
  if (/^(正道|魔道|九國盟|九国盟|三道四宗|人族|妖族|七大|四大|聯盟|联盟)/.test(name)) return false;
  return inferCategory({ name }) === '武林門派';
}

export interface JoinCheck { ok: boolean; reason: string }
/** 入門資格：仙凡有別——武林門派乃凡俗武者所聚，修仙者不投；修仙/魔道宗門須靈根與修為。已有師門者須先退出。 */
export function canJoinSect(sect: SectDef, ctx: { realmName: string; hasRoot: boolean; currentSectId?: string }): JoinCheck {
  if (ctx.currentSectId && ctx.currentSectId !== sect.id) {
    return { ok: false, reason: `你已是「${ctx.currentSectId}」門下，欲另投他門須先退出。` };
  }
  if (ctx.currentSectId === sect.id) return { ok: false, reason: `你已身在「${sect.name}」。` };
  // 仙凡有別：武林門派乃凡夫武者江湖之所，生命層次與修仙者迥異——你既已踏上仙途，此等門派非你歸宿（仍可前往尋訪故人）。
  if (sect.category === '武林門派') {
    return { ok: false, reason: `「${sect.name}」乃凡俗武者的江湖門派——仙凡有別，你既已修仙，所求乃長生大道，豈是拳腳武藝可羈？此門非你歸宿（然你仍可前往該地尋訪故人、打探消息）。` };
  }
  // 修仙/魔道宗門
  if (sect.needRoot && !ctx.hasRoot) return { ok: false, reason: `「${sect.name}」乃修仙宗門，非靈根之人不收。` };
  const need = rankOf(sect.joinRealmReq || '炼气期');
  if (rankOf(ctx.realmName) < need) return { ok: false, reason: `「${sect.name}」入門須 ${sect.joinRealmReq || '炼气期'} 以上修為。` };
  return { ok: true, reason: '' };
}

/** 由「功勳」推算可受任的最高階級 index（功勳乃終身資歷，與可花用之貢獻分流）。 */
export function rankAt(sect: SectDef, merit: number): number {
  let idx = 0;
  for (let i = 0; i < sect.ranks.length; i++) if (merit >= sect.ranks[i].reqContribution) idx = i;
  return idx;
}
export function nextRank(sect: SectDef, rankIndex: number) {
  return rankIndex + 1 < sect.ranks.length ? sect.ranks[rankIndex + 1] : null;
}

// ── 晉升境界閘：修仙宗門「論功亦論道」，資歷夠而修為未及，掌門亦不予擢升 ──
export const REALM_NAME_BY_RANK: Record<number, string> = { [-1]: '凡人', 0: '煉氣期', 1: '築基期', 2: '結丹期', 3: '元嬰期', 4: '化神期' };
function parseRealmRank(text: string): number | null {
  if (/化神/.test(text)) return 4;
  if (/元婴|元嬰/.test(text)) return 3;
  if (/结丹|結丹|金丹/.test(text)) return 2;
  if (/筑基|築基/.test(text)) return 1;
  if (/炼气|煉氣/.test(text)) return 0;
  return null;
}
const DEFAULT_REALM_LADDER: Record<SectDef['category'], number[]> = {
  武林門派: [-1, -1, 0, 0, 1, 1],
  修仙宗門: [0, 0, 1, 2, 2, 3],
  魔道宗門: [0, 0, 1, 2, 2, 3],
};
/** 晉某階所需最低境界（數值）：取階名解析、類別預設階梯與逐階單調遞增之最大者。 */
export function rankRealmRankReq(sect: SectDef, i: number): number {
  const ladder = DEFAULT_REALM_LADDER[sect.category] || DEFAULT_REALM_LADDER['修仙宗門'];
  let req = -1;
  for (let k = 0; k <= i && k < sect.ranks.length; k++) {
    const r = sect.ranks[k];
    const explicit = r.realmReq ? rankOf(r.realmReq) : -99;
    const parsed = parseRealmRank(r.name + (r.perk || '')) ?? -99;
    const def = ladder[Math.min(k, ladder.length - 1)] ?? 0;
    req = Math.max(req, explicit, parsed, def); // 單調遞增，後階不低於前階
  }
  return req;
}
export function rankRealmReqName(sect: SectDef, i: number): string {
  return REALM_NAME_BY_RANK[rankRealmRankReq(sect, i)] || '凡人';
}
/** 當前境界至多能受任到的階級 index（再高者須更高修為，掌門不予擢升）。 */
export function realmCapIndex(sect: SectDef, realmName: string): number {
  const pr = rankOf(realmName);
  let cap = 0;
  for (let i = 0; i < sect.ranks.length; i++) {
    if (pr >= rankRealmRankReq(sect, i)) cap = i;
    else break;
  }
  return cap;
}
/** 功勳與境界雙閘後，實際可受任的階級。 */
export function effectiveRank(sect: SectDef, merit: number, realmName: string): number {
  return Math.min(rankAt(sect, merit), realmCapIndex(sect, realmName));
}

export interface PromotionGate { meritReady: boolean; realmBlocked: boolean; needRealm?: string; nextRankName?: string; needMerit?: number }
/** 供 UI 顯示晉升條件：功勳是否已足、是否卡境界。 */
export function promotionGate(sect: SectDef, merit: number, currentRankIndex: number, realmName: string): PromotionGate {
  const nxt = nextRank(sect, currentRankIndex);
  if (!nxt) return { meritReady: false, realmBlocked: false };
  const meritReady = merit >= nxt.reqContribution;
  const needRank = rankRealmRankReq(sect, currentRankIndex + 1);
  const realmBlocked = meritReady && rankOf(realmName) < needRank;
  return { meritReady, realmBlocked, needRealm: REALM_NAME_BY_RANK[needRank], nextRankName: nxt.name, needMerit: nxt.reqContribution };
}

/** 立功：功勳（資歷）與可花用貢獻同增；依功勳與境界雙閘重算階級（永不降階）。 */
export function gainMerit(m: SectMembership, sect: SectDef, amount: number, realmName: string): {
  membership: SectMembership; promoted: boolean; newRankName?: string; heldByRealm: boolean; needRealm?: string;
} {
  const merit = Math.max(0, (m.merit ?? m.contribution) + amount);
  const contribution = Math.max(0, m.contribution + amount);
  const eff = effectiveRank(sect, merit, realmName);
  const newIdx = Math.max(m.rankIndex, eff);
  const promoted = newIdx > m.rankIndex;
  const meritRank = rankAt(sect, merit);
  const heldByRealm = meritRank > eff; // 資歷已足、卻為境界所限
  const needRealm = heldByRealm ? rankRealmReqName(sect, Math.min(meritRank, sect.ranks.length - 1)) : undefined;
  return {
    membership: { ...m, merit, contribution, rankIndex: newIdx },
    promoted, newRankName: promoted ? sect.ranks[newIdx].name : undefined, heldByRealm, needRealm,
  };
}

// 載入即併入：手作授權宗門（八大門派，category 精確）+「勢力即宗門」由 agg_factions 生成的眾多正史勢力。
// AUTHORED 在前→去重時優先；化血教等 fallback 由 setSects 自動保留。
setSects([...AUTHORED_SECTS, ...SECTS_GENERATED]);
