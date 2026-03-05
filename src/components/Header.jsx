export default function Header({ day }) {
  const stats = [['4', 'Days/wk'], ['~55', 'Min/session'], ['2\u00D7', 'Per muscle']]

  return (
    <header className="header">
      <div
        className="header__glow"
        style={{ background: `radial-gradient(circle, ${day.accent}15 0%, transparent 70%)` }}
      />
      <div className="header__inner">
        <div className="header__badge">
          <span className="header__badge-dot" />
          <span className="header__badge-text">Science-Based Program</span>
        </div>
        <h1 className="header__title">
          Jeff Nippard<br />
          <span className="header__title-accent" style={{ color: day.accent }}>Optimal Split</span>
        </h1>
        <p className="header__subtitle">
          Upper / Lower &middot; 4&times;/week &middot; Smith + Cables + Dumbbells
        </p>
      </div>
      <div className="header__stats">
        {stats.map(([v, l]) => (
          <div key={l} className="header__stat">
            <div className="header__stat-value" style={{ color: day.accent }}>{v}</div>
            <div className="header__stat-label">{l}</div>
          </div>
        ))}
      </div>
    </header>
  )
}
