import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSessionSchema = new mongoose.Schema({
  name: { type: String },
  id: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ChatHistory ||
  mongoose.model('ChatHistory', ChatSessionSchema);
