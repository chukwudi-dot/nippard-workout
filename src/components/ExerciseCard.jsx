import { memo, useState } from 'react'
import SetTracker from './SetTracker'
import WarmUp from './WarmUp'
import PlateCalculator from './PlateCalculator'

const ExerciseCard = memo(function ExerciseCard({
  ex, index, accent, dayId, expanded, onToggle, onDemo,
  weight, onWeightChange, onSetComplete, onSwap, swappedName,
}) {
  const [showWarmUp, setShowWarmUp] = useState(false)
  const [showPlateCalc, setShowPlateCalc] = useState(false)

  const displayName = swappedName || ex.name
  const isSmith = ex.equipment?.includes('Smith')

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
        aria-label={`${displayName} — ${ex.sets} sets of ${ex.reps}. Tap to ${expanded ? 'collapse' : 'expand'}`}
      >
        <div className={`exercise-card__number ${expanded ? 'exercise-card__number--active' : ''}`}
          style={expanded ? { background: accent } : undefined}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="exercise-card__info">
          <div className="exercise-card__name">
            {displayName}
            {swappedName && <span className="exercise-card__swapped-badge">SWAP</span>}
          </div>
          <div className="exercise-card__sub">{ex.sub} &middot; {ex.equipment}</div>
        </div>
        <div className="exercise-card__right">
          <div className="exercise-card__sets" style={{ color: accent }}>
            {ex.sets}&times;{ex.reps}
          </div>
          <div className="exercise-card__rest">{ex.rest}</div>
          <button
            onClick={e => { e.stopPropagation(); onDemo({ ...ex, name: displayName }) }}
            className="exercise-card__demo-btn"
            style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent }}
            aria-label={`Watch demo for ${displayName}`}
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

          {/* Weight input */}
          <div className="exercise-card__weight-row">
            <label className="exercise-card__weight-label">Weight (lbs)</label>
            <input
              type="number"
              inputMode="decimal"
              className="exercise-card__weight-input"
              style={{ borderColor: `${accent}40`, color: accent }}
              value={weight || ''}
              onChange={e => onWeightChange(index, e.target.value ? parseFloat(e.target.value) : '')}
              placeholder="0"
              onClick={e => e.stopPropagation()}
            />
          </div>

          {/* Action buttons row */}
          <div className="exercise-card__actions">
            {ex.compound && (
              <button
                className="exercise-card__action-btn"
                style={{ color: accent, borderColor: `${accent}30` }}
                onClick={e => { e.stopPropagation(); setShowWarmUp(!showWarmUp) }}
              >
                {showWarmUp ? 'Hide' : 'Warm-Up'}
              </button>
            )}
            {isSmith && (
              <button
                className="exercise-card__action-btn"
                style={{ color: accent, borderColor: `${accent}30` }}
                onClick={e => { e.stopPropagation(); setShowPlateCalc(!showPlateCalc) }}
              >
                {showPlateCalc ? 'Hide' : 'Plates'}
              </button>
            )}
            {ex.swaps?.length > 0 && (
              <button
                className="exercise-card__action-btn"
                style={{ color: accent, borderColor: `${accent}30` }}
                onClick={e => { e.stopPropagation(); onSwap(index) }}
              >
                Swap
              </button>
            )}
          </div>

          {/* Warm-up protocol */}
          {showWarmUp && (
            <WarmUp
              weight={weight}
              exerciseName={displayName}
              accent={accent}
              onClose={() => setShowWarmUp(false)}
            />
          )}

          {/* Plate calculator */}
          {showPlateCalc && (
            <PlateCalculator
              weight={weight}
              accent={accent}
              onClose={() => setShowPlateCalc(false)}
            />
          )}

          <SetTracker
            dayId={dayId}
            exerciseIndex={index}
            sets={ex.sets}
            accent={accent}
            onSetComplete={onSetComplete}
          />
        </div>
      )}
    </article>
  )
})

export default ExerciseCard
