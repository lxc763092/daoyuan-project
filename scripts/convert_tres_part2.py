#!/usr/bin/env python3
"""补充转换：敌人 + 道纹碎片（含实际字段匹配）"""
import os, re

TRES_DIR = "/sdcard/Documents/XiuXianGame/project/resources"
OUT_DIR = "/tmp/daoyuan_build/fanren/data_daoyuan"

def parse_tres(filepath):
    data = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    res_match = re.search(r'\[resource\](.*?)(?=\[|\Z)', content, re.DOTALL)
    if not res_match:
        return None
    section = res_match.group(1)
    for line in section.strip().split('\n'):
        line = line.strip()
        if '=' not in line:
            continue
        key, _, val = line.partition('=')
        key = key.strip()
        val = val.strip().strip('"')
        try:
            if '.' in val:
                val = float(val)
            else:
                val = int(val)
        except ValueError:
            val = val.strip('"')
        data[key] = val
    return data

# ── 敌人 enemies → daoyuanEnemies.ts ──
enemy_dir = os.path.join(TRES_DIR, 'enemies')
enemies = []
if os.path.isdir(enemy_dir):
    for f in sorted(os.listdir(enemy_dir)):
        if f.endswith('.tres'):
            d = parse_tres(os.path.join(enemy_dir, f))
            if d:
                enemies.append(d)

ts = """/**
 * 道元纪・原创敌人配置
 * 由 .tres 自动转换生成
 */
export interface DaoyuanEnemy {
  enemyId: string;
  unitName: string;
  level: number;
  elemLevel: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  atk: number;
  def: number;
  spd: number;
  critRate: number;
  critDmg: number;
  element: number;
  aiMode: number;
  skills: string[];
  expReward: number;
  isBoss: boolean;
}

export const DAOYUAN_ENEMIES: DaoyuanEnemy[] = [\n"""
for e in enemies:
    skills_str = str(e.get('skills', '[]'))
    ts += f"""  {{
    enemyId: '{e.get('enemy_id', '???')}',
    unitName: '{e.get('unit_name', e.get('enemy_id', '???'))}',
    level: {e.get('level', 1)},
    elemLevel: {e.get('elem_level', 1)},
    hp: {e.get('hp', 50)},
    maxHp: {e.get('max_hp', 50)},
    mp: {e.get('mp', 10)},
    maxMp: {e.get('max_mp', 10)},
    atk: {e.get('atk', 8)},
    def: {e.get('def', 3)},
    spd: {e.get('spd', 6)},
    critRate: {e.get('crit_rate', 0.05)},
    critDmg: {e.get('crit_dmg', 1.5)},
    element: {e.get('element', 0)},
    aiMode: {e.get('ai_mode', 0)},
    skills: {skills_str},
    expReward: {e.get('exp_reward', 10)},
    isBoss: {str(e.get('is_boss', False)).lower()},
  }},\n"""
ts += "];\n"
with open(os.path.join(OUT_DIR, 'daoyuanEnemies.ts'), 'w', encoding='utf-8') as f:
    f.write(ts)
print(f"✅ daoyuanEnemies.ts — {len(enemies)} 敌人")

# ── 道纹碎片 dao_fragments → 追加到 daoyuanDaoFragments.ts ──
frag_dir = os.path.join(TRES_DIR, 'dao_fragments')
fragments = []
if os.path.isdir(frag_dir):
    for f in sorted(os.listdir(frag_dir)):
        if f.endswith('.tres'):
            d = parse_tres(os.path.join(frag_dir, f))
            if d:
                fragments.append(d)

ts2 = """/**
 * 道元纪・核心系统：108道纹碎片
 * 由 .tres 自动转换生成（补充版）
 */
export interface DaoyuanDaoFragment {
  fragmentId: string;
  fragmentName: string;
  element: number;         // 0=金 1=木 2=水 3=火 4=土 5=虚空
  description: string;
  collected: boolean;
}

export const DAOYUAN_DAO_FRAGMENTS: DaoyuanDaoFragment[] = [\n"""
for fg in fragments:
    ts2 += f"""  {{
    fragmentId: '{fg.get('fragment_id', '???')}',
    fragmentName: '{fg.get('fragment_name', fg.get('fragment_id', '???'))}',
    element: {fg.get('element', 0)},
    description: '{fg.get('description', '')}',
    collected: false,
  }},\n"""
ts2 += "];\n"
with open(os.path.join(OUT_DIR, 'daoyuanDaoFragments.ts'), 'w', encoding='utf-8') as f:
    f.write(ts2)
print(f"✅ daoyuanDaoFragments.ts — {len(fragments)} 道纹碎片（已覆盖）")

print(f"\n全部输出文件位于 {OUT_DIR}/")
for f in sorted(os.listdir(OUT_DIR)):
    size = os.path.getsize(os.path.join(OUT_DIR, f))
    print(f"  {f} ({size} bytes)")
