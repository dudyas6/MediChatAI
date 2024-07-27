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
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat History</h1>
        <div className="relative">
          <button
            id="menuButton"
            className="focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              id="menuDropdown"
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <ul className="py-2 px-3">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 2
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {chatHistory &&
          [...chatHistory].reverse().map((history) => (
            <div
              key={history._id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => handleChatHistoryClick(history)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                {' '}
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">Chat {history._id}</h2>
                <p className="text-gray-600">Last message placeholder</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatHistory;

{
  /* <div className="w-1/4 p-4 overflow-y-auto bg-gray-200 dark:bg-gray-700">
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

</div> */
}
