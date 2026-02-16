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
