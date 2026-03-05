import { memo } from 'react'

const SIZE = 88
const STROKE = 5
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const RestTimer = memo(function RestTimer({ remaining, progress, isActive, onCancel, onAddTime, accent }) {
  if (!isActive) return null

  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`
  const isUrgent = remaining <= 10

  return (
    <div className="rest-timer" role="timer" aria-label={`Rest timer: ${timeStr} remaining`}>
      <div className="rest-timer__circle-wrap">
        <svg width={SIZE} height={SIZE} className="rest-timer__svg">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={isUrgent ? '#FF4444' : accent}
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            className="rest-timer__progress"
          />
        </svg>
        <div className="rest-timer__time" style={{ color: isUrgent ? '#FF4444' : accent }}>
          {timeStr}
        </div>
      </div>
      <div className="rest-timer__label">REST</div>
      <div className="rest-timer__actions">
        <button className="rest-timer__btn" onClick={onAddTime} aria-label="Add 30 seconds">
          +30s
        </button>
        <button className="rest-timer__btn rest-timer__btn--skip" onClick={onCancel} aria-label="Skip rest">
          Skip
        </button>
      </div>
    </div>
  )
})

export default RestTimer
