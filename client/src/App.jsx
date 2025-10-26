import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/themeStore';
import { useLanguageStore } from './store/languageStore';
import { useLanguageInit } from './hooks/useLanguageInit';

// Public pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSkills from './pages/admin/AdminSkills';
import AdminProfile from './pages/admin/AdminProfile';
import AdminMessages from './pages/admin/AdminMessages';
import AdminExperience from './pages/admin/AdminExperience';
import AdminEducation from './pages/admin/AdminEducation';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCourses from './pages/admin/AdminCourses';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingThemeChanger from './components/common/FloatingThemeChanger';
import CustomCursor from './components/cursor/CustomCursor';
import CursorEffects from './components/cursor/CursorEffects';
import ChatBot from './components/chatbot/ChatBot';
import './styles/cursor.css';

function App() {
  const { theme, mode } = useThemeStore();
  
  // Initialize language properly (handles persistence and i18n sync)
  useLanguageInit();
  const { language } = useLanguageStore();

  useEffect(() => {
    // Apply theme
    document.documentElement.className = mode;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply language direction (also handled in useLanguageInit, but kept for reactivity)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [theme, mode, language]);

  return (
    <>
      <CustomCursor />
      <CursorEffects />
      <ChatBot />
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-primary-500)',
          },
        }}
      />
      
      <Routes>
        {/* Public routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
              <MobileBottomNav />
              <FloatingThemeChanger />
            </>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/projects" element={<AdminProjects />} />
                <Route path="/categories" element={<AdminCategories />} />
                <Route path="/skills" element={<AdminSkills />} />
                <Route path="/profile" element={<AdminProfile />} />
                <Route path="/messages" element={<AdminMessages />} />
                <Route path="/experience" element={<AdminExperience />} />
                <Route path="/education" element={<AdminEducation />} />
                <Route path="/courses" element={<AdminCourses />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
