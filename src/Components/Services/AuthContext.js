import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setCurrentUser(response.data);
      }).catch(error => {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (username, password, navigateHome = true) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      const user = await axios.get('http://localhost:3001/api/auth/profile', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      setCurrentUser(user.data);
      return { success: true, message: "Login successfuly, moving to homepage." };
    } catch (error) {
      if (error.response) {
        return { success: false, message: error.response.data || "Login failed. Please try again." };
      } else if (error.request) {
        return { success: false, message: "Server is currently unavailable, Please try again later." };
      } else {
        return { success: false, message: "An unexpected error occurred, Please try again later." };
      }
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username,
        password,
      });
      return { success: true, message: "Account created successfully!" };
    } catch (error) {
      if (error.response) {
        return { success: false, message: error.response.data || "Registration failed. Please try again." };
      } else if (error.request) {
        return { success: false, message: "Server is currently unavailable, Please try again later." };
      } else {
        return { success: false, message: "An unexpected error occurred, Please try again later." };
      }
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
