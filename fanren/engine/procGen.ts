/**
 * 程序生成：以詞素＋境界即時生成隨機 野怪／散修NPC（帶功法與物品）／小勢力／功法／道具／材料。
 * 用於探索與旅途遭遇、掉落，確保「NPC 手中有物、背包有料、世界不空」。
 * 純前端可用 Math.random。
 */
import type { ItemGrant } from './loot';
import type { TechniqueDef, CanonItem, NamedBeast } from '../types';
import { namedBeastForRank } from '../data/beasts';
import { TECH_DOMAINS, ITEM_DOMAINS, NPC_BANKS } from '../data/genBanks';
import { BEAST_LINEAGES } from '../data/beastBanks';
import { hashSeed, rngFor, type RNG } from './registry';

const SURNAMES = '王李張劉陳楊趙黃周吳徐孫胡朱高林何郭馬羅梁宋鄭韓唐馮董蕭程曹袁鄧許傅沈曾彭呂蘇盧蔣蔡賈丁魏薛葉閻余潘杜戴夏鍾汪田任姜范方石姚譚廖鄒熊金陸郝孔白崔康毛邱秦江史顧侯邵孟龍萬段章錢湯尹黎易常武喬賀賴龔文歐陽司馬上官'.split('');
const GIVEN = '風雲山河海天玄靈元陽陰炎冰雷光影塵霜月星輝寒虛清濁真妙奇逸謙遠志嶽峰淵濤瑞祥瀾燁燭璇璣瓊璞珩淩鶴鵬蒼樺梧桐'.split('');
const COURTESY = ['道友', '散人', '上人', '真人', '老怪', '前輩', '道長', '居士', '仙子', '魔君'];

const BEAST_PRE = '赤玄銀血金碧幽雷風火冰毒鐵骨墨青紫烈陰陽獰蒼戾噬'.split('');
const BEAST_BODY = ['蛟', '狼', '蟒', '鵰', '虎', '猿', '蛛', '蜈', '蟾', '鯊', '蝠', '獅', '鱷', '犀', '蜥', '豹', '鷹', '鵬', '龜', '蜂', '蠍', '鯤', '螭', '蟬'];

const T_PRE = '玄青赤紫九五太天真混幽血金碧玉陰陽離坎乾坤北南'.split('');
const T_CORE = '元陽陰雷火冰罡煞靈玄劍魔風土金木水光冥'.split('');
const T_SUF = ['訣', '功', '經', '法', '真解', '秘術', '神通', '心法', '寶典', '大法'];

const F_PRE = '青玄血幽萬天九赤靈紫碧金落雲'.split('');
const F_MID = '劍丹符魔雲霞山海靈玄陽陰星月'.split('');
const F_SUF = ['宗', '門', '派', '谷', '閣', '堂', '盟', '教', '島', '山莊', '洞天', '塢'];

const HERB_PRE = ['百年', '三百年', '千年', '萬年', '玄', '赤', '紫', '幽', '寒', '靈', '九葉', '血'];
const HERB_BODY = ['靈芝', '靈草', '靈花', '靈果', '仙草', '藥王', '靈乳', '靈參', '靈蕊', '妙藥', '紫菌', '玉露'];
const MAT_BODY = ['玄鐵', '靈晶', '寒玉', '妖丹', '靈髓', '精金', '靈砂', '玄冰', '地火精', '雷竹', '魔晶', '骨精'];
const TRE_BODY = ['飛劍', '寶幡', '靈鐘', '法鼎', '靈環', '寶珠', '令旗', '法輪', '護身符', '靈盾', '玉簡', '銀針'];

const REALMS = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
const RARITY_BY_RANK = ['普通', '普通', '稀有', '稀有', '传说', '传说', '仙品'];

function pick<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)]; }
function chance(p: number): boolean { return Math.random() < p; }

/** 隨機修士姓名（含偶見複姓與道號）。 */
export function genName(): string {
  const surname = pick(NPC_BANKS.surnames);
  const given = chance(0.5) ? pick(NPC_BANKS.givenMale) : pick(NPC_BANKS.givenMale) + pick(NPC_BANKS.givenMale);
  return surname + given;
}
export function genTitledName(): string {
  return genName() + (chance(0.4) ? pick(COURTESY) : '');
}

/** 由地域層級推估遭遇境界（tier 高則境界高）。 */
export function realmForTier(tier: string, baseRealm: string): string {
  const idx = { human: 0, spirit: 2, demon: 3, immortal: 4 }[tier] ?? 0;
  const baseIdx = REALMS.indexOf(baseRealm) >= 0 ? REALMS.indexOf(baseRealm) : 0;
  const r = Math.min(4, Math.max(0, Math.round((idx + baseIdx) / 2) + (chance(0.3) ? 1 : 0)));
  return REALMS[r];
}
function rarityForRealm(realm: string): string {
  const i = Math.max(0, REALMS.indexOf(realm));
  return RARITY_BY_RANK[Math.min(RARITY_BY_RANK.length - 1, i + (chance(0.3) ? 1 : 0))];
}
/** 具名妖獸掉落稀有度（傳統字/別字）→ ItemGrant 稀有度。 */
function normBeastRarity(r: string): ItemGrant['rarity'] {
  if (r === '仙品') return '仙品';
  if (r === '史詩' || r === '傳說' || r === '传说') return '传说';
  if (r === '優良' || r === '精良' || r === '稀有') return '稀有';
  if (r === '普通') return '普通';
  return '稀有';
}

export function genTechniqueName(): string {
  return genTechniqueFull(Math.random).name;
}
export function genFactionName(): string {
  return pick(F_PRE) + pick(F_MID) + pick(F_SUF);
}

/** 隨機道具（草藥/材料/法寶）。 */
export function genItem(realm: string, kindHint?: '草药' | '材料' | '法宝'): ItemGrant {
  const kind = kindHint || (pick(['草药', '草药', '材料', '材料', '法宝']) as ItemGrant['type']);
  let name: string;
  if (kind === '草药') name = pick(HERB_PRE) + pick(HERB_BODY);
  else if (kind === '材料') name = pick(BEAST_PRE) + pick(MAT_BODY);
  else name = pick(F_PRE) + pick(TRE_BODY);
  const rarity = rarityForRealm(realm) as ItemGrant['rarity'];
  return { name, type: kind, rarity, quantity: 1, description: `${realm}層次的${kind === '草药' ? '靈藥' : kind === '材料' ? '靈材' : '法器'}，於野外機緣偶得。` };
}

export interface GenMonster {
  name: string;
  realm: string;
  beastType: string;
  drops: ItemGrant[];
}
/** 隨機野怪/妖獸（含妖丹/材料掉落）。約四成機率注入 codex 具名妖獸（境界相近）。 */
export function genMonster(tier: string, baseRealm: string): GenMonster {
  const realm = realmForTier(tier, baseRealm);
  const rank = Math.max(0, REALMS.indexOf(realm));
  if (chance(0.4)) {
    const nb = namedBeastForRank(rank, Math.random());
    if (nb) {
      const drops: ItemGrant[] = (nb.drops || []).map((d) => ({ name: d.name, type: '材料' as const, rarity: normBeastRarity(d.rarity), quantity: 1, description: `${nb.name}（${nb.realm}·${nb.beastType}）身上的掉落，${nb.region}所出。` }));
      if (!drops.length) drops.push({ name: `${nb.name.slice(0, 2)}妖丹`, type: '材料', rarity: rarityForRealm(realm) as ItemGrant['rarity'], quantity: 1, description: `${nb.name}的內丹。` });
      return { name: nb.name, realm: nb.realm, beastType: nb.beastType, drops };
    }
  }
  // 程序合成：自妖獸譜系詞庫（~9.6 萬種名）組合，境界仍依地域 tier
  const lin = pick(BEAST_LINEAGES);
  const name = pick(lin.prefixes) + pick(lin.bodies) + (chance(0.25) ? pick(lin.suffixes) : '');
  const drops: ItemGrant[] = [{ name: `${name.slice(0, 2)}${pick(lin.dropParts)}`, type: '材料', rarity: rarityForRealm(realm) as ItemGrant['rarity'], quantity: 1, description: `${name}的掉落，煉丹煉器之珍材。` }];
  if (chance(0.5)) drops.push(genItem(realm, '材料'));
  return { name, realm, beastType: lin.name, drops };
}

export interface GenNpc {
  name: string;
  realm: string;
  faction: string;
  technique: string;
  item: ItemGrant;
}
/** 隨機散修/小人物 NPC——必帶一門功法與一件隨身物（不讓 NPC 手中空空）。 */
export function genNpc(tier: string, baseRealm: string): GenNpc {
  const realm = realmForTier(tier, baseRealm);
  return {
    name: genName(),
    realm,
    faction: chance(0.5) ? '散修' : genFactionName(),
    technique: genTechniqueName(),
    item: genItem(realm),
  };
}

export interface GenFaction {
  name: string;
  type: string;
  alignment: string;
  note: string;
}
export function genFaction(regionName: string): GenFaction {
  const align = pick(['正道', '魔道', '中立散修', '妖族']);
  return {
    name: genFactionName(),
    type: pick(['宗門', '世家', '散修聯盟', '商會', '山寨']),
    alignment: align,
    note: `盤踞${regionName}一帶的${align}小勢力，新近崛起，門人不多卻自成一格。`,
  };
}

// ════════════════════════════════════════════════════════
// 領域化・可 seed 的完整生成器——支撐 5000+ 功法 / 100000+ 物品 / 5000+ 野獸
// ════════════════════════════════════════════════════════
function pkR<T>(a: T[], rng: RNG): T { return a[Math.floor(rng() * a.length) % a.length]; }
function chR(p: number, rng: RNG): boolean { return rng() < p; }
function idOf(prefix: string, name: string): string { return prefix + hashSeed(name).toString(36); }

const TECH_REALM_REQS = ['炼气期', '筑基期', '结丹期', '元婴期', '化神期'];
const ITEM_REALM_TIERS = ['炼气', '筑基', '金丹', '元婴', '化神', '炼虚以上', '通用'];
const BEAST_REALMS = ['煉氣期', '築基期', '結丹期', '元嬰期', '化神期', '煉虛期', '合體期', '大乘期'];
const TECH_PRIMARY: Record<string, 'attack' | 'defense' | 'spirit' | 'physique' | 'speed' | 'maxHp'> = {
  sword: 'attack', blade: 'attack', talisman: 'spirit', formation: 'spirit', body: 'physique', agility: 'speed',
  soul: 'spirit', beast: 'attack', refining: 'attack', thunder: 'attack', demonic: 'attack', buddhist: 'maxHp',
  illusion: 'spirit', sound: 'spirit', poison: 'attack', elemental: 'attack', space: 'speed', blood: 'attack',
  cultivation: 'spirit', artifact: 'attack', generic: 'spirit',
};
const TECH_ML: Record<string, number> = { 炼气期: 7, 筑基期: 9, 结丹期: 9, 元婴期: 11, 化神期: 13 };

/** 由領域詞庫生成一門完整功法（可 seed）。 */
export function genTechniqueFull(rng: RNG, domainKey?: string): TechniqueDef {
  const d = (domainKey && TECH_DOMAINS.find((x) => x.key === domainKey)) || pkR(TECH_DOMAINS, rng);
  const core = d.elements && d.elements.length && chR(0.45, rng) ? pkR(d.elements, rng) : pkR(d.cores, rng);
  const name = pkR(d.prefixes, rng) + core + pkR(d.suffixes, rng);
  const realmReq = pkR(TECH_REALM_REQS, rng);
  const grade = pkR(d.grades.length ? d.grades : ['玄階'], rng);
  const primary = TECH_PRIMARY[d.category] || TECH_PRIMARY[d.key] || 'spirit';
  return {
    id: idOf('gt_' + d.key + '_', name),
    name,
    category: d.category,
    realmReq,
    maxLevel: TECH_ML[realmReq] || 9,
    desc: `${grade}${d.name}一脈功法，以${core}為樞、循「${name}」之法門修持，於${realmReq}修士間頗有流傳。`,
    canonRefs: [d.name],
    statBonus: { [primary]: 3 } as any,
  };
}

/** 由領域詞庫生成一件完整物品（可 seed）。 */
export function genItemFull(rng: RNG, domainKey?: string): CanonItem {
  const d = (domainKey && ITEM_DOMAINS.find((x) => x.key === domainKey)) || pkR(ITEM_DOMAINS, rng);
  const mod = chR(0.7, rng) ? pkR(d.modifiers, rng) : '';
  const suf = d.suffixes && d.suffixes.length ? pkR(d.suffixes, rng) : '';
  const name = mod + pkR(d.prefixes, rng) + pkR(d.bodies, rng) + suf;
  const roll = rng();
  const rarity = roll < 0.5 ? '普通' : roll < 0.8 ? '精良' : roll < 0.95 ? '稀有' : roll < 0.99 ? '传说' : '仙品';
  return {
    id: idOf('gi_' + d.key + '_', name),
    name,
    kind: d.kind,
    rarity,
    realmTier: pkR(ITEM_REALM_TIERS, rng),
    effect: `${d.name}一類之物，「${name}」，於修士行走江湖、煉製交易間流通。`,
  };
}

/** 由妖獸譜系詞庫生成一隻完整妖獸（可 seed）。 */
export function genBeastFull(rng: RNG, lineageKey?: string): NamedBeast {
  const l = (lineageKey && BEAST_LINEAGES.find((x) => x.key === lineageKey)) || pkR(BEAST_LINEAGES, rng);
  const name = pkR(l.prefixes, rng) + pkR(l.bodies, rng) + (chR(0.3, rng) ? pkR(l.suffixes, rng) : '');
  const realm = pkR(BEAST_REALMS, rng);
  const nDrops = 1 + Math.floor(rng() * 3);
  const drops: { name: string; rarity: string }[] = [];
  for (let i = 0; i < nDrops; i++) drops.push({ name: name.slice(0, 2) + pkR(l.dropParts, rng), rarity: pkR(['普通', '稀有', '優良', '史詩'], rng) });
  return { id: idOf('gb_' + l.key + '_', name), name, realm, beastType: l.name, region: '不詳之野', desc: `${l.name}一脈的妖獸「${name}」，${realm}之屬，出沒山野水澤之間。`, drops };
}

export interface GenNpcFull {
  name: string; realm: string; gender: 'male' | 'female'; faction: string; origin: string; trait: string; physique: string; title: string; technique: string; item: ItemGrant;
}
/** 由人物詞庫生成一個血肉豐滿的 NPC（可 seed）。 */
export function genNpcFull(rng: RNG, tier: string, baseRealm: string): GenNpcFull {
  const realm = realmForTier(tier, baseRealm);
  const female = chR(0.4, rng);
  const surname = pkR(NPC_BANKS.surnames, rng);
  const givenPool = female ? NPC_BANKS.givenFemale : NPC_BANKS.givenMale;
  const given = chR(0.5, rng) ? pkR(givenPool, rng) : pkR(givenPool, rng) + pkR(givenPool, rng);
  const sect = chR(0.55, rng) ? pkR(NPC_BANKS.sectPrefixes, rng) + pkR(NPC_BANKS.sectSuffixes, rng) : '散修';
  const tech = genTechniqueFull(rng);
  const item = genItemFull(rng);
  return {
    name: surname + given, realm, gender: female ? 'female' : 'male', faction: sect,
    origin: pkR(NPC_BANKS.origins, rng), trait: pkR(NPC_BANKS.traits, rng), physique: pkR(NPC_BANKS.physiques, rng), title: pkR(NPC_BANKS.titles, rng),
    technique: tech.name,
    item: { name: item.name, type: '材料', rarity: (item.rarity === '精良' ? '稀有' : item.rarity) as ItemGrant['rarity'], quantity: 1, description: item.effect },
  };
}

// ── 註冊表：以決定性 seed 取穩定實體（同 key 永得同一實體）──
export function techniqueForSeed(key: string): TechniqueDef { return genTechniqueFull(rngFor('tech:' + key)); }
export function itemForSeed(key: string): CanonItem { return genItemFull(rngFor('item:' + key)); }
export function beastForSeed(key: string): NamedBeast { return genBeastFull(rngFor('beast:' + key)); }
export function npcForSeed(key: string, tier = 'human', realm = '炼气期'): GenNpcFull { return genNpcFull(rngFor('npc:' + key), tier, realm); }
