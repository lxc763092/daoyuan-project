/**
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

export const DAOYUAN_ITEMS: DaoyuanItem[] = [
  {
    itemId: 'item_beast_evolve',
    itemName: '进化丹',
    itemType: '3',
    tier: 1,
    description: '灵兽第一次进化所需',
    price: 5000,
    effects: Array,
  },
  {
    itemId: 'item_beast_revive',
    itemName: '御兽丹',
    itemType: '3',
    tier: 1,
    description: '复活阵亡灵兽，恢复50%HP',
    price: 1000,
    effects: Array,
  },
  {
    itemId: 'item_breakthrough',
    itemName: '破境丹',
    itemType: '2',
    tier: 1,
    description: '突破成功率+15%',
    price: 5000,
    effects: Array,
  },
  {
    itemId: 'item_exp_large',
    itemName: '化婴丹',
    itemType: '0',
    tier: 1,
    description: '提供80000点修炼经验，修炼速度+60%持续20分钟',
    price: 30000,
    effects: Array,
  },
  {
    itemId: 'item_exp_legend',
    itemName: '涅槃丹',
    itemType: '0',
    tier: 1,
    description: '提供500000点修炼经验，修炼速度+100%持续30分钟',
    price: 250000,
    effects: Array,
  },
  {
    itemId: 'item_exp_medium',
    itemName: '凝真丹',
    itemType: '0',
    tier: 1,
    description: '提供3000点修炼经验，修炼速度+20%持续5分钟',
    price: 800,
    effects: Array,
  },
  {
    itemId: 'item_exp_small',
    itemName: '培元散',
    itemType: '0',
    tier: 1,
    description: '提供500点修炼经验',
    price: 100,
    effects: Array,
  },
  {
    itemId: 'item_hp_large',
    itemName: '九转还魂丹',
    itemType: '1',
    tier: 1,
    description: '恢复HP 5000点',
    price: 3000,
    effects: Array,
  },
  {
    itemId: 'item_hp_medium',
    itemName: '大还丹',
    itemType: '1',
    tier: 1,
    description: '恢复HP 800点',
    price: 300,
    effects: Array,
  },
  {
    itemId: 'item_hp_small',
    itemName: '回春散',
    itemType: '1',
    tier: 1,
    description: '恢复HP 150点',
    price: 50,
    effects: Array,
  },
  {
    itemId: 'item_mp_large',
    itemName: '太清玉液',
    itemType: '1',
    tier: 1,
    description: '恢复MP 2500点',
    price: 3000,
    effects: Array,
  },
  {
    itemId: 'item_mp_medium',
    itemName: '聚灵丹',
    itemType: '1',
    tier: 1,
    description: '恢复MP 400点',
    price: 300,
    effects: Array,
  },
  {
    itemId: 'item_mp_small',
    itemName: '回气散',
    itemType: '1',
    tier: 1,
    description: '恢复MP 80点',
    price: 50,
    effects: Array,
  },
  {
    itemId: 'item_rage',
    itemName: '怒气丹',
    itemType: '4',
    tier: 1,
    description: '下回合攻击伤害+50%',
    price: 200,
    effects: Array,
  },
  {
    itemId: 'item_shield',
    itemName: '护体丹',
    itemType: '4',
    tier: 1,
    description: '获得相当于最大HP 20%的护盾，持续3回合',
    price: 300,
    effects: Array,
  },
];
