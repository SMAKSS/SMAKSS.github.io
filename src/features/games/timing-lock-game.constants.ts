import type { TimingDifficultyConfigType, TimingDifficultyType } from './timing-lock-game.type';

/**
 * Duration of each timing lock round in seconds.
 */
export const TIMING_DURATION_SECONDS = 20;

/**
 * Difficulty configuration map for timing lock speed and target width.
 */
export const TIMING_DIFFICULTY_CONFIG: Record<TimingDifficultyType, TimingDifficultyConfigType> = {
  easy: { speedPerTick: 2.2, targetWidth: 20 },
  medium: { speedPerTick: 3.0, targetWidth: 14 },
  hard: { speedPerTick: 4.0, targetWidth: 10 },
};
