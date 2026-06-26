import type { WorldMapNode } from '../types';
// 「發揮想像力」程序化生成的人界地點（小說未明寫、卻合理存在）：亂星海內外島、宗門藥園與設施、國中州城鎮坊市、山脈子峰、秘境內外圍等。
// 由 game_db/_audit/gen_imagined_nodes.cjs 生成；確定性、繼承父節點 firstVolume（劇情閘按大區生效）。共 1044 節點。
export const WORLD_MAP_IMAGINED: WorldMapNode[] = [
 {
  "id": "gg0",
  "name": "黃楓谷藥園",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg1",
  "name": "黃楓谷丹房",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg2",
  "name": "黃楓谷煉器堂",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg3",
  "name": "黃楓谷藏經閣",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2,
  "access": {
   "requiresItem": "黃楓谷弟子令"
  }
 },
 {
  "id": "gg4",
  "name": "黃楓谷演武場",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg5",
  "name": "黃楓谷靈獸園",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg6",
  "name": "黃楓谷護山大陣樞",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg7",
  "name": "黃楓谷靈礦",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg8",
  "name": "黃楓谷外門峰",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg9",
  "name": "黃楓谷內門峰",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg10",
  "name": "黃楓谷接引殿",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg11",
  "name": "黃楓谷戒律堂",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg12",
  "name": "黃楓谷靈田",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg13",
  "name": "黃楓谷後山禁地",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg14",
  "name": "黃楓谷聚靈塔",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg15",
  "name": "黃楓谷丹藥庫",
  "tier": "human",
  "parentId": "huangFengGu",
  "description": "黃楓谷的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "huangFengGu"
  ],
  "firstVolume": 2,
  "access": {
   "requiresItem": "黃楓谷弟子令"
  }
 },
 {
  "id": "gg16",
  "name": "落雲宗藥園",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg17",
  "name": "落雲宗丹房",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg18",
  "name": "落雲宗煉器堂",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg19",
  "name": "落雲宗藏經閣",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5,
  "access": {
   "requiresItem": "落雲宗弟子令"
  }
 },
 {
  "id": "gg20",
  "name": "落雲宗演武場",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg21",
  "name": "落雲宗靈獸園",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg22",
  "name": "落雲宗護山大陣樞",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg23",
  "name": "落雲宗靈礦",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg24",
  "name": "落雲宗外門峰",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg25",
  "name": "落雲宗內門峰",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg26",
  "name": "落雲宗接引殿",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg27",
  "name": "落雲宗戒律堂",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg28",
  "name": "落雲宗靈田",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg29",
  "name": "落雲宗後山禁地",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg30",
  "name": "落雲宗聚靈塔",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg31",
  "name": "落雲宗丹藥庫",
  "tier": "human",
  "parentId": "luoYunZong",
  "description": "落雲宗的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "luoYunZong"
  ],
  "firstVolume": 5,
  "access": {
   "requiresItem": "落雲宗弟子令"
  }
 },
 {
  "id": "gg32",
  "name": "古劍門藥園",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg33",
  "name": "古劍門丹房",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg34",
  "name": "古劍門煉器堂",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg35",
  "name": "古劍門藏經閣",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5,
  "access": {
   "requiresItem": "古劍門弟子令"
  }
 },
 {
  "id": "gg36",
  "name": "古劍門演武場",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg37",
  "name": "古劍門靈獸園",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg38",
  "name": "古劍門護山大陣樞",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg39",
  "name": "古劍門靈礦",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg40",
  "name": "古劍門外門峰",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg41",
  "name": "古劍門內門峰",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg42",
  "name": "古劍門接引殿",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg43",
  "name": "古劍門戒律堂",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg44",
  "name": "古劍門靈田",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg45",
  "name": "古劍門後山禁地",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg46",
  "name": "古劍門聚靈塔",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg47",
  "name": "古劍門丹藥庫",
  "tier": "human",
  "parentId": "guJianMen",
  "description": "古劍門的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "guJianMen"
  ],
  "firstVolume": 5,
  "access": {
   "requiresItem": "古劍門弟子令"
  }
 },
 {
  "id": "gg48",
  "name": "鬼靈門藥園",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg49",
  "name": "鬼靈門丹房",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg50",
  "name": "鬼靈門煉器堂",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg51",
  "name": "鬼靈門藏經閣",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1,
  "access": {
   "requiresItem": "鬼靈門弟子令"
  }
 },
 {
  "id": "gg52",
  "name": "鬼靈門演武場",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg53",
  "name": "鬼靈門靈獸園",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg54",
  "name": "鬼靈門護山大陣樞",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg55",
  "name": "鬼靈門靈礦",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg56",
  "name": "鬼靈門外門峰",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg57",
  "name": "鬼靈門內門峰",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg58",
  "name": "鬼靈門接引殿",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg59",
  "name": "鬼靈門戒律堂",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg60",
  "name": "鬼靈門靈田",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg61",
  "name": "鬼靈門後山禁地",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg62",
  "name": "鬼靈門聚靈塔",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg63",
  "name": "鬼靈門丹藥庫",
  "tier": "human",
  "parentId": "guiLingMen",
  "description": "鬼靈門的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "guiLingMen"
  ],
  "firstVolume": 1,
  "access": {
   "requiresItem": "鬼靈門弟子令"
  }
 },
 {
  "id": "gg64",
  "name": "合歡宗藥園",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg65",
  "name": "合歡宗丹房",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg66",
  "name": "合歡宗煉器堂",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg67",
  "name": "合歡宗藏經閣",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1,
  "access": {
   "requiresItem": "合歡宗弟子令"
  }
 },
 {
  "id": "gg68",
  "name": "合歡宗演武場",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg69",
  "name": "合歡宗靈獸園",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg70",
  "name": "合歡宗護山大陣樞",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg71",
  "name": "合歡宗靈礦",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg72",
  "name": "合歡宗外門峰",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg73",
  "name": "合歡宗內門峰",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg74",
  "name": "合歡宗接引殿",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg75",
  "name": "合歡宗戒律堂",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg76",
  "name": "合歡宗靈田",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg77",
  "name": "合歡宗後山禁地",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg78",
  "name": "合歡宗聚靈塔",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg79",
  "name": "合歡宗丹藥庫",
  "tier": "human",
  "parentId": "heHuanZong",
  "description": "合歡宗的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "heHuanZong"
  ],
  "firstVolume": 1,
  "access": {
   "requiresItem": "合歡宗弟子令"
  }
 },
 {
  "id": "gg80",
  "name": "御靈宗藥園",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg81",
  "name": "御靈宗丹房",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg82",
  "name": "御靈宗煉器堂",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg83",
  "name": "御靈宗藏經閣",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1,
  "access": {
   "requiresItem": "御靈宗弟子令"
  }
 },
 {
  "id": "gg84",
  "name": "御靈宗演武場",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg85",
  "name": "御靈宗靈獸園",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg86",
  "name": "御靈宗護山大陣樞",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg87",
  "name": "御靈宗靈礦",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg88",
  "name": "御靈宗外門峰",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg89",
  "name": "御靈宗內門峰",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg90",
  "name": "御靈宗接引殿",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg91",
  "name": "御靈宗戒律堂",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg92",
  "name": "御靈宗靈田",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg93",
  "name": "御靈宗後山禁地",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg94",
  "name": "御靈宗聚靈塔",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg95",
  "name": "御靈宗丹藥庫",
  "tier": "human",
  "parentId": "yuLingZong",
  "description": "御靈宗的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "yuLingZong"
  ],
  "firstVolume": 1,
  "access": {
   "requiresItem": "御靈宗弟子令"
  }
 },
 {
  "id": "gg96",
  "name": "白竹山天符門藥園",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg97",
  "name": "白竹山天符門丹房",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg98",
  "name": "白竹山天符門煉器堂",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg99",
  "name": "白竹山天符門藏經閣",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6,
  "access": {
   "requiresItem": "白竹山天符門弟子令"
  }
 },
 {
  "id": "gg100",
  "name": "白竹山天符門演武場",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg101",
  "name": "白竹山天符門靈獸園",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg102",
  "name": "白竹山天符門護山大陣樞",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg103",
  "name": "白竹山天符門靈礦",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg104",
  "name": "白竹山天符門外門峰",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg105",
  "name": "白竹山天符門內門峰",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg106",
  "name": "白竹山天符門接引殿",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg107",
  "name": "白竹山天符門戒律堂",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg108",
  "name": "白竹山天符門靈田",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg109",
  "name": "白竹山天符門後山禁地",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg110",
  "name": "白竹山天符門聚靈塔",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg111",
  "name": "白竹山天符門丹藥庫",
  "tier": "human",
  "parentId": "baiZhuShanTianFuMen",
  "description": "白竹山天符門的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "baiZhuShanTianFuMen"
  ],
  "firstVolume": 6,
  "access": {
   "requiresItem": "白竹山天符門弟子令"
  }
 },
 {
  "id": "gg112",
  "name": "血咒之門藥園",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的藥園——宗門栽植靈藥的園圃，由專人看守、結界溫養。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg113",
  "name": "血咒之門丹房",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的丹房——宗門煉丹之所，爐火終年不熄、藥香瀰漫。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg114",
  "name": "血咒之門煉器堂",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的煉器堂——祭煉法器的工坊，地火與寒鐵交鳴。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg115",
  "name": "血咒之門藏經閣",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的藏經閣——收藏功法丹方典籍之地，依階級開放。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6,
  "access": {
   "requiresItem": "血咒之門弟子令"
  }
 },
 {
  "id": "gg116",
  "name": "血咒之門演武場",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的演武場——弟子切磋較技、操演陣法的廣場。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg117",
  "name": "血咒之門靈獸園",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的靈獸園——豢養門中靈獸傀儡的圈苑。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg118",
  "name": "血咒之門護山大陣樞",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的護山大陣樞——維繫護山禁制的陣樞所在，禁人靠近。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg119",
  "name": "血咒之門靈礦",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的靈礦——宗門開採靈石的礦脈，弟子輪值看守。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg120",
  "name": "血咒之門外門峰",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的外門峰——外門弟子聚居的山峰，洞府櫛比。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg121",
  "name": "血咒之門內門峰",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的內門峰——內門弟子所居靈峰，靈氣遠勝外門。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg122",
  "name": "血咒之門接引殿",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的接引殿——迎送賓客、登記門人的殿堂。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg123",
  "name": "血咒之門戒律堂",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的戒律堂——執掌門規刑罰之地，氣氛森嚴。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg124",
  "name": "血咒之門靈田",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的靈田——引靈脈灌溉的田畝，種植靈稻靈穀。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg125",
  "name": "血咒之門後山禁地",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的後山禁地——門中封禁的後山，傳有兇險與秘辛。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg126",
  "name": "血咒之門聚靈塔",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的聚靈塔——匯聚周天靈氣供弟子閉關的高塔。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg127",
  "name": "血咒之門丹藥庫",
  "tier": "human",
  "parentId": "xueZhouZhiMen",
  "description": "血咒之門的丹藥庫——貯藏成丹與珍材的庫房，重重設禁。",
  "connections": [
   "xueZhouZhiMen"
  ],
  "firstVolume": 6,
  "access": {
   "requiresItem": "血咒之門弟子令"
  }
 },
 {
  "id": "gg128",
  "name": "內星海",
  "tier": "human",
  "parentId": "luanXingHai",
  "description": "亂星海核心海域，諸大勢力環伺，靈氣最盛。",
  "connections": [
   "luanXingHai"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg129",
  "name": "中星海",
  "tier": "human",
  "parentId": "luanXingHai",
  "description": "亂星海中部海域，島嶼星羅、商路縱橫。",
  "connections": [
   "luanXingHai"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg130",
  "name": "外星海",
  "tier": "human",
  "parentId": "luanXingHai",
  "description": "亂星海外圍海域，妖獸橫行、人跡罕至。",
  "connections": [
   "luanXingHai"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg131",
  "name": "星海邊緣",
  "tier": "human",
  "parentId": "luanXingHai",
  "description": "亂星海最外緣，接無邊汪洋，傳送古陣零星。",
  "connections": [
   "luanXingHai"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg132",
  "name": "雷蜂島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg133",
  "name": "瀾幽島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg134",
  "name": "墨寒島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg135",
  "name": "鯨風島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg136",
  "name": "白翠島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg137",
  "name": "鯤龍島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg138",
  "name": "天霜島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg139",
  "name": "黑嵐島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg140",
  "name": "瓊虎島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg141",
  "name": "縹青島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg142",
  "name": "鰲蟾島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg143",
  "name": "璇滄島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg144",
  "name": "煙翡島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg145",
  "name": "嵐鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg146",
  "name": "朱瓊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg147",
  "name": "幽縹島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg148",
  "name": "黑瓊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg149",
  "name": "龍蛛島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg150",
  "name": "墨蛇島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg151",
  "name": "蛟蛟島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg152",
  "name": "緋瑤島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg153",
  "name": "幽貅島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg154",
  "name": "雲瀾島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg155",
  "name": "銀寒島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg156",
  "name": "鰲赭島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg157",
  "name": "玄霜島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg158",
  "name": "丹鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg159",
  "name": "皓鯨島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg160",
  "name": "幽靈島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg161",
  "name": "鷹雲島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg162",
  "name": "滄貅島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg163",
  "name": "紫蛟島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg164",
  "name": "金瓊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg165",
  "name": "寒赤島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg166",
  "name": "石鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg167",
  "name": "玉珞島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg168",
  "name": "青蛇島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg169",
  "name": "赤瓊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg170",
  "name": "玦鴞島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg171",
  "name": "玦狼島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg172",
  "name": "火白島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg173",
  "name": "嵐蟾島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg174",
  "name": "蒼鯨島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg175",
  "name": "鰲鹿島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg176",
  "name": "朱鰲島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg177",
  "name": "龍鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg178",
  "name": "寒珩島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg179",
  "name": "綠玦島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg180",
  "name": "瑤鵰島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg181",
  "name": "緋琉島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg182",
  "name": "霞蜂島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg183",
  "name": "玉鵰島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg184",
  "name": "赤蟾島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg185",
  "name": "鷹赭島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg186",
  "name": "皓麟島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg187",
  "name": "蒼鰲島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg188",
  "name": "曦煙島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg189",
  "name": "烈鷹島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg190",
  "name": "玄寒島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg191",
  "name": "皓烈島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg192",
  "name": "朱狼島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg193",
  "name": "火豹島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg194",
  "name": "赭金島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg195",
  "name": "風豹島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg196",
  "name": "金鯤島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg197",
  "name": "璇紫島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg198",
  "name": "鯤鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg199",
  "name": "瓊黛島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg200",
  "name": "玄風島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg201",
  "name": "瑤鯤島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg202",
  "name": "麟翡島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg203",
  "name": "虎鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg204",
  "name": "金蟾島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg205",
  "name": "翠滄島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg206",
  "name": "雷雲島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg207",
  "name": "瓊瑤島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg208",
  "name": "天鶴島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg209",
  "name": "鯤猿島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg210",
  "name": "煙狐島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg211",
  "name": "虎鳳島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg212",
  "name": "鳳鯊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg213",
  "name": "龍猿島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg214",
  "name": "寒赭島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg215",
  "name": "靈鵬島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg216",
  "name": "烈曦島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg217",
  "name": "石寒島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg218",
  "name": "綠黑島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg219",
  "name": "翠豹島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg220",
  "name": "玄天島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg221",
  "name": "滄翡島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg222",
  "name": "霞綠島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg223",
  "name": "皓鷹島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg224",
  "name": "雷翡島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg225",
  "name": "雲天島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg226",
  "name": "瀾瓊島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg227",
  "name": "霞鯉島",
  "tier": "human",
  "parentId": "gg128",
  "description": "內星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg128"
  ]
 },
 {
  "id": "gg228",
  "name": "翠鯨島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg229",
  "name": "曦朱島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg230",
  "name": "暝石島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg231",
  "name": "虎鰲島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg232",
  "name": "珩蒼島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg233",
  "name": "珩銀島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg234",
  "name": "滄琉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg235",
  "name": "黛白島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg236",
  "name": "玉鯉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg237",
  "name": "瓊狐島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg238",
  "name": "雷鼉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg239",
  "name": "瀾霜島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg240",
  "name": "黑幽島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg241",
  "name": "瓊雷島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg242",
  "name": "白火島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg243",
  "name": "鯤曦島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg244",
  "name": "天鳳島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg245",
  "name": "黑龍島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg246",
  "name": "瓊珞島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg247",
  "name": "縹墨島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg248",
  "name": "龍蒼島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg249",
  "name": "蟾寒島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg250",
  "name": "赤暝島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg251",
  "name": "丹鯉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg252",
  "name": "火玦島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg253",
  "name": "鰲丹島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg254",
  "name": "寒霜島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg255",
  "name": "龍風島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg256",
  "name": "滄虎島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg257",
  "name": "蟾銀島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg258",
  "name": "白鰲島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg259",
  "name": "石石島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg260",
  "name": "縹璇島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg261",
  "name": "霜鯊島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg262",
  "name": "雲赤島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg263",
  "name": "玦暝島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg264",
  "name": "翡風島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg265",
  "name": "瑤蒼島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg266",
  "name": "青靈島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg267",
  "name": "珊赤島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg268",
  "name": "鯨暝島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg269",
  "name": "曦赤島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg270",
  "name": "霜碧島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg271",
  "name": "雷寒島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg272",
  "name": "滄墨島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg273",
  "name": "靈玉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg274",
  "name": "蒼石島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg275",
  "name": "麟鳳島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg276",
  "name": "烈蟾島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg277",
  "name": "珊縹島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg278",
  "name": "鯨蒼島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg279",
  "name": "金虎島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg280",
  "name": "琉蟾島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg281",
  "name": "風珩島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg282",
  "name": "瓊璇島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg129"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg283",
  "name": "天火島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg284",
  "name": "紫玉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg285",
  "name": "烈石島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg286",
  "name": "金霜島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg287",
  "name": "瀾蛟島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg288",
  "name": "煙鰲島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg289",
  "name": "銀紫島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg290",
  "name": "雲墨島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg291",
  "name": "天蜂島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg292",
  "name": "瓊寒島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg293",
  "name": "琉瀾島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg294",
  "name": "玦蟾島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg295",
  "name": "碧翠島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg129"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg296",
  "name": "璇玦島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg297",
  "name": "青玉島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg298",
  "name": "曦青島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg299",
  "name": "靈蛇島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg300",
  "name": "金紫島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg301",
  "name": "紫鵬島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg302",
  "name": "鯨水島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg303",
  "name": "青雲島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg304",
  "name": "翠曦島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg305",
  "name": "暝幽島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg306",
  "name": "烈鶴島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg307",
  "name": "鯨玦島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg308",
  "name": "風暝島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg309",
  "name": "黑璇島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg310",
  "name": "鯊蜂島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg311",
  "name": "雷蟾島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg312",
  "name": "玦虎島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg313",
  "name": "風雷島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg314",
  "name": "翡霜島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg315",
  "name": "翡墨島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg316",
  "name": "琉風島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg317",
  "name": "鳳鷹島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg318",
  "name": "蟾珞島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg319",
  "name": "鷹鯊島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg320",
  "name": "水蛟島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg321",
  "name": "蟾鯊島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg322",
  "name": "皓滄島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg323",
  "name": "石麟島",
  "tier": "human",
  "parentId": "gg129",
  "description": "中星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg129"
  ]
 },
 {
  "id": "gg324",
  "name": "麟烈島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg325",
  "name": "蟾蟒島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg326",
  "name": "寒貅島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg327",
  "name": "烈雲島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg328",
  "name": "縹蛟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg329",
  "name": "皓蛟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg130"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg330",
  "name": "赤玉島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg331",
  "name": "瓊玦島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg332",
  "name": "翡鳳島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg333",
  "name": "瀾珞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg334",
  "name": "紫綠島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg335",
  "name": "瀾蟒島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg336",
  "name": "丹鵬島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg337",
  "name": "琉珊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg338",
  "name": "瓊鯤島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg339",
  "name": "霞龍島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg340",
  "name": "雲火島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg341",
  "name": "雷曦島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg342",
  "name": "赭貔島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg343",
  "name": "瑤虎島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg344",
  "name": "綠鴞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg345",
  "name": "霞霞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg346",
  "name": "翡滄島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg347",
  "name": "丹貅島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg348",
  "name": "鰲麟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg349",
  "name": "蒼虎島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg350",
  "name": "嵐蛇島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg351",
  "name": "嵐緋島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg352",
  "name": "雷瓊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg353",
  "name": "水黑島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg354",
  "name": "琉靈島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg355",
  "name": "瓊獾島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg356",
  "name": "黑綠島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg357",
  "name": "琉獾島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg358",
  "name": "虎珩島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg359",
  "name": "朱玉島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg360",
  "name": "天縹島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg361",
  "name": "火寒島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg362",
  "name": "鯨蛟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg363",
  "name": "雷霜島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg364",
  "name": "縹滄島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg365",
  "name": "黛瓊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg366",
  "name": "翠鶴島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg367",
  "name": "瀾霞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg368",
  "name": "鯨翡島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg369",
  "name": "銀鹿島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg370",
  "name": "鯊翡島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg371",
  "name": "鯤珊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg372",
  "name": "蛟鰲島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg373",
  "name": "珞金島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg374",
  "name": "火緋島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg375",
  "name": "鯤緋島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg376",
  "name": "珞鴞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg377",
  "name": "蛟琉島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg378",
  "name": "玄瓊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg379",
  "name": "緋麟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg380",
  "name": "天鯤島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg381",
  "name": "水蛇島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg382",
  "name": "幽翠島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg383",
  "name": "霜鴞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg384",
  "name": "珩煙島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg385",
  "name": "鳳猿島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg386",
  "name": "白蛟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg387",
  "name": "玦烈島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg388",
  "name": "翠緋島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg389",
  "name": "暝金島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg390",
  "name": "綠珊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg391",
  "name": "雲蛇島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg392",
  "name": "幽獾島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg393",
  "name": "玄鼉島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg394",
  "name": "翡珩島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg395",
  "name": "石豹島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg396",
  "name": "珩鷹島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg397",
  "name": "璇寒島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg398",
  "name": "紫珞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg399",
  "name": "白玉島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg400",
  "name": "霞鯤島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg401",
  "name": "金蟒島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg402",
  "name": "瓊火島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg403",
  "name": "靈曦島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg404",
  "name": "瓊蛟島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg405",
  "name": "琉瓊島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg406",
  "name": "緋雲島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg407",
  "name": "碧鳳島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg408",
  "name": "白天島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg409",
  "name": "珊皓島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg410",
  "name": "碧蛇島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg411",
  "name": "瓊赭島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg412",
  "name": "幽丹島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg413",
  "name": "琉鷹島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg414",
  "name": "雲鼉島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg415",
  "name": "朱蟒島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg416",
  "name": "龍霞島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg417",
  "name": "墨獾島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg418",
  "name": "璇鳳島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg419",
  "name": "鰲雲島",
  "tier": "human",
  "parentId": "gg130",
  "description": "外星海中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg130"
  ]
 },
 {
  "id": "gg420",
  "name": "朱碧島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg421",
  "name": "烈鰲島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg422",
  "name": "寒珊島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg423",
  "name": "水麟島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg424",
  "name": "幽石島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg425",
  "name": "霞鹿島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg426",
  "name": "龍暝島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg427",
  "name": "蛟蟾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg428",
  "name": "玦鵰島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg429",
  "name": "火銀島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg430",
  "name": "黑鼉島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg431",
  "name": "煙鵬島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg432",
  "name": "鯊綠島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg433",
  "name": "暝曦島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg434",
  "name": "翠寒島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg435",
  "name": "蛟滄島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg436",
  "name": "黑貅島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg437",
  "name": "天狐島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg438",
  "name": "幽霞島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg439",
  "name": "水黛島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg440",
  "name": "紫珊島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg441",
  "name": "赤霜島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg442",
  "name": "玉風島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg443",
  "name": "嵐蛛島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg444",
  "name": "珊白島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg445",
  "name": "曦鹿島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg446",
  "name": "鳳獾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg447",
  "name": "鯤火島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg448",
  "name": "滄蛛島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg449",
  "name": "麟墨島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg450",
  "name": "玉蜂島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ],
  "access": {
   "requiresItem": "殘破海圖"
  }
 },
 {
  "id": "gg451",
  "name": "烈瀾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg452",
  "name": "鯊墨島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg453",
  "name": "石珩島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg454",
  "name": "虎火島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg455",
  "name": "風黛島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg456",
  "name": "皓狐島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg457",
  "name": "翡龍島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg458",
  "name": "鷹蟾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg459",
  "name": "瑤鯨島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg460",
  "name": "珊鷹島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg461",
  "name": "黛蟾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg462",
  "name": "赭龍島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg463",
  "name": "玄烈島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg464",
  "name": "滄蛟島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg465",
  "name": "鳳青島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg466",
  "name": "鷹玦島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg467",
  "name": "珩墨島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg468",
  "name": "蒼珞島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg469",
  "name": "赤朱島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg470",
  "name": "玦珊島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg471",
  "name": "蛟幽島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg472",
  "name": "雲蒼島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg473",
  "name": "石瀾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg474",
  "name": "瓊鯉島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg475",
  "name": "寒翠島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg476",
  "name": "緋蟾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg477",
  "name": "丹麟島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg478",
  "name": "璇鶴島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg479",
  "name": "綠蜂島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg480",
  "name": "銀暝島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg481",
  "name": "碧鹿島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg482",
  "name": "黛鷹島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg483",
  "name": "銀蟾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg484",
  "name": "墨朱島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg485",
  "name": "緋鯤島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg486",
  "name": "虎幽島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg131"
  ],
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg487",
  "name": "碧玦島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg488",
  "name": "白水島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg489",
  "name": "珩鯉島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg490",
  "name": "瓊皓島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg491",
  "name": "鳳曦島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg492",
  "name": "霞蟒島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg493",
  "name": "赭虎島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg494",
  "name": "朱鳳島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg495",
  "name": "瓊嵐島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg496",
  "name": "皓龍島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島心有一處上古海眼，潮汐紊亂。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg497",
  "name": "珞烈島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg498",
  "name": "暝霜島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg499",
  "name": "玄豹島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg500",
  "name": "丹獾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg501",
  "name": "石鹿島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg502",
  "name": "雷玄島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg503",
  "name": "滄霞島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg504",
  "name": "雲風島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg505",
  "name": "滄金島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，荒涼貧瘠，唯有零星海獸出沒。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg506",
  "name": "翡緋島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈氣氤氳，棲息著兇悍的二三階妖獸。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg507",
  "name": "蒼靈島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg508",
  "name": "石蟾島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，常年雲霧繚繞，傳有妖修盤踞。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg509",
  "name": "赤鯉島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg510",
  "name": "鯨鯨島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為某宗在外海的中轉據點，設傳送石屋。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg511",
  "name": "風玄島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上靈泉甘冽，可供修士溫養法力。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg512",
  "name": "火烈島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，島上有前人遺留的廢棄洞府。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg513",
  "name": "玉蟒島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，盛產海中靈材與珊瑚靈石。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg514",
  "name": "曦天島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，為散修聚居之所，設有簡陋坊市與補給。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg515",
  "name": "暝綠島",
  "tier": "human",
  "parentId": "gg131",
  "description": "星海邊緣中一座島嶼，四周暗礁密布，常有沉舟遺寶。",
  "connections": [
   "gg131"
  ]
 },
 {
  "id": "gg516",
  "name": "靈昌州",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg517",
  "name": "黛奇州",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg518",
  "name": "緋靜州",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg519",
  "name": "暝平州",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg520",
  "name": "緋孤城",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一座城池，市集繁華。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg521",
  "name": "瓊長城",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一座城池，市集繁華。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg522",
  "name": "琉定城",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一座城池，市集繁華。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg523",
  "name": "鯨飛鎮",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，邊鄙集鎮。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg524",
  "name": "鯊危鎮",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，邊鄙集鎮。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg525",
  "name": "鯊望鎮",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，邊鄙集鎮。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg526",
  "name": "玉鎮鎮",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，邊鄙集鎮。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg527",
  "name": "危黛坊市",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，修士交易的坊市。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg528",
  "name": "廣丹坊市",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，修士交易的坊市。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg529",
  "name": "天定關",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，扼守要道的關隘。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg530",
  "name": "蛟幽山",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，境內名山。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg531",
  "name": "玦險山",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，境內名山。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg532",
  "name": "雷寧湖",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，一泓大湖，水波浩渺。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg533",
  "name": "珞晦林",
  "tier": "human",
  "parentId": "yueGuo",
  "description": "越國境內，莽莽林海。",
  "connections": [
   "yueGuo"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg534",
  "name": "珊泰州",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg535",
  "name": "滄通州",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg536",
  "name": "鰲泰州",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg537",
  "name": "水晦州",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg538",
  "name": "翡廣城",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一座城池，市集繁華。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg539",
  "name": "蛟豐城",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一座城池，市集繁華。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg540",
  "name": "天靜城",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一座城池，市集繁華。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg541",
  "name": "青望鎮",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，邊鄙集鎮。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg542",
  "name": "煙奇鎮",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，邊鄙集鎮。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg543",
  "name": "暝飛鎮",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，邊鄙集鎮。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg544",
  "name": "翡奇鎮",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，邊鄙集鎮。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg545",
  "name": "安風坊市",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，修士交易的坊市。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg546",
  "name": "冥黑坊市",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，修士交易的坊市。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg547",
  "name": "瓊飛關",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，扼守要道的關隘。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg548",
  "name": "鳳安山",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，境內名山。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg549",
  "name": "玉隱山",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，境內名山。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg550",
  "name": "天廣湖",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，一泓大湖，水波浩渺。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg551",
  "name": "璇危林",
  "tier": "human",
  "parentId": "yuanWuGuo",
  "description": "元武國境內，莽莽林海。",
  "connections": [
   "yuanWuGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg552",
  "name": "鯤平州",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg553",
  "name": "珊孤州",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg554",
  "name": "雷興州",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg555",
  "name": "麟寧州",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg556",
  "name": "朱斷城",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一座城池，市集繁華。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg557",
  "name": "鯤望城",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一座城池，市集繁華。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg558",
  "name": "風斷城",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一座城池，市集繁華。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg559",
  "name": "鯊安鎮",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，邊鄙集鎮。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg560",
  "name": "風孤鎮",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，邊鄙集鎮。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg561",
  "name": "縹危鎮",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，邊鄙集鎮。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg562",
  "name": "雷冥鎮",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，邊鄙集鎮。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg563",
  "name": "罡翠坊市",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，修士交易的坊市。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg564",
  "name": "聖火坊市",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，修士交易的坊市。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg565",
  "name": "璇斷關",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，扼守要道的關隘。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg566",
  "name": "曦險山",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，境內名山。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg567",
  "name": "烈興山",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，境內名山。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg568",
  "name": "龍斷湖",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，一泓大湖，水波浩渺。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg569",
  "name": "麟樂林",
  "tier": "human",
  "parentId": "tianLuoGuo",
  "description": "天羅國境內，莽莽林海。",
  "connections": [
   "tianLuoGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg570",
  "name": "翠隱州",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg571",
  "name": "綠聖州",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg572",
  "name": "赭鎖州",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg573",
  "name": "瓊豐州",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg574",
  "name": "烈廣城",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一座城池，市集繁華。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg575",
  "name": "玦長城",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一座城池，市集繁華。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg576",
  "name": "煙廣城",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一座城池，市集繁華。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg577",
  "name": "火飛鎮",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，邊鄙集鎮。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg578",
  "name": "翠臥鎮",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，邊鄙集鎮。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg579",
  "name": "煙冥鎮",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，邊鄙集鎮。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg580",
  "name": "虎長鎮",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，邊鄙集鎮。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg581",
  "name": "長虎坊市",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，修士交易的坊市。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg582",
  "name": "冥寒坊市",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，修士交易的坊市。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg583",
  "name": "瀾寧關",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，扼守要道的關隘。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg584",
  "name": "霞豐山",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，境內名山。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg585",
  "name": "綠冥山",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，境內名山。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg586",
  "name": "赤樂湖",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，一泓大湖，水波浩渺。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg587",
  "name": "墨長林",
  "tier": "human",
  "parentId": "fengDuGuo",
  "description": "風都國境內，莽莽林海。",
  "connections": [
   "fengDuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg588",
  "name": "雷泰州",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg589",
  "name": "石興州",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg590",
  "name": "皓寧州",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg591",
  "name": "瀾危州",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg592",
  "name": "玉望城",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一座城池，市集繁華。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg593",
  "name": "曦臥城",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一座城池，市集繁華。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg594",
  "name": "瑤靈城",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一座城池，市集繁華。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg595",
  "name": "瓊孤鎮",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，邊鄙集鎮。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg596",
  "name": "暝斷鎮",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，邊鄙集鎮。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg597",
  "name": "朱泰鎮",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，邊鄙集鎮。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg598",
  "name": "鰲鎮鎮",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，邊鄙集鎮。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg599",
  "name": "平火坊市",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，修士交易的坊市。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg600",
  "name": "飛水坊市",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，修士交易的坊市。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg601",
  "name": "鯤靜關",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，扼守要道的關隘。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg602",
  "name": "丹通山",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，境內名山。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg603",
  "name": "丹飛山",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，境內名山。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg604",
  "name": "瑤隱湖",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，一泓大湖，水波浩渺。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg605",
  "name": "鯨通林",
  "tier": "human",
  "parentId": "xiGuo",
  "description": "溪國境內，莽莽林海。",
  "connections": [
   "xiGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg606",
  "name": "金斷州",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg607",
  "name": "嵐靈州",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg608",
  "name": "鰲聖州",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg609",
  "name": "銀樂州",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg610",
  "name": "綠興城",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一座城池，市集繁華。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg611",
  "name": "玄險城",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一座城池，市集繁華。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg612",
  "name": "火興城",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一座城池，市集繁華。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg613",
  "name": "烈落鎮",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，邊鄙集鎮。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg614",
  "name": "石廣鎮",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，邊鄙集鎮。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg615",
  "name": "蒼幽鎮",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，邊鄙集鎮。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg616",
  "name": "翠孤鎮",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，邊鄙集鎮。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg617",
  "name": "鎖玦坊市",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，修士交易的坊市。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg618",
  "name": "秘烈坊市",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，修士交易的坊市。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg619",
  "name": "玄晦關",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，扼守要道的關隘。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg620",
  "name": "玄昌山",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，境內名山。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg621",
  "name": "蟾奇山",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，境內名山。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg622",
  "name": "墨斷湖",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，一泓大湖，水波浩渺。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg623",
  "name": "寒隱林",
  "tier": "human",
  "parentId": "yuGuo",
  "description": "虞國境內，莽莽林海。",
  "connections": [
   "yuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg624",
  "name": "玉孤州",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg625",
  "name": "瑤幽州",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg626",
  "name": "蟾冥州",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg627",
  "name": "雷幽州",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg628",
  "name": "鯊飛城",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一座城池，市集繁華。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg629",
  "name": "玉臥城",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一座城池，市集繁華。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg630",
  "name": "鯨冥城",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一座城池，市集繁華。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg631",
  "name": "珞昌鎮",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，邊鄙集鎮。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg632",
  "name": "虎豐鎮",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，邊鄙集鎮。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg633",
  "name": "丹雄鎮",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，邊鄙集鎮。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg634",
  "name": "璇秘鎮",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，邊鄙集鎮。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg635",
  "name": "危翠坊市",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，修士交易的坊市。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg636",
  "name": "昌暝坊市",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，修士交易的坊市。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg637",
  "name": "皓昌關",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，扼守要道的關隘。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg638",
  "name": "瓊聖山",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，境內名山。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg639",
  "name": "鳳昌山",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，境內名山。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg640",
  "name": "皓隱湖",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，一泓大湖，水波浩渺。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg641",
  "name": "蛟鎮林",
  "tier": "human",
  "parentId": "beiLiangGuo",
  "description": "北涼國境內，莽莽林海。",
  "connections": [
   "beiLiangGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg642",
  "name": "鯨聖州",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg643",
  "name": "珊昌州",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg644",
  "name": "翠豐州",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg645",
  "name": "烈鎖州",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg646",
  "name": "玄奇城",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一座城池，市集繁華。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg647",
  "name": "墨靜城",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一座城池，市集繁華。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg648",
  "name": "瑤危城",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一座城池，市集繁華。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg649",
  "name": "鯤安鎮",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，邊鄙集鎮。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg650",
  "name": "縹靈鎮",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，邊鄙集鎮。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg651",
  "name": "瓊安鎮",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，邊鄙集鎮。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg652",
  "name": "靈泰鎮",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，邊鄙集鎮。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg653",
  "name": "靈靈坊市",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，修士交易的坊市。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg654",
  "name": "安霞坊市",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，修士交易的坊市。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg655",
  "name": "霞秘關",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，扼守要道的關隘。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg656",
  "name": "曦隱山",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，境內名山。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg657",
  "name": "珞通山",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，境內名山。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg658",
  "name": "赭秘湖",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，一泓大湖，水波浩渺。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg659",
  "name": "瓊孤林",
  "tier": "human",
  "parentId": "dongYuGuo",
  "description": "東裕國境內，莽莽林海。",
  "connections": [
   "dongYuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg660",
  "name": "碧寧州",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg661",
  "name": "火晦州",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg662",
  "name": "白冥州",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg663",
  "name": "珊長州",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg664",
  "name": "玄樂城",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一座城池，市集繁華。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg665",
  "name": "幽晦城",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一座城池，市集繁華。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg666",
  "name": "蛟孤城",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一座城池，市集繁華。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg667",
  "name": "烈寧鎮",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，邊鄙集鎮。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg668",
  "name": "虎危鎮",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，邊鄙集鎮。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg669",
  "name": "鯊興鎮",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，邊鄙集鎮。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg670",
  "name": "曦危鎮",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，邊鄙集鎮。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg671",
  "name": "奇銀坊市",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，修士交易的坊市。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg672",
  "name": "險丹坊市",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，修士交易的坊市。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg673",
  "name": "水定關",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，扼守要道的關隘。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg674",
  "name": "緋聖山",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，境內名山。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg675",
  "name": "瓊飛山",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，境內名山。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg676",
  "name": "霞孤湖",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，一泓大湖，水波浩渺。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg677",
  "name": "青樂林",
  "tier": "human",
  "parentId": "jiangGuo",
  "description": "姜國境內，莽莽林海。",
  "connections": [
   "jiangGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg678",
  "name": "碧飛州",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg679",
  "name": "麟奇州",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg680",
  "name": "鯊冥州",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg681",
  "name": "風幽州",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg682",
  "name": "朱孤城",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一座城池，市集繁華。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg683",
  "name": "玄興城",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一座城池，市集繁華。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg684",
  "name": "赤罡城",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一座城池，市集繁華。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg685",
  "name": "蛟孤鎮",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，邊鄙集鎮。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg686",
  "name": "碧斷鎮",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，邊鄙集鎮。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg687",
  "name": "麟廣鎮",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，邊鄙集鎮。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg688",
  "name": "金安鎮",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，邊鄙集鎮。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg689",
  "name": "聖雷坊市",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，修士交易的坊市。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg690",
  "name": "隱風坊市",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，修士交易的坊市。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg691",
  "name": "煙罡關",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，扼守要道的關隘。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg692",
  "name": "幽危山",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，境內名山。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg693",
  "name": "赭險山",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，境內名山。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg694",
  "name": "蒼寧湖",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，一泓大湖，水波浩渺。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg695",
  "name": "火平林",
  "tier": "human",
  "parentId": "fengYuanGuo",
  "description": "豐原國境內，莽莽林海。",
  "connections": [
   "fengYuanGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg696",
  "name": "玉險州",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg697",
  "name": "寒幽州",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg698",
  "name": "烈寧州",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg699",
  "name": "紫落州",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg700",
  "name": "鯊雄城",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一座城池，市集繁華。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg701",
  "name": "鰲長城",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一座城池，市集繁華。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg702",
  "name": "天廣城",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一座城池，市集繁華。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg703",
  "name": "霜昌鎮",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，邊鄙集鎮。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg704",
  "name": "銀臥鎮",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，邊鄙集鎮。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg705",
  "name": "赭鎖鎮",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，邊鄙集鎮。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg706",
  "name": "曦臥鎮",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，邊鄙集鎮。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg707",
  "name": "危丹坊市",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，修士交易的坊市。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg708",
  "name": "寧瑤坊市",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，修士交易的坊市。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg709",
  "name": "水飛關",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，扼守要道的關隘。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg710",
  "name": "暝秘山",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，境內名山。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg711",
  "name": "瓊鎖山",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，境內名山。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg712",
  "name": "銀昌湖",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，一泓大湖，水波浩渺。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg713",
  "name": "鯤通林",
  "tier": "human",
  "parentId": "xuGuo",
  "description": "胥國境內，莽莽林海。",
  "connections": [
   "xuGuo"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg714",
  "name": "玄落州",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg715",
  "name": "玦定州",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg716",
  "name": "曦長州",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg717",
  "name": "綠靜州",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一州之地，下轄城鎮村墟。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg718",
  "name": "煙絕城",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一座城池，市集繁華。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg719",
  "name": "碧雄城",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一座城池，市集繁華。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg720",
  "name": "黛聖城",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一座城池，市集繁華。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg721",
  "name": "鰲晦鎮",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，邊鄙集鎮。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg722",
  "name": "火廣鎮",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，邊鄙集鎮。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg723",
  "name": "龍通鎮",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，邊鄙集鎮。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg724",
  "name": "寒孤鎮",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，邊鄙集鎮。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg725",
  "name": "靈幽坊市",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，修士交易的坊市。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg726",
  "name": "興玄坊市",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，修士交易的坊市。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg727",
  "name": "白落關",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，扼守要道的關隘。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg728",
  "name": "鯨泰山",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，境內名山。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg729",
  "name": "鯨絕山",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，境內名山。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg730",
  "name": "烈落湖",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，一泓大湖，水波浩渺。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg731",
  "name": "蛟靜林",
  "tier": "human",
  "parentId": "cheQiGuo",
  "description": "車騎國境內，莽莽林海。",
  "connections": [
   "cheQiGuo"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg732",
  "name": "墨寧鎮",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，州下集鎮。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg733",
  "name": "青興鎮",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，州下集鎮。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg734",
  "name": "銀孤鎮",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，州下集鎮。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg735",
  "name": "寒幽村",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，尋常村落。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg736",
  "name": "蟾雄村",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，尋常村落。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg737",
  "name": "煙幽村",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，尋常村落。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg738",
  "name": "蒼定坊市",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，小型坊市。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg739",
  "name": "緋興驛",
  "tier": "human",
  "parentId": "jingZhou",
  "description": "鏡州所轄，官道驛站。",
  "connections": [
   "jingZhou"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg740",
  "name": "瀾聖鎮",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，州下集鎮。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg741",
  "name": "蒼廣鎮",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，州下集鎮。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg742",
  "name": "瑤聖鎮",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，州下集鎮。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg743",
  "name": "珞靈村",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，尋常村落。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg744",
  "name": "虎聖村",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，尋常村落。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg745",
  "name": "丹泰村",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，尋常村落。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg746",
  "name": "瑤臥坊市",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，小型坊市。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg747",
  "name": "雲孤驛",
  "tier": "human",
  "parentId": "lanZhou",
  "description": "嵐州所轄，官道驛站。",
  "connections": [
   "lanZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg748",
  "name": "翠廣鎮",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，州下集鎮。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg749",
  "name": "碧絕鎮",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，州下集鎮。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg750",
  "name": "靈罡鎮",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，州下集鎮。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg751",
  "name": "玄興村",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，尋常村落。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg752",
  "name": "珩泰村",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，尋常村落。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg753",
  "name": "玦危村",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，尋常村落。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg754",
  "name": "曦雄坊市",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，小型坊市。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg755",
  "name": "縹幽驛",
  "tier": "human",
  "parentId": "jianZhou",
  "description": "建州所轄，官道驛站。",
  "connections": [
   "jianZhou"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg756",
  "name": "綠通鎮",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，州下集鎮。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg757",
  "name": "龍靈鎮",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，州下集鎮。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg758",
  "name": "瓊通鎮",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，州下集鎮。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg759",
  "name": "黛靈村",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，尋常村落。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg760",
  "name": "蛟安村",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，尋常村落。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg761",
  "name": "赭望村",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，尋常村落。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg762",
  "name": "琉晦坊市",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，小型坊市。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg763",
  "name": "幽定驛",
  "tier": "human",
  "parentId": "linZhou",
  "description": "藺州所轄，官道驛站。",
  "connections": [
   "linZhou"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg764",
  "name": "曦罡鎮",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，州下集鎮。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg765",
  "name": "白斷鎮",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，州下集鎮。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg766",
  "name": "黛定鎮",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，州下集鎮。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg767",
  "name": "丹秘村",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，尋常村落。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg768",
  "name": "火昌村",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，尋常村落。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg769",
  "name": "風秘村",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，尋常村落。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg770",
  "name": "雷靈坊市",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，小型坊市。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg771",
  "name": "赭平驛",
  "tier": "human",
  "parentId": "minZhou",
  "description": "閩州所轄，官道驛站。",
  "connections": [
   "minZhou"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg772",
  "name": "玉雄鎮",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，州下集鎮。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg773",
  "name": "瑤斷鎮",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，州下集鎮。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg774",
  "name": "玄泰鎮",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，州下集鎮。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg775",
  "name": "赭奇村",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，尋常村落。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg776",
  "name": "龍寧村",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，尋常村落。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg777",
  "name": "綠危村",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，尋常村落。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg778",
  "name": "鳳靜坊市",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，小型坊市。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg779",
  "name": "金秘驛",
  "tier": "human",
  "parentId": "longZhou",
  "description": "隴州所轄，官道驛站。",
  "connections": [
   "longZhou"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg780",
  "name": "豐赭坊",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，城中坊區。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg781",
  "name": "鎖翡坊",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，城中坊區。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg782",
  "name": "平赤坊",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，城中坊區。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg783",
  "name": "樂鯊樓",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，城內名樓。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg784",
  "name": "平煙樓",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，城內名樓。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg785",
  "name": "靜暝街",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，熱鬧長街。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg786",
  "name": "危皓門",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，城門關卡。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg787",
  "name": "絕火觀",
  "tier": "human",
  "parentId": "qingNiuZhen",
  "description": "青牛鎮中，清修道觀。",
  "connections": [
   "qingNiuZhen"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg788",
  "name": "平皓坊",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，城中坊區。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg789",
  "name": "險皓坊",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，城中坊區。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg790",
  "name": "危丹坊",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，城中坊區。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg791",
  "name": "靜鯤樓",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，城內名樓。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg792",
  "name": "絕翠樓",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，城內名樓。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg793",
  "name": "飛瓊街",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，熱鬧長街。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg794",
  "name": "鎮寒門",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，城門關卡。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg795",
  "name": "絕珊觀",
  "tier": "human",
  "parentId": "jiaYuanCheng",
  "description": "嘉元城中，清修道觀。",
  "connections": [
   "jiaYuanCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg796",
  "name": "隱鯨坊",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，城中坊區。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg797",
  "name": "奇滄坊",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，城中坊區。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg798",
  "name": "隱鯤坊",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，城中坊區。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg799",
  "name": "興靈樓",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，城內名樓。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg800",
  "name": "鎖靈樓",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，城內名樓。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg801",
  "name": "平虎街",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，熱鬧長街。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg802",
  "name": "險鯊門",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，城門關卡。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg803",
  "name": "樂白觀",
  "tier": "human",
  "parentId": "tianTianCheng",
  "description": "闐天城中，清修道觀。",
  "connections": [
   "tianTianCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg804",
  "name": "望白坊",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，城中坊區。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg805",
  "name": "豐鯤坊",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，城中坊區。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg806",
  "name": "隱天坊",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，城中坊區。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg807",
  "name": "落虎樓",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，城內名樓。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg808",
  "name": "雄琉樓",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，城內名樓。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg809",
  "name": "秘暝街",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，熱鬧長街。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg810",
  "name": "飛珞門",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，城門關卡。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg811",
  "name": "冥滄觀",
  "tier": "human",
  "parentId": "tianYiCheng",
  "description": "天一城中，清修道觀。",
  "connections": [
   "tianYiCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg812",
  "name": "靜赭坊",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，城中坊區。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg813",
  "name": "危珞坊",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，城中坊區。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg814",
  "name": "罡蒼坊",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，城中坊區。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg815",
  "name": "晦墨樓",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，城內名樓。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg816",
  "name": "險暝樓",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，城內名樓。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg817",
  "name": "絕水街",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，熱鬧長街。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg818",
  "name": "昌霜門",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，城門關卡。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg819",
  "name": "飛金觀",
  "tier": "human",
  "parentId": "tianXingCheng",
  "description": "天星城中，清修道觀。",
  "connections": [
   "tianXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg820",
  "name": "鎖鯤坊",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，城中坊區。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg821",
  "name": "晦珊坊",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，城中坊區。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg822",
  "name": "靜雷坊",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，城中坊區。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg823",
  "name": "安鷹樓",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，城內名樓。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg824",
  "name": "寧火樓",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，城內名樓。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg825",
  "name": "通雲街",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，熱鬧長街。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg826",
  "name": "樂龍門",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，城門關卡。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg827",
  "name": "隱瀾觀",
  "tier": "human",
  "parentId": "yeHuaCheng",
  "description": "葉樺城中，清修道觀。",
  "connections": [
   "yeHuaCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg828",
  "name": "落蟾坊",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，城中坊區。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg829",
  "name": "靈鰲坊",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，城中坊區。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg830",
  "name": "豐珞坊",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，城中坊區。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg831",
  "name": "險紫樓",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，城內名樓。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg832",
  "name": "臥赤樓",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，城內名樓。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg833",
  "name": "靈雷街",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，熱鬧長街。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg834",
  "name": "臥琉門",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，城門關卡。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg835",
  "name": "斷玦觀",
  "tier": "human",
  "parentId": "xiaoJiGongBingCheng",
  "description": "小極宮冰城中，清修道觀。",
  "connections": [
   "xiaoJiGongBingCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg836",
  "name": "望瑤坊",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，城中坊區。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg837",
  "name": "幽皓坊",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，城中坊區。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg838",
  "name": "孤瓊坊",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，城中坊區。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg839",
  "name": "奇霜樓",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，城內名樓。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg840",
  "name": "雄赭樓",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，城內名樓。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg841",
  "name": "鎮青街",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，熱鬧長街。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg842",
  "name": "樂緋門",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，城門關卡。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg843",
  "name": "寧翡觀",
  "tier": "human",
  "parentId": "sunYunZhen",
  "description": "隼雲鎮中，清修道觀。",
  "connections": [
   "sunYunZhen"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg844",
  "name": "幽煙坊",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，城中坊區。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg845",
  "name": "靈幽坊",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，城中坊區。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg846",
  "name": "臥虎坊",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，城中坊區。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg847",
  "name": "險緋樓",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，城內名樓。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg848",
  "name": "興琉樓",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，城內名樓。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg849",
  "name": "雄墨街",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，熱鬧長街。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg850",
  "name": "望瓊門",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，城門關卡。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg851",
  "name": "興翠觀",
  "tier": "human",
  "parentId": "xueJiangCheng",
  "description": "雪江小城中，清修道觀。",
  "connections": [
   "xueJiangCheng"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg852",
  "name": "安火坊",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，城中坊區。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg853",
  "name": "罡璇坊",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，城中坊區。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg854",
  "name": "晦鯨坊",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，城中坊區。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg855",
  "name": "孤嵐樓",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，城內名樓。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg856",
  "name": "落煙樓",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，城內名樓。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg857",
  "name": "昌霞街",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，熱鬧長街。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg858",
  "name": "幽風門",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，城門關卡。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg859",
  "name": "奇緋觀",
  "tier": "human",
  "parentId": "kuiXingCheng",
  "description": "魁星城中，清修道觀。",
  "connections": [
   "kuiXingCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg860",
  "name": "長鰲坊",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，城中坊區。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg861",
  "name": "望璇坊",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，城中坊區。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg862",
  "name": "豐風坊",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，城中坊區。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg863",
  "name": "昌嵐樓",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，城內名樓。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg864",
  "name": "秘煙樓",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，城內名樓。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg865",
  "name": "靜珞街",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，熱鬧長街。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg866",
  "name": "鎮鰲門",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，城門關卡。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg867",
  "name": "鎮寒觀",
  "tier": "human",
  "parentId": "jinMaCheng",
  "description": "金馬城中，清修道觀。",
  "connections": [
   "jinMaCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg868",
  "name": "絕龍坊",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，城中坊區。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg869",
  "name": "廣鳳坊",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，城中坊區。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg870",
  "name": "豐蟾坊",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，城中坊區。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg871",
  "name": "隱瓊樓",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，城內名樓。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg872",
  "name": "奇滄樓",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，城內名樓。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg873",
  "name": "飛玉街",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，熱鬧長街。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg874",
  "name": "平璇門",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，城門關卡。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg875",
  "name": "聖蒼觀",
  "tier": "human",
  "parentId": "nanWuCheng",
  "description": "南烏城中，清修道觀。",
  "connections": [
   "nanWuCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg876",
  "name": "臥綠坊",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，城中坊區。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg877",
  "name": "飛鷹坊",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，城中坊區。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg878",
  "name": "奇煙坊",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，城中坊區。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg879",
  "name": "鎖翠樓",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，城內名樓。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg880",
  "name": "秘火樓",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，城內名樓。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg881",
  "name": "寧瑤街",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，熱鬧長街。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg882",
  "name": "絕瓊門",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，城門關卡。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg883",
  "name": "幽火觀",
  "tier": "human",
  "parentId": "taiHeCheng",
  "description": "泰和城中，清修道觀。",
  "connections": [
   "taiHeCheng"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg884",
  "name": "秘霜坊",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，城中坊區。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg885",
  "name": "隱赭坊",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，城中坊區。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg886",
  "name": "鎮瑤坊",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，城中坊區。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg887",
  "name": "靜瑤樓",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，城內名樓。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg888",
  "name": "安鰲樓",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，城內名樓。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg889",
  "name": "罡翠街",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，熱鬧長街。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg890",
  "name": "危曦門",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，城門關卡。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg891",
  "name": "絕瀾觀",
  "tier": "human",
  "parentId": "guangGuiCheng",
  "description": "廣貴城中，清修道觀。",
  "connections": [
   "guangGuiCheng"
  ],
  "firstVolume": 2
 },
 {
  "id": "gg892",
  "name": "廣蛟坊",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，城中坊區。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg893",
  "name": "絕鯤坊",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，城中坊區。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg894",
  "name": "飛天坊",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，城中坊區。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg895",
  "name": "興雷樓",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，城內名樓。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg896",
  "name": "冥曦樓",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，城內名樓。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg897",
  "name": "鎮玦街",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，熱鬧長街。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg898",
  "name": "冥蒼門",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，城門關卡。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg899",
  "name": "隱赭觀",
  "tier": "human",
  "parentId": "dongShiCheng",
  "description": "東石城中，清修道觀。",
  "connections": [
   "dongShiCheng"
  ],
  "firstVolume": 4
 },
 {
  "id": "gg900",
  "name": "寧鷹坊",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，城中坊區。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg901",
  "name": "興綠坊",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，城中坊區。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg902",
  "name": "險鰲坊",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，城中坊區。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg903",
  "name": "聖火樓",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，城內名樓。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg904",
  "name": "險玉樓",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，城內名樓。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg905",
  "name": "鎮火街",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，熱鬧長街。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg906",
  "name": "樂瓊門",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，城門關卡。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg907",
  "name": "泰嵐觀",
  "tier": "human",
  "parentId": "tianMaCheng",
  "description": "天馬城中，清修道觀。",
  "connections": [
   "tianMaCheng"
  ],
  "firstVolume": 11
 },
 {
  "id": "gg908",
  "name": "寧蒼坊",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，城中坊區。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg909",
  "name": "通霜坊",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，城中坊區。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg910",
  "name": "鎖鯨坊",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，城中坊區。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg911",
  "name": "斷火樓",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，城內名樓。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg912",
  "name": "廣靈樓",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，城內名樓。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg913",
  "name": "聖鯊街",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，熱鬧長街。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg914",
  "name": "冥幽門",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，城門關卡。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg915",
  "name": "望縹觀",
  "tier": "human",
  "parentId": "qingLiangCheng",
  "description": "青良城中，清修道觀。",
  "connections": [
   "qingLiangCheng"
  ],
  "firstVolume": 3
 },
 {
  "id": "gg916",
  "name": "鯊隱峰",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg917",
  "name": "暝安峰",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg918",
  "name": "瀾罡峰",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg919",
  "name": "煙秘峰",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg920",
  "name": "鰲平谷",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg921",
  "name": "白靈谷",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg922",
  "name": "寒廣洞",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg923",
  "name": "緋興洞",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg924",
  "name": "縹晦潭",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，一泓碧潭，深不見底。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg925",
  "name": "霞鎮林",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，古木參天的密林。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg926",
  "name": "玉險礦",
  "tier": "human",
  "parentId": "yunMengShanMai",
  "description": "雲夢山脈的一處，蘊藏靈石的礦脈。",
  "connections": [
   "yunMengShanMai"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg927",
  "name": "蛟興峰",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一座支峰，雲霧深處棲著一頭看守的靈禽。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg928",
  "name": "翡泰峰",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一座支峰，山勢險絕，等閒弟子不得擅入。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg929",
  "name": "瑤危峰",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一座支峰，產一種附生於峭壁的靈藥。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg930",
  "name": "緋定峰",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一座支峰，為門中觀星望氣之所。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg931",
  "name": "麟樂谷",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg932",
  "name": "雷平谷",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg933",
  "name": "朱安洞",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，天然靈洞，可供閉關。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg934",
  "name": "碧孤洞",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，天然靈洞，可供閉關。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg935",
  "name": "天望潭",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，一泓碧潭，深不見底。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg936",
  "name": "天樂林",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，古木參天的密林。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg937",
  "name": "煙斷礦",
  "tier": "human",
  "parentId": "huangLongShan",
  "description": "黃龍山的一處，蘊藏靈石的礦脈。",
  "connections": [
   "huangLongShan"
  ],
  "firstVolume": 5
 },
 {
  "id": "gg938",
  "name": "璇定峰",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg939",
  "name": "鳳通峰",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg940",
  "name": "金孤峰",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg941",
  "name": "火通峰",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg942",
  "name": "瓊安谷",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg943",
  "name": "赭靜谷",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg944",
  "name": "銀泰洞",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，天然靈洞，可供閉關。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg945",
  "name": "翡聖洞",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，天然靈洞，可供閉關。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg946",
  "name": "風臥潭",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，一泓碧潭，深不見底。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg947",
  "name": "黛鎮林",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，古木參天的密林。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg948",
  "name": "珞定礦",
  "tier": "human",
  "parentId": "kunWuShan",
  "description": "昆吾山的一處，蘊藏靈石的礦脈。",
  "connections": [
   "kunWuShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg949",
  "name": "翠豐峰",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一座支峰，雲霧深處棲著一頭看守的靈禽。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg950",
  "name": "蟾雄峰",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一座支峰，山勢險絕，等閒弟子不得擅入。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg951",
  "name": "滄奇峰",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一座支峰，產一種附生於峭壁的靈藥。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg952",
  "name": "滄廣峰",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一座支峰，為門中觀星望氣之所。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg953",
  "name": "銀樂谷",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg954",
  "name": "墨晦谷",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg955",
  "name": "水幽洞",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，天然靈洞，可供閉關。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg956",
  "name": "雲隱洞",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，天然靈洞，可供閉關。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg957",
  "name": "霞靜潭",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，一泓碧潭，深不見底。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg958",
  "name": "翠樂林",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，古木參天的密林。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg959",
  "name": "蟾聖礦",
  "tier": "human",
  "parentId": "zhenHuanShan",
  "description": "真桓山的一處，蘊藏靈石的礦脈。",
  "connections": [
   "zhenHuanShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg960",
  "name": "寒飛峰",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg961",
  "name": "赤奇峰",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg962",
  "name": "石隱峰",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg963",
  "name": "幽平峰",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg964",
  "name": "赤臥谷",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg965",
  "name": "丹險谷",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg966",
  "name": "璇廣洞",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg967",
  "name": "墨晦洞",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg968",
  "name": "翠落潭",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，一泓碧潭，深不見底。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg969",
  "name": "紫晦林",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，古木參天的密林。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg970",
  "name": "暝鎖礦",
  "tier": "human",
  "parentId": "tianYueShanMai",
  "description": "天岳山脈的一處，蘊藏靈石的礦脈。",
  "connections": [
   "tianYueShanMai"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg971",
  "name": "珩望峰",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一座支峰，山勢險絕，等閒弟子不得擅入。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg972",
  "name": "霞危峰",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一座支峰，雲霧深處棲著一頭看守的靈禽。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg973",
  "name": "翡廣峰",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一座支峰，為門中觀星望氣之所。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg974",
  "name": "珊鎮峰",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一座支峰，產一種附生於峭壁的靈藥。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg975",
  "name": "霞興谷",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg976",
  "name": "綠罡谷",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg977",
  "name": "紫靈洞",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg978",
  "name": "金幽洞",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg979",
  "name": "墨通潭",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，一泓碧潭，深不見底。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg980",
  "name": "曦絕林",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，古木參天的密林。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg981",
  "name": "黛雄礦",
  "tier": "human",
  "parentId": "fangMangShanMai",
  "description": "邡莽山脈的一處，蘊藏靈石的礦脈。",
  "connections": [
   "fangMangShanMai"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg982",
  "name": "鷹秘峰",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg983",
  "name": "玦隱峰",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg984",
  "name": "黛鎮峰",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg985",
  "name": "靈隱峰",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg986",
  "name": "紫靜谷",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，幽深山谷，靈草叢生。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg987",
  "name": "瓊幽谷",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，幽深山谷，靈草叢生。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg988",
  "name": "珊豐洞",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，天然靈洞，可供閉關。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg989",
  "name": "翡鎖洞",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，天然靈洞，可供閉關。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg990",
  "name": "墨飛潭",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，一泓碧潭，深不見底。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg991",
  "name": "雷昌林",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，古木參天的密林。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg992",
  "name": "瓊興礦",
  "tier": "human",
  "parentId": "luoRiFeng",
  "description": "落日峰的一處，蘊藏靈石的礦脈。",
  "connections": [
   "luoRiFeng"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg993",
  "name": "靈寧峰",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一座支峰，山勢險絕，等閒弟子不得擅入。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg994",
  "name": "丹幽峰",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一座支峰，雲霧深處棲著一頭看守的靈禽。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg995",
  "name": "霜冥峰",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一座支峰，為門中觀星望氣之所。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg996",
  "name": "霞幽峰",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一座支峰，產一種附生於峭壁的靈藥。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg997",
  "name": "瓊臥谷",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg998",
  "name": "水寧谷",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，幽深山谷，靈草叢生。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg999",
  "name": "青靈洞",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1000",
  "name": "鳳斷洞",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，天然靈洞，可供閉關。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1001",
  "name": "蛟平潭",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，一泓碧潭，深不見底。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1002",
  "name": "白平林",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，古木參天的密林。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1003",
  "name": "靈雄礦",
  "tier": "human",
  "parentId": "taiYueShanMai",
  "description": "太岳山脈的一處，蘊藏靈石的礦脈。",
  "connections": [
   "taiYueShanMai"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1004",
  "name": "瑤晦峰",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1005",
  "name": "霜樂峰",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1006",
  "name": "赤平峰",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1007",
  "name": "玄孤峰",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1008",
  "name": "鰲雄谷",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，幽深山谷，靈草叢生。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1009",
  "name": "墨幽谷",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，幽深山谷，靈草叢生。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1010",
  "name": "瑤幽洞",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，天然靈洞，可供閉關。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1011",
  "name": "丹飛洞",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，天然靈洞，可供閉關。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg1012",
  "name": "墨寧潭",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，一泓碧潭，深不見底。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1013",
  "name": "靈孤林",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，古木參天的密林。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1014",
  "name": "綠臥礦",
  "tier": "human",
  "parentId": "ziMuFeng",
  "description": "子母峰的一處，蘊藏靈石的礦脈。",
  "connections": [
   "ziMuFeng"
  ],
  "firstVolume": 7
 },
 {
  "id": "gg1015",
  "name": "虎長峰",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1016",
  "name": "青罡峰",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1017",
  "name": "石長峰",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1018",
  "name": "瓊罡峰",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1019",
  "name": "黑冥谷",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1020",
  "name": "麟晦谷",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1021",
  "name": "鰲長洞",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，天然靈洞，可供閉關。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg1022",
  "name": "鯤隱洞",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，天然靈洞，可供閉關。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg1023",
  "name": "幽險潭",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，一泓碧潭，深不見底。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1024",
  "name": "碧樂林",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，古木參天的密林。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1025",
  "name": "龍臥礦",
  "tier": "human",
  "parentId": "caiXiaShan",
  "description": "彩霞山的一處，蘊藏靈石的礦脈。",
  "connections": [
   "caiXiaShan"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1026",
  "name": "翠隱峰",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一座支峰，峰腰開有數十座弟子洞府。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1027",
  "name": "曦平峰",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一座支峰，岩壁上刻有前輩留下的劍痕道紋。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1028",
  "name": "黑鎖峰",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一座支峰，峰下有靈脈，被門中列為修煉禁地。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1029",
  "name": "虎平峰",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一座支峰，峰頂終年積雪，靈氣稀薄卻清正。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1030",
  "name": "赤鎮谷",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，幽深山谷，靈草叢生。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1031",
  "name": "玄廣谷",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，幽深山谷，靈草叢生。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1032",
  "name": "綠飛洞",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，天然靈洞，可供閉關。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg1033",
  "name": "縹幽洞",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，天然靈洞，可供閉關。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1,
  "access": {
   "hidden": true
  }
 },
 {
  "id": "gg1034",
  "name": "虎危潭",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，一泓碧潭，深不見底。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1035",
  "name": "玄落林",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，古木參天的密林。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1036",
  "name": "寒雄礦",
  "tier": "human",
  "parentId": "qinYeLing",
  "description": "秦葉嶺的一處，蘊藏靈石的礦脈。",
  "connections": [
   "qinYeLing"
  ],
  "firstVolume": 1
 },
 {
  "id": "gg1037",
  "name": "鳳靜峰",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一座支峰，山勢險絕，等閒弟子不得擅入。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg1038",
  "name": "風奇峰",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一座支峰，雲霧深處棲著一頭看守的靈禽。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg1039",
  "name": "鯤險峰",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一座支峰，為門中觀星望氣之所。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg1040",
  "name": "青危峰",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一座支峰，產一種附生於峭壁的靈藥。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg1041",
  "name": "碧安谷",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg1042",
  "name": "黛昌谷",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一處，幽深山谷，靈草叢生。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 },
 {
  "id": "gg1043",
  "name": "霞廣洞",
  "tier": "human",
  "parentId": "yuTianShan",
  "description": "玉田山的一處，天然靈洞，可供閉關。",
  "connections": [
   "yuTianShan"
  ],
  "firstVolume": 6
 }
];
