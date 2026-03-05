import { useState, useCallback } from 'react'

function prKey(dayId, exIdx) {
  return `nippard_pr_${dayId}_${exIdx}`
}

export function usePersonalRecords() {
  const [newPRs, setNewPRs] = useState([])

  const getPR = useCallback((dayId, exIdx) => {
    try {
      const stored = localStorage.getItem(prKey(dayId, exIdx))
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }, [])

  const checkAndSetPRs = useCallback((dayId, exercises, weights) => {
    const prs = []
    exercises.forEach((ex, i) => {
      const weight = weights[i]
      if (!weight || weight <= 0) return
      const current = getPR(dayId, i)
      if (!current || weight > current.weight) {
        const record = { weight, reps: ex.reps, date: new Date().toISOString().slice(0, 10), name: ex.name }
        localStorage.setItem(prKey(dayId, i), JSON.stringify(record))
        prs.push(record)
      }
    })
    if (prs.length > 0) setNewPRs(prs)
    return prs
  }, [getPR])

  const dismissPRs = useCallback(() => {
    setNewPRs([])
  }, [])

  return { newPRs, getPR, checkAndSetPRs, dismissPRs }
}
