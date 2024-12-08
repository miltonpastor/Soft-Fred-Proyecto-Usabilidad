import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameRoutes from './routes/GameRoutes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameRoutes />
  </StrictMode>,
)
