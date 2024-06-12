import './assets/style/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (  
    <Router>
      <div className="relative z-0 h-full w-full overflow-hidden flex flex-col min-h-screen bg-blue-100">
        <div className='flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary'>
          <Navbar />
        </div>
        <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden pt-16'>
          <Routes>
            {/* <Route element={<AuthenticatedLayout </Route>/>}>
              <Route
                path="/"
                element={
                  currentUser ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginPage />
                  )
                }
              /> */}
              <Route path="/" exact element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </Router>
);
} 

export default App;
