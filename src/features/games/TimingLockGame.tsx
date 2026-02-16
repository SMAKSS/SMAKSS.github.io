import { useEffect, useMemo, useState } from 'react';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { Text } from '../../components/Text';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';
import { TIMING_DIFFICULTY_CONFIG, TIMING_DURATION_SECONDS } from './timing-lock-game.constants';
import type { TimingDifficultyType, TimingTargetType } from './timing-lock-game.type';
import { createTargetSegment } from './timing-lock-game.utils';

/**
 * Single-player timing game where the player must stop a moving cursor inside a target zone.
 */
export const TimingLockGame = () => {
  const { t } = useAppTranslation();
  const [difficulty, setDifficulty] = useState<TimingDifficultyType>('medium');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMING_DURATION_SECONDS);
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [target, setTarget] = useState<TimingTargetType>(() =>
    createTargetSegment({ width: TIMING_DIFFICULTY_CONFIG.medium.targetWidth }),
  );

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

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setPosition((currentPosition) => {
        const speed = TIMING_DIFFICULTY_CONFIG[difficulty].speedPerTick;
        const nextPosition = currentPosition + direction * speed;

        if (nextPosition >= 100) {
          setDirection(-1);
          return 100;
        }

        if (nextPosition <= 0) {
          setDirection(1);
          return 0;
        }

        return nextPosition;
      });
    }, 45);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [difficulty, direction, isRunning]);

  const handleStart = (): void => {
    const difficultyConfig = TIMING_DIFFICULTY_CONFIG[difficulty];

    setScore(0);
    setTimeLeft(TIMING_DURATION_SECONDS);
    setPosition(0);
    setDirection(1);
    setTarget(createTargetSegment({ width: difficultyConfig.targetWidth }));
    setIsRunning(true);
  };

  const handleLock = (): void => {
    if (!isRunning) {
      return;
    }

    const isInsideTarget = position >= target.start && position <= target.end;

    if (isInsideTarget) {
      setScore((value) => value + 1);
    } else {
      setScore((value) => Math.max(0, value - 1));
    }

    setTarget(createTargetSegment({ width: TIMING_DIFFICULTY_CONFIG[difficulty].targetWidth }));
  };

  const status = useMemo(() => {
    return isRunning ? t('timingGame.running') : t('timingGame.ready');
  }, [isRunning, t]);

  return (
    <Box as="article" className="p-1">
      <Select
        disabled={isRunning}
        id="timing-difficulty-select"
        label={t('timingGame.difficulty')}
        onChange={(event) => {
          setDifficulty(event.target.value as TimingDifficultyType);
        }}
        options={[
          { label: t('timingGame.levels.easy'), value: 'easy' },
          { label: t('timingGame.levels.medium'), value: 'medium' },
          { label: t('timingGame.levels.hard'), value: 'hard' },
        ]}
        value={difficulty}
      />

      <Box className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('timingGame.score')} {score}
        </Box>
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('timingGame.time')} {timeLeft}
        </Box>
        <Button disabled={isRunning} onClick={handleStart} variant="primary">
          {t('timingGame.start')}
        </Button>
      </Box>

      <Text as="p" className="mt-4 text-sm text-(--muted-foreground)">
        {status}
      </Text>

      <Box className="relative mt-3 h-20 rounded-xl border border-(--card-border) bg-(--background)/70">
        <Box
          className="absolute bottom-0 top-0 rounded-xl bg-emerald-500/20"
          style={{
            left: `${String(target.start)}%`,
            width: `${String(target.end - target.start)}%`,
          }}
        />
        <Box
          className="absolute bottom-2 top-2 w-[3px] rounded-full bg-(--accent)"
          style={{ left: `${String(position)}%` }}
        />
      </Box>

      <Button className="mt-4" onClick={handleLock} variant="outline">
        {t('timingGame.lock')}
      </Button>
    </Box>
  );
};
