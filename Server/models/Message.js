import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  wa_id: String,        // sender
  to: String,           // receiver (optional)
  name: String,
  message: String,
  timestamp: Date,
  status: { type: String, default: 'sent' },
  meta_msg_id: String,
}, { collection: 'processed_messages' });
export default mongoose.model('Message', messageSchema);

