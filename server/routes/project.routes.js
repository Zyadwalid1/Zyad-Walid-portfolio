import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, upload.single('image'), createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, admin, upload.single('image'), updateProject)
  .delete(protect, admin, deleteProject);

export default router;
