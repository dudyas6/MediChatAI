import { connectToDatabase } from "@/api-lib/mongodb";
import ChatHistory from '@/models/chat.model'
import { v4 } from "uuid";

export const handleGetChatHistory = async (req, res) => {
    const user = req.query.username;
    try {
        await connectToDatabase();
        const existingChats = await ChatHistory.find({ user: user });
        res.status(200).json(existingChats)
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export const handleAddChatHistory = async (req, res) => {
    let chat_id = req.body.session.chat_id;
    console.log(chat_id);
    console.log(req.body)
    try {
        await connectToDatabase();
        if (chat_id == '-1')
            chat_id = v4();
        console.log(chat_id)
        const existingChat = ChatHistory.findOne({ chat_id: chat_id })

        if (!existingChat) {
            console.log("Existing")
            await updateExistingChatHistory(req, res);
        } else {
            console.log("Not Existing")
            await addNewChatHistory(req, res, chat_id);
        }
    } catch (error) {
        res.json(error);
    }
};



const addNewChatHistory = async (req, res, chat_id) => {
    try {
        const { user, session } = req.body;
        const { messages } = session;

        // Create a new ChatHistory document based on your Mongoose schema
        const newChatHistory = new ChatHistory({
            chat_id: chat_id,
            user: user,
            messages: messages,
        });

        // Save the new chat history document to the database
        const savedChatHistory = await newChatHistory.save();

        res.status(200).json(savedChatHistory);
    } catch (error) {
        console.error('Error adding new chat history:', error);
        res.status(500).json({ error: 'Failed to add new chat history' });
    }
};


const updateExistingChatHistory = async (req, res) => {
    try {
        const { user, session } = req.body;
        const { chat_id } = session;
        const updatedChatHistory = await ChatHistory.findOneAndUpdate(
            { chat_id: chat_id },
            { new: true }
        );

        if (!updatedChatHistory) {
            return res.status(404).json({ error: 'Chat history not found' });
        }

        res.status(200).json(updatedChatHistory);
    } catch (error) {
        console.error('Error updating chat history:', error);
        res.status(500).json({ error: 'Failed to update chat history' });
    }
};
