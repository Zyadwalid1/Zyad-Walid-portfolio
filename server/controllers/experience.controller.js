import Experience from '../models/Experience.model.js';

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1, order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create experience
// @route   POST /api/experience
// @access  Private/Admin
export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
