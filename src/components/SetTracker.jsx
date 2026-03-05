import { useSetTracker } from '../hooks/useSetTracker'

export default function SetTracker({ dayId, exerciseIndex, sets, accent }) {
  const { done, toggle, allDone } = useSetTracker(dayId, exerciseIndex, sets)

  return (
    <div>
      <p className="set-tracker__label">Track Sets</p>
      <div className="set-tracker__buttons">
        {Array.from({ length: sets }).map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); toggle(i) }}
            className={`set-tracker__btn ${done.includes(i) ? 'set-tracker__btn--done' : ''}`}
            style={done.includes(i) ? { borderColor: accent, background: accent } : undefined}
            aria-label={`Set ${i + 1} of ${sets}, ${done.includes(i) ? 'completed' : 'not completed'}`}
            aria-pressed={done.includes(i)}
          >
            {done.includes(i) ? '\u2713' : i + 1}
          </button>
        ))}
        {done.length > 0 && (
          <span
            className="set-tracker__count"
            style={{ color: allDone ? accent : 'rgba(255,255,255,0.4)' }}
          >
            {allDone ? '\u2705 Done!' : `${done.length}/${sets}`}
          </span>
        )}
      </div>
    </div>
  )
}
