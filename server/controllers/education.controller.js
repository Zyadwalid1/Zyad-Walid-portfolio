import Education from '../models/Education.model.js';

// @desc    Get all education
// @route   GET /api/education
// @access  Public
export const getEducations = async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1, order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Public
export const getEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create education
// @route   POST /api/education
// @access  Private/Admin
export const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private/Admin
export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedEducation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private/Admin
export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
