import { memo, useRef, useCallback, useEffect } from 'react'

const W = 390
const H = 520
const PAD = 24

const WorkoutSummaryCard = memo(function WorkoutSummaryCard({
  dayLabel, date, duration, exercises, totalSets, doneSets, streak, accent, onClose,
}) {
  const canvasRef = useRef(null)

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const color = accent || '#E8FF47'

    // Background
    ctx.fillStyle = '#0c0c0e'
    ctx.beginPath()
    ctx.roundRect(0, 0, W, H, 20)
    ctx.fill()

    // Accent top bar
    ctx.fillStyle = color
    ctx.fillRect(0, 0, W, 4)

    let y = PAD + 20

    // Title
    ctx.fillStyle = color
    ctx.font = 'bold 24px sans-serif'
    ctx.textBaseline = 'top'
    ctx.fillText(dayLabel.toUpperCase(), PAD, y)

    // Date + duration
    y += 34
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.font = '13px sans-serif'
    let meta = date
    if (duration > 0) meta += ` \u00B7 ${Math.round(duration / 60)} min`
    ctx.fillText(meta, PAD, y)

    // Sets completed
    y += 28
    ctx.fillStyle = color
    ctx.font = 'bold 36px sans-serif'
    ctx.fillText(`${doneSets}/${totalSets}`, PAD, y)
    const setsW = ctx.measureText(`${doneSets}/${totalSets}`).width
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.font = '13px sans-serif'
    ctx.fillText(' sets completed', PAD + setsW + 4, y + 20)

    // Streak
    if (streak > 0) {
      y += 50
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText(`\uD83D\uDD25 ${streak} day streak`, PAD, y)
    } else {
      y += 50
    }

    // Divider
    y += 10
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PAD, y)
    ctx.lineTo(W - PAD, y)
    ctx.stroke()

    // Exercises
    y += 16
    ctx.font = '13px sans-serif'
    const maxEx = 6
    const show = exercises.slice(0, maxEx)

    show.forEach(ex => {
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      const name = ex.name.length > 28 ? ex.name.slice(0, 26) + '\u2026' : ex.name
      ctx.fillText(name, PAD, y)

      if (ex.weight > 0) {
        ctx.fillStyle = color
        ctx.font = 'bold 13px sans-serif'
        const wt = `${ex.weight} lbs`
        ctx.fillText(wt, W - PAD - ctx.measureText(wt).width, y)
        ctx.font = '13px sans-serif'
      }
      y += 24
    })

    if (exercises.length > maxEx) {
      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.fillText(`+${exercises.length - maxEx} more`, PAD, y)
    }

    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.font = '10px sans-serif'
    ctx.fillText('Nippard Optimal Split Tracker', PAD, H - PAD)
  }, [dayLabel, date, duration, exercises, totalSets, doneSets, streak, accent])

  useEffect(() => { drawCard() }, [drawCard])

  const handleShare = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      const file = new File([blob], 'workout.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `${dayLabel} - Workout Complete` })
      } else {
        downloadBlob(blob)
      }
    } catch {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      if (blob) downloadBlob(blob)
    }
  }, [dayLabel])

  const handleDownload = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    if (blob) downloadBlob(blob)
  }, [])

  return (
    <div className="summary-card-overlay" onClick={onClose}>
      <div className="summary-card" onClick={e => e.stopPropagation()}>
        <canvas ref={canvasRef} width={W} height={H} className="summary-card__canvas" />
        <div className="summary-card__actions">
          <button
            className="summary-card__btn summary-card__btn--share"
            style={{ background: accent, color: '#000' }}
            onClick={handleShare}
          >
            Share
          </button>
          <button
            className="summary-card__btn summary-card__btn--download"
            style={{ color: accent, borderColor: `${accent}40` }}
            onClick={handleDownload}
          >
            Save
          </button>
          <button className="summary-card__btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
})

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `workout-${new Date().toISOString().slice(0, 10)}.png`
  a.click()
  URL.revokeObjectURL(url)
}

export default WorkoutSummaryCard
