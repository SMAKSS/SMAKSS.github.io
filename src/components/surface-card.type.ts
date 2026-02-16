import type { ReactNode } from 'react';

/**
 * Supported semantic tags for the shared surface card component.
 */
export type SurfaceCardElementType = 'article' | 'div' | 'section';

/**
 * Props accepted by the shared surface card component.
 */
export type SurfaceCardPropsType = {
  /**
   * Optional class names appended to the base surface classes.
   */
  className?: string;
  /**
   * Rendered card content.
   */
  children: ReactNode;
  /**
   * Semantic element type used for rendering.
   */
  as?: SurfaceCardElementType;
};
