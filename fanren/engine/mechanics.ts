/**
 * 演繹引擎核心：把玩家自由文本「演繹」成結構化、可執行、受平衡約束的機制規格(MechanicSpec)，
 * 並提供在遊戲各時機執行這些機制的解譯器。
 * 離線可用（規則式 archetype 推演）；上層 extrapolate.ts 可用 LLM 強化後再經此處平衡器約束。
 */
import type {
  MechanicSpec,
  MechEffect,
  MechEffectType as EffectType,
  MechStatKey as StatKey,
  MechTriggerOn as TriggerOn,
  MechTriggerRule as TriggerRule,
} from '../types';
export type { MechanicSpec, MechEffect } from '../types';

const GRANDIOSE = /(無限|無敵|絕對|永久|秒殺|不消耗|沒有代價|一鍵|直接突破|逆天|至高|最強|瞬間滿)/g;

export function estimateTier(text: string): number {
  let tier = 2;
  const grand = (text.match(GRANDIOSE) || []).length;
  if (grand >= 2) tier = 4;
  else if (grand === 1) tier = 3;
  if (/(只能|僅能|每日|有限|需要|代價|風險|無法用於|稀少)/.test(text)) tier = Math.max(1, tier - 1);
  return Math.min(5, Math.max(1, tier));
}

interface Archetype {
  re: RegExp;
  category: string;
  verbs: string[];
  build: (tier: number) => TriggerRule[];
  limits?: string[];
  risks?: string[];
}

// 各「異能原型」——可同時命中多個並合併
const ARCHETYPES: Archetype[] = [
  {
    re: /(吞噬|噬|食屍|啖|蠶食|吸食|煉化.*(屍|尸)|奪舍)/,
    category: 'forbidden',
    verbs: ['吞噬', '噬', '食', '啖', '煉化', '蠶食', '吸食'],
    build: (t) => [
      { on: 'devour', effects: [
        { type: 'permanent_gain', stat: 'attack', amount: 0.5 * t, capPerDay: 2 * t, capTotal: 30 * t, diminish: 0.02, note: '噬體精進' },
        { type: 'permanent_gain', stat: 'physique', amount: 0.4 * t, capPerDay: 2 * t, capTotal: 25 * t, diminish: 0.02 },
        { type: 'exp', amount: 30 * t },
        { type: 'karma', amount: 1.5 * t },
      ] },
      { on: 'kill', effects: [
        { type: 'permanent_gain', stat: 'attack', amount: 0.3 * t, capPerDay: 1.5 * t, capTotal: 30 * t, diminish: 0.02 },
        { type: 'karma', amount: t },
      ] },
    ],
    limits: ['須有可噬之軀方能施展', '同源越多，邊際遞減越劇', '噬取量每日有限'],
    risks: ['業力急增，易招天道感應與心魔', '為正道所不容，聲名受損', '血脈/神魂恐遭污染反噬'],
  },
  {
    re: /(修煉|吐納|悟道|參悟|靈氣|修為|淬鍊|頓悟|事半功倍)/,
    category: 'cultivation',
    verbs: ['修煉', '吐納', '參悟', '催動'],
    build: (t) => [{ on: 'cultivate', effects: [{ type: 'cultivation_mult', amount: 0.1 * t, note: '修煉增效' }] }],
    limits: ['僅於閉關修煉時生效'],
    risks: ['進境過速恐根基不穩'],
  },
  {
    re: /(護體|肉身|不壞|金鐘|鐵布|體魄|淬體|煉體|強橫)/,
    category: 'body',
    verbs: ['護體', '運轉'],
    build: (t) => [
      { on: 'passive', effects: [
        { type: 'permanent_gain', stat: 'physique', amount: 4 * t, capTotal: 4 * t },
        { type: 'permanent_gain', stat: 'maxHp', amount: 25 * t, capTotal: 25 * t },
      ] },
      { on: 'breakthrough', effects: [{ type: 'permanent_gain', stat: 'maxHp', amount: 10 * t, capPerDay: 10 * t, capTotal: 200 * t }] },
    ],
  },
  {
    re: /(速度|身法|遁|瞬|疾|風|捷|靈動)/,
    category: 'agility',
    verbs: ['施展'],
    build: (t) => [{ on: 'passive', effects: [{ type: 'permanent_gain', stat: 'speed', amount: 3 * t, capTotal: 3 * t }] }],
  },
  {
    re: /(攻擊|傷害|劍|刀|拳|掌|火|雷|冰|霜|殺|戰力|威能|神通|法術)/,
    category: 'combat',
    verbs: ['出手', '攻擊', '施展', '催動'],
    build: (t) => [
      { on: 'passive', effects: [
        { type: 'permanent_gain', stat: 'attack', amount: 3 * t, capTotal: 3 * t },
        { type: 'permanent_gain', stat: 'spirit', amount: 2 * t, capTotal: 2 * t },
      ] },
    ],
  },
  {
    re: /(丹|藥|煉丹|火候|爐鼎|煉器|配方|丹方)/,
    category: 'craft',
    verbs: ['煉製', '煉丹', '煉器'],
    build: (t) => [{ on: 'craft', effects: [{ type: 'craft_bonus', amount: 0.08 * t, note: '成丹率與品質提升' }] }],
    limits: ['僅於煉製時生效'],
  },
  {
    re: /(氣運|運氣|機緣|福緣|貴人|奇遇|逢凶化吉)/,
    category: 'fortune',
    verbs: ['行走'],
    build: (t) => [{ on: 'explore', effects: [{ type: 'luck', amount: 4 * t, capPerDay: 8 * t, capTotal: 60 * t }] }],
  },
  {
    re: /(鑑|察|看穿|洞悉|洞察|預知|讀心|分析|真偽|來歷)/,
    category: 'knowledge',
    verbs: ['洞察', '查探', '鑑'],
    build: (t) => [
      { on: 'inspect', effects: [{ type: 'narrative', amount: 0, note: '萬物來歷真偽纖毫畢現' }] },
      { on: 'passive', effects: [{ type: 'permanent_gain', stat: 'spirit', amount: 2 * t, capTotal: 2 * t }] },
    ],
  },
  {
    re: /(吸取|奪取|攫取|搶奪).*(靈氣|法力|修為|精元|功力)/,
    category: 'drain',
    verbs: ['吸取', '奪取'],
    build: (t) => [{ on: 'kill', effects: [{ type: 'exp', amount: 40 * t }, { type: 'resource', amount: 10 * t }, { type: 'karma', amount: 0.8 * t }] }],
    risks: ['強奪他人，易結死仇'],
  },
  {
    re: /(治療|回復|療傷|再生|癒合|生生不息|不死)/,
    category: 'vitality',
    verbs: ['運功療傷'],
    build: (t) => [{ on: 'turn', effects: [{ type: 'heal', amount: 0.02 * t, note: '生生不息' }] }],
  },
];

function nameFor(text: string, category: string): string {
  const m = text.match(/叫做?「?([一-龥A-Za-z0-9]{2,8})」?/);
  if (m) return m[1];
  const fallback: Record<string, string> = {
    forbidden: '噬靈祕術', cultivation: '玄功', body: '不壞金身', agility: '風行之身',
    combat: '殺伐神通', craft: '丹器妙法', fortune: '氣運加身', knowledge: '洞察之眼',
    drain: '奪元大法', vitality: '生生訣', generic: '本命異能',
  };
  return fallback[category] || fallback.generic;
}

/** 離線（規則式）演繹：偵測原型→合併觸發→組成 MechanicSpec。 */
export function extrapolateOffline(rawText: string, kind: MechanicSpec['kind'], idSeed = 'm'): MechanicSpec {
  const text = (rawText || '').trim();
  const tier = estimateTier(text);
  const hits = ARCHETYPES.filter((a) => a.re.test(text));
  const used = hits.length ? hits : [];
  const triggerMap: Record<string, MechEffect[]> = {};
  const verbs = new Set<string>();
  const limits = new Set<string>();
  const risks = new Set<string>();
  let category = 'generic';
  if (used.length) category = used[0].category;
  for (const a of used) {
    for (const tr of a.build(tier)) {
      triggerMap[tr.on] = (triggerMap[tr.on] || []).concat(tr.effects);
    }
    a.verbs.forEach((v) => verbs.add(v));
    (a.limits || []).forEach((l) => limits.add(l));
    (a.risks || []).forEach((r) => risks.add(r));
  }
  // 無命中 → 通用主動異能
  if (!used.length) {
    triggerMap['activate'] = [
      { type: 'narrative', amount: 0, note: '獨特之力悄然生效' },
      { type: 'cultivation_mult', amount: 0.05 * tier },
    ];
    verbs.add('施展');
  }
  const triggers: TriggerRule[] = Object.entries(triggerMap).map(([on, effects]) => ({ on: on as TriggerOn, effects }));
  let spec: MechanicSpec = {
    id: `${idSeed}-${category}-${tier}`,
    name: nameFor(text, category),
    kind,
    rawText: text,
    summary: `依你的描述演繹而成的${category === 'forbidden' ? '禁忌' : ''}機制（${category}型）。`,
    category,
    powerTier: tier,
    flavorVerbs: Array.from(verbs),
    triggers,
    limits: Array.from(limits),
    risks: Array.from(risks),
    source: 'offline',
    usesTotal: 0,
    gainedByEffect: {},
    dailyByEffect: {},
    lastDay: 0,
  };
  return balanceSpec(spec);
}

// 各 EffectType 的「每次觸發增量」硬上限（依 tier）
const PER_HIT_CAP: Partial<Record<EffectType, (t: number) => number>> = {
  permanent_gain: (t) => 1.0 * t,
  cultivation_mult: () => 0.6,
  exp: (t) => 80 * t,
  resource: (t) => 40 * t,
  luck: (t) => 10 * t,
  heal: () => 0.1,
  craft_bonus: () => 0.4,
  lifespan: (t) => 2 * t,
};

/** 平衡器：clamp 各效果量、確保有代價與限制（即便 LLM 給出誇大值也被收斂）。 */
export function balanceSpec(spec: MechanicSpec): MechanicSpec {
  const t = Math.min(5, Math.max(1, Math.round(spec.powerTier) || 2));
  spec.powerTier = t;
  for (const tr of spec.triggers) {
    for (const e of tr.effects) {
      const cap = PER_HIT_CAP[e.type];
      if (cap) e.amount = Math.max(e.type === 'lifespan' ? -cap(t) : 0, Math.min(e.amount, cap(t)));
      if (e.capTotal !== undefined) e.capTotal = Math.min(e.capTotal, 60 * t);
      if (e.capPerDay !== undefined) e.capPerDay = Math.min(e.capPerDay, 5 * t);
    }
  }
  // 確保至少一條限制與一條風險（無代價的力量不存在）
  if (!spec.limits.length) spec.limits = ['威能有其邊界，並非萬能'];
  if (!spec.risks.length) spec.risks = ['過度倚仗易生隱患'];
  // 禁忌類強制有業力代價
  const hasKarma = spec.triggers.some((tr) => tr.effects.some((e) => e.type === 'karma'));
  if (spec.category === 'forbidden' && !hasKarma) {
    (spec.triggers.find((tr) => tr.on === 'devour' || tr.on === 'kill') || spec.triggers[0])?.effects.push({ type: 'karma', amount: t });
  }
  return spec;
}

// ── 解譯器：在某時機執行 spec，回傳套用結果（呼叫端負責持久化 spec 與套用 deltas）──
export interface ApplyResult {
  applied: boolean;
  deltas: { attack?: number; defense?: number; spirit?: number; physique?: number; speed?: number; maxHp?: number; exp?: number; spiritStones?: number; luck?: number; lifespan?: number; hp?: number };
  karma: number;
  cultivationMultBonus: number;
  craftBonus: number;
  narrative: string;
}

export function passiveStatBonus(spec: MechanicSpec): ApplyResult['deltas'] {
  // 創建即生效的永久被動（一次性套用）
  const d: ApplyResult['deltas'] = {};
  const passive = spec.triggers.find((tr) => tr.on === 'passive');
  if (!passive) return d;
  for (const e of passive.effects) {
    if (e.type === 'permanent_gain' && e.stat) d[e.stat] = (d[e.stat] || 0) + e.amount;
  }
  return d;
}

export function applyTrigger(spec: MechanicSpec, on: TriggerOn, ctx: { day: number; maxHp: number }): ApplyResult {
  const res: ApplyResult = { applied: false, deltas: {}, karma: 0, cultivationMultBonus: 0, craftBonus: 0, narrative: '' };
  const rules = spec.triggers.filter((tr) => tr.on === on);
  if (!rules.length) return res;
  if (spec.lastDay !== ctx.day) { spec.dailyByEffect = {}; spec.lastDay = ctx.day; }
  const notes: string[] = [];
  for (const tr of rules) {
    for (const e of tr.effects) {
      const key = `${e.type}:${e.stat || ''}`;
      let amount = e.amount;
      if (e.diminish && e.diminish > 0) amount = amount / (1 + (spec.gainedByEffect[key] || 0) * e.diminish);
      if (e.capPerDay !== undefined) {
        const room = Math.max(0, e.capPerDay - (spec.dailyByEffect[key] || 0));
        amount = Math.min(amount, room);
      }
      if (e.capTotal !== undefined) {
        const room = Math.max(0, e.capTotal - (spec.gainedByEffect[key] || 0));
        amount = Math.min(amount, room);
      }
      if (amount <= 0 && e.type !== 'narrative' && e.type !== 'lifespan') continue;
      spec.gainedByEffect[key] = (spec.gainedByEffect[key] || 0) + amount;
      spec.dailyByEffect[key] = (spec.dailyByEffect[key] || 0) + amount;
      switch (e.type) {
        case 'permanent_gain': if (e.stat) { res.deltas[e.stat] = (res.deltas[e.stat] || 0) + round1(amount); notes.push(`${statName(e.stat)} +${round1(amount)}`); } break;
        case 'exp': res.deltas.exp = (res.deltas.exp || 0) + Math.round(amount); notes.push(`修為 +${Math.round(amount)}`); break;
        case 'resource': res.deltas.spiritStones = (res.deltas.spiritStones || 0) + Math.round(amount); notes.push(`靈石 +${Math.round(amount)}`); break;
        case 'luck': res.deltas.luck = (res.deltas.luck || 0) + Math.round(amount); notes.push(`氣運 +${Math.round(amount)}`); break;
        case 'lifespan': res.deltas.lifespan = (res.deltas.lifespan || 0) + amount; break;
        case 'heal': res.deltas.hp = (res.deltas.hp || 0) + Math.round(amount <= 1 ? amount * ctx.maxHp : amount); break;
        case 'karma': res.karma += amount; break;
        case 'cultivation_mult': res.cultivationMultBonus += amount; break;
        case 'craft_bonus': res.craftBonus += amount; if (e.note) notes.push(e.note); break;
        case 'narrative': if (e.note) notes.push(e.note); break;
      }
      res.applied = true;
    }
  }
  spec.usesTotal += 1;
  res.narrative = notes.join('，');
  return res;
}

function round1(n: number) { return Math.round(n * 10) / 10; }
function statName(s: StatKey): string {
  return ({ attack: '攻擊', defense: '防禦', spirit: '神識', physique: '體魄', speed: '速度', maxHp: '氣血上限' } as Record<StatKey, string>)[s];
}

/** 玩家文本是否觸發某機制（用於 devour/activate）。回傳命中的 spec 與觸發類型。 */
export function matchActivation(specs: MechanicSpec[], text: string): { spec: MechanicSpec; on: TriggerOn } | null {
  for (const spec of specs) {
    if (spec.flavorVerbs.some((v) => text.includes(v))) {
      const on: TriggerOn = spec.triggers.some((tr) => tr.on === 'devour') && /(屍|尸|噬|食|啖|煉化)/.test(text) ? 'devour' : 'activate';
      return { spec, on };
    }
  }
  return null;
}
