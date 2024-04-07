import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppProviders from './AppProviders.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)
