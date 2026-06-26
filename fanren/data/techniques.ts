import type { TechniqueDef } from '../types';

/** 凡人修仙傳・具名功法/神通目錄（由 codex 還原，分層解鎖神通＋屬性加成）。 */
export const TECHNIQUES: TechniqueDef[] = [
  {
    "id": "changChunGong",
    "name": "長春功",
    "category": "cultivation",
    "realmReq": "炼气期",
    "maxLevel": 13,
    "desc": "墨居仁從奇書所得的木屬性基礎功法，需具靈根方可修煉，共十三層，是韓立早期修煉的核心築基功法。練至第四層可發出長春氣，大幅提升五感與精神；無靈根者無法修煉。韓立早年以此打底，至天南時已修至第十一層。",
    "canonRefs": [
      "長春功",
      "墨居仁",
      "靈根",
      "火彈術"
    ],
    "neigong": [
      {
        "level": 4,
        "name": "長春氣",
        "desc": "體內生出長春氣，五感與精神大幅提升，可隱約感應靈氣流動。"
      },
      {
        "level": 5,
        "name": "過目不忘",
        "desc": "神識初強，記憶過目不忘，對幻術心魔有一定抵抗。"
      },
      {
        "level": 8,
        "name": "法力連發",
        "desc": "法力深厚可連續施展上百次火彈術等初階法術而不竭。"
      },
      {
        "level": 11,
        "name": "長春圓融",
        "desc": "恢復力大增、元神顯著強化，為築基沖關奠基。"
      }
    ],
    "statBonus": {
      "maxHp": 12,
      "spirit": 8,
      "physique": 4
    }
  },
  {
    "id": "huoDanShu",
    "name": "火彈術",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 1,
    "desc": "煉氣修士最常用的初階攻擊法術，凝火屬性法力為彈轟出，可熔金化鐵。法力深厚者（如長春功第八層「法力連發」）可連施上百次而不竭。韓立於野狼幫落日峰血鬥中，即以此術焚殺金光上人與幫眾，一戰而得「火魔」之名。",
    "canonRefs": ["火彈術", "野狼幫血鬥", "金光上人", "長春功"],
    "statBonus": { "attack": 6, "spirit": 2 }
  },
  {
    "id": "quWuShu",
    "name": "驅物術",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 1,
    "desc": "初階的遠程御物法術，以法力操控身外之物（如劍符、飛劍）凌空攻防。韓立血鬥中以此術奪敵劍符、反手斬殺，是煉氣期重要的控場與奇襲手段。",
    "canonRefs": ["驅物術", "劍符"],
    "statBonus": { "spirit": 5 }
  },
  {
    "id": "zhaYanJianFa",
    "name": "眨眼劍法",
    "category": "sword",
    "realmReq": "炼气期",
    "maxLevel": 3,
    "desc": "七玄門厲飛雨所傳的快劍劍法，出劍迅捷如眨眼、詭變難測，配套步法為「羅煙步」。韓立得厲飛雨傾囊相授，於荊棘林苦練而成，乃其早期近身搏殺的看家本領。",
    "canonRefs": ["眨眼劍法", "厲飛雨", "羅煙步", "七絕堂"],
    "statBonus": { "attack": 5, "speed": 3 }
  },
  {
    "id": "qingYuanJianJue",
    "name": "青元劍訣",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 13,
    "desc": "玄劍門劍修功法，原為殘本九層、完整版十三層，可修至化神期。每層擴經展脈使法力深厚，但第四層起每層新練法力流失比率遞增。配套本命飛劍為青竹蜂雲劍，第七層解鎖劍影分光術，最高神通為大庚劍陣，是韓立的核心劍修功法與成名絕學。",
    "canonRefs": [
      "青元劍訣",
      "青竹蜂雲劍",
      "劍影分光術",
      "大庚劍陣",
      "三轉重元功",
      "巨劍術"
    ],
    "neigong": [
      {
        "level": 7,
        "name": "劍影分光術",
        "desc": "飛劍分出真假難辨的多道劍光，二十四柄青竹蜂雲劍可化九十六道青光。"
      },
      {
        "level": 9,
        "name": "護體劍盾",
        "desc": "不祭出飛劍即借劍氣遍布護盾；結合金雷竹辟邪特性可在鬼霧中驅散鬼氣。"
      },
      {
        "level": 13,
        "name": "大庚劍陣",
        "desc": "以摻庚精的青竹蜂雲劍布成劍光大陣，劍光化忽隱忽現之劍絲，可切割大多法寶，含辟邪神雷自動防禦魔道攻擊。"
      }
    ],
    "statBonus": {
      "attack": 18,
      "speed": 10,
      "spirit": 4
    }
  },
  {
    "id": "qingZhuFengYunJian",
    "name": "青竹蜂雲劍",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 1,
    "desc": "青元劍訣配套本命飛劍，由墨綠竹節祭煉、可不斷分化增殖的群劍法寶。摻入庚精後鋒銳異常，二次提煉後可化虛影、無視多數禁制洞穿（劍靈化虛）。韓立由數口養至七十二口，配合各式劍陣為其招牌殺手。",
    "canonRefs": [
      "青竹蜂雲劍",
      "青元劍訣",
      "劍靈化虛",
      "御劍神通（化劍為絲）"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "劍靈化虛",
        "desc": "二次提煉後飛劍可化為無形、任意分解再復原，被擒或斬斷時可瞬間虛化、在任意位置重新凝實。"
      }
    ],
    "statBonus": {
      "attack": 12,
      "speed": 6
    }
  },
  {
    "id": "daGengJianZhen",
    "name": "大庚劍陣",
    "category": "formation",
    "realmReq": "元婴期",
    "maxLevel": 1,
    "desc": "青元劍訣最高神通。以七十二口摻有庚精的青竹蜂雲劍布成三百六十道劍光大陣，劍光化為無聲無息、忽隱忽現的劍絲，可切割大多數法寶；完整版可與元嬰後期修士一較高下。陣中含辟邪神雷機制，自動抵禦魔道攻擊。韓立早期以三十六口飛劍布成簡化版實戰。",
    "canonRefs": [
      "大庚劍陣",
      "青竹蜂雲劍",
      "辟邪神雷",
      "青元劍訣"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "劍絲切割",
        "desc": "百道劍光化為忽隱忽現劍絲，無聲無息切割法寶並含辟邪神雷自動防禦。"
      }
    ],
    "statBonus": {
      "attack": 24,
      "spirit": 6
    }
  },
  {
    "id": "chunLiJianZhen",
    "name": "春黎劍陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 1,
    "desc": "以幻術為基礎的劍陣，需以七十二口純粹木屬性青色飛劍構成，可幻化真假交錯之環境困殺敵人，威能勝過大庚劍陣，需化神中後期方可布置。殺手鐧為「元氣劍葫」「元氣之劍」——以劍氣為種、借天地元氣孕育五色劍光，造成的傷口無法被動用法力者自行癒合。持有者韓立。",
    "canonRefs": [
      "春黎劍陣",
      "大庚劍陣",
      "元氣之劍",
      "元氣劍葫",
      "青竹蜂雲劍"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "元氣劍葫",
        "desc": "以七十二劍之劍氣為種、借天地元氣孕育出元氣之劍，傷口無法被動用法力者癒合。"
      }
    ],
    "statBonus": {
      "attack": 28,
      "spirit": 8,
      "speed": 4
    }
  },
  {
    "id": "qingPanJianZhen",
    "name": "青蟠劍陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 1,
    "desc": "新青元劍訣後半段配套劍陣，需煉虛中期以上方可研習，威能更在春黎劍陣之上。以七十二口青色飛劍布成，可化蟠龍狂舞之勢，攻擊力極強；韓立融入自悟之念劍訣後可令劍陣凝化青蟠龍形。渡劫時用以抵禦雷電，為其主要殺手鐧之一。",
    "canonRefs": [
      "青蟠劍陣",
      "春黎劍陣",
      "念劍訣",
      "青竹蜂雲劍"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "青蟠龍形",
        "desc": "融入念劍訣後，七十二劍可凝化青蟠龍形狂舞攻敵，威能更勝原版。"
      }
    ],
    "statBonus": {
      "attack": 32,
      "spirit": 10,
      "speed": 4
    }
  },
  {
    "id": "jianYingFenGuangShu",
    "name": "劍影分光術",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 1,
    "desc": "青元劍訣第七層解鎖的神通，可讓飛劍分出真假難辨的多道劍光，迷惑並圍殺對手。韓立以二十四柄青竹蜂雲劍可化為九十六道青光，追殺與纏鬥皆極具威脅。持有者韓立。",
    "canonRefs": [
      "劍影分光術",
      "青元劍訣",
      "青竹蜂雲劍"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "分光九十六",
        "desc": "二十四柄青竹蜂雲劍化為九十六道真假難辨青光，圍殺纏鬥。"
      }
    ],
    "statBonus": {
      "attack": 10,
      "speed": 8
    }
  },
  {
    "id": "daYanJue",
    "name": "大衍訣",
    "category": "soul",
    "realmReq": "筑基期",
    "maxLevel": 4,
    "desc": "千竹教鎮教核心功法，以強化神識、修煉分神之術為主，同時為傀儡機關術的驅動基礎。第一層可分出十餘神念，第二層上百，第三層數百，可同時操控大量傀儡；第四層以強化神識為主，極難修煉。所衍生神通包括驚神刺、神識化千、失神刺等，是韓立諸多神識神通之根基。",
    "canonRefs": [
      "大衍訣",
      "驚神刺",
      "神識化千",
      "失神刺",
      "巨劍術",
      "神識化形"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "驚神刺",
        "desc": "以神識為刃攻擊對手元神，配冷哼令目標短暫失神，足以動搖化神中期修士。"
      },
      {
        "level": 3,
        "name": "神識化千",
        "desc": "神識分為逾千份寄附噬金蟲，廣域同步搜索目標蹤跡。"
      },
      {
        "level": 4,
        "name": "神識圓滿",
        "desc": "第四層圓滿後神識倍增，可施展強大失神刺，威能可動搖元嬰修士。"
      }
    ],
    "statBonus": {
      "spirit": 24,
      "maxHp": 6
    }
  },
  {
    "id": "jingShenCi",
    "name": "驚神刺",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 1,
    "desc": "大衍訣所衍生的神識攻擊神通，以神識為刃直擊對手元神，輔以冷哼聲令目標短暫失控或失神，威力足以令化神中期修士短暫失神。韓立多次以此在絕境中救命、捕獲太陽精火、破解千魂鈴控制。持有者韓立。",
    "canonRefs": [
      "驚神刺",
      "大衍訣",
      "失神刺"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "冷哼奪神",
        "desc": "驟然施展，以神識重擊配冷哼令強敵短暫失神，奇襲制勝。"
      }
    ],
    "statBonus": {
      "spirit": 14
    }
  },
  {
    "id": "piXieShenLei",
    "name": "辟邪神雷",
    "category": "thunder",
    "realmReq": "结丹期",
    "maxLevel": 1,
    "desc": "由萬年金雷竹煉製而成的淡金色神雷，辟邪克妖，對鬼物、魔道功法有天克之效，是亂星海中少數能克制魔道功法的雷系神通；曾多次破解六極真魔功，並可勉強克制乾藍冰焰。數量有限，消耗後需靜養恢復。催動核心功法為祭雷術。持有者韓立（金雷竹飛劍）。",
    "canonRefs": [
      "辟邪神雷",
      "祭雷術",
      "金雷竹",
      "六極真魔功",
      "乾藍冰焰"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "祭雷術",
        "desc": "催動辟邪神雷的核心秘術，聚天雷以金色驕陽形態放出金色光柱；補全下半部後施法速度大幅提升。"
      }
    ],
    "statBonus": {
      "attack": 20,
      "spirit": 6
    }
  },
  {
    "id": "jinGangJue",
    "name": "金剛訣",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 7,
    "desc": "靈界著名煉體五大秘術之一，以外界靈氣強行灌體修煉，共七層，靈界凡人亦可修煉；天瀾揭示其即佛門明王訣的靈界版本。三層可抵低階靈器，五層可硬拼結丹修士，七層大成則可自行排出體內禁制、肉身堅韌不下頂階法器（紫髓金骨）。韓立法力全失時依賴此功自救重生。",
    "canonRefs": [
      "金剛訣",
      "明王訣",
      "九玄明玉潭",
      "紫髓金骨",
      "三元斬"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "金剛護體",
        "desc": "肌膚淡金、堅如法寶，肉身可抵禦一般法器，為疾風九變等身法奠基。"
      },
      {
        "level": 5,
        "name": "硬撼結丹",
        "desc": "肉身可硬拼結丹修士法器攻擊而不損。"
      },
      {
        "level": 7,
        "name": "金剛大成",
        "desc": "大成達紫髓金骨，可自行排出體內禁制，一拳碎青冥甲、硬扛靈寶級攻擊。"
      }
    ],
    "statBonus": {
      "physique": 26,
      "maxHp": 20,
      "defense": 18
    }
  },
  {
    "id": "mingWangJue",
    "name": "明王訣",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 4,
    "desc": "佛門金剛護法修煉的煉體功法，由上古妖族三段式功法基礎部分改良而成，修煉需金剛舍利子，可將煞氣煉化為己用。修煉劇痛但效果驚人，第一層成後軀體晶瑩摻金絲、堅硬似鐵精；以天尸珠與金剛舍利輔助可大幅提速。為梵聖真魔功三大組成部分之一，靈界版本即金剛訣。",
    "canonRefs": [
      "明王訣",
      "梵聖真魔功",
      "金剛訣",
      "法體雙修",
      "涅槃聖體"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "金剛之軀",
        "desc": "軀體晶瑩摻淡金絲、堅硬似鐵精，曾抵擋天狼鑽而未致命。"
      },
      {
        "level": 2,
        "name": "煞氣煉化",
        "desc": "可將外界煞氣穩定煉化為己用，前兩層效果尤為顯著。"
      },
      {
        "level": 4,
        "name": "金剛幻影",
        "desc": "肌膚呈淡金色堅如法寶，配合金剛幻影秘術發揮驚人攻防。"
      }
    ],
    "statBonus": {
      "physique": 20,
      "defense": 16,
      "maxHp": 12
    }
  },
  {
    "id": "fanShengZhenMoGong",
    "name": "梵聖真魔法相",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 1,
    "desc": "即梵聖真魔功，韓立自命名的法體雙修頂階功法，由明王訣（佛門煉體）、托天魔功（魔道法力）、梵聖真片拼合而成，史無前例。修後雙掌呈白玉晶瑩與漆黑如墨兩異象，可召喚三頭六臂金色法相（梵聖金身），法相手臂可虛空出擊；大成可凝三頭六臂真魔金身。衍生神通含洞漩金光、涅槃聖體。韓立獨有。",
    "canonRefs": [
      "梵聖真魔功",
      "明王訣",
      "洞漩金光",
      "涅槃聖體／涅盤聖體",
      "三頭六臂",
      "法體雙修",
      "三元斬"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "梵聖金身",
        "desc": "召喚三頭六臂金色法相，法相手臂可虛空出擊。"
      },
      {
        "level": 1,
        "name": "洞漩金光",
        "desc": "於敵後方生成金色漩渦，以強大吸力攝入敵人並爆殺，可引助玄天殘刃施展。"
      },
      {
        "level": 1,
        "name": "涅槃聖體",
        "desc": "最高神通，變化三頭六臂金毛巨猿形態（一涅至三涅），三階肉身強度媲美玄仙。"
      }
    ],
    "statBonus": {
      "attack": 30,
      "physique": 24,
      "spirit": 12,
      "maxHp": 18
    }
  },
  {
    "id": "beiJiYuanGuang",
    "name": "北極元光",
    "category": "formation",
    "realmReq": "元婴期",
    "maxLevel": 1,
    "desc": "昆吾殿核心上古禁制，表現為密密麻麻的銀白色光絲，可洞穿任何靈器及護罩，普通修士進入必死，惟有兩儀環能令其自動繞道。以兩儀陰環護身可不受傷害，以陽環則可操控北極元光主動攻擊敵人。韓立以兩儀環應對並掌握其操控之法。",
    "canonRefs": [
      "北極元光",
      "兩儀環",
      "昆吾殿",
      "幻妙天象"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "陽環操光",
        "desc": "以兩儀陽環操控北極元光銀絲主動攻擊，洞穿敵方靈器護罩。"
      }
    ],
    "statBonus": {
      "attack": 16,
      "defense": 10
    }
  },
  {
    "id": "yinHunZhong",
    "name": "引魂鐘魂道",
    "category": "soul",
    "realmReq": "炼气期",
    "maxLevel": 1,
    "desc": "引魂鐘為黃銅小鐘、鐘壁帶淡淡血痕，原為墨大夫所有，配合余子童所傳煉屍術馭使屍人。以精血滴入認主後，敲擊鐘聲可令魂魄全失之屍人喪失行動能力或受驅策——此即「魂道」馭屍之法。韓立以此收服好友張鐵屍身、賜名曲魂，並曾交孫二狗遙控其奪幫。",
    "canonRefs": [
      "引魂鐘",
      "曲魂",
      "煉屍術",
      "墨居仁"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "鐘聲制魂",
        "desc": "敲擊引魂鐘，鐘聲令認主屍人喪失行動能力，可遠程遙控驅使。"
      }
    ],
    "statBonus": {
      "spirit": 6
    }
  },
  {
    "id": "yuFengJue",
    "name": "御風訣",
    "category": "agility",
    "realmReq": "炼气期",
    "maxLevel": 1,
    "desc": "初階輔助身法法術，使施法者身輕如燕、高速移動，消耗法力而非體力，達忽隱忽現、近乎飛行之效，低階修仙者常用於趕路。與羅煙步融合後補足彼此缺陷。韓立早期成名身法之一。",
    "canonRefs": [
      "御風訣",
      "羅煙步"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "身輕如燕",
        "desc": "身形輕盈疾速、忽隱忽現，接近飛行，趕路與閃避皆宜。"
      }
    ],
    "statBonus": {
      "speed": 14
    }
  },
  {
    "id": "luoYanBu",
    "name": "羅煙步",
    "category": "agility",
    "realmReq": "炼气期",
    "maxLevel": 1,
    "desc": "眨眼劍法中的步法秘技，可將身形化作輕煙閃躲，對體力消耗極大。韓立於荊棘林苦練四個月習成，後與御風訣融合補足彼此缺陷；配合踏雲靴可達殘影速度，近乎普通人肉眼難以追蹤的極限。持有者韓立。",
    "canonRefs": [
      "羅煙步",
      "御風訣",
      "踏雲靴"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "化煙閃躲",
        "desc": "身形化作輕煙急閃，配合踏雲靴可達殘影速度，難以肉眼追蹤。"
      }
    ],
    "statBonus": {
      "speed": 16,
      "defense": 4
    }
  },
  {
    "id": "wuXingDunShu",
    "name": "五行遁術",
    "category": "agility",
    "realmReq": "筑基期",
    "maxLevel": 1,
    "desc": "修仙界通行的金木水火土五系遁法，借對應屬性之力遁行趕路與逃遁，為修士基礎機動手段。其速度遠遜於借風雷翅雷電之力催動的雷遁術——雷遁瞬息百丈、近乎瞬移，可在元嬰後期神識下短暫消失，凸顯五行遁術為常規對照基準。",
    "canonRefs": [
      "五行遁術",
      "雷遁術",
      "風雷翅",
      "血影遁"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "五系遁行",
        "desc": "借金木水火土五行之力遁行，趕路逃遁的基礎機動神通。"
      }
    ],
    "statBonus": {
      "speed": 10
    }
  },
  {
    "id": "leiDunShu",
    "name": "雷遁術",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 1,
    "desc": "憑借風雷翅中雷電之力催動的瞬移遁術，速度遠超普通五行遁術；以辟邪神雷催動可達瞬息百丈，以銀白翅膀借雷電瞬間位移，可在元嬰後期修士神識下短暫消失，用於奇襲或逃遁。持有者韓立（配合風雷翅）。",
    "canonRefs": [
      "雷遁術",
      "風雷翅",
      "辟邪神雷",
      "五行遁術"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "瞬息百丈",
        "desc": "借雷電瞬間位移，瞬息百丈、近乎瞬移，可在元嬰後期神識下短暫消失。"
      }
    ],
    "statBonus": {
      "speed": 22
    }
  },
  {
    "id": "yuanCiShenGuang",
    "name": "元磁神光",
    "category": "refining",
    "realmReq": "化神期",
    "maxLevel": 1,
    "desc": "上古修士創立的頂階功法，修成後可將五行之力化為己用，於元磁山範圍內大幅壓制任何修士，傳說大成可克盡天下五行，大成需五行靈根（天星雙聖因此功虧一簣）。可與太乙青光相克，衍生元磁神光合擊秘術。韓立以百脈煉寶訣將元磁神山融入雙手直接施展。",
    "canonRefs": [
      "元磁神光",
      "元磁神光合擊秘術",
      "百脈煉寶訣",
      "太乙青光",
      "天星雙聖"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "五行壓制",
        "desc": "於元磁山範圍化五行之力為己用，大幅壓制範圍內任何修士。"
      },
      {
        "level": 1,
        "name": "元磁合擊",
        "desc": "三名元磁之體聯合催動合擊秘術，凝聚巨型符文，威能倍增。"
      }
    ],
    "statBonus": {
      "attack": 22,
      "defense": 14,
      "spirit": 8
    }
  },
  {
    "id": "jingZheJue",
    "name": "驚蟄訣",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 12,
    "desc": "紅雲大長老所創十二般真靈變化術，理論上可依次變化為十二種真靈形態，需對應真靈之血方可真正變身。韓立版本已吸收山岳巨猿、鯤鵬、天鵬等真靈之血，化身後可施展驚蟄十二變、天鵬變身等心魔無法複製的神通，激發真血可暫時催動超出當前修為的強大戰力。",
    "canonRefs": [
      "驚蟄訣",
      "驚蟄十二變",
      "天鵬變身",
      "真靈之血",
      "涅盤聖體"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "驚蟄十二變",
        "desc": "幻化青色大鵬、五色孔雀、鯤鵬等真靈形態，孔雀可施五色靈光、鯤鵬電弧滿布。"
      },
      {
        "level": 1,
        "name": "天鵬變身",
        "desc": "以真天鵬靈血化銀色天鵬，配風雷翅成四翅巨鵬極速飛遁。"
      }
    ],
    "statBonus": {
      "physique": 16,
      "speed": 16,
      "attack": 12
    }
  },
  {
    "id": "xuanYueXiYinGong",
    "name": "玄月吸陰功",
    "category": "cultivation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "合歡宗鎮宗魔功，合歡老魔（天南三大修士之一）所修頂階采補媚術。以陰陽雙修之法采人元陽精氣補益己身，於月華濃郁之夜修煉最速，可借雙修對象之資質速成、暫補修為瓶頸。修煉者面如冠玉、終年不老，然心性易墮入色魔。高層解鎖玄月真光媚惑神識、陰陽合擊等秘術。合歡宗弟子男女各半，皆以此功為根本。",
    "canonRefs": [
      "合歡宗",
      "合歡老魔",
      "采補",
      "顛鳳培元功",
      "素女輪迴功"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "玄月媚光",
        "desc": "雙目透出淡銀月光，動搖低階修士心神、令其神思恍惚，便於近身采補。"
      },
      {
        "level": 6,
        "name": "采陰補陽",
        "desc": "雙修時汲取對方元陽精氣補益自身，可暫借對方靈根資質速修，補益修為瓶頸。"
      },
      {
        "level": 9,
        "name": "玄月法相",
        "desc": "大成凝出半透明銀色玉人法相，吐納月華護體並施放攝魂媚光，元嬰修士亦須謹防。"
      }
    ],
    "statBonus": {
      "spirit": 16,
      "maxHp": 10,
      "attack": 6
    }
  },
  {
    "id": "yinYangQianYinShu",
    "name": "陰陽牽引術",
    "category": "cultivation",
    "realmReq": "元婴期",
    "maxLevel": 1,
    "desc": "合歡宗男女雙修合擊秘法，以一陰一陽兩名玄月吸陰功修士心神相連、法力相牽，凝出陰陽合一的牽引之力，採集頂階妖獸守護的靈藥或合擊困敵，威能遠超二人各自施為。施展時須情意相通、生死與共，故多為宗門道侶或師徒所用，是合歡宗於越國最強派系地位的依仗之一。",
    "canonRefs": [
      "合歡宗",
      "陰陽牽引術",
      "玄月吸陰功"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "陰陽相牽",
        "desc": "兩名陰陽修士法力心神合一，凝牽引之力採頂階靈藥或合擊困敵，威能倍增。"
      }
    ],
    "statBonus": {
      "spirit": 12,
      "attack": 10,
      "defense": 6
    }
  },
  {
    "id": "yuLingYuShouJue",
    "name": "御靈馭獸訣",
    "category": "beast",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "御靈宗（天羅國奇靈山魔道六宗之一）馭使靈獸靈蟲的根本功法。以神識烙印與血契馭使群獸群蟲為己所用，修者可同時操控數量隨層數遞增的靈獸蟲群，臨陣以蟲海獸潮淹沒對手。御靈宗靈獸山暗樁千年養蟲育獸即賴此術。高層可馭使化形妖獸、催發本命靈蟲，與千竹教傀儡術並稱馭使一道兩大流派。",
    "canonRefs": [
      "御靈宗",
      "驅蟲術",
      "靈獸山",
      "菡雲芝",
      "柳眉"
    ],
    "neigong": [
      {
        "level": 2,
        "name": "血契烙印",
        "desc": "以精血神識在靈獸蟲身烙下血契印記，永久馭使，受傷反噬亦由獸蟲分擔。"
      },
      {
        "level": 5,
        "name": "群蟲蔽日",
        "desc": "驅遣成片靈蟲結成蟲雲蟲陣，吞噬法力、撕咬血肉，淹沒結丹修士。"
      },
      {
        "level": 9,
        "name": "百獸朝靈",
        "desc": "大成可同馭數百靈獸與化形妖獸，催發本命靈蟲一擊洞穿護罩。"
      }
    ],
    "statBonus": {
      "spirit": 12,
      "attack": 10,
      "maxHp": 8
    }
  },
  {
    "id": "wuXingLingYingMiFa",
    "name": "五行靈嬰秘法",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 1,
    "desc": "御靈宗深研未竟的核心機密秘法，以五行屬性靈嬰（金木水火土）煉成第二元嬰，與主元嬰心神相連，可出竅誘敵、分修功法、施展強大秘術。御靈宗因至木靈嬰流失而遣人追查，間接與韓立交集。此法與玄牡化嬰大法同源而走五行一途，靈嬰過多則易引心神不穩之患。",
    "canonRefs": [
      "御靈宗",
      "五行靈嬰",
      "至木靈嬰",
      "第二元嬰",
      "玄牡化嬰大法"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "五行化嬰",
        "desc": "以五行屬性靈物煉成靈嬰作第二元嬰，可出竅獨立行動、分修分戰。"
      }
    ],
    "statBonus": {
      "spirit": 18,
      "maxHp": 8
    }
  },
  {
    "id": "guiLingXieDaoFa",
    "name": "鬼靈攝魂大法",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 7,
    "desc": "鬼靈門（天羅國魔道六宗之一）鬼道屍術根本魔功。煉養血鬼厲魂為戰，以碧陰叉、血鬼為常用法器，驅鬼役妖、攝人魂魄煉作鬼僕。修者以血雲遁術瞬移追殺、以陰火大陣血祭築基修士魂魄速成。鬼道走偏鋒，魂魄沾染陰煞，難結善果，卻在越國魔道大舉入侵時極具威脅。少主王蟬即以此術成名。",
    "canonRefs": [
      "鬼靈門",
      "王蟬",
      "血雲遁術",
      "血鬼",
      "碧陰叉",
      "陰火大陣"
    ],
    "neigong": [
      {
        "level": 2,
        "name": "血雲遁術",
        "desc": "化身血雲高速遁行追殺，可遮蔽身形、消耗符籙攻擊，纏鬥逃遁兩宜。"
      },
      {
        "level": 4,
        "name": "血鬼噬魂",
        "desc": "催發豢養血鬼撲咬奪魂，受傷之血鬼可再以精血血祭補養。"
      },
      {
        "level": 7,
        "name": "攝魂煉僕",
        "desc": "以陰火血祭奪取敵魂煉作鬼僕，魂魄沾陰煞傷口難以驅散。"
      }
    ],
    "statBonus": {
      "spirit": 14,
      "attack": 10,
      "speed": 6
    }
  },
  {
    "id": "daLuoQianHuanJue",
    "name": "大羅千幻訣",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 9,
    "desc": "千幻宗（天南魔道六宗之一）鎮派法訣，號稱天南第一隱匿變幻功法。可完美隱藏自身修為氣息、化身不同體形容貌，連元嬰期神識亦難辨真假，更可分身設幻迷惑神識。少主杜東以此潛伏落雲宗天泉峰、謀奪靈眼之樹醇液數十年而不被察覺。隱匿變幻一道之極致，正面戰力不強，卻最擅潛伏暗殺與脫身。",
    "canonRefs": [
      "千幻宗",
      "大羅千幻訣",
      "杜東",
      "斂氣術"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "千幻易形",
        "desc": "瞬間改換體形容貌氣息，化身他人，連熟識者近觀亦難辨破綻。"
      },
      {
        "level": 6,
        "name": "匿息藏修",
        "desc": "完美收斂修為氣息，元嬰神識掃過亦只當作低階修士或凡人。"
      },
      {
        "level": 9,
        "name": "大羅幻身",
        "desc": "分出真假難辨之幻身惑敵神識，真身趁隙暗殺或遁走，幾不可破。"
      }
    ],
    "statBonus": {
      "spirit": 12,
      "speed": 14
    }
  },
  {
    "id": "fuShiDuGong",
    "name": "蝮屍毒功",
    "category": "cultivation",
    "realmReq": "化神期",
    "maxLevel": 9,
    "desc": "化意門太上長老魏無涯（天南三大元嬰後期修士之一）所修頂階毒道功法，以「蝮屍之毒」為核心。煉養百毒蝮屍於體內，可催出無孔不入的腹屍毒雲，沾之即潰、見血封喉，連元嬰修士亦須謹避。毒道修者以毒養身、以毒攻敵，魏無涯曾於墜魔谷以最強蝮屍毒法腹屍毒雲苦鬥古魔本體，雖元氣大傷仍頑強撐持。",
    "canonRefs": [
      "化意門",
      "魏無涯",
      "蝮屍之毒",
      "腹屍毒雲"
    ],
    "neigong": [
      {
        "level": 4,
        "name": "蝮屍煉毒",
        "desc": "體內煉養百毒蝮屍，可隨時吐納劇毒，自身百毒不侵。"
      },
      {
        "level": 7,
        "name": "見血封喉",
        "desc": "毒氣無孔不入，沾肌即潰、入血封喉，傷口劇毒難以驅散。"
      },
      {
        "level": 9,
        "name": "腹屍毒雲",
        "desc": "最強毒法，催出彌天蝮屍毒雲籠罩戰場，可與古魔本體相抗。"
      }
    ],
    "statBonus": {
      "attack": 16,
      "spirit": 10,
      "maxHp": 8
    }
  },
  {
    "id": "zhiYangChunYangGong",
    "name": "至陽純陽功",
    "category": "cultivation",
    "realmReq": "化神期",
    "maxLevel": 9,
    "desc": "太真門（源出大晉真極門）鎮派純陽上乘功法，至陽上人（天南三大修士之一）所修。煉至陽剛烈之罡氣，純陽無瑕，天克陰邪鬼物與魔道功法，於朝陽初升之時修煉最速。修成者罡氣護體、外魔不侵，可催純陽罡火焚邪、施純陽神光。太真門世代肩負護持無邊海漩渦底部封印大陣之責，純陽功正為鎮壓魔氣滲漏之憑依。",
    "canonRefs": [
      "太真門",
      "至陽上人",
      "真極門",
      "無邊海封印大陣"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "純陽罡體",
        "desc": "至陽罡氣護體，陰邪鬼氣不得近身，可滌除沾染之陰煞魔念。"
      },
      {
        "level": 6,
        "name": "純陽罡火",
        "desc": "催出純陽烈焰焚滅邪物，對鬼物、魔道功法有天克之效。"
      },
      {
        "level": 9,
        "name": "至陽神光",
        "desc": "大成放出萬丈純陽神光，可鎮壓魔氣滲漏、護持封印大陣。"
      }
    ],
    "statBonus": {
      "attack": 14,
      "defense": 12,
      "spirit": 8
    }
  },
  {
    "id": "tuoTianMoGong",
    "name": "托天魔功",
    "category": "cultivation",
    "realmReq": "化神期",
    "maxLevel": 9,
    "desc": "天魔宗（呼老魔主持的大晉魔道勢力，魔陀山所在）頂階魔道法力功法。修煉霸道魔元，魔氣磅礡可托天負地，催出魔道法相鎮壓敵手。呼慶雷（呼老魔）為天魔宗太上長老，以此功橫行大晉。後韓立以此功之魔道法力，與明王訣、梵聖真片拼合而成史無前例的梵聖真魔功，是法體雙修頂階功法的法力根基之一。",
    "canonRefs": [
      "天魔宗",
      "呼老魔",
      "魔陀山",
      "梵聖真魔功",
      "明王訣"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "魔元淬體",
        "desc": "霸道魔元淬煉軀體經脈，法力雄渾遠勝同階正道功法。"
      },
      {
        "level": 6,
        "name": "托天魔氣",
        "desc": "魔氣磅礡可托天負地，化魔雲魔手鎮壓、絞殺敵手。"
      },
      {
        "level": 9,
        "name": "托天魔相",
        "desc": "大成召出猙獰魔道法相，魔臂橫掃，可供法體雙修拼合之用。"
      }
    ],
    "statBonus": {
      "attack": 18,
      "maxHp": 12,
      "physique": 8
    }
  },
  {
    "id": "qianJiKuiLeiShu",
    "name": "千機傀儡術",
    "category": "puppet",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "千竹教傀儡機關術之衍生秘術，以大衍訣分神之力同步操控大量傀儡機關。煉製傀儡須精擇材料、刻陣注靈，驅動則賴神識分念，分神愈眾、操控愈多。千竹教鎮教大衍訣即為此術之驅動根基。傀儡不畏生死、令行禁止，是煉製者最忠實的戰力與保命手段；萬古族通靈傀儡、地靈族機關傀儡皆屬此道頂尖傳承。",
    "canonRefs": [
      "千竹教",
      "大衍訣",
      "傀儡機關術",
      "通靈傀儡"
    ],
    "neigong": [
      {
        "level": 2,
        "name": "注靈喚傀",
        "desc": "為傀儡刻陣注靈，以神識分念驅動其攻防，傀儡不畏生死、令行禁止。"
      },
      {
        "level": 5,
        "name": "分神操機",
        "desc": "藉大衍訣分念同步操控數十傀儡機關，結陣圍殺、彼此補位。"
      },
      {
        "level": 9,
        "name": "百傀同馭",
        "desc": "大成可同馭上百傀儡並催發本命傀儡之獨門神通，威能驚人。"
      }
    ],
    "statBonus": {
      "spirit": 14,
      "attack": 10,
      "defense": 6
    }
  },
  {
    "id": "zhaiXingShou",
    "name": "摘星手",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 7,
    "desc": "天星宮（亂星海第一大宗，天星雙聖掌門）馭物擒拿絕學。以星辰引力之理隔空攝物擒人，可遠程奪敵法寶、定身拿人，與星宮鎮宗元磁神光相輔相成。修者一抬手如星河傾瀉，敵之飛劍法器盡被牽引脫手。星宮以元磁神光守護天星島，摘星手則為門人臨陣擒拿、奪寶制敵的看家本領。",
    "canonRefs": [
      "星宮",
      "天星雙聖",
      "元磁神光",
      "天星島"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "隔空攝物",
        "desc": "隔空牽引敵之飛劍法器使其脫手失控，化敵兵為己用。"
      },
      {
        "level": 7,
        "name": "星河擒拿",
        "desc": "大成牽引之力如星河傾瀉，可定身拿人，元嬰修士亦難掙脫。"
      }
    ],
    "statBonus": {
      "attack": 12,
      "spirit": 10,
      "defense": 4
    }
  },
  {
    "id": "tianLanShengShouChuanCheng",
    "name": "天瀾聖獸傳承",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 1,
    "desc": "天瀾聖獸（突兀族所信奉之天瀾獸）所授上古傳承，含銀蝌文符文體系與通天靈寶驅使心法。受傳者可研習源自真仙界金闕玉書的仙家符籙煉製之法，直接操控以銀蝌文刻寫的上古陣法禁制，並借通寶訣封養通天靈寶於體內慢煉。韓立由天瀾聖獸傳授此承，乃其晉身靈界頂尖、煉製太一化清符等仙家法寶的關鍵根基。",
    "canonRefs": [
      "天瀾聖獸",
      "銀蝌文",
      "金闕玉書",
      "通寶訣",
      "突兀族"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "銀蝌通文",
        "desc": "通曉銀蝌仙文，可研習金闕玉書符籙、操控銀蝌文刻寫之上古陣法禁制。"
      },
      {
        "level": 1,
        "name": "聖獸授寶",
        "desc": "傳授通天靈寶驅使心法，以通寶訣封養靈寶於體內慢煉，臨陣發揮鼎寶神通。"
      }
    ],
    "statBonus": {
      "spirit": 20,
      "maxHp": 10,
      "defense": 6
    }
  },
  {
    "id": "moJiaoYinShaGong",
    "name": "墨蛟陰煞功",
    "category": "beast",
    "realmReq": "结丹期",
    "maxLevel": 7,
    "desc": "脫胎於八級毒蛟（墨蛟）血脈傳承的水煞妖修功法，以濃郁陰煞水毒淬體催法。修者可吐青黑毒霧、化墨色蛟形纏絞，水中戰力倍增。韓立曾以八級毒蛟精魂煉製降靈符、取毒蛟之材煉器淬毒。蛟類妖修陰狠難纏，於江海湖澤之間幾無敵手，是亂星海一帶頗為棘手的妖修一脈。",
    "canonRefs": [
      "毒蛟",
      "降靈符",
      "八級毒蛟精魂"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "墨蛟纏絞",
        "desc": "化墨色蛟形水煞纏絞敵身，水中戰力倍增、難以掙脫。"
      },
      {
        "level": 7,
        "name": "陰煞毒霧",
        "desc": "吐青黑毒霧瀰漫，沾之筋骨酸軟、法力遲滯，配合纏絞絞殺。"
      }
    ],
    "statBonus": {
      "attack": 12,
      "physique": 10,
      "maxHp": 8
    }
  },
  {
    "id": "chiYanMoHuoGong",
    "name": "赤焰魔火功",
    "category": "cultivation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "魔焰門（天南魔道六宗之一，以火焰魔法、青陽魔火立宗）鎮宗火系魔功。煉赤焰魔火為攻，火勢凶烈、沾物即燃，可化火鳥火牆焚殺成片。門主獨女憐飛花曾率狂焰修士施放青陽魔火攻陷越國靈石礦、以撼地符封死逃生通道。火道魔修攻勢凌厲、破壞驚人，於攻城掠地之戰中尤為可怖。",
    "canonRefs": [
      "魔焰門",
      "憐飛花",
      "青陽魔火",
      "撼地符"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "赤焰附器",
        "desc": "赤焰魔火附於法器飛劍，攻擊附帶烈焰焚灼，破甲焚體。"
      },
      {
        "level": 6,
        "name": "青陽魔火",
        "desc": "催出凶烈青陽魔火化火鳥火牆，焚殺成片、燒融護罩。"
      },
      {
        "level": 9,
        "name": "焚天火海",
        "desc": "大成放出漫天魔火結成火海，焚山煮海，可封死大範圍生路。"
      }
    ],
    "statBonus": {
      "attack": 18,
      "spirit": 8,
      "maxHp": 6
    }
  },
  {
    "id": "tianFengZhenHuo",
    "name": "天鳳真火",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 7,
    "desc": "葉家（天鳳血脈真靈世家）家傳本命神火神通，由天鳳真靈血脈激發。修者引動體內天鳳真血，可化身天鳳、口吐五色鳳焰，焚邪滅穢、剋制諸般妖邪。葉穎身具天鳳真血，為蠻荒爭奪真靈之血博弈中的重要目標，曾遭隴東以血晶摩訶劍強奪大半真血。真靈血脈乃凡人修士難以企及的體質瑰寶，亦是真靈世家立身之本。",
    "canonRefs": [
      "葉家",
      "葉穎",
      "天鳳真血",
      "天鳳之翎",
      "真靈之血"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "鳳血淬體",
        "desc": "引動天鳳真血淬煉軀體，體質遠勝凡修，恢復力與抗性大增。"
      },
      {
        "level": 7,
        "name": "五色鳳焰",
        "desc": "口吐天鳳五色真火焚邪滅穢，可化身天鳳高速飛遁、剋制妖邪。"
      }
    ],
    "statBonus": {
      "attack": 14,
      "physique": 10,
      "maxHp": 10
    }
  },
  {
    "id": "longJiaWuQingDao",
    "name": "隴家無情道",
    "category": "body",
    "realmReq": "炼虚期",
    "maxLevel": 9,
    "desc": "隴家（靈界人族真靈第一世家）家傳頂階煉體道法，隴家老祖（合體後期大成）所修。斬斷七情六慾、以無情之心激發半龍之身，肉身堅逾靈寶、半龍之軀力撼山岳。無情道斷情絕愛、心如止水，方能將龍族血脈之力盡數激發，是靈界頂尖戰力之一的根本。隴家老祖曾以此與化作金毛巨猿的韓立合體後期之力激戰平手。",
    "canonRefs": [
      "隴家",
      "隴家老祖",
      "半龍之身",
      "無情道",
      "真靈世家"
    ],
    "neigong": [
      {
        "level": 4,
        "name": "半龍之軀",
        "desc": "激發龍族血脈，肌生龍鱗、力撼山岳，肉身堅逾頂階靈寶。"
      },
      {
        "level": 7,
        "name": "無情劍心",
        "desc": "斬斷七情六慾，心如止水不為幻術心魔所動，戰力穩定發揮。"
      },
      {
        "level": 9,
        "name": "真龍法相",
        "desc": "大成催出真龍虛影法相，龍爪龍尾橫掃，可與合體大成存在抗衡。"
      }
    ],
    "statBonus": {
      "physique": 22,
      "defense": 16,
      "attack": 12,
      "maxHp": 14
    }
  },
  {
    "id": "shiJinChongKongChongShu",
    "name": "噬金蟲控蟲術",
    "category": "beast",
    "realmReq": "结丹期",
    "maxLevel": 7,
    "desc": "御靈宗、突兀族先祖一脈所傳馭使噬金靈蟲的控蟲秘術。噬金蟲（聖蟲）以金鐵為食、銅牆鐵壁可蛀，成片放出可吞噬法器、絞殺敵身。修者以神識同步操控蟲群，更可借大衍訣神識化千寄附蟲身廣域搜索。韓立得噬金蟲王後以神識化千之法馭使蟲群，搜敵、攻防、煉器無所不能，是其極具特色的輔助戰力。",
    "canonRefs": [
      "噬金蟲",
      "噬金蟲王",
      "神識化千",
      "御靈宗",
      "聖蟲"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "噬金蝕器",
        "desc": "放出噬金蟲群蛀蝕金鐵法器，可解敵法寶、毀其護甲。"
      },
      {
        "level": 7,
        "name": "蟲海搜形",
        "desc": "以神識化千寄附蟲群廣域搜索，亦可結蟲海吞噬絞殺敵身。"
      }
    ],
    "statBonus": {
      "spirit": 12,
      "attack": 10,
      "maxHp": 6
    }
  },
  {
    "id": "xuanYinJingMoGong",
    "name": "玄陰經魔功",
    "category": "cultivation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "源出玄陰經的魔道功法，凝練體內精元成至陰煞氣，可施陰魔斬、換形訣、夢引術等諸般秘術。修者煉至深處可劃破空間、竄改他人記憶神識。韓立得玄陰經後修出陰魔斬（放黑紅光片含黑氣斬擊）、換形訣（瞬改身形膚色）、夢引術（封印竄改記憶）等實用神通，是其早中期應敵與情報手段的重要來源。",
    "canonRefs": [
      "玄陰經",
      "陰魔斬",
      "換形訣",
      "夢引術"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "換形訣",
        "desc": "瞬間改換身形膚色容貌，示人時法力可動用七成，用於易容潛行。"
      },
      {
        "level": 6,
        "name": "陰魔斬",
        "desc": "凝精元一次性釋放，放黑紅光片含黑氣斬擊，傷口黑氣難以驅散。"
      },
      {
        "level": 9,
        "name": "夢引竄識",
        "desc": "修為高於對方時可封印竄改其記憶神識，或不損神智抽取情報。"
      }
    ],
    "statBonus": {
      "attack": 14,
      "spirit": 12,
      "maxHp": 6
    }
  },
  {
    "id": "nieZuoShengLingDaFa",
    "name": "涅盤聖靈大法",
    "category": "cultivation",
    "realmReq": "炼虚期",
    "maxLevel": 1,
    "desc": "葉家厚禮所載的上乘輔修大法，與草魂丹同為葉家邀韓立入族客卿所贈之珍。修煉可洗滌神魂、淬煉本命元嬰，於突破煉虛、化神瓶頸時穩固心神、降伏心魔，並輔以聖靈之氣滋養元神。真靈世家以此法傳承護持嫡系少主衝關晉境，是世家底蘊深厚的明證之一。",
    "canonRefs": [
      "葉家",
      "葉穎",
      "草魂丹",
      "涅盤聖靈大法"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "聖靈滌魂",
        "desc": "洗滌神魂、淬煉本命元嬰，突破瓶頸時穩固心神、降伏心魔。"
      }
    ],
    "statBonus": {
      "spirit": 16,
      "maxHp": 8
    }
  },
  {
    "id": "guYinLunHuiJue",
    "name": "陰陽輪迴訣",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 7,
    "desc": "源自青陽門的人鬼合修功法，於陰冥之地濃郁陰冥之氣中修煉極快。修者借精純陰氣淬煉成半人半鬼之身，鬼道神通大增，可御陰煞、化鬼遁、攝魂魄。然大成後修者同樣受損，喪失重進輪迴之資格，若繼續深修終將徹底淪為鬼物。元瑤與妍麗於亂星海鬼霧中修成此功，成半人半鬼之身。",
    "canonRefs": [
      "陰陽輪回訣",
      "青陽門",
      "元瑤",
      "妍麗"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "陰氣淬體",
        "desc": "汲精純陰氣淬煉軀體，漸成半人半鬼之身，陰冥之地戰力大增。"
      },
      {
        "level": 7,
        "name": "化鬼攝魂",
        "desc": "可化鬼遁、御陰煞、攝魂魄，鬼道神通大成，然喪輪迴之資。"
      }
    ],
    "statBonus": {
      "spirit": 14,
      "speed": 8,
      "attack": 6
    }
  },
  {
    "id": "xueLianShenGuangMoGong",
    "name": "血煉神光",
    "category": "cultivation",
    "realmReq": "结丹期",
    "maxLevel": 7,
    "desc": "越皇所修頂階魔功，可凝成護體血光、吸納法器靈性，配合吸納化身修為後血光大幅增厚。曲魂版本以血色光芒為主要攻擊手段，可釋放紫色魔火與血色光柱。此功與身外化身之術相輔，借血凝五行丹祭煉分身、吸納修為，是魔道速成而陰狠的一脈，然修者難以善終。",
    "canonRefs": [
      "血煉神光",
      "越皇",
      "曲魂",
      "身外化身"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "護體血光",
        "desc": "凝血色光芒護體，可吸納所擊法器之靈性，越戰越強。"
      },
      {
        "level": 7,
        "name": "血光魔焰",
        "desc": "釋放紫色魔火與血色光柱攻敵，配合化身吸納修為威能大增。"
      }
    ],
    "statBonus": {
      "attack": 14,
      "defense": 10,
      "maxHp": 8
    }
  },
  {
    "id": "tianShiZhuLianShi",
    "name": "天屍煉屍術",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 7,
    "desc": "極陰宗、冥尸谷一脈所傳化屍煉屍魔術，以陰煞秘法煉養屍兵屍將為戰。煉屍須擇強橫屍身、注陰煞養屍火，屍兵不畏生死、力大無窮，高階屍王更可施天都尸火等妖火。極陰祖師以天都妖尸配天都尸火橫行，炫曜王等萬年尸王更謀吞噬修士精魂以成天尸之體。屍道陰森詭異，是魔道馭使一脈中極可怖的旁支。",
    "canonRefs": [
      "煉屍術",
      "天都尸火",
      "極陰宗",
      "冥尸谷",
      "天尸珠"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "煉屍養兵",
        "desc": "以陰煞屍火煉養屍兵屍將，屍兵不畏生死、力大無窮，聽命衝陣。"
      },
      {
        "level": 7,
        "name": "天都尸火",
        "desc": "驅高階屍王噴吐黑色天都妖火，可焚法寶生靈，配合屍潮絞殺。"
      }
    ],
    "statBonus": {
      "attack": 12,
      "maxHp": 12,
      "physique": 8
    }
  },
  {
    "id": "siShaHuaJiaShu",
    "name": "四煞化甲術",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 1,
    "desc": "飛靈族地淵守衛所傳煞氣煉體秘術，以四方煞氣凝煞成戰甲護身。地淵守衛常駐封魔門外，以此術凝煞氣成甲、抵禦地淵妖潮，是飛靈族精銳甲士守護地淵試煉大門的看家本領。煞甲堅韌可禦強擊，更能反震近身之敵，為偏重防禦的煉體護道之術。",
    "canonRefs": [
      "飛靈族",
      "四煞化甲術",
      "地淵守衛",
      "封魔門"
    ],
    "neigong": [
      {
        "level": 1,
        "name": "凝煞成甲",
        "desc": "引四方煞氣凝成戰甲護體，堅韌禦強擊，可反震近身之敵。"
      }
    ],
    "statBonus": {
      "defense": 18,
      "physique": 10,
      "maxHp": 10
    }
  },
  {
    "id": "renShouHeYiShu",
    "name": "人獸合一神通",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 7,
    "desc": "蠻獸人（浮黎沼澤馴養蠻荒古獸的異族）所修部族秘傳煉體神通。馴化蠻荒古獸後與之氣血相融，修者可化為丈餘巨人形態，力大無窮、皮糙肉厚，徒手撕裂猛獸。人獸合一以血脈相契為本，化身後戰力暴增卻智識略降，是浮黎沼澤異族探子與戰士賴以橫行蠻荒的根本。",
    "canonRefs": [
      "蠻獸人",
      "人獸合一",
      "浮黎沼澤",
      "蠻荒古獸"
    ],
    "neigong": [
      {
        "level": 3,
        "name": "血契馴獸",
        "desc": "與馴化古獸氣血相融締結血契，戰時引獸力入體、共禦強敵。"
      },
      {
        "level": 7,
        "name": "巨人化身",
        "desc": "化為丈餘巨人，力大無窮、皮糙肉厚，徒手撕裂猛獸法器。"
      }
    ],
    "statBonus": {
      "physique": 18,
      "maxHp": 14,
      "attack": 10
    }
  },
  {
    "id": "te_sword_0",
    "name": "劍靈化虛訣",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "劍修傳說神通，飛劍可化無形虛影任意分解再復原，洞穿禁制無視擒拿，近乎不壞之劍身。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_1",
    "name": "太乙青光劍訣",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "與元磁神光並列的上古奇光，號稱虛刃無形無色犀利無雙，催動時護身之寶亦難盡擋。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_2",
    "name": "念劍誅神訣",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "萬劍圖中所藏大神通，以神識凝晶劍自眉間三竅噴出，專傷敵之元神，施者亦受反噬須以法相承受。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_3",
    "name": "巨劍合一術",
    "category": "sword",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以神識催動全套青竹蜂雲劍合為一口數丈光劍，威勢遠勝單劍，一斬可裂山開石。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_4",
    "name": "玄劍歸真心法",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "玄劍門引氣入劍之基礎心法，使初習者凝氣於劍鋒，御劍離手三尺而擊，為劍修入門根基。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_5",
    "name": "庚金斷虹劍經",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以庚金至剛之氣煉劍，劍芒化作長虹斷空而落，鋒銳可斷尋常法器靈光，最克木水二系。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_6",
    "name": "九霄驚鴻劍訣",
    "category": "sword",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "御劍極速之劍法，劍光快如驚鴻掠空一閃即至，敵神識難鎖，最宜奇襲與遁走。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_7",
    "name": "純陽斬魔劍訣",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以純陽罡氣灌注劍身，劍芒赤亮如烈日，專破鬼物魔道之陰邪功法，斬處陰煞盡消。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_8",
    "name": "落英繽紛劍法",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "劍走輕靈一劍化作漫天劍花，點點如落英護身禦敵，攻守兼備為入門劍者所重。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_9",
    "name": "寒潭映月劍訣",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "心如寒潭止水方能御此劍，劍意清冷凝霜，一劍既出湖光劍影難分真假，亂敵耳目而後一擊斃命。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_10",
    "name": "萬劍歸宗大法",
    "category": "sword",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "御劍之極致神通，可同馭百千飛劍如臂使指，萬劍齊鳴如蜂群蔽空，敵陷劍海無從遁逃。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_11",
    "name": "雷音劍罡訣",
    "category": "sword",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "引天雷之力入劍，劍罡迸射雷弧轟鳴，一劍既出雷光大作，最克水冥兩系與鬼道之軀。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_12",
    "name": "霜鋒凝冰劍經",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "至陰寒氣凝於劍鋒，劍芒所掃寒霜漫生可凍封法力，傷者經脈結冰行氣遲滯。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_13",
    "name": "孤光斷海劍訣",
    "category": "sword",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "一劍一意傾盡全力凝為孤光，劍出無回斷山截海，乃以命相搏的劍修殺招。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_14",
    "name": "破陣青蟠劍訣",
    "category": "sword",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "融念劍之意而成的攻陣劍法，青蟠劍光螺旋鑽絞專破敵之禁制護罩，陣破即取首級。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_15",
    "name": "御風流光劍法",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "身隨劍走人劍合一，借風遁之勢提速，劍光如流虹纏身，遊鬥之中尋瑕而刺。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_16",
    "name": "誅仙四殺劍訣",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "凶絕劍道大神通，劍分四道各蘊絕殺之意，封逃路斷生機，陷敵於必死之絕境。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_17",
    "name": "凌雲御劍訣",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "劍修禦空趕路之術，足踏飛劍凌雲萬里，可化長虹遁走，為御劍離地飛行之根本。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_18",
    "name": "玄霜斷魂劍經",
    "category": "sword",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "霜寒劍意直透元神，劍芒過處不傷其形先攝其魂，中者神思恍惚進退失據。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_19",
    "name": "金鐵交鳴劍訣",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "重劍無鋒以剛猛取勝，劍勢沉雄如金鐵交擊，硬撼之下可震碎敵之護身靈光與骨骼。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_20",
    "name": "無相劍心真解",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "劍道至高心法，無招無式劍隨心動，劍意斂於無形敵難測其先機，臨敵時後發而先至。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_21",
    "name": "幽冥血影劍訣",
    "category": "sword",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "魔道劍修邪術，以精血養劍劍泛血光，劍影詭譎纏人奪魄，傷口血氣難止久不能癒。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_sword_22",
    "name": "斷虹千劍圖錄",
    "category": "sword",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "圖中藏劍意千道，參悟者可悟出層層御劍神通，劍光斷空如虹貫日，為劍修畢生研磨之秘圖。",
    "canonRefs": [
      "劍道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_23",
    "name": "玄霜斷魂刀",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "凝寒霜於刀身的入門刀法，劈砍間挾陰冷之氣，刀光所過令敵手足僵滯、靈台微寒，是煉氣修士御敵保命的根基。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_24",
    "name": "赤焰裂空刀",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "引火屬靈氣灌注刀鋒的烈性刀訣，揮刀如赤龍出海，刀光帶起灼浪焚煙，最能克制蟲豸與草木妖物。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_25",
    "name": "青嵐流光刀",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "取風之輕靈的快攻刀法，身隨刀走、刀隨風轉，連綿刀光如嵐似霧，以迅捷見長而非剛猛。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_26",
    "name": "墨雲沉沙刀",
    "category": "sword",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "以土屬厚重之力壓刀而下的樸拙刀訣，一刀劈落如沉沙落地，沉穩可破粗淺護體罡氣。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_27",
    "name": "驚瀾分水刀",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "化水柔為刀勢的圓轉刀法，刀光似潮汐連環不絕，可順敵法力卸力反斬，攻守兼備堪稱一絕。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_28",
    "name": "幽冥噬魂刀",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "魔道偏鋒刀訣，刀氣染陰煞以噬人神魂，中招者神識昏沉、法力潰散，然修煉者易受陰冷反噬心脈。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_29",
    "name": "九霄落雷刀",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "引雷屬靈氣淬刃的剛猛刀法，揮刀時刀脊爆出細密電弧，一刀斬下如九天落雷，最克鬼物與木靈。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_30",
    "name": "斷岳裂石刀",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以重力沉勁見長的霸道刀經，刀勢如山岳傾覆，專破護體法寶與堅甲，一刀之威足裂頑石巨岩。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_31",
    "name": "血河屠龍刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "以精血養刀的兇煞絕學，刀氣化血色長河奔湧，所斬之處法力盡赤，威勢凌厲卻折損元氣，修者需慎。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_32",
    "name": "寒淵鎖魄刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "極寒一脈的封禁刀法，刀光所至凝出玄冰縛敵周身，鎖其法力與身形，再施雷霆一斬定其生死。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_33",
    "name": "罡風絕影刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "馭風成罡的迅疾神通，人刀合一化作青光殘影，刀未至而罡風先割，神出鬼沒令人難測其向。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_34",
    "name": "玄煞噬星刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "結丹刀修的成名大法，凝煞氣為漆黑刀芒，一刀斬出如吞星裂宇，可破同階法寶與護罩，殺伐之氣懾人。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_35",
    "name": "天傾裂宇刀",
    "category": "sword",
    "realmReq": "元嬰期",
    "maxLevel": 11,
    "desc": "元嬰刀修的鎮派絕學，催動本命刀器引動天地罡煞，一刀劈落似天穹崩裂，光華縱橫數里令山河失色。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_36",
    "name": "陰陽輪轉刀",
    "category": "sword",
    "realmReq": "元嬰期",
    "maxLevel": 11,
    "desc": "融陰陽二氣於一刀的玄奧神通，正反兩道刀光交織輪轉，剛柔互生生生不息，可亂敵法力根基。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_37",
    "name": "焚天赤龍刀",
    "category": "sword",
    "realmReq": "元嬰期",
    "maxLevel": 11,
    "desc": "以火靈之精淬鍊的至烈刀法，刀光化赤龍盤旋噴焰，所過之處靈氣盡焚，是焚滅成片妖修的兇威神通。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_38",
    "name": "幽冥渡魂刀",
    "category": "sword",
    "realmReq": "元嬰期",
    "maxLevel": 11,
    "desc": "魔道頂尖刀訣，刀芒裹陰冥之力斬人三魂七魄，縱護身法寶亦難全擋，然修之深者易墮心魔難返本心。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_39",
    "name": "斬仙誅神刀",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "化神大能傳世的無上刀經，刀勢已臻法則之境，一念出刀可斷虛空、裂禁法，傳聞窺得此道者可逆斬高階。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_40",
    "name": "混元歸一刀",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "返璞歸真的至高刀道，萬般刀勢盡歸一刀，無形無象卻含吞吐天地之威，乃刀修畢生求索的圓滿之境。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_41",
    "name": "九幽滅世刀",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "化神魔修的禁忌絕學，凝九幽煞氣為一刀，刀落處陰風蔽日萬法俱寂，威能滔天卻噬主反噬不可輕用。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_42",
    "name": "蒼穹斷海刀",
    "category": "sword",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以法則馭水土之力的恢宏神通，一刀橫掃可斷江絕海、撼動地脈，氣象萬千為化神刀修震懾群修之絕招。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_43",
    "name": "玉碎驚虹刀",
    "category": "sword",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以玉清靈氣養刀的清貴刀法，刀光如驚虹貫日寧折不彎，剛烈中藏一往無前之決絕，最重一擊定勝負。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_44",
    "name": "風雷雙煞刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "風雷二氣並蓄的雙屬刀訣，揮刀時罡風裹雷霆齊發，一快一猛相輔相成，攻勢綿密又暗藏炸裂殺機。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_45",
    "name": "墨海沉淵刀",
    "category": "sword",
    "realmReq": "元嬰期",
    "maxLevel": 11,
    "desc": "取水冥之沉鬱凝成的厚重神通，刀勢如墨海翻湧層層下壓，可鎖困敵手於無形漩渦再施雷霆一斬。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_46",
    "name": "破軍裂陣刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "專為破陣斬敵而生的剛猛刀法，刀芒凝煞如利錐直貫，最善撕裂法陣護罩與符籙禁制，乃攻堅破障之利器。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_47",
    "name": "霜刃縛龍刀",
    "category": "sword",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "寒屬封制一脈的精妙刀訣，刀光化萬千冰刃纏縛敵身，封其經脈靈樞使法力遲滯，再覓破綻一刀斷魂。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_blade_48",
    "name": "炎陽焚魔刀",
    "category": "sword",
    "realmReq": "元嬰期",
    "maxLevel": 11,
    "desc": "純陽至剛的辟邪刀法，刀身燃騰烈陽真火，最克陰煞鬼物與魔道屍傀，一刀斬出邪氣盡焚正可鎮場。",
    "canonRefs": [
      "刀道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_cultivation_49",
    "name": "長春不老功",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "黃楓谷流傳之木屬養氣功法，修煉平和、駐顏延壽，雖品階平平卻最宜煉氣士築基紮根。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_50",
    "name": "玄冰寒元訣",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "落雲宗水屬入門功法，修煉容易、寒氣護體，築基後可轉為主修，亦宜作偽裝身份之用。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_51",
    "name": "紫陽養氣訣",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "尋常散修常修之火屬基礎心法，溫養經脈、聚靈成氣，根基穩固後再圖更高深功法。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_52",
    "name": "九轉玄元功",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "需散功重修九轉以淬煉真元的築基輔助功法，每轉壓縮法力一分，可顯著提升金丹品階。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_53",
    "name": "大衍真經",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "大衍神君所創傀儡神念秘法，可壯大元神、安全分出大量神念，為祭煉分身之必備前提。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_54",
    "name": "三轉重元功",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "附於青元劍訣後之結丹輔助秘法，須散功三次重修壓縮真元，理論結丹成功率高達五成。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_55",
    "name": "碧落罡煞訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "煉化天地煞氣為己用之罡煞功法，威力剛猛而修煉兇險，成則法力雄渾遠勝同階修士。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_56",
    "name": "太乙混元功",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "兼修五行靈氣之中庸正道功法，根基厚實、法力磅礴，最宜資質平庸者穩步衝擊結丹。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_57",
    "name": "玄陰聚靈訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "陰屬聚靈秘法，借月華地脈之力速凝法力，修煉者陰寒之氣凝重，宜女修陰靈之體。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_58",
    "name": "明王強體訣",
    "category": "generic",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "佛宗金剛護法強體秘術，將煞氣煉化為己用而非驅散，二層修成肉身堅逾法寶、剛猛無儔。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_59",
    "name": "素女輪迴功",
    "category": "generic",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "掩月宗獨門秘傳，可春顏永駐、容顏不老，輪迴時能將法力渡予他人，然受其境界所限。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_60",
    "name": "歸元御靈訣",
    "category": "generic",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "御使靈物之上乘功法，凝練金丹之時兼養本命靈獸，丹靈相生、攻防一體，威能不凡。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_61",
    "name": "太清玄罡功",
    "category": "generic",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "正道名門結丹主修功法，金丹外結三層玄罡護體，法力精純、神識凝實，渡劫亦多三分把握。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_62",
    "name": "赤焰真陽訣",
    "category": "generic",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "火屬剛烈功法，催動三昧真陽焚山煮海，攻伐之威冠絕同階，唯耗靈過巨、需厚積靈石以續。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_63",
    "name": "驚蟄真靈訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "紅雲大長老獨創之十二般真靈變化術，可化身天鵬、孔雀、巨猿等真靈形態，借體質與神通禦敵。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_64",
    "name": "疾風九變功",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "妖禽身法功法，含法訣、身法、斂息與血影遁四部，遁速如電、行蹤難測，最利刺殺與遁逃。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_65",
    "name": "太虛凝魂訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "凝煉元嬰神魂之上品功法，神識化形、收放自如，可分神百餘以禦敵，亦固本命免遭神魂之劫。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_66",
    "name": "玄天混元劍訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "劍修登峰之大成劍訣，御使飛劍化萬千劍光，劍意通玄、削金斷玉，元嬰劍修最為忌憚之術。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_67",
    "name": "幽冥噬魂大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "魔道冥屬功法，攝奪生靈魂魄精血以壯己身，修煉速捷而戾氣纏身，易遭正道圍剿、入魔之危如影隨形。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_68",
    "name": "梵聖真魔功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "法體雙修之絕世功法，施展現三頭六臂金影與赤金鱗紋，配合根源之火可將肉身強度推至化神巔峰。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_69",
    "name": "五藏鍛元功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "源自金闕玉書之仙界秘術，修成令實力激增，唯進境極緩，須廣靈道體相輔方能於飛昇前竟功。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_70",
    "name": "太乙化神真經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "傳承自上界之化神正法，凝煉元嬰化身為神，神通廣大、壽元綿長，乃跨入化神大道之根本真經。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_71",
    "name": "無極歸元神功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "返本歸元之至高玄功，引天地大道入體、法力近乎無窮，化神後修者可演化諸般神通，距合體一線之遙。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_cultivation_72",
    "name": "紫府煉神大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "錘煉神識紫府之頂尖大法，神念磅礴可鎮壓同階、洞徹虛實，配合祕寶更能於天劫中護住元神不滅。",
    "canonRefs": [
      "主修功法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_73",
    "name": "太一化清符",
    "category": "talisman",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "銀蝌靈符之極品，催動後周身霧化遁形，連煉虛修士神念亦難察覺，虛化中仍可先發制人一擊。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_74",
    "name": "九宮天乾符",
    "category": "talisman",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "一百零八張銀符構成的困敵符陣，變化萬千，可幻化殿宇樓閣式禁制，將強敵牢牢困鎖其中。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_75",
    "name": "三清雷霄符",
    "category": "talisman",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "引動天地雷霆的攻擊型靈符，祭出後紫金電弧傾瀉而下，對鬼修魔功有先天剋制之效。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_76",
    "name": "六丁天甲符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "天符門三大密符之一，不耗法力而吸引天地靈氣凝成六層持續再生的光甲護罩，攻防兼備。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_77",
    "name": "降靈祕符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "以八級妖獸精魄煉成的密符，催發後施術者半妖半人，修為暴漲至元婴頂階且不損壽元。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_78",
    "name": "化靈代劫符",
    "category": "talisman",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "木屬性密符，收入體內以丹火培養數百年，危急時以符代身化靈光替死，效類化劫大法。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_79",
    "name": "破界裂空符",
    "category": "talisman",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "可撕裂空間障壁、破除禁制的奇符，遇空間類封禁尤為犀利，是脫困破陣的無上利器。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_80",
    "name": "甲元傀儡符",
    "category": "talisman",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "影傀儡符籙，催發後召喚持槍持刀的金甲影傀儡，擁施術者七八分修為與大半神通。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_81",
    "name": "青冥針符寶",
    "category": "talisman",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "元婴級珍品符寶，以精氣催動可化漫天青色針芒，攻擊面廣威力遠勝尋常法器數倍。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_82",
    "name": "天戈斬妖符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "凝成金色巨戈的攻殺靈符，祭出後光戈橫掃千軍，專破妖獸鱗甲與邪魔護身罡氣。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_83",
    "name": "定神鎮魂符",
    "category": "talisman",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "安定神魂、抵禦攝魂幻術的護持靈符，貼於眉心可使神識澄明，邪法攝魂之術難以近身。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_84",
    "name": "辟邪驅煞符",
    "category": "talisman",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "佛道兩用的辟煞符箓，焚之化淡金符火，可驅散屍煞陰氣，對附靈邪魔有奇剋之效。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_85",
    "name": "五雷正法符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "引五行天雷匯於一符，催發時五色雷光交織轟落，乃正道符修降妖伏魔之看家殺招。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_86",
    "name": "玄陰攝魂符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "陰冷詭異的魔道靈符，催動後黑霧纏身奪人三魂七魄，被攝者神識昏沉任其驅役。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_87",
    "name": "金光護身符",
    "category": "talisman",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "符修入門護持符箓，催發後周身湧現金色光罩，可硬擋同階法器一擊，是散修保命常備。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_88",
    "name": "千機禁制符",
    "category": "talisman",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "佈設機巧禁制的奇符，層層符文相扣化作迷障牢籠，困敵之餘更可反噬闖入者法力。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_89",
    "name": "焚天烈焰符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "火屬性攻殺靈符，催發即化烈焰金鳥撲擊，所過之處寸草不生，尤克至寒陰煞之物。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_90",
    "name": "通天傳訊符",
    "category": "talisman",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "刻有神識銘文的傳音符箓，捏碎後可越萬里傳遞密語，乃修士聯絡同道、傳遞密報之用。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_91",
    "name": "縛仙鎖靈符",
    "category": "talisman",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "禁錮五行靈氣的封印靈符，銀光符鎖加身可封鎖強橫靈體法力運轉，令其神通盡廢。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_92",
    "name": "萬法歸元符",
    "category": "talisman",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "符道集大成之祕符，可臨陣化解他人符法禁制並反引其力為己用，乃符修登峰造極之證。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_93",
    "name": "鎮魔冥煞符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "鎮壓邪魔的玄階重符，催發後黑金符文凝成鎮魔印，可壓制魔功幻影與附靈邪祟現形。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_94",
    "name": "御靈飛遁符",
    "category": "talisman",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "輔助飛遁的尋常靈符，催發後御風疾行倍增遁速，是低階修士趕路逃命兩相宜的入門符。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_95",
    "name": "天罡護法符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "引天罡正氣護身的高階靈符，可生成數重剛猛光盾，硬抗血雷邪火而符體不潰。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_96",
    "name": "玄樞封禁符",
    "category": "talisman",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "封禁洞府門戶的高階符陣，符文勾連成樞紐禁制，未得口訣者強闖必遭符力反震重創。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_97",
    "name": "巨靈鎮山符",
    "category": "talisman",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "催發後凝出山岳巨靈虛影的攻防巨符，一掌拍落重逾萬鈞，正面碾壓同階法寶威能。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_talisman_98",
    "name": "斬妖滅邪符",
    "category": "talisman",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "正道符門傳承的誅邪靈符，化作雪亮符光斬向妖魔，對化形妖獸與鬼修元神有奇效。",
    "canonRefs": [
      "符道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_99",
    "name": "顛倒五行大陣",
    "category": "formation",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以陣旗陣盤紊亂周遭五行靈力流向，於狹小之地展開可暫阻多名修士強攻，為己方爭取逃脫與傳送之機。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_100",
    "name": "周天星斗陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "引九天星辰之力垂落陣中，化作萬點星芒交織成網，星力綿綿不絕，可困鎖元嬰修士於陣內反覆絞殺。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_101",
    "name": "九宮八卦迷蹤陣",
    "category": "formation",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "依九宮八卦方位插設陣旗，生出無窮幻象迷障，使入陣者方寸大亂、辨不清東西，乃護山藏寶之基礎困陣。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_102",
    "name": "兩儀玄光陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "借陰陽兩儀之環為陣樞，密布銀白光絲洞穿靈器護罩，陽環操光攻敵、陰環護身避傷，攻守一體渾然天成。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_103",
    "name": "太乙青光困龍陣",
    "category": "formation",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "凝太乙青光化作千百道青絲縛鎖陣中，可剋元磁五行之力，縱是元嬰後期修士入陣亦難掙脫青光纏縛。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_104",
    "name": "玄天鎖魂大陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "於陰冥之地催動幽魂陰煞凝成鎖鏈，專鎖修士元神魂魄，魂魄一旦被縛則神識昏沉、法力滯澀難施。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_105",
    "name": "混元歸墟陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以陣眼引動混沌歸墟之力，陣中天地靈氣盡數倒卷吞噬，法寶神通入陣即被磨蝕消解，乃化神大能護道殺陣。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_106",
    "name": "幽冥百鬼陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "驅役百千厲魂血鬼結成鬼影森森之陣，鬼嘯攝魂、群鬼撲咬奪魄，於陰煞濃郁之夜威能倍增、難以破解。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_107",
    "name": "縛靈鎖煞陣",
    "category": "formation",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以縛靈陣旗封鎖一方靈氣流轉，困住妖獸靈物使其法力遲滯、形神受制，多用於擒拿煉養靈獸之用。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_108",
    "name": "聚靈養氣陣",
    "category": "formation",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "匯聚周遭天地靈氣於陣心一處，使陣內靈氣濃郁倍於外界，修士盤坐其中吐納修煉，可大幅縮短閉關之期。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_109",
    "name": "迷蹤奪魄幻陣",
    "category": "formation",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以幻光迷障亂人耳目心神，入陣者步步成幻、真假莫辨，輕則迷途難出，重則心魔暗生、自相殘殺。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_110",
    "name": "困龍鎖天陣",
    "category": "formation",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "天羅地網層層交疊，封死陣中上下八方退路，縱有遁術神通亦難破網而出，專為困殺強橫妖修而設。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_111",
    "name": "誅仙劍陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以數十口本命飛劍布成三百六十道劍光大陣，劍光化忽隱忽現之劍絲無聲切割法寶，含辟邪神雷自動禦魔。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_112",
    "name": "鎮魔封天大陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "上古鎮壓魔氣滲漏之封印大陣，以純陽神光為樞、萬丈罡光垂照，可長年鎮壓海眼漩渦底部封印之古魔。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_113",
    "name": "落星玄冰陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "引玄冰寒煞凝作漫天冰星墜落，陣中滴水成冰、靈力凍滯，被困者血脈凝寒、法力遲澀，動轉皆受牽制。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_114",
    "name": "翻天裂地殺陣",
    "category": "formation",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以崩山裂地之力為引，陣動則地火奔湧、山岩傾覆，可於頃刻間夷平一方山頭，乃攻伐拔寨之兇陣。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_115",
    "name": "玄陰噬魂陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "凝至陰煞氣化作漩渦攝人神魂，魂魄被噬則神思渙散、本命元嬰受損，傷處陰氣纏附難以動用法力癒合。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_116",
    "name": "五行生剋大陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "金木水火土五行陣旗相生相剋循環不息，可隨敵之屬性自行流轉相剋，借天地五行之力反震一切外來攻伐。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_117",
    "name": "天羅地網困陣",
    "category": "formation",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "上下兩重陣網交織如籠，封鎖遁光與神識感應，入陣修士覓不見出路、傳訊不出，最宜圍而擒之。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_118",
    "name": "萬劍歸宗陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以純粹木屬性青色飛劍七十二口布成，可幻化真假交錯之劍域困殺強敵，借天地元氣孕生五色劍光斷敵生機。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_119",
    "name": "幽魂迷霧陣",
    "category": "formation",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "陣起則陰霧瀰漫四野、辨方失向，幽魂虛影遊走霧中惑人心神，乃散修藏身設伏、阻敵追蹤的常用迷陣。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_120",
    "name": "極陽焚天陣",
    "category": "formation",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "聚至陽罡火於陣中化作漫天火海，焚山煮海、燒融護罩，天克陰邪鬼物與魔道功法，邪修入陣形神俱滅。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_121",
    "name": "鎖龍鎮獄陣",
    "category": "formation",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "上古鎮龍鎖脈之囚陣，以鎮獄陣鏈封鎖真龍血脈之力，縱是半龍之軀入陣亦力竭難掙，專鎮上古兇獸妖王。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_122",
    "name": "聚煞血祭陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "聚四方煞氣血氣於陣心血祭，可速煉魂魄屍兵、催養血鬼厲魂，魔道修士藉此以人魂築基、陰狠速成。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_123",
    "name": "崩山碎玉陣",
    "category": "formation",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以土行陣旗激盪地脈，陣動則亂石崩飛、地裂如網，困敵於亂石之中進退維谷，攻守兼備的尋常野戰之陣。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_formation_124",
    "name": "歸元鎮靈陣",
    "category": "formation",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "封鎖陣中靈氣使之歸於沉寂，被困者法力倒卷、神通難施，乃押解囚禁修士、封存兇物的鎮壓之陣。",
    "canonRefs": [
      "陣道"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_body_125",
    "name": "金剛淬體訣",
    "category": "body",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "佛門入門煉體基礎功法，借香火罡煞反覆淬鍊皮肉，修成後拳腳堅韌，尋常刀劍難傷，乃強體入道之根。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_126",
    "name": "易筋鍛骨功",
    "category": "body",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "上古散修強體秘法，以靈藥溫養全身筋骨，逐層拉伸經脈，使氣血暢旺、力大數倍，為練氣修士護身良功。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_127",
    "name": "玄龜壯骨經",
    "category": "body",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "仿玄岩龜體魄所創之煉體功法，運轉後背生淡青龜紋，肉身沉重堅韌，抗擊之力遠勝同階，尤擅久戰苦熬。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_128",
    "name": "鐵壁真鋼功",
    "category": "body",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "以鐵精與煞氣反覆鍛打血肉的剛猛功法，修成者通體似生鐵鑄就，硬抗低階法器不退，唯靈活稍欠。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_129",
    "name": "白玉煉魄訣",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "罕見煉體上品，修成後軀體晶瑩如白玉，隱隱透出淡淡金絲，堅硬媲美鐵精，且能將外來煞氣煉化為己用。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_130",
    "name": "明王金剛功",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "佛門金剛護法所傳強體神功，改自上古妖族祕術，修煉劇痛卻效果驚人，可化煞為力，拳出如金剛降世。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_131",
    "name": "百脈鍛元經",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以自身經脈骨骼為爐祭煉之上古祕術，逐脈淬鍊使氣血如江河奔湧，肉身漸近不朽，力可開山裂石。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_132",
    "name": "煞血煉軀大法",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "魔道煉體邪功，引外煞與精血相融鍛體，修成者肌膚泛起血光護體，傷愈極速，然戾氣纏身需以心法鎮壓。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_133",
    "name": "山岳鎮元神功",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "仿山岳巨猿之力所創，運功時周身罡氣如山岳壓頂，一拳之威可碎堅盾，最宜近身搏殺、以力破巧。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_134",
    "name": "九轉鍛體訣",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "分九轉漸進之煉體功法，每轉須以靈泉溫養重鍛一遍，每轉肉身強度倍增，九轉圓滿可硬接結丹法器。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_135",
    "name": "巨猿蛻凡功",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "上古妖族強體傳承，修成可暫化金毛巨猿之軀，雙臂暴漲、力撼千鈞，搏鬥時皮糙肉厚、悍勇異常。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_136",
    "name": "羅漢不壞身",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "佛門頂階護體神功，運功後周身泛金、宛如金身羅漢，刀槍難入、水火不侵，乃硬撼強敵之護命根本。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_137",
    "name": "天鵬煉翅篇",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以天鵬真血淬鍊背脊筋骨之煉體祕篇，修成後可生風雷之翅、骨堅如鋼，兼具極速遁逃與強橫近戰之能。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_138",
    "name": "五藏鍛元神功",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "罕世秘術，將五臟六腑逐一鍛煉化為儲法之器，使法力與肉身相輔倍增，並衍生諸般玄妙護身神通。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_139",
    "name": "真魔鑄體大法",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "魔道頂階煉體功法，凝煞血以鑄魔軀，修成者掌現漆黑如墨之異象，肉身堅韌剛猛，一觸可碎敵之護罩。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_140",
    "name": "玄龜不動經",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "取玄武龜甲之堅所創守勢煉體功，運轉時背生玄甲、氣血內斂，可硬扛雷劫余威，守如磐石、攻則沉雄。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_141",
    "name": "煞煙煉骨訣",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以陰冥煞煙日夜薰煉周身骨骼之祕法，修成者骨堅勝玄鐵、斷而能續，戰時白骨泛煞、近身傷敵於無形。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_142",
    "name": "霸體焚血功",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以自身精血為薪燃燒激發肉身潛力之剛猛功法，催發時氣血如焚、力增十倍，可短時暴起硬撼上階強敵。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_143",
    "name": "不滅金身訣",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "傳說中近不壞之煉體神通，斷肢可於數息間再生，法力充盈時新肢轉瞬而成，使敵之斬殺之術盡皆失效。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_144",
    "name": "重元鍛軀大法",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "須三度散功重修之苦修煉體祕法，每次以重元之氣壓縮血肉使其精純數倍，重鑄後肉身堅韌遠超同階。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_145",
    "name": "玉骨真鋼經",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "煉至骨化白玉、髓凝真鋼之高深功法，周身百骸晶瑩剔透，硬可承化神一擊，且骨中藏煞、隨意激射傷敵。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_146",
    "name": "涅槃聖體功",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "涅槃始祖所創魔族頂階煉體神通，可變化三頭六臂形態，施展至大成肉身強度媲美玄仙，乃壓箱底之護命絕學。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_147",
    "name": "化龍鍛骨神功",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "上古龍族強體傳承，修成可暫化龍鱗龍骨之軀，周身覆甲、力撼山河，近身搏殺時龍威逼人、橫掃八方。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_148",
    "name": "百脈煉寶神功",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以經脈骨骼祭煉法寶並與肢體相融之上古絕學，大成後肉身近乎不朽，雙手可直接施展所融法寶之威能。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_body_149",
    "name": "真魔金身大法",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "魔道至高煉體傳承，凝鍊三頭六臂真魔金身，手持殘刃可引動天地法則之力，肉身一擊足以裂界開山。",
    "canonRefs": [
      "煉體"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_agility_150",
    "name": "御風遁影訣",
    "category": "agility",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "初階輔助身法法術，運氣使身輕如燕、足不沾塵，借風勢高速掠行，達忽隱忽現之效，為低階修士趕路閃避兩宜的入門遁法。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_151",
    "name": "羅煙縹緲步",
    "category": "agility",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "化身形為一縷輕煙倏忽閃躲的步法秘技，急進急退間身影若隱若現，極耗體力卻可避過大半正面攻擊，近身纏鬥時尤為靈便。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_152",
    "name": "輕燕掠波身法",
    "category": "agility",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "效法春燕掠水的輕靈身法，踏水踏葉而不沉，騰挪間身輕如紙、落地無聲，最宜於水澤蘆葦間穿行追逐與脫身。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_153",
    "name": "流霞拂塵訣",
    "category": "agility",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "引一縷霞光裹身的輔助遁法，身周浮起淡淡彩暈以卸去阻力，趕路時可日行千里而法力消耗甚微，為散修最愛的省力身法。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_154",
    "name": "凌波微梭步",
    "category": "agility",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "築基修士常習的精妙步法，足下生波、瞬息數步如織梭往復，可於電光石火間連換數個方位，令敵法器追之不及。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_155",
    "name": "縮地追風遁",
    "category": "agility",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "借五行風土之力折縮地脈、化長途為咫尺的遁行秘術，催動時身化長虹遠遁百里，是築基修士遠行逃命的看家手段。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_156",
    "name": "疾風九轉身法",
    "category": "agility",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以風勁淬鍊軀體經脈的妖禽類身法，分九轉變幻，每轉提速一分，催至極限可身化殘影、左右瞬移，唯對體魄負擔極重。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_157",
    "name": "斂息潛形術",
    "category": "agility",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "收斂自身靈氣氣息以隱遁行蹤的輔助秘術，施展後法力內收、形跡難辨，可避過天眼術與尋常神識探查，潛行刺探皆宜。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_158",
    "name": "飄絮無蹤訣",
    "category": "agility",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "效柳絮隨風、行止無定的遁身法門，身法飄忽不循常理，被困時可如飛絮般卸力滑脫，纏鬥中最難被預判捕捉。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_159",
    "name": "穿雲逐電步",
    "category": "agility",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "結丹修士的高速移形步法，提氣縱身可穿雲破霧、逐電而行，數息間掠過十數丈，配合飛劍御空可形成連綿不絕的奔襲之勢。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_160",
    "name": "霧隱遊龍身法",
    "category": "agility",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "化身周霧氣為掩、身形如遊龍蜿蜒的隱遁身法，霧中身影飄忽難測，可借濃霧瀰漫之地接近或脫離強敵而不被鎖定。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_161",
    "name": "縹緲流光遁",
    "category": "agility",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "化身形為一道流光疾遁千丈的高階遁術，光遁無聲無息、轉折如意，可在結丹修士神識掃視的間隙倏然易位，奇襲遁走兩相宜。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_162",
    "name": "驚鴻照影訣",
    "category": "agility",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "取驚鴻一瞥之疾的身法神通，催動時殘影連綿、真身難辨，敵眼中但見數道身影錯落，實則本尊早已欺至近前或抽身遠遁。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_163",
    "name": "玄霜踏雪無痕",
    "category": "agility",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "融寒霜之力於步法的冰系身法，踏雪無痕、掠水成冰，移形之際足下凝出薄霜路徑，冰原雪域之中速度倍增、難覓行蹤。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_164",
    "name": "千幻易形遁法",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "隱匿變幻一道之上乘秘術，可瞬改體形容貌、收斂修為氣息，連元嬰神識亦難辨真假，更能分出幻身惑敵、真身趁隙遁走。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_165",
    "name": "血雲瞬遁術",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "燃自身精血化血雲瞬移的妖魔遁法，一遁可出百里之外，連施數次可掙脫元嬰後期修士神識鎖定，唯每次皆嚴重損耗精血法力。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_166",
    "name": "風雷雙翅遁",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "憑風雷之翅借雷電之力催動的瞬移遁術，速遠超尋常五行遁法，瞬息百丈近乎挪移，可於元嬰後期神識下短暫消形，奇襲逃遁皆稱絕。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_167",
    "name": "縱地金光遁",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "化身金光縱橫天地的高階土系遁術，遁行時遁入地脈穿山度嶺，可避雷劫、躲神識，於崇山峻嶺間遁速尤疾，是元嬰修士遠遁保命之憑。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_168",
    "name": "太虛化清隱遁符訣",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "半仙家隱匿身法，催動後全身霧化近乎虛無、仍可緩行調息，連化神修士神念亦難察其形，潛伏脫困之效冠絕同階，唯不可同時施重耗法力之術。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_169",
    "name": "九霄逐月身法",
    "category": "agility",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "御空高翔、追星逐月的飛遁身法，騰空可達九霄，身化長虹貫日疾掠，配合本命法器御風可長距離不竭奔行，追擊與遠遁皆極凌厲。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_170",
    "name": "羽化驚鵬遁",
    "category": "agility",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "引真禽血脈化身大鵬的極速飛遁神通，振翅可破風雷、瞬息千里，化身銀鵬時雙翅生電、身周罡風裂空，乃化神修士最快的飛遁手段之一。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_171",
    "name": "瞬影縮地神通",
    "category": "agility",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "折縮空間化千里為咫尺的化神大神通，催動時身形於兩點間驟現驟隱、不見過程，雖耗法力驚人卻可無視地形阻隔瞬至千里之外。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_172",
    "name": "玄天遁影大法",
    "category": "agility",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "借天地元氣晦藏身形的頂階隱遁大法，施展後身與天地相融、形跡盡消，可悄然穿越大陣禁制，連化神後期神識亦難捕其蹤跡。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_173",
    "name": "星河垂虹遁",
    "category": "agility",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "化身形為一道垂天星虹橫掠長空的化神遁術，遁速如星墜長河、轉折無滯，可借星辰之力於高空長程奔遁，遠遁之疾為同階罕有。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_174",
    "name": "雷光裂空步",
    "category": "agility",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "凝雷電於足下、踏雷光裂空而行的化神身法，每一步皆伴電弧炸裂、身隨雷走，近身糾纏時可借雷遁瞬移欺身，攻防騰挪迅捷如電。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_agility_175",
    "name": "縹緲虛舟遁",
    "category": "agility",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "化身軀如虛無孤舟、隨元氣之流飄行的高深遁法，遁行時身似實似虛、若有若無，可順天地靈氣暗流悄然遠遁，最難為人神識所鎖。",
    "canonRefs": [
      "身法遁術"
    ],
    "statBonus": {
      "speed": 3
    }
  },
  {
    "id": "te_soul_176",
    "name": "大衍神念訣",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "千竹教鎮教傀儡秘法，可壯大元神並安全分出大量神念，修至高層能分神百餘以驅役機關傀儡。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_177",
    "name": "煉神化魂大法",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以法力反熬元神、淬煉神魂之絕學，修成後神識凝練如實質，可承受元嬰出竅遠遊之損耗。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_178",
    "name": "三魂凝真訣",
    "category": "soul",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "收攝散逸三魂、固守靈台之基礎法門，可令神識穩固不亂，抵禦攝心幻術侵擾。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_179",
    "name": "七魄歸元祕術",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "匯聚七魄歸於識海一處，修成後神魂厚重，遇神魂攻擊不易潰散，並能略增神識探查之距。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_180",
    "name": "攝魂奪魄神通",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以神識化作無形巨手攝奪敵之魂魄，神魂稍弱者當場魂飛魄散，乃幽冥一脈成名殺伐之術。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_181",
    "name": "噬魂蝕神大法",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "驅使陰煞魂念啃噬敵之元神，受者識海生痛、神思昏亂，重者元嬰受創、修為倒退。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_182",
    "name": "幽冥引魂錄",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "幽冥古派秘錄，能勾引遊離陰魂為己所用，亦可遣神念遁入幽冥之地匿息潛行。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_183",
    "name": "定神凝識心法",
    "category": "soul",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "凡修入門養神之法，靜心凝識以穩固心神，可緩解心魔躁動，為日後神識壯大奠基。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_184",
    "name": "御神返照真經",
    "category": "soul",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "化神大能返觀內照、洞徹自身神魂之至高法門，修成可分神數十而本尊神識不損分毫。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_185",
    "name": "養魂蘊神祕法",
    "category": "soul",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以靈藥溫養神魂、日積月累壯大識海之溫和功法，修煉雖緩卻無反噬，根基極穩。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_186",
    "name": "萬魂噬靈幡訣",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "煉養萬千怨魂於幡中之邪修法門，催動時群魂嘯湧、噬人神識，神魂不堅者頃刻癲狂。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_187",
    "name": "縛魂鎖神祕術",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以神念織就無形魂鎖縛住敵之元神，受縛者神識凝滯、難施法術，利於擒生與盤問。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_188",
    "name": "分神化念訣",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "自元嬰中安全析出數道神念分身代行探查傳訊之術，分念愈多則本體神識愈耗，須循序而修。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_189",
    "name": "明心鎮魔心法",
    "category": "soul",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "佛宗澄澈心神、鎮壓心魔之法，臨敵時神識清明不為幻象所惑，渡劫關頭尤可定守元神。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_190",
    "name": "太虛蘊神真解",
    "category": "soul",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "參悟虛無、以神識感應天地玄機之上乘法門，修成神念可遠播百里，洞察氣機如指掌紋。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_191",
    "name": "凝魂聚識玄功",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "將潰散神魂重新凝聚成型之功法，元神受創者賴此回補修復，亦能小幅提升神識韌性。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_192",
    "name": "幽魂遁形祕法",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "令神識化作一縷幽魂遁地匿息之術，可避強敵神識搜尋，行刺探隱遁之事最為得宜。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_193",
    "name": "百魂煉嬰大法",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以百道魂念溫養淬鍊元嬰之凶險功法，修成元嬰堅凝難損，然煉養失當則有神魂反噬之危。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_194",
    "name": "返照虛靈訣",
    "category": "soul",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "返照己身、虛融神魂與天地之高深法門，修成可短暫分神化形於外，神識威能更勝同階。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_195",
    "name": "攝心惑神神通",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以神念潛入敵之識海種下心障，受者心神恍惚、生疑自亂，乃幻修一脈不戰屈敵之能。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_196",
    "name": "蝕魂陰雷祕錄",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "煉就專傷神魂之陰雷，雷光不毀肉身卻直貫識海，神魂受灼者神識刺痛、法術滯澀。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_197",
    "name": "凝神入定心訣",
    "category": "soul",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "煉氣修士打坐入定、收束神思之基礎心訣，可加快元氣運轉與神識復原，最宜閉關靜修。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_198",
    "name": "通神感應真經",
    "category": "soul",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "開拓神識、增廣感應之法，修成後神念覆蓋方圓數里，草木蟲蟻之動皆能察知。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_199",
    "name": "奪舍重生祕術",
    "category": "soul",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "修為盡毀或壽元將盡者以神識侵奪他人軀殼重生之絕命邪術，成則延壽再修，敗則魂飛湮滅。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_200",
    "name": "魂橋傳念訣",
    "category": "soul",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以神念架設無形魂橋，與相識者千里傳音、互通心念之術，乃同道結伴聯絡常修之法。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_soul_201",
    "name": "煉魂歸晶大法",
    "category": "soul",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "歷劫煉魂、終凝神魂為一枚晶瑩魂晶之苦修功法，魂晶成則神識精純倍增，可硬撼神魂攻擊。",
    "canonRefs": [
      "神識魂修"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_202",
    "name": "紫極天雷訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "引九天紫雷凝煉於識海，施展時紫光暴漲化作雷柱貫頂，可洞穿護體靈光，乃雷系頂尖殺伐神通。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_203",
    "name": "五行真雷大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "融金木水火土五行靈氣同煉雷霆，催動時五色雷弧交織成網，威力倍增且能克制諸般護身法寶。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_204",
    "name": "九天玄雷訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "采九重天罡雷氣淬煉法力，運轉時周身雷弧繚繞，發雷如疾矢，遠近皆可取敵性命，剛猛異常。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_205",
    "name": "神霄落雷心法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "引天劫餘雷入體溫養，臨敵時自天而降萬鈞落雷，轟擊範圍極廣，最宜亂軍叢敵之中施展。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_206",
    "name": "混元雷池真解",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "於丹田凝出一方虛幻雷池蓄養紫雷，戰時傾池而出雷海滔天，可長久鏖戰而雷力不竭，霸道無雙。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_207",
    "name": "紫蛟天雷神通",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "凝雷霆為紫色雷蛟纏身護體，攻則化龍噬敵，守則雷甲蔽身，攻守兼備乃雷法中罕見上乘。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_208",
    "name": "驚雷遁術",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "化身為一道雷光遁走天地之間，遁速奇快難以追拿，更可借雷光暴閃灼目敵眼，攻遁合一。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_209",
    "name": "霹靂雷劍訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以雷氣御劍，劍出處雷光暴卷如萬蛇齊舞，斬擊之際附帶麻痺之效，劍術雷法兩相印證。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_210",
    "name": "太乙神雷錄",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "上古傳承的純陽雷法，所煉神雷至剛至烈，專破陰煞鬼物與一切邪法，乃降妖伏魔之利器。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_211",
    "name": "玄天罡雷訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "煉罡氣與雷霆同源，運轉時罡雷護體百邪不侵，掌中可凝雷球擲出，剛硬難當威勢逼人。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_212",
    "name": "九霄震雷經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "引九霄之上的悶雷震盪天地，施展時雷聲滾滾震碎神識，敵者元神受創難以凝聚法力。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_213",
    "name": "焚天雷火大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "雷火雙修同煉一爐，雷中藏火火中含雷，臨陣時雷火齊發焚天煮海，威能極盛卻耗法力甚巨。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_214",
    "name": "電蛇纏身術",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "凝雷霆為無數細小電蛇游走周身，近敵時電蛇暴起鑽入敵體，麻痺經脈使其法力滯澀難行。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_215",
    "name": "誅仙紫雷訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "傳說源自上界的絕世雷法，所凝紫雷可斬殺金丹元婴於瞬息，威力之大連法寶亦難擋其鋒。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_216",
    "name": "天雷淬體經",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "引微弱雷氣反覆淬煉肉身經脈，初時痛徹骨髓，久煉則體生雷紋肌膚堅韌，肉身可禦尋常法器。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_217",
    "name": "罡雷護體神通",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "催動法力於體表結成一層紫色雷罡護罩，外力撞之即遭雷弧反激，乃雷系護身第一等法門。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_218",
    "name": "落雷誅魔錄",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "佛道兩家共參的伏魔雷法，所降天雷帶滅邪之意，鬼物魔修觸之即潰，正氣凜然煞氣難侵。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_219",
    "name": "幽冥陰雷訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "煉至陰之氣化作幽綠陰雷，不轟不響卻悄無聲息侵蝕神魂，中者元神腐朽，陰毒詭異防不勝防。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_220",
    "name": "蒼穹雷鵬變",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "化身雷光大鵬翱翔九霄，雙翅一展雷光遮天，俯衝之勢攜萬鈞雷霆，遁速與攻勢俱臻絕頂。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_221",
    "name": "驚蟄引雷術",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "雷法入門法門，可引天地散逸雷氣凝於指尖彈出，雖威力微薄卻是日後修煉重雷法的根基。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_222",
    "name": "玄雷分光劍訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "御雷成劍復分作數十道雷劍齊射，分光化影令敵難辨真偽，一劍未擋餘劍已至，凌厲非常。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_223",
    "name": "雷劫淬靈大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "膽敢借渡劫天雷反哺法力之逆天功法，每歷一劫法力暴漲，然稍有不慎便雷火加身形神俱滅。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_224",
    "name": "青冥神雷秘錄",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "采青冥高空罕見的青色神雷煉成，雷弧細若游絲卻鋒銳無匹，可無聲切割護罩斷敵法器。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_225",
    "name": "震天驚雷掌",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "聚雷霆於掌心拍出，掌風所及雷聲炸響震人耳目，近身搏殺之際一掌可崩碎敵之護身靈光。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_thunder_226",
    "name": "雷海滔天訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "傾畢生雷力催動，於方圓百丈內化出滔天雷海，雷浪翻湧無孔不入，乃以一敵眾的絕殺大陣法。",
    "canonRefs": [
      "雷法"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_227",
    "name": "玄陰噬魂魔功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "凝體內精元成至陰煞氣，可放黑紅光片含陰魔斬擊，傷口黑氣繚繞難以驅散，更能竄改敵人神識記憶。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_228",
    "name": "赤焰焚天魔典",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "煉赤焰魔火為攻，火勢凶烈沾物即燃，可化火鳥火牆焚殺成片，大成放出漫天魔火結成火海封死生路。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_229",
    "name": "血煉護神魔光",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "凝血色光芒護體吸納所擊法器靈性，越戰越強，配合身外化身吸納修為，可釋紫色魔火與血色光柱。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_230",
    "name": "幽冥攝魂大法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "煉養血鬼厲魂為戰，化身血雲遁術瞬移追殺，以陰火血祭奪取敵魂煉作鬼僕，魂魄沾陰煞傷口難癒。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_231",
    "name": "九幽煉魂秘錄",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "於陰冥之地汲取精純陰氣煉養生魂厲鬼，可結千魂之陣攝奪敵之元神，墮入此道者神魂漸冷終淪鬼物。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_232",
    "name": "托天魔元真經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "修煉霸道魔元淬煉軀體經脈，魔氣磅礡可托天負地，化魔雲魔手鎮壓絞殺，大成召出猙獰魔道法相。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_233",
    "name": "玄魔奪魄心法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以魔念侵蝕敵之神識海，催出黑氣魔影攝其魂魄，受制者神思恍惚任人擺布，元嬰修士亦須謹防。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_234",
    "name": "屍煞煉屍魔錄",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以陰煞秘法煉養屍兵屍將，屍兵不畏生死力大無窮，高階屍王可噴黑色天都妖火，焚法寶生靈。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_235",
    "name": "毒蝮化血魔功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "煉養百毒蝮屍於體內，可催無孔不入腹屍毒雲，沾肌即潰見血封喉，傷口劇毒難以驅散，自身百毒不侵。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_236",
    "name": "墨蛟陰煞魔訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以濃郁陰煞水毒淬體催法，可吐青黑毒霧化墨色蛟形纏絞，水中戰力倍增，沾之筋骨酸軟法力遲滯。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_237",
    "name": "六極真魔神通",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "亂星海魔道相傳上乘魔功，凝六道魔氣護身反震，可化魔焰絞殺，唯辟邪神雷一類至陽之物方能克制。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_238",
    "name": "陰羅鬼羅魔典",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以數十萬生魂及修士精魂祭煉鬼羅幡魔頭，催發骷髏魔頭撲咬奪魂，幡中魔頭可血祭再養，陰狠難纏。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_239",
    "name": "焚魂煉獄大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "催出幽藍鬼火直焚敵之元神，魂魄一旦沾染則痛徹神魂、法力潰散，連護身神光亦被緩緩蝕穿。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_240",
    "name": "玄月吸陰魔功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "采人元陽精氣補益己身，於月華濃郁之夜修煉最速，可借雙修對象資質速成，然心性易墮入色魔。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_241",
    "name": "碧血噬靈邪訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以精血催出碧色血光吞噬敵之法器靈性與法力，血光所沾法寶靈性盡失，修者越戰法力越是雄渾。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_242",
    "name": "極陰天煞魔經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "修煉至陰至煞之氣淬養魔軀，可催天煞魔焰焚邪滅生，於極陰之地戰力倍增，正道純陽功法亦難近身。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_243",
    "name": "鬼靈化血祕術",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "化身血雲高速遁行追殺，可遮蔽身形消耗符籙攻擊，纏鬥逃遁兩宜，被纏者血氣為其所奪日漸枯槁。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_244",
    "name": "噬金魔蟲煞訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "馭使噬金靈蟲以金鐵為食蛀蝕法器，成片放出可吞噬法寶絞殺敵身，配神識分念廣域搜形圍殺。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_245",
    "name": "陰煞凝甲魔功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "引四方煞氣凝成戰甲護體，煞甲堅韌可禦強擊更能反震近身之敵，偏重防禦的煉體護道魔法。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_246",
    "name": "千幻惑神魔典",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "完美隱藏修為氣息化身他人容貌，分出真假難辨幻身惑敵神識，真身趁隙暗殺遁走，幾不可破。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_247",
    "name": "黑煞焚天魔功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "煉黑色魔煞為攻，魔焰所過寸草不生，可結眩光魔焰大陣困殺強敵，大成催魔相橫掃焚滅成片生靈。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_248",
    "name": "奪魄陰冥心法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以陰冥之氣淬煉成半人半鬼之身，可御陰煞化鬼遁攝魂魄，鬼道神通大增然喪輪迴之資。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_249",
    "name": "血神墮魔大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "斬斷七情激發血脈魔性，凝血色魔嬰反噬主神，戰力暴增卻心性盡墮，修至深處終難守本心。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_250",
    "name": "玄陰魔嬰祕術",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以陰煞之氣煉成第二魔嬰，可出竅誘敵分修功法，與主神相連施展魔道秘術，然魔嬰過多易致心神不穩。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_251",
    "name": "煞妖凝丹魔訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "於體內凝練五顆煞丹輔以煞丹術，可令築基後期修士三分之一幾率結成煞丹威力強大，然煞氣持續侵蝕神智。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_252",
    "name": "焚魂攝魄魔經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "催幽冥鬼火與攝魂魔光雙修並進，一焚其魂一奪其魄，敵之元神受灼則散，魂魄被攝則僵立任戮。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_demonic_253",
    "name": "毒蝮噬骨煞功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "養百毒蝮蛇於骨髓淬煉魔軀，可催骨刺毒霧穿甲蝕骨，沾之骨節酥麻劇毒蝕髓，元嬰修士亦須謹避。",
    "canonRefs": [
      "魔功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_buddhist_254",
    "name": "金剛不壞神功",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "佛門金剛護法根基功法，運轉之下皮糙肉厚泛起金光，刀劍難傷，可硬撼同階法寶不退。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_255",
    "name": "明王護法金身",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "將煞氣煉化為己用而非驅散的罕見強體祕術，修成後肉身泛赤金鱗紋，力可裂石碎金。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_256",
    "name": "羅漢伏魔訣",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "沙門護寺傳承的鍛體心法，凝氣成羅漢虛影護身，專破邪魔陰煞，外道法術近身即潰。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_257",
    "name": "須彌不動神功",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "取須彌山之意修成的鎮魂護體大法，運功時身軀如山岳不動，萬法加身亦不能撼其分毫。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_258",
    "name": "金身舍利大法",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以舍利溫養肉身的佛門至高煉體法，成則周身生金色佛光，一拳之威可崩碎里許山岩。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_259",
    "name": "菩提般若心法",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "梵唱護神的佛門心訣，誦念間清靈護住神魂，外魔幻術與心魔攻心皆不能侵，定如磐石。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_260",
    "name": "降魔金剛印",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "伏魔護法所傳掌印神通，凝金剛真力於雙掌，一印拍出金光暴漲，專破鬼物陰邪之體。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_261",
    "name": "琉璃護體真經",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "佛宗祕傳護身真經，運起後肉身如琉璃透亮堅凝，尋常法器難傷，更可反震攻來之力。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_262",
    "name": "龍象伏魔功",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "借龍象之力鍛骨的佛門強橫煉體功，修成後力大無窮，徒手可撕裂元嬰期妖獸之軀。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_263",
    "name": "獅吼降魔訣",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以梵音化作獅子吼的攻心神通，一聲怒喝震蕩神魂，可令低階邪修魂飛魄散心神俱裂。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_264",
    "name": "大日金身訣",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "觀想大日溫養金身的佛門煉體祕法，成時周身燃赤金佛焰，煞氣陰邪近身即被焚化殆盡。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_265",
    "name": "無相寂滅神通",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "佛門護法至深神通，運轉間化去一切外力於無形，攻者之勁反噬其身，守如虛空難破。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_266",
    "name": "梵天護法功",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "梵天傳承的護身大法，凝佛光成罩護住周身，可抵元嬰期全力一擊而金身不損分毫。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_267",
    "name": "渡厄金剛經",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "渡化厄劫的佛門護身真經，修成後遇劫煞之力反能煉化入體，愈受重創而肉身愈發堅韌。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_268",
    "name": "蓮華金身大法",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "觀蓮華淨土所成的護體法體功，金身泛蓮色寶光，污穢煞毒不能侵，斷骨折肢頃刻自癒。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_269",
    "name": "不動明王訣",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "佛門明王傳承的鎮壓神功，立身如明王不動，運功時周身火焰金光暴漲，鎮伏萬魔不退。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_270",
    "name": "般若伏煞功",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以般若梵力煉化煞氣的入門佛功，可將周身陰煞煉為己用，越戰肉身越強悍而不知疲憊。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_271",
    "name": "舍利護神訣",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "凝神魂於舍利的佛門護魂心法，神識被佛光裹護，可抗攝魂奪魄之術，元神穩如金石。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_272",
    "name": "金光伏魔大法",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "佛宗鎮山的降魔大法，運起後周身射出萬道金光，邪魔鬼物觸之即焚，威能驚動一方。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_273",
    "name": "摩訶金剛真經",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "佛門上乘煉體真經，誦經運功則皮肉重生如金鐵，肉身之堅可與同階靈寶硬撼而不損。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_274",
    "name": "獅子吼神通",
    "category": "body",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "佛門攻伐神通，運梵音於喉化作雷音怒吼，聲浪所及可震碎法器、亂敵心神攝其膽魄。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_275",
    "name": "伏魔護法神功",
    "category": "body",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "佛門弟子入門護身功法，運轉間生淡淡金光護體，可禦尋常符法刀劍，亦助穩固道心。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_276",
    "name": "真如不壞身",
    "category": "body",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "佛門煉體之極的法體神功，修成真如不壞之軀，斷臂可生、碎首能復，幾近不死不滅之境。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_277",
    "name": "寂滅金身訣",
    "category": "body",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以寂滅之意凝練金身的佛門祕功，運功則周身佛光內斂，受創愈重反彈之力愈猛，攻守兼備。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_buddhist_278",
    "name": "梵音渡厄訣",
    "category": "body",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "佛門護神心法，默誦梵音清神定魄，可解心魔之擾、化幻術之迷，閉關衝關時尤為穩妥。",
    "canonRefs": [
      "佛門金剛"
    ],
    "statBonus": {
      "physique": 3
    }
  },
  {
    "id": "te_beast_279",
    "name": "驚蟄十二變",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "依十二般真靈之血依次幻化山岳巨猿、鯤鵬、五色孔雀等異種形態，每變兼得該真靈天賦神通，心魔亦無從複製。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_280",
    "name": "天鵬蛻形訣",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以真天鵬靈血煉化己身，化作銀翅巨鵬，配風雷之翅四翼齊張，飛遁之速冠絕同階，瞬息千里。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_281",
    "name": "山岳巨猿化身法",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "引山岳巨猿真靈之血入體，化三頭六臂金毛巨猿，臂力撼山裂地，一拳可碎元嬰修士護體寶光。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_282",
    "name": "百獸馴心訣",
    "category": "beast",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "獸道入門總綱，以靈識安撫低階妖獸戾性，與之締結契約，初成可驅使三五頭一二級妖獸聽令護身。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_283",
    "name": "御獸傳音術",
    "category": "beast",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "以特定獸語頻率溝通群獸，遠隔數里傳令調度蟲禽走獸，圍獵設伏皆能如臂使指，不耗本身法力。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_284",
    "name": "噬靈吞魂大法",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "祭煉異獸吞噬敵手精魂以壯己軀，仿銀月狼族天賦，元神出竅咬碎對方神念再奪其軀殼暫居。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_285",
    "name": "血影遁形訣",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "妖族秘遁，燃自身精血瞬移百里，連施數次可掙脫元嬰後期神識鎖定，唯損精血法力極巨。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_286",
    "name": "六翼霜蜈經",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "養煉含冰屬真龍血脈之霜蜈靈蟲，成蟲噴覆百里寒氣冰封萬物，結丹修士亦畏其森寒。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_287",
    "name": "金鱗御蛟訣",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "祭養水屬毒蛟為本命妖獸，以蛟血淬鱗護體，喚蛟攪動江河掀百丈毒浪，近戰遠攻俱備。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_288",
    "name": "養蟲噬金錄",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "豢養上古群聚凶蟲，以靈氣五金喂飼蛻變，成群可吞法寶噬鬼魄，威力隨蟲數倍增無物不噬。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_289",
    "name": "啜魂攝魄法",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "仿魔道祭煉之異獸，以攝魂黃霞吞噬鬼物精魄，獸成可幻化銀色巨猿，專克陰冥之屬。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_290",
    "name": "附靈合體秘術",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "失傳魔道秘法，與靈獸簽生死之約合二為一，修為驟疊數倍近元嬰中期，然壽元驚耗難入輪迴。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_291",
    "name": "豹麟閱氣神通",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "得麒麟真靈血脈之豹麟獸傳承，神識化作閱氣之能，百萬里內可循氣追蹤目標，遁形難逃。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_292",
    "name": "破滅妖瞳術",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "煉化兇獸天生神目於眉心化第三妖瞳，射黑線洞穿空間，看破幻遁鎖定瞬移，更可阻斷敵之空間遁術。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_293",
    "name": "疾風九變身法",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "妖禽身法秘技，身形九度變幻迅捷莫測，配風雷之翅達於極速，然耗損肉身極重不可久持。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_294",
    "name": "蛻骨換鱗經",
    "category": "beast",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "獸道煉體根基，仿妖獸蛻皮換骨之機，每蛻一次筋骨愈堅、鱗甲愈韌，三蛻可生淡金獸鱗護身。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_295",
    "name": "群獸朝宗大法",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "獸道大成神通，以王者之氣號令方圓百里走獸蟲禽萬獸來朝，列陣衝殺如潮水覆敵，聲勢駭人。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_296",
    "name": "銀月吞魂訣",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "得銀月狼族真傳，化銀狼形元神出竅，一口吞滅敵之魂念，再借其屍身暫寄續修，條件苛而威力絕。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_297",
    "name": "毒蛟噴瀾術",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "驅本命毒蛟噴吐至毒黑瀾，所過之處草木皆枯，毒霧沾體則靈力滯澀、肌膚潰爛，配冰寒更難解。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_298",
    "name": "金雷竹辟邪馭蜂訣",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "養萬年金雷竹所化之蜂雲群劍兼蟲，淡金神雷天克鬼妖魔道，群蜂分光化絲可斷法寶亦能辟邪。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_299",
    "name": "玄甲護身獸經",
    "category": "beast",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "仿穿山土甲龍強橫鱗甲淬煉肉身，成則周身覆玄色硬鱗，尋常法器難傷，兼擅入地尋寶探脈。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_300",
    "name": "鯤鵬化羽真解",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "引鯤鵬真靈之血煉就化羽神通，可展七八十丈巨翼遍體電弧，扶搖直上九霄，一擊掃落千軍。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_301",
    "name": "九尾幻形心法",
    "category": "beast",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "得九尾妖狐血脈傳承，九尾幻化迷敵心神，化人形以惑、化獸形以搏，幻術與妖力相濟難測。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_302",
    "name": "血脈返祖訣",
    "category": "beast",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "激發體內沉眠真靈血脈返祖溯源，短暫覺醒上古凶獸之軀，妖力暴漲數倍，然返祖之後須久養精元。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_303",
    "name": "馴魔控獸秘錄",
    "category": "beast",
    "realmReq": "結丹期",
    "maxLevel": 9,
    "desc": "以控魔秘術於妖獸魔物識海種下禁制，以精血飼養收服為己用，凶悍如五子同心魔者亦可降伏。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_beast_304",
    "name": "靈犀通獸訣",
    "category": "beast",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "獸道感應入門法，以神識結靈犀之契與本命靈獸心意相通，獸之所見所感皆映於主人腦海，配合無間。",
    "canonRefs": [
      "妖獸獸道"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_illusion_305",
    "name": "銀月迷魂幻術",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "銀月狼族傳承之頂階魅惑幻術，以幽幽月華織成幻境，令中招者神智迷亂、真假莫辨，常配合夢引術自俘虜腦中竊取記憶情報。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_306",
    "name": "夢引秘術",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "玄陰經所載改動他人神識之秘功，能潛入夢境封印並竄改記憶，須修為遠勝對方方可安然施展，亦能不損神智悄然抽取所需情報。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_307",
    "name": "七情幻心訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "攻心無上秘術，以七色晶芒侵入目標元嬰，操弄其喜怒哀樂愛惡欲，令中者求生不能求死不得，神魂崩亂而歸順施法之人。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_308",
    "name": "黃粱墮夢經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "使中者瞬息墮入漫長虛夢，於夢中歷數十載悲歡，醒轉時神魂已疲，心志大損，元神出現難以彌合之裂痕。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_309",
    "name": "千幻迷神大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "同時化出千百道虛影幻象環繞敵身，真身藏於幻中無從辨識，令對手神識昏亂、攻其虛影而疲於奔命。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_310",
    "name": "攝魂幻目訣",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "施於雙目之初階幻術，以目光直視可震懾凡人心神、令其心慌意亂如墮夢魘，乃江湖所傳攝魂之術的修仙正法。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_311",
    "name": "九幽蝕神咒",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "驅九幽陰冥之氣化作無形幻刃，悄然侵蝕對手元神識海，令其神識日漸消磨而不自知，最終癡傻昏聵。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_312",
    "name": "玄陰惑心幻訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "玄陰一脈魔道幻術，以至陰之氣勾動心魔，令中者疑神疑鬼、自相殘殺，於混戰中誤傷同伴而不自覺。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_313",
    "name": "幻海沉淪秘錄",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "鋪展一片無垠幻海將敵困於其中，海中萬象皆虛，越掙扎陷得越深，神識稍弱者將永沉幻海、魂消其間。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_314",
    "name": "鏡花迷影神通",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "化身形為鏡中虛花、水中倒影，敵之攻擊盡數落空，又能以無數幻影擾亂神識，攻其不備一擊斃敵。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_315",
    "name": "墮夢迷蹤步",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "身法與幻術相融之秘技，行步間留下重重虛影殘像，使追者墮入迷蹤幻陣、辨不清去向，宜於奇襲與遁逃。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_316",
    "name": "誘魂蠱心訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以幽香幻音誘引心神，令中者沉溺於虛妄歡愉之境而不願醒轉，神魂漸被蠱蝕，終為施術者所驅使。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_317",
    "name": "心魔劫影幻經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "勾引目標心底最深之執念恐懼，化為心魔劫影現於眼前，令其於幻境中道心崩潰，重者當場走火入魔。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_318",
    "name": "醉夢昏神咒",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "低階迷神幻術，吐出淡淡迷霧令中者如醉如癡、神思昏沉，動作遲緩數息，常為散修近身突襲之用。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_319",
    "name": "幽冥魘魂秘術",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "驅冥土陰魂入敵夢魘，反覆魘壓其魂魄，使中者夜不能寐、神魂日衰，纏鬥既久則元神不堪重負而潰散。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_320",
    "name": "霧隱迷神幻訣",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "凝靈氣為迷濛幻霧，遮蔽敵之耳目神識，於霧中佈下虛影歧路，令對手徬徨難辨方向、進退失據。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_321",
    "name": "亂神千影圖",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "展開一幅暗藏幻陣之古圖，催動時幻出千重身影層層疊疊，神識探之皆有實感，使元嬰修士亦難尋得真身所在。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_322",
    "name": "陷神鎖魂大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以幻術為餌引敵神識深入，繼而鎖魂困其元神於虛境之中，封其神通法力，待其神疲力竭再行擒殺。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_323",
    "name": "癡夢魅影神通",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "化出魅惑虛影擾亂心智，令中者誤敵為親、視幻為真，沉於癡夢甘受擺布，醒後方知已誤大事。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_324",
    "name": "妄心墮影訣",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "撩動目標妄念貪心，使其於幻象中見奇珍異寶而忘形追逐，墮入預設幻陣，正適困敵與設伏之用。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_325",
    "name": "陰魂誘夢秘術",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "驅使陰魂悄入敵之夢境，誘其神魂出竅遊蕩夢中，趁其魂不守舍之機奪取記憶，或暗種心魔伏患。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_326",
    "name": "蝕心幻魘咒",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以幻魘反覆侵蝕中者心神，每經一夜道心便鬆動一分，纏綿數月足令堅毅之士心志崩壞、自願奉上所求。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_327",
    "name": "迷影誘神幻陣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以數十幻燈佈成大陣，陣中幻影誘人神識步步深入，越走越迷終陷死地，乃伏殺高階修士之奇陣。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_328",
    "name": "幻心化形秘錄",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "幻術登峰之神通，可將虛幻幻象凝出近乎實質之形，幻獸幻刃皆能傷敵，虛實交織令對手防不勝防。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_329",
    "name": "墮魂迷神印",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "凝幻力於一印，拍出時化作迷濛光暈罩定敵首，令其神魂渙散、頃刻癡立當場，宜趁隙制敵或脫身。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_illusion_330",
    "name": "九重幻夢經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "層層相套之九重夢境秘術，破一重又入一重，神識稍弱者終生困於夢中不得醒轉，乃困殺強敵之絕學。",
    "canonRefs": [
      "幻術"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_331",
    "name": "天魔解體妙音",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "魔道頂階音煞秘法，催動體內魔元化作無形音波震蕩四方，可令低階修士魂飛魄散、神識崩裂，元嬰修士亦須護住心神方能抵禦。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_332",
    "name": "梵音清心唱",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "佛門古剎所傳莊嚴梵唱，誦聲所及可滌除心魔、安定神識，臨敵時化作金色音浪壓制魔氣，最克陰邪鬼物與魔道功法。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_333",
    "name": "驚神攝魂鈴",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以血玉小鈴為引，搖之則鈴音穿腦直擊元神，配合冷喝令敵短暫失神呆滯，乃近身奇襲與奪魂制敵的陰狠秘術。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_334",
    "name": "九霄龍吟訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "借真龍長吟之勢凝聲成波，吟嘯之間如萬鈞雷霆崩塌，音浪可震碎護罩法器、撼動同階修士心脈，遠近皆難規避。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_335",
    "name": "玄音蕩魂曲",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "奏無形玄音如泣如訴，鑽入神識深處勾動心魔舊念，使敵沉淪幻聽、自亂陣腳，乃幻音一道攻心奪志的上乘殺招。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_336",
    "name": "震天裂石嘯",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "運法力於丹田，驟然發一聲長嘯化作可見音環四散，可震退近身之敵、崩裂山石護甲，是聲波煉氣士臨陣常用的破陣手段。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_337",
    "name": "碧落清商引",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以青玉古琴撥動清商之音，琴弦化七道音絲縛敵周身、亂其法力運轉，輔以妙音惑神，攻守相濟、纏鬥不休。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_338",
    "name": "幽冥鎮魂磬",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "敲擊上古黑磬發幽冥之響，磬聲沉鬱可鎮壓遊魂厲鬼、封禁鬼物遁形，亦能震散敵方煉就的魂魄屍兵，鬼道修士聞之膽寒。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_339",
    "name": "太乙回風韻",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "引天地清風和聲成韻，音隨風轉、繞身不散，可遠程傳音示警、亦能聚音為刃割裂敵身，攻防傳訊一體三用。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_340",
    "name": "雷音破空訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "聚天雷之威於喉舌，一喝化作金色雷音轟然炸響，音雷交織貫穿護罩，傷敵肉身之餘更亂其神識，威能凌厲難當。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_341",
    "name": "鳳鳴九天曲",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "激發真鳳血脈長鳴成曲，五色音浪滾滾如潮焚邪滅穢，可剋制諸般妖邪鬼物，鳴聲所至連高階妖獸亦俯首不敢妄動。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_342",
    "name": "玉磬靜心法",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "輕扣靈玉小磬，清越磬音助修士凝神入定、滌除雜念，亦可在心魔滋擾與幻術惑神之時穩固神台，乃入門養神之基。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_343",
    "name": "鯨波蕩海音",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "摹大鯨翻海之吼凝聲成濤，音浪層層疊蕩如怒潮拍岸，水中施展威能倍增，可絞碎靈舟法器、震翻群敵，江海妖修最忌。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_344",
    "name": "攝魂奪魄唱",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "低吟一段詭異魔唱滲入耳竅勾人魂魄，神識弱者頃刻間意亂神迷、任憑驅策，乃魔道御敵奪心的禁傳邪音之術。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_345",
    "name": "繞梁三日吟",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "運氣成吟令音波附物三日不絕，可暗布音陣困敵、亦能借餘音追蹤遁走之敵，是擅長纏鬥與追緝的精妙音律功法。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_346",
    "name": "金鐘罩體功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以本命銅鐘嗡鳴震出護身音罩，鐘聲所凝音波層層裹身可彈開飛劍法器，更能以鐘鳴回震反傷近身之敵，攻守兼備。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_347",
    "name": "清商斷弦訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "撥古琴催出無形音絲如利刃橫飛，一弦既動可割裂法寶、斷敵經脈，斷弦剎那音爆四溢，乃以樂入殺的頂階琴修絕學。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_348",
    "name": "震魂龍吟嘯",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以化龍之軀引動龍族威壓長嘯，吟嘯化作可見音波龍形撲擊，所過之處護罩崩、心脈震，同階修士亦難正面硬撼。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_349",
    "name": "潮音裂罡曲",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "奏曲聚音如連綿潮汐反覆衝擊敵方護罡，一波未平一波又起，層層音浪終令護罩力竭崩解，最擅磨耗死守之敵。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_350",
    "name": "幽簫奪命引",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以幽冥竹簫吹出嗚咽簫音直透心竅，簫聲愈急則敵心脈愈亂，待其氣血翻湧之際音波驟爆奪命，陰柔狠辣難防。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_351",
    "name": "三才共鳴陣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "三名同修以鐘鈴磬三音相和共鳴成陣，音波交織倍增其威可圍困絞殺強敵，亦能合力震破大型禁制護山大陣。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_352",
    "name": "破魔震天鐘",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "撞響鎮宗古鐘發一道蕩魔鐘音，金光音浪滾滾盪開可淨化魔氣、震散邪法附體，對魔道鬼物有天克之效，正道至寶。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_353",
    "name": "靈犀傳音術",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "凝法力於神識化作一線微音，可越眾遠傳密語於相識之人耳畔而不為旁人所聞，乃修士暗中聯絡、臨陣傳訊的常備小術。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_354",
    "name": "裂石音波掌",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "擊掌之際逼出渾厚音波附於掌風，掌未及而音先至，可隔空震碎頑石護甲、亂敵步法，是音律與拳腳相融的近戰功法。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_355",
    "name": "太古玄音經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "上古遺傳的音律總綱，習之可辨萬籟、化聲為兵亦能以音養神固魂，層層精進終可聚天地清音為己用，乃音道根本大典。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_sound_356",
    "name": "魔音灌耳功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "催動魔元化淒厲魔音源源灌入敵之耳竅腦海，初則耳鳴目眩、繼則神魂震顫，久聞者經脈逆亂、自相殘殺，邪門至極。",
    "canonRefs": [
      "音波音律"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_357",
    "name": "腹屍毒雲訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "蝮屍毒功最強毒法分支，催出彌天蝮屍毒雲籠罩戰場，毒氣無孔不入、沾之即潰，曾於墜魔谷與古魔本體相抗。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_358",
    "name": "萬毒煉魂經",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "毒道魔修以萬種毒物精粹合煉一爐的根本毒經，可將諸毒煉化入體、以毒養魂，臨陣吐納百毒齊發，傷者法力遲滯、經脈潰爛。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_359",
    "name": "五毒養蠱訣",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "蠻荒毒修養蠱入門法門，以蜈蛇蟾蜘蠍五毒互噬煉成蠱母，馭蠱噬敵、以血飼蠱，蠱成可隨神識撲咬奪命。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_360",
    "name": "千毒化骨大法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "陰狠毒功，催出墨綠毒霧附於法器，沾體者血肉化膿、筋骨酥融，傷口劇毒難以驅散，連結丹護體罡氣亦被緩緩蝕穿。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_361",
    "name": "青冥毒煞功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "脫胎於毒蛟陰煞血脈的水毒魔功，可吐青黑陰煞毒霧瀰漫江海，沾之筋骨酸軟、法力遲滯，配合纏絞絞殺水中敵手。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_362",
    "name": "蝕骨穿心訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "暗殺毒修慣用近身毒術，以指尖凝聚墨色毒勁點穴注毒，毒走經脈直攻心脈，中者頃刻間心痛如絞、護體法力潰散。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_363",
    "name": "幽冥腐屍經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "結合屍道與毒道的陰森魔功，煉養腐屍化作毒僕，屍身遍佈劇毒、抓咬皆能注毒，毒僕潰滅時更炸出滿天屍毒瘴氣。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_364",
    "name": "碧蠱噬血神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "御靈一脈傳下的毒蠱秘傳神通，催發本命碧血毒蠱鑽入敵體，吸食精血法力反哺修者，蠱不除則毒不止，元嬰修士亦難自解。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_365",
    "name": "百毒不侵訣",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "毒修護身根本法，以諸般微毒日日淬煉血肉經脈，漸成百毒不侵之軀，外毒難傷、自身吐納劇毒而不反噬，是毒道立身之基。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_366",
    "name": "瘴煙蝕魂大法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "南疆瘴毒一脈魔功，引動天地瘴煞凝成綠濛毒煙，毒煙無聲瀰漫、入鼻蝕魂，令人神思昏聵、幻覺叢生，便於奪魂控敵。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_367",
    "name": "玄毒封喉秘錄",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "毒道殺手鐧秘錄，凝玄色毒珠彈射傷敵，見血封喉、毒入即沉，尋常療傷靈藥難解，須以同源解藥或斬斷染毒經脈方止。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_368",
    "name": "墨蛟吐毒功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "源自八級毒蛟血脈傳承的妖修毒功，可化墨色蛟形吞吐青黑毒涎，毒涎沾物即腐、入水成瘴，於江海湖澤之間幾無敵手。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_369",
    "name": "斷魂化骨訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "陰毒至狠的合擊毒術，毒煙先蝕神魂使人失神，繼以化骨之毒銷融軀體，魂骨俱滅、屍骨無存，是魔道毒修聞之色變的絕學。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_370",
    "name": "陰煞毒漩神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "凝聚陰煞與劇毒為一體的高階毒道神通，於敵身周凝成墨綠毒漩絞捲，毒漩越轉越烈、蝕器蝕體，連靈器護罩亦被緩緩腐穿。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_371",
    "name": "鴆羽噬血經",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "豢養鴆毒靈禽的毒修功法，馭使羽含劇毒的鴆鳥撲擊奪命，羽落見血即封，鴆鳥反哺修者真血，越戰越毒、纏鬥難脫。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_372",
    "name": "翠蟾煉毒祕術",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以萬年翠毒蟾精血煉養的毒道祕術，催出翠綠毒泡爆散傷敵，毒霧附體即潰肌爛肉，毒蟾更可吞噬法力毒霧反哺其身。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_373",
    "name": "化骨綿掌毒功",
    "category": "generic",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "陰柔近身毒功，掌風看似綿軟無力，實則暗藏化骨之毒透體侵髓，中者初時無覺、片刻後筋骨酥融，跌坐難起、任人宰割。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_374",
    "name": "穿心蝕脈訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "走偏鋒的點穴注毒毒術，毒勁循經脈穿行直撲心脈、潰斷靈脈，中毒者法力運轉滯澀、靈力外泄，三息之內護體罡氣盡崩。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_375",
    "name": "幽毒養屍大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "毒道與屍道合修的魔功，以陰毒煉養毒屍為戰，毒屍不畏生死、皮糙含毒，抓咬皆注劇毒，潰滅時炸出滿天綠濛屍毒瘴雲。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_376",
    "name": "萬毒朝宗神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "毒道集大成神通，修者一念可號令所馭百毒蠱蟲齊發，蟲毒霧瘴蔽天蓋地席捲戰場，吞噬法力、撕咬血肉，淹沒結丹修士如潮。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_377",
    "name": "噬血蠱母經",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以血飼蠱、養蠱成母的毒蠱根本經，蠱母產子萬千潛伏敵體，吸血食元、繁衍不絕，宿主法力日漸枯竭而不自知，陰毒至極。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_378",
    "name": "玄陰蝕靈毒法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "專剋靈氣靈脈的陰毒功法，毒氣不傷血肉而專蝕靈元，中者法力如漏水般外泄、神識昏沉，淪為任人擒拿的廢修，極難救治。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_379",
    "name": "瘟煞封魔毒經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "頂階毒道魔經，引動瘟煞毒癘化作灰綠毒瘟瀰漫一地，凡入毒域者法力封滯、神魂受蝕，連元嬰法相亦難在毒瘟中久持。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_380",
    "name": "斷脈散毒祕術",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "陰險毒道祕術，以無色無味的散毒混入丹藥靈飲，毒發時悄然蝕斷修士靈脈、廢其修為，最宜暗算下毒、潛伏奪寶。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_poison_381",
    "name": "侵髓腐元真經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "毒入骨髓、腐蝕元嬰的至毒真經，毒勁繞過護體罡氣直侵骨髓本源，緩緩腐蝕元嬰根基，中者修為日退、壽元暗損，幾無解法。",
    "canonRefs": [
      "毒功"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_382",
    "name": "玄冰訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "落雲宗天泉峰水冰二屬基礎功法，品階雖在二流以下卻修煉易成，築基後可凝玄冰之氣護體傷敵，韓立曾以之為偽裝身分所修。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_383",
    "name": "真陽煉火訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "火屬上乘功法，引天地真陽之炁淬煉法力，所凝赤焰焚金爍石，結丹後可催發三昧真火，為火修問鼎金丹之利器。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_384",
    "name": "北冥玄水經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "水屬秘傳真經，取北冥至寒玄水為引，法力如淵似海綿綿不絕，施展時化萬頃寒潮，可凍敵元嬰、困其神識。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_385",
    "name": "三昧離火大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "離火一脈鎮宗大法，以丹田離火淬煉本命真焰，化神之後可吐三昧真火焚化法寶，火勢沾身不滅，乃焚天爍地之神通。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_386",
    "name": "玄陰寒霜訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "陰寒屬基礎功法，運轉時周身泛起白霜寒氣，可凍滯敵手經脈、遲緩其法術，最宜伏擊偷襲之用。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_387",
    "name": "赤陽焚天功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "剛猛火屬功法，引日精赤陽煉就一身炎炁，所發火彈烈焰連珠不竭，結丹後可焚千丈林木，威勢駭人。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_388",
    "name": "沉淵碧水心法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "水屬陰柔心法，意守深淵碧水以養法力，恢復綿長且善御寒潮巨浪，攻守兼備，最忌與烈火之術硬撼。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_389",
    "name": "九天凝霜真經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "冰屬至寒真經，採九天罡風之霜凝就玄冰法力，可結方圓百里寒冰絕域，凍封敵蹤、滯其遁光。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_390",
    "name": "煉陽真火神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "火修化神絕學，以本命元神煉化真陽之火，催發時火龍盤空、焚化萬物，連高階法寶亦難久持其熾。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_391",
    "name": "寒潭玄冰劍訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "水冰雙修劍訣，禦劍時劍身凝寒潭玄冰，劍光所至凍裂法障、傷及敵丹，乃冰系劍修的成名利器。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_392",
    "name": "太陽炎陽訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "火屬陽炎入門功法，吸納日中炎陽之氣煉就溫熱法力，可禦寒辟邪、催發小型火術，最宜寒苦之地修士。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_393",
    "name": "玄冥寒水秘術",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "陰寒水屬秘術，引玄冥之水化作蝕骨寒流，沾身者法力凝滯、神識昏沉，乃陰柔克剛的詭異功法。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_394",
    "name": "流光赤焰大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "火屬剛烈大法，催動赤焰如流光迸射，數十團真火連環轟擊，元嬰修士施之可瞬焚一片山林，聲勢浩大。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_395",
    "name": "純陽煉氣訣",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "煉氣期火屬築基功法，引純陽之氣溫養丹田，修成後可發數枚火彈不竭，是火靈根散修最常修習的根基之法。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_396",
    "name": "凝霜寒冰功",
    "category": "generic",
    "realmReq": "煉气期",
    "maxLevel": 9,
    "desc": "冰屬入門功法，運氣時掌間凝結薄霜寒冰，可暫凍水流、寒滯小獸，雖威力有限卻為冰修打底的正途。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_397",
    "name": "碧水回元真訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "水屬養生真訣，法力如碧泉回流綿綿不絕，療傷續法之效尤佳，築基修士多兼修之以補法力之耗。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_398",
    "name": "煌焱焚魔經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "火屬煌焱真經，所煉真焰至剛至烈，專克陰邪魔物與屍煞，化神之後一焱可焚千鬼，乃正道煉魔之神功。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_399",
    "name": "北溟玄水神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "水屬化神神通，引北溟玄水化作汪洋寒淵，可淹沒一方天地、困鎖元嬰化神之敵，水勢一現難有遁路。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_400",
    "name": "幽寒冰魄訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "陰寒冰屬功法，煉就一縷冰魄寒氣藏於丹中，臨敵時噴吐寒霜凍敵金丹，陰冷詭譎，最克火屬同階修士。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_401",
    "name": "灼陽真火心法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "火屬熾烈心法，意引灼陽煉化丹田真火，火力綿密可久戰不竭，結丹後催發火海可焚困群敵，攻勢凌厲。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_402",
    "name": "清冷寒泉訣",
    "category": "generic",
    "realmReq": "煉气期",
    "maxLevel": 9,
    "desc": "水屬清冷功法，運轉如寒泉沁體可定心安神、滌除火毒躁氣，雖無剛猛攻勢卻為水修養性立基之良法。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_403",
    "name": "赤陽焚海大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "火屬至剛大法，相傳可引地底烈火焚乾滄海，化神修士全力施為，赤焰滔天可令百里水澤盡化蒸騰白霧。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_404",
    "name": "玄霜凝冰真經",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "冰屬玄霜真經，採極北玄霜凝煉本命寒冰，可結千層冰甲護體，亦可化冰刺驟射，攻防兼備而至寒徹骨。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_405",
    "name": "坎水玄淵功",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "水屬坎卦功法，取坎中至陰玄水養就深沉法力，善禦巨浪寒潮困敵步法，結丹後可化水遁逃，進退自如。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_406",
    "name": "離火朱炎訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "火屬離卦功法，引朱炎之火煉就赤紅法力，所發火術迅捷灼人，築基修士施之可連焚數陣陰邪小妖。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_elemental_407",
    "name": "寒淵蝕骨秘錄",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "陰寒水屬秘錄，煉寒淵蝕骨之氣化作無形寒流，悄無聲息侵入敵體凍滯丹元，乃陰柔暗算的偏門狠法。",
    "canonRefs": [
      "五行水火冰"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_408",
    "name": "縮地成寸訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "藉空間摺疊之理壓縮腳下方寸天地，舉步即過數里之遙，趕路逃遁皆遠勝尋常五行遁術，是空間一道的入門根本身法。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_409",
    "name": "虛空挪移大法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "撕開咫尺空間裂隙瞬間易位百丈，可避過正面攻擊繞至敵後，化神修士神識下亦難捕捉其遁走軌跡。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_410",
    "name": "玄天斬靈空間訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "借玄天殘刃斬裂空間之能，揮手即斬出無形空間刃,所過之處連虛空都被割裂,法寶護罩一觸即潰。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_411",
    "name": "須彌納物秘錄",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "於袖中開闢一方獨立空間囊括萬物,可瞬間取物或藏匿身形,是煉器與藏寶儲物之道的根基祕術。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_412",
    "name": "裂空遁影神通",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "撕裂空間化作一道殘影遁走,身形忽隱忽現如鬼魅穿梭,專擅潛伏暗殺與絕境脫身,正面戰力不顯而保命無雙。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_413",
    "name": "乾坤封空大陣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "布下封鎖空間之大陣,陣成則方圓百里空間凝固,困於陣中者一切遁術瞬移盡皆失效,只能與布陣者正面相搏。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_414",
    "name": "太虛崩天印",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "凝聚虛空亂流為一方崩裂印記轟向敵手,印落處空間寸寸碎裂,連虛空都被擠壓湮滅,沾之者形神俱滅。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_415",
    "name": "穿星墜空步",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "踏空間節點如踏星辰,一步跨越極遠之距,身形於虛空節點間連續閃爍,瞬息之間已在百丈之外。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_416",
    "name": "界門開闔祕術",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "撕開兩界之間的虛空界門短暫穿行,可越過禁制阻隔遁入夾縫,然界門一道兇險異常,稍有不慎便葬身亂流。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_417",
    "name": "虛空蟲洞遁法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "於兩點之間開鑿一道虛空甬道,身形遁入此端瞬出彼端,跨越千里如咫尺,是長途遁逃與奇襲突進的絕學。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_418",
    "name": "玄空禁錮神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以空間之力扭曲凝固敵身周遭虛空,中者如墜泥沼、舉步維艱,法力流轉滯澀,連神識外放都被無形空間絞纏。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_419",
    "name": "縮地千里訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "摺疊腳下大地將千里之遙縮為一步,遁速凌厲遠超同階,亂星海一帶散修視之為趕路逃命的看家本領。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_420",
    "name": "破虛斬空劍訣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "御劍引動空間之力,劍光所至先裂虛空後斬敵身,無形空間刃與劍光交織難辨,大多法寶護罩一斬即穿。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_421",
    "name": "天罅幻空大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "於虛空中映出無數重疊空間倒影,真身藏於其一而幻影遍布四方,連元嬰後期神識亦難辨真假,最擅迷敵脫身。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_422",
    "name": "曠宇吞虛功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "張口吞納周身虛空亂流煉化為己用,空間崩裂之力盡入丹田,可化作吞噬漩渦攝敵入內、湮滅於虛空夾縫。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_423",
    "name": "玄虛遁形心法",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "斂身遁入薄薄一層空間夾縫之中,氣息修為盡數隱去,普通修士擦肩而過亦難察覺,是潛行匿蹤的根本心法。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_424",
    "name": "離合空間秘錄",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "可將一物自原處分離,再於遠處重組凝實,隔空取物擒人皆如探囊取物,亦能將敵之法寶瞬間挪離其手。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_425",
    "name": "墜星裂空神通",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "牽引高天星辰之力撕裂長空,化作墜落星芒夾帶空間崩裂之威轟落,所過之處虛空盡碎、生機斷絕。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_426",
    "name": "九霄罡風遁訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "御高空罡風穿行於空間亂流之間,藉罡風之力催速遁形,可在虛空夾縫中乘風千里、避過追兵神識搜索。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_427",
    "name": "鎖空玄鏈祕術",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "凝空間之力化作無形鎖鏈纏縛敵身,鎖鏈所縛之處空間凝滯,中者遁術失靈、難以掙脫,專剋擅長瞬移的對手。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_428",
    "name": "須彌芥子大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "納須彌於芥子、藏萬象於方寸,可於一粒微塵中開闢洞天容人容物,亦能將敵困於其中受空間擠壓湮滅。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_429",
    "name": "虛淵亂流斬",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "引虛空深處狂暴亂流凝於劍鋒一斬而出,亂流所至空間錯位崩離,連虛空都被攪成齏粉,威能可撼合體修士。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_430",
    "name": "回溯倒影遁法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "於空間中留下方才身形的虛影倒影,受襲時真身已循空間回溯遁離原處,以虛應實、金蟬脫殼於頃刻之間。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_431",
    "name": "封空鎖天大陣",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以空間禁制布成困殺大陣,陣內空間層層摺疊封死一切出路,瞬移遁術盡廢,獵殺擅遁強敵的無上殺陣。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_432",
    "name": "幻空重疊步法",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "踏空間錯位之機令身形於數處重疊閃現,敵難辨真身所在,攻其虛影則撲空,正可趁隙繞後一擊制敵。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_space_433",
    "name": "渡虛穿界訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "短暫遁入兩界夾縫的虛空之中藏身穿行,可避過大陣禁制與強敵圍堵,然夾縫亂流兇險,久留則有形神俱裂之危。",
    "canonRefs": [
      "空間虛空"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_434",
    "name": "血河冥灰大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "血河老怪鎮道魔功，引一道千丈血河裹屍煉煞，血河之中冥灰漫天，凡屍骨入河皆化魔尸，吞噬生靈血氣以壯己身，乃魔道煉屍極致。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_435",
    "name": "赤血煉屍訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以自身精血灌養屍體，溫養百日可成綠毛僵尸一具，受血主神識驅使，刀槍難傷，為入門煉屍者所修之基。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_436",
    "name": "千屍血煞功",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "驅役千具血屍環身結陣，匯成漫天血煞之氣，攻則屍潮蔽日，守則煞光成罩，群屍同心可圍殺同階強敵。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_437",
    "name": "幽冥煉魂大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "攝取亡者三魂七魄煉入屍身，使死屍存幾分生前神通記憶，魂屍交融，召之可使昔日大能之術重現於世。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_438",
    "name": "血魔屍祖經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "魔道至高煉屍祕傳，以血河之力溫養屍祖一尊，屍祖既成可自行煉化群屍、生養屍裔，一脈相承綿延不絕。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_439",
    "name": "噬血煉煞訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "修煉時需吞飲生靈鮮血淬煉煞氣，血氣愈濃功力愈深，施展時周身赤焰繚繞，掌底血光所及血肉成灰。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_440",
    "name": "碧血養屍經",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "取碧血幽泉之氣溫養屍胎，歷九年屍蛻可成銀毛凶屍，膂力驚人且不畏尋常符火，為養屍正法。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_441",
    "name": "赤焰血龍訣",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "凝周身血煞化作一條赤色血龍，吞吐血焰騰空翻飛，所過之處血毒瀰漫，中者血脈寸寸潰爛而亡。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_442",
    "name": "屍煞奪魄神通",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以屍煞之氣鎖敵神魂，三息之內可奪人三魂攝人七魄，魂魄既失軀殼即化作任己驅役之行屍。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_443",
    "name": "血池煉魔功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "掘地築血池一方，以萬屍精血久煉，池成可催生血魔之軀，血魔出池吞天蔽日，乃禁忌之品中之凶煞。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_444",
    "name": "骨魔煉屍訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "剔取上古凶獸枯骨為基重塑屍身，煉成骨魔利爪可裂金石，骨刺暗藏屍毒，傷者頃刻間血肉枯朽。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_445",
    "name": "萬煞血祭大法",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "以血祭之術匯聚萬縷煞氣灌入屍陣，獻祭之血愈多屍兵愈悍，陣成可硬撼合體之威，然修者亦折陽壽。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_446",
    "name": "幽屍蠱毒訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "於屍腹豢養屍蠱萬條，臨敵時驅蠱噬人，蠱蟲鑽入血脈散播屍毒，毒發者周身浮屍斑而成新屍。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_447",
    "name": "赤煉血神功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "自焚精血逆煉血神之胎，血神既成可分身百千、噴吐血焰焚山，乃血河一脈傳人問鼎大乘之憑藉。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_448",
    "name": "驅屍攝魂訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "以神識凝成屍引,可遙控百里之內群屍俯首,攝魂鈴一響亡魂歸位，新喪之屍亦能起立受役。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_449",
    "name": "血煞屍王經",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "煉化一具屍王統御群屍，屍王披血煞甲、握屍骨幡，揮幡可令周遭千屍同進同退，威壓懾人魂魄。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_450",
    "name": "陰血控屍訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以陰寒血氣封鎮屍體神智使其唯命是從，受控之屍力大無窮且痛覺盡失，可作護道惡僕衝鋒陷陣。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_451",
    "name": "血焰焚屍大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "催動血焰反焚己屍以爆煞氣，臨絕境時可令屍傀自爆化作漫天血雨，血雨所沾者皮開肉綻、煞毒攻心。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_452",
    "name": "冥血煉魄訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "汲取九幽冥血淬煉魂魄，使屍身得幾分靈性、辨敵我知進退，較尋常呆屍更通機變，貼身搏殺尤難纏。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_453",
    "name": "百煉魔屍功",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "取屍身反覆以血煞百煉，每經一煉屍質愈堅、煞威愈烈，煉至圓滿可成銅皮鐵骨之魔尸，刀劍加身不過火星四濺。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_454",
    "name": "噬魂血蠱訣",
    "category": "generic",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以血蠱啃噬敵手元神，蠱毒入海識則神魂潰散，修者更可奪其神識記憶煉入屍身，化敵之能為己之用。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_455",
    "name": "赤血養屍秘錄",
    "category": "generic",
    "realmReq": "煉氣期",
    "maxLevel": 7,
    "desc": "煉氣士初習煉屍之入門殘卷，以赤血混朱砂塗屍鎮煞，可養僵屍一具看守洞府，雖弱卻是踏入此道之始。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_456",
    "name": "屍丹煉煞神通",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "凝屍中精煞結成一枚血色屍丹含於口中，屍丹既成則屍身不腐、煞力不竭，吐丹傷敵可破護體罡氣。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_457",
    "name": "血河噬天魔功",
    "category": "generic",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "血河一脈鎮派絕學，運功時引動地脈血氣化作滔天血河倒灌九霄，河中萬屍齊嘯，吞噬山河生靈以鑄無上魔威。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_458",
    "name": "枯骨血煉訣",
    "category": "generic",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "採亂葬之地枯骨以血煞重煉成骨偶屍兵，骨兵雖不及血屍堅韌卻勝在易得量多，亂戰之中可作屍海消耗之用。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_blood_459",
    "name": "幽冥屍煞大法",
    "category": "generic",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "匯聚幽冥屍煞凝成一片黑霧戰場，霧中生人法力受蝕、神識受擾，唯魔道煉屍者於霧內如魚得水縱橫殺伐。",
    "canonRefs": [
      "血煉煉屍"
    ],
    "statBonus": {
      "spirit": 3
    }
  },
  {
    "id": "te_artifact_460",
    "name": "百脈煉寶訣",
    "category": "refining",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "仙界百造山所傳煉器肉身雙修之法，以周身百脈為爐鼎錘煉法寶，修成後御器強度與肉身皆達巔峰，乃韓立融入梵聖真魔功之根本。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_461",
    "name": "御劍三十六訣",
    "category": "refining",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "劍修入門御劍秘訣，循三十六重劍意層層遞進，習者可一念馭飛劍離手百丈，於空中盤旋斬敵，築基之後威力倍增。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_462",
    "name": "青竹蜂雲御器訣",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "專為驅御青竹蜂雲劍所創之御器心法，以神識化引化萬千劍絲為蜂群之勢，遮天蔽日攢射敵身，結丹方能勉強駕馭其鋒。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_463",
    "name": "太乙玄門鑄劍經",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "上古鑄劍大派傳承秘錄，教人以三昧地火熔鍊精金玄鐵，反覆鍛打而成飛劍，所鑄之劍鋒銳異常、自帶劍靈，可隨主修為而長。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_464",
    "name": "九轉祭煉大法",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "煉化法寶之頂級祭煉之法，以心頭精血與元神之力反覆溫養法器九轉，使寶物與神魂相連，臨敵時收發由心、威力遠勝凡器。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_465",
    "name": "玄煞馭幡訣",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "馭使幡類法寶之邪修功法，以幽冥煞氣注入寶幡，展開可放出無數厲鬼陰風絞殺敵人，最宜驅御招魂幡、攝魂等陰煞之器。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_466",
    "name": "乾坤煉爐心法",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "以丹田為乾坤煉爐之罕見功法，可於體內溫養一二件本命法寶，使其晝夜受真元滋養而靈性大增，急戰時噴吐而出殺敵於無形。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_467",
    "name": "五行鍛元神通",
    "category": "refining",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "匯聚金木水火土五行真焰於一爐之煉器神通，所煉法寶兼具五行之性、相生不息，化神修士施之可鑄就五行俱全之頂階靈寶。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_468",
    "name": "赤焰煉金訣",
    "category": "refining",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "火屬煉器入門功法，引地火與自身火靈之力熔煉精金，去蕪存菁煉出純淨寶材，乃煉器師築基期必修之根基心法。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_469",
    "name": "罡風御劍術",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "借天地罡風托劍飛遁之御劍秘術，習者御劍之速倍增、轉折如電，劍光裹罡風所至無堅不摧，最利於萬里追襲與遠遁脫身。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_470",
    "name": "萬器歸宗大法",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "元嬰修士夢寐之御器絕學，神識可同時分馭數十件飛劍法器漫天攢射，layer疊如萬器歸宗、密不透風，單以器陣便可圍殺強敵。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_471",
    "name": "通靈養器秘術",
    "category": "refining",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "溫養法器、催生器靈之溫和秘術，以日精月華與真元日夜灌養寶物，年深日久器中自生靈智，可通人意、自行護主應變。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_472",
    "name": "紫府鑄靈寶典",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "紫府洞天祕傳之鑄器寶典，載有自煉材、開爐、祭靈至成寶之全套法門，依此可鑄就帶有本命器靈之上等法寶，傳世罕有。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_473",
    "name": "玄冰御器訣",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "水冰之屬的御器心法，驅御寒玉所鑄之冰系法寶，所過之處寒氣森森、敵人法力凝滯，最宜馭使寒輪、冰鏡等陰寒利器。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_474",
    "name": "離火祭煉訣",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以離火三昧真焰祭煉法寶之火屬秘訣，反覆以真火淬煉去其雜質、引出寶物火性，煉成之器出鞘即燃、灼焰焚空，威勢驚人。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_475",
    "name": "混元御鼎神通",
    "category": "refining",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "驅御鼎爐重器之化神神通，以渾厚法力催動法鼎吞吐山河、鎮壓萬物，落下時重逾萬鈞，可硬撼法寶、封禁一方天地。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_476",
    "name": "金罡鍛體御劍功",
    "category": "refining",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "御劍兼鍛體之雙修功法，以金行罡氣同煉飛劍與血肉之軀，使持劍之手堅逾精鋼、御劍更穩，劍人合一時破甲裂石如切腐木。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_477",
    "name": "天工開物煉器經",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "集古今煉器之大成的鎮派寶經，自選材辨火、佈陣引靈到祭煉合寶面面俱到，依之可成就帶數種神通禁制之絕世法寶。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_478",
    "name": "幽冥攝器訣",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "奪取他人法寶之陰損秘術，以神識化幽冥之手隔空攝奪敵之飛劍法器，並可暫斷敵與寶物之聯繫，使其法寶反噬其主。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_479",
    "name": "五雷祭劍大法",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "引天雷祭煉飛劍之雷屬絕學，以九霄神雷反覆轟煉劍胚，煉成之劍蘊藏雷霆、出鞘便有電蛇盤繞，斬出雷光霹靂、聲動九天。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_480",
    "name": "御器凝罡心法",
    "category": "refining",
    "realmReq": "炼气期",
    "maxLevel": 7,
    "desc": "煉氣修士初習御物之基礎心法，教人凝聚體內微薄真元化作罡氣托舉法器，雖只能驅御一兩件輕巧飛劍法符，卻為御器之始。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_481",
    "name": "百鍛玄鐵訣",
    "category": "refining",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "專煉玄鐵寶材之鍛器功法，須以真火百鍛千錘，去其鐵中雜煞、煉出純澈寶鐵，所成器胚堅韌異常，乃鑄就利器之上佳坯材。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_482",
    "name": "太虛馭劍神通",
    "category": "refining",
    "realmReq": "化神期",
    "maxLevel": 13,
    "desc": "化神修士御劍之至高神通，可棄劍而以神識凝聚虛空劍氣，無形無質、隨念而生，殺人於百里之外而對手難覓劍光蹤跡。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_483",
    "name": "碧靈養劍訣",
    "category": "refining",
    "realmReq": "结丹期",
    "maxLevel": 9,
    "desc": "以草木碧靈之氣溫養木屬飛劍之養器訣，使劍身蘊生生不息之木靈，受損可自行癒合、歷久彌鋒，乃木系劍修護劍之祕法。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_484",
    "name": "鎮獄煉鼎大法",
    "category": "refining",
    "realmReq": "元婴期",
    "maxLevel": 11,
    "desc": "煉化鎮壓類法鼎之重器功法，以渾厚真元祭煉巨鼎，可將敵手連人帶寶攝入鼎中以地火煉化，亦能鎮封一域靈脈、封禁強敵。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  },
  {
    "id": "te_artifact_485",
    "name": "玄機馭符訣",
    "category": "refining",
    "realmReq": "筑基期",
    "maxLevel": 9,
    "desc": "驅御符器之巧妙御器訣，以神識牽引預煉之符箓法器於空中結陣變化，攻守隨心、虛實莫測，最利以寡敵眾與佈設禁制。",
    "canonRefs": [
      "御器煉器心法"
    ],
    "statBonus": {
      "attack": 3
    }
  }
];

export function getTechnique(id: string): TechniqueDef | undefined { return TECHNIQUES.find((t) => t.id === id); }
export function findTechniqueByName(name: string): TechniqueDef | undefined {
  if (!name) return undefined;
  return TECHNIQUES.find((t) => t.name === name) || TECHNIQUES.find((t) => name.includes(t.name) || (t.canonRefs||[]).some((r) => name.includes(r)));
}
