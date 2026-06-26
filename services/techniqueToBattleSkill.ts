/**
 * 功法 → 戰鬥技能橋接器：把玩家已學的「原著具名功法」(world.techniques) 即時展開成可用的 BattleSkill[]。
 *
 * 解決「功法歸納」與「戰鬥」兩大問題的核心：原本 canon 功法只給被動屬性，戰鬥中一招都放不出來；
 * 此處依 功法 category（御劍/體修/神識/馭獸/符籙/陣法/雷法/丹器/心法/身法…）、已修層數、
 * 已解鎖神通(neigong)、與五行屬性，生成「真正能在回合制戰鬥中施放」且帶五行屬性的技能。
 *
 * 設計重點（已對齊 battleService 實際honored的機制）：
 *  - 傷害走頂層 damage（base/multiplier/type/crit/element），buff/debuff 走 effects。
 *  - 只用引擎真正會生效的 buff 欄位：crit / critDamage / dodge / damageReduction / regen；
 *    flat 的 attack/defense/speed buff 在玩家路徑不生效，故不採用。
 *  - DoT 只認 poison/burn（每回合掉血），馭獸→poison、陣法/神識→burn。
 *  - freeze/stun/weakness 等 debuff 引擎無實作，不生成（避免「假技能」）。
 */
import type { BattleSkill } from '../types';
import type { SpiritualRootType } from '../constants/spiritualRoots';
import type { LearnedTechnique, TechniqueDef } from '../fanren/types';
import { getTechnique } from '../fanren/data/techniques';

/** 本地化的大境界階序（與 canonLoader.realmRank 同邏輯，但不引入其龐大 canon 資料依賴）。 */
function realmRankLocal(realm: string | undefined): number {
  const r = realm || '';
  if (/真仙|仙界/.test(r)) return 11;
  if (/渡劫/.test(r)) return 10;
  if (/大乘|長生|长生/.test(r)) return 9;
  if (/合體|合体|合道/.test(r)) return 8;
  if (/煉虛|炼虚|煉虚|炼虛/.test(r)) return 7;
  if (/化神/.test(r)) return 6;
  if (/元嬰|元婴/.test(r)) return 5;
  if (/結丹|结丹|金丹/.test(r)) return 4;
  if (/築基|筑基/.test(r)) return 3;
  if (/煉氣|炼气|煉气|炼氣/.test(r)) return 2;
  if (/凡人|普通人|未修/.test(r)) return 1;
  return 0;
}

/** 由 def 推 element：優先 def.element，其次 category/name/desc 關鍵字。神識/身法/煉體類可無屬性。 */
function inferElement(def: TechniqueDef): SpiritualRootType | undefined {
  if (def.element) return def.element;
  const t = (def.name || '') + (def.desc || '');
  if (def.category === 'thunder' || /雷霆|雷霄|庚金|純金|纯金/.test(t)) return 'metal';
  if (/火|焰|炎|純陽|纯阳|赤焰|三昧/.test(t)) return 'fire';
  if (/水|冰|寒|霜|陰煞|阴煞|玄冰/.test(t)) return 'water';
  if (/木|青元|長春|长春|生機|生机|草木|藤/.test(t)) return 'wood';
  if (/土|磁|戊土|岩|山/.test(t)) return 'earth';
  if (def.category === 'sword') return 'metal'; // 劍修預設金（庚金劍氣）
  if (def.category === 'beast') return 'wood'; // 馭蟲馭獸偏木
  return undefined; // 神識/身法/煉體/丹器無五行
}

/** 由 statBonus 主屬性 + 大境界 + 層數推一個威力基數。 */
function powerBase(def: TechniqueDef, level: number): number {
  const sb = def.statBonus || {};
  const peak = Math.max(sb.attack || 0, sb.spirit || 0, sb.physique || 0, 20);
  const rr = realmRankLocal(def.realmReq); // 2(煉氣) … 11(真仙)
  return Math.round((20 + peak) * (1 + rr * 0.18) * (0.8 + Math.max(1, level) * 0.06));
}

const HEAL_RE = /回春|長生|长生|生機|生机|療|疗|癒|愈|不死/;
const BODY_CATS = new Set(['body', 'puppet']);

/**
 * 主入口：一條已學功法 → 1~2 個合法 BattleSkill。
 * 規則：① 一個「本命主技」(依 category)；② 若已解鎖 neigong，再加一個更強的「神通」技（取最高已解鎖層）。
 */
export function techniqueToBattleSkills(lt: LearnedTechnique): BattleSkill[] {
  const def = getTechnique(lt.id);
  if (!def) return [];
  const level = Math.max(1, lt.level || 1);
  const el = inferElement(def);
  const base = powerBase(def, level);
  const cat = def.category || 'generic';
  const text = (def.name || '') + (def.desc || '');
  const skills: BattleSkill[] = [];

  const mk = (suffix: string, s: Omit<BattleSkill, 'id' | 'source' | 'sourceId' | 'cooldown'>): BattleSkill => ({
    id: `tech-${def.id}-${suffix}`,
    source: 'cultivation_art',
    sourceId: def.id,
    cooldown: 0,
    ...s,
  });

  // ── 1) 心法（被動增益型）：自身 crit + 減傷（引擎honored欄位）。
  if (cat === 'cultivation') {
    skills.push(mk('xinfa', {
      name: def.name,
      description: `運轉《${def.name}》，法力周流——攻伐更利、護體更堅。`,
      type: 'buff', target: 'self',
      cost: { mana: 30 }, maxCooldown: 4,
      effects: [{ type: 'buff', target: 'self', buff: {
        id: `tech-${def.id}-xinfa`, name: `${def.name}·運轉`, type: 'crit',
        value: Math.min(0.25, 0.08 + level * 0.01),
        critDamage: 0.25 + level * 0.02,
        damageReduction: Math.min(0.3, 0.1 + level * 0.012),
        duration: 3, source: def.id,
      } }],
    }));
    return skills;
  }

  // ── 2) 身法（閃避型）：自身 dodge（庚金劍氣外的保命手段）。
  if (cat === 'agility') {
    skills.push(mk('shenfa', {
      name: def.name,
      description: `施展《${def.name}》，身形飄忽、避實就虛。`,
      type: 'buff', target: 'self',
      cost: { mana: 25 }, maxCooldown: 3,
      effects: [{ type: 'buff', target: 'self', buff: {
        id: `tech-${def.id}-shenfa`, name: `${def.name}·身法`, type: 'speed',
        value: 0, dodge: Math.min(0.35, 0.12 + level * 0.02), duration: 3, source: def.id,
      } }],
    }));
    return skills;
  }

  // ── 3) 療癒型（生生不息）：治療技。
  if (HEAL_RE.test(text)) {
    skills.push(mk('heal', {
      name: def.name,
      description: `《${def.name}》生機運轉，療復自身傷勢。`,
      type: 'heal', target: 'self',
      cost: { mana: 50 + base }, maxCooldown: 3,
      effects: [{ type: 'buff', target: 'self', buff: {
        id: `tech-${def.id}-regen`, name: `${def.name}·生生不息`, type: 'heal',
        value: 0, regen: 0.06, duration: 3, source: def.id,
      } }],
      heal: { base: Math.round(base * 1.2), multiplier: 0.12 },
    }));
    return skills;
  }

  // ── 4) 攻擊型：物理(體修/傀儡) vs 法術(其餘)，依 category 附帶 DoT / 高暴擊。
  const dmgType: 'physical' | 'magical' = BODY_CATS.has(cat) ? 'physical' : 'magical';
  const isSword = cat === 'sword';
  const isThunderTalisman = cat === 'thunder' || cat === 'talisman';
  const critChance = isSword ? 0.25 : isThunderTalisman ? 0.2 : 0.12;

  // DoT 附加：馭獸→poison（蟲毒），陣法/神識→burn（陣火/神魂灼燒）。
  const dotEffects: BattleSkill['effects'] = [];
  if (cat === 'beast') {
    dotEffects.push({ type: 'debuff', target: 'enemy', debuff: {
      id: `tech-${def.id}-poison`, name: `${def.name}·蟲毒`, type: 'poison',
      value: Math.round(base * 0.2), duration: 3, source: def.id,
    } });
  } else if (cat === 'formation' || cat === 'soul') {
    dotEffects.push({ type: 'debuff', target: 'enemy', debuff: {
      id: `tech-${def.id}-burn`, name: cat === 'soul' ? `${def.name}·神魂灼燒` : `${def.name}·困陣`, type: 'burn',
      value: Math.round(base * 0.18), duration: 3, source: def.id,
    } });
  }

  // 純煉器類（無攻伐關鍵字）不生成戰鬥技。
  if (cat === 'refining' && !/磁|攝|摄|擒|奪|夺|星|光|劍|剑/.test(text)) {
    return skills;
  }

  skills.push(mk('main', {
    name: def.name,
    description: def.desc ? def.desc.slice(0, 60) : `施展《${def.name}》攻敵。`,
    type: 'attack', target: 'enemy',
    cost: { mana: 35 + Math.round(base * 0.35) }, maxCooldown: dotEffects.length ? 2 : 1,
    effects: dotEffects,
    damage: {
      base, multiplier: dmgType === 'physical' ? 1.2 : 1.4,
      type: dmgType, critChance, critMultiplier: 1.8, element: el,
    },
  }));

  // ── 5) 神通技：取最高已解鎖 neigong（level<=已修層），作更強的招式。
  const unlocked = (def.neigong || []).filter((n) => (n.level || 0) <= level);
  if (unlocked.length) {
    const top = unlocked[unlocked.length - 1];
    // 被動性神通（記憶/感知/圓融類）不另生攻擊技，避免「假招」。
    if (!/過目|过目|洗髓|圓融|圆融|感應|感应|記|记|神識增|神识增/.test(top.name + (top.desc || ''))) {
      skills.push(mk(`ng-${top.level}`, {
        name: top.name,
        description: top.desc ? top.desc.slice(0, 60) : `《${def.name}》第${top.level}層神通：${top.name}。`,
        type: 'attack', target: 'enemy',
        cost: { mana: 60 + Math.round(base * 0.5) }, maxCooldown: 3,
        effects: dotEffects,
        damage: {
          base: Math.round(base * 1.6), multiplier: dmgType === 'physical' ? 1.5 : 1.8,
          type: dmgType, critChance: critChance + 0.05, critMultiplier: 2.0, element: el,
        },
      }));
    }
  }

  return skills;
}

/** 批次：一組已學功法 → 攤平的 BattleSkill[]（供戰鬥組裝用，已對技能 id 去重）。 */
export function buildCanonBattleSkills(techniques?: LearnedTechnique[]): BattleSkill[] {
  if (!techniques || !techniques.length) return [];
  const out: BattleSkill[] = [];
  const seen = new Set<string>();
  for (const lt of techniques) {
    for (const s of techniqueToBattleSkills(lt)) {
      if (seen.has(s.id)) continue;
      seen.add(s.id);
      out.push(s);
    }
  }
  return out;
}
