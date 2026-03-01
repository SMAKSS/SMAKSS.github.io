import type { ThemeModeType } from '@theme/theme.type';

/**
 * Supported social icon identifiers used across header and profile surfaces.
 */
export type SocialIconIdType =
  | 'email'
  | 'github'
  | 'hackernoon'
  | 'linkedin'
  | 'npm'
  | 'stackoverflow';

/**
 * Props used by the theme toggle icon renderer.
 */
export type ThemeToggleIconPropsType = {
  /**
   * Current active theme mode.
   */
  theme: ThemeModeType;
};

/**
 * Props used by the mobile navigation toggle icon renderer.
 */
export type MobileMenuIconPropsType = {
  /**
   * Indicates whether the mobile navigation panel is currently expanded.
   */
  isOpen: boolean;
};

/**
 * Props used by the social icon renderer.
 */
export type SocialIconPropsType = {
  /**
   * Stable identifier that selects the matching SVG glyph.
   */
  id: SocialIconIdType;
};
