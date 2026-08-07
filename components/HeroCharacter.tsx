'use client'
import { useRef, useEffect } from 'react'

function draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.clearRect(0, 0, W, H)

  const cx = W * 0.72
  const cy = H * 0.50
  const sc = Math.min(H, W) * 0.36

  // ── MANGA SPEED LINES ─────────────────────────────────────
  for (let i = 0; i < 28; i++) {
    const ang  = (i / 28) * Math.PI * 2
    const wave = Math.sin(t * 0.7 + i * 0.5) * 0.015
    const r0   = sc * (0.43 + wave)
    const r1   = sc * (0.88 + (i % 4 === 0 ? 0.18 : 0))
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0)
    ctx.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1)
    ctx.strokeStyle = `rgba(244,196,48,${0.022 + (i % 5 === 0 ? 0.028 : 0)})`
    ctx.lineWidth = i % 5 === 0 ? 1.3 : 0.5
    ctx.stroke()
  }

  // ── ENERGY RINGS ──────────────────────────────────────────
  const pulse = Math.sin(t * 0.55) * 0.018
  ;[0.40, 0.44, 0.48].forEach((rf, ring) => {
    ctx.beginPath()
    ctx.arc(cx, cy, sc * (rf + pulse * ring), 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(244,196,48,${0.13 - ring * 0.03})`
    ctx.lineWidth   = 1.6 - ring * 0.45
    ctx.stroke()
  })

  // ── CENTRAL GLOW ──────────────────────────────────────────
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sc * 0.44)
  glow.addColorStop(0,   'rgba(244,196,48,0.13)')
  glow.addColorStop(0.4, 'rgba(255,122,47,0.07)')
  glow.addColorStop(0.8, 'rgba(192,0,26,0.03)')
  glow.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, cy, sc * 0.44, 0, Math.PI * 2)
  ctx.fill()

  // ── FIGURE ────────────────────────────────────────────────
  ctx.save()
  ctx.translate(cx, cy)

  const wind   = Math.sin(t * 0.28)
  const breath = Math.sin(t * 0.4) * sc * 0.002

  // Cloak (behind, animated)
  ctx.beginPath()
  ctx.moveTo(-sc * 0.05, -sc * 0.28)
  ctx.bezierCurveTo(
    -sc * (0.17 + wind * 0.04), -sc * 0.12,
    -sc * (0.25 + wind * 0.06),  sc * 0.09,
    -sc * (0.21 + wind * 0.05),  sc * 0.28
  )
  ctx.bezierCurveTo(-sc * 0.16, sc * 0.36, -sc * 0.04, sc * 0.38, sc * 0.02, sc * 0.31)
  ctx.bezierCurveTo( sc * 0.04, sc * 0.24,  sc * 0.03, sc * 0.10, sc * 0.02, sc * 0.04)
  ctx.closePath()
  ctx.fillStyle   = 'rgba(6,8,9,0.88)'
  ctx.fill()
  ctx.strokeStyle = `rgba(244,196,48,${0.28 + Math.sin(t * 0.5) * 0.06})`
  ctx.lineWidth   = sc * 0.005
  ctx.lineJoin    = 'round'
  ctx.stroke()

  // Torso
  ctx.beginPath()
  ctx.moveTo(-sc * 0.09, -sc * 0.27)
  ctx.bezierCurveTo(-sc * 0.11, -sc * 0.17, -sc * 0.07, -sc * 0.06, -sc * 0.04, sc * 0.03)
  ctx.lineTo(sc * 0.04, sc * 0.03)
  ctx.bezierCurveTo(sc * 0.07, -sc * 0.06, sc * 0.11, -sc * 0.17, sc * 0.09, -sc * 0.27)
  ctx.closePath()
  ctx.fillStyle   = 'rgba(6,8,9,0.93)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(239,232,218,0.68)'
  ctx.lineWidth   = sc * 0.007
  ctx.stroke()

  // Left arm (down + forward)
  ctx.beginPath()
  ctx.moveTo(-sc * 0.09, -sc * 0.27)
  ctx.bezierCurveTo(-sc * 0.15, -sc * 0.19, -sc * 0.19, -sc * 0.08, -sc * 0.21, sc * 0.06)
  ctx.bezierCurveTo(-sc * 0.22, sc * 0.12,  -sc * 0.20, sc * 0.19, -sc * 0.17, sc * 0.24)
  ctx.strokeStyle = 'rgba(239,232,218,0.55)'
  ctx.lineWidth   = sc * 0.023
  ctx.lineCap     = 'round'
  ctx.stroke()

  // Right arm (raised, power pose)
  ctx.beginPath()
  ctx.moveTo(sc * 0.09, -sc * 0.27)
  ctx.bezierCurveTo(sc * 0.16, -sc * 0.30, sc * 0.23, -sc * 0.31, sc * 0.29, -sc * 0.25)
  ctx.bezierCurveTo(sc * 0.33, -sc * 0.18, sc * 0.31, -sc * 0.09, sc * 0.27, -sc * 0.03)
  ctx.strokeStyle = 'rgba(239,232,218,0.55)'
  ctx.lineWidth   = sc * 0.023
  ctx.stroke()

  // Energy ball at right fist
  const hx = sc * 0.27, hy = -sc * 0.03
  const ball = ctx.createRadialGradient(hx, hy, 0, hx, hy, sc * 0.065)
  ball.addColorStop(0,   `rgba(244,196,48,${0.65 + Math.sin(t * 1.2) * 0.2})`)
  ball.addColorStop(0.5, `rgba(255,122,47,${0.35 + Math.sin(t * 1.5) * 0.1})`)
  ball.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = ball
  ctx.beginPath()
  ctx.arc(hx, hy, sc * 0.065, 0, Math.PI * 2)
  ctx.fill()

  // Legs
  ctx.lineCap  = 'round'
  ctx.lineWidth = sc * 0.026
  ;[[-0.025, -0.060, -0.065, 0.410], [0.025, 0.060, 0.068, 0.410]].forEach(([sx, mx, ex, ey]) => {
    ctx.beginPath()
    ctx.moveTo(sx * sc, sc * 0.03)
    ctx.bezierCurveTo(mx * sc, sc * 0.16, ex * sc, sc * 0.28, ex * sc, sc * ey)
    ctx.strokeStyle = 'rgba(239,232,218,0.50)'
    ctx.stroke()
  })

  // Head
  ctx.beginPath()
  ctx.arc(sc * 0.005 + breath, -sc * 0.365, sc * 0.063, 0, Math.PI * 2)
  ctx.fillStyle   = 'rgba(6,8,9,0.93)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(239,232,218,0.72)'
  ctx.lineWidth   = sc * 0.007
  ctx.stroke()

  // Hair spikes
  const spikeAngs = [-2.45, -2.05, -1.65, -1.25, -0.90, -0.58]
  ctx.lineWidth = sc * 0.006
  ctx.lineCap   = 'round'
  for (const ang of spikeAngs) {
    const hsx = sc * 0.005 + Math.cos(ang) * sc * 0.063
    const hsy = -sc * 0.365 + Math.sin(ang) * sc * 0.063
    ctx.beginPath()
    ctx.moveTo(hsx, hsy)
    ctx.lineTo(hsx + Math.cos(ang - 0.28) * sc * 0.055, hsy + Math.sin(ang - 0.28) * sc * 0.055 - sc * 0.016)
    ctx.strokeStyle = 'rgba(239,232,218,0.75)'
    ctx.stroke()
  }

  // Scarf / bandana tail
  ctx.beginPath()
  ctx.moveTo(-sc * 0.04, -sc * 0.30)
  ctx.bezierCurveTo(
    sc * 0.02 + wind * sc * 0.03, -sc * 0.26,
    sc * 0.09 + wind * sc * 0.05, -sc * 0.21,
    sc * 0.13 + wind * sc * 0.04, -sc * 0.17
  )
  ctx.strokeStyle = `rgba(192,0,26,${0.62 + Math.sin(t * 0.7) * 0.1})`
  ctx.lineWidth   = sc * 0.009
  ctx.stroke()

  ctx.restore()

  // ── ORBITING WISPS ────────────────────────────────────────
  for (let i = 0; i < 9; i++) {
    const ang   = (i / 9) * Math.PI * 2 + t * 0.32 + (i % 2 ? t * 0.1 : -t * 0.1)
    const r     = sc * (0.34 + Math.sin(t * 0.5 + i) * 0.04)
    const wx    = cx + Math.cos(ang) * r
    const wy    = cy + Math.sin(ang) * r * 0.78
    const alpha = 0.32 + Math.sin(t * 0.8 + i * 1.3) * 0.14
    const size  = sc * (0.013 + Math.sin(t + i) * 0.004)
    const col   = i % 3 === 0 ? [244,196,48] : i % 3 === 1 ? [255,122,47] : [159,232,255]

    ctx.beginPath()
    ctx.arc(wx, wy, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${col},${alpha})`
    ctx.fill()

    // Trail
    const tAng = ang - 0.32
    const tr   = sc * 0.30
    ctx.beginPath()
    ctx.moveTo(wx, wy)
    ctx.lineTo(cx + Math.cos(tAng) * tr, cy + Math.sin(tAng) * tr * 0.78)
    ctx.strokeStyle = `rgba(${col},${alpha * 0.28})`
    ctx.lineWidth   = size * 0.55
    ctx.stroke()
  }
}

export default function HeroCharacter() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf: number, t = 0

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => { t += 0.016; draw(ctx, W, H, t); raf = requestAnimationFrame(tick) }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 4 }}
    />
  )
}
