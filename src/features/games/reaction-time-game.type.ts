/**
 * Internal stages for the reaction test mini-game lifecycle.
 */
export type ReactionStageType = 'idle' | 'waiting' | 'ready' | 'done' | 'early';

/**
 * Supported difficulty levels for the reaction test mini-game.
 */
export type ReactionDifficultyType = 'easy' | 'medium' | 'hard';

/**
 * Per-level delay range configuration for the reaction test.
 */
export type ReactionDifficultyConfigType = {
  /**
   * Maximum delay before the click signal appears.
   */
  maxDelayMs: number;
  /**
   * Minimum delay before the click signal appears.
   */
  minDelayMs: number;
};

/**
 * Input payload for generating a randomized wait duration.
 */
export type CreateReactionDelayInputType = {
  /**
   * Maximum delay before the click signal appears.
   */
  maxDelayMs: number;
  /**
   * Minimum delay before the click signal appears.
   */
  minDelayMs: number;
};
