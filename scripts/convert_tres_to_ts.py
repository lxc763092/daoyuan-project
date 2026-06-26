#!/usr/bin/env python3
"""
道元纪 .tres → TypeScript 批量转换器
将 Godot Resource 序列化格式转为 TypeScript 常量数组
"""
import os, re, sys

TRES_DIR = "/sdcard/Documents/XiuXianGame/project/resources"
OUT_DIR = "/tmp/daoyuan_build/fanren/data_daoyuan"

def parse_tres(filepath):
    """解析单个 .tres 文件，返回 dict"""
    data = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取 [resource] 段
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
        
        # 尝试转数值
        try:
            if '.' in val:
                val = float(val)
            else:
                val = int(val)
        except ValueError:
            val = val.strip('"')
        
        data[key] = val
    return data

def group_by_subdir(tres_dir):
    """按子目录分组"""
    groups = {}
    for root, dirs, files in os.walk(tres_dir):
        for f in files:
            if f.endswith('.tres'):
                full = os.path.join(root, f)
                subdir = os.path.basename(root)
                groups.setdefault(subdir, []).append((f, full))
    return groups

def realm_to_ts(realm_data):
    """境界 → CanonRealm 格式"""
    return {
        'key': realm_data.get('realm_name', '???').replace(' ', '_').lower(),
        'name': realm_data.get('realm_name', '???'),
        'tier': 'human' if realm_data.get('realm_tier', 1) <= 4 else 'spirit',
        'realmType': realm_data.get('realm_name', '???'),
        'lifespan': realm_data.get('lifespan', 120),
        'baseExp': realm_data.get('exp_required', 1000),
        'hasTribulation': realm_data.get('realm_tier', 1) >= 5,
        'baseHp': realm_data.get('base_hp', 100),
        'baseMp': realm_data.get('base_mp', 50),
        'baseAtk': realm_data.get('base_atk', 10),
        'baseDef': realm_data.get('base_def', 5),
        'baseSpd': realm_data.get('base_spd', 10),
        'breakthroughThreshold': realm_data.get('breakthrough_threshold', 30),
    }

def generate_all():
    os.makedirs(OUT_DIR, exist_ok=True)
    groups = group_by_subdir(TRES_DIR)
    
    print(f"=== 道元纪 .tres 转换器 ===")
    print(f"源目录: {TRES_DIR}")
    print(f"输出: {OUT_DIR}")
    print(f"找到 {sum(len(v) for v in groups.values())} 个 .tres 文件，{len(groups)} 个类别\n")
    
    # ── 境界 realms → daoyuanRealms.ts ──
    if 'realms' in groups:
        realms = []
        for fname, fpath in sorted(groups['realms']):
            d = parse_tres(fpath)
            if d:
                realms.append(realm_to_ts(d))
        
        ts = """/**
 * 道元纪・原创境界阶梯
 * 由 .tres 自动转换生成
 */
export interface DaoyuanRealm {
  key: string;
  name: string;
  tier: 'human' | 'spirit' | 'immortal';
  realmType: string;
  lifespan: number;
  baseExp: number;
  hasTribulation: boolean;
  tribulationName?: string;
  baseHp: number;
  baseMp: number;
  baseAtk: number;
  baseDef: number;
  baseSpd: number;
  breakthroughThreshold: number;
}

export const DAOYUAN_REALMS: DaoyuanRealm[] = [\n"""
        for r in realms:
            ts += f"""  {{
    key: '{r['key']}',
    name: '{r['name']}',
    tier: '{r['tier']}',
    realmType: '{r['realmType']}',
    lifespan: {r['lifespan']},
    baseExp: {r['baseExp']},
    hasTribulation: {str(r['hasTribulation']).lower()},
    baseHp: {r['baseHp']},
    baseMp: {r['baseMp']},
    baseAtk: {r['baseAtk']},
    baseDef: {r['baseDef']},
    baseSpd: {r['baseSpd']},
    breakthroughThreshold: {r['breakthroughThreshold']},
  }},\n"""
        ts += "];\n"
        with open(os.path.join(OUT_DIR, 'daoyuanRealms.ts'), 'w', encoding='utf-8') as f:
            f.write(ts)
        print(f"✅ daoyuanRealms.ts — {len(realms)} 境界")

    # ── 技能 skills → daoyuanSkills.ts ──
    if 'skills' in groups:
        skills = []
        for fname, fpath in sorted(groups['skills']):
            d = parse_tres(fpath)
            if d:
                skills.append(d)
        
        ts = """/**
 * 道元纪・原创战斗技能
 * 由 .tres 自动转换生成
 */
export interface DaoyuanSkill {
  skillId: string;
  skillName: string;
  mpCost: number;
  cooldown: number;
  power: number;
  element: number;  // 0=金 1=木 2=水 3=火 4=土 5=虚空
  targetType: number;
  description: string;
}

export const DAOYUAN_SKILLS: DaoyuanSkill[] = [\n"""
        for s in skills:
            ts += f"""  {{
    skillId: '{s.get('skill_id', '???')}',
    skillName: '{s.get('skill_name', s.get('skill_id', '???'))}',
    mpCost: {s.get('mp_cost', 0)},
    cooldown: {s.get('cooldown', 0)},
    power: {s.get('power', 1.0)},
    element: {s.get('element', 0)},
    targetType: {s.get('target_type', 0)},
    description: '{s.get('description', '')}',
  }},\n"""
        ts += "];\n"
        with open(os.path.join(OUT_DIR, 'daoyuanSkills.ts'), 'w', encoding='utf-8') as f:
            f.write(ts)
        print(f"✅ daoyuanSkills.ts — {len(skills)} 技能")

    # ── 功法 techniques → daoyuanTechniques.ts ──
    if 'techniques' in groups:
        techs = []
        for fname, fpath in sorted(groups['techniques']):
            d = parse_tres(fpath)
            if d:
                techs.append(d)
        
        ts = """/**
 * 道元纪・原创功法
 * 由 .tres 自动转换生成
 */
export interface DaoyuanTechnique {
  techId: string;
  techName: string;
  element: number;
  tier: number;
  description: string;
  effects: string[];
}

export const DAOYUAN_TECHNIQUES: DaoyuanTechnique[] = [\n"""
        for t in techs:
            effects_str = str(t.get('effects', '[]'))
            ts += f"""  {{
    techId: '{t.get('tech_id', '???')}',
    techName: '{t.get('tech_name', t.get('tech_id', '???'))}',
    element: {t.get('element', 0)},
    tier: {t.get('tier', 1)},
    description: '{t.get('description', '')}',
    effects: {effects_str},
  }},\n"""
        ts += "];\n"
        with open(os.path.join(OUT_DIR, 'daoyuanTechniques.ts'), 'w', encoding='utf-8') as f:
            f.write(ts)
        print(f"✅ daoyuanTechniques.ts — {len(techs)} 功法")

    # ── 物品 items → daoyuanItems.ts ──
    if 'items' in groups:
        items = []
        for fname, fpath in sorted(groups['items']):
            d = parse_tres(fpath)
            if d:
                items.append(d)
        
        ts = """/**
 * 道元纪・原创物品
 * 由 .tres 自动转换生成
 */
export interface DaoyuanItem {
  itemId: string;
  itemName: string;
  itemType: string;
  tier: number;
  description: string;
  price: number;
  effects: string[];
}

export const DAOYUAN_ITEMS: DaoyuanItem[] = [\n"""
        for it in items:
            effects_str = str(it.get('effects', '[]'))
            ts += f"""  {{
    itemId: '{it.get('item_id', '???')}',
    itemName: '{it.get('item_name', it.get('item_id', '???'))}',
    itemType: '{it.get('item_type', 'misc')}',
    tier: {it.get('tier', 1)},
    description: '{it.get('description', '')}',
    price: {it.get('price', 0)},
    effects: {effects_str},
  }},\n"""
        ts += "];\n"
        with open(os.path.join(OUT_DIR, 'daoyuanItems.ts'), 'w', encoding='utf-8') as f:
            f.write(ts)
        print(f"✅ daoyuanItems.ts — {len(items)} 物品")

    # ── 灵兽 beasts → daoyuanBeasts.ts ──
    if 'beasts' in groups:
        beasts = []
        for fname, fpath in sorted(groups['beasts']):
            d = parse_tres(fpath)
            if d:
                beasts.append(d)
        
        ts = """/**
 * 道元纪・原创灵兽
 * 由 .tres 自动转换生成
 */
export interface DaoyuanBeast {
  beastId: string;
  beastName: string;
  tier: number;
  element: number;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  description: string;
}

export const DAOYUAN_BEASTS: DaoyuanBeast[] = [\n"""
        for b in beasts:
            ts += f"""  {{
    beastId: '{b.get('beast_id', '???')}',
    beastName: '{b.get('beast_name', b.get('beast_id', '???'))}',
    tier: {b.get('tier', 1)},
    element: {b.get('element', 0)},
    hp: {b.get('hp', 100)},
    atk: {b.get('atk', 10)},
    def: {b.get('def', 5)},
    spd: {b.get('spd', 10)},
    description: '{b.get('description', '')}',
  }},\n"""
        ts += "];\n"
        with open(os.path.join(OUT_DIR, 'daoyuanBeasts.ts'), 'w', encoding='utf-8') as f:
            f.write(ts)
        print(f"✅ daoyuanBeasts.ts — {len(beasts)} 灵兽")

    # ── 道纹碎片 dao → daoyuanDaoFragments.ts ──
    if 'dao' in groups:
        fragments = []
        for fname, fpath in sorted(groups['dao']):
            d = parse_tres(fpath)
            if d:
                fragments.append(d)
        
        ts = """/**
 * 道元纪・核心系统：108道纹碎片
 * 由 .tres 自动转换生成
 */
export interface DaoyuanDaoFragment {
  fragmentId: string;
  fragmentName: string;
  category: string;       // 天/地/人/魂
  order: number;          // 该类别中序号（1-27）
  tier: number;           // 稀有度 1-5
  description: string;
  passiveBonus?: string;  // 装备被动加成描述
  mergeTarget?: string;   // 合成目标
}

export const DAOYUAN_DAO_FRAGMENTS: DaoyuanDaoFragment[] = [\n"""
        for frag in fragments:
            ts += f"""  {{
    fragmentId: '{frag.get('fragment_id', '???')}',
    fragmentName: '{frag.get('fragment_name', frag.get('fragment_id', '???'))}',
    category: '{frag.get('category', 'human')}',
    order: {frag.get('order', 1)},
    tier: {frag.get('tier', 1)},
    description: '{frag.get('description', '')}',
    passiveBonus: {repr(frag.get('passive_bonus', '')) if frag.get('passive_bonus') else 'undefined'},
    mergeTarget: {repr(frag.get('merge_target', '')) if frag.get('merge_target') else 'undefined'},
  }},\n"""
        ts += "];\n"
        with open(os.path.join(OUT_DIR, 'daoyuanDaoFragments.ts'), 'w', encoding='utf-8') as f:
            f.write(ts)
        print(f"✅ daoyuanDaoFragments.ts — {len(fragments)} 道纹碎片")

    # ── 剩余未分类文件 ──
    known = {'realms', 'skills', 'techniques', 'items', 'beasts', 'dao'}
    others = {k: v for k, v in groups.items() if k not in known}
    if others:
        print(f"\n⚠️ 未分类 .tres（需手动处理）：")
        for cat, files in others.items():
            print(f"  {cat}/ ({len(files)} files): {', '.join(f[0] for f in files)}")

    print(f"\n✅ 转换完成。新文件位于 {OUT_DIR}/")

if __name__ == '__main__':
    generate_all()
