/**
 * 凡人修仙傳・忠實境界階梯（canon 模式專用，與經典 RealmType 解耦）。
 * 十大境界 × 子境界（煉氣用「層」；築基起用 初/中/後/大圓滿），各有壽元與天劫。
 * realmType 為映射到既有 RealmType 字串（供戰鬥敵人生成 toRealmType 使用）。
 */
export interface RealmFeatures {
  trait: string; // 此境核心特點（一句話）
  flight: string; // 飛行能力（練氣築基須借法器代步；結丹起可禦器禦劍；元嬰可御空長程）
  natalTreasure: boolean; // 可否蘊養本命法寶（結丹起）
  nascentSoul: boolean; // 是否具元嬰（元嬰期起，元神離體不滅、可奪舍重生）
  lawRestricted: boolean; // 是否受天地法則所限（化神起：低階界不可隨意全力出手、人界靈氣難支撐）
  trial: string; // 突破「進入」此境的考驗（築基丹／凝丹心魔／元嬰天劫／空間節點偷渡…）
}

export interface CanonRealm {
  key: string;
  name: string; // 忠實境界名（修正 合道期→合體期、长生境→大乘期）
  tier: 'human' | 'spirit' | 'immortal';
  realmType: string; // 映射到 RealmType（合一字串）
  lifespan: number; // 該境界壽元（年）
  baseExp: number; // 該境界每子境界基礎修為上限
  hasTribulation: boolean; // 突破入此境是否需渡劫
  tribulationName?: string;
  layers?: number; // 煉氣期專用：十三層
  features?: RealmFeatures; // 境界特點與突破考驗（忠於原著）
}

// 子境界（築基起）
export const SUB_STAGES = ['初期', '中期', '後期', '大圓滿'];

// ── 道元纪境界（覆盖凡人大境界表）──
import { DAOYUAN_REALMS, type DaoyuanRealm } from '../data_daoyuan/daoyuanRealms';

/** 将 DaoyuanRealm 映射为兼容 CanonRealm 接口 */
function toCanonRealm(d: DaoyuanRealm, idx: number): CanonRealm {
  return {
    key: d.key,
    name: d.name,
    tier: d.tier as 'human' | 'spirit' | 'immortal',
    realmType: d.realmType,
    lifespan: d.lifespan,
    baseExp: d.baseExp,
    hasTribulation: idx >= 6, // 化神合道(6)起需渡劫
    tribulationName: idx >= 6 ? `${d.name}天劫` : undefined,
    layers: idx === 0 ? 13 : undefined, // 引气入体用层数
  };
}

export const CANON_REALMS: CanonRealm[] = DAOYUAN_REALMS.map(toCanonRealm);

export function realmByIndex(i: number): CanonRealm {
  return CANON_REALMS[Math.max(0, Math.min(CANON_REALMS.length - 1, i))];
}

/** 由境界 index + 子境界 推出顯示名（煉氣用「N層」，餘用子境界）。 */
export function realmLabel(index: number, subStage: number, qiLayer = 1): string {
  const r = realmByIndex(index);
  if (r.layers) return `${r.name}${Math.max(1, Math.min(r.layers, qiLayer))}層`;
  return `${r.name}・${SUB_STAGES[Math.max(0, Math.min(3, subStage))]}`;
}

/** 由既有 RealmType 字串推估初始 canon 境界 index（創角／舊存檔回填用）。 */
export function realmIndexFromType(realmStr: string): number {
  const r = realmStr || '';
  // 道元纪境界
  if (/道元无极|道元無極/.test(r)) return 9;
  if (/真仙归一|真仙歸一/.test(r)) return 8;
  if (/大乘渡劫/.test(r)) return 7;
  if (/合道通玄/.test(r)) return 6;
  if (/化神归墟|化神歸墟/.test(r)) return 5;
  if (/元婴出窍|元嬰出竅/.test(r)) return 4;
  if (/金丹化婴|金丹化嬰/.test(r)) return 3;
  if (/筑基凝脉|築基凝脈/.test(r)) return 2;
  if (/通脉开窍|通脈開竅/.test(r)) return 1;
  if (/引气入体|引氣入體/.test(r)) return 0;
  // 兼容旧凡人境界
  if (/真仙/.test(r)) return 8;
  if (/大乘|渡劫|長生|长生/.test(r)) return 7;
  if (/合体|合體|合道/.test(r)) return 6;
  if (/化神/.test(r)) return 5;
  if (/元婴|元嬰/.test(r)) return 4;
  if (/金丹|結丹|结丹/.test(r)) return 3;
  if (/筑基|築基/.test(r)) return 2;
  return 0;
}
