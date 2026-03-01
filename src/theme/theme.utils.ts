import type { ThemeModeType, ToggleThemeInputType } from './theme.type';

export const resolveNextTheme = ({ currentTheme }: ToggleThemeInputType): ThemeModeType => {
  return currentTheme === 'light' ? 'dark' : 'light';
};
