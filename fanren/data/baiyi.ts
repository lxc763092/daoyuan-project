import type { BaiYiArt } from '../types';

/**
 * 修仙百藝：依《凡人修仙傳》整理的修士職業/技藝目錄。
 * 玩家可修習、累積熟練度；提及目錄外之藝時，引擎於 engine/baiyi.ts 即時生成。
 */
export const BAIYI_CATALOG: BaiYiArt[] = [
  {
    id: 'alchemy',
    name: '丹道',
    category: 'alchemy',
    description: '煉製靈丹妙藥。火候、藥性、配伍缺一不可——韓立由小綠瓶催藥起步，終成一代丹道大家。築基丹、造化丹、培嬰丹皆出此道。',
    practiceVerbs: ['煉丹', '炼丹', '煉製.*丹', '丹方', '丹藥', '開爐', '配藥', '丹道'],
    canonRefs: ['築基丹', '造化丹', '培嬰丹'],
  },
  {
    id: 'refining',
    name: '器道',
    category: 'refining',
    description: '祭煉法器、法寶。自飛劍、盾牌至渡劫玄天之寶，皆賴此藝。元合五極山即頂級煉器之作。',
    practiceVerbs: ['煉器', '炼器', '煉寶', '祭煉', '煉製.*(法器|法寶|飛劍|寶)', '器道'],
    canonRefs: ['元合五極山', '青竹蜂雲劍'],
  },
  {
    id: 'talisman',
    name: '符道',
    category: 'talisman',
    description: '畫制符籙。金光符、太一化清符之屬，臨陣可發、一次性威能驚人；靈界更有銀蝌文仙家符文體系。',
    practiceVerbs: ['制符', '製符', '畫符', '符籙', '符箓', '符道', '繪符'],
    canonRefs: ['金光符', '太一化清符', '銀蝌文'],
  },
  {
    id: 'formation',
    name: '陣道',
    category: 'formation',
    description: '布設陣法與禁制。攻殺如大庚劍陣、困敵如顛倒五行陣、超距如古傳送陣——陣道精深者可一人敵眾。',
    practiceVerbs: ['布陣', '陣法', '設陣', '禁制', '陣道', '擺陣', '佈陣'],
    canonRefs: ['大庚劍陣', '顛倒五行陣', '古傳送陣'],
  },
  {
    id: 'puppet',
    name: '傀儡術',
    category: 'puppet',
    description: '煉製、操控傀儡為戰力延伸。千竹教大衍訣為其代表，通靈傀儡、偽仙儡更是稀世之珍。',
    practiceVerbs: ['傀儡', '煉傀儡', '操傀儡', '大衍訣', '傀儡術'],
    canonRefs: ['通靈傀儡', '大衍訣'],
  },
  {
    id: 'plant',
    name: '靈植',
    category: 'plant',
    description: '培育、催熟靈草靈藥。藥園經營為丹道之本——韓立的小綠瓶即靈植機緣之極。',
    practiceVerbs: ['種植', '靈植', '培育', '催熟', '藥園', '種.*(靈草|靈藥)', '育藥'],
    canonRefs: ['神秘小瓶', '百藥園'],
  },
  {
    id: 'beast',
    name: '馭獸',
    category: 'beast',
    description: '馴養、驅使靈獸妖獸為戰寵或坐騎。御獸之道講究契約與餵養，高階妖獸可化形通靈。',
    practiceVerbs: ['馴獸', '御獸', '馭獸', '收服.*(妖獸|靈獸)', '養.*(靈獸|妖獸)', '畜獸'],
    canonRefs: ['銀月', '啜魂獸'],
  },
  {
    id: 'body',
    name: '煉體',
    category: 'body',
    description: '淬煉肉身，以血肉之軀抗衡法力神通。金剛訣、大力之術使體修近戰無雙。',
    practiceVerbs: ['煉體', '淬體', '体修', '體修', '鍛體', '金剛訣', '練體'],
    canonRefs: ['金剛訣'],
  },
  {
    id: 'agility',
    name: '遁術',
    category: 'agility',
    description: '身法與遁光之術。御風訣、羅煙步之屬，攻則迅捷、守則遁逃，亂星海散修保命之本。',
    practiceVerbs: ['遁術', '身法', '遁光', '御風', '羅煙步', '遁法', '練.*身法'],
    canonRefs: ['御風訣', '羅煙步'],
  },
  {
    id: 'appraisal',
    name: '鑑寶',
    category: 'appraisal',
    description: '辨識靈材、法寶、丹藥之真偽與來歷。坊市行走、撿漏奪寶皆賴一雙慧眼；天眼術更可洞察隱秘。',
    practiceVerbs: ['鑑寶', '鑒寶', '鑑定', '鉴定', '辨識', '辨别', '天眼術', '鑑別'],
    canonRefs: ['天眼術'],
  },
  {
    id: 'disguise',
    name: '易容',
    category: 'disguise',
    description: '改換容貌、隱匿身份之術。匿跡江湖、混入敵巢、避仇尋機，皆可賴此一藝。',
    practiceVerbs: ['易容', '喬裝', '乔装', '變化.*容貌', '改容', '隱匿身份'],
    canonRefs: ['易容術'],
  },
  {
    id: 'soul',
    name: '煉魂',
    category: 'soul',
    description: '神魂、元神之術。攝魂、煉魂、養神，乃至引魂鐘收屍為傀——魂道深邃而多涉禁忌。',
    practiceVerbs: ['煉魂', '攝魂', '魂修', '養神', '引魂', '神魂.*(術|修煉)', '凝神'],
    canonRefs: ['引魂鐘'],
  },
  {
    id: 'medicine',
    name: '醫道',
    category: 'medicine',
    description: '療傷續命、解毒祛疾之術。配合丹道與靈植，可起死回生，亦是結交人脈的善緣之藝。',
    practiceVerbs: ['醫術', '医术', '療傷', '疗伤', '醫道', '解毒', '救治', '行醫'],
    canonRefs: [],
  },
  {
    id: 'sword',
    name: '劍修',
    category: 'sword',
    description: '御劍殺伐之道。青元劍訣一脈以青竹蜂雲劍配庚精，由飛劍而劍陣，攻伐冠絕。',
    practiceVerbs: ['劍訣', '剑诀', '御劍', '御剑', '劍修', '剑修', '練劍', '飛劍'],
    canonRefs: ['青元劍訣', '青竹蜂雲劍'],
  },
];

export function getArt(id: string): BaiYiArt | undefined {
  return BAIYI_CATALOG.find((a) => a.id === id);
}
