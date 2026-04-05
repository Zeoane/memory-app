import {
  GameSettings,
  getBoardSizeOption,
  getLayoutOption,
  pairCountForBoard,
} from './game-constants';

/** Verzögerung in ms, bevor nicht passende Karten wieder umgedreht werden. */
export const FLIP_RESOLUTION_DELAY_MS = 700;

export type PlayerIndex = 0 | 1;

export interface MemoryCardModel {
  readonly id: number;
  readonly pairId: number;
  readonly symbol: string;
}

export interface MemoryGameSnapshot {
  readonly cards: readonly MemoryCardModel[];
  readonly revealed: readonly boolean[];
  readonly matched: readonly boolean[];
  readonly scores: readonly [number, number];
  readonly currentPlayer: PlayerIndex;
  readonly firstSelection: number | null;
  readonly secondSelection: number | null;
  readonly isBusy: boolean;
  readonly isComplete: boolean;
}

/**
 * Mischt ein Array (Fisher–Yates).
 * @param items Eingabeelemente
 * @returns Neues, gemischtes Array
 */
function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Erzeugt Memory-Kartenpaare aus Symbolen.
 * @param symbols Symbole pro Paar
 * @param pairsNeeded Anzahl Paare
 */
function buildPairCards(symbols: readonly string[], pairsNeeded: number): MemoryCardModel[] {
  const deck: MemoryCardModel[] = [];
  let id = 0;
  for (let pairId = 0; pairId < pairsNeeded; pairId += 1) {
    const symbol = symbols[pairId];
    deck.push({ id: id++, pairId, symbol });
    deck.push({ id: id++, pairId, symbol });
  }
  return deck;
}

/**
 * Baut und mischt das Deck aus den Spieleinstellungen.
 * @param settings aktuelle Einstellungen
 */
function buildShuffledDeck(settings: GameSettings): MemoryCardModel[] {
  const board = getBoardSizeOption(settings.boardSizeId);
  const layout = getLayoutOption(settings.layoutId);
  const pairsNeeded = pairCountForBoard(board);
  const symbols = layout.pairs.slice(0, pairsNeeded);
  if (symbols.length < pairsNeeded) {
    throw new Error('Nicht genügend Symbole für die gewählte Spielfeldgröße.');
  }
  return shuffleArray(buildPairCards(symbols, pairsNeeded));
}

export class MemoryGame {
  private readonly cards: MemoryCardModel[];

  private revealed: boolean[];

  private matched: boolean[];

  private scores: [number, number];

  private currentPlayer: PlayerIndex;

  private firstSelection: number | null = null;

  private secondSelection: number | null = null;

  private busy = false;

  private complete = false;

  constructor(settings: GameSettings) {
    const shuffled = buildShuffledDeck(settings);
    this.cards = shuffled;
    this.revealed = shuffled.map(() => false);
    this.matched = shuffled.map(() => false);
    this.scores = [0, 0];
    this.currentPlayer = 0;
  }

  /** Liefert den aktuellen Spielzustand für die UI. */
  getSnapshot(): MemoryGameSnapshot {
    return this.createSnapshot();
  }

  private createSnapshot(): MemoryGameSnapshot {
    return {
      cards: this.cards,
      revealed: this.revealed,
      matched: this.matched,
      scores: this.scores,
      currentPlayer: this.currentPlayer,
      firstSelection: this.firstSelection,
      secondSelection: this.secondSelection,
      isBusy: this.busy,
      isComplete: this.complete,
    };
  }

  /** True, wenn die Vorderseite der Karte sichtbar sein soll. */
  isFaceVisible(index: number): boolean {
    return this.revealed[index] || this.matched[index];
  }

  private hasPendingSecondPick(): boolean {
    return this.firstSelection !== null && this.secondSelection !== null;
  }

  /** True, wenn die Karte für einen Klick gewählt werden darf. */
  canSelect(index: number): boolean {
    const isLocked = this.busy || this.complete || this.matched[index];
    if (isLocked) {
      return false;
    }
    if (this.hasPendingSecondPick()) {
      return false;
    }
    return this.firstSelection !== index;
  }

  private clearSelection(): void {
    this.firstSelection = null;
    this.secondSelection = null;
  }

  private isPairMatch(first: number, second: number): boolean {
    return this.cards[first].pairId === this.cards[second].pairId;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

  private markPairMatched(first: number, second: number): void {
    this.matched[first] = true;
    this.matched[second] = true;
    this.scores[this.currentPlayer] += 1;
  }

  private applyMatch(first: number, second: number, onUpdate: () => void, onComplete: () => void): void {
    this.markPairMatched(first, second);
    this.clearSelection();
    this.busy = false;
    if (this.matched.every(Boolean)) {
      this.complete = true;
    }
    onUpdate();
    if (this.complete) {
      onComplete();
    }
  }

  private applyMismatch(first: number, second: number, onUpdate: () => void): void {
    this.revealed[first] = false;
    this.revealed[second] = false;
    this.clearSelection();
    this.switchPlayer();
    this.busy = false;
    onUpdate();
  }

  private resolveFlip(
    first: number,
    second: number,
    onUpdate: () => void,
    onComplete: () => void,
  ): void {
    const match = this.isPairMatch(first, second);
    if (match) {
      this.applyMatch(first, second, onUpdate, onComplete);
    } else {
      this.applyMismatch(first, second, onUpdate);
    }
  }

  private scheduleFlipResolution(
    first: number,
    second: number,
    onUpdate: () => void,
    onComplete: () => void,
  ): void {
    window.setTimeout(() => {
      this.resolveFlip(first, second, onUpdate, onComplete);
    }, FLIP_RESOLUTION_DELAY_MS);
  }

  private openSecondPick(
    index: number,
    onUpdate: () => void,
    onComplete: () => void,
  ): void {
    this.secondSelection = index;
    this.busy = true;
    onUpdate();
    const first = this.firstSelection;
    const second = this.secondSelection;
    if (first === null || second === null) {
      return;
    }
    this.scheduleFlipResolution(first, second, onUpdate, onComplete);
  }

  /**
   * Verarbeitet Kartenwahl; ruft Callbacks nach Zustandsänderungen auf.
   * @param index Index der angeklickten Karte
   * @param onUpdate nach jedem sichtbaren Update
   * @param onComplete wenn die Runde beendet ist
   */
  selectCard(index: number, onUpdate: () => void, onComplete: () => void): void {
    if (!this.canSelect(index)) {
      return;
    }
    this.revealed[index] = true;
    if (this.firstSelection === null) {
      this.firstSelection = index;
      onUpdate();
      return;
    }
    this.openSecondPick(index, onUpdate, onComplete);
  }
}

/**
 * Ermittelt den Gewinner aus den Punktzahlen.
 * @param scores [Spieler1, Spieler2]
 */
export function getWinnerLabel(scores: readonly [number, number]): 'player1' | 'player2' | 'draw' {
  const [s1, s2] = scores;
  if (s1 > s2) {
    return 'player1';
  }
  if (s2 > s1) {
    return 'player2';
  }
  return 'draw';
}
