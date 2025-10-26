import express from 'express';
import {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skill.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, admin, createSkill);

router.route('/:id')
  .get(getSkill)
  .put(protect, admin, updateSkill)
  .delete(protect, admin, deleteSkill);

export default router;
