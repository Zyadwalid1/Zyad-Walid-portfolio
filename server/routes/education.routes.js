import express from 'express';
import {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getEducations)
  .post(protect, admin, createEducation);

router.route('/:id')
  .get(getEducation)
  .put(protect, admin, updateEducation)
  .delete(protect, admin, deleteEducation);

export default router;
