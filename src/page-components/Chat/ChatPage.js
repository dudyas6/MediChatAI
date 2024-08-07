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
      const response = await sendMessageToOPENAI(input, currentUser); // send message to OpenAI API
      const newMessage = { text: input, sender: 'user' };
      const botReply = { text: response.reply, sender: 'bot' };
      setInput('');
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      const finalMessages = [...updatedMessages, botReply];
      currentSession.messages = finalMessages;

      setCurrentSession(currentSession);
      setTimeout(() => {
        setMessages(finalMessages);
      }, 1000);

      try {
        const { success, message: responseMsg } = await postChatSession(
          currentUser ? currentUser.username : 'guest',
          currentSession
        );

        if (success) {
          const historyResponse = await fetchHistory(currentUser);

          // Find the chat history object that matches the responseMsg.id
          const matchedHistory = historyResponse.find(
            (history) => history.id === responseMsg.id
          );

          console.log(responseMsg);
          console.log('Matched chat history:', matchedHistory);

          if (matchedHistory) {
            handleChatHistoryClick(matchedHistory);
          } else {
            console.warn('No matching chat history found.');
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
      <div className="flex max-h-[900px] overflow-hidden">
        <ChatHistory
          handleChatHistoryClick={handleChatHistoryClick}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          isFetchingHistory={isFetchingHistory}
          setIsNewChat={setIsNewChat}
          handleNewChat={handleNewChat}
          currentSession={currentSession}
        />
        <div className="relative flex-col flex-1">
          <div className="p-4 text-gray-700 bg-white">
            <h1 className="text-2xl font-semibold">{currentSession.name}</h1>
          </div>
          <ChatBox messages={messages} currentUserImage={currentUserImage} />
          <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300">
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
