import { useState, useMemo, useCallback } from 'react'
import { DAYS } from '../data/workouts'
import DaySelector from './DaySelector'
import ExerciseCard from './ExerciseCard'
import TipsAccordion from './TipsAccordion'
import { useWorkoutHistory, collectCompletedSets } from '../hooks/useWorkoutHistory'
import { useWeightLog } from '../hooks/useWeightLog'
import { parseRestSeconds } from '../utils/parseRest'
import { vibrate, PATTERNS } from '../utils/haptics'

const RING_SIZE = 48
const RING_STROKE = 4
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export default function WorkoutView({
  day, activeId, onChangeDay, onDemo,
  sessionTimer, restTimer, onCheckPRs,
}) {
  const [expandedEx, setExpandedEx] = useState(null)
  const { logWorkout, isLoggedToday } = useWorkoutHistory()
  const { getWeight, setWeight } = useWeightLog()
  const [justLogged, setJustLogged] = useState(false)
  const [swaps, setSwaps] = useState({})

  // Weight state for each exercise
  const [weights, setWeights] = useState(() =>
    day.exercises.map((_, i) => getWeight(activeId, i))
  )

  const handleWeightChange = useCallback((idx, val) => {
    setWeights(prev => {
      const next = [...prev]
      next[idx] = val
      return next
    })
    if (val !== '') setWeight(activeId, idx, val)
  }, [activeId, setWeight])

  const switchDay = (id) => {
    onChangeDay(id)
    setExpandedEx(null)
    setSwaps({})
    // Reload weights for new day
    const newDay = DAYS.find(d => d.id === id)
    if (newDay) {
      setWeights(newDay.exercises.map((_, i) => getWeight(id, i)))
    }
  }

  const completedSets = useMemo(() => {
    return collectCompletedSets(activeId, day.exercises.length)
  }, [activeId, day.exercises.length])

  const totalSets = day.exercises.reduce((sum, ex) => sum + ex.sets, 0)
  const doneSets = completedSets.reduce((sum, arr) => sum + arr.length, 0)
  const progress = totalSets > 0 ? doneSets / totalSets : 0
  const ringDashOffset = RING_CIRCUMFERENCE * (1 - progress)
  const logged = isLoggedToday(activeId)

  const handleSetComplete = useCallback(() => {
    // Start session timer on first set
    if (sessionTimer && !sessionTimer.isRunning) {
      sessionTimer.start()
    }
    // Start rest timer with the current exercise's rest time
    if (restTimer && expandedEx !== null) {
      const ex = day.exercises[expandedEx]
      if (ex) {
        const seconds = parseRestSeconds(ex.rest)
        restTimer.start(seconds)
      }
    }
  }, [sessionTimer, restTimer, expandedEx, day.exercises])

  const handleSwap = useCallback((idx) => {
    const ex = day.exercises[idx]
    if (!ex.swaps?.length) return
    setSwaps(prev => {
      const current = prev[idx]
      if (current === undefined) return { ...prev, [idx]: 0 }
      if (current + 1 >= ex.swaps.length) {
        const next = { ...prev }
        delete next[idx]
        return next
      }
      return { ...prev, [idx]: current + 1 }
    })
  }, [day.exercises])

  const handleFinish = () => {
    if (logged || justLogged) return
    const weightValues = weights.map(w => (typeof w === 'number' ? w : 0))
    const duration = sessionTimer?.elapsed || 0
    logWorkout(activeId, day.label, day.exercises, duration, weightValues)
    sessionTimer?.stop()
    vibrate(PATTERNS.finish)
    onCheckPRs?.(activeId, day.exercises, weightValues)
    setJustLogged(true)
    setTimeout(() => setJustLogged(false), 3000)
  }

  return (
    <section aria-label="Workout exercises">
      <DaySelector days={DAYS} activeId={activeId} onSelect={switchDay} />

      {/* Day header with progress ring */}
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
        <div className="day-header__ring-wrap">
          <svg width={RING_SIZE} height={RING_SIZE} className="day-header__ring">
            <circle
              cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS}
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={RING_STROKE}
            />
            <circle
              cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS}
              fill="none" stroke={day.accent} strokeWidth={RING_STROKE}
              strokeDasharray={RING_CIRCUMFERENCE} strokeDashoffset={ringDashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
              className="day-header__ring-progress"
            />
          </svg>
          <span className="day-header__ring-text" style={{ color: day.accent }}>
            {doneSets}/{totalSets}
          </span>
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
            weight={weights[i]}
            onWeightChange={handleWeightChange}
            onSetComplete={handleSetComplete}
            onSwap={handleSwap}
            swappedName={swaps[i] !== undefined ? ex.swaps[swaps[i]] : null}
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
            : 'Finish Workout'
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
