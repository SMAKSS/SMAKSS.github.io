import { DEFAULT_THEME, THEME_STORAGE_KEY } from './theme.constants';
import type { ThemeModeType, ThemeStoragePayloadType, ToggleThemeInputType } from './theme.type';

const isThemeMode = (value: unknown): value is ThemeModeType => {
  return value === 'light' || value === 'dark';
};

const getStoredTheme = (): ThemeModeType | null => {
  const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedValue === null) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as { theme?: unknown };

    if (!isThemeMode(parsedValue.theme)) {
      return null;
    }

    return parsedValue.theme;
  } catch {
    return null;
  }
};

const getSystemTheme = (): ThemeModeType => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return DEFAULT_THEME;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getPreferredTheme = (): ThemeModeType => {
  const storedTheme = getStoredTheme();

  if (storedTheme !== null) {
    return storedTheme;
  }

  return getSystemTheme();
};

export const saveTheme = ({ theme }: ThemeStoragePayloadType): void => {
  window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ theme }));
};

export const resolveNextTheme = ({ currentTheme }: ToggleThemeInputType): ThemeModeType => {
  return currentTheme === 'light' ? 'dark' : 'light';
};
