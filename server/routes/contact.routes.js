import express from 'express';
import {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getMessages)
  .post(createMessage);

router.route('/:id')
  .get(protect, admin, getMessage)
  .put(protect, admin, updateMessage)
  .delete(protect, admin, deleteMessage);

export default router;
