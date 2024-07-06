import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/Shared/ThemeContext';
function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: 'user' }
            ]);
            setInput('');

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: '...', sender: 'bot' }
                ]);
            }, 1000);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='flex justify-center items-center h-screen dark:bg-gray-800 dark:text-white'>
            <div className={`mt-8 sm:mt-14 bg-background dark:bg-gray-700 shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-2/3 h-5/6 flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto`}>
                <div className="flex-1 overflow-y-auto p-4">
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
                            className='flex-1 border rounded-full py-2 px-4 mr-2 dark:bg-gray-600 dark:border-gray-600 dark:text-white bg-gray-100'
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
    );
}

export default ChatPage;
