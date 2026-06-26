/** 洞府：聚靈陣修煉加成、取得身分/境界判定、藥園成熟、開闢地點規則（靈氣/勢力保護/不可移動/單一）。 */
import type { FanrenWorldState, AbodeDef } from '../types';
import { getAbode } from '../data/abodes';
import { realmRank } from './daoyuanLoader';
import { lingMaiOf } from './lingMai';
import { hasMarketAt } from './mapGate';
import { isAtSectHome } from './sectRitual';
import { getSect } from './sect';
import { findMapNode } from './mapIntel';
import { sectSiteOf } from './sectSites';

/** 洞府聚靈陣帶來的閉關修煉加成（+%，0..1）。 */
export function abodeCultivationBonus(world: FanrenWorldState): number {
  return world.abode?.spiritArray || 0;
}

/** 是否符合洞府取得條件（身分/境界/門派）。 */
export function canAcquireAbode(abodeId: string, playerRealm: string, originSectId: string | null): { ok: boolean; reason: string } {
  const a = getAbode(abodeId);
  if (!a) return { ok: false, reason: '查無此洞府。' };
  if (a.realmReq && realmRank(playerRealm) < realmRank(a.realmReq)) {
    return { ok: false, reason: `此洞府靈脈雄渾，需 ${a.realmReq} 以上修為方能駕馭。` };
  }
  if (a.identityReq) {
    if (a.identityReq.includes('長老') && realmRank(playerRealm) < realmRank('金丹期')) {
      return { ok: false, reason: '長老洞府須結丹以上的門中長老身分，你尚不夠格。' };
    }
    if (!originSectId) {
      return { ok: false, reason: `此洞府須「${a.identityReq}」身分——你並無門派身分可憑，散修無從入住。` };
    }
  }
  return { ok: true, reason: '' };
}

/** 藥園靈藥成熟所需天數（聚靈陣越強越快）。 */
export function gardenMatureDays(spiritArray: number): number {
  return Math.max(90, Math.round(360 * (1 - spiritArray * 0.5)));
}

/**
 * 此地是否在「勢力保護範圍」內——城鎮坊市、修仙/魔道宗門所在、或有勢力盤踞之地。
 * 保護之地較安全、但開府須向當地勢力納租／庇護費；荒僻野外無人庇護，須自行布陣禦敵。
 */
export function isProtectedLocation(world: FanrenWorldState): boolean {
  const loc = world.currentLocationId;
  // 「保護範圍」＝人煙聚集的城鎮坊市、或你自身宗門的本門所在（須納租／庇護費、較安全）。
  // 註：不以節點 factions 標記為準——荒山野谷常列鄰近勢力之名，卻非真有人坐鎮庇護。
  if (hasMarketAt(loc)) return true;
  const sect = world.sect ? getSect(world.sect.sectId) : undefined;
  if (sect && isAtSectHome(loc, sect)) return true;
  if (sectSiteOf(loc)?.facilities.some((f) => f.kind === '護山大陣')) return true; // 修仙門派護山大陣＝有人坐鎮庇護
  return false;
}

export interface EstablishCheck { ok: boolean; reason: string; isProtected: boolean; lingMaiName: string; lingMaiGrade: number }
/**
 * 能否於「當前所在地」開闢此類洞府。規則（依使用者設定）：
 *  · 洞府須建於「有靈氣之處」——凡地（grade 0）無從聚靈開府（坊市靈房例外，靠人工禁制，但須在坊市）。
 *  · 類型須與地相符：坊市靈房須有坊市；城內洞府須城邑；宗門洞府須在本門；野外洞府須無主荒野靈脈；秘境洞府須洞天福地。
 *  · 勢力保護範圍內須收費（庇護租金）；野外則無人庇護。
 */
export function canEstablishAbodeHere(world: FanrenWorldState, abode: AbodeDef): EstablishCheck {
  const loc = world.currentLocationId;
  const lm = lingMaiOf(loc);
  const prot = isProtectedLocation(world);
  const base = { isProtected: prot, lingMaiName: lm.name, lingMaiGrade: lm.grade };
  const market = hasMarketAt(loc);

  if (abode.locationKind === '坊市') {
    if (!market) return { ok: false, reason: '此處無坊市，無客棧靈房可租——須往城鎮坊市或宗門坊市落腳。', ...base };
  } else {
    // 真正的洞府：須有靈氣（凡地不可開府）
    if (lm.grade < 1) return { ok: false, reason: `此地乃「${lm.name}」、幾無靈氣，無從聚靈開府——洞府須擇有靈脈靈氣之地而建。`, ...base };
  }

  switch (abode.locationKind) {
    case '城內':
      if (!market) return { ok: false, reason: '此地非城邑坊市，無從購置城內洞府——須往修士城鎮。', ...base };
      break;
    case '宗門': {
      const sect = world.sect ? getSect(world.sect.sectId) : undefined;
      if (!sect) return { ok: false, reason: '你並無宗門身分，無從分得宗門洞府。', ...base };
      if (!isAtSectHome(loc, sect)) return { ok: false, reason: `宗門洞府須於本門「${sect.name}」之內方得分配入住——你此刻不在門中。`, ...base };
      break;
    }
    case '野外': {
      if (prot) return { ok: false, reason: '此地已在城鎮／勢力盤踞範圍內，非無主荒野——野外靈脈洞府須往荒僻無主的靈脈之地自行尋占。', ...base };
      // 靈脈須足以支撐此洞府的聚靈陣：上品靈脈洞府等須上品（grade≥4）靈脈，尋常野外洞府須下品（grade≥2）以上。
      const needGrade = abode.spiritArray >= 0.5 ? 4 : 2;
      if (lm.grade < needGrade) return { ok: false, reason: `此處乃「${lm.name}」、靈氣未及——「${abode.name}」須擇 ${needGrade >= 4 ? '上品' : '下品'}以上靈脈之地方可開闢。`, ...base };
      break;
    }
    case '秘境福地': {
      const node = findMapNode(loc);
      const blessed = lm.grade >= 5 || /福地|洞天|秘境/.test(node?.name || '');
      if (!blessed) return { ok: false, reason: '此地非洞天福地——秘境洞府唯洞天福地、極品靈脈之所方有，可遇不可求。', ...base };
      break;
    }
  }
  return { ok: true, reason: '', ...base };
}
