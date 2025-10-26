import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, Briefcase, User, Mail, Settings, Sun, Moon, Globe } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useLanguageStore } from '../../store/languageStore';

const MobileBottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const { mode, theme, themes, setTheme, toggleMode, getThemeInfo } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();

  // Close settings when route changes
  useEffect(() => {
    setShowSettings(false);
  }, [location.pathname]);

  // Close settings on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showSettings) {
        setShowSettings(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSettings]);

  const themeColors = {
    ocean: {
      primary: '#0087FF',
      secondary: '#00D9FF',
      gradient: 'linear-gradient(135deg, #0087FF 0%, #00D9FF 100%)'
    },
    sunset: {
      primary: '#F97316',
      secondary: '#FF6B00', 
      gradient: 'linear-gradient(135deg, #F97316 0%, #FF6B00 100%)'
    },
    forest: {
      primary: '#22C55E',
      secondary: '#10B981',
      gradient: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)'
    },
    purple: {
      primary: '#A855F7',
      secondary: '#D946EF',
      gradient: 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)'
    },
    rose: {
      primary: '#F43F5E',
      secondary: '#EC4899',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)'
    },
    cyber: {
      primary: '#14B8A6',
      secondary: '#00FFF0',
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #00FFF0 100%)'
    }
  };

  const navItems = [
    { 
      path: '/', 
      label: t('nav.home'), 
      icon: Home,
      id: 'home'
    },
    { 
      path: '/projects', 
      label: t('nav.projects'), 
      icon: Briefcase,
      id: 'projects'
    },
    { 
      path: '/about', 
      label: t('nav.about'), 
      icon: User,
      id: 'about'
    },
    { 
      path: '/contact', 
      label: t('nav.contact'), 
      icon: Mail,
      id: 'contact'
    },
    { 
      path: null, 
      label: 'Settings', 
      icon: Settings,
      id: 'settings',
      action: () => setShowSettings(!showSettings)
    },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative"
      >
        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 left-0 bg-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary-500/20 p-4 mb-2 max-h-[70vh] overflow-y-auto"
            >
              <h3 className="text-sm font-semibold text-text mb-3">Settings</h3>
              
              {/* Dark/Light Mode Toggle */}
              <div className="mb-4">
                <p className="text-xs text-text-secondary mb-2">Mode</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => mode === 'dark' && toggleMode()}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                      mode === 'light' 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-surface border border-primary-500/20 text-text-secondary'
                    }`}
                  >
                    <Sun size={18} />
                    <span className="text-xs font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => mode === 'light' && toggleMode()}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                      mode === 'dark' 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-surface border border-primary-500/20 text-text-secondary'
                    }`}
                  >
                    <Moon size={18} />
                    <span className="text-xs font-medium">Dark</span>
                  </button>
                </div>
              </div>

              {/* Theme Colors */}
              <div className="mb-4">
                <p className="text-xs text-text-secondary mb-2">Theme Color</p>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((themeName) => {
                    const themeInfo = getThemeInfo(themeName);
                    const colors = themeColors[themeName];
                    return (
                      <motion.button
                        key={themeName}
                        onClick={() => setTheme(themeName)}
                        className={`
                          p-3 rounded-xl transition-all relative overflow-hidden
                          ${theme === themeName 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-surface shadow-lg scale-105' 
                            : 'hover:scale-105'
                          }
                        `}
                        style={{ 
                          background: colors.gradient,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-xs drop-shadow-sm">
                            {themeInfo.name}
                          </span>
                          {theme === themeName && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center"
                            >
                              <div className="w-2 h-2 bg-current rounded-full" style={{ color: colors.primary }} />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              
              {/* Language Toggle */}
              <div>
                <p className="text-xs text-text-secondary mb-2">Language</p>
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 transition-colors text-text"
                >
                  <Globe size={20} />
                  <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation Bar */}
        <div className="bg-surface/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-primary-500/20 px-2 py-3">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = item.path ? location.pathname === item.path : showSettings;
              const Icon = item.icon;
              
              const content = (
                <>
                  <motion.div
                    className={`p-2 transition-all ${
                      isActive ? 'text-primary-500' : 'text-text-secondary'
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={22} />
                  </motion.div>
                  
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isActive 
                        ? 'text-primary-500 font-semibold' 
                        : 'text-text-secondary'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              );

              if (item.path) {
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex flex-col items-center justify-center gap-1 flex-1"
                  >
                    {content}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="flex flex-col items-center justify-center gap-1 flex-1"
                  >
                    {content}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileBottomNav;
