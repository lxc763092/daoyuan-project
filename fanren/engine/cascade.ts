/**
 * 時間線級聯（蝴蝶效應）：玩家提前處置某機緣（取走/破壞/介入）後，
 * 依「震幅」改寫後續正史——取消事件、改變受牽連 NPC 的命運（死/自由/偏移）、
 * 撼動勢力格局。震幅越大，被改寫的命運越廣、相關角色越「自由」（脫離正史軌道）。
 */
import type { FanrenWorldState, HiddenOpportunity, OpportunityAction, NpcRuntimeState } from '../types';
import { getNpc, spoilerBudget } from './daoyuanLoader';
import { sameArea } from './npcAvailability';
import { chapterToDay } from './clock';
import { HIDDEN_OPPORTUNITIES, getOpportunity } from '../data/hiddenOpportunities';
import { RELATION_LABEL } from './alliances';

export { getOpportunity };

export function magnitudeLabel(m: number): string {
  if (m >= 60) return '時間線震幅·巨';
  if (m >= 30) return '時間線震幅·中';
  if (m >= 10) return '時間線震幅·微';
  return '幾無波瀾';
}

/** 探索/抵達時，依「所在大區 × 仍在提前窗口內 × 未處置 × 劇透預算」浮現一樁機緣。 */
export function findAvailableOpportunity(
  world: FanrenWorldState,
  locationId: string,
  day: number,
  luck: number,
  rnd: number,
  progressChapter: number
): HiddenOpportunity | undefined {
  const claimed = new Set(world.claimedOpportunityIds || []);
  const budget = spoilerBudget(progressChapter);
  const candidates = HIDDEN_OPPORTUNITIES.filter(
    (o) => !claimed.has(o.id) && day < chapterToDay(o.canonChapter) && (o.spoilerLevel ?? 0) <= budget && sameArea(o.regionId, locationId)
  );
  if (!candidates.length) return undefined;
  const chance = Math.min(0.6, 0.22 + (luck || 0) * 0.03);
  if (rnd > chance) return undefined;
  return candidates[Math.floor(rnd * 997) % candidates.length];
}

export interface CascadeResult {
  patch: Partial<FanrenWorldState>;
  treasures: { name: string; type?: string; rarity?: string; quantity: number }[];
  logLines: string[];
  magnitude: number;
  summary: string;
}

/** 套用某機緣行動的時間線級聯。 */
export function applyCascade(world: FanrenWorldState, opp: HiddenOpportunity, action: OpportunityAction, day: number): CascadeResult {
  const mag = action.magnitude;
  const c = action.cascade;
  const worldEventStates = { ...world.worldEventStates };
  const npcStates = { ...world.npcStates };
  const factionStates: Record<string, any> = { ...world.factionStates };
  const affectedEventIds: string[] = [];
  const affectedNpcIds: string[] = [];
  const logLines: string[] = [];

  if (c?.cancelEventIds) {
    for (const eid of c.cancelEventIds) {
      worldEventStates[eid] = { id: eid, fired: worldEventStates[eid]?.fired ?? false, diverged: true, outcomeNote: `因你提前介入「${opp.name}」而改寫` };
      affectedEventIds.push(eid);
    }
  }
  if (c?.npcFates) {
    for (const f of c.npcFates) {
      if (mag < (f.minMagnitude ?? 0)) continue; // 震幅未及，不觸發此人命運改變
      const npc = getNpc(f.npcId);
      if (!npc) continue;
      const cur: NpcRuntimeState = npcStates[npc.id] || { id: npc.id, realm: '', locationId: '', status: 'unknown', relationship: 0, knownToPlayer: false, diverged: false, lastSyncDay: day };
      npcStates[npc.id] = { ...cur, status: f.fate === 'dead' ? 'dead' : cur.status, diverged: true, divergenceNote: f.note };
      affectedNpcIds.push(npc.id);
      const tag = f.fate === 'dead' ? '✦【殞】' : f.fate === 'freed' ? '✦【脫離正史·命運自主】' : f.fate === 'spared' ? '✦【倖存】' : '✦【命運偏移】';
      logLines.push(`${tag}${npc.name}：${f.note}`);
    }
  }
  if (c?.factionShifts) {
    for (const fs of c.factionShifts) {
      const prev = factionStates[fs.name] || { id: fs.name, name: fs.name };
      const next: any = { ...prev, status: fs.status || prev.status, note: fs.note ?? prev.note };
      // 合縱／連橫：改寫此宗對某宗的關係（同盟/世仇/聯姻…）
      if (fs.setRelation) {
        next.relations = { ...(prev.relations || {}), [fs.setRelation.with]: fs.setRelation.to };
        logLines.push(`◈ ${fs.name} 與 ${fs.setRelation.with}：關係轉為「${RELATION_LABEL[fs.setRelation.to] || fs.setRelation.to}」`);
      }
      if (fs.joinAlliance) { next.allianceId = fs.joinAlliance; logLines.push(`◈ ${fs.name} 歸入「${fs.joinAlliance}」`); }
      if (fs.leaveAlliance) { next.allianceId = undefined; logLines.push(`◈ ${fs.name} 脫離聯盟自立`); }
      factionStates[fs.name] = next;
      if (!fs.setRelation && !fs.joinAlliance && !fs.leaveAlliance) logLines.push(`◈ ${fs.name}：${fs.note || fs.status || ''}`);
    }
  }

  const divergence = {
    id: `dv-opp-${opp.id}-${day}`,
    day,
    cause: `提前機緣「${opp.name}」：${action.label}`,
    affectedEventIds,
    affectedNpcIds,
    note: c?.worldNote || action.note,
    magnitude: mag,
  };

  const patch: Partial<FanrenWorldState> = {
    worldEventStates,
    npcStates,
    factionStates: factionStates as any,
    divergences: [...world.divergences, divergence],
    claimedOpportunityIds: Array.from(new Set([...(world.claimedOpportunityIds || []), opp.id])),
  };
  const treasures = action.grantsTreasure && opp.treasures ? opp.treasures : [];
  const summary = `${action.note}${c?.worldNote ? `\n\n${c.worldNote}` : ''}${logLines.length ? `\n\n${logLines.join('\n')}` : ''}`;
  return { patch, treasures, logLines, magnitude: mag, summary };
}
