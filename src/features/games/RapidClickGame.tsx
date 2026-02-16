import { useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';
import { RAPID_DIFFICULTY_CONFIG } from './rapid-click-game.constants';
import type { RapidDifficultyType } from './rapid-click-game.type';

/**
 * Small single-player game where the user clicks as fast as possible in a short round.
 */
export const RapidClickGame = () => {
  const { t } = useAppTranslation();
  const [difficulty, setDifficulty] = useState<RapidDifficultyType>('medium');
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(RAPID_DIFFICULTY_CONFIG.medium.durationSeconds);

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
    const difficultyConfig = RAPID_DIFFICULTY_CONFIG[difficulty];

    setScore(0);
    setTimeLeft(difficultyConfig.durationSeconds);
    setIsRunning(true);
  };

  const handleTap = (): void => {
    if (!isRunning) {
      return;
    }

    setScore((value) => value + 1);
  };

  return (
    <Box as="article" className="p-1">
      <Select
        disabled={isRunning}
        id="rapid-difficulty-select"
        label={t('rapidGame.difficulty')}
        onChange={(event) => {
          setDifficulty(event.target.value as RapidDifficultyType);
        }}
        options={[
          { label: t('rapidGame.levels.easy'), value: 'easy' },
          { label: t('rapidGame.levels.medium'), value: 'medium' },
          { label: t('rapidGame.levels.hard'), value: 'hard' },
        ]}
        value={difficulty}
      />

      <Box className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('rapidGame.score')} {score}
        </Box>
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('rapidGame.time')} {timeLeft}
        </Box>
        <Button disabled={isRunning} onClick={handleStart} variant="primary">
          {isRunning ? t('rapidGame.running') : t('rapidGame.start')}
        </Button>
      </Box>

      <Button
        className="mt-4 inline-flex h-28 w-full items-center justify-center rounded-2xl border border-(--card-border) bg-(--background)/70 text-sm font-medium transition hover:border-(--accent)"
        onClick={handleTap}
        size="none"
        variant="unstyled"
      >
        {isRunning ? t('rapidGame.tapNow') : t('rapidGame.ready')}
      </Button>
    </Box>
  );
};
