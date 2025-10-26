import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { courseService } from '../../services/courseService';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: { en: '', ar: '' },
    company: '',
    location: { en: '', ar: '' },
    date: '',
    certificateUrl: '',
    certificateImage: '',
    description: { en: '', ar: '' },
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        ...item,
        date: item.date?.split('T')[0],
      });
    } else {
      setEditing(null);
      setFormData({
        name: { en: '', ar: '' },
        company: '',
        location: { en: '', ar: '' },
        date: '',
        certificateUrl: '',
        certificateImage: '',
        description: { en: '', ar: '' },
        order: 0,
      });
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({ 
        ...prev, 
        [parent]: { ...prev[parent], [child]: value } 
      }));
    } else {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: type === 'number' ? parseInt(value) : value 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await courseService.update(editing._id, formData);
        toast.success('Course updated successfully');
      } else {
        await courseService.create(formData);
        toast.success('Course created successfully');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseService.delete(id);
      toast.success('Course deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Award className="text-primary-500" size={32} />
            <h1 className="text-3xl font-bold">Courses</h1>
          </div>
          <Button icon={<Plus size={20} />} onClick={() => handleOpen()}>
            Add Course
          </Button>
        </div>

        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course._id}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Certificate Image */}
                {course.certificateImage && (
                  <div className="flex-shrink-0">
                    <img
                      src={course.certificateImage}
                      alt={`${course.name.en} certificate`}
                      className="w-full md:w-32 h-auto md:h-32 object-contain rounded-lg border-2 border-primary-500/20 bg-surface p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{course.name.en}</h3>
                      <p className="text-primary-500 font-medium">{course.company}</p>
                      {course.location?.en && (
                        <p className="text-text-secondary text-sm">{course.location.en}</p>
                      )}
                      <p className="text-text-secondary text-sm mt-1">
                        {new Date(course.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                      {course.certificateUrl && (
                        <a 
                          href={course.certificateUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:underline text-sm mt-2 inline-block"
                        >
                          View Certificate →
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        icon={<Edit size={14} />} 
                        onClick={() => handleOpen(course)} 
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        icon={<Trash2 size={14} />} 
                        onClick={() => handleDelete(course._id)} 
                        className="text-red-500 hover:text-red-600" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {courses.length === 0 && (
            <Card>
              <p className="text-center text-text-secondary py-8">
                No courses yet. Click "Add Course" to create one.
              </p>
            </Card>
          )}
        </div>

        <Modal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={editing ? 'Edit Course' : 'Add Course'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Course Name (English)" 
              name="name.en" 
              value={formData.name.en} 
              onChange={handleChange} 
              required 
              placeholder="e.g., React - The Complete Guide"
            />
            <Input 
              label="Course Name (Arabic)" 
              name="name.ar" 
              value={formData.name.ar} 
              onChange={handleChange} 
              required 
              placeholder="مثال: React - الدليل الكامل"
              dir="rtl"
            />
            <Input 
              label="Company/Platform" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              required 
              placeholder="e.g., Udemy, Coursera, LinkedIn Learning"
            />
            <Input 
              label="Location (English)" 
              name="location.en" 
              value={formData.location.en} 
              onChange={handleChange} 
              placeholder="e.g., Online, New York"
            />
            <Input 
              label="Location (Arabic)" 
              name="location.ar" 
              value={formData.location.ar} 
              onChange={handleChange} 
              placeholder="مثال: عبر الإنترنت، القاهرة"
              dir="rtl"
            />
            <Input 
              label="Completion Date" 
              name="date" 
              type="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Certificate URL (Optional)" 
              name="certificateUrl" 
              value={formData.certificateUrl} 
              onChange={handleChange} 
              placeholder="https://example.com/certificate/123"
            />
            <Input 
              label="Certificate Image URL (Optional)" 
              name="certificateImage" 
              value={formData.certificateImage} 
              onChange={handleChange} 
              placeholder="https://example.com/certificate.jpg"
            />
            {formData.certificateImage && (
              <div className="mt-2">
                <p className="text-sm text-text-secondary mb-2">Preview:</p>
                <img 
                  src={formData.certificateImage} 
                  alt="Certificate preview" 
                  className="w-full h-32 object-cover rounded-lg border-2 border-primary-500/20"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x128?text=Invalid+URL';
                  }}
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (English)
                </label>
                <textarea
                  name="description.en"
                  value={formData.description.en}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Brief description of what you learned..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (Arabic)
                </label>
                <textarea
                  name="description.ar"
                  value={formData.description.ar}
                  onChange={handleChange}
                  rows={3}
                  dir="rtl"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="وصف مختصر لما تعلمته..."
                />
              </div>
            </div>
            <Input 
              label="Order" 
              name="order" 
              type="number" 
              value={formData.order} 
              onChange={handleChange} 
              placeholder="0"
            />
            <Button type="submit" className="w-full">
              {editing ? 'Update Course' : 'Create Course'}
            </Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;
