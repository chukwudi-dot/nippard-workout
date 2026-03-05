import { useState, useCallback, useMemo } from 'react'
import { DAYS } from './data/workouts'
import Header from './components/Header'
import WorkoutView from './components/WorkoutView'
import ScheduleView from './components/ScheduleView'
import HistoryView from './components/HistoryView'
import DemoModal from './components/DemoModal'
import BottomNav from './components/BottomNav'
import SessionTimer from './components/SessionTimer'
import RestTimer from './components/RestTimer'
import PRToast from './components/PRToast'
import { useSessionTimer } from './hooks/useSessionTimer'
import { useRestTimer } from './hooks/useRestTimer'
import { usePersonalRecords } from './hooks/usePersonalRecords'

export default function App() {
  const [activeId, setActiveId] = useState('upper-a')
  const [view, setView] = useState('workout')
  const [demoExercise, setDemoExercise] = useState(null)

  const sessionTimer = useSessionTimer()
  const restTimer = useRestTimer()
  const { newPRs, checkAndSetPRs, dismissPRs } = usePersonalRecords()

  const day = useMemo(() => DAYS.find(d => d.id === activeId), [activeId])

  const switchDay = useCallback((id) => {
    setActiveId(id)
    setView('workout')
    sessionTimer.reset()
  }, [sessionTimer])

  const openDemo = useCallback((exercise) => {
    setDemoExercise(exercise)
  }, [])

  const closeDemo = useCallback(() => {
    setDemoExercise(null)
  }, [])

  const handleCheckPRs = useCallback((dayId, exercises, weights) => {
    checkAndSetPRs(dayId, exercises, weights)
  }, [checkAndSetPRs])

  return (
    <div className="app" style={{ '--accent': day.accent, '--accent-bg': day.bg }}>
      <DemoModal exercise={demoExercise} accent={day.accent} onClose={closeDemo} />
      <PRToast prs={newPRs} onDismiss={dismissPRs} accent={day.accent} />

      <Header day={day} />

      {/* Session Timer */}
      <SessionTimer
        formatted={sessionTimer.formatted}
        isRunning={sessionTimer.isRunning}
        accent={day.accent}
      />

      <main className="content">
        {view === 'schedule' && <ScheduleView onSelectDay={switchDay} />}
        {view === 'workout' && (
          <WorkoutView
            day={day}
            activeId={activeId}
            onChangeDay={switchDay}
            onDemo={openDemo}
            sessionTimer={sessionTimer}
            restTimer={restTimer}
            onCheckPRs={handleCheckPRs}
          />
        )}
        {view === 'history' && <HistoryView accent={day.accent} />}
      </main>

      {/* Rest Timer */}
      <RestTimer
        remaining={restTimer.remaining}
        progress={restTimer.progress}
        isActive={restTimer.isActive}
        onCancel={restTimer.cancel}
        onAddTime={() => restTimer.addTime(30)}
        accent={day.accent}
      />

      {/* Bottom Nav */}
      <BottomNav activeView={view} onChangeView={setView} accent={day.accent} />
    </div>
  )
}
