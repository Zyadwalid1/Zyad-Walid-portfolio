import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Code,
  Mail,
  User,
  GraduationCap,
  Calendar,
  TrendingUp,
  Folder,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/common/Card';
import { projectService } from '../../services/projectService';
import { skillService } from '../../services/skillService';
import { contactService } from '../../services/contactService';
import { experienceService } from '../../services/experienceService';
import { educationService } from '../../services/educationService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    experience: 0,
    education: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, skills, messages, experience, education] = await Promise.all([
        projectService.getAll(),
        skillService.getAll(),
        contactService.getAll(),
        experienceService.getAll(),
        educationService.getAll(),
      ]);

      setStats({
        projects: projects.length,
        skills: skills.length,
        messages: messages.filter((m) => !m.read).length,
        experience: experience.length,
        education: education.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statsCards = [
    {
      title: 'Projects',
      value: stats.projects,
      icon: Briefcase,
      color: 'text-blue-500',
      link: '/admin/projects',
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Code,
      color: 'text-green-500',
      link: '/admin/skills',
    },
    {
      title: 'New Messages',
      value: stats.messages,
      icon: Mail,
      color: 'text-red-500',
      link: '/admin/messages',
    },
    {
      title: 'Experience',
      value: stats.experience,
      icon: Calendar,
      color: 'text-purple-500',
      link: '/admin/experience',
    },
    {
      title: 'Education',
      value: stats.education,
      icon: GraduationCap,
      color: 'text-yellow-500',
      link: '/admin/education',
    },
  ];

  const quickLinks = [
    { title: 'Manage Projects', icon: Briefcase, link: '/admin/projects' },
    { title: 'Manage Categories', icon: Folder, link: '/admin/categories' },
    { title: 'Manage Skills', icon: Code, link: '/admin/skills' },
    { title: 'View Messages', icon: Mail, link: '/admin/messages' },
    { title: 'Edit Profile', icon: User, link: '/admin/profile' },
    { title: 'Manage Experience', icon: Calendar, link: '/admin/experience' },
    { title: 'Manage Education', icon: GraduationCap, link: '/admin/education' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-text-secondary">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-secondary text-sm mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`${stat.color}`} size={32} />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link to={link.link}>
                  <Card hover className="group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:bg-primary-500 transition-colors">
                        <link.icon className="text-primary-500 group-hover:text-white" size={24} />
                      </div>
                      <p className="font-semibold">{link.title}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
