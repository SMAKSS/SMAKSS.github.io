/**
 * Supported difficulty levels for the rapid click mini-game.
 */
export type RapidDifficultyType = 'easy' | 'medium' | 'hard';

/**
 * Per-level configuration for the rapid click mini-game.
 */
export type RapidDifficultyConfigType = {
  /**
   * Round duration in seconds.
   */
  durationSeconds: number;
};
