import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Card from '../../components/common/Card';
import { profileService } from '../../services/profileService';

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: { en: '', ar: '' },
    title: { en: '', ar: '' },
    bio: { en: '', ar: '' },
    email: '',
    phone: { en: '', ar: '' },
    avatar: '',
    resumeUrl: '',
    location: { en: '', ar: '' },
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: '',
      website: '',
    },
    stats: {
      yearsOfExperience: 0,
      projectsCompleted: 0,
      happyClients: 0,
      awards: 0,
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.get();
      if (data) {
        setFormData({
          name: data.name || '',
          title: data.title || { en: '', ar: '' },
          bio: data.bio || { en: '', ar: '' },
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || { en: '', ar: '' },
          social: data.social || {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: '',
            website: '',
          },
          stats: data.stats || {
            yearsOfExperience: 0,
            projectsCompleted: 0,
            happyClients: 0,
            awards: 0,
          },
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Failed to fetch profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await profileService.update(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Name (English)" name="name.en" value={formData.name?.en || ''} onChange={handleChange} required />
                <Input label="Name (Arabic)" name="name.ar" value={formData.name?.ar || ''} onChange={handleChange} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Title (English)" name="title.en" value={formData.title?.en || ''} onChange={handleChange} required />
                <Input label="Title (Arabic)" name="title.ar" value={formData.title?.ar || ''} onChange={handleChange} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Textarea label="Bio (English)" name="bio.en" value={formData.bio?.en || ''} onChange={handleChange} required rows={4} />
                <Textarea label="Bio (Arabic)" name="bio.ar" value={formData.bio?.ar || ''} onChange={handleChange} required rows={4} />
              </div>
              <Input 
                label="Profile Photo URL" 
                name="avatar" 
                value={formData.avatar || ''} 
                onChange={handleChange} 
                placeholder="https://example.com/photo.jpg"
              />
              {formData.avatar && (
                <div className="mt-2">
                  <img 
                    src={formData.avatar} 
                    alt="Profile preview" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128?text=Invalid+URL';
                    }}
                  />
                </div>
              )}
              <Input 
                label="Resume URL" 
                name="resumeUrl" 
                value={formData.resumeUrl || ''} 
                onChange={handleChange} 
                placeholder="https://example.com/resume.pdf"
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Phone (English)" name="phone.en" value={formData.phone?.en || ''} onChange={handleChange} placeholder="+1 234 567 8900" />
                <Input label="Phone (Arabic)" name="phone.ar" value={formData.phone?.ar || ''} onChange={handleChange} placeholder="٠١٢٣٤٥٦٧٨٩٠" dir="rtl" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Location (English)" name="location.en" value={formData.location?.en || ''} onChange={handleChange} />
                <Input label="Location (Arabic)" name="location.ar" value={formData.location?.ar || ''} onChange={handleChange} />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Social Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {formData.social && Object.keys(formData.social).map((platform) => (
                <Input
                  key={platform}
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  name={`social.${platform}`}
                  value={formData.social[platform] || ''}
                  onChange={handleChange}
                  placeholder={`https://${platform}.com/...`}
                />
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Years of Experience" name="stats.yearsOfExperience" type="number" value={formData.stats?.yearsOfExperience || 0} onChange={handleChange} />
              <Input label="Projects Completed" name="stats.projectsCompleted" type="number" value={formData.stats?.projectsCompleted || 0} onChange={handleChange} />
              <Input label="Happy Clients" name="stats.happyClients" type="number" value={formData.stats?.happyClients || 0} onChange={handleChange} />
              <Input label="Awards Won" name="stats.awards" type="number" value={formData.stats?.awards || 0} onChange={handleChange} />
            </div>
          </Card>

          <Button type="submit" disabled={loading} icon={<Save size={20} />} className="w-full">
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
