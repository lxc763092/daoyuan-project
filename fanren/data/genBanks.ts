import type { TechDomainBank, ItemDomainBank, NpcBanks } from '../types';
import { AUTHORED_TECH, AUTHORED_ITEM, AUTHORED_NPC } from './genBanksAuthored';

/**
 * 程序生成詞庫：功法 / 物品 / 人物 的領域化詞素。
 * 此檔含「基礎詞庫」(fallback)；agent 叢集的豐富詞素由整合腳本 union 併入（去重）。
 * 組合空間遠超 5,000 功法 / 100,000 物品（見 TECH_NAME_SPACE / ITEM_NAME_SPACE）。
 */

const FALLBACK_TECH: TechDomainBank[] = [
  { key: 'sword', name: '劍道', category: 'sword', prefixes: ['青', '玄', '赤', '流光', '追星', '御劍', '九天', '太虛', '驚鴻', '斷水'], cores: ['元', '罡', '虹', '霜', '光', '芒', '心', '影', '鋒', '寒'], suffixes: ['訣', '劍訣', '劍典', '心法', '神通', '秘錄'], elements: ['金', '木', '水', '火', '土', '雷', '風', '冰'], grades: ['黃階', '玄階', '地階', '天階'] },
  { key: 'blade', name: '刀道', category: 'sword', prefixes: ['烈', '血', '狂', '破軍', '裂空', '霸刀', '玄', '赤'], cores: ['芒', '罡', '煞', '焰', '影', '魂', '霸', '殺'], suffixes: ['訣', '刀訣', '刀典', '法', '神通'], elements: ['火', '雷', '金', '血'], grades: ['黃階', '玄階', '地階', '天階'] },
  { key: 'cultivation', name: '主修功法', category: 'generic', prefixes: ['長春', '青元', '太清', '混元', '玄天', '北冥', '太上', '九轉', '無極'], cores: ['真', '元', '罡', '靈', '玄', '陽', '陰', '氣'], suffixes: ['功', '訣', '經', '真解', '寶典', '大法'], elements: ['金', '木', '水', '火', '土'], grades: ['下品', '中品', '上品', '極品'] },
  { key: 'talisman', name: '符道', category: 'talisman', prefixes: ['玄', '太乙', '雷', '赤', '金光', '北斗', '五行'], cores: ['符', '籙', '篆', '咒', '靈', '雷', '陽'], suffixes: ['訣', '秘術', '符法', '真傳', '神通'], elements: ['雷', '火', '金', '木', '水', '土'], grades: ['黃階', '玄階', '地階', '天階'] },
  { key: 'formation', name: '陣道', category: 'formation', prefixes: ['顛倒', '五行', '玄天', '太乙', '九宮', '混元', '困龍'], cores: ['陣', '局', '禁', '樞', '罡', '極'], suffixes: ['訣', '大陣', '陣圖', '秘錄', '真傳'], elements: ['金', '木', '水', '火', '土'], grades: ['黃階', '玄階', '地階', '天階'] },
  { key: 'body', name: '煉體', category: 'body', prefixes: ['金剛', '玄龜', '不滅', '巨力', '銅皮', '九轉', '不壞'], cores: ['體', '身', '骨', '罡', '元', '金', '魔'], suffixes: ['訣', '功', '神功', '寶典', '真解'], elements: ['金', '土', '木'], grades: ['下品', '中品', '上品', '極品'] },
  { key: 'agility', name: '身法遁術', category: 'agility', prefixes: ['御風', '羅煙', '縮地', '追風', '凌波', '五行', '鬼影'], cores: ['遁', '步', '影', '虛', '風', '光', '行'], suffixes: ['步', '訣', '遁術', '身法', '神通'], elements: ['風', '土', '水', '火', '金', '木'], grades: ['黃階', '玄階', '地階', '天階'] },
  { key: 'soul', name: '神識魂修', category: 'soul', prefixes: ['大衍', '太玄', '攝魂', '噬魂', '梵音', '太一', '幽冥'], cores: ['神', '識', '魂', '念', '靈', '心', '冥'], suffixes: ['訣', '神識篇', '秘術', '真解', '神通'], elements: ['冥', '陰', '陽'], grades: ['玄階', '地階', '天階'] },
  { key: 'thunder', name: '雷法', category: 'generic', prefixes: ['辟邪', '九天', '紫霄', '五雷', '玄天', '太乙', '混元'], cores: ['雷', '霆', '電', '罡', '霹', '震'], suffixes: ['訣', '神雷', '雷法', '正法', '神通'], elements: ['雷'], grades: ['玄階', '地階', '天階'] },
  { key: 'demonic', name: '魔功', category: 'generic', prefixes: ['血', '噬', '焚天', '幽冥', '九幽', '天魔', '攝心'], cores: ['魔', '血', '煞', '冥', '陰', '噬', '屍'], suffixes: ['功', '大法', '魔典', '秘術', '邪法'], elements: ['血', '冥', '陰'], grades: ['下品', '中品', '上品', '極品'] },
  { key: 'buddhist', name: '佛門金剛', category: 'body', prefixes: ['金剛', '般若', '明王', '梵聖', '羅漢', '舍利', '伏魔'], cores: ['佛', '梵', '禪', '舍利', '金身', '光'], suffixes: ['訣', '經', '法相', '真法', '神通'], elements: ['金', '光'], grades: ['玄階', '地階', '天階'] },
  { key: 'beast', name: '妖獸獸道', category: 'beast', prefixes: ['馴獸', '萬獸', '噬靈', '化形', '血脈', '通靈', '御獸'], cores: ['獸', '妖', '血', '魂', '化', '吞'], suffixes: ['訣', '錄', '真經', '秘術', '神通'], elements: ['木', '土', '血'], grades: ['黃階', '玄階', '地階', '天階'] },
  { key: 'illusion', name: '幻術', category: 'generic', prefixes: ['迷魂', '攝心', '千幻', '夢魘', '九天', '太陰', '惑神'], cores: ['幻', '夢', '魅', '迷', '惑', '影'], suffixes: ['訣', '秘術', '幻法', '神通', '真解'], elements: ['陰', '冥'], grades: ['玄階', '地階', '天階'] },
  { key: 'sound', name: '音波音律', category: 'generic', prefixes: ['梵音', '震天', '裂石', '九霄', '太古', '攝魂'], cores: ['音', '波', '鐘', '吟', '嘯', '鳴'], suffixes: ['訣', '神音', '音律', '秘術', '神通'], elements: ['風', '雷'], grades: ['玄階', '地階', '天階'] },
  { key: 'poison', name: '毒功', category: 'generic', prefixes: ['化骨', '碧血', '萬毒', '七星', '腐天', '蝕魂'], cores: ['毒', '蠱', '瘴', '腐', '蝕', '煞'], suffixes: ['訣', '功', '經', '秘術', '邪法'], elements: ['木', '血'], grades: ['下品', '中品', '上品', '極品'] },
  { key: 'elemental', name: '五行水火冰', category: 'generic', prefixes: ['玄冰', '赤焰', '乾藍', '太陰', '離火', '寒潭', '焚天'], cores: ['火', '冰', '水', '焰', '霜', '罡'], suffixes: ['訣', '真火', '寒功', '秘術', '神通'], elements: ['火', '水', '冰', '土', '金'], grades: ['玄階', '地階', '天階'] },
  { key: 'space', name: '空間虛空', category: 'generic', prefixes: ['縮地', '虛空', '須彌', '挪移', '裂空', '太虛'], cores: ['空', '虛', '界', '門', '裂', '挪'], suffixes: ['訣', '秘術', '神通', '真解'], elements: [], grades: ['地階', '天階', '仙階'] },
  { key: 'blood', name: '血煉煉屍', category: 'generic', prefixes: ['血煉', '煉屍', '養屍', '噬血', '九陰', '殭屍'], cores: ['血', '屍', '煞', '陰', '魂', '骨'], suffixes: ['訣', '大法', '邪典', '秘術'], elements: ['血', '陰', '冥'], grades: ['下品', '中品', '上品', '極品'] },
  { key: 'artifact', name: '御器煉器心法', category: 'refining', prefixes: ['御器', '煉器', '百鍛', '火靈', '萬寶', '太乙'], cores: ['器', '火', '鍛', '靈', '寶', '罡'], suffixes: ['訣', '心法', '真解', '秘術'], elements: ['火', '金'], grades: ['黃階', '玄階', '地階', '天階'] },
];

const FALLBACK_ITEM: ItemDomainBank[] = [
  { key: 'pill', name: '丹藥', kind: '丹药', prefixes: ['黃龍', '養精', '築基', '凝元', '九轉', '太乙', '培元', '回春', '聚靈', '破障'], bodies: ['丹', '丸', '散', '膏', '元丹', '靈丹', '神丹'], suffixes: [], modifiers: ['上品', '極品', '九轉', '太古', '古方', '殘缺'] },
  { key: 'treasure', name: '法寶飛劍', kind: '法宝', prefixes: ['青竹', '玄天', '兩儀', '三焰', '噬金', '七寶', '紫金', '玄陰', '赤陽'], bodies: ['劍', '飛劍', '幡', '鐘', '鼎', '珠', '環', '尺', '輪', '盾', '旗'], suffixes: [], modifiers: ['本命', '上品', '極品', '殘缺', '太古', '靈寶'] },
  { key: 'material', name: '煉器靈材', kind: '材料', prefixes: ['玄', '赤', '寒', '幽', '精', '萬年', '太古'], bodies: ['鐵', '金', '玉', '砂', '晶', '髓', '精', '木'], suffixes: [], modifiers: ['百年', '千年', '萬年', '極品', '太古'] },
  { key: 'herb', name: '靈植靈藥', kind: '灵植', prefixes: ['百年', '千年', '萬年', '玄', '赤', '紫', '幽', '九葉', '血'], bodies: ['靈芝', '靈草', '靈花', '靈果', '仙草', '靈參', '靈蕊', '玉露', '紫菌'], suffixes: [], modifiers: ['百年', '千年', '萬年', '極品'] },
  { key: 'talisman', name: '符籙', kind: '符箓', prefixes: ['金光', '雷', '火', '防禦', '隱形', '五行', '太乙'], bodies: ['符', '符籙', '靈符', '神符', '寶符'], suffixes: [], modifiers: ['上品', '極品', '太乙', '古'] },
  { key: 'puppet', name: '傀儡', kind: '傀儡', prefixes: ['玄鐵', '血屍', '青銅', '骨', '機關', '殺戮'], bodies: ['傀儡', '木偶', '鐵奴', '屍傀', '人偶'], suffixes: [], modifiers: ['上品', '極品', '古', '殘缺'] },
  { key: 'manual', name: '玉簡秘籍', kind: '奇物', prefixes: ['上古', '殘缺', '功法', '陣法', '丹方', '煉器'], bodies: ['玉簡', '秘籍', '殘卷', '圖譜', '寶典', '真解'], suffixes: [], modifiers: ['上古', '殘缺', '完整', '孤本'] },
  { key: 'ore', name: '靈礦礦石', kind: '材料', prefixes: ['玄', '赤', '寒', '紫', '金', '幽冥'], bodies: ['鐵礦', '靈石', '晶石', '玉髓', '精金', '寒鐵'], suffixes: [], modifiers: ['上品', '極品', '太古', '純'] },
  { key: 'core', name: '妖丹獸材', kind: '材料', prefixes: ['赤', '玄', '血', '雷', '毒', '化形'], bodies: ['妖丹', '內丹', '獸核', '妖晶', '精血', '筋骨'], suffixes: [], modifiers: ['上品', '極品', '化形', '古'] },
  { key: 'array', name: '陣盤陣旗', kind: '法宝', prefixes: ['五行', '玄天', '困龍', '九宮', '太乙', '聚靈'], bodies: ['陣盤', '陣旗', '陣樞', '陣盤', '令旗', '陣圖'], suffixes: [], modifiers: ['上品', '極品', '古', '殘缺'] },
  { key: 'furnace', name: '丹爐煉器爐', kind: '法宝', prefixes: ['青陽', '紫金', '玄火', '八卦', '太乙', '九龍'], bodies: ['丹爐', '丹鼎', '煉爐', '寶鼎', '靈鼎'], suffixes: [], modifiers: ['上品', '極品', '古', '靈寶'] },
  { key: 'vessel', name: '靈舟飛行法寶', kind: '法宝', prefixes: ['玄光', '青鵬', '破風', '九霄', '赤雲', '蛟龍'], bodies: ['靈舟', '飛舟', '飛梭', '寶船', '雲車'], suffixes: [], modifiers: ['上品', '極品', '古', '巨'] },
  { key: 'pet', name: '獸卵靈寵', kind: '材料', prefixes: ['赤焰', '玄冰', '雷', '青鸞', '血', '上古'], bodies: ['獸卵', '靈卵', '幼獸', '靈寵', '妖蛋'], suffixes: [], modifiers: ['上古', '稀世', '純血', '異種'] },
  { key: 'poison', name: '毒物', kind: '材料', prefixes: ['化骨', '七星', '碧', '腐心', '蝕魂', '萬'], bodies: ['毒粉', '毒液', '毒蠱', '毒砂', '毒煙'], suffixes: [], modifiers: ['劇', '無解', '極品', '古'] },
  { key: 'food', name: '靈酒靈食', kind: '奇物', prefixes: ['百花', '醉仙', '靈乳', '玉液', '瓊', '九釀'], bodies: ['靈酒', '靈茶', '靈果', '玉露', '仙釀'], suffixes: [], modifiers: ['百年', '千年', '極品', '陳'] },
  { key: 'curio', name: '奇物雜項', kind: '奇物', prefixes: ['儲物', '傳訊', '太古', '玄奇', '神秘', '養魂'], bodies: ['儲物袋', '玉佩', '令牌', '玉瓶', '靈囊', '寶匣'], suffixes: [], modifiers: ['上古', '神秘', '殘缺', '極品'] },
];

const FALLBACK_NPC: NpcBanks = {
  surnames: '王李張劉陳楊趙黃周吳徐孫胡朱高林何郭馬羅梁宋鄭韓唐馮董蕭程曹袁鄧許傅沈曾彭呂蘇盧蔣蔡賈丁魏薛葉閻余潘杜戴夏鍾汪田任姜范方石姚譚廖鄒熊金陸郝孔白崔康毛邱秦江史顧侯邵孟龍萬段章錢湯尹黎易常武喬賀賴龔文'.split('').concat(['歐陽', '上官', '司馬', '夏侯', '諸葛', '南宮', '慕容']),
  givenMale: '風雲山河海天玄靈元陽炎雷光影塵霜星輝寒虛清真奇逸謙遠志嶽峰淵濤瀾燁璇璣珩淩鶴鵬蒼樺梧桐'.split(''),
  givenFemale: '婉瑤靈月霜雪柔嫣妍麗瑩萱蕊珊瓊珞綺嫻黛蘅芸薇茵菡晴嬋姝媛雙'.split(''),
  titles: ['散人', '上人', '真人', '老魔', '道君', '仙子', '上仙', '魔尊', '道友', '前輩', '老怪', '道長', '居士', '真君', '聖女', '魔君', '老祖', '尊者', '大師', '長老'],
  sectPrefixes: '青玄血幽萬天九赤靈紫碧金落星月雲霞太乾坤北南'.split(''),
  sectSuffixes: ['宗', '門', '派', '谷', '閣', '堂', '教', '島', '山莊', '洞天', '塢', '會', '盟', '殿', '府'],
  origins: ['散修', '世家子弟', '宗門弟子', '魔道修士', '妖族', '海族', '靈界後裔', '傀儡修士', '商會中人', '隱世修士', '凡俗豪族', '流亡餘孽'],
  traits: ['狠辣', '謹慎', '貪婪', '護短', '孤傲', '笑面虎', '陰沉', '豪爽', '城府深', '心狠手辣', '謙和', '高傲', '多疑', '重情義', '冷漠', '睚眥必報'],
  physiques: ['天靈根', '雷靈根', '風靈根', '玄陰之體', '純陽之軀', '靈眼', '木靈根', '冰玄之體', '偽靈根', '變異靈根', '通脈之體', '靈犀之心'],
};

// ── 基礎詞庫 ∪ 授權詞庫（去重）──
function uniq(a: string[]): string[] { return Array.from(new Set(a.filter(Boolean))); }
function mergeTech(fb: TechDomainBank[], au: TechDomainBank[]): TechDomainBank[] {
  const map = new Map<string, TechDomainBank>(fb.map((d) => [d.key, { ...d, elements: [...(d.elements || [])] }]));
  for (const a of au) {
    const e = map.get(a.key);
    if (!e) { map.set(a.key, { ...a }); continue; }
    e.prefixes = uniq([...e.prefixes, ...a.prefixes]);
    e.cores = uniq([...e.cores, ...a.cores]);
    e.suffixes = uniq([...e.suffixes, ...a.suffixes]);
    e.grades = uniq([...e.grades, ...(a.grades || [])]);
    e.elements = uniq([...(e.elements || []), ...(a.elements || [])]);
  }
  return Array.from(map.values());
}
function mergeItem(fb: ItemDomainBank[], au: ItemDomainBank[]): ItemDomainBank[] {
  const map = new Map<string, ItemDomainBank>(fb.map((d) => [d.key, { ...d, suffixes: [...(d.suffixes || [])] }]));
  for (const a of au) {
    const e = map.get(a.key);
    if (!e) { map.set(a.key, { ...a }); continue; }
    e.prefixes = uniq([...e.prefixes, ...a.prefixes]);
    e.bodies = uniq([...e.bodies, ...a.bodies]);
    e.suffixes = uniq([...(e.suffixes || []), ...(a.suffixes || [])]);
    e.modifiers = uniq([...e.modifiers, ...a.modifiers]);
  }
  return Array.from(map.values());
}

export const TECH_DOMAINS: TechDomainBank[] = mergeTech(FALLBACK_TECH, AUTHORED_TECH);
export const ITEM_DOMAINS: ItemDomainBank[] = mergeItem(FALLBACK_ITEM, AUTHORED_ITEM);
export const NPC_BANKS: NpcBanks = {
  surnames: uniq([...FALLBACK_NPC.surnames, ...AUTHORED_NPC.surnames]),
  givenMale: uniq([...FALLBACK_NPC.givenMale, ...AUTHORED_NPC.givenMale]),
  givenFemale: uniq([...FALLBACK_NPC.givenFemale, ...AUTHORED_NPC.givenFemale]),
  titles: uniq([...FALLBACK_NPC.titles, ...AUTHORED_NPC.titles]),
  sectPrefixes: uniq([...FALLBACK_NPC.sectPrefixes, ...AUTHORED_NPC.sectPrefixes]),
  sectSuffixes: uniq([...FALLBACK_NPC.sectSuffixes, ...AUTHORED_NPC.sectSuffixes]),
  origins: uniq([...FALLBACK_NPC.origins, ...AUTHORED_NPC.origins]),
  traits: uniq([...FALLBACK_NPC.traits, ...AUTHORED_NPC.traits]),
  physiques: uniq([...FALLBACK_NPC.physiques, ...AUTHORED_NPC.physiques]),
};

function techSpace(d: TechDomainBank): number {
  const elem = (d.elements && d.elements.length) ? d.elements.length : 1;
  return d.prefixes.length * d.cores.length * d.suffixes.length * Math.max(1, Math.round(elem / 2));
}
function itemSpace(d: ItemDomainBank): number {
  const suf = (d.suffixes && d.suffixes.length) ? d.suffixes.length : 1;
  return d.modifiers.length * d.prefixes.length * d.bodies.length * suf;
}
export const TECH_NAME_SPACE = TECH_DOMAINS.reduce((s, d) => s + techSpace(d), 0);
export const ITEM_NAME_SPACE = ITEM_DOMAINS.reduce((s, d) => s + itemSpace(d), 0);
