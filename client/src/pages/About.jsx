import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, X } from 'lucide-react';
import ThreeJSBackground from '../components/3d/ThreeJSBackground';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import { profileService } from '../services/profileService';
import { experienceService } from '../services/experienceService';
import { educationService } from '../services/educationService';
import { skillService } from '../services/skillService';
import { courseService } from '../services/courseService';

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';
  const [profile, setProfile] = useState(null);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileData, experienceData, educationData, coursesData, skillsData] = await Promise.all([
        profileService.get(),
        experienceService.getAll(),
        educationService.getAll(),
        courseService.getAll(),
        skillService.getAll(),
      ]);
      setProfile(profileData);
      setExperience(experienceData);
      setEducation(educationData);
      setCourses(coursesData);
      setSkills(skillsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t('about.title')}</h1>
        </motion.div>

        {/* Profile Section */}
        <div key={currentLang} className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} gap-12 items-center mb-20 sm:justify-center`}>
          {/* 3D Background */}
          <motion.div
            key={`3d-${currentLang}`}
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-[400px] w-full md:w-1/2 relative hidden md:block"
          >
            <ThreeJSBackground />
          </motion.div>

          {/* Content */}
          <motion.div
            key={`content-${currentLang}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 space-y-6"
          >
            {profile?.avatar && (
              <div className={`flex justify-center ${isRTL ? 'md:justify-start' : 'md:justify-start'} mb-6`}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-40 h-40 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary-500 shadow-xl"
                />
              </div>
            )}
            <h2 className={`text-4xl font-bold text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>{profile?.name?.[currentLang] || profile?.name?.en}</h2>
            <p className={`text-2xl text-primary-500 font-display text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>{profile?.title?.[currentLang] || profile?.title?.en}</p>
            <p className={`text-lg text-text-secondary whitespace-pre-line text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>{profile?.bio?.[currentLang] || profile?.bio?.en}</p>
            {profile?.resumeUrl && (
              <div className={`flex justify-center ${isRTL ? 'md:justify-start' : 'md:justify-start'}`}>
                <a href={profile.resumeUrl} download>
                  <Button icon={<Download size={20} />}>Download Resume</Button>
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Experience Section */}
        {experience.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-primary-500" size={32} />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp) => (
                <motion.div key={exp._id} variants={itemVariants}>
                  <Card>
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Certification Image */}
                      {exp.certificationImage && (
                        <div className="flex-shrink-0">
                          <img
                            src={exp.certificationImage}
                            alt={`${exp.company} certification`}
                            className="w-full md:w-32 h-auto md:h-32 object-contain rounded-lg border-2 border-primary-500/20 bg-surface p-2"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <div>
                            <h3 className="text-xl font-bold">{exp.title?.[currentLang] || exp.title?.en}</h3>
                            <p className="text-primary-500 font-medium">{exp.company}</p>
                          </div>
                          <span className="text-text-secondary text-sm md:text-base whitespace-nowrap">
                            {new Date(exp.startDate).getFullYear()} -{' '}
                            {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()}
                          </span>
                        </div>
                        {exp.location?.[currentLang] && (
                          <p className="text-text-secondary mb-3 text-sm">{exp.location[currentLang]}</p>
                        )}
                        <p className="text-text-secondary text-sm md:text-base">{exp.description?.[currentLang] || exp.description?.en}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary-500" size={32} />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <motion.div key={edu._id} variants={itemVariants}>
                  <Card>
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Certification Image */}
                      {edu.certificationImage && (
                        <div className="flex-shrink-0">
                          <img
                            src={edu.certificationImage}
                            alt={`${edu.institution?.[currentLang] || edu.institution?.en} certification`}
                            className="w-full md:w-32 h-auto md:h-32 object-contain rounded-lg border-2 border-primary-500/20 bg-surface p-2"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <div>
                            <h3 className="text-xl font-bold">{edu.degree?.[currentLang] || edu.degree?.en}</h3>
                            <p className="text-primary-500 font-medium">{edu.institution?.[currentLang] || edu.institution?.en}</p>
                          </div>
                          <span className="text-text-secondary text-sm md:text-base whitespace-nowrap">
                            {new Date(edu.startDate).getFullYear()} -{' '}
                            {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                          </span>
                        </div>
                        {edu.location?.[currentLang] && (
                          <p className="text-text-secondary mb-3 text-sm">{edu.location[currentLang]}</p>
                        )}
                        {edu.grade && (
                          <p className="text-text-secondary mb-2 text-sm md:text-base">Grade: {edu.grade}</p>
                        )}
                        {edu.description?.[currentLang] && (
                          <p className="text-text-secondary text-sm md:text-base">{edu.description[currentLang]}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Courses Section */}
        {courses.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-primary-500" size={32} />
              <h2 className="text-3xl font-bold">{t('courses.title')}</h2>
            </div>
            <div className="space-y-6">
              {courses.map((course) => (
                <motion.div key={course._id} variants={itemVariants}>
                  <Card>
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Certificate Image */}
                      {course.certificateImage && (
                        <div className="flex-shrink-0">
                          <img
                            src={course.certificateImage}
                            alt={`${course.name?.[currentLang] || course.name?.en} certificate`}
                            className="w-full md:w-32 h-auto md:h-32 object-contain rounded-lg border-2 border-primary-500/20 bg-surface p-2 cursor-pointer hover:border-primary-500 transition-colors"
                            onClick={() => setSelectedCertificate(course.certificateImage)}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <div>
                            <h3 className="text-xl font-bold">{course.name?.[currentLang] || course.name?.en}</h3>
                            <p className="text-primary-500 font-medium">{course.company}</p>
                          </div>
                          <span className="text-text-secondary text-sm md:text-base whitespace-nowrap">
                            {new Date(course.date).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            })}
                          </span>
                        </div>
                        {course.location?.[currentLang] && (
                          <p className="text-text-secondary mb-3 text-sm">{course.location[currentLang]}</p>
                        )}
                        {course.description?.[currentLang] && (
                          <p className="text-text-secondary text-sm md:text-base mb-3">{course.description[currentLang]}</p>
                        )}
                        {course.certificateUrl && (
                          <a 
                            href={course.certificateUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:underline text-sm inline-flex items-center gap-1"
                          >
                            {t('courses.viewCertificate')} →
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">{t('skills.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <motion.div key={skill._id} variants={itemVariants}>
                <Card className="text-center">
                  {skill.icon ? (
                    <img 
                      src={skill.icon} 
                      alt={skill.name?.[currentLang] || skill.name?.en}
                      className="w-16 h-16 mx-auto mb-3 object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/64?text=No+Icon';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-2xl">🚀</div>
                  )}
                  <h3 className="font-semibold mb-3">{skill.name?.[currentLang] || skill.name?.en}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Certificate Image Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="certificate-modal fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <button
            onClick={() => setSelectedCertificate(null)}
            className="absolute top-4 right-4 p-2 bg-surface rounded-full hover:bg-primary-500 transition-colors z-10"
          >
            <X size={24} />
          </button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedCertificate}
            alt="Certificate"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
};

export default About;
