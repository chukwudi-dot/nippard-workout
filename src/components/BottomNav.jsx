import { memo } from 'react'

const TABS = [
  {
    id: 'workout',
    label: 'Workout',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M3 12h18M4.5 6.5v11M19.5 6.5v11M2 9v6M22 9v6" />
      </svg>
    ),
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'history',
    label: 'History',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v5h5M3.05 13A9 9 0 1 0 6 5.3L3 8" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
]

const BottomNav = memo(function BottomNav({ activeView, onChangeView, accent }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {TABS.map(tab => {
        const active = activeView === tab.id
        return (
          <button
            key={tab.id}
            className={`bottom-nav__tab ${active ? 'bottom-nav__tab--active' : ''}`}
            onClick={() => onChangeView(tab.id)}
            aria-current={active ? 'page' : undefined}
            style={active ? { color: accent } : undefined}
          >
            <span className="bottom-nav__icon">{tab.icon}</span>
            <span className="bottom-nav__label">{tab.label}</span>
            {active && <span className="bottom-nav__indicator" style={{ background: accent }} />}
          </button>
        )
      })}
    </nav>
  )
})

export default BottomNav
