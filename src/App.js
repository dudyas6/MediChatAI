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
      <div className="flex flex-col min-h-screen bg-blue-100">
        <div className='flex-none h-1/5'>
          <Navbar />
        </div>
        <div className='flex-auto'>
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
