import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

/**
 * Supported intrinsic elements rendered by the shared Text component.
 */
export type TextHeadingElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Supported intrinsic elements rendered by the shared Text component.
 */
export type TextElementType = 'a' | 'p' | 'span' | TextHeadingElementType;

/**
 * Supported font-size presets for the shared Text component.
 */
export type TextSizeType = 'base' | 'lg' | 'sm' | 'xl' | 'xs';

/**
 * Supported font-weight presets for the shared Text component.
 */
export type TextWeightType = 'bold' | 'medium' | 'normal' | 'semibold';

/**
 * Supported tone presets for the shared Text component.
 */
export type TextToneType = 'default' | 'muted' | 'subtle';

/**
 * Supported decoration variants for the shared Text component.
 */
export type TextDecorationType = 'line-through' | 'none' | 'underline';

/**
 * Shared visual props used by all Text render modes.
 */
export type TextSharedPropsType = {
  /**
   * Rendered children content.
   */
  children: ReactNode;
  /**
   * Optional class names appended to computed text styles.
   */
  className?: string;
  /**
   * Text decoration style.
   */
  decoration?: TextDecorationType;
  /**
   * Whether to render an external anchor (target blank + noreferrer).
   */
  externalLink?: boolean;
  /**
   * Font-size preset.
   */
  size?: TextSizeType;
  /**
   * Tone preset controlling foreground color.
   */
  tone?: TextToneType;
  /**
   * Whether underline offset utility classes should be applied.
   */
  underlineOffset?: boolean;
  /**
   * Font-weight preset.
   */
  weight?: TextWeightType;
};

/**
 * Props for rendering paragraph/span text nodes.
 */
export type TextElementPropsType = TextSharedPropsType & {
  /**
   * Element type for non-link content.
   */
  as?: Exclude<TextElementType, 'a'>;
  /**
   * Link destination is not supported for non-anchor mode.
   */
  href?: never;
  /**
   * Target attribute is not supported for non-anchor mode.
   */
  target?: never;
} & HTMLAttributes<HTMLElement>;

/**
 * Props for rendering anchor text nodes.
 */
export type TextAnchorPropsType = TextSharedPropsType & {
  /**
   * Element type for anchor mode.
   */
  as?: 'a';
  /**
   * Anchor destination URL.
   */
  href: string;
  /**
   * Link target attribute, ignored if externalLink is true.
   */
  target?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Unified props accepted by the shared Text component.
 */
export type TextPropsType = TextAnchorPropsType | TextElementPropsType;
