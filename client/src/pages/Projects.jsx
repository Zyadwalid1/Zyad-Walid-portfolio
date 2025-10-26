import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Github } from 'lucide-react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Loading from '../components/common/Loading';
import { projectService } from '../services/projectService';
import { useLanguageStore } from '../store/languageStore';
import api from '../utils/api';

const Projects = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedCategory, language]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => 
        p.categories?.some(cat => cat._id === selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
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
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t('projects.title')}</h1>
          <p className="text-xl text-text-secondary">{t('projects.subtitle')}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t('admin.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all
                ${
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface text-text hover:bg-primary-100 dark:hover:bg-primary-900'
                }
              `}
            >
              {t('projects.category.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                style={{
                  backgroundColor: selectedCategory === category._id ? category.color : undefined,
                  color: selectedCategory === category._id ? 'white' : undefined,
                }}
                className={`
                  px-6 py-2 rounded-lg font-medium transition-all
                  ${
                    selectedCategory === category._id
                      ? ''
                      : 'bg-surface text-text hover:bg-primary-100 dark:hover:bg-primary-900'
                  }
                `}
              >
                {category.name[language]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-text-secondary">No projects found.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project._id} variants={itemVariants}>
                <Card className="h-full flex flex-col">
                  <Link to={`/projects/${project._id}`}>
                    <img
                      src={project.image}
                      alt={project.title.en}
                      className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform"
                    />
                  </Link>
                  <h3 className="text-2xl font-bold mb-2">{project.title[language]}</h3>
                  <p className="text-text-secondary mb-4 flex-1">{project.shortDescription[language]}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-500 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        <ExternalLink size={16} />
                        {t('projects.viewProject')}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-surface border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
