const PREFIX = 'nippard_'

export function loadJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — fail silently for PWA resilience
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}

export function cleanupOldSets() {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 14)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  const prefix = PREFIX + 'sets_'

  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key?.startsWith(prefix)) {
        const datePart = key.slice(key.lastIndexOf('_') + 1)
        if (datePart < cutoffStr) {
          localStorage.removeItem(key)
        }
      }
    }
  } catch {
    // ignore
  }
}
