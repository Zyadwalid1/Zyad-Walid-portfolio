import express from 'express';
import { chat } from '../controllers/chat.controller.js';

const router = express.Router();

// Public route - no auth required
router.post('/', chat);

export default router;
