import type { OriginOption, SpiritualRootProfileOption, DaoHeartOption } from '../types';
import type { RealmType } from '../../types';

// ──────────────────────────────────────────────
// 出身選項（ORIGINS）
// ──────────────────────────────────────────────

export const ORIGINS: OriginOption[] = [
  {
    id: 'peasant_boy',
    name: '凡人農家少年',
    description:
      '窮苦農村出身，曾被村中長老以「家族榮耀」為由送入七玄門參加資質測試，卻在靈根測試中顯出靈根，自此辭別凡塵武門、踏上仙途。出身彩霞山下，與韓立同鄉同源，最易撞上原著機緣。體格平凡而心思靈活，神秘機緣觸發率最高；難度最高，若能尋得「神秘小瓶」，煉藥育靈之效將遠勝同儕。',
    startRegionId: '七玄門',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 1,
    spiritStones: 20,
    spiritualRootBias: { wood: 5, earth: 5 },
    startingArtIds: ['長春功'],
    startingItemRefs: [
      { ref: '黃龍丹', quantity: 1 },
      { ref: '養精丹', quantity: 2 },
    ],
    startingSectId: null,
    hooks: [
      '墨大夫的秘密',
      '神秘小瓶機緣',
      '野狼幫血鬥',
      '測出靈根、辭別七玄門踏入仙途',
    ],
    difficulty: 5,
  },
  {
    id: 'sect_scion',
    name: '修仙世家庶子',
    description:
      '旁系弟子出身，自幼有基礎法術教育，識得靈根分類等修仙常識，卻因庶出身份資源稀薄。對修仙界有一定了解，入門後上手較快，但需靠自身努力出人頭地。',
    startRegionId: '黃楓谷',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 3,
    spiritStones: 80,
    spiritualRootBias: { fire: 10, wood: 5 },
    startingArtIds: ['長春功'],
    startingItemRefs: [
      { ref: '火彈術玉簡', quantity: 1 },
      { ref: '養精丹', quantity: 3 },
      { ref: '金光護體符籙', quantity: 2 },
    ],
    startingSectId: '黃楓谷',
    hooks: [
      '百藥園競爭',
      '靈根測試事件',
      '升仙令系統',
      '家族後援與壓力',
    ],
    difficulty: 3,
  },
  {
    id: 'martial_family',
    name: '武林世家子弟',
    description:
      '出身凡俗武林世家，自幼習練家傳武功，肉身根基遠勝同齡修士；於踏入仙途時測出靈根，雖靈根稍弱，卻是難得的體修苗子。今以「煉體修仙」正統一脈為修煉本道，引靈淬體、以厚實肉身承載更猛的法力，凡俗武道僅為昔日童子功底。難度中等，體修天賦出眾者後勁悠長。',
    startRegionId: '七玄門',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 2,
    spiritStones: 50,
    spiritualRootBias: { metal: 10, earth: 10 },
    startingArtIds: ['長春功', '眨眼劍法'],
    startingItemRefs: [
      { ref: '養精丹', quantity: 3 },
      { ref: '劍符（灰芒）', quantity: 1 },
    ],
    startingSectId: null,
    hooks: [
      '厲飛雨點化、由武入道',
      '體修煉體一脈技能樹開啟',
      '金剛訣機緣',
      '凡俗武道根基與修仙煉體之道的調和',
    ],
    difficulty: 3,
  },
  {
    id: 'rogue_cultivator_orphan',
    name: '散修遺孤',
    description:
      '父母為散修，幼年便在江湖輾轉漂泊，眼界廣、見識多，手中有一份殘缺功法與少量靈石。無門派束縛，行動完全自由，但須自力尋覓資源，面對正規弟子時資源劣勢明顯。',
    startRegionId: '亂星海',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 5,
    spiritStones: 300,
    spiritualRootBias: { water: 10, metal: 5 },
    startingArtIds: ['御風訣'],
    startingItemRefs: [
      { ref: '玄鐵飛天盾', quantity: 1 },
      { ref: '天雷子', quantity: 2 },
      { ref: '清靈散', quantity: 1 },
    ],
    startingSectId: null,
    hooks: [
      '散修人脈網絡',
      '殘缺功法尋補',
      '乱星海勢力選邊',
      '流浪散修的生存壓力',
    ],
    difficulty: 4,
  },
  {
    id: 'market_apprentice',
    name: '坊市學徒',
    description:
      '自幼在修仙坊市中打雜學藝，熟悉各類物品行情，擅長鑑別低階靈材與丹藥真偽。商業人脈廣，初始靈石充裕，但修煉基礎薄弱，需另覓師承。',
    startRegionId: '天淵城',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 2,
    spiritStones: 150,
    spiritualRootBias: { earth: 10, metal: 5 },
    startingArtIds: ['天眼術'],
    startingItemRefs: [
      { ref: '金光護體符籙', quantity: 3 },
      { ref: '聚靈丹', quantity: 2 },
      { ref: '養精丹', quantity: 2 },
    ],
    startingSectId: null,
    hooks: [
      '坊市奇遇',
      '鑑寶事件',
      '商賈人脈與修仙界情報',
      '尋訪師承',
    ],
    difficulty: 2,
  },
  {
    id: 'fallen_sect_heir',
    name: '沒落仙宗後裔',
    description:
      '先祖曾是正道大宗的成員，門宗已在百年前的戰亂中覆滅，僅留下殘缺的功法傳承與一件舊法器。身負重振家門的使命，對修仙歷史有較深了解，可從傳承碎片中挖掘失傳秘法。',
    startRegionId: '落雲宗',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 4,
    spiritStones: 120,
    spiritualRootBias: { wood: 15, water: 5 },
    startingArtIds: ['長春功', '斂氣術'],
    startingItemRefs: [
      { ref: '神風舟', quantity: 1 },
      { ref: '清靈散', quantity: 2 },
      { ref: '金光護體符籙', quantity: 2 },
    ],
    startingSectId: '落雲宗',
    hooks: [
      '先祖傳承秘密',
      '試劍大會入場',
      '舊宗門仇怨追蹤',
      '失傳功法尋找',
    ],
    difficulty: 3,
  },
  {
    id: 'alchemy_family',
    name: '煉丹世家弟子',
    description:
      '溪國小型煉丹家族出身，自幼接觸靈草藥材，家族數代修士傳承，擁有基礎煉丹爐與常見靈草配方。進入落雲宗成為正式內門弟子，需在限期內完成宗門煉丹任務，煉丹是主要資源獲取方式。',
    startRegionId: '落雲宗',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 6,
    spiritStones: 200,
    spiritualRootBias: { wood: 20, fire: 10 },
    startingArtIds: ['長春功'],
    startingItemRefs: [
      { ref: '基礎煉丹爐', quantity: 1 },
      { ref: '黃龍丹', quantity: 2 },
      { ref: '金髓丸', quantity: 2 },
      { ref: '養精丹', quantity: 3 },
    ],
    startingSectId: '落雲宗',
    hooks: [
      '宗門煉丹任務',
      '試劍大會',
      '藥圃種植競爭',
      '煉丹師人脈',
    ],
    difficulty: 2,
  },
  {
    id: 'border_village',
    name: '邊遠村寨少年',
    description:
      '邊疆凡人出身，常年勞作使體格強健，但知識欠缺，對修仙界幾乎一無所知。對神秘事件觸發有額外機率，未知的大機緣在等待著這個懵懂少年。需靠機智與適應能力突破重重困難。',
    startRegionId: '黃楓谷',
    startRealm: '炼气期' as RealmType,
    startRealmLevel: 1,
    spiritStones: 10,
    spiritualRootBias: { earth: 15, metal: 5 },
    startingArtIds: ['長春功'],
    startingItemRefs: [
      { ref: '養精丹', quantity: 1 },
    ],
    startingSectId: '黃楓谷',
    hooks: [
      '神秘機緣觸發（高概率）',
      '邊疆異獸奇遇',
      '入門試煉',
      '凡人視角開眼',
    ],
    difficulty: 5,
  },
];

// ──────────────────────────────────────────────
// 天命等級（開局點數池）：決定可自由分配於五行靈根/悟性/心性/戰鬥五屬的點數總額。
// ──────────────────────────────────────────────
export interface FortuneTier { id: string; name: string; points: number; desc: string; accent: string }
export const FORTUNE_TIERS: FortuneTier[] = [
  { id: 'mediocre', name: '平庸之輩', points: 10, desc: '資質平平、根骨尋常的凡夫俗子。萬丈高樓平地起，全憑後天勤勉與際遇。', accent: 'text-zinc-400' },
  { id: 'ordinary', name: '尋常根骨', points: 30, desc: '略勝常人一籌，踏入仙途尚不至寸步難行，然亦無甚倚仗。', accent: 'text-emerald-300' },
  { id: 'gifted', name: '良才美質', points: 60, desc: '天生資質不俗，靈根悟性皆有可觀，宗門爭相延攬之才。', accent: 'text-sky-300' },
  { id: 'prodigy', name: '一方天驕', points: 100, desc: '鋒芒畢露的天之驕子，同輩中翹楚，前程不可限量。', accent: 'text-cyan-300' },
  { id: 'chosen', name: '天命之子', points: 200, desc: '天命所鍾、氣運加身，生而不凡——然樹大招風，機緣與劫數並至。', accent: 'text-amber-300' },
  { id: 'emperor_star', name: '紫微帝星', points: 350, desc: '應紫微帝星而生，氣運貴不可言，行止間自有威儀，所至皆有際遇相隨。', accent: 'text-yellow-300' },
  { id: 'immortal_bone', name: '仙骨天成', points: 550, desc: '生具仙骨、靈竅天開，萬載難遇的修道奇才，老怪物見之亦要動心收徒。', accent: 'text-teal-300' },
  { id: 'primordial', name: '鴻蒙紫氣', points: 750, desc: '身懷一縷鴻蒙紫氣，有望證道成聖——氣運滔天，然亦招天妒，劫數同樣驚世。', accent: 'text-fuchsia-300' },
  { id: 'dao_scion', name: '大道之子', points: 1000, desc: '大道親鍾、生而近道，舉手投足暗合天地至理。傳說中的命定之人，一念可傾覆山河。', accent: 'text-rose-300' },
];
export function getFortune(id: string): FortuneTier | undefined { return FORTUNE_TIERS.find((f) => f.id === id); }

// 變異靈根（異靈根）：五行之外的異種靈根，較尋常五行更純更利，進境尤速、神識術法獨具威能（萬中無一）。
export interface VariantRootOption { type: string; label: string; desc: string }
export const VARIANT_ROOTS: VariantRootOption[] = [
  { type: '雷', label: '雷靈根', desc: '雷霆肅殺、攻伐第一，神識術法之威冠絕同階。' },
  { type: '風', label: '風靈根', desc: '迅捷如風，遁速與身法絕佳，最利遊鬥與逃遁。' },
  { type: '冰', label: '冰靈根', desc: '至寒凝煞，控場封凍、傷敵於無形。' },
  { type: '暗', label: '暗（冥）靈根', desc: '幽冥晦暗，藏匿斂息、攝魂蝕神，魔道珍之。' },
  { type: '光', label: '光（陽）靈根', desc: '純陽至剛，破邪驅穢、克制陰煞魔物。' },
  { type: '空間', label: '空間靈根', desc: '通曉空間之力，縮地遁逃、儲物挪移，珍稀無比。' },
];
export function getVariantRoot(type: string): VariantRootOption | undefined { return VARIANT_ROOTS.find((v) => v.type === type); }

// ──────────────────────────────────────────────
// 靈根剖面選項（SPIRITUAL_ROOT_PROFILES）
// ──────────────────────────────────────────────

// 靈根四等（出自小說）：天根（單一屬性最純）／變異（異變升華的特殊屬性）／真靈根（二至三屬性）／偽靈根（五行混雜遲緩）。
// 引擎以 roots 五行向量推導修煉倍率（屬性越少越純＝越快）；變異屬性以最相近的本行高純度承載，故修煉同樣迅猛。
export const SPIRITUAL_ROOT_PROFILES: SpiritualRootProfileOption[] = [
  // ── 天靈根：單一五行，最純粹、進境最快，萬中無一 ──
  {
    id: 'heaven_metal',
    name: '金天靈根',
    description:
      '單一金行，鋒銳肅殺至純。劍修第一資質，攻伐凌厲、破防無雙。掩月宗數屆難遇一例，萬中無一的天驕之姿，幾乎必然築基。',
    roots: { metal: 100, wood: 0, water: 0, fire: 0, earth: 0 },
    cultivationMult: 3.0,
    probabilityWeight: 1,
    tier: 'heaven',
    attributes: ['金'],
  },
  {
    id: 'heaven_wood',
    name: '木天靈根',
    description:
      '單一木行，生機綿延至純。療癒、丹道、馭木皆得天獨厚，壽元亦較常人悠長。青元劍訣一脈夢寐以求的頂尖資質。',
    roots: { metal: 0, wood: 100, water: 0, fire: 0, earth: 0 },
    cultivationMult: 3.0,
    probabilityWeight: 1,
    tier: 'heaven',
    attributes: ['木'],
  },
  {
    id: 'heaven_water',
    name: '水天靈根',
    description:
      '單一水行，至柔綿長至純。法力深湛、水法千變，遁逃與持久俱佳，乃綿裡藏針的上選天靈根。',
    roots: { metal: 0, wood: 0, water: 100, fire: 0, earth: 0 },
    cultivationMult: 3.0,
    probabilityWeight: 1,
    tier: 'heaven',
    attributes: ['水'],
  },
  {
    id: 'heaven_fire',
    name: '火天靈根',
    description:
      '單一火行，炎烈迅猛至純。攻殺之威冠絕同儕，亦利煉丹火候。名門大派的火屬天靈根弟子向來優先培養。',
    roots: { metal: 0, wood: 0, water: 0, fire: 100, earth: 0 },
    cultivationMult: 3.0,
    probabilityWeight: 1,
    tier: 'heaven',
    attributes: ['火'],
  },
  {
    id: 'heaven_earth',
    name: '土天靈根',
    description:
      '單一土行，厚重堅韌至純。防禦、陣法、煉器根基無雙，根行穩固難動如山，後勁綿長不竭。',
    roots: { metal: 0, wood: 0, water: 0, fire: 0, earth: 100 },
    cultivationMult: 3.0,
    probabilityWeight: 1,
    tier: 'heaven',
    attributes: ['土'],
  },

  // ── 變異靈根：靈根異變後升華的特殊屬性，罕見珍貴，威能獨特，築基成功率極高 ──
  {
    id: 'variant_thunder',
    name: '雷靈根（變異）',
    description:
      '五行之外的異變靈根，金木相激而生雷。攻伐破防之威冠絕諸根，雷遁迅捷詭變。應〔五雷之體〕〔天雷〕一脈，雷雲子之流即此資質——變異靈根中最鋒利的鋒芒。',
    roots: { metal: 95, wood: 0, water: 0, fire: 0, earth: 0 },
    cultivationMult: 2.9,
    probabilityWeight: 3,
    tier: 'variant',
    attributes: ['雷'],
    variant: '雷',
  },
  {
    id: 'variant_wind',
    name: '風靈根（變異）',
    description:
      '木行異變而成，身法輕靈、遁術一絕。御風千里、來去無蹤，攻守皆以快制敵。變異靈根中以飄忽難測、最善逃命著稱。',
    roots: { metal: 0, wood: 90, water: 0, fire: 0, earth: 0 },
    cultivationMult: 2.8,
    probabilityWeight: 3,
    tier: 'variant',
    attributes: ['風'],
    variant: '風',
  },
  {
    id: 'variant_ice',
    name: '冰靈根（玄冰之體）',
    description:
      '水行異變至陰至寒，凍封法力、寒氣徹骨。應〔乾藍冰焰〕〔冰鳳寒元〕之屬，田琴兒一類天生寒體即此資質。攻防兼備、天然克火。',
    roots: { metal: 0, wood: 0, water: 95, fire: 0, earth: 0 },
    cultivationMult: 2.9,
    probabilityWeight: 2,
    tier: 'variant',
    attributes: ['冰'],
    variant: '冰',
  },
  {
    id: 'variant_gloom',
    name: '冥靈根（變異）',
    description:
      '罕見的至陰異種靈根，天生親和陰冥鬼煞之力。宜修魔功鬼道、隱匿詭譎，潛力深不可測而代價同樣難料。正道側目，魔道趨之若鶩。',
    roots: { metal: 0, wood: 0, water: 85, fire: 0, earth: 0 },
    cultivationMult: 2.7,
    probabilityWeight: 2,
    tier: 'variant',
    attributes: ['冥'],
    variant: '冥',
  },
  {
    id: 'variant_solar',
    name: '純陽靈根（變異）',
    description:
      '火行異變、至陽至剛，天生克制陰邪鬼物與屍煞。光明熾烈、療傷淨化俱佳，乃魔道與陰物的天敵。世間少見的炎陽異種。',
    roots: { metal: 0, wood: 0, water: 0, fire: 88, earth: 0 },
    cultivationMult: 2.8,
    probabilityWeight: 2,
    tier: 'variant',
    attributes: ['陽'],
    variant: '陽',
  },

  // ── 真靈根：二至三種屬性，較純、較易修煉，名門上等資質 ──
  {
    id: 'true_metal_water',
    name: '真靈根 · 金水雙屬性',
    description:
      '金水相生，鋒銳兼綿長。劍法配水遁，攻守俱宜；屬性較純、較易修煉，名門大派樂於收錄的上等雙靈根。',
    roots: { metal: 70, wood: 0, water: 70, fire: 0, earth: 0 },
    cultivationMult: 1.5,
    probabilityWeight: 14,
    tier: 'true',
    attributes: ['金', '水'],
  },
  {
    id: 'true_wood_fire',
    name: '真靈根 · 木火雙屬性',
    description:
      '木火相生，生機配炎烈。馭木、丹道與火攻皆得其便，是煉丹一途極佳的雙靈根資質。',
    roots: { metal: 0, wood: 70, water: 0, fire: 70, earth: 0 },
    cultivationMult: 1.5,
    probabilityWeight: 14,
    tier: 'true',
    attributes: ['木', '火'],
  },
  {
    id: 'true_triple',
    name: '真靈根 · 三屬性',
    description:
      '三系兼修，路子寬廣而略雜。修煉中規中矩、築基有望，乃修仙界常見的中上之資，多賴後天勤勉與機緣補足。',
    roots: { metal: 0, wood: 60, water: 60, fire: 0, earth: 60 },
    cultivationMult: 1.1,
    probabilityWeight: 18,
    tier: 'true',
    attributes: ['水', '木', '土'],
  },

  // ── 偽靈根：五行混雜而俱弱，進境遲緩，凡人逆襲之資 ──
  {
    id: 'pseudo_quad',
    name: '偽靈根 · 四屬性',
    description:
      '四行混雜而俱弱，靈氣感應駁雜不純。修煉遲緩、築基渺茫，唯心志堅者方能於困境中熬出頭。',
    roots: { metal: 0, wood: 38, water: 38, fire: 38, earth: 38 },
    cultivationMult: 0.8,
    probabilityWeight: 18,
    tier: 'pseudo',
    attributes: ['木', '水', '火', '土'],
  },
  {
    id: 'pseudo_five_hanli',
    name: '四靈根·五行缺金（韓立之姿）',
    description:
      '木水火土四行俱全卻盡皆孱弱、獨缺金行，俗稱廢靈根，本是與長生無緣的最底資質——然韓立正是以此根，憑神秘小瓶與謀存之志，一步步逆天而行；後更以祕法補全所缺之金行，五行漸全。最艱難，也最傳奇的起點。（缺金可後天以「歸元補靈訣」一類補根祕法補全）',
    roots: { metal: 0, wood: 22, water: 22, fire: 22, earth: 22 },
    cultivationMult: 0.7,
    probabilityWeight: 10,
    tier: 'pseudo',
    attributes: ['木', '水', '火', '土'],
  },
];

// ──────────────────────────────────────────────
// 道心選項（DAO_HEARTS）
// ──────────────────────────────────────────────

export const DAO_HEARTS: DaoHeartOption[] = [
  {
    id: 'dao_survival',
    name: '謀存之心',
    description:
      '謹慎、隱忍，以自保為最高優先。不輕易暴露實力，行事低調，以求在強者林立的修仙界長久生存。韓立一生的核心作風。觸發「斂氣」被動，減少主動暴露風險事件。',
    effects: {
      karmaResist: 5,
      breakthroughBonus: 0,
      reputationBias: -5,
    },
  },
  {
    id: 'dao_benevolence',
    name: '仁義之心',
    description:
      '重情重義，對故人有所牽掛，難以割捨人間情誼。特定 NPC 好感大幅提升，可觸發義助事件鏈，但有時情義會成為弱點。對應韓立對厲飛雨、辛如音的情義。',
    effects: {
      karmaResist: 10,
      breakthroughBonus: 0,
      reputationBias: 15,
    },
  },
  {
    id: 'dao_pursuit',
    name: '道途之心',
    description:
      '以追求更高境界為最高優先，視修煉為人生唯一意義。苦修效率提升，可解鎖閉關加速選項，情感羈絆對其影響較小。對應韓立後期的修煉哲學。',
    effects: {
      karmaResist: 0,
      breakthroughBonus: 8,
      reputationBias: 0,
    },
  },
  {
    id: 'dao_slaughter',
    name: '殺伐之心',
    description:
      '果斷清除威脅，手段不擇，殺伐決斷毫不留情。戰鬥殺傷加成，但正道聲望下降，魔道勢力對其容忍度更高。對應韓立殺伐果決的一面，業力積累加快。',
    effects: {
      karmaResist: -10,
      breakthroughBonus: 5,
      reputationBias: -20,
    },
  },
  {
    id: 'dao_alchemy',
    name: '煉丹之心',
    description:
      '沉迷丹道研究，對靈草藥性有天生的直覺感悟。煉丹成功率提升，藥材辨識自動，可發現常人忽略的丹道奧秘。對應落雲宗煉丹路線，突破時心態從容。',
    effects: {
      karmaResist: 5,
      breakthroughBonus: 5,
      reputationBias: 5,
    },
  },
  {
    id: 'dao_mechanism',
    name: '傀儡之心',
    description:
      '著迷機關與傀儡術，視傀儡為延伸自我意志的絕佳工具。大衍訣修煉速度提升，解鎖傀儡側線事件，可比常人更快領悟傀儡奧義。對應千竹教大衍訣路線。',
    effects: {
      karmaResist: 0,
      breakthroughBonus: 3,
      reputationBias: 0,
    },
  },
];
