import type { BoxBackgroundType, BoxBorderType, BoxPaddingType, BoxRadiusType } from './box.type';

/**
 * Class map by background variant for the shared Box component.
 */
export const BOX_BACKGROUND_CLASSNAMES: Record<BoxBackgroundType, string> = {
  muted: 'bg-(--picker-bg)/70',
  none: '',
  surface: 'bg-(--card-bg)',
};

/**
 * Class map by border mode for the shared Box component.
 */
export const BOX_BORDER_CLASSNAMES: Record<BoxBorderType, string> = {
  default: 'border border-(--card-border)',
  none: 'border-0',
};

/**
 * Class map by padding preset for the shared Box component.
 */
export const BOX_PADDING_CLASSNAMES: Record<BoxPaddingType, string> = {
  lg: 'p-6',
  md: 'p-4',
  none: 'p-0',
  sm: 'p-2',
};

/**
 * Class map by radius preset for the shared Box component.
 */
export const BOX_RADIUS_CLASSNAMES: Record<BoxRadiusType, string> = {
  lg: 'rounded-lg',
  md: 'rounded-md',
  none: 'rounded-none',
  xl: 'rounded-xl',
  xxl: 'rounded-2xl',
};
