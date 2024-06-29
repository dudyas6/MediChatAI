// App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import AccessibilityMenu from './Components/Shared/AccessibilityMenu';
import { AuthProvider } from './Components/Services/AuthContext';
import { ThemeProvider } from './Components/Services/ThemeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="App dark:bg-gray-800 dark:text-white flex flex-col justify-between">
            <Navbar />
            <Main />
            <Footer />
          </div>
          <AccessibilityMenu />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
