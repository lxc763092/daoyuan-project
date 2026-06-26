/** 提醒與回憶（小遊戲金手指）：世界現況提醒 + 過往記憶回溯。 */
import type { FanrenWorldState, MemoryEntry, WorldReminder } from '../types';
import { formatTime } from './clock';
import { eventsNear, getNpc, getRegion } from './daoyuanLoader';
import { hanliFlavorAt, hanliCurrentTrial } from './hanliCanonPath';
import { sameArea } from './npcAvailability';
import { adjacentPlaces } from './mapIntel';
import { getSect } from './sect';
import { accrueStipend } from './sectRitual';

/** 世界提醒：現在天下正發生／即將發生什麼、附近有誰。 */
export function buildReminders(state: FanrenWorldState): WorldReminder[] {
  const out: WorldReminder[] = [];
  const day = state.clock.totalDays;
  const region = getRegion(state.currentLocationId);
  out.push({ kind: 'time', text: `${formatTime(state.clock)}，你身處${region?.name || state.currentLocationId}。` });

  // 宗門事務：盛事開放／月俸積欠（個人化、優先呈現）
  if (state.sect) {
    const sect = getSect(state.sect.sectId);
    if (sect) {
      const ev = state.sectEvent;
      if (ev && ev.sectId === state.sect.sectId && day <= ev.endDay) {
        out.push({ kind: 'sect', text: `宗門盛事「${ev.title}」開放中，可往「宗門」參與。`, relatedId: ev.sectId });
      }
      const st = accrueStipend(state.sect, sect, day);
      if (st && st.months >= 1) out.push({ kind: 'sect', text: `${sect.name}已積欠你 ${st.months} 月例俸（約 ${st.stones} 石），可往「宗門」支領。` });
    }
  }

  // 即將/正在發生的正史事件（依進度章號過濾劇透）
  // 大事件維持 5 年視窗；逐章節拍（tier=beat）量大，只取「最近已發生 1 條＋即將發生 2 條」避免提醒洪水。
  const nearAll = eventsNear(day, 365 * 5);
  const nearMajors = nearAll.filter((e) => e.tier !== 'beat');
  const beatFiredRecent = nearAll
    .filter((e) => e.tier === 'beat' && state.worldEventStates[e.id]?.fired && !state.worldEventStates[e.id]?.diverged)
    .slice(-1);
  const beatUpcoming = nearAll
    .filter((e) => e.tier === 'beat' && e.scheduledDay > day && !state.worldEventStates[e.id]?.fired && !state.worldEventStates[e.id]?.diverged)
    .slice(0, 2);
  const near = [...nearMajors, ...beatFiredRecent, ...beatUpcoming];
  for (const ev of near) {
    if (ev.spoilerLevel > spoilerBudget(state.progressChapter)) continue;
    const evState = state.worldEventStates[ev.id];
    if (evState?.diverged) continue;
    const dd = ev.scheduledDay - day;
    if (evState?.fired) {
      out.push({ kind: 'world_event', text: `天下近聞：${ev.title}已然發生。`, relatedId: ev.id });
    } else if (dd > 0) {
      const when = dd > 360 ? `約${Math.round(dd / 360)}年後` : dd > 30 ? `約${Math.round(dd / 30)}月後` : `近日`;
      out.push({ kind: 'opportunity', text: `風聲：${when}，${ev.locationId}一帶恐有大事——${ev.title}。`, relatedId: ev.id });
    }
  }

  // 附近 NPC
  for (const id in state.npcStates) {
    const rt = state.npcStates[id];
    if (rt.locationId !== state.currentLocationId) continue;
    if (rt.status === 'dead' || rt.status === 'unknown') continue;
    const npc = getNpc(id);
    if (!npc) continue;
    if (npc.importance === 'protagonist') continue; // 原著主角不列入「附近」雜訊（仍可主動尋訪）
    if (npc.firstChapter > state.progressChapter + 30) continue; // 尚未該登場
    out.push({ kind: 'npc_nearby', text: `${npc.name}（${rt.realm}）似在此處附近。`, relatedId: id });
  }

  // 鄰近地點的 NPC（依地圖連結）
  const adj = adjacentPlaces(state.currentLocationId);
  if (adj.length) {
    for (const id in state.npcStates) {
      const rt = state.npcStates[id];
      if (rt.locationId === state.currentLocationId) continue;
      if (rt.status === 'dead' || rt.status === 'unknown') continue;
      const match = adj.find((a) => a === rt.locationId || a.includes(rt.locationId) || rt.locationId.includes(a));
      if (!match) continue;
      const npc = getNpc(id);
      if (!npc || npc.importance === 'protagonist') continue;
      if (npc.firstChapter > state.progressChapter + 30) continue;
      out.push({ kind: 'npc_nearby', text: `${npc.name}（${rt.realm}）似在鄰近的${match}一帶。`, relatedId: id });
    }
  }

  // 韓立正史行跡：背景中「火魔」韓立正闖的試煉（凸顯主角自走、修仙之難；依進度劇透過濾）
  const flavor = hanliFlavorAt(day, state.progressChapter);
  if (flavor) {
    out.push({ kind: 'world_event', text: flavor });
    // 玩家恰與韓立同處一地、同闖一關 → 遊戲性鉤子（同台競爭或避其鋒芒）
    const ht = hanliCurrentTrial(day);
    if (ht && sameArea(ht.locationId, state.currentLocationId)) {
      out.push({
        kind: 'opportunity',
        text: ht.playerHook
          ? `你正身處「${ht.title}」的風暴中心——${ht.playerHook}`
          : `你正身處「${ht.title}」之地，此關非「${ht.realmGate}」以上難以善了，韓立亦在其中博命。`,
        relatedId: ht.id,
      });
    }
  }

  return out.slice(0, 10);
}

/** 進度章號 → 可見劇透層級預算。 */
function spoilerBudget(chapter: number): number {
  if (chapter >= 1900) return 3;
  if (chapter >= 1180) return 2;
  if (chapter >= 500) return 1;
  return 0;
}

/** 記憶回憶：依關鍵字回溯，或摘要重點往事。 */
export function recall(memory: MemoryEntry[], query?: string): string {
  if (!memory.length) return '你的識海中尚無值得回溯的往事。';
  let pool = memory;
  if (query && query.trim()) {
    const q = query.trim();
    pool = memory.filter((m) => m.summary.includes(q) || m.tags.some((t) => t.includes(q) || q.includes(t)));
    if (!pool.length) return `識海回溯：並無與「${q}」相關的清晰記憶。`;
  } else {
    // 無查詢：重點 + 最近
    const important = memory.filter((m) => m.important);
    const recent = memory.slice(-5);
    const merged = [...important, ...recent];
    const seen = new Set<number>();
    pool = merged.filter((m) => (seen.has(m.day) ? false : (seen.add(m.day), true)));
  }
  const lines = pool
    .slice(-12)
    .map((m) => `· 第${Math.floor(m.day / 360) + 1}年：${m.summary}${m.important ? '（要事）' : ''}`);
  return `【識海回溯】\n${lines.join('\n')}`;
}

/** 產生一條記憶。 */
export function makeMemory(day: number, summary: string, tags: string[], important = false): MemoryEntry {
  return { day, summary, tags, important };
}
