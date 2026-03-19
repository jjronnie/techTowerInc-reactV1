
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@marketing/App';
import { SiteSettingsProvider } from '@marketing/context/SiteSettingsContext';
import '@marketing/index.css';
import '@marketing/globals.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <SiteSettingsProvider>
        <Router>
          <App />
        </Router>
      </SiteSettingsProvider>
    </HelmetProvider>
  </React.StrictMode>
);
