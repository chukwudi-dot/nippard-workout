import { useLocalStorage } from './useLocalStorage'
import { loadJSON } from '../utils/storage'

const HISTORY_KEY = 'history'
const MAX_ENTRIES = 200

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function useWorkoutHistory() {
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, [])

  const logWorkout = (dayId, dayLabel, exercises) => {
    const today = todayStr()
    const completedSets = collectCompletedSets(dayId, exercises.length)

    const entry = {
      date: today,
      dayId,
      dayLabel,
      exercises: exercises.map((ex, i) => ({
        name: ex.name,
        setsCompleted: (completedSets[i] || []).length,
        setsTotal: ex.sets,
        reps: ex.reps,
      })),
      completedAt: new Date().toISOString(),
    }

    setHistory(prev => {
      const updated = [entry, ...prev]
      return updated.slice(0, MAX_ENTRIES)
    })
  }

  const isLoggedToday = (dayId) => {
    const today = todayStr()
    return history.some(h => h.dayId === dayId && h.date === today)
  }

  const getHistoryForDay = (dayId) => {
    return history.filter(h => h.dayId === dayId)
  }

  const getLastWorkout = (dayId) => {
    return history.find(h => h.dayId === dayId) || null
  }

  const getWeekCount = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    return history.filter(h => h.date >= weekAgo).length
  }

  return { history, logWorkout, isLoggedToday, getHistoryForDay, getLastWorkout, getWeekCount }
}

function collectCompletedSets(dayId, exerciseCount) {
  const today = todayStr()
  const result = []
  for (let i = 0; i < exerciseCount; i++) {
    const key = `nippard_sets_${dayId}_${i}_${today}`
    try {
      result.push(JSON.parse(localStorage.getItem(key) || '[]'))
    } catch {
      result.push([])
    }
  }
  return result
}

export { collectCompletedSets }
