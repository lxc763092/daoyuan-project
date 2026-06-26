import type { AbodeDef } from '../types';

/**
 * 凡人修仙傳・洞府目錄。
 * 洞府之要在「靈脈」：靈氣越濃，聚靈陣加成越高、閉關越快。
 * 取得方式：坊市租屋按年付租；城內洞府以靈石購置；宗門洞府憑身分（弟子/長老）分配；
 * 野外靈脈需自行尋占；秘境福地萬中無一。禁制等級決定藏身與安全。
 */
export const ABODES: AbodeDef[] = [
  {
    id: 'inn_room',
    name: '坊市客棧靈房',
    locationKind: '坊市',
    desc: '坊市客棧中以禁制隔絕的靈房，靈氣稀薄、僅堪暫歇打坐。按日結租，散修落腳之選。',
    costStones: 0,
    rentPerYear: 30,
    spiritArray: 0.05,
    herbPlots: 0,
    wardLevel: 1,
  },
  {
    id: 'city_cave_low',
    name: '城內下品洞府',
    locationKind: '城內',
    desc: '修仙城邑中開鑿的下品洞府，引一縷地脈靈氣布成小聚靈陣，附一方薄田，可長住修煉。',
    costStones: 200,
    spiritArray: 0.12,
    herbPlots: 1,
    wardLevel: 2,
    realmReq: '炼气期',
  },
  {
    id: 'sect_disciple_cave',
    name: '宗門弟子洞府',
    locationKind: '宗門',
    desc: '宗門依弟子身分分配的洞府，立有門中維護的聚靈陣與護山禁制餘蔭，安全無虞——惟需門中身分方得入住。',
    costStones: 0,
    identityReq: '宗門弟子',
    spiritArray: 0.18,
    herbPlots: 2,
    wardLevel: 3,
    realmReq: '炼气期',
  },
  {
    id: 'city_cave_mid',
    name: '城內中品洞府',
    locationKind: '城內',
    desc: '靈氣較盛的中品洞府，聚靈陣可織成法力旋渦，藥園數畝，是築基修士安身立命之所。',
    costStones: 1200,
    spiritArray: 0.25,
    herbPlots: 3,
    wardLevel: 3,
    realmReq: '筑基期',
  },
  {
    id: 'wild_vein_cave',
    name: '野外靈脈洞府',
    locationKind: '野外',
    desc: '深山自占的靈脈洞府，無人管轄、藏身極佳，靈氣濃郁勝過城中——然地處荒僻，亦無門派庇護，須自行布陣禦敵。',
    costStones: 600,
    spiritArray: 0.3,
    herbPlots: 4,
    wardLevel: 4,
    realmReq: '筑基期',
  },
  {
    id: 'sect_elder_cave',
    name: '宗門長老洞府',
    locationKind: '宗門',
    desc: '宗門長老級的上品洞府，據門中靈脈要穴，聚靈陣與大型護山禁制環護，唯結丹以上長老身分方可入主。',
    costStones: 0,
    identityReq: '結丹期長老',
    spiritArray: 0.4,
    herbPlots: 5,
    wardLevel: 5,
    realmReq: '金丹期',
  },
  {
    id: 'top_vein_cave',
    name: '上品靈脈洞府',
    locationKind: '野外',
    desc: '罕見的上品靈脈所在，靈氣化作可見白霧，聚靈陣引之入體事半功倍，元嬰修士亦珍之；多為各方勢力必爭之地。',
    costStones: 8000,
    spiritArray: 0.55,
    herbPlots: 6,
    wardLevel: 6,
    realmReq: '元婴期',
  },
  {
    id: 'blessed_grotto',
    name: '秘境洞天福地',
    locationKind: '秘境福地',
    desc: '上古遺留的洞天福地，自成一方天地、靈脈通玄，聚靈之效冠絕人界，內有古陣與奇花異草。萬中無一，可遇而不可求。',
    costStones: 50000,
    spiritArray: 0.85,
    herbPlots: 10,
    wardLevel: 8,
    realmReq: '化神期',
  },
];

export function getAbode(id: string): AbodeDef | undefined {
  return ABODES.find((a) => a.id === id);
}
