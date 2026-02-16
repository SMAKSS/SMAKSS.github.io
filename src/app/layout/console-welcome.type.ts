import type { ThemeModeType } from '../../theme/theme.type';
import type { LanguageCodeType } from '../../types/language.type';

/**
 * Props accepted by the console welcome helper component.
 */
export type ConsoleWelcomePropsType = {
  /**
   * Active language resolved by the app shell.
   */
  language: LanguageCodeType;
  /**
   * Active theme resolved by the app shell.
   */
  theme: ThemeModeType;
};
