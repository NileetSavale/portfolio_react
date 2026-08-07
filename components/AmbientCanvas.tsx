'use client'
import { useRef, useEffect } from 'react'

type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: string; life: number; max: number }

const PALETTES = {
  gold:    ['rgba(244,196,48,', 'rgba(255,122,47,'],
  violet:  ['rgba(123,63,242,', 'rgba(159,232,255,'],
  crimson: ['rgba(192,0,26,',   'rgba(255,122,47,'],
} as const

export default function AmbientCanvas({ palette = 'gold', count = 35 }: { palette?: keyof typeof PALETTES; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf: number
    const cols = PALETTES[palette]

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const make = (init = false): P => ({
      x: Math.random() * W,
      y: init ? Math.random() * H : H + 4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.1),
      r: Math.random() * 1.6 + 0.35,
      a: Math.random() * 0.28 + 0.06,
      c: cols[Math.floor(Math.random() * cols.length)],
      life: 0,
      max: Math.random() * 180 + 80,
    })

    const particles: P[] = Array.from({ length: count }, () => make(true))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.life++
        const t = p.life / p.max
        const alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c + p.a * alpha + ')'
        ctx.fill()
        if (p.life >= p.max || p.y < -8) Object.assign(p, make())
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [palette, count])

  return <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
}
