import React, { useState } from 'react';

function ChatPage() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div>
            <h1>Chat Page</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                onChange={(e) => handleSendMessage(e.target.value)}
            />
        </div>
    );
};

export default ChatPage;