import Skill from '../models/Skill.model.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const skills = await Skill.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
