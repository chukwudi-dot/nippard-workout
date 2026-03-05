import { memo } from 'react'
import SetTracker from './SetTracker'

const ExerciseCard = memo(function ExerciseCard({ ex, index, accent, dayId, expanded, onToggle, onDemo }) {
  return (
    <article
      className={`exercise-card ${expanded ? 'exercise-card--expanded' : ''}`}
      style={expanded ? { borderColor: accent + '40' } : undefined}
      aria-expanded={expanded}
    >
      <div
        className="exercise-card__header"
        onClick={onToggle}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
        tabIndex={0}
        role="button"
        aria-label={`${ex.name} — ${ex.sets} sets of ${ex.reps}. Tap to ${expanded ? 'collapse' : 'expand'}`}
      >
        <div className={`exercise-card__number ${expanded ? 'exercise-card__number--active' : ''}`}
          style={expanded ? { background: accent } : undefined}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="exercise-card__info">
          <div className="exercise-card__name">{ex.name}</div>
          <div className="exercise-card__sub">{ex.sub} &middot; {ex.equipment}</div>
        </div>
        <div className="exercise-card__right">
          <div className="exercise-card__sets" style={{ color: accent }}>
            {ex.sets}&times;{ex.reps}
          </div>
          <div className="exercise-card__rest">{ex.rest}</div>
          <button
            onClick={e => { e.stopPropagation(); onDemo(ex) }}
            className="exercise-card__demo-btn"
            style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent }}
            aria-label={`Watch demo for ${ex.name}`}
          >
            &#x25B6; Demo
          </button>
        </div>
      </div>

      {expanded && (
        <div className="exercise-card__body" style={{ borderTop: `1px solid ${accent}20` }}>
          <div
            className="exercise-card__cue"
            style={{ background: `${accent}12`, borderLeft: `3px solid ${accent}` }}
          >
            {ex.cue}
          </div>
          <SetTracker dayId={dayId} exerciseIndex={index} sets={ex.sets} accent={accent} />
        </div>
      )}
    </article>
  )
})

export default ExerciseCard
