import { memo, useMemo } from 'react'

const SMITH_BAR_WEIGHT = 15 // Smith machine bar weight (typically 15-20 lbs)
const PLATES = [45, 35, 25, 10, 5, 2.5]
const PLATE_COLORS = {
  45: '#2563EB',
  35: '#F59E0B',
  25: '#10B981',
  10: '#8B5CF6',
  5: '#EF4444',
  2.5: '#EC4899',
}

function calculatePlates(targetWeight) {
  let remaining = (targetWeight - SMITH_BAR_WEIGHT) / 2
  if (remaining <= 0) return []
  const result = []
  for (const plate of PLATES) {
    while (remaining >= plate) {
      result.push(plate)
      remaining -= plate
    }
  }
  return result
}

const PlateCalculator = memo(function PlateCalculator({ weight, accent, onClose }) {
  const plates = useMemo(() => calculatePlates(weight || 0), [weight])

  if (!weight || weight <= SMITH_BAR_WEIGHT) {
    return (
      <div className="plate-calc">
        <div className="plate-calc__header">
          <span className="plate-calc__title" style={{ color: accent }}>Plate Calculator</span>
          <button className="plate-calc__close" onClick={onClose}>&times;</button>
        </div>
        <p className="plate-calc__hint">
          Bar only ({SMITH_BAR_WEIGHT} lbs) — no plates needed
        </p>
      </div>
    )
  }

  return (
    <div className="plate-calc">
      <div className="plate-calc__header">
        <span className="plate-calc__title" style={{ color: accent }}>Plate Calculator</span>
        <button className="plate-calc__close" onClick={onClose}>&times;</button>
      </div>
      <div className="plate-calc__total">
        <span>Total: <strong style={{ color: accent }}>{weight} lbs</strong></span>
        <span className="plate-calc__bar-note">Smith bar: {SMITH_BAR_WEIGHT} lbs</span>
      </div>
      <div className="plate-calc__label">Each side:</div>
      <div className="plate-calc__bar">
        <div className="plate-calc__sleeve" />
        {plates.map((p, i) => (
          <div
            key={i}
            className="plate-calc__plate"
            style={{
              background: PLATE_COLORS[p],
              height: `${Math.max(24, p * 1.2)}px`,
            }}
          >
            {p}
          </div>
        ))}
      </div>
      <div className="plate-calc__summary">
        {Object.entries(
          plates.reduce((acc, p) => { acc[p] = (acc[p] || 0) + 1; return acc }, {})
        ).map(([plate, count]) => (
          <span key={plate} className="plate-calc__pill" style={{ borderColor: PLATE_COLORS[plate], color: PLATE_COLORS[plate] }}>
            {count}&times;{plate}
          </span>
        ))}
      </div>
    </div>
  )
})

export default PlateCalculator
