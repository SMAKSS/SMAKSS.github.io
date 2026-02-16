/**
 * Supported difficulty levels for the math sprint mini-game.
 */
export type MathDifficultyType = 'easy' | 'medium' | 'hard';

/**
 * Question shape used by the math sprint mini-game.
 */
export type MathQuestionType = {
  /**
   * Correct answer value.
   */
  answer: number;
  /**
   * Left operand for the addition prompt.
   */
  left: number;
  /**
   * Right operand for the addition prompt.
   */
  right: number;
};

/**
 * Per-level operand range configuration for the math sprint game.
 */
export type MathDifficultyConfigType = {
  /**
   * Maximum random operand value.
   */
  maxOperand: number;
};

/**
 * Input payload for generating a new math question.
 */
export type CreateQuestionInputType = {
  /**
   * Maximum operand bound used for randomization.
   */
  maxOperand: number;
};
