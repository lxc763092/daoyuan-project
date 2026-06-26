/**
 * 任務/委託：懸賞榜給玩家方向與動機。懸賞獵殺/宗門/尋寶/仇殺/護送/採集。
 * 純邏輯：產生懸賞榜（授權模板＋程序生成）、接取、依行動推進、結算獎勵。
 * 狀態存 world.quests；wiring 於 turnEngine/worldStore。
 */
import type { QuestDef, ActiveQuest, QuestReward } from '../types';
import { genMonster, genName, genFactionName } from './procGen';
import { rngFor } from './registry';

export const QUEST_TYPES = ['懸賞', '宗門', '尋寶', '仇殺', '護送', '採集'] as const;

// 基礎任務模板（fallback）；agent 授權模板由 setQuestTemplates 併入。
export const FALLBACK_QUESTS: QuestDef[] = [
  { id: 'fq_bounty1', title: '獵殺擾境妖獸', type: '懸賞', realmReq: '炼气期', giver: '坊市公會', objective: '剿滅近郊一頭傷人妖獸', reward: '靈石與材料', hook: '【懸賞】近郊妖獸傷人奪畜，公會懸賞取其妖丹，膽大者揭榜。' },
  { id: 'fq_collect1', title: '採集靈藥', type: '採集', realmReq: '炼气期', giver: '丹閣', objective: '採回三株指定靈藥', reward: '靈石與丹方', hook: '【委託】丹閣急需靈藥入藥，採回者另贈丹方一紙。' },
  { id: 'fq_hunt1', title: '緝拿魔修', type: '仇殺', realmReq: '筑基期', giver: '正道聯盟', objective: '誅殺一名作惡魔修', reward: '靈石與正道聲望', hook: '【通緝】某魔修血洗散修洞府，正道高懸賞格，取其首級者重酬。' },
  { id: 'fq_treasure1', title: '古洞尋寶', type: '尋寶', realmReq: '筑基期', giver: '殘卷線索', objective: '循殘圖尋一處古修洞府', reward: '洞府遺寶', hook: '【尋寶】一卷殘破玉圖標著古修洞府的方位，寶藏或仍封存其中。' },
  { id: 'fq_escort1', title: '護送商隊', type: '護送', realmReq: '炼气期', giver: '商團', objective: '護一支商隊安抵鄰城', reward: '靈石酬勞', hook: '【護送】商團懸賞護衛，途經妖獸出沒之地，須有修為傍身者。' },
];

let TEMPLATES: QuestDef[] = FALLBACK_QUESTS.slice();
export function setQuestTemplates(authored: QuestDef[]): void {
  if (!authored || !authored.length) return;
  const seen = new Set(FALLBACK_QUESTS.map((q) => q.id));
  TEMPLATES = [...FALLBACK_QUESTS, ...authored.filter((q) => q && q.id && !seen.has(q.id))];
}

const REALM_RANK: Record<string, number> = { 炼气期: 0, 煉氣期: 0, 筑基期: 1, 築基期: 1, 结丹期: 2, 結丹期: 2, 金丹期: 2, 元婴期: 3, 元嬰期: 3, 化神期: 4 };
function rankOf(r: string): number { return REALM_RANK[r] ?? 0; }

/** 結算獎勵（依類型與境界決定性產生）。 */
export function rewardFor(type: string, realmRank: number, rng: () => number): QuestReward {
  const stones = Math.round((25 + realmRank * 40) * (1 + rng()));
  const exp = Math.round((realmRank + 1) * 60 * (0.6 + rng()));
  const r: QuestReward = { stones, exp };
  if (type === '仇殺' || type === '懸賞') r.righteous = 6 + realmRank * 3;
  if (type === '宗門') r.contribution = 20 + realmRank * 15;
  if (type === '尋寶' || type === '懸賞') r.itemTier = realmRank;
  return r;
}

/** 產生懸賞榜：授權/基礎模板（依境界過濾）＋ 程序生成補滿，依日期 seed 穩定。 */
export function generateBoard(day: number, regionName: string, playerRealm: string, count = 6): QuestDef[] {
  const rank = rankOf(playerRealm);
  const rng = rngFor('quests:' + Math.floor(day / 90) + ':' + regionName); // 每季一輪
  const pool = TEMPLATES.filter((q) => rankOf(q.realmReq) <= rank + 1);
  const out: QuestDef[] = [];
  // 取若干模板
  const shuffled = pool.slice().sort(() => rng() - 0.5).slice(0, Math.min(count - 2, pool.length));
  out.push(...shuffled.map((q) => ({ ...q, region: q.region || regionName })));
  // 程序生成補滿（懸賞獵殺＋採集）
  while (out.length < count) {
    const isHunt = rng() < 0.6;
    if (isHunt) {
      const mon = genMonster('human', playerRealm);
      out.push({ id: 'pg_' + Math.floor(rng() * 1e9).toString(36), title: `懸賞・${mon.name}`, type: '懸賞', realmReq: playerRealm, region: regionName, giver: rng() < 0.5 ? '坊市公會' : genName() + '散人', objective: `剿滅盤踞${regionName}的「${mon.name}」（${mon.realm}）`, reward: '靈石與妖材', hook: `【懸賞】「${mon.name}」屢屢傷人，${regionName}懸賞取其妖丹，揭榜者重酬。` });
    } else {
      out.push({ id: 'pg_' + Math.floor(rng() * 1e9).toString(36), title: '宗門外務', type: rng() < 0.5 ? '採集' : '護送', realmReq: playerRealm, region: regionName, giver: genFactionName(), objective: `為${regionName}一方勢力辦一樁外務`, reward: '靈石與貢獻', hook: `【委託】${regionName}有勢力張榜募人辦事，事成酬以靈石。` });
    }
  }
  return out;
}

export function targetCountFor(type: string): number {
  if (type === '懸賞' || type === '仇殺') return 1;
  if (type === '採集') return 3;
  return 1;
}

/** 玩家本回合行動是否推進某進行中任務（簡易啟發式）。 */
export function progressFor(quest: ActiveQuest, intentType: string, regionName: string): number {
  const inRegion = !quest.region || quest.region === regionName;
  if (!inRegion) return 0;
  if ((quest.type === '懸賞' || quest.type === '仇殺') && intentType === 'fight') return 1;
  if (quest.type === '採集' && intentType === 'explore') return 1;
  if (quest.type === '尋寶' && (intentType === 'explore' || intentType === 'travel')) return 1;
  if (quest.type === '護送' && intentType === 'travel') return 1;
  if (quest.type === '宗門' && (intentType === 'explore' || intentType === 'craft')) return 1;
  return 0;
}
