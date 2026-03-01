import { PlaygroundPageShell } from '@components/PlaygroundPageShell';
import type {
  GamePlaygroundItemType,
  GamesPlaygroundPagePropsType,
} from '@features/games/games-playground-page.type';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useMemo } from 'react';
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

  const games = useMemo<GamePlaygroundItemType[]>(() => {
    return [
      {
        id: 'tap-dot',
        render: () => <SoloMiniGame />,
        label: t('miniGame.title'),
      },
      {
        id: 'rapid-click',
        render: () => <RapidClickGame />,
        label: t('rapidGame.title'),
      },
      {
        id: 'reaction-test',
        render: () => <ReactionTimeGame />,
        label: t('reactionGame.title'),
      },
      {
        id: 'pattern-memory',
        render: () => <MemoryPatternGame />,
        label: t('memoryGame.title'),
      },
      {
        id: 'math-sprint',
        render: () => <MathSprintGame />,
        label: t('mathGame.title'),
      },
      {
        id: 'timing-lock',
        render: () => <TimingLockGame />,
        label: t('timingGame.title'),
      },
    ];
  }, [t]);

  return (
    <PlaygroundPageShell
      intro={t('miniGames.intro')}
      items={games}
      renderPanel={(item) => {
        return item.render();
      }}
      sectionId={sectionId}
    />
  );
};
