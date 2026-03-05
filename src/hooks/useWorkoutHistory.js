import { useLocalStorage } from './useLocalStorage'

const HISTORY_KEY = 'history'
const MAX_ENTRIES = 200

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function useWorkoutHistory() {
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, [])

  const logWorkout = (dayId, dayLabel, exercises, duration = 0, weights = []) => {
    const today = todayStr()
    const completedSets = collectCompletedSets(dayId, exercises.length)

    const entry = {
      date: today,
      dayId,
      dayLabel,
      duration,
      exercises: exercises.map((ex, i) => ({
        name: ex.name,
        setsCompleted: (completedSets[i] || []).length,
        setsTotal: ex.sets,
        reps: ex.reps,
        weight: weights[i] || 0,
        muscle: ex.muscle,
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

  const getStreak = () => {
    if (history.length === 0) return 0
    const uniqueDates = [...new Set(history.map(h => h.date))].sort().reverse()
    const today = todayStr()
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0
    let streak = 1
    for (let i = 1; i < uniqueDates.length; i++) {
      const prev = new Date(uniqueDates[i - 1] + 'T00:00:00')
      const curr = new Date(uniqueDates[i] + 'T00:00:00')
      if ((prev - curr) / 86400000 === 1) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  return { history, logWorkout, isLoggedToday, getHistoryForDay, getLastWorkout, getWeekCount, getStreak }
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
