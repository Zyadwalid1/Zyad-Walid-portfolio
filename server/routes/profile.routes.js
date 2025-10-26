import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProfile)
  .put(
    protect,
    admin,
    upload.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
    ]),
    updateProfile
  );

export default router;
