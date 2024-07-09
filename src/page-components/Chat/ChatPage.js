import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/Shared/ThemeContext';
import ChatHistory from './ChatHistory';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const messagesEndRef = useRef(null);

    const handleSend = async (e) => {
        if (input.trim() !== '') {
            const newMessage = { text: input, sender: 'user' };
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setInput('');
            setTimeout(() => {
                const botReply = { text: '...', sender: 'bot' };
                const finalMessages = [...updatedMessages, botReply];
                setMessages(finalMessages);

                postChatSession("null", finalMessages, null)
                    .then(({ success, message: responseMsg }) => {
                        if (!success) console.log(responseMsg);
                    })
                    .catch(error => {
                        console.error("Error posting chat session:", error);
                    });
            }, 1000);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
    }

    const handleChatHistoryClick = (history) => {
        setMessages(history.messages);
    };

    return (
        <div className='flex items-center justify-center h-screen dark:bg-gray-800 dark:text-white'>
            <div className='flex w-3/4 mt-10 h-5/6'>
                <ChatHistory handleChatHistoryClick={handleChatHistoryClick} handleNewChat={handleNewChat} />
                <div className='flex flex-col w-3/4 rounded-lg shadow-lg bg-background dark:bg-gray-700'>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'flex justify-start' : 'flex justify-end'}`}>
                                <div className="flex items-start space-x-2">
                                    {message.sender === 'user' && (
                                        <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbov_oM-pex9ica80GftzgRAcruGPu5uBkg&s" alt="User Avatar" />
                                    )}
                                    {message.sender === 'bot' && (
                                        <img className="w-8 h-8 rounded-full" src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-male-medical-doctor-icon-png-image_3708206.jpg" alt="Bot Avatar" />
                                    )}
                                    <div className="flex flex-col">
                                        <div className="font-medium">
                                            {message.sender === 'user' ? 'User' : 'Bot'}
                                        </div>
                                        <div className={`rounded-lg p-2 shadow max-w-sm ${message.sender === 'user' ? 'bg-blue-400' : 'bg-gray-400'}`}>
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='p-4 rounded dark:bg-gray-600 dark:border-gray-600 dark:text-white'>
                        <div className="flex items-center">
                            <input
                                className='flex-1 px-4 py-2 mr-2 bg-gray-100 border rounded-full dark:bg-gray-600 dark:border-gray-600 dark:text-white'
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full`}
                                onClick={handleSend}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
