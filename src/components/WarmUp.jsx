import { memo, useState } from 'react'

const WARM_UP_SCHEME = [
  { pct: 50, reps: 5, label: 'Light' },
  { pct: 70, reps: 3, label: 'Medium' },
  { pct: 85, reps: 1, label: 'Heavy' },
]

const WarmUp = memo(function WarmUp({ weight, exerciseName, accent, onClose }) {
  const [checkedSets, setCheckedSets] = useState([])

  if (!weight || weight <= 0) {
    return (
      <div className="warmup">
        <div className="warmup__header">
          <span className="warmup__title" style={{ color: accent }}>Warm-Up Protocol</span>
          <button className="warmup__close" onClick={onClose}>&times;</button>
        </div>
        <p className="warmup__hint">Enter your working weight to see warm-up sets</p>
      </div>
    )
  }

  const toggleSet = (i) => {
    setCheckedSets(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  return (
    <div className="warmup">
      <div className="warmup__header">
        <span className="warmup__title" style={{ color: accent }}>Warm-Up Protocol</span>
        <button className="warmup__close" onClick={onClose}>&times;</button>
      </div>
      <div className="warmup__subtitle">{exerciseName} @ {weight} lbs</div>
      <div className="warmup__sets">
        {WARM_UP_SCHEME.map((s, i) => {
          const warmWeight = Math.round((s.pct / 100) * weight / 5) * 5
          const done = checkedSets.includes(i)
          return (
            <button
              key={i}
              className={`warmup__set ${done ? 'warmup__set--done' : ''}`}
              style={done ? { borderColor: accent, background: `${accent}15` } : undefined}
              onClick={() => toggleSet(i)}
            >
              <div className="warmup__set-pct" style={{ color: accent }}>{s.pct}%</div>
              <div className="warmup__set-weight">{warmWeight} lbs</div>
              <div className="warmup__set-reps">{s.reps} reps</div>
              <div className="warmup__set-label">{s.label}</div>
              {done && <span className="warmup__check" style={{ color: accent }}>&#10003;</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
})

export default WarmUp
