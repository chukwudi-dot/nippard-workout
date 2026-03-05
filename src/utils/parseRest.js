/**
 * Parse rest time strings like "3–4 min", "1–2 min", "1 min" into seconds.
 * Takes the first (minimum) number and converts to seconds.
 */
export function parseRestSeconds(restStr) {
  if (!restStr) return 120
  const match = restStr.match(/(\d+)/)
  if (!match) return 120
  return parseInt(match[1], 10) * 60
}
