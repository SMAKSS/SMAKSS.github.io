/**
 * Normalized coordinates (in percentages) for positioning the game target.
 */
export type TargetPositionType = {
  /**
   * Horizontal position in percentage units.
   */
  x: number;
  /**
   * Vertical position in percentage units.
   */
  y: number;
};

/**
 * Supported difficulty levels for the solo mini-game.
 */
export type SoloDifficultyType = 'easy' | 'medium' | 'hard';

/**
 * Per-level configuration for the solo mini-game.
 */
export type SoloDifficultyConfigType = {
  /**
   * Round duration in seconds.
   */
  durationSeconds: number;
  /**
   * Target size in pixels.
   */
  targetSizePx: number;
};

/**
 * Input payload for generating a randomized target position.
 */
export type CreateTargetPositionInputType = {
  /**
   * Maximum coordinate percentage inside the play area.
   */
  maxPercent: number;
  /**
   * Minimum coordinate percentage inside the play area.
   */
  minPercent: number;
};
