import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/language.constants';
import type { LanguageCodeType } from '../types/language.type';
import en from './locales/en.json';
import fa from './locales/fa.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
};

const getInitialLanguage = (): LanguageCodeType => {
  if (typeof document === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const langAttribute = document.documentElement.getAttribute('lang');

  if (langAttribute === null) {
    return DEFAULT_LANGUAGE;
  }

  const normalizedLanguage = langAttribute.trim().toLowerCase().split('-')[0];

  if (normalizedLanguage === undefined) {
    return DEFAULT_LANGUAGE;
  }

  return SUPPORTED_LANGUAGES.includes(normalizedLanguage as LanguageCodeType)
    ? (normalizedLanguage as LanguageCodeType)
    : DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  lng: getInitialLanguage(),
  resources,
  load: 'languageOnly',
  initImmediate: false,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
