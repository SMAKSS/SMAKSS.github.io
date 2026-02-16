import type {
  CommunityContributionFeedItemType,
  CommunityContributionFeedsByIdType,
  HomeCommunityContributionItemType,
} from './home-community-contribution.type';

/**
 * Props consumed by the home community contribution slider.
 */
export type HomeCommunityContributionSliderPropsType = {
  /**
   * Deferred community contribution feeds resolved on the server.
   */
  communityContributionFeedsPromise: Promise<CommunityContributionFeedsByIdType>;
};

/**
 * Image metadata used for slider slide illustrations.
 */
export type SlideImageConfigType = {
  /**
   * Accessible alt text for the slide illustration.
   */
  alt: string;
  /**
   * Base path to the slide image set without extension.
   */
  basePath: string;
  /**
   * Whether this image contains both light and dark variants in one file.
   */
  isThemeCombined?: boolean;
};

/**
 * Input payload for rendering a slide title.
 */
export type RenderSlideTitleInputType = {
  /**
   * Slide payload for title rendering.
   */
  slide: HomeCommunityContributionItemType;
};

/**
 * Input payload for rendering feed content.
 */
export type RenderFeedContentInputType = {
  /**
   * Feed items for the active slide.
   */
  items: CommunityContributionFeedItemType[];
};

/**
 * Input payload for rendering slide illustrations.
 */
export type RenderSlideIllustrationInputType = {
  /**
   * Slide payload for illustration rendering.
   */
  slide: HomeCommunityContributionItemType;
};

/**
 * Input payload for checking interactive pointer targets.
 */
export type IsInteractivePointerTargetInputType = {
  /**
   * Pointer event target node.
   */
  target: EventTarget | null;
  /**
   * Optional composed event path for robust interactive ancestor detection.
   */
  path?: EventTarget[];
};

/**
 * Input payload for pointer-down tracking in slider drag interactions.
 */
export type HandleSliderPointerDownInputType = {
  /**
   * Horizontal pointer coordinate at drag start.
   */
  clientX: number;
  /**
   * Active pointer id used for capture tracking.
   */
  pointerId: number;
};

/**
 * Input payload for pointer move/up handling in slider drag interactions.
 */
export type HandleSliderPointerPositionInputType = {
  /**
   * Horizontal pointer coordinate for current pointer frame.
   */
  clientX: number;
};
