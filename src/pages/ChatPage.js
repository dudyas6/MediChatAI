import React, { useState } from 'react';

function ChatPage() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue-100">
            <div className="bg-white shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-2/3 h-5/6 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                            <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar" />
                            <div className="font-medium">John Doe</div>
                        </div>
                        <div className="bg-blue-100 rounded-lg p-2 shadow mb-2 max-w-sm">
                            Hi, how can I help you?
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                    <div className="flex items-center">
                        <input className="flex-1 border rounded-full py-2 px-4 mr-2" type="text" placeholder="Type your message..." />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
