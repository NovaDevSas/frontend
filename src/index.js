import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Add this line to import global CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);