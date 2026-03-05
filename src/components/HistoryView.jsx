import { useCallback } from 'react'
import { DAYS } from '../data/workouts'
import { useWorkoutHistory } from '../hooks/useWorkoutHistory'
import VolumeChart from './VolumeChart'

export default function HistoryView({ accent }) {
  const { history, getHistoryForDay, getWeekCount } = useWorkoutHistory()

  const weekCount = getWeekCount()
  const totalWorkouts = history.length

  const overloadData = DAYS.map(d => {
    const dayHistory = getHistoryForDay(d.id).slice(0, 4)
    const dots = dayHistory.map(h => {
      const totalSets = h.exercises.reduce((sum, ex) => sum + ex.setsTotal, 0)
      const doneSets = h.exercises.reduce((sum, ex) => sum + ex.setsCompleted, 0)
      return doneSets >= totalSets
    })
    return { label: d.label, accent: d.accent, dots }
  })

  const exportCSV = useCallback(() => {
    if (history.length === 0) return
    const rows = [['Date', 'Workout', 'Duration (min)', 'Exercise', 'Sets Done', 'Sets Total', 'Reps', 'Weight (lbs)', 'Muscle']]
    history.forEach(h => {
      h.exercises.forEach(ex => {
        rows.push([
          h.date,
          h.dayLabel,
          h.duration ? Math.round(h.duration / 60) : '',
          ex.name,
          ex.setsCompleted,
          ex.setsTotal,
          ex.reps,
          ex.weight || '',
          ex.muscle || '',
        ])
      })
    })
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nippard-workout-log-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [history])

  if (history.length === 0) {
    return (
      <section className="history__empty" aria-label="Workout history">
        <div className="history__empty-icon">&#x1F4CA;</div>
        <div className="history__empty-text">No workouts logged yet</div>
        <div className="history__empty-hint">
          Complete a workout and tap &ldquo;Finish Workout&rdquo; to start tracking
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Workout history">
      {/* Summary */}
      <div className="history__summary">
        <div className="history__summary-title" style={{ color: accent }}>
          Your Progress
        </div>
        <div className="history__stats-row">
          <div className="history__stat-box">
            <div className="history__stat-number" style={{ color: accent }}>{totalWorkouts}</div>
            <div className="history__stat-desc">Total workouts</div>
          </div>
          <div className="history__stat-box">
            <div className="history__stat-number" style={{ color: accent }}>{weekCount}</div>
            <div className="history__stat-desc">This week</div>
          </div>
        </div>

        {/* Progressive overload dots */}
        <div className="history__overload">
          <p className="history__overload-label">Consistency (last 4 sessions)</p>
          {overloadData.map(d => (
            <div key={d.label} className="history__overload-row">
              <div className="history__overload-day" style={{ color: d.accent }}>{d.label}</div>
              <div className="history__overload-dots">
                {d.dots.length === 0 ? (
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>&mdash;</span>
                ) : (
                  d.dots.map((filled, i) => (
                    <div
                      key={i}
                      className={`history__overload-dot ${filled ? 'history__overload-dot--filled' : ''}`}
                      style={filled ? { borderColor: d.accent, background: d.accent } : undefined}
                      aria-label={filled ? 'Completed' : 'Incomplete'}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Chart */}
      <VolumeChart history={history} accent={accent} />

      {/* Export */}
      <button
        className="history__export-btn"
        style={{ color: accent, borderColor: `${accent}30` }}
        onClick={exportCSV}
      >
        Export CSV
      </button>

      {/* Workout log */}
      <p className="history__log-label">Recent Workouts</p>
      {history.slice(0, 20).map((h, i) => {
        const totalSets = h.exercises.reduce((sum, ex) => sum + ex.setsTotal, 0)
        const doneSets = h.exercises.reduce((sum, ex) => sum + ex.setsCompleted, 0)
        const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0
        const dayData = DAYS.find(d => d.id === h.dayId)
        const color = dayData?.accent || accent
        const durationMin = h.duration ? Math.round(h.duration / 60) : null

        return (
          <div key={i} className="history__entry">
            <div className="history__entry-header">
              <div className="history__entry-day" style={{ color }}>{h.dayLabel}</div>
              <div className="history__entry-date">{formatDate(h.date)}</div>
            </div>
            <div className="history__entry-bar">
              <div
                className="history__entry-fill"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
            <div className="history__entry-meta">
              <span>{doneSets}/{totalSets} sets &middot; {pct}%</span>
              {durationMin && <span>{durationMin} min</span>}
            </div>
          </div>
        )
      })}
    </section>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
