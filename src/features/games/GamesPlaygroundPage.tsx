import { useEffect, useMemo, useState } from 'react';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';

import { Box } from '../../components/Box';
import { PlaygroundTabs } from '../../components/PlaygroundTabs';
import { SurfaceCard } from '../../components/SurfaceCard';
import { Text } from '../../components/Text';
import type {
  GamePlaygroundItemType,
  GamesPlaygroundPagePropsType,
} from './games-playground-page.type';
import { MathSprintGame } from './MathSprintGame';
import { MemoryPatternGame } from './MemoryPatternGame';
import { RapidClickGame } from './RapidClickGame';
import { ReactionTimeGame } from './ReactionTimeGame';
import { SoloMiniGame } from './SoloMiniGame';
import { TimingLockGame } from './TimingLockGame';

/**
 * Renders the standalone playground page for all solo mini-games.
 */
export const GamesPlaygroundPage = ({
  sectionId = 'games-playground',
}: GamesPlaygroundPagePropsType) => {
  const { t } = useAppTranslation();
  const introParagraphs = t('miniGames.intro').split('\n\n');
  const [activeGameIndex, setActiveGameIndex] = useState(0);

  const games = useMemo<GamePlaygroundItemType[]>(() => {
    return [
      {
        id: 'tap-dot',
        render: () => <SoloMiniGame />,
        title: t('miniGame.title'),
      },
      {
        id: 'rapid-click',
        render: () => <RapidClickGame />,
        title: t('rapidGame.title'),
      },
      {
        id: 'reaction-test',
        render: () => <ReactionTimeGame />,
        title: t('reactionGame.title'),
      },
      {
        id: 'pattern-memory',
        render: () => <MemoryPatternGame />,
        title: t('memoryGame.title'),
      },
      {
        id: 'math-sprint',
        render: () => <MathSprintGame />,
        title: t('mathGame.title'),
      },
      {
        id: 'timing-lock',
        render: () => <TimingLockGame />,
        title: t('timingGame.title'),
      },
    ];
  }, [t]);

  useEffect(() => {
    if (games.length === 0) {
      return;
    }

    if (activeGameIndex > games.length - 1) {
      setActiveGameIndex(0);
    }
  }, [activeGameIndex, games.length]);

  const activeGame = games[activeGameIndex] ?? null;
  const ActiveGameComponent = activeGame?.render;

  return (
    <Box as="section" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-8 md:px-10">
      <Box as="section" className="space-y-5" id={sectionId}>
        <Box className="space-y-4 text-base leading-relaxed text-(--muted-foreground) md:text-lg">
          {introParagraphs.map((paragraph) => {
            return (
              <Text as="p" key={paragraph}>
                {paragraph}
              </Text>
            );
          })}
        </Box>

        {activeGame === null || ActiveGameComponent === undefined ? null : (
          <SurfaceCard className="space-y-4">
            <PlaygroundTabs
              activeIndex={activeGameIndex}
              items={games.map((game) => ({ id: game.id, label: game.title }))}
              onSelect={({ index }) => {
                setActiveGameIndex(index);
              }}
            />

            <Box as="article" className="space-y-4 mt-4" role="tabpanel">
              <ActiveGameComponent />
            </Box>
          </SurfaceCard>
        )}
      </Box>
    </Box>
  );
};
