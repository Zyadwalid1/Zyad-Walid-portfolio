import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const themes = {
  ocean: {
    name: 'Ocean Blue',
    light: {
      primary: {
        50: '#E6F3FF',
        100: '#CCE7FF',
        200: '#99CFFF',
        300: '#66B7FF',
        400: '#339FFF',
        500: '#0087FF',
        600: '#006BCC',
        700: '#005099',
        800: '#003666',
        900: '#001B33',
      },
      secondary: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C4A6E',
      },
      accent: '#00D9FF',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1E293B',
      textSecondary: '#64748B',
    },
    dark: {
      primary: {
        50: '#001B33',
        100: '#003666',
        200: '#005099',
        300: '#006BCC',
        400: '#0087FF',
        500: '#339FFF',
        600: '#66B7FF',
        700: '#99CFFF',
        800: '#CCE7FF',
        900: '#E6F3FF',
      },
      secondary: {
        50: '#0C4A6E',
        100: '#075985',
        200: '#0369A1',
        300: '#0284C7',
        400: '#0EA5E9',
        500: '#38BDF8',
        600: '#7DD3FC',
        700: '#BAE6FD',
        800: '#E0F2FE',
        900: '#F0F9FF',
      },
      accent: '#00D9FF',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
    },
  },
  sunset: {
    name: 'Sunset Orange',
    light: {
      primary: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
      },
      secondary: {
        50: '#FEF3C7',
        100: '#FDE68A',
        200: '#FCD34D',
        300: '#FBBF24',
        400: '#F59E0B',
        500: '#D97706',
        600: '#B45309',
        700: '#92400E',
        800: '#78350F',
        900: '#451A03',
      },
      accent: '#FF6B00',
      background: '#FFFFFF',
      surface: '#FFF7ED',
      text: '#1C1917',
      textSecondary: '#78716C',
    },
    dark: {
      primary: {
        50: '#7C2D12',
        100: '#9A3412',
        200: '#C2410C',
        300: '#EA580C',
        400: '#F97316',
        500: '#FB923C',
        600: '#FDBA74',
        700: '#FED7AA',
        800: '#FFEDD5',
        900: '#FFF7ED',
      },
      secondary: {
        50: '#451A03',
        100: '#78350F',
        200: '#92400E',
        300: '#B45309',
        400: '#D97706',
        500: '#F59E0B',
        600: '#FBBF24',
        700: '#FCD34D',
        800: '#FDE68A',
        900: '#FEF3C7',
      },
      accent: '#FF6B00',
      background: '#1C1917',
      surface: '#292524',
      text: '#FAFAF9',
      textSecondary: '#A8A29E',
    },
  },
  forest: {
    name: 'Forest Green',
    light: {
      primary: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
      },
      secondary: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
      },
      accent: '#10B981',
      background: '#FFFFFF',
      surface: '#F0FDF4',
      text: '#1F2937',
      textSecondary: '#6B7280',
    },
    dark: {
      primary: {
        50: '#14532D',
        100: '#166534',
        200: '#15803D',
        300: '#16A34A',
        400: '#22C55E',
        500: '#4ADE80',
        600: '#86EFAC',
        700: '#BBF7D0',
        800: '#DCFCE7',
        900: '#F0FDF4',
      },
      secondary: {
        50: '#064E3B',
        100: '#065F46',
        200: '#047857',
        300: '#059669',
        400: '#10B981',
        500: '#34D399',
        600: '#6EE7B7',
        700: '#A7F3D0',
        800: '#D1FAE5',
        900: '#ECFDF5',
      },
      accent: '#10B981',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#9CA3AF',
    },
  },
  purple: {
    name: 'Royal Purple',
    light: {
      primary: {
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#A855F7',
        600: '#9333EA',
        700: '#7E22CE',
        800: '#6B21A8',
        900: '#581C87',
      },
      secondary: {
        50: '#FDF4FF',
        100: '#FAE8FF',
        200: '#F5D0FE',
        300: '#F0ABFC',
        400: '#E879F9',
        500: '#D946EF',
        600: '#C026D3',
        700: '#A21CAF',
        800: '#86198F',
        900: '#701A75',
      },
      accent: '#A855F7',
      background: '#FFFFFF',
      surface: '#FAF5FF',
      text: '#1E1B4B',
      textSecondary: '#64748B',
    },
    dark: {
      primary: {
        50: '#581C87',
        100: '#6B21A8',
        200: '#7E22CE',
        300: '#9333EA',
        400: '#A855F7',
        500: '#C084FC',
        600: '#D8B4FE',
        700: '#E9D5FF',
        800: '#F3E8FF',
        900: '#FAF5FF',
      },
      secondary: {
        50: '#701A75',
        100: '#86198F',
        200: '#A21CAF',
        300: '#C026D3',
        400: '#D946EF',
        500: '#E879F9',
        600: '#F0ABFC',
        700: '#F5D0FE',
        800: '#FAE8FF',
        900: '#FDF4FF',
      },
      accent: '#A855F7',
      background: '#1E1B4B',
      surface: '#312E81',
      text: '#F5F3FF',
      textSecondary: '#C4B5FD',
    },
  },
  rose: {
    name: 'Rose Gold',
    light: {
      primary: {
        50: '#FFF1F2',
        100: '#FFE4E6',
        200: '#FECDD3',
        300: '#FDA4AF',
        400: '#FB7185',
        500: '#F43F5E',
        600: '#E11D48',
        700: '#BE123C',
        800: '#9F1239',
        900: '#881337',
      },
      secondary: {
        50: '#FDF2F8',
        100: '#FCE7F3',
        200: '#FBCFE8',
        300: '#F9A8D4',
        400: '#F472B6',
        500: '#EC4899',
        600: '#DB2777',
        700: '#BE185D',
        800: '#9D174D',
        900: '#831843',
      },
      accent: '#F43F5E',
      background: '#FFFFFF',
      surface: '#FFF1F2',
      text: '#1F2937',
      textSecondary: '#6B7280',
    },
    dark: {
      primary: {
        50: '#881337',
        100: '#9F1239',
        200: '#BE123C',
        300: '#E11D48',
        400: '#F43F5E',
        500: '#FB7185',
        600: '#FDA4AF',
        700: '#FECDD3',
        800: '#FFE4E6',
        900: '#FFF1F2',
      },
      secondary: {
        50: '#831843',
        100: '#9D174D',
        200: '#BE185D',
        300: '#DB2777',
        400: '#EC4899',
        500: '#F472B6',
        600: '#F9A8D4',
        700: '#FBCFE8',
        800: '#FCE7F3',
        900: '#FDF2F8',
      },
      accent: '#F43F5E',
      background: '#18181B',
      surface: '#27272A',
      text: '#FAFAFA',
      textSecondary: '#A1A1AA',
    },
  },
  cyber: {
    name: 'Cyber Dark',
    light: {
      primary: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
        700: '#0F766E',
        800: '#115E59',
        900: '#134E4A',
      },
      secondary: {
        50: '#ECFEFF',
        100: '#CFFAFE',
        200: '#A5F3FC',
        300: '#67E8F9',
        400: '#22D3EE',
        500: '#06B6D4',
        600: '#0891B2',
        700: '#0E7490',
        800: '#155E75',
        900: '#164E63',
      },
      accent: '#00FFF0',
      background: '#FFFFFF',
      surface: '#F0FDFA',
      text: '#0F172A',
      textSecondary: '#475569',
    },
    dark: {
      primary: {
        50: '#134E4A',
        100: '#115E59',
        200: '#0F766E',
        300: '#0D9488',
        400: '#14B8A6',
        500: '#2DD4BF',
        600: '#5EEAD4',
        700: '#99F6E4',
        800: '#CCFBF1',
        900: '#F0FDFA',
      },
      secondary: {
        50: '#164E63',
        100: '#155E75',
        200: '#0E7490',
        300: '#0891B2',
        400: '#06B6D4',
        500: '#22D3EE',
        600: '#67E8F9',
        700: '#A5F3FC',
        800: '#CFFAFE',
        900: '#ECFEFF',
      },
      accent: '#00FFF0',
      background: '#020617',
      surface: '#0F172A',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
    },
  },
};

const applyTheme = (themeName, mode) => {
  const theme = themes[themeName][mode];
  const root = document.documentElement;

  // Apply primary colors
  Object.entries(theme.primary).forEach(([key, value]) => {
    root.style.setProperty(`--color-primary-${key}`, value);
  });

  // Apply secondary colors
  Object.entries(theme.secondary).forEach(([key, value]) => {
    root.style.setProperty(`--color-secondary-${key}`, value);
  });

  // Apply other colors
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-text-secondary', theme.textSecondary);
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'ocean',
      mode: 'light',
      themes: Object.keys(themes),
      setTheme: (themeName) => {
        set({ theme: themeName });
        applyTheme(themeName, get().mode);
      },
      setMode: (mode) => {
        set({ mode });
        applyTheme(get().theme, mode);
      },
      toggleMode: () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        set({ mode: newMode });
        applyTheme(get().theme, newMode);
      },
      getThemeInfo: (themeName) => themes[themeName],
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme, state.mode);
        }
      },
    }
  )
);
