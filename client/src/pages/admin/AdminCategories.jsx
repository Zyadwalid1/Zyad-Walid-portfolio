import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Folder, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: { en: '', ar: '' },
    slug: '',
    description: { en: '', ar: '' },
    color: '#6366f1',
    icon: 'Folder',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/admin/all');
      setCategories(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, formData);
        toast.success('Category updated successfully');
      } else {
        await api.post('/categories', formData);
        toast.success('Category created successfully');
      }
      
      fetchCategories();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || { en: '', ar: '' },
        color: category.color,
        icon: category.icon,
        order: category.order,
        isActive: category.isActive,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: { en: '', ar: '' },
        slug: '',
        description: { en: '', ar: '' },
        color: '#6366f1',
        icon: 'Folder',
        order: 0,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const iconOptions = ['Folder', 'Tag', 'Code', 'Smartphone', 'Monitor', 'Globe', 'Layers', 'Package'];
  const colorOptions = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#06b6d4'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text">Project Categories</h1>
          <p className="text-text-secondary mt-1">Manage custom project filters</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface rounded-lg p-4 border border-primary-500/20 hover:border-primary-500/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text">{category.name.en}</h3>
                  <p className="text-sm text-text-secondary">{category.name.ar}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(category)}
                  className="p-1.5 text-primary-500 hover:bg-primary-500/10 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="px-2 py-1 bg-background rounded text-xs">{category.slug}</span>
              <span className={`px-2 py-1 rounded text-xs ${category.isActive ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* English Name */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name.en}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: { ...formData.name, en: e.target.value },
                      slug: !editingCategory ? generateSlug(e.target.value) : formData.slug,
                    });
                  }}
                  className="w-full px-4 py-2 bg-background border border-primary-500/20 rounded-lg focus:outline-none focus:border-primary-500 text-text"
                  placeholder="e.g., Web Development"
                />
              </div>

              {/* Arabic Name */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Name (Arabic) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name.ar}
                  onChange={(e) =>
                    setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })
                  }
                  className="w-full px-4 py-2 bg-background border border-primary-500/20 rounded-lg focus:outline-none focus:border-primary-500 text-text"
                  placeholder="e.g., تطوير الويب"
                  dir="rtl"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Slug (URL-friendly) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-primary-500/20 rounded-lg focus:outline-none focus:border-primary-500 text-text font-mono text-sm"
                  placeholder="e.g., web-development"
                />
              </div>

              {/* Color & Icon */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          formData.color === color ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-primary-500/20 rounded-lg focus:outline-none focus:border-primary-500 text-text"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Order & Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-background border border-primary-500/20 rounded-lg focus:outline-none focus:border-primary-500 text-text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Status</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-text">Active</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-background text-text rounded-lg hover:bg-background/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
