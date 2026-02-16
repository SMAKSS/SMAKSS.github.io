import type { ButtonSizeType, ButtonVariantType } from './button.type';

/**
 * Shared base classes applied to all button variants.
 */
export const BUTTON_BASE_CLASSNAME =
  'inline-flex items-center justify-center border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) disabled:cursor-not-allowed disabled:opacity-60';

/**
 * Class map by variant for the shared button component.
 */
export const BUTTON_VARIANT_CLASSNAMES: Record<ButtonVariantType, string> = {
  icon: 'rounded-full border-(--card-border) bg-(--picker-bg) text-(--muted-foreground) hover:text-(--foreground)',
  outline:
    'rounded-full border-(--card-border) bg-transparent font-medium text-(--foreground) hover:border-(--accent) hover:text-(--accent)',
  primary:
    'button-primary rounded-full border-transparent font-semibold text-(--primary-button-fg)',
  unstyled: '',
};

/**
 * Class map by size for the shared button component.
 */
export const BUTTON_SIZE_CLASSNAMES: Record<ButtonSizeType, string> = {
  md: 'px-4 py-2 text-sm',
  none: '',
  sm: 'px-3 py-1.5 text-xs',
};
