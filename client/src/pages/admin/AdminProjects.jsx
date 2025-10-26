import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Loading from '../../components/common/Loading';
import { projectService } from '../../services/projectService';
import api from '../../utils/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    shortDescription: { en: '', ar: '' },
    image: '',
    technologies: '',
    categories: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'completed',
  });

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/admin/all');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        shortDescription: project.shortDescription,
        image: project.image || '',
        technologies: project.technologies.join(', '),
        categories: project.categories?.map(cat => cat._id) || [],
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured,
        status: project.status,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: { en: '', ar: '' },
        description: { en: '', ar: '' },
        shortDescription: { en: '', ar: '' },
        image: '',
        technologies: '',
        categories: [],
        liveUrl: '',
        githubUrl: '',
        featured: false,
        status: 'completed',
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        technologies: formData.technologies.split(',').map((tech) => tech.trim()),
      };

      if (editingProject) {
        await projectService.update(editingProject._id, submitData);
        toast.success('Project updated successfully');
      } else {
        await projectService.create(submitData);
        toast.success('Project created successfully');
      }
      
      handleCloseModal();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectService.delete(id);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <AdminLayout><Loading /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-text-secondary">Manage your portfolio projects</p>
          </div>
          <Button icon={<Plus size={20} />} onClick={() => handleOpenModal()}>
            Add Project
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <img
                  src={project.image}
                  alt={project.title.en}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{project.title.en}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {project.shortDescription.en}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                      Featured
                    </span>
                  )}
                  {project.categories && project.categories.length > 0 ? (
                    project.categories.map((cat) => (
                      <span 
                        key={cat._id}
                        className="px-2 py-1 rounded text-xs text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.name.en}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded text-xs">
                      No categories
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit size={16} />}
                    onClick={() => handleOpenModal(project)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Trash2 size={16} />}
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={editingProject ? 'Edit Project' : 'Add Project'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Title (English)"
                name="title.en"
                value={formData.title.en}
                onChange={handleChange}
                required
              />
              <Input
                label="Title (Arabic)"
                name="title.ar"
                value={formData.title.ar}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Textarea
                label="Short Description (English)"
                name="shortDescription.en"
                value={formData.shortDescription.en}
                onChange={handleChange}
                required
                rows={3}
              />
              <Textarea
                label="Short Description (Arabic)"
                name="shortDescription.ar"
                value={formData.shortDescription.ar}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Textarea
                label="Description (English)"
                name="description.en"
                value={formData.description.en}
                onChange={handleChange}
                required
                rows={5}
              />
              <Textarea
                label="Description (Arabic)"
                name="description.ar"
                value={formData.description.ar}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Input
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
              <div className="text-sm text-text-secondary bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
                <p className="font-semibold mb-1">💡 Quick Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use screenshot services like <a href="https://www.screenshotapi.net/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">ScreenshotAPI</a></li>
                  <li>Format: <code className="bg-surface px-1 rounded">https://shot.screenshotapi.net/screenshot?url=YOUR_LIVE_URL&width=1200&height=630</code></li>
                  <li>Or upload to <a href="https://imgur.com/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Imgur</a> / <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">ImgBB</a></li>
                </ul>
              </div>
              {formData.image && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img 
                    src={formData.image} 
                    alt="Project preview" 
                    className="w-full h-48 object-cover rounded-lg border-2 border-primary-200 dark:border-primary-800"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>

            <Input
              label="Technologies (comma-separated)"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              placeholder="React, Node.js, MongoDB"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Categories</label>
                <div className="space-y-2 p-3 bg-surface border-2 border-transparent focus-within:border-primary-500 rounded-lg max-h-40 overflow-y-auto">
                  {categories.length === 0 ? (
                    <p className="text-sm text-text-secondary">No categories available. Create categories first.</p>
                  ) : (
                    categories.map((category) => (
                      <label key={category._id} className="flex items-center gap-2 cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                categories: [...formData.categories, category._id]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                categories: formData.categories.filter(id => id !== category._id)
                              });
                            }
                          }}
                          className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm">{category.name.en}</span>
                        <span 
                          className="w-3 h-3 rounded-full ml-auto" 
                          style={{ backgroundColor: category.color }}
                        />
                      </label>
                    ))
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-surface border-2 border-transparent focus:border-primary-500"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Live URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
              <Input
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm">
                Featured Project
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                {editingProject ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
