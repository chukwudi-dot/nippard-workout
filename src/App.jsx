import { useState, useCallback, useMemo } from 'react'
import { DAYS } from './data/workouts'
import Header from './components/Header'
import WorkoutView from './components/WorkoutView'
import ScheduleView from './components/ScheduleView'
import HistoryView from './components/HistoryView'
import DemoModal from './components/DemoModal'

const VIEWS = [
  ['workout', 'Workout'],
  ['schedule', 'This Week'],
  ['history', 'History'],
]

export default function App() {
  const [activeId, setActiveId] = useState('upper-a')
  const [view, setView] = useState('workout')
  const [demoExercise, setDemoExercise] = useState(null)

  const day = useMemo(() => DAYS.find(d => d.id === activeId), [activeId])

  const switchDay = useCallback((id) => {
    setActiveId(id)
    setView('workout')
  }, [])

  const openDemo = useCallback((exercise) => {
    setDemoExercise(exercise)
  }, [])

  const closeDemo = useCallback(() => {
    setDemoExercise(null)
  }, [])

  return (
    <div className="app" style={{ '--accent': day.accent, '--accent-bg': day.bg }}>
      <DemoModal exercise={demoExercise} accent={day.accent} onClose={closeDemo} />

      <Header day={day} />

      <main className="content">
        {/* View Toggle */}
        <div className="view-toggle" role="tablist" aria-label="App views">
          {VIEWS.map(([v, l]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`view-toggle__btn ${view === v ? 'view-toggle__btn--active' : ''}`}
              style={view === v ? { borderColor: day.accent, background: day.accent } : undefined}
              role="tab"
              aria-selected={view === v}
            >
              {l}
            </button>
          ))}
        </div>

        {view === 'schedule' && <ScheduleView onSelectDay={switchDay} />}
        {view === 'workout' && (
          <WorkoutView
            day={day}
            activeId={activeId}
            onChangeDay={switchDay}
            onDemo={openDemo}
          />
        )}
        {view === 'history' && <HistoryView accent={day.accent} />}
      </main>
    </div>
  )
}
