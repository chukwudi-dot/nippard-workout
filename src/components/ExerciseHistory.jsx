import { memo, useMemo } from 'react'
import { formatDate } from '../utils/formatDate'

const MAX_SESSIONS = 8

const ExerciseHistory = memo(function ExerciseHistory({ history, dayId, exerciseIndex, accent }) {
  const data = useMemo(() => {
    const dayHistory = history
      .filter(h => h.dayId === dayId && h.exercises?.[exerciseIndex])
      .slice(0, MAX_SESSIONS)
      .reverse()

    if (dayHistory.length < 2) return []

    const maxWeight = Math.max(...dayHistory.map(h => h.exercises[exerciseIndex].weight || 0))

    return dayHistory.map(h => {
      const ex = h.exercises[exerciseIndex]
      return {
        date: h.date,
        weight: ex.weight || 0,
        pct: maxWeight > 0 ? ((ex.weight || 0) / maxWeight) * 100 : 0,
      }
    })
  }, [history, dayId, exerciseIndex])

  if (data.length < 2) return null

  return (
    <div className="ex-history">
      <p className="ex-history__title" style={{ color: accent }}>Weight Progression</p>
      <p className="ex-history__subtitle">Last {data.length} sessions</p>
      <div className="ex-history__bars">
        {data.map((d, i) => (
          <div key={i} className="ex-history__row">
            <div className="ex-history__date">{formatDate(d.date)}</div>
            <div className="ex-history__bar-track">
              <div
                className="ex-history__bar-fill"
                style={{ width: `${d.pct}%`, background: accent }}
              />
            </div>
            <div className="ex-history__weight" style={{ color: accent }}>
              {d.weight}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ExerciseHistory
