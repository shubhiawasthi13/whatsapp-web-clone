import express from 'express';
import Message from '../models/Message.js';
import { getIO } from '../socket.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Add new message
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  await message.save();

  // Emit WebSocket event
  getIO().emit('newMessage', message);
  res.json(message);
});

// Update message status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const updated = await Message.findByIdAndUpdate(req.params.id, { status }, { new: true });

  // Emit WebSocket event
  getIO().emit('statusUpdate', updated);
  res.json(updated);
});

export default router;
