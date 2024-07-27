// components/ChatBox.js

import React from 'react';
import Image from 'next/image';

const ChatBox = ({ messages, currentUserImage }) => {
  return (
    <div className="h-screen overflow-y-auto p-4 pb-64">
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
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-2">
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
              <div className="w-12 h-12 rounded-full flex items-center justify-center ml-2">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-male-medical-doctor-icon-png-image_3708206.jpg"
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
