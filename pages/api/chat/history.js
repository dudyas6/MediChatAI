import { connectToDatabase } from '@/api-lib/mongodb';
import ChatHistory from 'backend/models/chathistory.model';

const handleAddChatHistory = async (req, res) => {
  const { user, messages, createdAt } = req.body;
  try {
    await connectToDatabase();
   
    const existingChat = await ChatHistory.findOne({ messages });
    // If chat exists, add the changes
    if (existingChat) {
      console.log("chat exists");
      res.status(200).json('Chat already exists');
      return;
    }
    const chatsession = new ChatHistory({ user, messages, createdAt });
    await chatsession.save();
    res.status(200).json('History Saved successfully!');
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

const handleGetChatHistory = async (req, res) => {
  const { user, messages, createdAt } = req.body;
  try {
    await connectToDatabase();
    const existingChats = await ChatHistory.find();
    // If chat exists, add the changes
    return existingChats;
    res.status(200).json('History Saved successfully!');
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};





const handlers = {
  POST: handleAddChatHistory,
  GET: handleGetChatHistory,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
