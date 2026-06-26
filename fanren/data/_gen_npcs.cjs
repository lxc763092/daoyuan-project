/* Deterministically build an expanded fanren/data/canonNpcs.ts from game_db agg_characters.json. */
const fs = require('fs');
const DB = 'C:\\Users\\User\\Desktop\\修仙遊戲\\game_db';
const OUT = 'C:\\Users\\User\\Desktop\\修仙遊戲\\react-xiuxian-game\\fanren\\data\\canonNpcs.ts';

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^﻿/, ''));
const chars = readJson(`${DB}\\index\\agg_characters.json`);
const arcsArr = readJson(`${DB}\\index\\arcs.json`);

// arc -> {chapStart, chapEnd, vol}
const ARC = {};
for (const a of arcsArr) ARC[a.arc] = { chapStart: a.chapStart, chapEnd: a.chapEnd, vol: a.vol };

// 45 canonical region ids (longest-first for specific matching)
const REGIONS = ['越國','七玄門','青牛鎮','彩霞山','黃楓谷','掩月宗','血色禁地','越京','天南','溪國','落雲宗','雲夢山','闐天城','墜魔谷','慕蘭草原','亂星海','天星城','虛天殿','小寰島','極陰島','大晉','晉京','昆吾山','太一門','靈界','風元大陸','天淵城','天雲大陸','雲城','黑葉森林','天鵬聖城','地淵','冥河之地','廣寒界','玄武境','天元境','無涯海','青元宮','魔界','幻嘯沙漠','幻夜城','魔源海','苦靈島','仙界','北寒仙域'];
const REGION_BY_LEN = [...REGIONS].sort((a, b) => b.length - a.length);
const VOL_FALLBACK = { 1: '七玄門', 2: '黃楓谷', 3: '越京', 4: '亂星海', 5: '天南', 6: '大晉', 7: '天南', 8: '風元大陸', 9: '天淵城', 10: '魔界', 11: '靈界', 12: '無涯海', 13: '北寒仙域' };

function deriveLoc(noteText, vol) {
  if (noteText) for (const r of REGION_BY_LEN) if (noteText.includes(r)) return r;
  return VOL_FALLBACK[vol] || '越國';
}
function mapImportance(role) {
  if (role === 'protagonist') return 'protagonist';
  if (role === 'major' || role === 'antagonist') return 'major';
  return 'minor';
}
function trunc(s, n) { s = (s || '').trim(); return s.length > n ? s.slice(0, n) : s; }

const DEATH = /(死|歿|殞|隕|身死|喪命|被殺|擊殺|坐化|兵解|身殞|滅殺|斃|戰死)/;

const out = [];
for (const c of chars) {
  const include = c.appearances >= 2 || ['major', 'antagonist', 'protagonist'].includes(c.primaryRole);
  if (!include) continue;
  if (!c.arcs || !c.arcs.length) continue;

  // arc -> realm / note lookups
  const realmByArc = {}; for (const r of c.realms || []) if (r.arc) realmByArc[r.arc] = String(r.realm);
  const noteByArc = {}; for (const n of c.notes || []) if (n.arc) noteByArc[n.arc] = n.note;

  // sort arcs by chapStart
  const sorted = [...c.arcs].filter((a) => ARC[a]).sort((x, y) => ARC[x].chapStart - ARC[y].chapStart);
  if (!sorted.length) continue;

  let lastRealm = '凡人';
  const raw = sorted.map((arc) => {
    const m = ARC[arc];
    const note = noteByArc[arc] || '';
    const realm = realmByArc[arc] || lastRealm; lastRealm = realm;
    return { arc, from: m.chapStart, to: m.chapEnd, vol: m.vol, loc: deriveLoc(note, m.vol), realm, note };
  });

  // merge consecutive windows with same location
  const windows = [];
  for (const w of raw) {
    const prev = windows[windows.length - 1];
    if (prev && prev.locationId === w.loc) {
      prev.toChapter = w.to;
      if (w.note) prev.activity = trunc(w.note, 50);
      prev.realm = w.realm;
    } else {
      windows.push({ fromChapter: w.from, toChapter: w.to, locationId: w.loc, realm: w.realm, status: 'alive', activity: trunc(w.note, 50) || `於${w.loc}一帶活動` });
    }
  }
  // cap windows
  let chronicle = windows;
  if (chronicle.length > 12) {
    const step = chronicle.length / 12;
    const picked = []; for (let i = 0; i < 12; i++) picked.push(chronicle[Math.floor(i * step)]);
    chronicle = picked;
  }
  // death: if any fate indicates death, mark final window dead
  const fateText = (c.fates || []).map((f) => f.fate).join('；');
  if (fateText && DEATH.test(fateText) && chronicle.length) chronicle[chronicle.length - 1].status = 'dead';

  const firstChapter = ARC[sorted[0]].chapStart;
  const bio = trunc((c.notes && c.notes[0] && c.notes[0].note) || '', 90);
  const canonFate = trunc(fateText || (c.notes && c.notes[c.notes.length - 1] && c.notes[c.notes.length - 1].note) || '行蹤歸於史冊。', 120);

  out.push({
    id: c.name,
    name: c.name,
    aliases: (c.aliases || []).slice(0, 6),
    faction: (c.factions || [])[0] || undefined,
    importance: mapImportance(c.primaryRole),
    bio,
    firstChapter,
    canonFate,
    chronicle,
  });
}

// protagonist first, then by importance/appearance already implied by file order
out.sort((a, b) => (a.importance === 'protagonist' ? -1 : b.importance === 'protagonist' ? 1 : 0));

const header = `import type { CanonNpcSource } from '../types';\n// 由 game_db/index/agg_characters.json 決定性生成（${out.length} 名 NPC，含跨弧編年史時間窗）。\n// 重生指令： node game_db/_wf/gen_npcs.cjs\nexport const CANON_NPCS: CanonNpcSource[] = `;
fs.writeFileSync(OUT, header + JSON.stringify(out, null, 1) + ';\n', 'utf8');
console.log(`Wrote ${out.length} NPCs to canonNpcs.ts`);
console.log('importance breakdown:', out.reduce((m, n) => ((m[n.importance] = (m[n.importance] || 0) + 1), m), {}));
const wc = out.reduce((s, n) => s + n.chronicle.length, 0);
console.log('total chronicle windows:', wc, '| avg windows/npc:', (wc / out.length).toFixed(1));
