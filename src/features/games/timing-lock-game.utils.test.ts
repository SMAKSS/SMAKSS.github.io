import { describe, expect, it, vi } from 'vitest';
import { createTargetSegment } from './timing-lock-game.utils';

describe('timing-lock-game.utils', () => {
  it('creates expected segment when random value is zero', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(createTargetSegment({ width: 20 })).toEqual({
      end: 20,
      start: 0,
    });

    randomSpy.mockRestore();
  });

  it('keeps segment width and bounds consistent', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const segment = createTargetSegment({ width: 20 });

    expect(segment.end - segment.start).toBeCloseTo(20);
    expect(segment.start).toBeGreaterThanOrEqual(0);
    expect(segment.end).toBeLessThanOrEqual(100);

    randomSpy.mockRestore();
  });
});
