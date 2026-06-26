/**
 * 環境感知的「秘境／探索之地」生成：秘境是對「周邊地區」的探索冒險，須與所在環境相稱——
 * 凡俗武林門派（如七玄門，靈氣稀薄、人界低階）周邊只會有後山獸窟、廢礦、亂葬崗之類的鄉野險地，
 * 絕不會憑空冒出「雷罰煉獄」這等金丹級絕地。靈脈越濃、界層越高，方有上古遺跡乃至焚天魔淵。
 *
 * 由「所在地靈脈品階 + 界層」推「地域強度」，據此封頂風險等級與境界要求、並挑選相稱主題；
 * 名稱／敘述綴以周邊地名，讀來如探索此方天地的鄰近之境。
 */
import type { SecretRealm } from '../../types';
import { RealmType } from '../../types';
import { REALM_ORDER } from '../../constants/index';
import { lingMaiOf } from './lingMai';
import { findMapNode } from './mapIntel';
import { getRegion } from './daoyuanLoader';

type Risk = '低' | '中' | '高' | '极度危险';
const RISKS: Risk[] = ['低', '中', '高', '极度危险'];

// 界層加成（人界低、靈界/魔界中、仙界高）
const TIER_BONUS: Record<string, number> = { human: 0, spirit: 2, demon: 2, immortal: 4 };

// 主題池：4 檔（鄉野 → 中階 → 上古 → 絕地），越後越凶險高階
const THEMES: string[][] = [
  ['後山獸窟', '廢棄礦洞', '亂葬崗', '山賊巢穴', '枯井秘窟', '密林深處', '破廟遺址', '溪谷岩窟', '溶洞暗河', '野墳古塚', '獵戶禁地', '荒村廢墟'],
  ['靈獸谷', '廢棄洞府', '毒瘴密林', '靈礦廢坑', '古修士洞府', '試煉石窟', '妖獸巢穴', '迷霧林', '蛇蟒沼澤', '亂葬靈塚'],
  ['上古遺跡', '劍冢', '星辰遺跡', '古戰場', '傳承秘殿', '火脈深淵', '萬獸山脈', '寒冰絕地', '龍脈之地'],
  ['雷罰煉獄', '萬妖窟', '魔淵', '上古禁地', '靈眼秘境', '焚天火域', '九幽地脈'],
];
const DESCS: string[] = [
  '凡俗獵戶與山民口耳相傳的險地，妖獸與匪類出沒，偶有零星機緣，適合初入仙途者歷練。',
  '靈氣略豐的廢棄之地，藏有前人遺澤，亦有妖獸盤踞，凶險與機緣並存。',
  '上古遺留的險境，靈寶與傳承並存，守護之物非同小可，非有相當修為者勿入。',
  '天地異象匯聚的絕地，稍有不慎便形神俱滅，然其中至寶足以動人心魄。',
];
const DROPS: string[][] = [
  ['草藥', '獸皮', '凡鐵', '靈石碎', '粗陋符籙', '野獸內丹', '尋常礦石', '陳舊典籍'],
  ['靈草', '妖獸材料', '下品法器', '丹方殘頁', '靈石', '獸丹', '基礎功法'],
  ['稀有靈藥', '殘破靈寶', '功法傳承', '築基丹材', '妖丹', '劍意草', '中品法器'],
  ['仙品丹材', '上古傳承', '天階功法', '至寶', '本命法寶胚', '極品靈石'],
];

function rnd<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randId(): string { return Math.random().toString(36).slice(2, 9); }

/** 由「界層 + 靈脈品階」推地域強度（0 凡俗 → ~10 仙域靈眼）。 */
function areaPowerOf(locationId: string): { power: number; lingMaiName: string; areaName: string } {
  const lm = lingMaiOf(locationId);
  const node = findMapNode(locationId);
  const tier = node?.tier || 'human';
  const power = (TIER_BONUS[tier] ?? 0) + lm.grade;
  const areaName = getRegion(locationId)?.name || node?.name || '此地';
  return { power, lingMaiName: lm.name, areaName };
}

/** 地域強度 → 主題／風險／境界檔位（0..3）。 */
function bucketOf(power: number): number {
  if (power <= 1) return 0; // 凡俗鄉野（七玄門等靈氣稀薄之地）
  if (power <= 3) return 1; // 尋常修仙之地
  if (power <= 5) return 2; // 靈氣雄渾／高階區域
  return 3; // 靈眼／仙魔絕地
}

// 各檔位可達的最高境界要求 index（炼气0 筑基1 金丹2 元婴3 化神4 合道5 长生6）
const CAP_REALM_IDX = [1, 2, 4, 6];

/**
 * 生成與所在環境相稱的探索秘境。
 * @param locationId 當前所在地（決定地域強度與主題）
 * @param playerRealm 玩家境界（門檻不致過於懸殊）
 */
export function generateLocalSecretRealms(locationId: string, playerRealm: RealmType, count = 6): SecretRealm[] {
  const { power, areaName } = areaPowerOf(locationId);
  const bucket = bucketOf(power);
  const maxRiskIdx = bucket; // 鄉野僅「低」，絕地方有「极度危险」
  const capRealmIdx = CAP_REALM_IDX[bucket];
  const playerIdx = Math.max(0, REALM_ORDER.indexOf(playerRealm));

  const out: SecretRealm[] = [];
  const usedNames = new Set<string>();
  for (let i = 0; i < count; i++) {
    // 風險：0..maxRiskIdx，略偏低風險
    const riskIdx = Math.min(maxRiskIdx, Math.floor(Math.random() * (maxRiskIdx + 1.3)));
    const risk = RISKS[riskIdx];

    // 境界要求：受地域檔位封頂、且不超玩家太多
    const hi = Math.min(playerIdx + 1, capRealmIdx);
    const lo = Math.min(Math.max(0, playerIdx - 1), hi);
    const realmIdx = lo + Math.floor(Math.random() * (hi - lo + 1));
    const minRealm = REALM_ORDER[realmIdx] as RealmType;

    // 主題檔位：以地域檔為主，高風險者偶爾上探一檔
    const themeBucket = Math.min(3, bucket + (riskIdx >= maxRiskIdx && Math.random() < 0.3 ? 1 : 0));
    let theme = rnd(THEMES[themeBucket]);
    let tries = 0;
    while (usedNames.has(theme) && tries++ < 6) theme = rnd(THEMES[themeBucket]);
    usedNames.add(theme);
    // 名稱綴以周邊地名，讀來如探索鄰近之境
    const name = Math.random() < 0.65 ? `${areaName}周邊・${theme}` : theme;

    const baseCost = 40 + realmIdx * 60;
    const riskMult = [0.8, 1, 1.5, 2][riskIdx];
    const cost = Math.floor(baseCost * riskMult * (0.9 + Math.random() * 0.2));

    const pool = DROPS[themeBucket];
    const dropCount = 2 + Math.floor(Math.random() * 3);
    const drops: string[] = [];
    const usedDrops = new Set<string>();
    for (let j = 0; j < dropCount; j++) {
      let d = rnd(pool);
      let dt = 0; while (usedDrops.has(d) && dt++ < 6) d = rnd(pool);
      usedDrops.add(d); drops.push(d);
    }

    out.push({
      id: `realm-${randId()}`,
      name,
      description: `${areaName}周邊，${DESCS[themeBucket]}`,
      minRealm,
      cost,
      riskLevel: risk,
      drops,
    });
  }
  return out;
}
