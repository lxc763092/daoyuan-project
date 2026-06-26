import type { RegionDef } from '../types';

export const REGIONS: RegionDef[] = [
  // ──────────────────────────────────────────────
  // 人界 · 越國（大區）
  // ──────────────────────────────────────────────
  {
    id: '越國',
    name: '越國',
    tier: 'human',
    description:
      '天南修仙世界核心地域，七大修仙派林立，正魔並存。韓立修仙生涯的起點，後遭魔道六宗侵佔，再由正道宗門收復。',
    unlockChapter: 1,
  },
  {
    id: '七玄門',
    name: '七玄門',
    tier: 'human',
    parentId: '越國',
    description:
      '越國鏡州彩霞山（落鳳山）上的中小修仙門派，設有七玄殿、七絕堂等。韓立以凡人少年身份加入，在此踏上修仙之路。',
    unlockChapter: 1,
  },
  {
    id: '青牛鎮',
    name: '青牛鎮',
    tier: 'human',
    parentId: '越國',
    description:
      '越國鏡州七玄門勢力範圍內的集鎮，春香酒樓為七玄門旗下產業。韓立幼年故地，百餘年後重返，已由小鎮擴為小城。',
    unlockChapter: 1,
  },
  {
    id: '彩霞山',
    name: '彩霞山',
    tier: 'human',
    parentId: '越國',
    description:
      '鏡州第二大山，原名落鳳山，七玄門百年前遷此設立總門，主峰為落日峰，七玄門總堂設於此。',
    unlockChapter: 1,
  },
  {
    id: '黃楓谷',
    name: '黃楓谷',
    tier: 'human',
    parentId: '越國',
    description:
      '越國七大修仙派之一，佔據太岳山脈中部，門下弟子萬餘人，設有岳麓殿、傳功閣、百機堂、玄坤山等設施。以超大型奇門大陣遮掩全境。韓立由煉氣期入門，在此突破築基中期。',
    unlockChapter: 3,
  },
  {
    id: '掩月宗',
    name: '掩月宗',
    tier: 'human',
    parentId: '越國',
    description:
      '越國七大修仙派之一，越國正道最強宗門。後因魔道之亂失去根據地，宗門遷往玲瓏山。與落雲宗關係複雜。',
    unlockChapter: 5,
  },
  {
    id: '血色禁地',
    name: '血色禁地',
    tier: 'human',
    parentId: '越國',
    description:
      '七大派共同管理的天地靈藥產地，每五年開放一次，分外圍與中心區三層，禁塔屹立其中。是越國弟子磨礪與奪寶的危險秘境。',
    unlockChapter: 8,
  },
  {
    id: '越京',
    name: '越京',
    tier: 'human',
    parentId: '越國',
    description:
      '越國首都，四城區格局，黑煞教潛伏皇宮內。韓立曾在此剿滅黑煞教並護衛秦家。',
    unlockChapter: 10,
  },
  // ──────────────────────────────────────────────
  // 人界 · 天南大區
  // ──────────────────────────────────────────────
  {
    id: '天南',
    name: '天南',
    tier: 'human',
    description:
      '人界南部廣大陸地，四面環海，九國盟為政治核心，正邪兩道宗門林立。韓立在此渡過自結丹至元嬰的漫長歲月。',
    unlockChapter: 1,
  },
  {
    id: '溪國',
    name: '溪國',
    tier: 'human',
    parentId: '天南',
    description:
      '天南最北部國家，屬天道盟，分七州，落雲宗、古劍門、百巧院三宗座落境內雲夢山脈。面積約越國三分之二。',
    unlockChapter: 480,
  },
  {
    id: '落雲宗',
    name: '落雲宗',
    tier: 'human',
    parentId: '溪國',
    description:
      '天道盟成員宗門，與古劍門、百巧院共占溪國雲夢山脈。韓立長期掛名宗門，後以其威名將落雲宗撐起「超級大宗」地位，子母峰為韓立個人洞府。',
    unlockChapter: 490,
  },
  {
    id: '雲夢山',
    name: '雲夢山',
    tier: 'human',
    parentId: '溪國',
    description:
      '天南著名靈氣聖脈，山脈深處有靈眼之樹，落雲宗、古劍門、百巧院三派共同占據。',
    unlockChapter: 490,
  },
  {
    id: '闐天城',
    name: '闐天城',
    tier: 'human',
    parentId: '天南',
    description:
      '天南唯一修士之城，九國盟總壇所在，護城大陣為「上元滅光陣」，天南第一交易大會於此舉辦。後被慕蘭法士攻陷。',
    unlockChapter: 500,
  },
  {
    id: '墜魔谷',
    name: '墜魔谷',
    tier: 'human',
    parentId: '天南',
    description:
      '天南第一凶地，上古戰場遺址，空間紊亂、古陣禁制密布，谷中藏有無數寶物與空間裂縫，每五十年有一年相對穩定期。',
    unlockChapter: 530,
  },
  {
    id: '慕蘭草原',
    name: '慕蘭草原',
    tier: 'human',
    parentId: '天南',
    description:
      '天南以北廣袤草原，慕蘭法士的發源地，後大半被突兀人（天瀾草原）佔據。韓立往返天南與大晉的必經走廊。',
    unlockChapter: 500,
  },
  // ──────────────────────────────────────────────
  // 人界 · 亂星海
  // ──────────────────────────────────────────────
  {
    id: '亂星海',
    name: '亂星海',
    tier: 'human',
    description:
      '天南以外廣大海域，分內星海與外星海（妖海）。星宮與逆星盟兩大勢力長期在此角力，韓立在此渡過元嬰期大半歲月。',
    unlockChapter: 500,
  },
  {
    id: '天星城',
    name: '天星城',
    tier: 'human',
    parentId: '亂星海',
    description:
      '亂星海第一大城，以天星島巨山為核心螺旋修建共八十一層，設有傳送陣樞紐「星空殿」，由天星宮統轄。韓立離開天南後長期居住於此。',
    unlockChapter: 500,
  },
  {
    id: '虛天殿',
    name: '虛天殿',
    tier: 'human',
    parentId: '亂星海',
    description:
      '上古蠻荒古修士遺留的密殿，每三百年從天外降落一次。殿內含冰火道、鬼冤之地等多重關卡，深藏壽元果、虛天鼎等稀世珍寶。',
    unlockChapter: 510,
  },
  {
    id: '小寰島',
    name: '小寰島',
    tier: 'human',
    parentId: '亂星海',
    description:
      '魁星島附屬小島，長約六七十里，島上有一條細小靈脈。韓立元嬰初期選此作為長期閉關之地，自立為島主，苦修逾二十年。',
    unlockChapter: 505,
  },
  {
    id: '極陰島',
    name: '極陰島',
    tier: 'human',
    parentId: '亂星海',
    description:
      '魔道老祖極陰老祖的勢力根據地，以修煉玄陰魔功為主，是亂星海魔道一系的重要據點。',
    unlockChapter: 502,
  },
  // ──────────────────────────────────────────────
  // 人界 · 大晉
  // ──────────────────────────────────────────────
  {
    id: '大晉',
    name: '大晉',
    tier: 'human',
    description:
      '人界東部龐大修仙重鎮，宗門林立、靈地眾多，三道四宗聯合管轄晉西坊市，十年一度晉京大拍賣吸引天下修士。',
    unlockChapter: 700,
  },
  {
    id: '晉京',
    name: '晉京',
    tier: 'human',
    parentId: '大晉',
    description:
      '大晉凡人皇城，分十三區，設有晉西坊市及十年一度修仙大拍賣，附設九霄殿（元嬰級）與寶光殿（結丹級）。',
    unlockChapter: 700,
  },
  {
    id: '昆吾山',
    name: '昆吾山',
    tier: 'human',
    parentId: '大晉',
    description:
      '人界著名靈山，被昆吾三老以九真伏魔大陣封印地下數千年。山中設有昆吾殿、靈寶閣、鎮魔塔（倒建九層）等建築。',
    unlockChapter: 760,
  },
  {
    id: '太一門',
    name: '太一門',
    tier: 'human',
    parentId: '大晉',
    description:
      '大晉正道第一宗，坐落於真桓山，大晉四大靈脈之一，擁有化神期以上長老坐鎮。',
    unlockChapter: 700,
  },
  // ──────────────────────────────────────────────
  // 靈界（大區）
  // ──────────────────────────────────────────────
  {
    id: '靈界',
    name: '靈界',
    tier: 'spirit',
    description:
      '下界修士渡大天劫飛升後抵達的高階世界，靈氣遠超人界，人族、妖族、飛靈族等強大勢力並存。韓立在此歷經合體、大乘等重大突破。',
    unlockChapter: 1300,
  },
  {
    id: '風元大陸',
    name: '風元大陸',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '靈界主要大陸之一，亦是韓立飛升落腳之地。天鵬族聚居於此，司南祭壇測算範圍涵蓋此大陸。',
    unlockChapter: 1300,
  },
  {
    id: '天淵城',
    name: '天淵城',
    tier: 'spirit',
    parentId: '風元大陸',
    description:
      '靈界人妖兩族共同守衛的超大型城市，亦是進出蠻荒世界的唯一通道。城內設有太玄殿、拍賣行、天廣殿等設施，青冥衛護城。韓立飛升後最初落腳之地。',
    unlockChapter: 1300,
  },
  {
    id: '天雲大陸',
    name: '天雲大陸',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '靈界主要大陸，天雲十三族聚居地，晶族、石繭族、萬古族等異族並存。雲城懸浮萬丈高空，魔金山脈坐落於此。',
    unlockChapter: 1400,
  },
  {
    id: '雲城',
    name: '雲城',
    tier: 'spirit',
    parentId: '天雲大陸',
    description:
      '天雲十三族第三大城，懸浮萬丈高空，外設十三具戰爭傀儡球體護城，是四族拍賣大會的舉辦地。後遭角蚩族大軍攻入。',
    unlockChapter: 1400,
  },
  {
    id: '黑葉森林',
    name: '黑葉森林',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '靈界木族轄地，靈氣濃郁，以腰帶顏色標示等階的木族在此聚居，是人族修士進入木族領地的主要路徑之一。',
    unlockChapter: 1350,
  },
  {
    id: '天鵬聖城',
    name: '天鵬聖城',
    tier: 'spirit',
    parentId: '風元大陸',
    description:
      '飛靈族天鵬分支聖地，依萬丈巨山群而建，設有「天鵬之禁」光幕大陣，城中居民約三四千萬，內有封靈塔、交易大殿等設施。',
    unlockChapter: 1350,
  },
  {
    id: '地淵',
    name: '地淵',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '飛靈族封魔門外的七層地下世界，越深處陰氣越重，聚集各種稀有妖物與古老妖王。每三百年開放一次供修士試煉。',
    unlockChapter: 1380,
  },
  {
    id: '冥河之地',
    name: '冥河之地',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '靈界附屬獨立空間，被萬丈陰水籠罩，陰氣彌漫。韓立推斷其本質為一頭已死羅睺獸屍體所化，內藏「魔墳」，蜉蝣族聖地。',
    unlockChapter: 1420,
  },
  {
    id: '廣寒界',
    name: '廣寒界',
    tier: 'spirit',
    parentId: '天雲大陸',
    description:
      '定期開啟的秘境界域，靈氣濃度達靈界十倍，合體期以上修士禁止入內，由天雲十三族共管。界內含暗獸森林等危險地帶。',
    unlockChapter: 1500,
  },
  {
    id: '玄武境',
    name: '玄武境',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '霸皇統治的人族三境之一，標誌性建築玄武城建於古龜「驂靈」背上，可移動的海上巨城。後期暴魔族盤踞此境。',
    unlockChapter: 1300,
  },
  {
    id: '天元境',
    name: '天元境',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '天元聖皇（儒皇）統治的人族三境之一，真靈世家萬靈大典在此舉行。韓立晉升合體後長期活動於此境。',
    unlockChapter: 1300,
  },
  {
    id: '無涯海',
    name: '無涯海',
    tier: 'spirit',
    parentId: '靈界',
    description:
      '靈界人妖兩族勢力之間的廣闊海域，天然蘊含兩儀磁光地脈，韓立的青元宮所在元合島即位於此海。',
    unlockChapter: 1800,
  },
  {
    id: '青元宮',
    name: '青元宮',
    tier: 'spirit',
    parentId: '無涯海',
    description:
      '韓立以靈界無涯海元合島最高峰為中心建立的宮殿與門派，是其大乘期在靈界的主要居所與根基，飛昇之劫亦在此地進行。',
    unlockChapter: 1800,
  },
  // ──────────────────────────────────────────────
  // 魔界
  // ──────────────────────────────────────────────
  {
    id: '魔界',
    name: '魔界',
    tier: 'demon',
    description:
      '魔族起源與聚居之所，魔氣充沛、環境險惡，禁地遍布，法力壓制。魔族三始祖坐鎮，至寶眾多，人族修士罕至之域。',
    unlockChapter: 1900,
  },
  {
    id: '幻嘯沙漠',
    name: '幻嘯沙漠',
    tier: 'demon',
    parentId: '魔界',
    description:
      '魔界十大禁地之一。進入後法力被壓制九成，只能步行穿越，三大魔害「落魂風、地湮沙、幻嘯魔狼」橫行其中。',
    unlockChapter: 1900,
  },
  {
    id: '幻夜城',
    name: '幻夜城',
    tier: 'demon',
    parentId: '魔界',
    description:
      '魔界重要城池，有十餘名魔尊坐鎮，白、趙、寧、方四大家族及萬奴塔共同把持。穿越幻嘯沙漠後的重要補給據點。',
    unlockChapter: 1910,
  },
  {
    id: '魔源海',
    name: '魔源海',
    tier: 'demon',
    parentId: '魔界',
    description:
      '魔界最東端廣大魔海，海面漆黑、雷電密布，是魔族的起源之地。苦靈島坐落其內，洗靈池與凈靈蓮傳說藏於其中。',
    unlockChapter: 1950,
  },
  {
    id: '苦靈島',
    name: '苦靈島',
    tier: 'demon',
    parentId: '魔源海',
    description:
      '魔源海中翠綠巨型島嶼，靈氣精純程度遠超靈界頂階靈脈。苦靈谷內聳立靈霄天柱，洗靈池與凈靈蓮坐落於此，魔族三始祖輪流鎮守。',
    unlockChapter: 1960,
  },
  // ──────────────────────────────────────────────
  // 仙界
  // ──────────────────────────────────────────────
  {
    id: '仙界',
    name: '仙界',
    tier: 'immortal',
    description:
      '大乘圓滿修士渡飛升天劫後方可抵達的境界，靈氣轉化為仙元力，規則與人界迥異，真仙境及以上存在居於此。',
    unlockChapter: 2440,
  },
  {
    id: '北寒仙域',
    name: '北寒仙域',
    tier: 'immortal',
    parentId: '仙界',
    description:
      '仙界北方四大仙域之一，以嚴寒著稱，常年大雪飛舞，空中蘊含奇寒之力。韓立飛昇後最先抵達之地，仙人高升在此相迎。',
    unlockChapter: 2440,
  },
];
