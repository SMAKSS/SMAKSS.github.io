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
export type GamePlaygroundItemType = {
  /**
   * Stable identifier for rendering and selection state.
   */
  id: string;
  /**
   * Localized tab title.
   */
  title: string;
  /**
   * Renderer for the corresponding game panel.
   */
  render: () => JSX.Element;
};
