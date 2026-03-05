import { useState, useRef, useCallback, useEffect } from 'react'
import { vibrate, PATTERNS } from '../utils/haptics'

export function useRestTimer() {
  const [remaining, setRemaining] = useState(0)
  const [total, setTotal] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef(null)
  const endTimeRef = useRef(null)

  const start = useCallback((seconds) => {
    setTotal(seconds)
    setRemaining(seconds)
    setIsActive(true)
    endTimeRef.current = Date.now() + seconds * 1000
  }, [])

  const cancel = useCallback(() => {
    setIsActive(false)
    setRemaining(0)
    setTotal(0)
    clearInterval(intervalRef.current)
  }, [])

  const addTime = useCallback((seconds) => {
    if (!isActive) return
    endTimeRef.current += seconds * 1000
    setTotal(prev => prev + seconds)
  }, [isActive])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        const left = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
        setRemaining(left)
        if (left <= 0) {
          setIsActive(false)
          clearInterval(intervalRef.current)
          vibrate(PATTERNS.timerDone)
        }
      }, 250)
    }
    return () => clearInterval(intervalRef.current)
  }, [isActive])

  const progress = total > 0 ? (total - remaining) / total : 0

  return { remaining, total, isActive, progress, start, cancel, addTime }
}
