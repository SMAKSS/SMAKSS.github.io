import type { JSX, KeyboardEvent } from 'react';

/**
 * Single tab descriptor used by the playground tabs component.
 */
export type PlaygroundTabItemType = {
  /**
   * Stable identifier for keying and selection.
   */
  id: string;
  /**
   * Visible tab label.
   */
  label: string;
};

/**
 * Payload emitted when a tab is selected.
 */
export type PlaygroundTabSelectInputType = {
  /**
   * Index of the selected tab.
   */
  index: number;
};

/**
 * Props consumed by the shared playground tabs component.
 */
export type PlaygroundTabsPropsType = {
  /**
   * Stable base id used to connect tabs with their tabpanel.
   */
  baseId: string;
  /**
   * Available tabs to render.
   */
  items: PlaygroundTabItemType[];
  /**
   * Currently selected tab index.
   */
  activeIndex: number;
  /**
   * Handles tab selection changes.
   */
  onSelect: (input: PlaygroundTabSelectInputType) => void;
};

/**
 * Input payload for focusing a rendered tab button by id.
 */
export type FocusTabButtonInputType = {
  /**
   * Stable tab set base id.
   */
  baseId: string;
  /**
   * Stable item id appended to the tab button id.
   */
  itemId: string;
};

/**
 * Input payload for tab keyboard navigation handling.
 */
export type HandlePlaygroundTabKeyDownInputType = {
  /**
   * Active keyboard event from the tab button.
   */
  event: KeyboardEvent<HTMLButtonElement>;
  /**
   * Zero-based index of the tab that received the event.
   */
  index: number;
};

/**
 * Render output for the playground tabs component.
 */
export type PlaygroundTabsOutputType = JSX.Element;
