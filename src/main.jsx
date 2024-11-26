import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './contexts/app_context.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <Router future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>
);