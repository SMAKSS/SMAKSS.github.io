/**
 * Internal stages for the pattern memory mini-game.
 */
export type MemoryStageType = 'idle' | 'show' | 'input' | 'failed';

/**
 * Supported difficulty levels for the pattern memory mini-game.
 */
export type MemoryDifficultyType = 'easy' | 'medium' | 'hard';

/**
 * Per-level timing and length configuration for the memory game.
 */
export type MemoryDifficultyConfigType = {
  /**
   * Highlight duration for each tile in milliseconds.
   */
  flashMs: number;
  /**
   * Initial sequence length for a new game.
   */
  initialLength: number;
  /**
   * Delay between each shown tile in milliseconds.
   */
  stepMs: number;
};

/**
 * Input payload for creating a memory sequence.
 */
export type CreateSequenceInputType = {
  /**
   * Number of tiles to generate.
   */
  length: number;
};

/**
 * Input payload for tile click handling.
 */
export type HandleTileClickInputType = {
  /**
   * Tile identifier selected by the player.
   */
  tileId: number;
};
