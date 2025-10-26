import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { projectService } from '../services/projectService';

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await projectService.getById(id);
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;
  if (!project) return <div className="min-h-screen pt-32 text-center">Project not found</div>;

  const allImages = [project.image, ...(project.images || [])];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/projects">
            <Button variant="ghost" icon={<ArrowLeft size={20} />}>
              {currentLang === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}
            </Button>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${
              project.status === 'completed' ? 'bg-green-100 text-green-700' :
              project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {project.status}
            </span>
            <span className="px-4 py-1 bg-primary-100 dark:bg-primary-900 text-primary-500 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title?.[currentLang] || project.title?.en}</h1>
          <p className="text-xl text-text-secondary">{project.shortDescription?.[currentLang] || project.shortDescription?.en}</p>

          <div className="flex gap-4 mt-6">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button icon={<ExternalLink size={20} />}>
                  {t('projects.viewProject')}
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" icon={<Github size={20} />}>
                  {t('projects.viewCode')}
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-4 bg-surface rounded-xl p-4">
            <img
              src={allImages[selectedImage]}
              alt={project.title?.[currentLang] || project.title?.en}
              className="w-full h-[500px] object-contain rounded-xl"
            />
          </div>
          
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    relative rounded-lg overflow-hidden border-2 transition-all
                    ${selectedImage === index ? 'border-primary-500 scale-105' : 'border-transparent'}
                  `}
                >
                  <img
                    src={image}
                    alt={`${project.title?.[currentLang] || project.title?.en} ${index + 1}`}
                    className="w-full h-20 object-contain bg-surface"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <h2 className="text-3xl font-bold mb-4">{currentLang === 'ar' ? 'حول هذا المشروع' : 'About This Project'}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-text-secondary whitespace-pre-line">{project.description?.[currentLang] || project.description?.en}</p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Technologies */}
            <div className="bg-surface rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{currentLang === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-500 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-surface rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{currentLang === 'ar' ? 'معلومات المشروع' : 'Project Info'}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-text-secondary text-sm mb-1">{currentLang === 'ar' ? 'الفئة' : 'Category'}</p>
                  <p className="font-semibold">
                    {project.categories && project.categories.length > 0 
                      ? project.categories.map(cat => cat.name?.[currentLang] || cat.name?.en).join(', ')
                      : project.category}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">{currentLang === 'ar' ? 'الحالة' : 'Status'}</p>
                  <p className="font-semibold capitalize">{project.status}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
