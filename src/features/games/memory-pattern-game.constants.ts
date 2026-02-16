import type { MemoryDifficultyConfigType, MemoryDifficultyType } from './memory-pattern-game.type';

/**
 * Tile identifiers rendered in the memory grid.
 */
export const MEMORY_TILES = [1, 2, 3, 4] as const;

/**
 * Difficulty configuration map for memory game behavior.
 */
export const MEMORY_DIFFICULTY_CONFIG: Record<MemoryDifficultyType, MemoryDifficultyConfigType> = {
  easy: { flashMs: 420, initialLength: 3, stepMs: 760 },
  medium: { flashMs: 340, initialLength: 3, stepMs: 650 },
  hard: { flashMs: 260, initialLength: 4, stepMs: 540 },
};
