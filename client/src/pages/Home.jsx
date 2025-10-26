import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Briefcase, Users, Award, Calendar, Sparkles, Zap, Rocket, Code2 } from 'lucide-react';
import ThreeJSBackground from '../components/3d/ThreeJSBackground';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { projectService } from '../services/projectService';
import { profileService } from '../services/profileService';
import { skillService } from '../services/skillService';
import { useLanguageStore } from '../store/languageStore';
import SkillCard from '../components/skills/SkillCard';

const Home = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [profileData, projectsData, skillsData] = await Promise.all([
        profileService.get(),
        projectService.getAll({ featured: true }),
        skillService.getAll(),
      ]);
      setProfile(profileData);
      setFeaturedProjects(projectsData.slice(0, 3));
      setSkills(skillsData.slice(0, 8));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const stats = [
    { icon: Calendar, label: t('about.experience'), value: profile?.stats?.yearsOfExperience || 0 },
    { icon: Briefcase, label: t('about.projects'), value: profile?.stats?.projectsCompleted || 0 },
    { icon: Users, label: t('about.clients'), value: profile?.stats?.happyClients || 0 },
    { icon: Award, label: t('about.awards'), value: profile?.stats?.awards || 0 },
  ];

  // Show skeleton loader while fetching profile data
  if (isLoading) {
    return (
      <div className="min-h-screen pb-0 md:pb-0">
        {/* Hero Section Skeleton */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
          {/* 3D Background */}
          <div className="absolute inset-0 -z-10 opacity-60">
            <ThreeJSBackground />
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/10 via-transparent to-accent/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="container-custom relative z-10">
            <div className="flex items-center justify-center">
              <div className="space-y-8 max-w-4xl text-center">
                {/* Badge Skeleton */}
                <div className="flex justify-center">
                  <div className="h-10 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-full" />
                </div>

                {/* Title Skeleton */}
                <div className="h-20 md:h-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg w-3/4 mx-auto" />

                {/* Subtitle Skeleton */}
                <div className="h-16 md:h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg w-2/3 mx-auto" />

                {/* Description Skeleton */}
                <div className="space-y-3 max-w-2xl mx-auto">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-5/6 mx-auto" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
                  <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded-lg w-16 mx-auto" />
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-surface dark:via-primary-500/20 dark:to-surface animate-pulse rounded w-24 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-0 md:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 opacity-60">
          <ThreeJSBackground />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/10 via-transparent to-accent/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container-custom relative z-10">
          <div className="flex items-center justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 max-w-4xl text-center"
            >
              {/* Floating Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-500">{t('hero.greeting')}</span>
              </motion.div>

              {/* Main Title with Glow */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl font-bold tracking-tight"
              >
                <span className="inline-block">{profile?.name?.[language] || profile?.name?.en || 'Your Name'}</span>
              </motion.h1>

              {/* Animated Subtitle */}
              <motion.div variants={itemVariants} className="relative">
                <h2 className="text-4xl md:text-6xl font-display font-bold">
                  <span className="text-gradient inline-block py-2">{t('hero.title')}</span>
                </h2>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-accent/20 blur-2xl -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex gap-4 flex-wrap justify-center pt-4">
                <Link to="/projects">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      icon={<Rocket size={20} />}
                      className="shadow-lg shadow-primary-500/50 hover:shadow-xl hover:shadow-primary-500/60"
                    >
                      {t('hero.cta')}
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="backdrop-blur-sm bg-surface/50 hover:bg-primary-500 border-2"
                    >
                      {t('hero.contact')}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 cursor-pointer py-2 "
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => {
            const statsSection = document.querySelector('#projects-section');
            if (statsSection) {
              statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-10 border-2 border-primary-500/50 rounded-full flex justify-center hover:border-primary-500 transition-colors">
            <motion.div
              className="w-1.5 h-3 bg-primary-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      

      {/* Featured Projects Section */}
      <section className="py-20 relative" id='projects-section'>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-primary-500 mx-auto" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">{t('projects.featured')}</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{t('projects.subtitle')}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div key={project._id} variants={itemVariants}>
                <Link to={`/projects/${project._id}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="relative group h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Card className="h-full overflow-hidden relative bg-surface/90 backdrop-blur-sm border-primary-500/20 hover:border-primary-500/50">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <motion.img
                          src={project.image}
                          alt={project.title.en}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">{project.title.en}</h3>
                      <p className="text-text-secondary mb-4 line-clamp-2">{project.shortDescription.en}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * techIndex }}
                            className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 text-primary-500 rounded-full text-sm font-medium backdrop-blur-sm"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <motion.div
                        className="absolute top-4 right-4 bg-primary-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/projects">
              <Button variant="outline" size="lg" icon={<ArrowRight size={20} />}>
                {t('projects.allProjects')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-b from-surface to-background relative overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className=" relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-8 h-8 text-primary-500 mx-auto" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">{t('skills.title')}</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{t('skills.subtitle')}</p>
          </motion.div>

          {/* Infinite Scrolling Skills - Row 1 (Left to Right) */}
          <div className="overflow-x-hidden overflow-y-visible mb-1 py-8">
            <motion.div
              className="flex gap-6"
              animate={{
                x: isRTL ? [0, 1920] : [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...skills, ...skills, ...skills].map((skill, index) => (
                <SkillCard 
                  key={`row1-${index}`}
                  skill={skill} 
                  index={index} 
                  rowType="primary" 
                />
              ))}
            </motion.div>
          </div>

          {/* Infinite Scrolling Skills - Row 2 (Right to Left) */}
          <div className="overflow-x-hidden overflow-y-visible mb-1 py-8">
            <motion.div
              className="flex gap-6"
              animate={{
                x: isRTL ? [1920, 0] : [-1920, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {[...skills, ...skills, ...skills].map((skill, index) => (
                <SkillCard 
                  key={`row2-${index}`}
                  skill={skill} 
                  index={index} 
                  rowType="accent" 
                />
              ))}
            </motion.div>
          </div>

          {/* Infinite Scrolling Skills - Row 3 (Left to Right - Faster) */}
          <div className="overflow-x-hidden overflow-y-visible py-8">
            <motion.div
              className="flex gap-6"
              animate={{
                x: isRTL ? [0, 1920] : [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...skills, ...skills, ...skills].map((skill, index) => (
                <SkillCard 
                  key={`row3-${index}`}
                  skill={skill} 
                  index={index} 
                  rowType="premium" 
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
