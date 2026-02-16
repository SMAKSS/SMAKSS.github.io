import { MEMORY_TILES } from './memory-pattern-game.constants';
import type { CreateSequenceInputType } from './memory-pattern-game.type';

/**
 * Returns a random tile id from the memory tile set.
 */
export const createRandomTile = (): number => {
  const randomIndex = Math.floor(Math.random() * MEMORY_TILES.length);

  return MEMORY_TILES[randomIndex] ?? 1;
};

/**
 * Creates a sequence of random tile ids with the provided length.
 */
export const createSequence = ({ length }: CreateSequenceInputType): number[] => {
  return Array.from({ length }, () => createRandomTile());
};
