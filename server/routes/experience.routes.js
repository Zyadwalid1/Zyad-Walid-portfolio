import express from 'express';
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getExperiences)
  .post(protect, admin, createExperience);

router.route('/:id')
  .get(getExperience)
  .put(protect, admin, updateExperience)
  .delete(protect, admin, deleteExperience);

export default router;
