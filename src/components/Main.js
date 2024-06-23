import React from 'react';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/ContactPage';
import ChatPage from '../pages/ChatPage';
import RegisterPage from '../pages/RegisterPage';
// import SecondaryRegisterPage from '../pages/SecondaryRegisterPage';
import ProfilePage from '../pages/ProfilePage';
// import { useAuth } from '../services/AuthContext';
import { Routes, Route } from 'react-router-dom';

function Main() {
    return (
        <div className='mt-16 bg-blue-50'>
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