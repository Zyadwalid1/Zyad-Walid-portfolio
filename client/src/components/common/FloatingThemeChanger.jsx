import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const FloatingThemeChanger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, theme, themes, setTheme, toggleMode, getThemeInfo } = useThemeStore();

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

  return (
    <div className="hidden md:block fixed right-6 bottom-6 z-50">
      {/* Theme Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-surface/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-primary-500/30 min-w-[280px] modal"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-text mb-3">Choose Theme</h3>
              
              {/* Dark/Light Mode Toggle */}
              <div className="flex items-center justify-center">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 flex items-center">
                  <button
                    onClick={toggleMode}
                    className={`p-2 rounded-full transition-all ${
                      mode === 'light' 
                        ? 'bg-white shadow-md text-primary-500' 
                        : 'text-text-secondary hover:text-text'
                    }`}
                    title="Light Mode"
                  >
                    <Sun size={18} />
                  </button>
                  <button
                    onClick={toggleMode}
                    className={`p-2 rounded-full transition-all ${
                      mode === 'dark' 
                        ? 'bg-primary-800 shadow-md text-primary-300' 
                        : 'text-text-secondary hover:text-text'
                    }`}
                    title="Dark Mode"
                  >
                    <Moon size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Theme Colors */}
            <div className="space-y-3">
              {themes.map((themeName) => {
                const themeInfo = getThemeInfo(themeName);
                const colors = themeColors[themeName];
                return (
                  <motion.button
                    key={themeName}
                    onClick={() => setTheme(themeName)}
                    className={`
                      w-full p-4 rounded-2xl transition-all relative overflow-hidden group
                      ${theme === themeName 
                        ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-surface shadow-lg' 
                        : 'hover:shadow-md border border-primary-200/30 dark:border-primary-800/30'
                      }
                    `}
                    style={{ 
                      background: colors.gradient,
                    }}
                    title={themeInfo.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Color Preview */}
                        <div className="flex gap-1">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white/50"
                            style={{ backgroundColor: colors.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white/50"
                            style={{ backgroundColor: colors.secondary }}
                          />
                        </div>
                        
                        {/* Theme Name */}
                        <span className="text-white font-medium text-sm drop-shadow-sm">
                          {themeInfo.name}
                        </span>
                      </div>
                      
                      {/* Selected Indicator */}
                      {theme === themeName && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
                        >
                          <div className="w-2 h-2 bg-current rounded-full" style={{ color: colors.primary }} />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          background: isOpen ? themeColors[theme].gradient : undefined
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <Palette size={24} />
      </motion.button>
    </div>
  );
};

export default FloatingThemeChanger;
