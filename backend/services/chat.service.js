import { connectToDatabase } from '@/api-lib/mongodb';
import ChatHistory from '@/models/chat.model';
import { v4 } from 'uuid';
import { getOpenAIConnection } from '@/api-lib/openai'

export const handleGetChatHistory = async (req, res) => {
  const user = req.query.username;
  try {
    await connectToDatabase();
    const existingChats = await ChatHistory.find({ user: user });
    res.status(200).json(existingChats);
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
};

export const handleAddChatHistory = async (req, res) => {
  let id = req.body.session.id;
  let messages = req.body.session.messages;
  let chat_name = req.body.session.name;
  try {
    await connectToDatabase();
    if (id == '-1') {
      id = v4();
      chat_name = 'New Conversation'
    }
    console.log(messages.length)
    if (messages.length === 4) {
      chat_name = await generateChatName(messages);
    }


    const existingChat = await ChatHistory.findOne({ id: id });
    if (existingChat) {
      await updateExistingChatHistory(req, res, chat_name, existingChat);
    } else {
      await addNewChatHistory(req, res, chat_name, id);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNewChatHistory = async (req, res, chat_name, id) => {
  try {
    const { user, session } = req.body;
    const { messages } = session;

    const newChatHistory = new ChatHistory({
      name: chat_name,
      id: id,
      user: user,
      messages: messages,
    });

    const savedChatHistory = await newChatHistory.save();

    res.status(200).json(savedChatHistory);
  } catch (error) {
    console.error('Error adding new chat history:', error);
    res.status(500).json({ error: 'Failed to add new chat history' });
  }
};

const updateExistingChatHistory = async (req, res, chatName, existingChat) => {
  try {
    const { session } = req.body;
    const { messages } = session;
    existingChat.messages = messages;
    existingChat.name = chatName;
    const updatedChatHistory = await existingChat.save();

    res.status(200).json(updatedChatHistory);
  } catch (error) {
    console.error('Error updating chat history:', error);
    res.status(500).json({ error: 'Failed to update chat history' });
  }
};

export const deleteChatFromDB = async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'Chat ID is required.' }); // Handle missing chatId
  }

  try {
    await connectToDatabase();

    const existingChat = await ChatHistory.findOne({ id: chatId });
    if (existingChat) {
      await existingChat.deleteOne();
      return res.status(200).json({ message: 'Chat deleted successfully.' }); // Send a success message
    } else {
      return res.status(404).json({ error: 'Chat not found.' }); // Handle case where chat does not exist
    }
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle server errors
  }
};


const generateChatName = async (messages) => {
  const openai = await getOpenAIConnection(); // Ensure you await the promise

  const chatHistory = JSON.stringify(messages, null, 2);
  const filteredMessage = `You are an expert in naming conversations. Given the following conversation between a user and an AI: ${chatHistory}, generate the shortest ,simple worded, descriptive, and relevant name for this conversation. The name should be concise and capture the essence of the discussion.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: filteredMessage },
      ],
    });

    const reply = response.choices[0].message.content.trim();
    if(reply.charAt(0)==='"') return reply.slice(1,-1);
    else return reply;
  } catch (error) {
    console.error('Error generating chat name:', error);
  }
};

