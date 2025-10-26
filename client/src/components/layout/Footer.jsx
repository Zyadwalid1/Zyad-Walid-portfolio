import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp, Code2, Sparkles, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Zyadwalid1', label: 'GitHub', color: 'hover:bg-[#333] dark:hover:bg-[#24292e]' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/zyad-walid', label: 'LinkedIn', color: 'hover:bg-[#0077b5]' },
    { icon: Facebook, href: 'https://www.facebook.com/zyad.walid.zezo/', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
    { icon: Instagram, href: 'https://www.instagram.com/zyad_walid18/', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
    { icon: Mail, href: 'mailto:your@email.com', label: 'Email', color: 'hover:bg-primary-500' },
  ];

  const footerLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-surface mt-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-8 h-8 text-primary-500" />
                  <h3 className="text-3xl font-bold text-gradient">Portfolio</h3>
                </div>
                <p className="text-text-secondary text-lg mb-6 max-w-md">
                  {t('hero.subtitle')}
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 text-text flex items-center gap-2">
                <div className="w-1 h-6 bg-primary-500 rounded-full" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-text-secondary hover:text-primary-500 transition-all hover:translate-x-1 inline-block group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6 text-text flex items-center gap-2">
                <div className="w-1 h-6 bg-primary-500 rounded-full" />
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      group relative p-3 rounded-xl 
                      bg-surface border-2 border-primary-500/20
                      hover:border-transparent
                      ${social.color}
                      transition-all duration-300
                      hover:shadow-lg hover:shadow-primary-500/20
                    `}
                    aria-label={social.label}
                  >
                    <social.icon 
                      size={20} 
                      className="text-text-secondary group-hover:text-white transition-colors relative z-10" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/20 group-hover:to-accent/20 rounded-xl transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-500/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-text-secondary text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {currentYear} Portfolio. {t('footer.rights')}.
              <span className="flex items-center gap-1">
                {t('footer.madeWith')} 
                <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
              </span>
            </motion.p>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2 px-4 py-2 
                bg-primary-500/10 hover:bg-primary-500 
                text-primary-500 hover:text-white
                rounded-lg border border-primary-500/20
                transition-all duration-300
                group
              "
            >
              <span className="text-sm font-medium">Back to Top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent to-primary-500" />
    </footer>
  );
};

export default Footer;
