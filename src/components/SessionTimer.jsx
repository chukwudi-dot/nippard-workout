import { memo } from 'react'

const SessionTimer = memo(function SessionTimer({ formatted, isRunning, accent }) {
  if (!isRunning) return null

  return (
    <div className="session-timer" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
      <span className="session-timer__dot" style={{ background: accent }} />
      <span className="session-timer__time">{formatted}</span>
    </div>
  )
})

export default SessionTimer
