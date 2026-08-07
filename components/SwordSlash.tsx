'use client'
import { useRef, useEffect, useState } from 'react'

export default function SwordSlash({ children, className }: { children: React.ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const state = useRef({ active: false, points: [] as { x: number; y: number }[], glow: 0 })

  useEffect(() => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let rafId = 0

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const pos = (e: MouseEvent | Touch) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    const onStart = (x: number, y: number) => {
      state.current.active = true
      state.current.points = [{ x, y }]
      state.current.glow = 0
    }

    const onMove = (x: number, y: number) => {
      if (!state.current.active) return
      state.current.points.push({ x, y })
    }

    const onEnd = () => {
      if (!state.current.active) return
      state.current.active = false
      const pts = state.current.points
      if (pts.length > 4) {
        const dx = pts[pts.length - 1].x - pts[0].x
        const dy = pts[pts.length - 1].y - pts[0].y
        if (Math.sqrt(dx * dx + dy * dy) > canvas.width * 0.28) {
          state.current.glow = 1
          setTimeout(() => setRevealed(true), 650)
        } else {
          state.current.points = []
        }
      }
    }

    canvas.addEventListener('mousedown', e => { const p = pos(e); onStart(p.x, p.y) })
    canvas.addEventListener('mousemove', e => { const p = pos(e); onMove(p.x, p.y) })
    canvas.addEventListener('mouseup', onEnd)
    canvas.addEventListener('mouseleave', onEnd)
    canvas.addEventListener('touchstart', e => { e.preventDefault(); const p = pos(e.touches[0]); onStart(p.x, p.y) }, { passive: false })
    canvas.addEventListener('touchmove', e => { e.preventDefault(); const p = pos(e.touches[0]); onMove(p.x, p.y) }, { passive: false })
    canvas.addEventListener('touchend', onEnd)

    const frame = () => {
      const { points: pts, active, glow } = state.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (pts.length > 2) {
        const a = active ? 1 : glow
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.lineCap = 'round'; ctx.lineJoin = 'round'
        // outer glow
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
        ctx.strokeStyle = `rgba(160,120,255,${0.28 * a})`
        ctx.lineWidth = 32; ctx.stroke()
        // mid
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
        ctx.strokeStyle = `rgba(210,185,255,${0.55 * a})`
        ctx.lineWidth = 9; ctx.stroke()
        // core
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
        ctx.strokeStyle = `rgba(255,252,255,${0.95 * a})`
        ctx.lineWidth = 1.6; ctx.stroke()
        ctx.restore()
      }
      if (!state.current.active && state.current.glow > 0) {
        state.current.glow -= 0.018
        if (state.current.glow <= 0) state.current.points = []
      }
      rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => { cancelAnimationFrame(rafId); ro.disconnect() }
  }, [revealed])

  return (
    <div className={`relative ${className ?? ''}`}>
      <div style={{ opacity: revealed ? 1 : 0.08, transition: 'opacity 0.9s ease' }}>
        {children}
      </div>
      {!revealed && (
        <>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <div
              className="font-kanji font-bold leading-none select-none"
              style={{ fontSize: 'clamp(60px,8vw,100px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.12)' }}
            >
              斬
            </div>
            <p className="text-[8px] tracking-[.4em] uppercase text-paper/22">slash to reveal</p>
          </div>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" style={{ zIndex: 2 }} />
        </>
      )}
    </div>
  )
}
