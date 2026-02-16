import type {
  ReactionDifficultyConfigType,
  ReactionDifficultyType,
} from './reaction-time-game.type';

/**
 * Difficulty configuration map for reaction time delay windows.
 */
export const REACTION_DIFFICULTY_CONFIG: Record<
  ReactionDifficultyType,
  ReactionDifficultyConfigType
> = {
  easy: { maxDelayMs: 4200, minDelayMs: 2000 },
  medium: { maxDelayMs: 3200, minDelayMs: 1500 },
  hard: { maxDelayMs: 2600, minDelayMs: 1000 },
};
