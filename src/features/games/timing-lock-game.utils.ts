import type { CreateTargetSegmentInputType, TimingTargetType } from './timing-lock-game.type';

/**
 * Generates a random target segment for the timing lock game.
 */
export const createTargetSegment = ({ width }: CreateTargetSegmentInputType): TimingTargetType => {
  const maxStart = 100 - width;
  const start = Math.random() * maxStart;

  return {
    end: start + width,
    start,
  };
};
