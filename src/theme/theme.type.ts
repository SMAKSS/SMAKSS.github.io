export type ThemeModeType = 'light' | 'dark';

export type ToggleThemeInputType = {
  currentTheme: ThemeModeType;
};

export type ThemeStoragePayloadType = {
  theme: ThemeModeType;
};
