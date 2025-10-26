import { useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import i18n from '../i18n';

/**
 * Hook to ensure language is properly initialized on mount
 * Critical for serverless deployments where state needs to be restored
 */
export const useLanguageInit = () => {
  const { language, _hasHydrated } = useLanguageStore();

  useEffect(() => {
    // Ensure i18n is synced with the store language
    if (_hasHydrated && i18n.language !== language) {
      i18n.changeLanguage(language);
    }

    // Ensure DOM attributes are set
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, _hasHydrated]);

  return language;
};

export default useLanguageInit;
