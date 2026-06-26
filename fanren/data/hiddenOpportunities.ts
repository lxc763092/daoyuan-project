import type { HiddenOpportunity } from '../types';

/**
 * 提前機緣：原著中本由韓立（或他人）於某章取得/公開的寶物、地點、契機，
 * 玩家若在那之前恰好探索到該地，便能「提前」取走、破壞或介入——
 * 由此引動時間線級聯（蝴蝶效應），震幅越大，後續被改寫的命運越廣。
 */
export const HIDDEN_OPPORTUNITIES: HiddenOpportunity[] = [
  {
    id: 'HO_root_completion_art',
    name: '上古遺府・歸元補靈訣',
    regionId: '亂星海',
    canonChapter: 380, // 結丹前後，外海遺府中偶有逆奪造化的補根祕法殘卷
    discoverHint:
      '你在一處湮沒於外海荒島的上古遺府深處，於一具枯坐的散修遺蛻手中，得見一卷以神識封存的殘玉——其上載著一門失傳的「歸元補靈訣」。此訣專為靈根殘缺者所創，能引天地補缺之氣，重塑所缺之行靈根。對五行有缺（如缺金）者而言，此乃可遇不可求的補根至寶。',
    treasures: [{ name: '歸元補靈訣', type: '功法', rarity: '傳說', quantity: 1 }],
    actions: [
      {
        id: 'take',
        label: '參透並收取「歸元補靈訣」（日後可「以祕法補全靈根」）',
        magnitude: 6,
        grantsTreasure: true,
        note: '你以神識細細參研殘玉，將這門補根祕法銘記於心、玉卷收入囊中。他日尋一處靈氣充裕之地閉關，便可施此祕法、補全所缺之靈根。',
      },
      {
        id: 'pass',
        label: '不取而去',
        magnitude: 1,
        note: '你掂量再三，終未取那殘玉——逆奪造化之術，福禍難料。',
      },
    ],
    spoilerLevel: 1,
  },
  {
    id: 'HO_ascension_meet',
    name: '黃楓谷升仙大會',
    regionId: '越國',
    canonChapter: 270, // 黃楓谷卷期間，升仙大會十年一度於越國招收靈根新血
    discoverHint:
      '你行經越國境內，正逢黃楓谷十年一度的「升仙大會」開壇——四方測出靈根的少年雲集於此，谷中長老設下測靈台當眾選材，錄取者可得一枚「升仙令」，憑令便能入黃楓谷記名修行、領築基資糧。你既具靈根，亦在受招之列。',
    treasures: [{ name: '升仙令', type: '奇物', rarity: '稀有', quantity: 1 }],
    actions: [
      {
        id: 'take',
        label: '上台受測、領取升仙令（憑此可拜入黃楓谷）',
        magnitude: 4,
        grantsTreasure: true,
        note: '你立於測靈玉前，靈根之光映亮全台——長老頷首，將一枚溫潤的「升仙令」交到你手中。此令便是入黃楓谷的敲門磚，令上更附築基資糧之諾。',
      },
      {
        id: 'pass',
        label: '婉拒，另尋仙緣',
        magnitude: 2,
        note: '你謝過長老，未取升仙令而去——仙途多歧，你心中另有打算。',
      },
    ],
    spoilerLevel: 0,
  },
  {
    id: 'HO_ancient_array',
    name: '天南古傳送陣',
    regionId: '天南',
    canonChapter: 360, // 正史中韓立約於此後循此古陣遁往亂星海
    discoverHint:
      '你在天南腹地一處人跡罕至的斷崖石窟中，意外撞見一座半埋於亂石的上古傳送法陣——陣紋古拙、靈光黯淡，似乎自前古以來便無人踏足。此陣在正史中本是某位大能日後遁逃外海的關鍵，如今卻先一步落入你眼中。',
    treasures: [{ name: '上古傳送陣樞', type: '材料', rarity: '稀有', quantity: 1 }],
    actions: [
      {
        id: 'study',
        label: '暗中參研陣紋後悄然離去（不取不毀）',
        magnitude: 8,
        note: '你默記陣中玄奧而去，未動分毫——歷史的軌跡幾乎未因你而偏。',
      },
      {
        id: 'loot',
        label: '取走陣心「陣樞」（陣法殘缺但未全毀）',
        magnitude: 35,
        grantsTreasure: true,
        cascade: {
          npcFates: [
            { npcId: '韓立', fate: 'altered', note: '日後韓立循此陣欲遁，卻見陣樞已失、靈光潰散，被迫另覓生路——其亂星海一段機緣大為延宕、面目全非。' },
          ],
          worldNote: '一道本該銜接天南與外海的上古通道，自此殘缺難用。',
        },
        note: '你小心剝下陣心靈樞收入囊中。陣台靈光一暗，這座沉睡千年的法陣，再不復昔日之能。',
      },
      {
        id: 'destroy',
        label: '以雷火徹底轟毀此傳送陣',
        magnitude: 72,
        cascade: {
          npcFates: [
            { npcId: '韓立', fate: 'altered', note: '古陣盡毀，韓立日後無從遁往亂星海——其後結丹、鬥溫天仁、得萬年靈液等諸般際遇，恐皆隨之化為泡影，命運大幅改道。' },
          ],
          worldNote: '一座溝通天南與外海的上古通道就此湮滅，無數本該發生的因緣，隨那聲轟然巨響一同斷絕。',
        },
        note: '你不留後患，引動雷火將陣台連根轟塌。煙塵散盡，前古的造物化為齏粉——你親手抹去了一段尚未發生的歷史。',
      },
    ],
    spoilerLevel: 1,
  },
  {
    id: 'HO_sanyang_son',
    name: '三陽老魔之子的死劫',
    regionId: '亂星海',
    canonChapter: 364,
    discoverHint:
      '亂星海一隅的孤島礁石間，你撞見數名陰冥之地的修士正合力圍殺一名身負魔焰的少年——那是魔道大能「三陽老魔」的獨子，此刻正陷入九死一生的死劫。你的出手與否，將牽動遠不止此地的因果。',
    treasures: [{ name: '三陽魔焰精', type: '材料', rarity: '史诗', quantity: 1 }],
    actions: [
      {
        id: 'observe',
        label: '冷眼旁觀，不涉是非',
        magnitude: 0,
        note: '你隱去氣息遠遠避開，少年終喪於圍殺。正史的齒輪照常轉動——元瑤與妍麗的命運，未受你絲毫牽動。',
      },
      {
        id: 'save',
        label: '出手救下三陽老魔之子',
        magnitude: 60,
        grantsTreasure: true,
        cascade: {
          npcFates: [
            { npcId: '元瑤', fate: 'dead', note: '三陽老魔護子之後遷怒四方、大肆報復，元瑤於亂星海遭其擒獲採補，金丹碎裂、香消玉殞——她本該艱難求活的那條線，就此被你親手斬斷。', minMagnitude: 0 },
            { npcId: '妍麗', fate: 'dead', note: '連帶妍麗的殘魂亦被三陽老魔煉化以洩憤，魂飛魄散，再無轉圜。', minMagnitude: 40 },
          ],
          factionShifts: [{ name: '陰冥之地', status: 'weakened', note: '圍殺失手後遭三陽老魔血洗報復' }],
          worldNote: '你救下一人，卻有兩人因你之故而亡——時間線的天平，從不憑空施恩。',
        },
        note: '你斬退圍殺者，將那少年自鬼門關前奪回。三陽老魔感念救子之恩，贈你一縷三陽魔焰精，並許下日後一諾——然這份人情的代價，遠比你想像的沉重。',
      },
      {
        id: 'seize',
        label: '趁亂斬殺其子、奪取魔焰',
        magnitude: 48,
        grantsTreasure: true,
        cascade: {
          npcFates: [
            { npcId: '韓立', fate: 'altered', note: '魔道因痛失子嗣而瘋狂清洗亂星海散修，此地勢力格局為之一變，韓立日後的外海之行亦隨之改道。', minMagnitude: 0 },
          ],
          factionShifts: [{ name: '三陽魔宗', status: 'risen', note: '喪子之痛化作瘋狂擴張' }],
          worldNote: '一個魔道少年的死，點燃了整片外海的腥風血雨。',
        },
        note: '你心狠手辣，趁少年力竭一擊斃命，奪下其本命魔焰殘核。然此舉已與三陽老魔結下不死不休的血仇。',
      },
    ],
    spoilerLevel: 2,
  },
  {
    id: 'HO_luoyun_herb',
    name: '落雲宗後山的無主靈藥',
    regionId: '落雲宗',
    canonChapter: 210,
    discoverHint:
      '落雲宗後山一道隱蔽的石隙深處，你嗅到一縷清冽藥香——一株尚未被任何人發現的百年靈藥，正靜靜吐納於石壁夾縫間。',
    treasures: [{ name: '凝靈草', type: '材料', rarity: '精良', quantity: 2 }],
    actions: [
      { id: 'pick', label: '採下這株靈藥', magnitude: 12, grantsTreasure: true, note: '你小心採下靈藥收好。此物本是無主之珍，先到先得，於大局無甚波瀾。' },
      { id: 'leave', label: '留予有緣，悄然離去', magnitude: 0, note: '你終究未動那株靈藥，悄然退去。' },
    ],
    spoilerLevel: 0,
  },
];

export function getOpportunity(id: string): HiddenOpportunity | undefined {
  return HIDDEN_OPPORTUNITIES.find((o) => o.id === id);
}
