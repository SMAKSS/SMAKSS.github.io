import { describe, expect, it, vi } from 'vitest';
import { createReactionDelayMs } from './reaction-time-game.utils';

describe('reaction-time-game.utils', () => {
  it('returns min delay when random value is zero', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(createReactionDelayMs({ maxDelayMs: 3200, minDelayMs: 1500 })).toBe(1500);

    randomSpy.mockRestore();
  });

  it('returns a bounded delay below max delay', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const delay = createReactionDelayMs({ maxDelayMs: 3200, minDelayMs: 1500 });

    expect(delay).toBeGreaterThanOrEqual(1500);
    expect(delay).toBeLessThan(3200);

    randomSpy.mockRestore();
  });
});
