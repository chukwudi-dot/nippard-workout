export default function DaySelector({ days, activeId, onSelect }) {
  return (
    <nav className="day-selector" aria-label="Workout day selector">
      {days.map(d => (
        <button
          key={d.id}
          onClick={() => onSelect(d.id)}
          className={`day-selector__btn ${activeId === d.id ? 'day-selector__btn--active' : ''}`}
          style={activeId === d.id
            ? { borderColor: d.accent, background: d.bg, color: d.accent }
            : undefined
          }
          aria-current={activeId === d.id ? 'true' : undefined}
        >
          <div className="day-selector__label">{d.label}</div>
          <div className="day-selector__meta">{d.day} &middot; {d.tag}</div>
        </button>
      ))}
    </nav>
  )
}
