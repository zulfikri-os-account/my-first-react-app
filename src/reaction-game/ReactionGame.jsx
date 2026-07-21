import { useState, useRef, useEffect, useCallback } from 'react'
import './ReactionGame.css'

const STORAGE_KEY = 'reaction-game-scores'
const STATES = {
  IDLE: 'idle',
  WAITING: 'waiting',
  READY: 'ready',
  TOO_SOON: 'too-soon',
  RESULT: 'result',
}

function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export default function ReactionGame() {
  const [state, setState] = useState(STATES.IDLE)
  const [lastTime, setLastTime] = useState(null)
  const [scores, setScores] = useState(loadScores)
  const timeoutRef = useRef(null)
  const startRef = useRef(0)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const start = useCallback(() => {
    setState(STATES.WAITING)
    const delay = 1000 + Math.random() * 3000
    timeoutRef.current = setTimeout(() => {
      startRef.current = performance.now()
      setState(STATES.READY)
    }, delay)
  }, [])

  const handleClick = () => {
    if (state === STATES.IDLE || state === STATES.TOO_SOON || state === STATES.RESULT) {
      start()
      return
    }

    if (state === STATES.WAITING) {
      clearTimeout(timeoutRef.current)
      setState(STATES.TOO_SOON)
      return
    }

    if (state === STATES.READY) {
      const reaction = Math.round(performance.now() - startRef.current)
      setLastTime(reaction)
      const next = [...scores, reaction].sort((a, b) => a - b).slice(0, 5)
      setScores(next)
      saveScores(next)
      setState(STATES.RESULT)
    }
  }

  const clearScores = (e) => {
    e.stopPropagation()
    setScores([])
    saveScores([])
  }

  const content = {
    [STATES.IDLE]: { label: 'Click to start', className: 'idle' },
    [STATES.WAITING]: { label: 'Wait for green...', className: 'waiting' },
    [STATES.READY]: { label: 'Click now!', className: 'ready' },
    [STATES.TOO_SOON]: { label: 'Too soon! Click to try again', className: 'too-soon' },
    [STATES.RESULT]: { label: `${lastTime} ms — click to try again`, className: 'result' },
  }[state]

  return (
    <div className="reaction-game">
      <h1>Reaction Time</h1>
      <button
        type="button"
        className={`reaction-pad ${content.className}`}
        onClick={handleClick}
      >
        {content.label}
      </button>

      <div className="scores">
        <div className="scores-header">
          <h2>Best times</h2>
          {scores.length > 0 && (
            <button type="button" className="clear-btn" onClick={clearScores}>
              Clear
            </button>
          )}
        </div>
        {scores.length === 0 ? (
          <p className="empty">No attempts yet</p>
        ) : (
          <ol>
            {scores.map((score, i) => (
              <li key={i}>{score} ms</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
