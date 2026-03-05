import { useState } from 'react'
import { TIPS } from '../data/workouts'

export default function TipsAccordion({ accent }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="tips" style={{ marginTop: 28 }} aria-label="Training tips">
      <button
        className="tips__toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>&#x1F9E0; Nippard&rsquo;s Core Training Principles</span>
        <span className={`tips__arrow ${open ? 'tips__arrow--open' : ''}`}>&#x25BE;</span>
      </button>
      {open && (
        <div className="tips__list">
          {TIPS.map((t, i) => (
            <div key={i} className="tips__item">
              <span className="tips__icon">{t.icon}</span>
              <div>
                <div className="tips__title" style={{ color: accent }}>{t.title}</div>
                <div className="tips__body">{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
