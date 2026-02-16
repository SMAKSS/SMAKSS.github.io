import { useEffect, useMemo, useState } from 'react';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';

import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { Text } from '../../components/Text';
import {
  SOLO_DIFFICULTY_CONFIG,
  SOLO_GAME_DURATION_SECONDS,
  SOLO_GAME_MAX_TARGET_PERCENT,
  SOLO_GAME_MIN_TARGET_PERCENT,
} from './solo-mini-game.constants';
import type { SoloDifficultyType, TargetPositionType } from './solo-mini-game.type';
import { createTargetPosition } from './solo-mini-game.utils';

/**
 * Compact single-player reaction mini-game displayed on the home page.
 */
export const SoloMiniGame = () => {
  const { t } = useAppTranslation();
  const [difficulty, setDifficulty] = useState<SoloDifficultyType>('medium');
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SOLO_DIFFICULTY_CONFIG.medium.durationSeconds);
  const [target, setTarget] = useState<TargetPositionType>({ x: 50, y: 50 });

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
    const difficultyConfig = SOLO_DIFFICULTY_CONFIG[difficulty];

    setScore(0);
    setTimeLeft(difficultyConfig.durationSeconds);
    setTarget(
      createTargetPosition({
        maxPercent: SOLO_GAME_MAX_TARGET_PERCENT,
        minPercent: SOLO_GAME_MIN_TARGET_PERCENT,
      }),
    );
    setIsRunning(true);
  };

  const handleTargetHit = (): void => {
    if (!isRunning) {
      return;
    }

    setScore((value) => value + 1);
    setTarget(
      createTargetPosition({
        maxPercent: SOLO_GAME_MAX_TARGET_PERCENT,
        minPercent: SOLO_GAME_MIN_TARGET_PERCENT,
      }),
    );
  };

  const ctaLabel = useMemo(() => {
    if (!isRunning && timeLeft !== SOLO_GAME_DURATION_SECONDS) {
      return t('miniGame.restart');
    }

    return t('miniGame.start');
  }, [isRunning, t, timeLeft]);

  const difficultyConfig = SOLO_DIFFICULTY_CONFIG[difficulty];

  return (
    <Box as="article" className="p-1">
      <Select
        disabled={isRunning}
        id="solo-difficulty-select"
        label={t('miniGame.difficulty')}
        onChange={(event) => {
          setDifficulty(event.target.value as SoloDifficultyType);
        }}
        options={[
          { label: t('miniGame.levels.easy'), value: 'easy' },
          { label: t('miniGame.levels.medium'), value: 'medium' },
          { label: t('miniGame.levels.hard'), value: 'hard' },
        ]}
        value={difficulty}
      />

      <Box className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('miniGame.score')} {score}
        </Box>
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('miniGame.time')} {timeLeft}
        </Box>
        <Button disabled={isRunning} onClick={handleStart} variant="primary">
          {ctaLabel}
        </Button>
      </Box>

      <Box className="relative mt-4 h-52 overflow-hidden rounded-2xl border border-(--card-border) bg-(--card-bg)/60">
        <Text as="p" className="absolute left-4 top-3 text-xs text-(--muted-foreground)">
          {isRunning ? t('miniGame.running') : t('miniGame.ready')}
        </Text>

        {isRunning ? (
          <Button
            aria-label={t('miniGame.targetLabel')}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent) shadow-md transition hover:scale-110"
            onClick={handleTargetHit}
            size="none"
            style={{
              height: `${String(difficultyConfig.targetSizePx)}px`,
              left: `${String(target.x)}%`,
              top: `${String(target.y)}%`,
              width: `${String(difficultyConfig.targetSizePx)}px`,
            }}
            variant="unstyled"
          />
        ) : null}
      </Box>
    </Box>
  );
};
