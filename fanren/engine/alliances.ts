/**
 * 宗派聯盟與宗門間「合縱連橫」關係查詢（純讀 FactionState.allianceId / relations；不寫存檔）。
 * 優先讀世界執行期狀態 world.factionStates（含演化後的關係變動），無則退回道元紀靜態勢力表。
 */
import type { FanrenWorldState, SectRelationKind, FactionState } from '../types';

// ── 道元紀原創勢力表（替代凡人正史 CANON_FACTIONS）──
const DAOYUAN_FACTIONS: FactionState[] = [
  { id: '玄天宗', name: '玄天宗', power: 80, relationToPlayer: 0, status: 'stable', note: '道元紀第一仙門，執掌天道碎片，主修星辰之道。', allianceId: '正道聯盟', relations: { 魔淵殿: 'enemy', 萬獸山: 'ally' } },
  { id: '太虛門', name: '太虛門', power: 60, relationToPlayer: 0, status: 'stable', note: '以推演天機聞名，門中藏有道紋碑拓本。', allianceId: '正道聯盟', relations: { 魔淵殿: 'enemy' } },
  { id: '萬獸山', name: '萬獸山', power: 50, relationToPlayer: 0, status: 'stable', note: '馭使靈獸的古老傳承，掌握部分原始道紋。', allianceId: '正道聯盟', relations: { 魔淵殿: 'enemy', 玄天宗: 'ally' } },
  { id: '青木谷', name: '青木谷', power: 35, relationToPlayer: 0, status: 'stable', note: '丹道宗門，以草木入道，掌控數處靈藥秘境。', allianceId: '散修盟', relations: {} },
  { id: '碧落宮', name: '碧落宮', power: 45, relationToPlayer: 0, status: 'stable', note: '女子修真門派，修太陰之道，宮主傳為上古月神後裔。', allianceId: '散修盟', relations: { 血冥教: 'rival' } },
  { id: '魔淵殿', name: '魔淵殿', power: 75, relationToPlayer: 0, status: 'stable', note: '魔族至高殿堂，圖謀道紋碎片以打通兩界通道。', allianceId: '魔道聯盟', relations: { 玄天宗: 'enemy', 太虛門: 'enemy', 萬獸山: 'enemy' } },
  { id: '血冥教', name: '血冥教', power: 55, relationToPlayer: 0, status: 'stable', note: '以血道入魔，擅血祭與傀儡術，掌控冥河祕境。', allianceId: '魔道聯盟', relations: { 碧落宮: 'rival' } },
  { id: '噬魂谷', name: '噬魂谷', power: 40, relationToPlayer: 0, status: 'declining', note: '吞噬魂魄以強行突破的邪宗，遭正道清剿後元氣大傷。', allianceId: '魔道聯盟', relations: {} },
  { id: '道元殿', name: '道元殿', power: 90, relationToPlayer: 0, status: 'stable', note: '超然於正邪之外的守護者，傳為道元祖師開闢，監察108道紋碎片平衡。', allianceId: undefined, relations: {} },
  { id: '星隕閣', name: '星隕閣', power: 30, relationToPlayer: 0, status: 'stable', note: '天機推演小派，以觀星卜卦維生，常販售情報。', allianceId: '散修盟', relations: {} },
];

function states(world?: FanrenWorldState): FactionState[] {
  if (world?.factionStates) return Object.values(world.factionStates) as FactionState[];
  return DAOYUAN_FACTIONS;
}

/** 某聯盟的成員 faction id 清單。 */
export function allianceMembers(allianceId: string, world?: FanrenWorldState): string[] {
  return states(world).filter((f) => f.allianceId === allianceId).map((f) => f.id);
}

/** 某宗門所屬聯盟 id（無則 undefined）。 */
export function allianceOf(factionId: string, world?: FanrenWorldState): string | undefined {
  return states(world).find((f) => f.id === factionId || f.name === factionId)?.allianceId;
}

function relationsOf(factionId: string, world?: FanrenWorldState): Record<string, SectRelationKind> {
  return (states(world).find((f) => f.id === factionId || f.name === factionId)?.relations || {}) as Record<string, SectRelationKind>;
}

/** 兩宗之間的關係（雙向 fallback：A→B 或 B→A 任一命中）。 */
export function relationBetween(a: string, b: string, world?: FanrenWorldState): SectRelationKind | undefined {
  return relationsOf(a, world)[b] ?? relationsOf(b, world)[a];
}

/** 某宗的盟友（同盟/聯姻）。 */
export function alliesOf(factionId: string, world?: FanrenWorldState): string[] {
  const r = relationsOf(factionId, world);
  return Object.entries(r).filter(([, k]) => k === 'ally' || k === 'marriage').map(([id]) => id);
}

/** 某宗的敵對方（世仇/臥底）。 */
export function enemiesOf(factionId: string, world?: FanrenWorldState): string[] {
  const r = relationsOf(factionId, world);
  return Object.entries(r).filter(([, k]) => k === 'enemy' || k === 'infiltrator').map(([id]) => id);
}

/** 全部聯盟 → 成員，供 UI 分組（排除以聯盟自身為成員的自指）。 */
export function allAlliances(world?: FanrenWorldState): { allianceId: string; members: string[] }[] {
  const ids = Array.from(new Set(states(world).map((f) => f.allianceId).filter(Boolean))) as string[];
  return ids.map((id) => ({ allianceId: id, members: allianceMembers(id, world).filter((m) => m !== id) }));
}

/** 關係類型中文標籤（敘事/UI 用）。 */
export const RELATION_LABEL: Record<SectRelationKind, string> = {
  ally: '同盟',
  rival: '競爭',
  enemy: '世仇',
  vassal: '附庸',
  infiltrator: '臥底',
  marriage: '聯姻',
};
