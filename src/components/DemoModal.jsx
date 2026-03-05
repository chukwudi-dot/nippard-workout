import { useEffect, useRef } from 'react'
import { useWgerGif } from '../hooks/useWgerGif'

export default function DemoModal({ exercise, accent, onClose }) {
  const { gifUrl, loading } = useWgerGif(exercise?.gifQuery, !!exercise)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!exercise) return
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [exercise, onClose])

  // Focus trap
  useEffect(() => {
    if (!exercise || !modalRef.current) return
    const modal = modalRef.current
    const focusable = modal.querySelectorAll('button, a[href]')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const trap = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    modal.addEventListener('keydown', trap)
    return () => modal.removeEventListener('keydown', trap)
  }, [exercise])

  if (!exercise) return null

  return (
    <div
      className="demo-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div
        className="demo-modal__content"
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        style={{ boxShadow: `0 0 60px ${accent}25`, border: `1px solid ${accent}30` }}
      >
        {/* Header */}
        <div className="demo-modal__header">
          <div>
            <div id="demo-modal-title" className="demo-modal__title" style={{ color: accent }}>
              {exercise.name}
            </div>
            <div className="demo-modal__subtitle">
              {exercise.sub} &middot; {exercise.sets} &times; {exercise.reps}
            </div>
          </div>
          <button className="demo-modal__close" onClick={onClose} aria-label="Close demo">
            &#x2715;
          </button>
        </div>

        {/* Image area */}
        <div className="demo-modal__image-area">
          {loading && (
            <div className="demo-modal__loading">
              <div className="demo-modal__loading-icon">&nbsp;&#x23F3;</div>
              <div className="demo-modal__loading-text">Loading demo...</div>
            </div>
          )}
          {!loading && gifUrl && (
            <img
              src={gifUrl}
              alt={`${exercise.name} demonstration`}
              className="demo-modal__image"
            />
          )}
          {!loading && !gifUrl && (
            <div className="demo-modal__fallback">
              <div className="demo-modal__fallback-icon">&nbsp;&#x1F3CB;&#xFE0F;</div>
              <p className="demo-modal__fallback-text">Image not available for this exercise</p>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise form tutorial')}`}
                target="_blank"
                rel="noreferrer"
                className="demo-modal__youtube-btn"
                style={{ background: accent }}
              >
                &#x25B6; Watch on YouTube
              </a>
            </div>
          )}
          <div
            className="demo-modal__muscle-badge"
            style={{ background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}
          >
            {exercise.muscle}
          </div>
        </div>

        {/* Cues */}
        <div className="demo-modal__cues">
          <p className="demo-modal__cues-label">Form Cues</p>
          <div
            className="demo-modal__cue-text"
            style={{ background: `${accent}0F`, borderLeft: `3px solid ${accent}` }}
          >
            {exercise.cue}
          </div>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent('Jeff Nippard ' + exercise.name)}`}
            target="_blank"
            rel="noreferrer"
            className="demo-modal__search-link"
          >
            <span className="demo-modal__search-icon">&#x25B6;</span>
            Search &ldquo;{exercise.name}&rdquo; on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
