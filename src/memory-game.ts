import { GameSettings, getBoardSizeOption, getSymbolPoolForGame, pairCountForBoard } from './game-constants';

/** Delay in ms before unsuitable cards are turned over again. */
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
 * Shuffles an array (Fisher–Yates).
 * @param items Input elements
 * @returns New, shuffled array
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
 * Generates memory card pairs from symbols.
 * @param symbols Symbols per pair
 * @param pairsNeeded Number of pairs needed
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
 * Builds and shuffles the deck from the game settings.
 * @param settings current settings
 */
function buildShuffledDeck(settings: GameSettings): MemoryCardModel[] {
  const board = getBoardSizeOption(settings.boardSizeId);
  const pairsNeeded = pairCountForBoard(board);
  const symbols = getSymbolPoolForGame(settings).slice(0, pairsNeeded);
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

  /** Creates a new game instance from settings. */
  constructor(settings: GameSettings) {
    const shuffled = buildShuffledDeck(settings);
    this.cards = shuffled;
    this.revealed = shuffled.map(() => false);
    this.matched = shuffled.map(() => false);
    this.scores = [0, 0];
    this.currentPlayer = 0;
  }

  /** Provides the current game state for the UI. */
  getSnapshot(): MemoryGameSnapshot {
    return this.createSnapshot();
  }

  /** Builds an immutable snapshot of the current internal state. */
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

  /** True if the front of the card should be visible. */
  isFaceVisible(index: number): boolean {
    return this.revealed[index] || this.matched[index];
  }

  /** Returns true when two picks are currently pending resolution. */
  private hasPendingSecondPick(): boolean {
    return this.firstSelection !== null && this.secondSelection !== null;
  }

  /** True if the card can be selected for a click. */
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

  /** Clears the current pick selection state. */
  private clearSelection(): void {
    this.firstSelection = null;
    this.secondSelection = null;
  }

  /** Returns true if two card indices belong to the same pair. */
  private isPairMatch(first: number, second: number): boolean {
    return this.cards[first].pairId === this.cards[second].pairId;
  }

  /** Switches the active player. */
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

  /** Marks a pair as matched and increments the active player's score. */
  private markPairMatched(first: number, second: number): void {
    this.matched[first] = true;
    this.matched[second] = true;
    this.scores[this.currentPlayer] += 1;
  }

  /** Applies a successful match and completes the round if all pairs are matched. */
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

  /** Applies a mismatch by hiding cards, switching players, and unblocking input. */
  private applyMismatch(first: number, second: number, onUpdate: () => void): void {
    this.revealed[first] = false;
    this.revealed[second] = false;
    this.clearSelection();
    this.switchPlayer();
    this.busy = false;
    onUpdate();
  }

  /** Resolves a completed pick by applying match or mismatch logic. */
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

  /** Schedules flip resolution after the configured delay. */
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

  /** Opens the second pick and schedules resolution. */
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
   * Processes card selection; calls back after state changes.
   * @param index Index of the clicked card
   * @param onUpdate after each visible update
   * @param onComplete when the round is complete
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
 * Determines the winner based on the scores.
 * @param scores [Player1, Player2]
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
