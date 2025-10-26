import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { contactService } from '../services/contactService';
import { profileService } from '../services/profileService';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setPageLoading(true);
      const data = await profileService.get();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await contactService.send(formData);
      toast.success(t('contact.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(t('contact.error'));
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'your@email.com',
      href: `mailto:${profile?.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile?.phone?.[currentLang] || profile?.phone?.en || '+1 234 567 890',
      href: `tel:${profile?.phone?.[currentLang] || profile?.phone?.en}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile?.location?.[currentLang] || profile?.location?.en || 'Your Location',
    },
  ];

  // Show skeleton while loading profile data
  if (pageLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg w-64 mx-auto mb-4" />
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form Skeleton */}
            <div className="bg-surface rounded-xl p-8 border border-primary-500/10 space-y-6">
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-20" />
                <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-20" />
                <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-20" />
                <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-20" />
                <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
              </div>
              <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
            </div>

            {/* Contact Info Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface rounded-xl p-6 border border-primary-500/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-24" />
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-40" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-text-secondary">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label={t('contact.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.name')}
                />
                <Input
                  label={t('contact.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.email')}
                />
                <Input
                  label={t('contact.subject')}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.subject')}
                />
                <Textarea
                  label={t('contact.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.message')}
                  rows={6}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  icon={<Send size={20} />}
                  className="w-full"
                >
                  {loading ? t('contact.sending') : t('contact.send')}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                      <info.icon className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{info.label}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-text-secondary hover:text-primary-500 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{info.value}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Social Links */}
            {profile?.social && (
              <Card>
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(profile.social).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-black transition-colors capitalize"
                      >
                        {platform}
                      </a>
                    );
                  })}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
