import { memo, useMemo } from 'react'

const MUSCLE_COLORS = {
  'Chest': '#E8FF47',
  'Back': '#FF6B35',
  'Shoulders': '#A78BFA',
  'Quads': '#34D399',
  'Hamstrings': '#F59E0B',
  'Glutes': '#EC4899',
  'Biceps': '#38BDF8',
  'Triceps': '#FB923C',
  'Side Delts': '#C084FC',
  'Rear Delts': '#818CF8',
  'Lats': '#F97316',
  'Upper Chest': '#FACC15',
}

const VolumeChart = memo(function VolumeChart({ history, accent }) {
  const volumeData = useMemo(() => {
    // last 7 days
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    const recent = history.filter(h => h.date >= weekAgo)

    const muscles = {}
    recent.forEach(h => {
      h.exercises.forEach(ex => {
        const muscle = ex.muscle || 'Other'
        muscles[muscle] = (muscles[muscle] || 0) + ex.setsCompleted
      })
    })

    const entries = Object.entries(muscles)
      .sort(([, a], [, b]) => b - a)
    const maxSets = entries.length > 0 ? entries[0][1] : 0

    return entries.map(([muscle, sets]) => ({
      muscle,
      sets,
      pct: maxSets > 0 ? (sets / maxSets) * 100 : 0,
      color: MUSCLE_COLORS[muscle] || accent,
    }))
  }, [history, accent])

  if (volumeData.length === 0) return null

  return (
    <div className="volume-chart">
      <p className="volume-chart__title" style={{ color: accent }}>Weekly Volume</p>
      <p className="volume-chart__subtitle">Sets per muscle group (last 7 days)</p>
      <div className="volume-chart__bars">
        {volumeData.map(d => (
          <div key={d.muscle} className="volume-chart__row">
            <div className="volume-chart__muscle">{d.muscle}</div>
            <div className="volume-chart__bar-track">
              <div
                className="volume-chart__bar-fill"
                style={{ width: `${d.pct}%`, background: d.color }}
              />
            </div>
            <div className="volume-chart__sets" style={{ color: d.color }}>{d.sets}</div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default VolumeChart
