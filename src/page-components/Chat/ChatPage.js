import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ChatHistory from './ChatHistory';
import { useAuth } from '@/controllers/auth.controller';
import {
  postChatSession,
  getChatHistoryFromDB,
} from '@/controllers/chat.controller';
import { defaultSession } from '@/components/Shared/Consts';
import SectionWrapper from '../Home/SectionWrapper';
import User from '@/assets/Logos/User.jpg';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState(null);
  const [currentSession, setCurrentSession] = useState(defaultSession);
  const { currentUser, loading } = useAuth();
  const [currentUserImage, setCurrentUserImage] = useState(User);
  const [isNewChat, setIsNewChat] = useState(false); // Track new chat session

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (loading && !currentUser) return;
    if (currentUser) {
      currentSession.user = currentUser.username;
      setCurrentUserImage(
        currentUser.details.profilePicture
          ? currentUser.details.profilePicture
          : User
      );
      setCurrentSession(currentSession);
      fetchHistory(currentUser);
    } else {
      setCurrentUserImage(User);
    }
  }, [loading]);

  const fetchHistory = async (user) => {
    setIsFetchingHistory(true);
    const res = await getChatHistoryFromDB(user);
    setChatHistory(res);
    setIsFetchingHistory(false);
  };

  const handleSend = async () => {
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      const botReply = { text: '...', sender: 'bot' };
      // Update Live Chat with user's message
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      const finalMessages = [...updatedMessages, botReply];
      // Update Session
      currentSession.messages = finalMessages;
      setCurrentSession(currentSession);
      // Update Live Chat with bot's message
      setInput('');
      setTimeout(() => {
        setMessages(finalMessages);
      }, 1000);

      await postChatSession(
        currentUser ? currentUser.username : 'guest',
        currentSession
      )
        .then(async ({ success, message: responseMsg }) => {
          if (!success) console.log(responseMsg);
          await fetchHistory(currentUser); // Re-fetch chat history
        })
        .catch((error) => {
          console.error('Error posting chat session:', error);
        });
      setIsNewChat(false);
    }
  };

  const handleNewChat = () => {
    if (isNewChat) {
      // If a new chat session is already active, reset it
      setCurrentSession({ ...defaultSession, name: 'New Chat' });
      setMessages([]);
    } else {
      // Create a new chat session
      setIsNewChat(true);
      setCurrentSession({ ...defaultSession, name: 'New Chat' });
      setMessages([]);
    }
  };

  const handleChatHistoryClick = (history) => {
    setIsNewChat(false); // Reset new chat state when selecting from history
    setCurrentSession(history);
    setMessages(history.messages);
  };

  return (
    <SectionWrapper>
      <div className="flex items-center justify-center h-screen dark:bg-gray-800 dark:text-white">
        <div className="flex w-full h-full">
          <ChatHistory
            handleChatHistoryClick={handleChatHistoryClick}
            handleNewChat={handleNewChat}
            chatHistory={chatHistory}
            isFetchingHistory={isFetchingHistory}
            isNewChat={isNewChat} // Pass new chat state
          />
          <div className="flex flex-col w-3/4 rounded-lg shadow-lg bg-background dark:bg-gray-700">
            <div className="flex-1 p-4 overflow-y-auto">
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
                      <Image
                        className="cursor-pointer w-10 h-10 rounded-full"
                        src={currentUserImage}
                        alt="User"
                        width={40}
                        height={40}
                      />
                    )}
                    {message.sender === 'bot' && (
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-male-medical-doctor-icon-png-image_3708206.jpg"
                        alt="Bot Avatar"
                      />
                    )}
                    <div className="flex flex-col">
                      <div className="font-medium">
                        {message.sender === 'user' ? 'User' : 'Bot'}
                      </div>
                      <div
                        className={`rounded-lg p-2 shadow max-w-sm ${
                          message.sender === 'user'
                            ? 'bg-blue-400'
                            : 'bg-gray-400'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 rounded dark:bg-gray-600 dark:border-gray-600 dark:text-white">
              <div className="flex items-center">
                <input
                  className="flex-1 px-4 py-2 mr-2 bg-gray-100 border rounded-full dark:bg-gray-600 dark:border-gray-600 dark:text-white"
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
    </SectionWrapper>
  );
}

export default ChatPage;
