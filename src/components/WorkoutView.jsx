import { useState, useMemo } from 'react'
import { DAYS } from '../data/workouts'
import DaySelector from './DaySelector'
import ExerciseCard from './ExerciseCard'
import TipsAccordion from './TipsAccordion'
import { useWorkoutHistory, collectCompletedSets } from '../hooks/useWorkoutHistory'

export default function WorkoutView({ day, activeId, onChangeDay, onDemo }) {
  const [expandedEx, setExpandedEx] = useState(null)
  const { logWorkout, isLoggedToday } = useWorkoutHistory()
  const [justLogged, setJustLogged] = useState(false)

  const switchDay = (id) => {
    onChangeDay(id)
    setExpandedEx(null)
  }

  const completedSets = useMemo(() => {
    return collectCompletedSets(activeId, day.exercises.length)
  }, [activeId, day.exercises.length])

  const totalSets = day.exercises.reduce((sum, ex) => sum + ex.sets, 0)
  const doneSets = completedSets.reduce((sum, arr) => sum + arr.length, 0)
  const logged = isLoggedToday(activeId)

  const handleFinish = () => {
    if (logged || justLogged) return
    logWorkout(activeId, day.label, day.exercises)
    setJustLogged(true)
    setTimeout(() => setJustLogged(false), 2500)
  }

  return (
    <section aria-label="Workout exercises">
      <DaySelector days={DAYS} activeId={activeId} onSelect={switchDay} />

      {/* Day header */}
      <div
        className="day-header"
        style={{ background: day.bg, border: `1px solid ${day.accent}25` }}
      >
        <div>
          <div className="day-header__title" style={{ color: day.accent }}>
            {day.label} &mdash; {day.tag}
          </div>
          <div className="day-header__focus">{day.focus}</div>
        </div>
        <div className="day-header__day" style={{ color: day.accent }}>
          {day.day}
        </div>
      </div>

      {/* Hint banner */}
      <div
        className="hint-banner"
        style={{ background: `${day.accent}0C`, border: `1px solid ${day.accent}20` }}
      >
        <span style={{ color: day.accent }}>&#x25B6;</span>
        Tap <strong style={{ color: day.accent }}>Demo</strong> to see how it&rsquo;s done &middot; Tap card for cues + set tracker
      </div>

      {/* Exercise cards */}
      <div className="exercise-list">
        {day.exercises.map((ex, i) => (
          <ExerciseCard
            key={`${activeId}-${i}`}
            ex={ex}
            index={i}
            accent={day.accent}
            dayId={activeId}
            expanded={expandedEx === i}
            onToggle={() => setExpandedEx(expandedEx === i ? null : i)}
            onDemo={onDemo}
          />
        ))}
      </div>

      {/* Finish Workout button */}
      {doneSets > 0 && (
        <button
          className={`finish-btn ${logged || justLogged ? 'finish-btn--logged' : ''}`}
          style={{ background: day.accent }}
          onClick={handleFinish}
          disabled={logged || justLogged}
        >
          {logged || justLogged
            ? '\u2705 Workout Logged!'
            : `Finish Workout`
          }
          {!logged && !justLogged && (
            <div className="finish-btn__sub">{doneSets}/{totalSets} sets completed</div>
          )}
        </button>
      )}

      <TipsAccordion accent={day.accent} />
    </section>
  )
}
