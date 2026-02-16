import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Supported intrinsic elements rendered by the shared Box component.
 */
export type BoxElementType =
  | 'article'
  | 'aside'
  | 'div'
  | 'footer'
  | 'header'
  | 'main'
  | 'nav'
  | 'span'
  | 'section';

/**
 * Supported background variants for the shared Box component.
 */
export type BoxBackgroundType = 'muted' | 'none' | 'surface';

/**
 * Supported border modes for the shared Box component.
 */
export type BoxBorderType = 'default' | 'none';

/**
 * Supported padding presets for the shared Box component.
 */
export type BoxPaddingType = 'lg' | 'md' | 'none' | 'sm';

/**
 * Supported border-radius presets for the shared Box component.
 */
export type BoxRadiusType = 'lg' | 'md' | 'none' | 'xl' | 'xxl';

/**
 * Props accepted by the shared Box component.
 */
export type BoxPropsType = HTMLAttributes<HTMLElement> & {
  /**
   * Element type used for semantic rendering.
   */
  as?: BoxElementType;
  /**
   * Background style variant.
   */
  background?: BoxBackgroundType;
  /**
   * Border style mode.
   */
  border?: BoxBorderType;
  /**
   * Rendered children.
   */
  children?: ReactNode;
  /**
   * Padding preset.
   */
  padding?: BoxPaddingType;
  /**
   * Border-radius preset.
   */
  radius?: BoxRadiusType;
};
