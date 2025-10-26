import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { experienceService } from '../../services/experienceService';

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    company: '',
    location: { en: '', ar: '' },
    description: { en: '', ar: '' },
    startDate: '',
    endDate: '',
    current: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await experienceService.getAll();
    setExperiences(data);
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        ...item,
        startDate: item.startDate?.split('T')[0],
        endDate: item.endDate?.split('T')[0] || '',
      });
    } else {
      setEditing(null);
      setFormData({
        title: { en: '', ar: '' },
        company: '',
        location: { en: '', ar: '' },
        description: { en: '', ar: '' },
        startDate: '',
        endDate: '',
        current: false,
      });
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [p, c] = name.split('.');
      setFormData((prev) => ({ ...prev, [p]: { ...prev[p], [c]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await experienceService.update(editing._id, formData);
        toast.success('Updated');
      } else {
        await experienceService.create(formData);
        toast.success('Created');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await experienceService.delete(id);
    toast.success('Deleted');
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Experience</h1>
          <Button icon={<Plus size={20} />} onClick={() => handleOpen()}>Add</Button>
        </div>

        {experiences.map((exp) => (
          <Card key={exp._id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{exp.title.en}</h3>
                <p className="text-primary-500">{exp.company}</p>
                <p className="text-sm text-text-secondary">{new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" icon={<Edit size={14} />} onClick={() => handleOpen(exp)} />
                <Button size="sm" variant="outline" icon={<Trash2 size={14} />} onClick={() => handleDelete(exp._id)} className="text-red-500" />
              </div>
            </div>
          </Card>
        ))}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit' : 'Add'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Title (EN)" name="title.en" value={formData.title.en} onChange={handleChange} required />
            <Input label="Title (AR)" name="title.ar" value={formData.title.ar} onChange={handleChange} required />
            <Input label="Company" name="company" value={formData.company} onChange={handleChange} required />
            <Textarea label="Description (EN)" name="description.en" value={formData.description.en} onChange={handleChange} required />
            <Textarea label="Description (AR)" name="description.ar" value={formData.description.ar} onChange={handleChange} required />
            <Input label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
            <Input label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} disabled={formData.current} />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} />
              Current Position
            </label>
            <Input 
              label="Certification Image URL (Optional)" 
              name="certificationImage" 
              value={formData.certificationImage || ''} 
              onChange={handleChange} 
              placeholder="https://example.com/certificate.jpg"
            />
            {formData.certificationImage && (
              <div className="mt-2">
                <img 
                  src={formData.certificationImage} 
                  alt="Certification preview" 
                  className="w-full h-32 object-cover rounded-lg border-2 border-primary-500/20"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x128?text=Invalid+URL';
                  }}
                />
              </div>
            )}
            <Button type="submit" className="w-full">{editing ? 'Update' : 'Create'}</Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminExperience;
