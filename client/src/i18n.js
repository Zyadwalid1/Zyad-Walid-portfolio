import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact',
      },
      hero: {
        greeting: 'Hi, I am',
        title: 'Full-Stack Developer',
        subtitle: 'I build amazing digital experiences',
        cta: 'View My Work',
        contact: 'Get In Touch',
      },
      about: {
        title: 'About Me',
        experience: 'Years Experience',
        projects: 'Projects Completed',
        clients: 'Happy Clients',
        awards: 'Awards Won',
      },
      projects: {
        title: 'My Projects',
        subtitle: 'Check out my latest work',
        viewProject: 'View Project',
        viewCode: 'View Code',
        allProjects: 'All Projects',
        featured: 'Featured Projects',
        category: {
          all: 'All',
          web: 'Web',
          mobile: 'Mobile',
          desktop: 'Desktop',
          other: 'Other',
        },
      },
      skills: {
        title: 'Skills & Technologies',
        subtitle: 'Technologies I work with',
      },
      courses: {
        title: 'Courses & Certifications',
        viewCertificate: 'View Certificate',
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Let\'s work together',
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Failed to send message. Please try again.',
      },
      footer: {
        rights: 'All rights reserved',
        madeWith: 'Made with',
        by: 'by',
      },
      admin: {
        login: 'Admin Login',
        dashboard: 'Dashboard',
        logout: 'Logout',
        email: 'Email',
        password: 'Password',
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add New',
        search: 'Search',
        filter: 'Filter',
        actions: 'Actions',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        projects: 'المشاريع',
        about: 'عني',
        contact: 'تواصل',
      },
      hero: {
        greeting: 'مرحباً، أنا',
        title: 'مطور ويب متكامل',
        subtitle: 'أبني تجارب رقمية مذهلة',
        cta: 'شاهد أعمالي',
        contact: 'تواصل معي',
      },
      about: {
        title: 'نبذة عني',
        experience: 'سنوات الخبرة',
        projects: 'مشاريع مكتملة',
        clients: 'عملاء سعداء',
        awards: 'جوائز',
      },
      projects: {
        title: 'مشاريعي',
        subtitle: 'تحقق من أحدث أعمالي',
        viewProject: 'عرض المشروع',
        viewCode: 'عرض الكود',
        allProjects: 'جميع المشاريع',
        featured: 'المشاريع المميزة',
        category: {
          all: 'الكل',
          web: 'ويب',
          mobile: 'موبايل',
          desktop: 'سطح المكتب',
          other: 'أخرى',
        },
      },
      skills: {
        title: 'المهارات والتقنيات',
        subtitle: 'التقنيات التي أعمل بها',
      },
      courses: {
        title: 'الدورات والشهادات',
        viewCertificate: 'عرض الشهادة',
      },
      contact: {
        title: 'تواصل معي',
        subtitle: 'لنعمل معاً',
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال الرسالة بنجاح!',
        error: 'فشل إرسال الرسالة. حاول مرة أخرى.',
      },
      footer: {
        rights: 'جميع الحقوق محفوظة',
        madeWith: 'صنع بـ',
        by: 'بواسطة',
      },
      admin: {
        login: 'تسجيل دخول المسؤول',
        dashboard: 'لوحة التحكم',
        logout: 'تسجيل خروج',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        submit: 'إرسال',
        cancel: 'إلغاء',
        save: 'حفظ',
        delete: 'حذف',
        edit: 'تعديل',
        add: 'إضافة جديد',
        search: 'بحث',
        filter: 'تصفية',
        actions: 'إجراءات',
      },
    },
  },
};

// Get persisted language from localStorage (same key as Zustand store)
const getPersistedLanguage = () => {
  try {
    const stored = localStorage.getItem('language-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.language || 'en';
    }
  } catch (error) {
    console.error('Error reading language from localStorage:', error);
  }
  return 'en';
};

const initialLanguage = getPersistedLanguage();

// Set initial direction and lang attribute
document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = initialLanguage;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage, // Use persisted language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
