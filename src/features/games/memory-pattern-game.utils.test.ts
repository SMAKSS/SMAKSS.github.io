import { describe, expect, it, vi } from 'vitest';
import { MEMORY_TILES } from './memory-pattern-game.constants';
import { createRandomTile, createSequence } from './memory-pattern-game.utils';

describe('memory-pattern-game.utils', () => {
  it('returns the first tile when random value is zero', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(createRandomTile()).toBe(MEMORY_TILES[0]);

    randomSpy.mockRestore();
  });

  it('creates a sequence with requested length and valid tile ids', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const sequence = createSequence({ length: 3 });

    expect(sequence).toHaveLength(3);
    sequence.forEach((tileId) => {
      expect(MEMORY_TILES.includes(tileId as (typeof MEMORY_TILES)[number])).toBe(true);
    });

    randomSpy.mockRestore();
  });
});
