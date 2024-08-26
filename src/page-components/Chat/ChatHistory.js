import React, { useState, useEffect } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import {
  getChatHistoryFromDB,
  deleteChatFromHistory,
} from '@/controllers/chat.controller';
import chatLogo from '@/assets/Images/transparent_background.png';
import Image from 'next/image';

const ChatHistory = ({
  handleChatHistoryClick,
  handleNewChat,
  chatHistory,
  setChatHistory,
  setIsNewChat,
  currentSession,
}) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [guest, setGuest] = useState(false);
  const { currentUser } = useAuth();


  useEffect(() => {
    setGuest(!currentUser);
  }, [currentUser]);

  const truncateToWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };
  
  const handleDeleteChat = async (event, chatId) => {
    event.stopPropagation();

    try {
      await deleteChatFromHistory(chatId);
      const updatedChatHistory = await getChatHistoryFromDB(currentUser);
      setChatHistory(updatedChatHistory);
      setIsNewChat(true);
      handleNewChat();
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleChatClick = (chatId) => {
    const chat = chatHistory.find((chat) => chat.id === chatId);
    handleChatHistoryClick(chat);
    setSelectedChatId(chatId);
  };

  return (
    <div className="w-1/4 bg-white border-r border-gray-300 dark:bg-gray-800 dark:text-white">
      <header className="flex items-center justify-between p-4 text-white bg-indigo-600 border-b border-gray-300 dark:bg-gray-400">
        <h1 className="text-2xl font-semibold">Chat History</h1>
        <div>
          <button onClick={handleNewChat}>New Chat</button>
        </div>
      </header>
      <div className="h-screen p-3 pb-20 overflow-y-auto mb-9">
        {guest ? (
          <div className="text-center text-gray-500 dark:text-white">
            To see history, please Login or Register
          </div>
        ) : (
          chatHistory && chatHistory.length > 0 ? (
            [...chatHistory].reverse().map((history) => (
              <div
                key={history.id}
                className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => handleChatClick(history.id)}
              >
                <div className="w-12 h-12 mr-3 bg-gray-200 rounded-full">
                  <Image
                    src={chatLogo}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{history.name}</h2>
                  <p className="text-gray-600 dark:text-white">
                    {truncateToWords(history.messages[history.messages.length - 1]?.text, 12)}
                  </p>
                  {selectedChatId === history.id &&
                    currentSession.id === history.id && (
                      <button
                        onClick={(event) =>
                          handleDeleteChat(event, history.id)
                        }
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No History. Start a new Chat
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
