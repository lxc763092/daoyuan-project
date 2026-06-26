/**
 * 道元紀世界演化：時間推進時，依世界事件模板演化（無固定正史NPC，由 procGen 動態生成）。
 * 道元紀事件採用三級制：minor（小事件）/ major（大事件）/ epic（史詩事件），
 * 事件來源於設計文檔中的世界事件鏈，不含 NPC 結局系統。
 */
import type {
  FanrenWorldState,
  NpcReaction,
  NpcRuntimeState,
  WorldEventState,
} from '../types';
// 道元紀：事件系統來自設計文檔模板，NPC 無固定編年史
import { eventsInWindow } from './daoyuanLoader';

// 道元紀：世界事件按模板驅動，無傳統 NPC 結局里程碑

export interface EvolutionResult {
  npcStates: Record<string, NpcRuntimeState>;
  worldEventStates: Record<string, WorldEventState>;
  npcFateStates: Record<string, WorldEventState>;
  firedEventIds: string[];
  firedSummaries: string[];
  reactions: NpcReaction[];
}

/**
 * 推進世界從 oldDay 到 newDay。
 * - 未分歧的世界事件：照常觸發，套用後果。
 * - 道元紀 NPC 全部由 procGen 動態生成，不依編年史推進。
 * - 玩家所在地的 NPC：依好感度產生「相對玩家行動」的反應。
 */
export function evolveWorld(
  state: FanrenWorldState,
  oldDay: number,
  newDay: number,
  heldEventIds?: Set<string>
): EvolutionResult {
  const npcStates: Record<string, NpcRuntimeState> = { ...state.npcStates };
  const worldEventStates: Record<string, WorldEventState> = { ...state.worldEventStates };
  const firedEventIds: string[] = [];
  const firedSummaries: string[] = [];
  const reactions: NpcReaction[] = [];

  // 1) 觸發此區間內的世界事件（未被玩家改寫者）
  // 道元紀事件以 tier 分級：minor（小事件）| major（大事件）| epic（史詩事件）
  // major/epic 逐條入敘事摘要；minor 事件僅記錄入史，不生成敘事摘要
  const due = eventsInWindow(oldDay, newDay);
  for (const ev of due) {
    if (heldEventIds?.has(ev.id)) continue; // 互動式介入事件：暫不自動觸發，待玩家抉擇
    const prev = worldEventStates[ev.id];
    if (prev?.fired || prev?.diverged) continue;
    worldEventStates[ev.id] = { id: ev.id, fired: true, firedDay: ev.scheduledDay, diverged: false };
    firedEventIds.push(ev.id);
    // major 和 epic 事件生成敘事摘要；minor 僅記錄
    if (ev.tier === 'major' || ev.tier === 'epic') {
      const prefix = ev.tier === 'epic' ? '【史詩紀元】' : '【道元紀】';
      firedSummaries.push(`${prefix}${ev.name}：${ev.description}`);
    }
  }

  // 2) 道元紀：NPC 由 procGen 動態生成，無固定編年史推進
  //    （procGen 在玩家進入新區域時即時產出 NPC，不透過 turnEngine 批次推進）

  // 3) 玩家所在地、已生成的 NPC → 產生反應
  for (const id in npcStates) {
    const rt = npcStates[id];
    if (rt.locationId !== state.currentLocationId) continue;
    if (!rt.knownToPlayer) continue;
    if (rt.status === 'dead' || rt.status === 'unknown') continue;
    // 道元紀：NPC 無固定勢力歸屬，由 procGen 時賦予特徵；反應以好感度為核心
    reactions.push({
      npcId: id,
      npcName: id,
      action: npcReaction(rt, rt.relationship),
      towardPlayer: rt.relationship !== 0,
    });
  }

  return { npcStates, worldEventStates, npcFateStates: {}, firedEventIds, firedSummaries, reactions };
}

/**
 * NPC 對玩家的反應文本（基於好感度）。
 * 道元紀：NPC 無固定勢力歸屬，純以好感度決定態度。
 */
function npcReaction(rt: NpcRuntimeState, relationship: number): string {
  if (relationship >= 50) return '神色親近，似有意與你結交或相助。';
  if (relationship <= -50) return '目露敵意，對你頗為戒備。';
  if (relationship < 0) return '冷眼旁觀，對你存有疑慮。';
  return '各行其是，並未特別在意你。';
}

/** 玩家介入正史 → 標記分歧並阻止對應事件照常發生。 */
export function markDivergence(
  state: FanrenWorldState,
  cause: string,
  affectedEventIds: string[],
  affectedNpcIds: string[],
  day: number
): { worldEventStates: Record<string, WorldEventState>; npcStates: Record<string, NpcRuntimeState>; note: string } {
  const worldEventStates = { ...state.worldEventStates };
  const npcStates = { ...state.npcStates };
  for (const eid of affectedEventIds) {
    worldEventStates[eid] = { id: eid, fired: worldEventStates[eid]?.fired ?? false, diverged: true, outcomeNote: cause };
  }
  for (const nid of affectedNpcIds) {
    if (npcStates[nid]) npcStates[nid] = { ...npcStates[nid], diverged: true, divergenceNote: cause };
  }
  return { worldEventStates, npcStates, note: `因你的行動，原本的命運軌跡已生變數：${cause}` };
}
