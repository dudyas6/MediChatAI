import './assets/style/App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './components/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './services/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <Main />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
