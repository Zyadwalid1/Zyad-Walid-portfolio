import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Code,
  User,
  Mail,
  Calendar,
  GraduationCap,
  Award,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Folder,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useLanguageStore } from '../../store/languageStore';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { mode, toggleMode } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin/categories', label: 'Categories', icon: Folder },
    { path: '/admin/skills', label: 'Skills', icon: Code },
    { path: '/admin/experience', label: 'Experience', icon: Calendar },
    { path: '/admin/education', label: 'Education', icon: GraduationCap },
    { path: '/admin/courses', label: 'Courses', icon: Award },
    { path: '/admin/profile', label: 'Profile', icon: User },
    { path: '/admin/messages', label: 'Messages', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-primary-100 dark:border-primary-900 z-30">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-xl font-bold text-gradient">
              Portfolio Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMode}
              className="p-2 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors"
            >
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors flex items-center gap-2"
            >
              <Globe size={20} />
              <span className="text-sm">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              />
            )}

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-16 bottom-0 w-64 bg-surface border-r border-primary-100 dark:border-primary-900 z-30 overflow-y-auto"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                          isActive
                            ? 'bg-primary-500 text-white'
                            : 'text-text hover:bg-primary-100 dark:hover:bg-primary-900'
                        }
                      `}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 mt-16 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
