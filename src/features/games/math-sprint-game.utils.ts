import type { CreateQuestionInputType, MathQuestionType } from './math-sprint-game.type';

/**
 * Creates a random addition question for the sprint game.
 */
export const createQuestion = ({ maxOperand }: CreateQuestionInputType): MathQuestionType => {
  const left = 2 + Math.floor(Math.random() * maxOperand);
  const right = 2 + Math.floor(Math.random() * maxOperand);

  return {
    answer: left + right,
    left,
    right,
  };
};
