import { resolveSupportedLanguage } from '@utils/language.utils';
import { useTranslation } from 'react-i18next';
import './index';
import type {
  AppI18nType,
  AppTranslateFunctionType,
  UseAppTranslationResultType,
} from './use-app-translation.type';

/**
 * Wraps `useTranslation` and adds normalized language metadata.
 */
export const useAppTranslation = (): UseAppTranslationResultType => {
  const { i18n: rawI18n, ready: rawReady, t: rawTranslate } = useTranslation('translation');
  const t = rawTranslate as unknown as AppTranslateFunctionType;
  const i18n = rawI18n as unknown as AppI18nType;
  const ready = rawReady;
  const currentLanguage = resolveSupportedLanguage({ input: i18n.resolvedLanguage });

  return {
    t,
    i18n,
    ready,
    currentLanguage,
    currentLocale: currentLanguage === 'fa' ? 'fa-IR' : 'en-GB',
    isRtl: currentLanguage === 'fa',
  };
};
