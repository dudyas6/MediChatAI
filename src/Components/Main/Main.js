import React from 'react';
import HomePage from './Home/HomePage';
import LoginPage from './Login/LoginPage';
import ChatPage from './Chat/ChatPage';
import RegisterPage from './Register/RegisterPage';
import ProfilePage from './Profile/ProfilePage';

import { Routes, Route } from 'react-router-dom';

function Main() {
    return (
      <div className='text-[#1d4d85] app min-w-[280px] bg-background min-h-screen'>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    );
}

export default Main;