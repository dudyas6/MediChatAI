import React, { Component } from 'react'
import { useEffect, useState } from 'react';
const ChatHistory = ({ handleChatHistoryClick, handleNewChat }) => {
    const [chatHistory, setChatHistory] = useState([]);
    useEffect(() => {
        // Mock chat history data for demonstration

        setChatHistory([
            { id: 1, messages: [{ text: 'Hello!', sender: 'user' }, { text: 'Hi there!', sender: 'bot' }] },
            { id: 2, messages: [{ text: 'How are you?', sender: 'user' }, { text: 'I am fine, thank you!', sender: 'bot' }] },
        ]);

    }, []);

    const getChatHistoryFromDB = async (user, messages, createdAt) => {
        const response = await fetch('/api/chathistory/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user,
                messages,
                createdAt,
            }),
        });
        const data = await response.json();
        return data;
    }

    const postChatSession = async (user, messages, createdAt) => {
        try {
            const response = await fetch('/api/chathistory/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user,
                    messages,
                    createdAt,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    message: errorData.message || 'An error occurred!',
                };
            }
            const data = await response.json();
            return {
                success: true,
                message: "Message sent, we'll be soon in touch!",
            };
        } catch (error) {
            console.error('Error sending chat session:', error);
            return {
                success: false,
                message: 'An unexpected error occurred!',
            };
        }
    };


    return (
        <div className='w-1/4 p-4 overflow-y-auto bg-gray-200 dark:bg-gray-700'>
            <div className='flex items-center gap-10 mb-4'>
                <h2 className='font-medium'>Chat History</h2>
                <button className='px-2 py-1 ml-4 text-white bg-blue-500 rounded sm:flex-col'
                    onClick={handleNewChat}>New Chat</button>
            </div>
            {chatHistory.map((history) => (
                <div key={history.id} className='mb-4 cursor-pointer' onClick={() => handleChatHistoryClick(history)}>
                    <div className='p-2 bg-gray-300 rounded dark:bg-gray-600'>
                        Chat {history.id}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatHistory