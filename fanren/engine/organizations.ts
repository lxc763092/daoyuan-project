/**
 * 組織系統：玩家可成立船隊/商團/宗門/拍賣行/坊市/護衛團/散修聯盟等；
 * 提及未定義型別時，引擎即時生成一個合理的組織。組織隨時間成長（影響力/資產/成員）。
 */
import type { FanrenWorldState, Organization } from '../types';
import { getRegion, realmRank } from './daoyuanLoader';

interface OrgArchetype {
  type: string;
  keywords: RegExp;
  minRealm: string;
  foundCost: number; // 靈石
  baseMembers: number;
  baseInfluence: number;
  growthInfluence: number; // 每年
  growthAssets: number; // 每年（靈石）
  desc: (name: string, loc: string) => string;
}

const ARCHETYPES: OrgArchetype[] = [
  { type: '商團', keywords: /商團|商团|商會|商行|商號|貨棧|商隊/, minRealm: '炼气期', foundCost: 200, baseMembers: 6, baseInfluence: 5, growthInfluence: 3, growthAssets: 110, desc: (n, l) => `紮根${l}的修仙商團「${n}」，經營靈石、丹藥、法器買賣，廣結人脈、低買高賣。` },
  { type: '散修聯盟', keywords: /聯盟|联盟|同盟|結社|结社|散修.*盟/, minRealm: '炼气期', foundCost: 150, baseMembers: 10, baseInfluence: 6, growthInfluence: 3, growthAssets: 60, desc: (n, l) => `你於${l}串連各路散修，結成「${n}」，抱團取暖、共抗大派欺凌。` },
  { type: '船隊', keywords: /船隊|船团|商船|航隊|船幫|船帮/, minRealm: '筑基期', foundCost: 300, baseMembers: 8, baseInfluence: 6, growthInfluence: 3, growthAssets: 90, desc: (n, l) => `以${l}為母港的修仙船隊「${n}」，往來諸海島販運靈材、護航取利，亦可探尋海外秘境。` },
  { type: '護衛團', keywords: /護衛團|护卫团|镖局|鏢局|護法堂|傭兵團|佣兵团|護道/, minRealm: '筑基期', foundCost: 250, baseMembers: 12, baseInfluence: 7, growthInfluence: 3, growthAssets: 85, desc: (n, l) => `以${l}為據點的護衛團「${n}」，承接護道、押運、除妖之托，以武立身。` },
  { type: '拍賣行', keywords: /拍賣行|拍卖行|拍賣會|拍卖会|寶閣|宝阁/, minRealm: '筑基期', foundCost: 500, baseMembers: 10, baseInfluence: 10, growthInfluence: 4, growthAssets: 150, desc: (n, l) => `坐落${l}的拍賣行「${n}」，匯聚四方珍寶，抽取傭金而日進斗金。` },
  { type: '坊市', keywords: /坊市|集市|市集|商埠/, minRealm: '筑基期', foundCost: 800, baseMembers: 15, baseInfluence: 12, growthInfluence: 4, growthAssets: 130, desc: (n, l) => `你於${l}開設修仙坊市「${n}」，收租設攤，漸成一方交易中心。` },
  { type: '丹閣', keywords: /丹閣|丹阁|丹堂|煉丹.*(坊|閣|堂)|藥閣/, minRealm: '筑基期', foundCost: 400, baseMembers: 8, baseInfluence: 9, growthInfluence: 3, growthAssets: 120, desc: (n, l) => `立於${l}的丹閣「${n}」，售丹、代煉、收徒傳藝，以丹道揚名。` },
  { type: '宗門', keywords: /宗門|宗门|门派|門派|宗派|立宗|開宗|开宗|建派|開派/, minRealm: '金丹期', foundCost: 2000, baseMembers: 20, baseInfluence: 15, growthInfluence: 5, growthAssets: 120, desc: (n, l) => `你於${l}開山立派，創「${n}」，招收弟子、傳承道統，欲於修仙界佔得一席之地。` },
];

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36).slice(0, 5);
}
function locName(id: string): string {
  return getRegion(id)?.name || id;
}

export function extractOrgName(text: string): string {
  const m = text.match(/(?:名為|名叫|叫做|喚作|唤作|取名|叫|曰|號為|号为)\s*[「『"]?([一-龥A-Za-z0-9]{1,8})[」』"]?/);
  return m ? m[1] : '';
}

export function resolveOrgType(text: string): { type: string; arch?: OrgArchetype } {
  for (const a of ARCHETYPES) if (a.keywords.test(text)) return { type: a.type, arch: a };
  const m = text.match(/(?:成立|創立|创立|組建|组建|開設|开设|建立|創建|创建|開創|开创)\s*(?:一個|一个|個|个|座|間|间)?\s*([一-龥]{1,6}?)(?:，|。|,|名|叫|喚|号|$)/);
  return { type: (m?.[1] || '組織').slice(0, 6) };
}

export interface FoundResult {
  ok: boolean;
  reason?: string;
  org?: Organization;
  cost: number;
}

/** 嘗試創立組織：檢查境界與靈石；型別未定義則即時生成。 */
export function foundOrganization(text: string, playerRealm: string, spiritStones: number, day: number, locationId: string): FoundResult {
  const { type, arch } = resolveOrgType(text);
  const cost = arch?.foundCost ?? 400;
  const minRealm = arch?.minRealm ?? '炼气期';
  if (realmRank(playerRealm) < realmRank(minRealm)) {
    return { ok: false, cost, reason: `創立${type}需${minRealm}以上的修為根基方能服眾，你當前境界尚不足。` };
  }
  if (spiritStones < cost) {
    return { ok: false, cost, reason: `創立${type}約需靈石 ${cost}（置產、招攬、打點），你現有 ${spiritStones}，財力未逮。` };
  }
  let name = extractOrgName(text);
  if (!name) name = `${locName(locationId)}${type}`;
  const generated = !arch;
  const desc = arch ? arch.desc(name, locName(locationId)) : `你於${locName(locationId)}創立了「${name}」這一${type}——前路如何，端看你如何經營這份基業。`;
  const org: Organization = {
    id: `org-${day}-${hash(name)}`,
    name,
    type,
    description: desc,
    foundedDay: day,
    baseLocationId: locationId,
    members: arch?.baseMembers ?? 6,
    influence: arch?.baseInfluence ?? 5,
    assets: 0,
    generated,
  };
  return { ok: true, cost, org };
}

/** 組織隨時間成長（影響力/資產/成員）。 */
export function growOrganizations(orgs: Organization[] | undefined, days: number): Organization[] {
  if (!orgs || !orgs.length || days <= 0) return orgs || [];
  const years = days / 360;
  return orgs.map((o) => {
    const a = ARCHETYPES.find((x) => x.type === o.type);
    const influence = Math.min(100, o.influence + (a?.growthInfluence ?? 2) * years);
    const assets = Math.round(o.assets + (a?.growthAssets ?? 60) * years);
    const members = o.members + Math.round(years * Math.max(1, o.influence / 18));
    return { ...o, influence: Math.round(influence * 10) / 10, assets, members };
  });
}
