import type { RapidDifficultyConfigType, RapidDifficultyType } from './rapid-click-game.type';

/**
 * Difficulty configuration map for rapid click game behavior.
 */
export const RAPID_DIFFICULTY_CONFIG: Record<RapidDifficultyType, RapidDifficultyConfigType> = {
  easy: { durationSeconds: 14 },
  medium: { durationSeconds: 10 },
  hard: { durationSeconds: 7 },
};
