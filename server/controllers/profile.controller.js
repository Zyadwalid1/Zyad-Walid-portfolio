import Profile from '../models/Profile.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadImage.js';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    // Create default profile if none exists
    if (!profile) {
      profile = await Profile.create({
        name: 'Your Name',
        title: {
          en: 'Full Stack Developer',
          ar: 'مطور ويب متكامل',
        },
        bio: {
          en: 'Add your bio here',
          ar: 'أضف سيرتك الذاتية هنا',
        },
        email: 'your.email@example.com',
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private/Admin
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const updateData = req.body;

    // Upload avatar if provided
    if (req.files && req.files.avatar) {
      // Delete old avatar
      if (profile.avatar) {
        await deleteFromCloudinary(profile.avatar);
      }
      const avatarUrl = await uploadToCloudinary(
        req.files.avatar[0].buffer,
        'portfolio/profile'
      );
      updateData.avatar = avatarUrl;
    }

    // Upload resume if provided
    if (req.files && req.files.resume) {
      // Delete old resume
      if (profile.resumeUrl) {
        await deleteFromCloudinary(profile.resumeUrl);
      }
      const resumeUrl = await uploadToCloudinary(
        req.files.resume[0].buffer,
        'portfolio/resume'
      );
      updateData.resumeUrl = resumeUrl;
    }

    profile = await Profile.findOneAndUpdate({}, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
