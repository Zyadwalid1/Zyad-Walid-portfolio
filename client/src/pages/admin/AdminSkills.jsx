import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { skillService } from '../../services/skillService';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: { en: '', ar: '' },
    category: 'frontend',
    level: 50,
    icon: '',
    color: '#3B82F6',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await skillService.getAll();
      setSkills(data);
    } catch (error) {
      toast.error('Failed to fetch skills');
    }
  };

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData(skill);
    } else {
      setEditingSkill(null);
      setFormData({
        name: { en: '', ar: '' },
        category: 'frontend',
        level: 50,
        icon: '',
        color: '#3B82F6',
      });
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillService.update(editingSkill._id, formData);
        toast.success('Skill updated');
      } else {
        await skillService.create(formData);
        toast.success('Skill created');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await skillService.delete(id);
      toast.success('Skill deleted');
      fetchSkills();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Skills</h1>
          <Button icon={<Plus size={20} />} onClick={() => handleOpenModal()}>
            Add Skill
          </Button>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <Card key={skill._id}>
              <div className="text-center">
                {skill.icon ? (
                  <img 
                    src={skill.icon} 
                    alt={skill.name.en}
                    className="w-16 h-16 mx-auto mb-3 object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64?text=No+Icon';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-2xl">🚀</div>
                )}
                <h3 className="font-bold mb-2">{skill.name.en}</h3>
                <p className="text-sm text-text-secondary mb-3">{skill.category}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" icon={<Edit size={14} />} onClick={() => handleOpenModal(skill)} className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" icon={<Trash2 size={14} />} onClick={() => handleDelete(skill._id)} className="text-red-500">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingSkill ? 'Edit Skill' : 'Add Skill'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name (English)" name="name.en" value={formData.name.en} onChange={handleChange} required />
            <Input label="Name (Arabic)" name="name.ar" value={formData.name.ar} onChange={handleChange} required />
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-surface border-2 border-transparent focus:border-primary-500">
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Input 
                label="Icon Image URL" 
                name="icon" 
                value={formData.icon} 
                onChange={handleChange} 
                placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              />
              <div className="text-sm text-text-secondary bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
                <p className="font-semibold mb-1">💡 Icon Resources:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><a href="https://devicon.dev/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Devicon</a> - Developer icons</li>
                  <li><a href="https://simpleicons.org/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Simple Icons</a> - Brand icons</li>
                  <li><a href="https://icones.js.org/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Icônes</a> - Icon search</li>
                </ul>
              </div>
              {formData.icon && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img 
                    src={formData.icon} 
                    alt="Icon preview" 
                    className="w-16 h-16 object-contain border-2 border-primary-200 dark:border-primary-800 rounded-lg p-2"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64?text=Invalid+URL';
                    }}
                  />
                </div>
              )}
            </div>
            <Input label="Color" name="color" type="color" value={formData.color} onChange={handleChange} />
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">{editingSkill ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
