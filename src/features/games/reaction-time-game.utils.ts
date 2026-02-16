import type { CreateReactionDelayInputType } from './reaction-time-game.type';

/**
 * Generates a random delay in milliseconds within the configured range.
 */
export const createReactionDelayMs = ({
  maxDelayMs,
  minDelayMs,
}: CreateReactionDelayInputType): number => {
  return minDelayMs + Math.floor(Math.random() * (maxDelayMs - minDelayMs));
};
