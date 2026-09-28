import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/400.css'
import '@fontsource-variable/manrope/wght.css'
import './index.css'
import App from './App.jsx'

// Mesure d'audience Vercel, sans cookie : activée uniquement si VITE_ENABLE_ANALYTICS=true (voir DEPLOIEMENT.md).
if (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
  import('@vercel/analytics').then(({ inject }) => inject({ mode: 'production' }))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
