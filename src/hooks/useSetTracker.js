import { useLocalStorage } from './useLocalStorage'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function useSetTracker(dayId, exerciseIndex, totalSets) {
  const storageKey = `sets_${dayId}_${exerciseIndex}_${todayKey()}`
  const [done, setDone] = useLocalStorage(storageKey, [])

  const toggle = (setIndex) => {
    setDone(prev =>
      prev.includes(setIndex)
        ? prev.filter(x => x !== setIndex)
        : [...prev, setIndex]
    )
  }

  const allDone = done.length === totalSets

  return { done, toggle, allDone }
}
