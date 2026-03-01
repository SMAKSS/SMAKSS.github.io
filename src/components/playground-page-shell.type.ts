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
export type PlaygroundPageShellPropsType<ItemType extends PlaygroundPageShellItemType> = {
  /**
   * Optional fallback rendered when no items are available.
   */
  emptyState?: ReactNode;
  /**
   * Introductory copy rendered above the tabs, split on blank lines.
   */
  intro: string;
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
 * Render output for the shared playground shell component.
 */
export type PlaygroundPageShellOutputType = JSX.Element;
