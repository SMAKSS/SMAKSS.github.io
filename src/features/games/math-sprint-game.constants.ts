import type { MathDifficultyConfigType, MathDifficultyType } from './math-sprint-game.type';

/**
 * Duration of each math sprint round in seconds.
 */
export const MATH_SPRINT_DURATION_SECONDS = 25;

/**
 * Difficulty configuration map for math sprint question generation.
 */
export const MATH_DIFFICULTY_CONFIG: Record<MathDifficultyType, MathDifficultyConfigType> = {
  easy: { maxOperand: 20 },
  medium: { maxOperand: 45 },
  hard: { maxOperand: 99 },
};
