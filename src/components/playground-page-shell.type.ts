import type { JSX, ReactNode } from 'react';

/**
 * Stable item model consumed by the shared playground shell.
 */
export type PlaygroundPageShellItemType = {
  /**
   * Stable identifier used for tabs and panels.
   */
  id: string;
  /**
   * Visible tab label.
   */
  label: string;
};

/**
 * Props accepted by the shared playground shell component.
 */
export type PlaygroundPanelsPropsType<ItemType extends PlaygroundPageShellItemType> = {
  /**
   * Optional fallback rendered when no items are available.
   */
  emptyState?: ReactNode;
  /**
   * Playground items available for selection.
   */
  items: ItemType[];
  /**
   * Optional utility classes for the active panel container.
   */
  panelClassName?: string;
  /**
   * Renderer for the active panel content.
   */
  renderPanel: (item: ItemType) => ReactNode;
  /**
   * Stable section id used for anchoring and ARIA wiring.
   */
  sectionId: string;
};

/**
 * Props for the shared playground shell and its optional deferred content.
 */
export type PlaygroundPageShellPropsType<ItemType extends PlaygroundPageShellItemType> = Omit<
  PlaygroundPanelsPropsType<ItemType>,
  'items'
> & {
  /**
   * Introductory copy rendered above the tabs, split on blank lines.
   */
  intro: string;
  /**
   * Immediate or deferred playground items.
   */
  items: ItemType[] | Promise<ItemType[]>;
  /**
   * Status shown while deferred items load.
   */
  loadingState?: ReactNode;
};

/**
 * Render output for the shared playground shell component.
 */
export type PlaygroundPageShellOutputType = JSX.Element;
