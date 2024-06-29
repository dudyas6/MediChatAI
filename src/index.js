import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Style/index.css';
// import './assets/style/theme.css';
// import './assets/style/loopple/loopple.css';
import App from './App';
import reportWebVitals from './Components/Shared/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
