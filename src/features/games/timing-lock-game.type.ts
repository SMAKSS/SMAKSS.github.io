/**
 * Supported difficulty levels for the timing lock mini-game.
 */
export type TimingDifficultyType = 'easy' | 'medium' | 'hard';

/**
 * Horizontal start/end percentages for the lock target segment.
 */
export type TimingTargetType = {
  /**
   * End position percentage.
   */
  end: number;
  /**
   * Start position percentage.
   */
  start: number;
};

/**
 * Per-level speed and target size configuration for the timing lock game.
 */
export type TimingDifficultyConfigType = {
  /**
   * Cursor speed delta per tick.
   */
  speedPerTick: number;
  /**
   * Target window width percentage.
   */
  targetWidth: number;
};

/**
 * Input payload for creating a timing target segment.
 */
export type CreateTargetSegmentInputType = {
  /**
   * Width percentage of the target segment.
   */
  width: number;
};
