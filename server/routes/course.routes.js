import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, admin, createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse);

export default router;
