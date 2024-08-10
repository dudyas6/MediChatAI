import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import BotImage from "@/assets/Images/transparent_background.png"

const ChatBox = ({ messages, currentUserImage }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef} 
      className="max-h-[calc(100vh-200px)] p-4 pb-48 overflow-y-auto"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${
            message.sender === 'user'
              ? 'flex justify-start'
              : 'flex justify-end'
          }`}
        >
          <div className="flex items-start space-x-2">
            {message.sender === 'user' && (
              <div className="flex items-center justify-center w-12 h-12 mr-2 rounded-full">
                <Image
                  className="w-12 h-12 rounded-full cursor-pointer"
                  src={currentUserImage}
                  alt="User"
                  width={48}
                  height={48}
                />
              </div>
            )}
            <div
              className={`flex flex-col ${
                message.sender === 'user' ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`mt-6 flex max-w-96 rounded-lg p-3 gap-3 shadow ${
                  message.sender === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {message.text}
              </div>
            </div>
            {message.sender === 'bot' && (
              <div className="flex items-center justify-center w-12 h-12 ml-2 rounded-full">
                <Image
                  className="w-12 h-12 rounded-full"
                  src={BotImage}
                  alt="Bot Avatar"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
