import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="max-w-xl mx-auto pb-10">
      <App />
    </div>
  </StrictMode>,
)
