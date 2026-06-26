/**
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

export const DAOYUAN_DAO_FRAGMENTS: DaoyuanDaoFragment[] = [
  {
    fragmentId: 'dao_fragment_001',
    fragmentName: '金之纹·初',
    element: 0,
    description: '记载着金行法则的初始碎片，微微泛着金属光泽',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_002',
    fragmentName: '木之纹·初',
    element: 1,
    description: '蕴含木行生机的最初碎片，触之如握春芽',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_003',
    fragmentName: '水之纹·初',
    element: 2,
    description: '水行法则的第一片碎片，晶莹剔透似永不会干涸',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_004',
    fragmentName: '火之纹·初',
    element: 3,
    description: '火行法则的初始碎片，握在手心微微发烫',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_005',
    fragmentName: '土之纹·初',
    element: 4,
    description: '土行法则的第一片碎片，沉重而安稳',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_010',
    fragmentName: '时空之纹',
    element: 0,
    description: '罕见的时空法则碎片，传说能窥见过去未来',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_015',
    fragmentName: '生命之纹',
    element: 1,
    description: '记载生命奥秘的碎片，焕发着无限生机',
    collected: false,
  },
  {
    fragmentId: 'dao_fragment_020',
    fragmentName: '毁灭之纹',
    element: 0,
    description: '蕴含毁灭法则的碎片，散发着令人生畏的气息',
    collected: false,
  },
];
