/**
 * 靈脈（地脈靈氣）：參考《凡人修仙傳》——天地靈氣於地下匯聚成「靈脈」，靈氣越濃，閉關修煉越快。
 * 此乃「仙凡有別」之根本：修仙宗門皆擇靈脈而立、修士聚於靈氣濃處；凡夫武者所居之城鎮江湖門派，
 * 多為靈氣稀薄的「凡地」——於修士而言，於凡地閉關事倍功半，故仙凡幾不共處一地。
 *
 * 品階：凡地 → 靈氣稀薄 → 下品靈脈 → 中品靈脈 → 上品靈脈 → 極品靈脈 → 靈眼（地脈匯聚之眼）。
 * 由地圖節點（所棲宗門類別／地名關鍵字／界層）推定，著名靈脈以 canon 覆寫；純邏輯。
 */
import type { WorldMapNode } from '../types';
import { WORLD_MAP } from '../data/worldMap';
import { findMapNode } from './mapIntel';
import { findSectByName } from './sect';

export interface LingMai {
  grade: number; // 0 凡地 → 6 靈眼
  name: string;
  mult: number; // 閉關修煉倍率
  desc: string;
  tone: 'danger' | 'normal' | 'gain' | 'special';
}

const GRADES: { name: string; mult: number; desc: string; tone: LingMai['tone'] }[] = [
  { name: '凡地', mult: 0.3, desc: '此地幾無靈氣，乃凡夫俗子棲居之所——於修士而言，吐納於此猶如無米之炊，閉關事倍功半。', tone: 'danger' },
  { name: '靈氣稀薄', mult: 0.6, desc: '靈氣稀薄如縷，勉強可供打坐吐納，然進境遲緩，非久留修煉之地。', tone: 'normal' },
  { name: '下品靈脈', mult: 1.0, desc: '一道下品地脈於此潛行，靈氣尚足，可供尋常修煉。', tone: 'normal' },
  { name: '中品靈脈', mult: 1.6, desc: '中品靈脈靈氣充盈，閉關事半功倍——修仙宗門立基之選。', tone: 'gain' },
  { name: '上品靈脈', mult: 2.4, desc: '上品靈脈靈氣濃郁如霧，修煉一日可抵尋常數日，乃大派必爭之地。', tone: 'gain' },
  { name: '極品靈脈', mult: 3.6, desc: '極品靈脈天地靈氣奔湧，洞天福地、萬中無一，得之足以羨煞同道。', tone: 'special' },
  { name: '靈眼', mult: 5.5, desc: '地脈靈氣匯聚之「靈眼」，靈氣濃稠近乎液化，於此閉關進境一日千里——傳說中的修煉聖地。', tone: 'special' },
];

// 著名靈脈／福地／凡俗之地 canon 覆寫（節點中文名 → 品階）
const CANON: Record<string, number> = {
  虛天殿: 6, // 上古遺殿，靈眼
  亂星海: 4, 天星城: 5, 萬寶樓: 3,
  黃楓谷: 3, 掩月宗: 4, 落雲宗: 4, 鸞鳴宗: 3,
  '七玄門（彩霞山）': 1, 彩霞山: 1, 落日峰: 1, 神手谷: 2, // 凡俗修仙門派，靈氣稀薄（韓立於此修煉緩慢）
  青牛鎮: 0, 落沙坡: 0,
  太岳山脈: 2, 黃楓谷靈藥園: 3,
  雲夢山脈: 3, 古劍門: 3, 墜魔谷: 4,
  昆吾山: 4, 陰陽窟: 4, 萬毒谷: 3, 火獄: 4, 北冥島: 4, 玄玉洞: 4,
};

const KW_HI = /靈眼/; // 6
const KW_5 = /洞天|福地|極品靈脈|聖地|靈乳/; // 5
const KW_4 = /上品靈脈|靈乳洞|玄晶|靈玉|寒玉|地心|火脈|靈泉眼/; // 4
const KW_3 = /靈山|靈峰|靈脈|聚靈|靈礦|靈田|藥園|靈藥|秘境|福地|丹脈|寶地/; // 中-上
const KW_MORTAL = /城$|鎮$|村$|京$|州$|國$|坊$|市$|樓$|街|客棧|酒樓|門客|幫$|莊$|堡$|家$|觀$|寨$|集$|墟$|關$|驛$|渡$/;
const TIER_BONUS: Record<string, number> = { human: 0, spirit: 1, demon: 1, immortal: 2 };

function nodeById(id: string): WorldMapNode | undefined { return WORLD_MAP.find((n) => n.id === id); }
function hash(s: string): number { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0); }

function gradeForNode(node: WorldMapNode): number {
  if (CANON[node.name] != null) return Math.min(6, CANON[node.name] + (TIER_BONUS[node.tier] || 0) * 0); // canon 已含界層考量
  const n = node.name;
  const bonus = TIER_BONUS[node.tier] || 0;
  const h2 = hash(node.id) % 2;
  let g: number;
  if (KW_HI.test(n)) g = 6;
  else if (KW_5.test(n)) g = 5;
  else if (KW_4.test(n)) g = 4;
  else if (KW_3.test(n)) g = 3 + h2; // 中-上品
  else {
    // 依所棲宗門類別：修仙/魔道宗門擇靈脈而立→中品；武林門派（凡俗）→凡地/稀薄
    const sect = findSectByName(n);
    if (sect && (sect.category === '修仙宗門' || sect.category === '魔道宗門')) g = 2 + h2; // 下-中品
    else if (sect && sect.category === '武林門派') g = h2; // 凡地/稀薄
    else if (KW_MORTAL.test(n)) g = h2; // 凡俗聚落
    else g = 1 + h2; // 山海島谷林等野外：稀薄/下品
  }
  return Math.max(0, Math.min(6, g + bonus));
}

const _cache: Record<string, LingMai> = {};
function fromGrade(g: number): LingMai {
  const gr = GRADES[Math.max(0, Math.min(6, g))];
  return { grade: g, name: gr.name, mult: gr.mult, desc: gr.desc, tone: gr.tone };
}

/** 某地（節點 id 或中文名）的靈脈品階。未上圖之地視為「靈氣稀薄」。 */
export function lingMaiOf(locationId: string): LingMai {
  if (!locationId) return fromGrade(1);
  const node = findMapNode(locationId);
  if (!node) return fromGrade(1);
  if (_cache[node.id]) return _cache[node.id];
  const lm = fromGrade(gradeForNode(node));
  _cache[node.id] = lm;
  return lm;
}

/** 閉關修煉時所適用的靈脈倍率：有洞府者下限為下品（洞府皆擇脈而建、聚靈陣引氣）。 */
export function cultivationLingMaiMult(locationId: string, hasAbode: boolean): { mult: number; lm: LingMai } {
  const lm = lingMaiOf(locationId);
  const mult = hasAbode ? Math.max(1.0, lm.mult) : lm.mult;
  return { mult, lm };
}
