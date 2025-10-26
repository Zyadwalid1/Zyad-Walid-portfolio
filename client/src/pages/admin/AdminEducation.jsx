import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { educationService } from '../../services/educationService';

const AdminEducation = () => {
  const [education, setEducation] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    degree: { en: '', ar: '' },
    institution: { en: '', ar: '' },
    startDate: '',
    endDate: '',
    current: false,
    grade: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await educationService.getAll();
    setEducation(data);
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
        degree: { en: '', ar: '' },
        institution: { en: '', ar: '' },
        startDate: '',
        endDate: '',
        current: false,
        grade: '',
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
        await educationService.update(editing._id, formData);
        toast.success('Updated');
      } else {
        await educationService.create(formData);
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
    await educationService.delete(id);
    toast.success('Deleted');
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Education</h1>
          <Button icon={<Plus size={20} />} onClick={() => handleOpen()}>Add</Button>
        </div>

        {education.map((edu) => (
          <Card key={edu._id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{edu.degree.en}</h3>
                <p className="text-primary-500">{edu.institution.en}</p>
                <p className="text-sm text-text-secondary">
                  {new Date(edu.startDate).getFullYear()} - {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" icon={<Edit size={14} />} onClick={() => handleOpen(edu)} />
                <Button size="sm" variant="outline" icon={<Trash2 size={14} />} onClick={() => handleDelete(edu._id)} className="text-red-500" />
              </div>
            </div>
          </Card>
        ))}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit' : 'Add'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Degree (EN)" name="degree.en" value={formData.degree.en} onChange={handleChange} required />
            <Input label="Degree (AR)" name="degree.ar" value={formData.degree.ar} onChange={handleChange} required />
            <Input label="Institution (EN)" name="institution.en" value={formData.institution.en} onChange={handleChange} required />
            <Input label="Institution (AR)" name="institution.ar" value={formData.institution.ar} onChange={handleChange} required />
            <Input label="Grade" name="grade" value={formData.grade} onChange={handleChange} />
            <Input label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
            <Input label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} disabled={formData.current} />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} />
              Current
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

export default AdminEducation;
