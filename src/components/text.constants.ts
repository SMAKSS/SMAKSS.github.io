import type { TextDecorationType, TextSizeType, TextToneType, TextWeightType } from './text.type';

/**
 * Base class names applied to all Text variants.
 */
export const TEXT_BASE_CLASSNAME = 'text-pretty';

/**
 * Class map by size preset.
 */
export const TEXT_SIZE_CLASSNAMES: Record<TextSizeType, string> = {
  base: 'text-base',
  lg: 'text-lg',
  sm: 'text-sm',
  xl: 'text-xl',
  xs: 'text-xs',
};

/**
 * Class map by font-weight preset.
 */
export const TEXT_WEIGHT_CLASSNAMES: Record<TextWeightType, string> = {
  bold: 'font-bold',
  medium: 'font-medium',
  normal: 'font-normal',
  semibold: 'font-semibold',
};

/**
 * Class map by tone preset.
 */
export const TEXT_TONE_CLASSNAMES: Record<TextToneType, string> = {
  default: 'text-(--foreground)',
  muted: 'text-(--muted-foreground)',
  subtle: 'text-(--foreground)/85',
};

/**
 * Class map by text decoration preset.
 */
export const TEXT_DECORATION_CLASSNAMES: Record<TextDecorationType, string> = {
  'line-through': 'line-through',
  none: 'no-underline',
  underline: 'underline',
};
