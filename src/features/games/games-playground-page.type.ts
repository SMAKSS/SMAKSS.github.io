import type { PlaygroundPageShellItemType } from '@components/playground-page-shell.type';
import type { JSX } from 'react';

/**
 * Props accepted by the games playground page.
 */
export type GamesPlaygroundPagePropsType = {
  /**
   * Optional custom section id for anchor targeting.
   */
  sectionId?: string;
};

/**
 * Single tab item in the games playground.
 */
export type GamePlaygroundItemType = PlaygroundPageShellItemType & {
  /**
   * Renderer for the corresponding game panel.
   */
  render: () => JSX.Element;
};
