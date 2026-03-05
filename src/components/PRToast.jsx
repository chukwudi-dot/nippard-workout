import { memo, useEffect } from 'react'

const PRToast = memo(function PRToast({ prs, onDismiss, accent }) {
  useEffect(() => {
    if (prs.length > 0) {
      const timer = setTimeout(onDismiss, 4000)
      return () => clearTimeout(timer)
    }
  }, [prs, onDismiss])

  if (prs.length === 0) return null

  return (
    <div className="pr-toast" style={{ borderColor: accent }}>
      <div className="pr-toast__confetti" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180)
          return (
            <span
              key={i}
              className="pr-toast__particle"
              style={{
                '--x': `${Math.round(Math.cos(angle) * 60)}px`,
                '--y': `${Math.round(Math.sin(angle) * 60)}px`,
                '--delay': `${i * 50}ms`,
                background: i % 3 === 0 ? accent : i % 3 === 1 ? '#FF6B35' : '#A78BFA',
              }}
            />
          )
        })}
      </div>
      <div className="pr-toast__badge" style={{ background: accent, color: '#000' }}>NEW PR!</div>
      <div className="pr-toast__details">
        {prs.map((pr, i) => (
          <div key={i} className="pr-toast__exercise">
            <span className="pr-toast__name">{pr.name}</span>
            <span className="pr-toast__weight" style={{ color: accent }}>{pr.weight} lbs</span>
          </div>
        ))}
      </div>
      <button className="pr-toast__close" onClick={onDismiss} aria-label="Dismiss">&times;</button>
    </div>
  )
})

export default PRToast
