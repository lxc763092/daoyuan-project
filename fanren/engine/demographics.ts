/**
 * 活世界人口模型：背景散修／小人物的自然繁衍與殞落，使世界不致「空空如也」。
 *
 * 鐵則——絕不影響正史走向：
 *  - 只維護 world.population（一個抽象的背景修士族群計數）與少量「天下近聞」敘事。
 *  - 從不讀寫 npcStates / worldEventStates / divergences——正史 NPC 與正史事件一概不碰。
 *  - 玩家若主動干預（如提前機緣、級聯效應）才會改寫正史，那是另一套系統的事。
 */
import type { FanrenWorldState, WorldPopulation } from '../types';
import { dayToChapter } from './clock';
import { genName, genFactionName, realmForTier } from './procGen';

export type { WorldPopulation };

const BASE_POP = 800; // 初始背景修士族群基數

export function initPopulation(day: number): WorldPopulation {
  return { total: BASE_POP, cumulativeBirths: 0, cumulativeDeaths: 0, lastTickDay: day };
}

export interface DemographicTick {
  population: WorldPopulation;
  lines: string[]; // 供「天下近聞」敘事的人口動態（無正史劇透）
}

/**
 * 推進背景人口：依流逝年數產生新生／殞落，淨值受承載量調節（世界緩慢生長、不致爆炸或滅絕），
 * 並偶爾產出敘事點綴。完全不觸碰正史狀態。
 */
export function tickDemographics(
  world: FanrenWorldState,
  newDay: number,
  regionName: string
): DemographicTick {
  const pop = world.population || initPopulation(world.clock?.totalDays ?? newDay);
  const years = (newDay - pop.lastTickDay) / 360;
  if (years < 0.25) return { population: pop, lines: [] }; // 不足一季不結算（避免每回合洗版）

  // 人口承載量隨進度（劇情推進、靈氣復甦、新地開拓）緩升
  const carrying = BASE_POP + dayToChapter(newDay) * 0.6;
  const pressure = pop.total / carrying; // 接近承載量則出生放緩、死亡略增
  const cappedYears = Math.min(years, 60); // 長期閉關時也不致一次暴增百年人口

  const births = Math.max(0, Math.round(cappedYears * (6 + Math.random() * 6) * Math.max(0.2, 1.2 - 0.5 * pressure)));
  const deaths = Math.max(0, Math.round(cappedYears * (5 + Math.random() * 5) * (0.8 + 0.4 * pressure)));
  const total = Math.max(120, pop.total + births - deaths);

  const lines: string[] = [];
  // 少量敘事點綴（最多 ~2 條），時間跨度越大越可能出現
  const verbosity = Math.min(0.7, 0.25 + years * 0.15);
  if (deaths > 0 && Math.random() < verbosity) {
    const realm = realmForTier('human', '炼气期');
    lines.push(`【天下近聞】${regionName}一帶，${realm}散修${genName()}壽元耗盡、坐化而去，留下些許遺澤，待有緣人。`);
  }
  if (births > 0 && Math.random() < verbosity) {
    const into = Math.random() < 0.5 ? `「${genFactionName()}」` : '一處散修洞府';
    lines.push(`【天下近聞】${regionName}近來又有後輩嶄露頭角，少年${genName()}靈根不俗，已入${into}門牆。`);
  }
  if (years > 2 && Math.random() < 0.18) {
    lines.push(`【天下近聞】聽聞${regionName}外圍，一夥散修新近結社「${genFactionName()}」，雖人單勢薄，倒也自成一格。`);
  }
  // 散修亦在成長：苦修經年者偶有破境，世間修士的戰力隨境界水漲船高（與玩家同理）
  if (years > 4 && Math.random() < 0.16) {
    const r = Math.round(years);
    lines.push(`【天下近聞】苦修${r}載，${regionName}散修${genName()}終破一境關隘，法力較往昔暴漲一截，於同輩中隱隱拔尖——大境界一分，戰力天壤之別。`);
  }

  return {
    population: {
      total,
      cumulativeBirths: pop.cumulativeBirths + births,
      cumulativeDeaths: pop.cumulativeDeaths + deaths,
      lastTickDay: newDay,
    },
    lines,
  };
}
