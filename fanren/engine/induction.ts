/**
 * 拜入山門・入門典禮：營造修仙宗門的儀式感。
 *  · 修仙宗門：測靈根 → 拜師大典（焚香三拜）→ 宣讀門規立誓 → 賜身分玉牌/入門功法/例俸。
 *  · 武林門派：遞拜師帖 → 演武試藝 → 立江湖規矩 → 賜腰牌/外功秘譜/兵器。
 *  · 魔道宗門：納投名狀 → 歃血立誓 → 授魔功血令。
 * 純邏輯，回傳供 UI 逐幕呈現的典禮資料；提交由 worldStore.joinSect 賜物落地。
 */
import type { SectDef, SpiritualRoots } from '../types';

const ATTR: Record<string, string> = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' };
export interface VariantRootInput { type: string; value: number }

export interface RootTest {
  tier: '異靈根' | '天靈根' | '真靈根' | '偽靈根' | '無靈根';
  attrs: string[];
  reveal: string;
}

/** 五行靈根或異靈根任一存在，都具備修仙宗門所稱的「靈根」。 */
export function hasAnySpiritualRoot(roots?: SpiritualRoots, variantRoot?: VariantRootInput | null): boolean {
  const hasFiveElementRoot = !!roots && Object.values(roots).some((value) => value > 0);
  return hasFiveElementRoot || (variantRoot?.value || 0) > 0;
}

/** 測靈根：異靈根獨立計入，不能因五行皆零而誤判為凡體。 */
export function testSpiritualRoot(roots?: SpiritualRoots, variantRoot?: VariantRootInput | null): RootTest {
  const entries = roots ? (Object.entries(roots) as [string, number][]).filter(([, v]) => v > 0) : [];
  if (variantRoot && variantRoot.value > 0) entries.push([`variant:${variantRoot.type}`, variantRoot.value]);
  if (!entries.length) return { tier: '無靈根', attrs: [], reveal: '測靈玉黯然無光——你竟無半分靈根，此生與仙道無緣，唯江湖武道可期。' };
  const max = Math.max(...entries.map(([, v]) => v));
  const sig = entries.filter(([, v]) => v >= max * 0.5);
  const attrs = sig.map(([k]) => k.startsWith('variant:') ? k.slice('variant:'.length) : (ATTR[k] || k));
  const pureVariant = sig.length === 1 && sig[0][0].startsWith('variant:');
  let tier: RootTest['tier'];
  let reveal: string;
  if (pureVariant) {
    tier = '異靈根';
    reveal = `測靈玉驟然迸出異象，${attrs[0]}光奔走不定、純粹凌厲——萬中無一的「${attrs[0]}靈根（異靈根）」！滿堂長老無不動容。`;
  } else if (sig.length === 1) {
    tier = '天靈根';
    reveal = `測靈玉驟然爆出耀目${attrs[0]}光，純粹得不見一絲駁雜——百年難遇的「天靈根（${attrs[0]}）」！滿堂長老無不動容。`;
  } else if (sig.length <= 3) {
    tier = '真靈根';
    reveal = `測靈玉浮現${attrs.join('、')}${attrs.length}色靈光，純度尚佳——是堪可造就的「真靈根」，修仙之路可期。`;
  } else {
    tier = '偽靈根';
    reveal = `測靈玉五色雜陳、黯淡渾濁——五行混雜的「偽靈根」，修煉事倍功半。長老微微蹙眉，終是念你誠心。`;
  }
  return { tier, attrs, reveal };
}

export interface CeremonyStep { title: string; text: string }
export interface CeremonyGift { name: string; type: string; rarity: string; desc: string }
export interface Ceremony {
  sectId: string;
  sectName: string;
  category: SectDef['category'];
  rankName: string;
  presider: string;
  rootTest: RootTest;
  steps: CeremonyStep[];
  oath: string;
  gifts: CeremonyGift[];
  stones: number;
  identityToken: string;
}

function presiderOf(sect: SectDef): string {
  if (sect.category === '武林門派') return `${sect.name}門主`;
  if (sect.category === '魔道宗門') return `${sect.name}教主`;
  return `${sect.name}掌門`;
}

/** 組裝入門典禮（依門派類別給不同儀軌）。 */
export function buildCeremony(sect: SectDef, ctx: { roots?: SpiritualRoots; variantRoot?: VariantRootInput | null; playerName: string; realmName: string }): Ceremony {
  const rootTest = testSpiritualRoot(ctx.roots, ctx.variantRoot);
  const presider = presiderOf(sect);
  const rankName = sect.ranks[0]?.name || '記名弟子';
  const entryArt = sect.resources[0]?.name || (sect.category === '武林門派' ? '門中外功' : '入門功法');
  const me = ctx.playerName || '你';

  let steps: CeremonyStep[];
  let oath: string;
  let gifts: CeremonyGift[];
  let stones: number;
  let identityToken: string;

  if (sect.category === '修仙宗門') {
    identityToken = `${sect.name}弟子玉牌`;
    stones = 30;
    oath = '一不可欺師滅祖、二不可同門相殘、三不可洩露宗門秘法、四不可恃強凌弱、五當勤修不輟以光大門楣。';
    steps = [
      { title: '一・測靈根', text: `踏入${sect.name}測靈閣，長老取出一方瑩白測靈玉，命你滴血其上。${rootTest.reveal}` },
      { title: '二・拜師大典', text: `${sect.name}主殿之內，香煙裊裊、鐘鼓齊鳴，丹陛之上${presider}高坐主位，眾長老分列兩側、門人肅立階下。你拾級而上，於蒲團前撩衣跪倒，向祖師牌位與掌門三拜九叩，額觸冰涼玉階。` },
      { title: '三・宣門規・立誓', text: `${presider}聲若洪鐘，朗朗宣讀門規：「${oath}」字字砸在心頭。你俯首叩首，朗聲立誓：「弟子${me}，謹守門規，永奉宗門，若有違背，甘受天譴！」殿中靈光微微一盪，似有天地為證。` },
      { title: '四・賜物入籍', text: `禮成。執事捧來「${identityToken}」一面繫於你腰間——自此名入宗門玉冊；又賜《${entryArt}》一部、例俸靈石 ${stones} 枚，撥下靈房一間。你叩謝起身，已是堂堂正正的${sect.name}${rankName}，道途自此有了依憑與傳承。` },
    ];
    gifts = [
      { name: identityToken, type: '奇物', rarity: '稀有', desc: `${sect.name}的身分信物，繫之即為門中弟子，可入宗門山門與藏經閣外殿。` },
      { name: `《${entryArt}》玉簡`, type: '奇物', rarity: '稀有', desc: `${sect.name}所授入門功法《${entryArt}》，銘於玉簡，神識一掃即可參詳。` },
    ];
  } else if (sect.category === '魔道宗門') {
    identityToken = `${sect.name}血令`;
    stones = 20;
    oath = '入我魔門，唯力是尊；背叛者魂飛魄散、生不如死。自此榮辱與共，為教中前驅。';
    steps = [
      { title: '一・納投名狀', text: `${sect.name}地處幽僻魔窟，陰風慘慘。一名護法冷冷上下打量你：「入我魔門，須納投名狀以證心志。」你${rootTest.tier === '無靈根' ? '雖無靈根，卻' : ''}咬牙應下這帶血的門檻。` },
      { title: '二・歃血立誓', text: `黑色誓盤陰森森攤在面前。你割腕滴血其上，血珠竟自行游走，烙下一道猩紅魂印。${presider}陰惻惻道：「${oath}」你只覺一縷心神被那血印牢牢攫住——此誓，再難反悔。` },
      { title: '三・授功賜令', text: `禮畢。${presider}擲來「${identityToken}」與《${entryArt}》一部：「拿去。能爬到哪一步，看你的造化與狠勁。」你接過那森冷血令，自此踏入魔道，前路血雨腥風。例俸邪石 ${stones} 枚。` },
    ];
    gifts = [
      { name: identityToken, type: '奇物', rarity: '稀有', desc: `${sect.name}的魔道信物，浸過血誓，可調動教中下層人手。` },
      { name: `《${entryArt}》玉簡`, type: '奇物', rarity: '稀有', desc: `${sect.name}所授魔功《${entryArt}》，修之兇捷而戾氣纏身。` },
    ];
  } else {
    // 武林門派
    identityToken = `${sect.name}弟子腰牌`;
    stones = 15;
    oath = '行俠仗義、扶弱鋤強，敬師重道、不以強凌弱，不墮${sect.name}威名。';
    steps = [
      { title: '一・遞拜師帖', text: `${sect.name}演武堂前，你雙手奉上拜師帖，依江湖規矩磕頭三響、奉上一盞熱茶。堂上${presider}撫須打量，微微頷首。` },
      { title: '二・演武試藝', text: `「既要入我${sect.name}，先過了師兄這一關。」一名師兄按刀而出。你與之拆了十數招，${rootTest.tier === '無靈根' ? '雖無靈根，一身武藝卻紮實沉穩' : '靈根武藝兼備、後生可畏'}，堂主眼中露出讚許。` },
      { title: '三・立規矩・賜物', text: `${presider}朗聲道門規：「${oath.replace('${sect.name}', sect.name)}」你抱拳沉聲應諾。堂主賜下「${identityToken}」、《${entryArt}》與精鐵兵器一件，月俸銀錢若干（折靈石 ${stones}）。自此你便是${sect.name}門下${rankName}，行走江湖有了靠山。` },
    ];
    gifts = [
      { name: identityToken, type: '奇物', rarity: '精良', desc: `${sect.name}的江湖身分腰牌，憑此出入門派、結交同道。` },
      { name: `《${entryArt}》秘譜`, type: '奇物', rarity: '精良', desc: `${sect.name}所授外功武技《${entryArt}》，強身健體、克敵制勝。` },
      { name: '精鐵兵器', type: '法宝', rarity: '普通', desc: '門派所賜的趁手凡品利器。' },
    ];
  }

  return { sectId: sect.id, sectName: sect.name, category: sect.category, rankName, presider, rootTest, steps, oath, gifts, stones, identityToken };
}
