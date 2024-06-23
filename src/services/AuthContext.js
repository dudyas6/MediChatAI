// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setCurrentUser(response.data);
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (username, password, navigateHome = true) => {
    const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
    console.log(response);
    console.log("Setting Token!");
    localStorage.setItem('token', response.data.token);
    console.log("Authenticating User!");
    const user = await axios.get('http://localhost:3001/api/auth/profile', {
      headers: { Authorization: `Bearer ${response.data.token}` }
    });
    console.log(user);
    console.log("Setting and Navigating");
    setCurrentUser(user.data);
    if (navigateHome)
      navigate('/')

  };

  const register = async (username, password) => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username,
        password,
      });
      login(username, password, false);
      return { success: true, message: "Account created successfully!" };
    } catch (error) {
      return { success: false, message: error.response.data || "An error occurred!" };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
