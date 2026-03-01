import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useEffect, useRef, useState } from 'react';
import { REACTION_DIFFICULTY_CONFIG } from './reaction-time-game.constants';
import type { ReactionDifficultyType, ReactionStageType } from './reaction-time-game.type';
import { createReactionDelayMs } from './reaction-time-game.utils';

/**
 * Small single-player reaction game that measures time to click after a random delay.
 */
export const ReactionTimeGame = () => {
  const { t } = useAppTranslation();
  const [difficulty, setDifficulty] = useState<ReactionDifficultyType>('medium');
  const [stage, setStage] = useState<ReactionStageType>('idle');
  const [result, setResult] = useState<number | null>(null);
  const timerIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) {
        window.clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const handleStart = (): void => {
    if (timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current);
    }

    setResult(null);
    setStage('waiting');

    const difficultyConfig = REACTION_DIFFICULTY_CONFIG[difficulty];
    const randomDelayMs = createReactionDelayMs({
      maxDelayMs: difficultyConfig.maxDelayMs,
      minDelayMs: difficultyConfig.minDelayMs,
    });
    timerIdRef.current = window.setTimeout(() => {
      setStage('ready');
      startTimeRef.current = performance.now();
      timerIdRef.current = null;
    }, randomDelayMs);
  };

  const handleAreaClick = (): void => {
    if (stage === 'waiting') {
      if (timerIdRef.current !== null) {
        window.clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }

      setResult(null);
      setStage('early');
      return;
    }

    if (stage !== 'ready') {
      return;
    }

    const startTime = startTimeRef.current;

    if (startTime === null) {
      return;
    }

    const reactionTimeMs = Math.round(performance.now() - startTime);
    setResult(reactionTimeMs);
    setStage('done');
  };

  const getStatusText = (): string => {
    if (stage === 'waiting') {
      return t('reactionGame.wait');
    }

    if (stage === 'ready') {
      return t('reactionGame.click');
    }

    if (stage === 'early') {
      return t('reactionGame.early');
    }

    if (stage === 'done' && result !== null) {
      return `${t('reactionGame.result')} ${String(result)}ms`;
    }

    return t('reactionGame.ready');
  };

  return (
    <Box as="article" className="p-1">
      <Select
        disabled={stage === 'waiting' || stage === 'ready'}
        id="reaction-difficulty-select"
        label={t('reactionGame.difficulty')}
        onChange={(event) => {
          setDifficulty(event.target.value as ReactionDifficultyType);
        }}
        options={[
          { label: t('reactionGame.levels.easy'), value: 'easy' },
          { label: t('reactionGame.levels.medium'), value: 'medium' },
          { label: t('reactionGame.levels.hard'), value: 'hard' },
        ]}
        value={difficulty}
      />

      <Box className="mt-4">
        <Button
          disabled={stage === 'waiting' || stage === 'ready'}
          onClick={handleStart}
          variant="primary"
        >
          {t('reactionGame.start')}
        </Button>
      </Box>

      <Button
        className={`mt-4 inline-flex h-28 w-full items-center justify-center rounded-2xl border border-(--card-border) text-sm font-medium transition ${
          stage === 'ready' ? 'bg-emerald-500/20 text-(--foreground)' : 'bg-(--background)/70'
        }`}
        onClick={handleAreaClick}
        size="none"
        variant="unstyled"
      >
        {getStatusText()}
      </Button>
    </Box>
  );
};
