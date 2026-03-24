import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom' // Sadece burada kalsın

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* Tek ve ana sarmalayıcı */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)