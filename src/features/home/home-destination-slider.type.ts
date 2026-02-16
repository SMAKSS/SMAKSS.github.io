import type {
  DestinationFeedItemType,
  DestinationFeedsByIdType,
  HomeDestinationItemType,
} from './home-destination.type';

/**
 * Props consumed by the home destination slider.
 */
export type HomeDestinationSliderPropsType = {
  /**
   * Deferred destination feeds resolved on the server.
   */
  destinationFeedsPromise: Promise<DestinationFeedsByIdType>;
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
  slide: HomeDestinationItemType;
};

/**
 * Input payload for rendering feed content.
 */
export type RenderFeedContentInputType = {
  /**
   * Feed items for the active slide.
   */
  items: DestinationFeedItemType[];
};

/**
 * Input payload for rendering slide illustrations.
 */
export type RenderSlideIllustrationInputType = {
  /**
   * Slide payload for illustration rendering.
   */
  slide: HomeDestinationItemType;
};
