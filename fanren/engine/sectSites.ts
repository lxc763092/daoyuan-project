/**
 * 修仙/魔道宗門「據點＋設施」程序生成：依世界地圖節點的 factions 與靈脈，惰性、決定性地生成
 * 坊市/靈脈/藥園/礦脈/護山大陣/傳送陣/洞府等設施（同地永得同設施，不佔存檔）。
 * 還原原著「修仙界由各大宗門佔據洞天福地、各設坊市靈脈藥園」的格局；凡俗武林門派不在此列。
 */
import type { SectFacility, SectSite } from '../types';
import { WORLD_MAP } from '../data/worldMap';
import { findMapNode, isConcretePlace, factionsOfPlace } from './mapIntel';
import { getSect, isMartialFaction } from './sect';
import { lingMaiOf } from './lingMai';
import { isTeleportHub } from './mapLayout';
import { rngFor, pickWith, type RNG } from './registry';
import { sectTechniques } from './techniqueSource';
import type { FacilityKind } from '../types';

const FAC_PRE = '玄青赤紫幽碧金落寒靈萬九天'.split('');
const FAC_MID = '霞雲山海靈玄陽陰星月丹符'.split('');

/** 宗門專屬特色設施規格（依原著招牌決定）。功法閣由下方程式為所有 SectDef 宗門統一補。 */
interface SpecialFacilitySpec { kind: FacilityKind; name: string; desc: string; yield?: SectFacility['yield'] }
const SECT_SPECIAL_FACILITIES: Record<string, SpecialFacilitySpec[]> = {
  // ── 正道·越國七派 ──
  黃楓谷: [{ kind: '丹房', name: '嶽麓殿地火丹房', desc: '嶽麓殿下三十六間地火間，借地火之力煉丹煉器，十八、十九號為上品丹房。', yield: { itemKind: '丹药', note: '地火煉丹，成丹率較尋常丹爐為高' } }],
  掩月宗: [{ kind: '洞府', name: '天月神舟', desc: '掩月宗鎮派飛行法寶，內藏雙修密室與頂級法器庫，亦為門面所在。', yield: { itemKind: '法宝', rarityHint: '稀有' } }],
  靈獸山: [{ kind: '異獸山脈', name: '靈獸圈養地', desc: '驅役妖獸、奇蟲、毒蟲組活警戒網之地；隨身靈獸袋豢養活物（實為御靈宗潛伏分支）。', yield: { itemKind: '材料', note: '捕獵化形妖獸、取妖丹靈材；可馴獸參戰' } }],
  巨劍門: [{ kind: '劍冢', name: '巨劍冢', desc: '埋藏歷代無鞘巨劍、煉劍傳劍之地，劍氣沖天。', yield: { itemKind: '法宝', note: '可取殘劍、悟御劍之法' } }],
  清虛門: [{ kind: '護山大陣', name: '雪虹綾大陣', desc: '道門符陣與飛行法器雪虹綾傳承之所，禦空護山並重。' }],
  天闕堡: [{ kind: '異獸山脈', name: '寒冰蟾池', desc: '豢養寒冰蟾等水系毒蟾的池沼，弟子驅之作戰。', yield: { itemKind: '材料', note: '取蟾毒、馴毒獸' } }],
  化刀塢: [{ kind: '刀冢', name: '煉刀爐·刀冢', desc: '刀修傳承地，藏飛刀、煉陰柔刀法。', yield: { itemKind: '法宝', note: '取飛刀法器、悟刀法' } }],
  // ── 魔道 ──
  御靈宗: [{ kind: '異獸山脈', name: '百蟲血窟·異獸山脈', desc: '數十間按環境改造的奇蟲密室與靈獸圈養地，收錄上千種奇蟲（奇蟲榜）、鎮宗三獸。', yield: { itemKind: '材料', note: '育蟲、馴獸、取妖丹；驅蟲控獸天南第一' } }],
  合歡宗: [{ kind: '血池', name: '天陽潭', desc: '濃灰霧氣籠罩的門中禁地，雙修採補煉功之所，元嬰長老亦不輕入。', yield: { note: '採補煉功，瓶頸速破（業力之累）' } }],
  鬼靈門: [{ kind: '養鬼幡堂', name: '萬魂幡堂', desc: '養魂攝魂、煉萬魂大陣之地，兼設血祭祭壇。', yield: { note: '養鬼、煉魂幡（業力大增）' } }],
  陰羅宗: [{ kind: '煉屍洞', name: '銅甲煉屍洞', desc: '煉製銅甲乾屍大軍、修復鬼羅幡之地，三屍王有結丹以上修為。', yield: { itemKind: '材料', note: '煉屍、收生魂（業力大增）' } }],
  化血教: [{ kind: '血池', name: '血祭血池', desc: '擄人血祭、采血煉氣的邪教據點。', yield: { note: '血祭速成（終生難結丹之累）' } }],
};

/** 此節點的「主控修仙/魔道宗門」（取 factions 中第一個非武林、且為 SectDef 者；否則第一個非武林名）。 */
export function rulingSectOf(nodeName: string): { name: string; category: '修仙宗門' | '魔道宗門' } | null {
  const facs = factionsOfPlace(nodeName).filter((f) => f && !isMartialFaction(f));
  for (const f of facs) {
    const s = getSect(f);
    if (s && (s.category === '修仙宗門' || s.category === '魔道宗門')) return { name: f, category: s.category };
  }
  // 非 SectDef 的修仙聯盟/勢力（正道七派等）→ 視為修仙宗門陣營
  if (facs.length) return { name: facs[0], category: '修仙宗門' };
  return null;
}

function facName(rng: RNG, suffix: string): string {
  return pickWith(FAC_PRE, rng) + pickWith(FAC_MID, rng) + suffix;
}

/** 為單一節點程序生成設施清單（決定性；空陣列＝無修仙據點）。 */
export function sectFacilitiesOf(nodeId: string): SectFacility[] {
  const node = findMapNode(nodeId);
  if (!node) return [];
  // 葉節點（具體地點）生成；或本身即某宗門總部節點（如御靈宗，雖含子地點仍應掛據點設施）
  const isSectHQ = !!getSect(node.name);
  if (!isConcretePlace(node) && !isSectHQ) return [];
  const ruling = rulingSectOf(node.name);
  if (!ruling) return []; // 無修仙/魔道勢力坐鎮 → 無據點
  const rng = rngFor('site:' + node.id); // 決定性：同地永得同設施
  const lm = lingMaiOf(node.id); // 沿用靈脈品階（含 canon 覆寫）
  const out: SectFacility[] = [];

  // 1) 靈脈（靈氣足者必有，品階取自 lingMaiOf）
  if (lm.grade >= 2) {
    out.push({ kind: '靈脈', name: `${node.name}靈脈`, tier: lm.grade, desc: lm.desc, yield: { note: `值守採氣，閉關效率 ×${lm.mult}` } });
  }
  // 2) 坊市（修仙宗門必設門中坊市；魔道宗門半數）
  if (ruling.category === '修仙宗門' || rng() < 0.5) {
    out.push({ kind: '坊市', name: `${node.name}坊市`, tier: 1 + Math.floor(rng() * Math.max(1, lm.grade)), desc: `${ruling.name}所轄坊市，修士於此買賣丹藥靈材法器。` });
  }
  // 3) 藥園（靈氣足者）
  if (lm.grade >= 3 && rng() < 0.7) {
    out.push({ kind: '藥園', name: facName(rng, '靈藥園'), tier: lm.grade, desc: '宗門靈田，溫養百年靈藥。', yield: { itemKind: '草药', rarityHint: lm.grade >= 4 ? '稀有' : '精良' } });
  }
  // 4) 礦脈（地名含礦/晶/玉 或機率）
  if (/礦|矿|玄玉|晶|金/.test(node.name) || rng() < 0.25) {
    out.push({ kind: '礦脈', name: facName(rng, '靈礦'), tier: Math.max(1, lm.grade - 1), desc: '蘊藏靈晶玄鐵的礦脈，可開採煉器靈材。', yield: { itemKind: '材料', rarityHint: lm.grade >= 4 ? '稀有' : '普通' } });
  }
  // 5) 護山大陣（宗門本門必有；越高階靈脈越強）
  out.push({ kind: '護山大陣', name: `${ruling.name}護山大陣`, tier: Math.min(8, 2 + lm.grade), desc: '宗門護山禁制，外人擅闖須破陣，威能依靈脈而定。' });
  // 6) 傳送陣（節點為樞紐者）
  if (isTeleportHub(node.id)) {
    out.push({ kind: '傳送陣', name: `${node.name}傳送大陣`, tier: Math.max(1, lm.grade), desc: '跨域傳送樞紐，可直達他方大陣。' });
  }
  // 7) 洞府名額（修仙宗門弟子可分得）
  if (ruling.category === '修仙宗門' && lm.grade >= 2 && rng() < 0.6) {
    out.push({ kind: '洞府', name: `${node.name}弟子洞府`, tier: lm.grade, desc: '宗門為弟子備的修煉洞府，含聚靈陣。' });
  }
  // 8) 宗門專屬特色設施（依該宗招牌：御靈宗異獸山脈/巨劍門劍冢/黃楓谷丹房/魔道煉屍洞血池…）
  const specs = SECT_SPECIAL_FACILITIES[ruling.name];
  if (specs) {
    for (const sp of specs) {
      out.push({ kind: sp.kind, name: sp.name, tier: Math.max(2, lm.grade), desc: sp.desc, yield: sp.yield });
    }
  }
  // 9) 功法閣（凡真實 SectDef 宗門必建；列本宗可傳承功法。聚合勢力如「正道七派」getSect 回 undefined → 不建）
  if (getSect(ruling.name)) {
    const techs = sectTechniques(ruling.name);
    out.push({
      kind: '功法閣',
      name: `${ruling.name}功法閣`,
      tier: Math.max(2, lm.grade),
      desc: techs.length
        ? `本宗傳承重地，藏鎮派功法玉簡，弟子依資歷分層研習：${techs.join('、')}。`
        : '本宗傳承重地，藏門中功法玉簡，依資歷分層研習。',
      techniques: techs,
    });
  }
  return out;
}

/** 全圖修仙/魔道據點（惰性、決定性；供地塊佔領彙整與 UI）。 */
let _sites: SectSite[] | null = null;
export function allSectSites(): SectSite[] {
  if (_sites) return _sites;
  const out: SectSite[] = [];
  for (const n of WORLD_MAP) {
    if (!isConcretePlace(n) && !getSect(n.name)) continue; // 葉節點或宗門總部節點
    const ruling = rulingSectOf(n.name);
    if (!ruling) continue;
    const facilities = sectFacilitiesOf(n.id);
    if (facilities.length) out.push({ nodeId: n.id, nodeName: n.name, sectName: ruling.name, category: ruling.category, facilities });
  }
  _sites = out;
  return out;
}

export function sectSiteOf(nodeId: string): SectSite | undefined {
  const node = findMapNode(nodeId);
  const id = node?.id || nodeId;
  return allSectSites().find((s) => s.nodeId === id);
}
