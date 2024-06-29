import React from 'react';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/LoginPage';
import ContactPage from './Pages/ContactPage';
import ChatPage from './Pages/ChatPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';

import { Routes, Route } from 'react-router-dom';

function Main() {
    return (
        <div className='bg-blue-50'>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/profile" element={<SecondaryRegisterPage />} /> */}
        </Routes>
        </div>
    );
}

export default Main;