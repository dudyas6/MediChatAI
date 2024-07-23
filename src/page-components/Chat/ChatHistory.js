import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import { getChatHistoryFromDB } from '@/controllers/chat.controller';

const ChatHistory = ({
  handleChatHistoryClick,
  handleNewChat,
  chatHistory,
  isNewChat,
}) => {
  return (
    <div className="w-1/4 p-4 overflow-y-auto bg-gray-200 dark:bg-gray-700">
      <div className="flex items-center gap-10 mb-4">
        <h2 className="font-medium">Chat History</h2>
        <button
          className="px-2 py-1 ml-4 text-white bg-blue-500 rounded sm:flex-col"
          onClick={handleNewChat}
        >
          New Chat
        </button>
      </div>
      {isNewChat && (
        <div className="mb-4 cursor-pointer" onClick={handleNewChat}>
          <div className="p-2 bg-gray-300 rounded dark:bg-gray-600">
            New Chat
          </div>
        </div>
      )}
      {chatHistory &&
        [...chatHistory].reverse().map((history) => (
          <div
            key={history._id}
            className="mb-4 cursor-pointer"
            onClick={() => handleChatHistoryClick(history)}
          >
            <div className="p-2 bg-gray-300 rounded dark:bg-gray-600">
              Chat {history._id}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatHistory;
