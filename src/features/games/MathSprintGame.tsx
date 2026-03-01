import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useEffect, useMemo, useState } from 'react';
import { MATH_DIFFICULTY_CONFIG, MATH_SPRINT_DURATION_SECONDS } from './math-sprint-game.constants';
import type { MathDifficultyType, MathQuestionType } from './math-sprint-game.type';
import { createQuestion } from './math-sprint-game.utils';

/**
 * Single-player math sprint game that rewards fast, correct answers.
 */
export const MathSprintGame = () => {
  const { t } = useAppTranslation();
  const [difficulty, setDifficulty] = useState<MathDifficultyType>('medium');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MATH_SPRINT_DURATION_SECONDS);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<MathQuestionType>(() =>
    createQuestion({ maxOperand: MATH_DIFFICULTY_CONFIG.medium.maxOperand }),
  );
  const [answerInput, setAnswerInput] = useState('');

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTimeLeft((value) => value - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isRunning, timeLeft]);

  const handleStart = (): void => {
    const difficultyConfig = MATH_DIFFICULTY_CONFIG[difficulty];

    setScore(0);
    setTimeLeft(MATH_SPRINT_DURATION_SECONDS);
    setAnswerInput('');
    setQuestion(createQuestion({ maxOperand: difficultyConfig.maxOperand }));
    setIsRunning(true);
  };

  const handleSubmit = (): void => {
    if (!isRunning) {
      return;
    }

    const numericAnswer = Number(answerInput);

    if (!Number.isFinite(numericAnswer)) {
      return;
    }

    if (numericAnswer === question.answer) {
      setScore((value) => value + 1);
      setQuestion(createQuestion({ maxOperand: MATH_DIFFICULTY_CONFIG[difficulty].maxOperand }));
      setAnswerInput('');
    } else {
      setScore((value) => Math.max(0, value - 1));
    }
  };

  const statusText = useMemo(() => {
    return isRunning ? t('mathGame.running') : t('mathGame.ready');
  }, [isRunning, t]);
  const isSubmitDisabled = !isRunning || answerInput.trim() === '';

  return (
    <Box as="article" className="p-1">
      <Select
        disabled={isRunning}
        id="math-difficulty-select"
        label={t('mathGame.difficulty')}
        onChange={(event) => {
          setDifficulty(event.target.value as MathDifficultyType);
          setQuestion(
            createQuestion({
              maxOperand:
                MATH_DIFFICULTY_CONFIG[event.target.value as MathDifficultyType].maxOperand,
            }),
          );
        }}
        options={[
          { label: t('mathGame.levels.easy'), value: 'easy' },
          { label: t('mathGame.levels.medium'), value: 'medium' },
          { label: t('mathGame.levels.hard'), value: 'hard' },
        ]}
        value={difficulty}
      />

      <Box className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('mathGame.score')} {score}
        </Box>
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('mathGame.time')} {timeLeft}
        </Box>
        <Button disabled={isRunning} onClick={handleStart} variant="primary">
          {t('mathGame.start')}
        </Button>
      </Box>

      <Text as="p" className="mt-4 text-sm text-(--muted-foreground)">
        {statusText}
      </Text>

      <Box className="mt-3 rounded-xl border border-(--card-border) bg-(--background)/70 p-4">
        <Text as="p" className="text-lg font-semibold tracking-tight">
          {question.left} + {question.right} = ?
        </Text>
        <Box className="mt-3 flex gap-2">
          <Input
            aria-label={t('mathGame.placeholder')}
            className="flex-1"
            inputMode="numeric"
            onChange={(event) => {
              setAnswerInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
            placeholder={t('mathGame.placeholder')}
            value={answerInput}
          />
          <Button
            className="rounded-lg px-3"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            variant="outline"
          >
            {t('mathGame.submit')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
