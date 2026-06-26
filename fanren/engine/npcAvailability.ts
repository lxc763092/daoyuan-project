/**
 * NPC 可用性閘：嚴格依編年史，判定某 NPC 此刻能否被互動（對話/組隊/傳音）。
 * 修正「未登場/未出生即現身、身在他處卻能組隊、閉關中卻答應同行」等失真。
 *  - 未登場/未出生：resolveNpcAtDay 在首段編年史前回傳 status='unknown'。
 *  - 不在場：以「大區」粒度比對所在地。
 *  - 閉關/渡劫/重傷等：依編年史 activity 判定為「無暇他顧」。
 * 除非玩家已使其「分歧」(diverged)，否則一切以正史為準。
 */
import type { FanrenWorldState, NpcRuntimeState } from '../types';
import { getNpc, getRegion, resolveNpcAtDay, type ResolvedNpc } from './daoyuanLoader';
import { findMapNode } from './mapIntel';
import { regionAnchorOf } from './mapLayout';

const BUSY_RE = /閉關|闭关|閉死關|坐關|渡劫|渡天劫|療傷|重傷|垂死|瀕死|沉睡|轉世|轮回|輪迴|封印|被困|失蹤|下落不明|生死未卜|尚未/;

export interface Availability {
  found: boolean; // 是否為已知 NPC
  available: boolean; // 可被組隊/傳音互動
  present: boolean; // 在玩家當前所在大區
  debuted: boolean; // 已登場/出生
  alive: boolean;
  busy: boolean; // 閉關/渡劫等
  reason: string; // 不可用時的說明（敘事用）
  npcId?: string;
  name?: string;
  resolved?: ResolvedNpc;
  rt?: NpcRuntimeState;
}

/** 以「大區」粒度判斷兩地是否同處一帶。 */
export function sameArea(locA: string, locB: string): boolean {
  if (!locA || !locB) return false;
  if (locA === locB) return true;
  const a = findMapNode(locA);
  const b = findMapNode(locB);
  if (a && b) {
    if (a.id === b.id) return true;
    const ra = regionAnchorOf(a.id);
    const rb = regionAnchorOf(b.id);
    if (ra && rb && ra === rb) return true;
  }
  return locA.includes(locB) || locB.includes(locA);
}

export function npcAvailability(idOrName: string, world: FanrenWorldState, currentDay: number): Availability {
  const npc = getNpc(idOrName);
  if (!npc) {
    return { found: false, available: false, present: false, debuted: false, alive: false, busy: false, reason: `江湖上無人聽過「${idOrName}」此名。` };
  }
  const rt = world.npcStates[npc.id];
  const resolved = resolveNpcAtDay(npc, currentDay);
  const name = npc.name;
  // 若玩家已使其分歧，採用執行期狀態為準（玩家已改寫其命運）
  const effLoc = rt?.diverged ? rt.locationId : resolved.locationId;
  const effStatus = rt?.diverged ? rt.status : resolved.status;

  const debuted = effStatus !== 'unknown';
  const alive = effStatus !== 'dead';
  const busy = !rt?.diverged && BUSY_RE.test(resolved.activity || '');
  const present = sameArea(effLoc, world.currentLocationId);

  let available = true;
  let reason = '';
  if (!debuted) {
    available = false;
    reason = `時機未到——${name}此時尚未現於世人眼前（或未出生），你無從尋得。`;
  } else if (!alive) {
    available = false;
    reason = `${name}已不在人世。`;
  } else if (!present) {
    const where = getRegion(effLoc)?.name || effLoc;
    available = false;
    reason = `${name}並不在此處，據聞其人正於${where}一帶（${resolved.activity || '行蹤不定'}）。`;
  } else if (busy) {
    available = false;
    reason = `${name}此刻正${resolved.activity?.match(BUSY_RE)?.[0] || '潛修'}，閉門謝客、無暇他顧。`;
  }

  return { found: true, available, present, debuted, alive, busy, reason, npcId: npc.id, name, resolved, rt };
}

/** 列出此刻確實在玩家當前大區、可被互動（已登場/在世/未閉關）的 NPC。供 GM 維持正史一致。 */
export function presentNpcs(world: FanrenWorldState, currentDay: number, max = 8): { name: string; activity: string; realm: string }[] {
  const out: { name: string; activity: string; realm: string }[] = [];
  for (const id in world.npcStates) {
    const npc = getNpc(id);
    if (!npc) continue;
    const a = npcAvailability(id, world, currentDay);
    if (a.available && a.resolved) {
      out.push({ name: npc.name, activity: a.resolved.activity || '', realm: String(a.resolved.realm || a.rt?.realm || '') });
      if (out.length >= max) break;
    }
  }
  return out;
}

/** 列出確實位於玩家當前「具體地點」的 NPC，供眼前人物查詢使用。 */
export function presentNpcsHere(world: FanrenWorldState, currentDay: number, max = 8): { name: string; activity: string; realm: string }[] {
  const out: { name: string; activity: string; realm: string }[] = [];
  const playerNode = findMapNode(world.currentLocationId);
  for (const id in world.npcStates) {
    const npc = getNpc(id);
    if (!npc) continue;
    const a = npcAvailability(id, world, currentDay);
    if (!a.available || !a.resolved) continue;
    const npcLocation = a.rt?.diverged ? a.rt.locationId : a.resolved.locationId;
    const npcNode = findMapNode(npcLocation);
    const samePlace = playerNode && npcNode
      ? playerNode.id === npcNode.id
      : npcLocation === world.currentLocationId;
    if (!samePlace) continue;
    out.push({ name: npc.name, activity: a.resolved.activity || '', realm: String(a.resolved.realm || a.rt?.realm || '') });
    if (out.length >= max) break;
  }
  return out;
}
