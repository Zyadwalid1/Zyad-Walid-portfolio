import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => {
        set({ language: lang });
        i18n.changeLanguage(lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },
      toggleLanguage: () => {
        set((state) => {
          const newLang = state.language === 'en' ? 'ar' : 'en';
          i18n.changeLanguage(newLang);
          document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = newLang;
          return { language: newLang };
        });
      },
      // Initialize language on hydration
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        // After rehydration, sync i18n with the persisted language
        if (state) {
          i18n.changeLanguage(state.language);
          document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = state.language;
          state.setHasHydrated(true);
        }
      },
    }
  )
);
