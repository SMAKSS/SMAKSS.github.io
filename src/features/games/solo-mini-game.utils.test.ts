import { describe, expect, it, vi } from 'vitest';
import { createTargetPosition } from './solo-mini-game.utils';

describe('solo-mini-game.utils', () => {
  it('creates deterministic coordinates from random values', () => {
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValueOnce(0.5).mockReturnValueOnce(0.25);

    expect(createTargetPosition({ maxPercent: 92, minPercent: 8 })).toEqual({
      x: 50,
      y: 29,
    });

    randomSpy.mockRestore();
  });

  it('keeps coordinates within configured bounds', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const targetPosition = createTargetPosition({ maxPercent: 92, minPercent: 8 });

    expect(targetPosition.x).toBeGreaterThanOrEqual(8);
    expect(targetPosition.x).toBeLessThanOrEqual(92);
    expect(targetPosition.y).toBeGreaterThanOrEqual(8);
    expect(targetPosition.y).toBeLessThanOrEqual(92);

    randomSpy.mockRestore();
  });
});
