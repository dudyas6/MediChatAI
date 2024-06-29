import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Navbar/Header';
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
          <div className='text-[#1d4d85] app min-w-[280px] min-h-screen bg-background'>
            <Header />
            <Main />
            {/* <Footer /> */}
          </div>
          {/* <AccessibilityMenu /> */}
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
