import { describe, expect, it, vi } from 'vitest';
import { createQuestion } from './math-sprint-game.utils';

describe('math-sprint-game.utils', () => {
  it('creates a deterministic question from random operands', () => {
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(createQuestion({ maxOperand: 20 })).toEqual({
      answer: 4,
      left: 2,
      right: 2,
    });

    randomSpy.mockRestore();
  });

  it('returns answer equal to left plus right', () => {
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValueOnce(0.99).mockReturnValueOnce(0.5);

    const question = createQuestion({ maxOperand: 45 });

    expect(question.answer).toBe(question.left + question.right);
    expect(question.left).toBeGreaterThanOrEqual(2);
    expect(question.right).toBeGreaterThanOrEqual(2);

    randomSpy.mockRestore();
  });
});
