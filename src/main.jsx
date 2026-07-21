import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactionGame from './reaction-game/ReactionGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactionGame />
  </StrictMode>,
)
