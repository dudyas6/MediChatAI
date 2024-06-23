// src/pages/ProfilePage.js
import React from 'react';
import { useAuth } from '../services/AuthContext';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
