import { useCallback } from 'react'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function weightKey(dayId, exIdx) {
  return `nippard_weight_${dayId}_${exIdx}_${todayStr()}`
}

function lastWeightKey(dayId, exIdx) {
  return `nippard_weight_last_${dayId}_${exIdx}`
}

export function useWeightLog() {
  const getWeight = useCallback((dayId, exIdx) => {
    try {
      const today = localStorage.getItem(weightKey(dayId, exIdx))
      if (today) return parseFloat(today)
      const last = localStorage.getItem(lastWeightKey(dayId, exIdx))
      if (last) return parseFloat(last)
    } catch { /* ignore */ }
    return ''
  }, [])

  const setWeight = useCallback((dayId, exIdx, weight) => {
    try {
      const val = String(weight)
      localStorage.setItem(weightKey(dayId, exIdx), val)
      localStorage.setItem(lastWeightKey(dayId, exIdx), val)
    } catch { /* ignore */ }
  }, [])

  return { getWeight, setWeight }
}
