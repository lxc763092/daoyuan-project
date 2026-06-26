/**
 * 道元紀：無韓立正史自走系統。
 * 原凡人正史的韓立試煉/自走推演已全面移除，改由道元紀 procGen 動態世界演化驅動。
 * 保留所有導出接口為空值/undefined，以確保現有引用不報編譯錯誤。
 * 後續階段可替換為道元紀原創主角（如"道一真人"）的修行軌跡。
 */
import { chapterToDay, dayToChapter } from './clock';

export interface TrialAtDay {
  id: string;
  title: string;
  locationId: string;
  peril: string;
  realmGate: string;
  chapterStart: number;
  chapterEnd: number;
  startDay: number;
  endDay: number;
  kind: string;
  playerHook?: string;
}

/** 道元紀無韓立 → 永遠返回 undefined */
export function hanliCurrentTrial(_day: number): TrialAtDay | undefined {
  return undefined;
}

export function hanliTrialsEntered(_day: number): TrialAtDay[] {
  return [];
}

export function hanliNextTrial(_day: number): TrialAtDay | undefined {
  return undefined;
}

export function hanliRealmAt(_day: number): string {
  return '道元無極';
}

export function hanliLocationAt(_day: number): string {
  return '道元大陸';
}

export function hanliFlavorAt(_day: number, _progressChapter: number): string | undefined {
  return undefined; // 道元紀無韓立行跡
}

export function smuggleTrial(): TrialAtDay | undefined {
  return undefined;
}

export function playerAtHanliTrial(
  _day: number,
  _playerLocationId: string,
  _playerRealm: string,
  _sameArea: (a: string, b: string) => boolean
): { trial: TrialAtDay; meetsGate: boolean } | undefined {
  return undefined;
}

export function allTrials(): TrialAtDay[] {
  return [];
}

export function trialsClearedByChapter(_chapter: number): number {
  return 0;
}

export { dayToChapter };
