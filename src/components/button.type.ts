import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Supported visual variants for the shared button component.
 */
export type ButtonVariantType = 'icon' | 'outline' | 'primary' | 'unstyled';

/**
 * Supported size presets for the shared button component.
 */
export type ButtonSizeType = 'md' | 'none' | 'sm';

/**
 * Common props shared by all button render modes.
 */
type ButtonSharedPropsType = {
  /**
   * Visual variant used for the button appearance.
   */
  variant?: ButtonVariantType;
  /**
   * Size preset controlling spacing and font scale.
   */
  size?: ButtonSizeType;
  /**
   * Additional utility classes.
   */
  className?: string;
  /**
   * Rendered content.
   */
  children?: ReactNode;
};

/**
 * Native button rendering mode props.
 */
export type ButtonAsNativePropsType = ButtonSharedPropsType &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'href'> & {
    /**
     * Omit href to keep native button rendering mode.
     */
    href?: undefined;
  };

/**
 * Anchor rendering mode props.
 */
export type ButtonAsAnchorPropsType = ButtonSharedPropsType &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'type'> & {
    /**
     * Destination URL for anchor rendering mode.
     */
    href: string;
  };

/**
 * Props accepted by the shared button component.
 */
export type ButtonPropsType = ButtonAsAnchorPropsType | ButtonAsNativePropsType;
