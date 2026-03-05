const CAN_VIBRATE = typeof navigator !== 'undefined' && 'vibrate' in navigator

export const PATTERNS = {
  tap: [15],
  setComplete: [20, 30, 20],
  allSetsComplete: [30, 50, 30, 50, 60],
  timerDone: [100, 80, 100, 80, 150],
  pr: [50, 40, 50, 40, 50, 40, 80],
  finish: [40, 60, 40, 60, 40, 60, 100],
}

export function vibrate(pattern = PATTERNS.tap) {
  if (!CAN_VIBRATE) return
  try {
    navigator.vibrate(pattern)
  } catch {
    // Silently fail on unsupported browsers
  }
}
