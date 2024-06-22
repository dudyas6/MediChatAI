import './assets/style/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './components/Main';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
          <Navbar />
          <Main />
          <Footer />
    </Router>
  );
}

export default App;
