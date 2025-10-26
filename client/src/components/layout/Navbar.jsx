import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useLanguageStore } from '../../store/languageStore';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode, toggleMode } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300 hidden md:block
        ${scrolled ? 'bg-surface/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            Zyad.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative py-2 transition-colors
                  ${location.pathname === link.path ? 'text-primary-500' : 'text-text hover:text-primary-500'}
                `}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleMode}
              className="p-2 hover:bg-primary-500/10 rounded-lg transition-all text-text hover:text-primary-500 border border-transparent hover:border-primary-500/30"
              title={mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-primary-500/10 rounded-lg transition-all flex items-center gap-2 text-text hover:text-primary-500 border border-transparent hover:border-primary-500/30"
              title="Change Language"
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-primary-500/10 rounded-lg transition-all text-text hover:text-primary-500 border border-transparent hover:border-primary-500/30"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-lg"
          >
            <div className="container-custom py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block py-2 transition-colors
                    ${location.pathname === link.path ? 'text-primary-500' : 'text-text'}
                  `}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-3 pt-4 border-t border-primary-500/30">
                <button
                  onClick={toggleMode}
                  className="p-2 hover:bg-primary-500/10 rounded-lg transition-all text-text hover:text-primary-500 border border-transparent hover:border-primary-500/30"
                >
                  {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="p-2 hover:bg-primary-500/10 rounded-lg transition-all flex items-center gap-2 text-text hover:text-primary-500 border border-transparent hover:border-primary-500/30"
                >
                  <Globe size={20} />
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
