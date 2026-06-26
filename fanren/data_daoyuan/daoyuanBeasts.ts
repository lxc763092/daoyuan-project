/**
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

export const DAOYUAN_BEASTS: DaoyuanBeast[] = [
  {
    beastId: 'beast_black_dog',
    beastName: '小黑',
    tier: 1,
    element: 1,
    hp: 80,
    atk: 8,
    def: 3,
    spd: 12,
    description: '',
  },
  {
    beastId: 'beast_black_turtle',
    beastName: '玄龟',
    tier: 1,
    element: 4,
    hp: 2500,
    atk: 80,
    def: 180,
    spd: 20,
    description: '',
  },
  {
    beastId: 'beast_blue_phoenix',
    beastName: '青鸾',
    tier: 1,
    element: 2,
    hp: 300,
    atk: 35,
    def: 15,
    spd: 40,
    description: '',
  },
  {
    beastId: 'beast_fire_kirin',
    beastName: '火麒麟',
    tier: 1,
    element: 3,
    hp: 1200,
    atk: 120,
    def: 50,
    spd: 60,
    description: '',
  },
  {
    beastId: 'beast_golden_roc',
    beastName: '金翅大鹏',
    tier: 1,
    element: 0,
    hp: 5000,
    atk: 350,
    def: 100,
    spd: 90,
    description: '',
  },
];
