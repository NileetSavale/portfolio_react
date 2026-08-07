'use client'
import { useRef, useEffect } from 'react'

export default function Cursor() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    const dpr    = window.devicePixelRatio || 1
    let W = 0, H = 0, raf: number
    let mx = -300, my = -300
    let rx = -300, ry = -300
    let hovered = false
    let lastMoveTime = 0

    const TRAIL = 18
    const trail: { x: number; y: number }[] = Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 }))
    let head = 0

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      trail[head] = { x: mx, y: my }
      head = (head + 1) % TRAIL
      lastMoveTime = Date.now()
    }
    const onOver = (e: MouseEvent) => { if ((e.target as Element).closest('a,button,[data-grow]')) hovered = true }
    const onOut  = (e: MouseEvent) => { if (!(e.relatedTarget as Element | null)?.closest('a,button,[data-grow]')) hovered = false }
    const onLeave = () => {
      mx = -300; my = -300; rx = -300; ry = -300
      trail.forEach(t => { t.x = -300; t.y = -300 })
    }
    document.addEventListener('mousemove',        onMove)
    document.addEventListener('mouseover',         onOver)
    document.addEventListener('mouseout',          onOut)
    document.addEventListener('mouseleave',        onLeave)
    document.addEventListener('visibilitychange', () => { if (document.hidden) onLeave() })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Fade trail out 80ms after mouse stops, gone within 200ms
      const idleMs    = Date.now() - lastMoveTime
      const trailFade = idleMs < 80 ? 1 : Math.max(0, 1 - (idleMs - 80) / 200)

      // Glow trail — radial gradient at each past position
      for (let i = 1; i < TRAIL; i++) {
        const idx = (head - i - 1 + TRAIL) % TRAIL
        const t   = trail[idx]
        const pct = 1 - i / TRAIL
        const r   = 9 * pct
        if (r <= 0.1) continue
        const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r * 2.8)
        g.addColorStop(0, `rgba(244,196,48,${(pct * 0.5 * trailFade).toFixed(2)})`)
        g.addColorStop(0.5, `rgba(255,122,47,${(pct * 0.12 * trailFade).toFixed(2)})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(t.x, t.y, r * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }

      // Magnetic ring — smooth lerp
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      const rr = hovered ? 28 : 17

      // Soft halo around ring
      const halo = ctx.createRadialGradient(rx, ry, rr - 2, rx, ry, rr + 14)
      halo.addColorStop(0, hovered ? 'rgba(255,122,47,0.18)' : 'rgba(244,196,48,0.12)')
      halo.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(rx, ry, rr + 14, 0, Math.PI * 2)
      ctx.fillStyle = halo
      ctx.fill()

      // Ring stroke
      ctx.beginPath()
      ctx.arc(rx, ry, rr, 0, Math.PI * 2)
      ctx.strokeStyle = hovered ? 'rgba(255,122,47,0.8)' : 'rgba(244,196,48,0.65)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Center dot
      ctx.beginPath()
      ctx.arc(mx, my, hovered ? 3.5 : 2, 0, Math.PI * 2)
      ctx.fillStyle = hovered ? '#ff7a2f' : '#f4c430'
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove',        onMove)
      document.removeEventListener('mouseover',         onOver)
      document.removeEventListener('mouseout',          onOut)
      document.removeEventListener('mouseleave',        onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none mix-blend-screen hidden md:block"
      style={{ zIndex: 9999, width: '100vw', height: '100vh' }}
    />
  )
}
