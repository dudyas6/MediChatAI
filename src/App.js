import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

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
              <Route path='/login' element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
);
} 

export default App;
