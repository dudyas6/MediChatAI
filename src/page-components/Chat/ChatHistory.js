import React, { useState,useEffect } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import { getChatHistoryFromDB, deleteChatFromHistory } from '@/controllers/chat.controller';

const ChatHistory = ({
  handleChatHistoryClick,
  handleNewChat,
  chatHistory,
  setChatHistory,
  setIsNewChat,
  currentSession,
}) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { currentUser } = useAuth();
  
  

  const handleDeleteChat = async (event, chatId) => {
    event.stopPropagation();
  
    try {
      await deleteChatFromHistory(chatId);;
      const updatedChatHistory = await getChatHistoryFromDB(currentUser);
      setChatHistory(updatedChatHistory);
      setIsNewChat(true);
      handleNewChat();
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };
  


  const handleChatClick = (chatId) => {
    const chat = chatHistory.find(chat => chat.chat_id === chatId);
    handleChatHistoryClick(chat);
    setSelectedChatId(chatId);
  };

  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <header className="flex items-center justify-between p-4 text-white bg-indigo-600 border-b border-gray-300">
        <h1 className="text-2xl font-semibold">Chat History</h1>
        <div>
          <button onClick={handleNewChat}>
            New Chat
          </button>
        </div>
      </header>
      <div className="h-screen p-3 pb-20 overflow-y-auto mb-9">
        {chatHistory &&
          [...chatHistory].reverse().map((history) => (
            <div
              key={history.chat_id}
              className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleChatClick(history.chat_id)}
            >
              <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Chat {history.chat_id}</h2>
                <p className="text-gray-600">Last message placeholder</p>
                {selectedChatId === history.chat_id && currentSession.chat_id === history.chat_id && (
                  <button
                    onClick={(event) => handleDeleteChat(event, history.chat_id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatHistory;
