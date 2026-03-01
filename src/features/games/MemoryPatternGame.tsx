import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useEffect, useMemo, useState } from 'react';
import { MEMORY_DIFFICULTY_CONFIG, MEMORY_TILES } from './memory-pattern-game.constants';
import type {
  HandleTileClickInputType,
  MemoryDifficultyType,
  MemoryStageType,
} from './memory-pattern-game.type';
import { createRandomTile, createSequence } from './memory-pattern-game.utils';

/**
 * Single-player memory game where the user reproduces progressively longer tile patterns.
 */
export const MemoryPatternGame = () => {
  const { t } = useAppTranslation();
  const [difficulty, setDifficulty] = useState<MemoryDifficultyType>('medium');
  const [stage, setStage] = useState<MemoryStageType>('idle');
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);

  useEffect(() => {
    if (stage !== 'show' || sequence.length === 0) {
      return;
    }

    const difficultyConfig = MEMORY_DIFFICULTY_CONFIG[difficulty];
    const timeoutIds: number[] = [];
    let sequenceIndex = 0;
    const intervalId = window.setInterval(() => {
      const nextTile = sequence[sequenceIndex];

      if (nextTile === undefined) {
        window.clearInterval(intervalId);
        setActiveTile(null);
        setStage('input');
        return;
      }

      setActiveTile(nextTile);

      const timeoutId = window.setTimeout(() => {
        setActiveTile(null);
      }, difficultyConfig.flashMs);
      timeoutIds.push(timeoutId);

      sequenceIndex += 1;

      if (sequenceIndex > sequence.length) {
        window.clearInterval(intervalId);
        setStage('input');
      }
    }, difficultyConfig.stepMs);

    return () => {
      window.clearInterval(intervalId);
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [difficulty, sequence, stage]);

  const handleStart = (): void => {
    const difficultyConfig = MEMORY_DIFFICULTY_CONFIG[difficulty];
    const nextSequence = createSequence({ length: difficultyConfig.initialLength });
    setLevel(1);
    setPlayerIndex(0);
    setSequence(nextSequence);
    setStage('show');
  };

  const handleRestart = (): void => {
    setLevel(1);
    setPlayerIndex(0);
    setSequence([]);
    setActiveTile(null);
    setStage('idle');
  };

  const handleTileClick = ({ tileId }: HandleTileClickInputType): void => {
    if (stage !== 'input') {
      return;
    }

    const expectedTile = sequence[playerIndex];

    if (expectedTile !== tileId) {
      setStage('failed');
      return;
    }

    const nextIndex = playerIndex + 1;

    if (nextIndex >= sequence.length) {
      const nextLevel = level + 1;
      const nextSequence = [...sequence, createRandomTile()];

      setLevel(nextLevel);
      setPlayerIndex(0);
      setSequence(nextSequence);
      setStage('show');
      return;
    }

    setPlayerIndex(nextIndex);
  };

  const status = useMemo(() => {
    if (stage === 'idle') {
      return t('memoryGame.ready');
    }

    if (stage === 'show') {
      return t('memoryGame.watch');
    }

    if (stage === 'failed') {
      return t('memoryGame.failed');
    }

    return t('memoryGame.repeat');
  }, [stage, t]);

  return (
    <Box as="article" className="p-1">
      <Select
        disabled={stage === 'show' || stage === 'input'}
        id="memory-difficulty-select"
        label={t('memoryGame.difficulty')}
        onChange={(event) => {
          setDifficulty(event.target.value as MemoryDifficultyType);
        }}
        options={[
          { label: t('memoryGame.levels.easy'), value: 'easy' },
          { label: t('memoryGame.levels.medium'), value: 'medium' },
          { label: t('memoryGame.levels.hard'), value: 'hard' },
        ]}
        value={difficulty}
      />

      <Box className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('memoryGame.level')} {level}
        </Box>
        <Box as="span" className="rounded-full border border-(--card-border) px-3 py-1.5">
          {t('memoryGame.step')} {Math.min(playerIndex + 1, sequence.length)} /{' '}
          {Math.max(sequence.length, 1)}
        </Box>
        <Button
          disabled={stage === 'show' || stage === 'input'}
          onClick={handleStart}
          variant="primary"
        >
          {t('memoryGame.start')}
        </Button>
        <Button onClick={handleRestart} variant="outline">
          {t('memoryGame.restart')}
        </Button>
      </Box>

      <Text as="p" className="mt-4 text-sm text-(--muted-foreground)">
        {status}
      </Text>

      <Box className="mt-4 grid grid-cols-2 gap-3">
        {MEMORY_TILES.map((tileId) => {
          const isActive = activeTile === tileId;

          return (
            <Button
              className={`h-20 rounded-xl border border-(--card-border) text-sm font-semibold transition ${
                isActive
                  ? 'scale-[1.03] border-(--accent) bg-(--accent)/25'
                  : 'bg-(--background)/70'
              }`}
              key={tileId}
              onClick={() => {
                handleTileClick({ tileId });
              }}
              size="none"
              variant="unstyled"
            >
              {tileId}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
