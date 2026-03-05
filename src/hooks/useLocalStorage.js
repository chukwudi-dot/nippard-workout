import { useState, useCallback } from 'react'
import { loadJSON, saveJSON } from '../utils/storage'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => loadJSON(key, initialValue))

  const set = useCallback((newValue) => {
    setValue(prev => {
      const resolved = typeof newValue === 'function' ? newValue(prev) : newValue
      saveJSON(key, resolved)
      return resolved
    })
  }, [key])

  return [value, set]
}
