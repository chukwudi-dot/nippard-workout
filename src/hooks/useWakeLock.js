import { useRef, useCallback, useEffect } from 'react'

export function useWakeLock() {
  const wakeLockRef = useRef(null)
  const wantLockRef = useRef(false)

  const isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

  const requestLock = useCallback(async () => {
    if (!isSupported || wakeLockRef.current) return
    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen')
      wakeLockRef.current.addEventListener('release', () => {
        wakeLockRef.current = null
      })
    } catch { /* silently fail */ }
  }, [isSupported])

  const acquire = useCallback(() => {
    wantLockRef.current = true
    requestLock()
  }, [requestLock])

  const release = useCallback(() => {
    wantLockRef.current = false
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isSupported) return
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && wantLockRef.current) {
        requestLock()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      release()
    }
  }, [isSupported, requestLock, release])

  return { acquire, release }
}
