import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppLoader from './AppLoader.jsx'
import { BrowserRouter } from "react-router-dom"
import './styles/index.css'
import './styles/glass.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppLoader>
      <App />
    </AppLoader>
    </BrowserRouter>
  </React.StrictMode>
);
