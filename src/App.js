// App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import AccessibilityMenu from './components/AccessibilityMenu';
import { AuthProvider } from './services/AuthContext';
import { ThemeProvider } from './services/ThemeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="App dark:bg-gray-800 dark:text-white">
            <Navbar />
            <Main />
            <Footer />
            <AccessibilityMenu />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
