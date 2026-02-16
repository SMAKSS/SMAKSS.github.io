import type { SoloDifficultyConfigType, SoloDifficultyType } from './solo-mini-game.type';

/**
 * Duration of each game round in seconds.
 */
export const SOLO_GAME_DURATION_SECONDS = 20;

/**
 * Minimum target coordinate percentage inside the play area.
 */
export const SOLO_GAME_MIN_TARGET_PERCENT = 8;

/**
 * Maximum target coordinate percentage inside the play area.
 */
export const SOLO_GAME_MAX_TARGET_PERCENT = 92;

/**
 * Difficulty configuration map for solo mini-game rounds and target sizes.
 */
export const SOLO_DIFFICULTY_CONFIG: Record<SoloDifficultyType, SoloDifficultyConfigType> = {
  easy: { durationSeconds: SOLO_GAME_DURATION_SECONDS + 5, targetSizePx: 30 },
  medium: { durationSeconds: SOLO_GAME_DURATION_SECONDS, targetSizePx: 24 },
  hard: { durationSeconds: SOLO_GAME_DURATION_SECONDS - 5, targetSizePx: 20 },
};
