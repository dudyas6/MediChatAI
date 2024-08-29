import React, { useState, useEffect, useRef } from 'react';
import ChatHistory from './ChatHistory';
import { useAuth } from '@/controllers/auth.controller';
import {
  postChatSession,
  getChatHistoryFromDB,
  sendMessageToOPENAI,
} from '@/controllers/chat.controller';
import { defaultSession } from '@/components/Shared/Consts';
import SectionWrapper from '../Home/SectionWrapper';
import User from '@/assets/Logos/User.jpg';
import ChatBox from './ChatBox';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState(null);
  const [currentSession, setCurrentSession] = useState(defaultSession);
  const { currentUser, loading } = useAuth();
  const [currentUserImage, setCurrentUserImage] = useState(User);
  const [isNewChat, setIsNewChat] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (loading && !currentUser) return;
    if (currentUser) {
      currentSession.user = currentUser.username;
      setCurrentUserImage(
        currentUser.details.profilePhoto
          ? currentUser.details.profilePhoto
          : User
      );
      fetchHistory(currentUser);
    } else {
      setCurrentUserImage(User);
    }
    handleNewChat();
  }, [loading]);

  const fetchHistory = async (user) => {
    setIsFetchingHistory(true);
    const res = await getChatHistoryFromDB(user);
    if (res.length === 0) handleNewChat();
    setChatHistory(res);
    setIsFetchingHistory(false);
    return res;
  };

  const handleSend = async () => {
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      const botWaitingMsg = { text: '. . .', sender: 'bot' };
      const updatedMessages = [...messages, newMessage, botWaitingMsg];
      setInput('');
      setMessages(updatedMessages);
      const response = await sendMessageToOPENAI(
        input,
        currentUser,
        currentSession
      );
      const botReply = { text: response.reply, sender: 'bot' };
      const finalMessages = [...messages, newMessage, botReply];
      currentSession.messages = finalMessages;

      setCurrentSession(currentSession);
      setTimeout(() => {
        setMessages(finalMessages);
      }, 1000);

      try {
        if (currentUser) {
          const { success, message: responseMsg } = await postChatSession(
            currentUser ? currentUser.username : 'guest',
            currentSession
          );

          if (success) {
            const historyResponse = await fetchHistory(currentUser);
            const matchedHistory = historyResponse.find(
              (history) => history.id === responseMsg.id
            );

            if (matchedHistory) {
              handleChatHistoryClick(matchedHistory);
            } else {
              console.warn('No matching chat history found.');
            }
          }
        }
      } catch (error) {
        console.error('Error posting chat session or fetching history:', error);
      }

      setIsNewChat(false);
    }
  };

  const handleNewChat = () => {
    if (isNewChat) {
      setCurrentSession({ ...defaultSession, name: 'New Chat' });
      setMessages([]);
    } else {
      setIsNewChat(true);
      setCurrentSession({ ...defaultSession, name: 'New Chat' });
      setMessages([]);
    }
  };

  const handleChatHistoryClick = (history) => {
    setIsNewChat(false);
    setCurrentSession(history);
    setMessages(history.messages);
  };

  return (
    <SectionWrapper>
      <div className="flex overflow-hidden max-h-[calc(100vh-200px)] ">
        <ChatHistory
          handleChatHistoryClick={handleChatHistoryClick}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          isFetchingHistory={isFetchingHistory}
          setIsNewChat={setIsNewChat}
          handleNewChat={handleNewChat}
          currentSession={currentSession}
        />
        <div className="relative flex-col flex-1 ">
          <div className="p-4 text-gray-700 bg-white dark:bg-gray-700 dark:text-white">
            <h1 className="text-2xl font-semibold">{currentSession.name}</h1>
          </div>
          <ChatBox messages={messages} currentUserImage={currentUserImage} />
          <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300 dark:bg-gray-800">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded-md"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ChatPage;
