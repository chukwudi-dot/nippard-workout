import { DAYS, SCHEDULE, EQUIPMENT } from '../data/workouts'

export default function ScheduleView({ onSelectDay }) {
  return (
    <section aria-label="Weekly schedule">
      <p className="schedule__section-label">Weekly Structure</p>
      {SCHEDULE.map(s => {
        const dayData = DAYS.find(d => d.id === s.id)
        return (
          <div
            key={s.day}
            onClick={() => s.active && onSelectDay(s.id)}
            className={`schedule__row ${s.active ? 'schedule__row--active' : 'schedule__row--rest'}`}
            role={s.active ? 'button' : undefined}
            tabIndex={s.active ? 0 : undefined}
            onKeyDown={s.active ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectDay(s.id) } } : undefined}
          >
            <div
              className="schedule__day-label"
              style={{ color: s.active ? dayData?.accent : 'rgba(255,255,255,0.15)' }}
            >
              {s.day}
            </div>
            <div style={{ flex: 1 }}>
              <div
                className="schedule__name"
                style={{ color: s.active ? '#f5f5f7' : 'rgba(255,255,255,0.2)' }}
              >
                {s.label}
              </div>
              {s.active && dayData && (
                <div className="schedule__focus">{dayData.focus}</div>
              )}
            </div>
            {s.active && <span className="schedule__arrow">&rarr;</span>}
          </div>
        )
      })}

      <div className="schedule__equipment">
        <p className="schedule__section-label">Your Equipment</p>
        <div className="schedule__equipment-list">
          {EQUIPMENT.map(([icon, name]) => (
            <div key={name} className="schedule__equipment-item">
              <span>{icon}</span>{name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
