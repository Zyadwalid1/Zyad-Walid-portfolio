import Contact from '../models/Contact.model.js';
import { sendContactNotification, sendAutoReply } from '../utils/email.js';

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Mark as read
    message.read = true;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification to admin (you)
    const emailData = { name, email, subject, message };
    await sendContactNotification(emailData);
    
    // Send auto-reply to the sender (optional)
    await sendAutoReply(emailData);

    res.status(201).json({
      message: 'Message sent successfully',
      data: contactMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update message status
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const updatedMessage = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
