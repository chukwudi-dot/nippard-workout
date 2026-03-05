import { useState, useRef, useCallback, useEffect } from 'react'

export function useSessionTimer() {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const start = useCallback(() => {
    if (isRunning) return
    startTimeRef.current = Date.now() - elapsed * 1000
    setIsRunning(true)
  }, [isRunning, elapsed])

  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setElapsed(0)
    startTimeRef.current = null
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const formatTime = useCallback((secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [])

  return { elapsed, isRunning, start, stop, reset, formatted: formatTime(elapsed) }
}
