/**
 * 簡繁雙語：顯示層統一。本作文案來源混雜（編年史 fanren/ 為繁體、沿用的後端元件為簡體），
 * 故於「顯示層」用 OpenCC 將整個畫面正規化成使用者所選語言：
 *   繁體模式 → s2t（簡→繁）：把沿用元件的殘留簡體統一為繁體；已是繁體者維持不變。
 *   簡體模式 → t2s（繁→簡）：把編年史的繁體文案轉為簡體。
 *
 * 為何只在「顯示層」做、不改原始字串：後端有大量以簡體為值的資料（物品類型、稀有度「傳說/仙品」、
 * 境界名…）會被程式碼字面比較。改原始碼會破壞這些等值判斷；改 DOM 文字節點則只動「畫面所見」，
 * 完全不影響邏輯。經實測，s2t 對既有繁體正史文案幾乎等同 identity（僅「台灣→臺灣」之類正規化），
 * 故雙向皆安全。
 *
 * 以 MutationObserver 監看 document.body 的文字節點與常見可見屬性，攔截 React 動態渲染後的文字。
 * 切換語言由設定面板觸發整頁重載，確保畫面乾淨重建後再正規化。
 */
import { Converter } from 'opencc-js';
import { useLayoutEffect } from 'react';

export type LangMode = 'traditional' | 'simplified';

/**
 * 語言設定存於「專屬鍵」，與遊戲存檔的 settings autosave 解耦。
 * （經典後端的 settings autosave 會把整個 settings 寫回 localStorage；若語言混在其中，
 *  canon 模式下 onUpdateSettings 未必更新 store，autosave 會用舊值覆蓋語言。專屬鍵杜絕此問題。）
 */
export const LANG_KEY = 'fanren_lang_v1';

export function readLang(): LangMode {
  try {
    return localStorage.getItem(LANG_KEY) === 'simplified' ? 'simplified' : 'traditional';
  } catch {
    return 'traditional';
  }
}

export function writeLang(lang: LangMode): void {
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
}

// 轉換器懶初始化（字典隨 opencc-js 打包，完全離線可用，Electron 友善）。
const _conv: Partial<Record<LangMode, (s: string) => string>> = {};
function converterFor(lang: LangMode): (s: string) => string {
  if (!_conv[lang]) {
    _conv[lang] =
      lang === 'simplified'
        ? Converter({ from: 'tw', to: 'cn' }) // 繁(臺灣)→簡(中國)
        : Converter({ from: 'cn', to: 'tw' }); // 簡(中國)→繁(臺灣)
  }
  return _conv[lang]!;
}

// 當前語言模式（決定轉換方向與作用範圍）。
let _lang: LangMode = 'traditional';

/**
 * 此節點是否在「應轉換」的範圍內。
 *  · 簡體模式：全頁皆轉（繁體正史→簡體，確定性安全）。
 *  · 繁體模式：只正規化「沿用的簡體經典元件」(共用 Modal 標有 data-hans-src)；
 *    編年史正史文案本就是繁體，**不可**用 簡→繁(s2t) 去碰它——否則「數里」會被誤轉成「數裡」等。
 */
function inScope(node: Node): boolean {
  if (_lang === 'simplified') return true;
  const el = node.nodeType === Node.TEXT_NODE ? (node as Text).parentElement : (node as Element);
  return !!el && typeof el.closest === 'function' && !!el.closest('[data-hans-src]');
}

// 含 CJK 表意文字才需轉換；純 ASCII/數字/標點略過以省效能。
const HAN = /[㐀-鿿豈-﫿]/;
// 這些節點內的文字不應被改寫（程式碼、輸入框、樣式…）。
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE', 'NOSCRIPT']);
// 一併轉換的可見屬性。
const ATTRS = ['placeholder', 'title', 'alt', 'aria-label'] as const;

function convText(node: Text, conv: (s: string) => string): void {
  const v = node.nodeValue;
  if (!v || !HAN.test(v)) return;
  const parent = node.parentElement;
  if (parent && SKIP_TAGS.has(parent.tagName)) return;
  if (!inScope(node)) return; // 繁體模式僅正規化沿用的簡體元件，不碰正史繁體文案
  const out = conv(v);
  if (out !== v) node.nodeValue = out; // 已是目標字體者 out===v，不觸發多餘變動，避免迴圈
}

function convAttrs(el: Element, conv: (s: string) => string): void {
  if (!inScope(el)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v && HAN.test(v)) {
      const out = conv(v);
      if (out !== v) el.setAttribute(a, out);
    }
  }
}

function walk(root: Node, conv: (s: string) => string): void {
  if (root.nodeType === Node.TEXT_NODE) { convText(root as Text, conv); return; }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (SKIP_TAGS.has(el.tagName)) return;
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  for (let n = tw.nextNode(); n; n = tw.nextNode()) texts.push(n as Text);
  for (const t of texts) convText(t, conv);
  convAttrs(el, conv);
  el.querySelectorAll('[placeholder],[title],[alt],[aria-label]').forEach((e) => convAttrs(e, conv));
}

let observer: MutationObserver | null = null;

/** 套用指定語言：先整頁正規化一次，再監看後續變動。重複呼叫安全（observer 只建一次）。 */
export function applyLocale(lang: LangMode): void {
  _lang = lang;
  const conv = converterFor(lang);
  walk(document.body, conv);
  if (observer) return;
  observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') {
        if (m.target.nodeType === Node.TEXT_NODE) convText(m.target as Text, conv);
      } else if (m.type === 'attributes') {
        if (m.target.nodeType === Node.ELEMENT_NODE) convAttrs(m.target as Element, conv);
      } else if (m.type === 'childList') {
        m.addedNodes.forEach((n) => walk(n, conv));
      }
    }
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS as unknown as string[],
  });
}

export function disconnectConversion(): void {
  if (observer) { observer.disconnect(); observer = null; }
}

/**
 * 依語言設定，於顯示層將整個畫面正規化為該語言。
 * 語言切換本身由設定面板觸發整頁重載，故此 hook 無需處理「反向還原」。
 * 用 useLayoutEffect 於繪製前先轉換，盡量避免初次載入時的字體閃現。
 */
export function useHanLocale(lang: LangMode): void {
  useLayoutEffect(() => {
    applyLocale(lang);
    return () => disconnectConversion();
  }, [lang]);
}
