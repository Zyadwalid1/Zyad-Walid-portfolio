import Project from '../models/Project.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadImage.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category) filter.categories = category; // Filter by category ID
    if (featured) filter.featured = featured === 'true';

    const projects = await Project.find(filter)
      .populate('categories')
      .sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('categories');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    // Upload main image if provided
    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
      projectData.image = imageUrl;
    }

    // Upload additional images if provided
    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, 'portfolio/projects'))
      );
      projectData.images = imageUrls;
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updateData = req.body;

    // Upload new main image if provided
    if (req.file) {
      // Delete old image
      if (project.image) {
        await deleteFromCloudinary(project.image);
      }
      const imageUrl = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
      updateData.image = imageUrl;
    }

    // Upload new additional images if provided
    if (req.files && req.files.length > 0) {
      // Delete old images
      if (project.images && project.images.length > 0) {
        await Promise.all(project.images.map((img) => deleteFromCloudinary(img)));
      }
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, 'portfolio/projects'))
      );
      updateData.images = imageUrls;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete images from cloudinary
    if (project.image) {
      await deleteFromCloudinary(project.image);
    }
    if (project.images && project.images.length > 0) {
      await Promise.all(project.images.map((img) => deleteFromCloudinary(img)));
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
