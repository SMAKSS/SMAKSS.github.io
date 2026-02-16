import type { CreateTargetPositionInputType, TargetPositionType } from './solo-mini-game.type';

/**
 * Generates a random target position constrained to the safe play area.
 */
export const createTargetPosition = ({
  maxPercent,
  minPercent,
}: CreateTargetPositionInputType): TargetPositionType => {
  const range = maxPercent - minPercent;

  return {
    x: minPercent + Math.random() * range,
    y: minPercent + Math.random() * range,
  };
};
