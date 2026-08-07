'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number; isStreak: boolean
}

// Jagged tear-edge offsets (x fraction 0→1, y offset px)
const JAG_L: [number, number][] = [
  [0.46, -1.5], [0.38, 2.5], [0.28, -3.5], [0.18, 4], [0.08, -5], [0, 0],
]
const JAG_R: [number, number][] = [
  [0.54, -1.5], [0.62, 2.5], [0.72, -3.5], [0.82, 4], [0.92, -5], [1.0, 0],
]

function buildPanel(side: 'left' | 'right', swordVH: number): string {
  const y   = Math.max(0, Math.min(100, swordVH))
  const jag = side === 'left' ? JAG_L : JAG_R
  const pts = side === 'left'
    ? [`0% 0%`, `50% 0%`, `50% ${y}%`,
       ...jag.map(([x, d]) => `${x * 100}% calc(${y}% + ${d}px)`)]
    : [`100% 0%`, `50% 0%`, `50% ${y}%`,
       ...jag.map(([x, d]) => `${x * 100}% calc(${y}% + ${d}px)`)]
  return `polygon(${pts.join(', ')})`
}

// ─── Inline katana SVG ─────────────────────────────────────────────────────────
function KatanaSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 900" fill="none"
      style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <filter id="k-gl" x="-300%" y="-5%" width="700%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="k-gs" x="-100%" y="-5%" width="300%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="k-bg" x="-250%" y="-2%" width="600%" height="104%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Blade body */}
      <polygon points="80,15 76,28 69,640 91,640 84,28"       fill="#0f0f1e"/>
      <polygon points="80,18 84,28 91,640 83,640"              fill="#181828"/>
      <polygon points="80,18 76,28 69,640 77,640"              fill="#090912"/>
      <line x1="79" y1="35" x2="79" y2="625"   stroke="#07070f" strokeWidth="2.5"/>
      <line x1="82" y1="30" x2="82" y2="632"   stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"/>

      {/* Kissaki tip */}
      <polygon points="80,15 76,28 84,28"   fill="#c8c8d8"/>
      <polygon points="82,16 84,28 83.5,28" fill="white"/>
      <line x1="76" y1="28" x2="84" y2="28" stroke="rgba(255,255,255,0.38)" strokeWidth="0.6"/>

      {/* Ha (cutting edge) highlight — the defining visual */}
      <polygon points="84,28 87,38 93,640 91,640 88,640" fill="white" filter="url(#k-bg)"/>
      <polygon points="84,28 86,36 92,640 90.5,640"      fill="white"/>
      <line x1="84.5" y1="28" x2="91.5" y2="635"  stroke="white" strokeWidth="1" opacity="0.9"/>

      {/* Habaki */}
      <polygon points="68,640 92,640 95,668 65,668" fill="#25253a"/>
      <polygon points="69,641 91,641 94,667 66,667" fill="#1c1c2e"/>
      <line x1="65" y1="650" x2="95" y2="650"  stroke="#3a3a52" strokeWidth="0.6"/>
      <line x1="65" y1="660" x2="95" y2="660"  stroke="#2a2a3e" strokeWidth="0.6"/>
      <line x1="92" y1="640" x2="95" y2="668"  stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>

      {/* Tsuba */}
      <ellipse cx="80" cy="692" rx="46" ry="24" fill="#111120"/>
      <ellipse cx="80" cy="692" rx="42" ry="20" fill="#1e1e32"/>
      <ellipse cx="80" cy="692" rx="37" ry="15" fill="#161628"/>
      <ellipse cx="80" cy="692" rx="31" ry="10" fill="#1e1e32" stroke="#383855" strokeWidth="0.6"/>
      <ellipse cx="80" cy="679" rx="7" ry="5"  fill="#0a0a14" stroke="#383855" strokeWidth="0.5"/>
      <ellipse cx="80" cy="705" rx="7" ry="5"  fill="#0a0a14" stroke="#383855" strokeWidth="0.5"/>
      <ellipse cx="45" cy="692" rx="4" ry="6"  fill="#0a0a14" stroke="#383855" strokeWidth="0.5"/>
      <ellipse cx="115" cy="692" rx="4" ry="6" fill="#0a0a14" stroke="#383855" strokeWidth="0.5"/>
      <line x1="50" y1="688" x2="110" y2="688" stroke="#2a2a42" strokeWidth="0.6"/>
      <line x1="50" y1="696" x2="110" y2="696" stroke="#2a2a42" strokeWidth="0.6"/>
      <path d="M40,687 A42,20 0 0,1 120,687" stroke="rgba(255,255,255,0.13)" strokeWidth="1.2" fill="none"/>

      {/* Seppa spacers */}
      <ellipse cx="80" cy="714" rx="15" ry="6" fill="#252538"/>
      <ellipse cx="80" cy="714" rx="13" ry="4" fill="#1c1c2e"/>

      {/* Tsuka (handle) with wrap pattern */}
      <polygon points="65,720 95,720 97,892 63,892" fill="#0d0d18"/>
      <polygon points="66,721 94,721 96,891 64,891" fill="#111122"/>
      {[728, 746, 764, 782, 800, 818, 836, 854, 872, 890].map(y => (
        <g key={y}>
          <line x1="63" y1={y} x2="97" y2={y + 18} stroke="#232336" strokeWidth="3.5"/>
          <line x1="97" y1={y} x2="63" y2={y + 18} stroke="#1a1a2a" strokeWidth="2"/>
        </g>
      ))}
      <ellipse cx="80" cy="764" rx="8" ry="11" fill="#181828" stroke="#343450" strokeWidth="0.6"/>
      <ellipse cx="80" cy="856" rx="8" ry="11" fill="#181828" stroke="#343450" strokeWidth="0.6"/>
      <line x1="65" y1="720" x2="63" y2="892" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <line x1="95" y1="720" x2="97" y2="892" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

      {/* Kashira (pommel) */}
      <ellipse cx="80" cy="898" rx="26" ry="14" fill="#161628" stroke="#383855" strokeWidth="0.5"/>
      <ellipse cx="80" cy="898" rx="23" ry="11" fill="#1e1e34"/>
      <ellipse cx="80" cy="898" rx="19" ry="8"  fill="#161628"/>
      <path d="M59,895 A23,11 0 0,1 101,895" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>

      {/* Energy cracks — flickered by GSAP in useEffect */}
      <g id="k-cracks">
        {/* Left cracks L1 */}
        <polyline className="k-cl" points="74,110 59,132 68,158 46,185 60,205 32,230 48,250 24,272"
          stroke="white" strokeWidth="2" strokeLinejoin="round" filter="url(#k-gl)"/>
        <polyline className="k-cl" points="46,185 34,194 20,206"
          stroke="white" strokeWidth="0.9" filter="url(#k-gs)" opacity="0.75"/>
        <polyline className="k-cl" points="32,230 18,238 8,250"
          stroke="white" strokeWidth="0.8" filter="url(#k-gs)" opacity="0.65"/>
        <line className="k-cl" x1="24" y1="272" x2="12" y2="282" stroke="white" strokeWidth="1" opacity="0.8"/>
        <line className="k-cl" x1="24" y1="272" x2="10" y2="268" stroke="white" strokeWidth="0.7" opacity="0.6"/>
        {/* Left cracks L2 */}
        <polyline className="k-cl" points="72,340 52,362 62,388 38,415 54,436"
          stroke="white" strokeWidth="1.7" strokeLinejoin="round" filter="url(#k-gl)"/>
        <polyline className="k-cl" points="38,415 22,425 12,440"
          stroke="white" strokeWidth="0.8" filter="url(#k-gs)" opacity="0.6"/>
        <line className="k-cl" x1="54" y1="436" x2="40" y2="448" stroke="white" strokeWidth="0.9" opacity="0.7"/>
        {/* Left cracks L3 */}
        <polyline className="k-cl" points="71,520 48,544 58,572 32,598 46,618"
          stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.85" filter="url(#k-gl)"/>
        <polyline className="k-cl" points="32,598 16,608 6,622"
          stroke="white" strokeWidth="0.7" filter="url(#k-gs)" opacity="0.5"/>
        {/* Right cracks R1 */}
        <polyline className="k-cr" points="86,82 102,106 92,132 116,158 103,178 130,204 114,225 142,248"
          stroke="white" strokeWidth="2" strokeLinejoin="round" filter="url(#k-gl)"/>
        <polyline className="k-cr" points="116,158 132,166 148,158"
          stroke="white" strokeWidth="0.9" filter="url(#k-gs)" opacity="0.75"/>
        <polyline className="k-cr" points="130,204 146,212 156,204"
          stroke="white" strokeWidth="0.8" filter="url(#k-gs)" opacity="0.65"/>
        <line className="k-cr" x1="142" y1="248" x2="154" y2="258" stroke="white" strokeWidth="1" opacity="0.8"/>
        <line className="k-cr" x1="142" y1="248" x2="156" y2="243" stroke="white" strokeWidth="0.7" opacity="0.6"/>
        {/* Right cracks R2 */}
        <polyline className="k-cr" points="88,290 112,314 100,338 126,366 110,388 136,412"
          stroke="white" strokeWidth="1.7" strokeLinejoin="round" filter="url(#k-gl)"/>
        <polyline className="k-cr" points="126,366 144,374 156,362"
          stroke="white" strokeWidth="0.8" filter="url(#k-gs)" opacity="0.6"/>
        <line className="k-cr" x1="136" y1="412" x2="150" y2="420" stroke="white" strokeWidth="0.9" opacity="0.7"/>
        {/* Right cracks R3 */}
        <polyline className="k-cr" points="88,468 114,492 102,518 128,545 114,565"
          stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.85" filter="url(#k-gl)"/>
        <polyline className="k-cr" points="128,545 146,554 156,544"
          stroke="white" strokeWidth="0.7" filter="url(#k-gs)" opacity="0.5"/>
      </g>
    </svg>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function SwordTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const swordRef   = useRef<HTMLDivElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const overlay = overlayRef.current
    const sword   = swordRef.current
    const left    = leftRef.current
    const right   = rightRef.current
    const canvas  = canvasRef.current
    if (!overlay || !sword || !left || !right || !canvas) return

    // ── Canvas ──────────────────────────────────────────────────────────────
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const particles: Particle[] = []
    let lastSpawnY = -999

    const spawn = (y: number) => {
      if (Math.abs(y - lastSpawnY) < 8) return
      lastSpawnY = y
      for (let i = 0; i < 7; i++) {
        const a = Math.random() * Math.PI * 2
        const s = Math.random() * 3 + 0.8
        particles.push({
          x: W / 2 + (Math.random() - 0.5) * 40,
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s * 0.5,
          life: 35 + Math.random() * 45, maxLife: 80,
          size: Math.random() * 2.5 + 0.5,
          isStreak: Math.random() < 0.35,
        })
      }
    }

    // ── Smoothed scroll progress via rAF ───────────────────────────────────
    let targetP  = 0
    let currentP = 0
    let rafId    = 0

    const onScroll = () => {
      // Play the full animation over the Hero scroll distance (one full viewport height)
      targetP = Math.max(0, Math.min(1, window.scrollY / window.innerHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Main draw loop ──────────────────────────────────────────────────────
    const draw = () => {
      // Smooth interpolation toward target (≈ scrub 0.4 feel)
      currentP += (targetP - currentP) * 0.14
      const p = currentP

      // Fade envelope (show only during active scroll range)
      const fade = p < 0.005 ? p / 0.005 : p > 0.92 ? (1 - p) / 0.08 : 1
      overlay.style.opacity = String(Math.max(0, Math.min(1, fade)))

      ctx.clearRect(0, 0, W, H)

      if (p > 0.005 && p < 1.0) {
        // ── Sword position ─────────────────────────────────────────────────
        // tip travels from screen top (p=0) to bottom (p=1)
        const sH   = H * 0.88
        const tipY = p * H
        const sTop = tipY - sH * 0.017  // kissaki is 1.7% from top of viewBox
        sword.style.transform = `translateX(-50%) translateY(${sTop}px)`

        if (p > 0.01 && p < 0.92) spawn(tipY)

        // ── Ink tear panels ────────────────────────────────────────────────
        const swordVH = (tipY / H) * 100
        const vh      = Math.max(0, Math.min(100, swordVH))

        if (vh > 0.1) {
          left.style.clipPath  = buildPanel('left',  vh)
          right.style.clipPath = buildPanel('right', vh)
        } else {
          const zero = 'polygon(0% 0%, 50% 0%, 50% 0%)'
          left.style.clipPath  = zero
          right.style.clipPath = zero
        }


        // ── Canvas: vertical glow trail ────────────────────────────────────
        const trailTop = Math.max(0, tipY - H * 0.3)
        if (tipY > 0) {
          const lg = ctx.createLinearGradient(W / 2, trailTop, W / 2, tipY)
          lg.addColorStop(0, 'rgba(255,255,255,0)')
          lg.addColorStop(0.6, 'rgba(180,210,255,0.06)')
          lg.addColorStop(0.9, 'rgba(255,255,255,0.3)')
          lg.addColorStop(1, 'rgba(255,255,255,0.08)')
          ctx.save()
          ctx.shadowBlur = 18
          ctx.shadowColor = 'rgba(180,210,255,0.7)'
          ctx.strokeStyle = lg
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(W / 2, trailTop)
          ctx.lineTo(W / 2, tipY)
          ctx.stroke()
          ctx.restore()
        }

        // ── Canvas: jagged tear-edge glow (at tipY) ───────────────────────
        if (tipY > 0 && tipY < H) {
          const drawEdge = (w: number, blur: number, alpha: number) => {
            ctx.save()
            ctx.shadowBlur = blur
            ctx.shadowColor = 'rgba(200,230,255,0.9)'
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = w
            ctx.beginPath()
            ctx.moveTo(0, tipY)
            for (const [x, d] of JAG_L.slice().reverse()) ctx.lineTo(x * W, tipY + d)
            for (const [x, d] of JAG_R) ctx.lineTo(x * W, tipY + d)
            ctx.stroke()
            ctx.restore()
          }
          drawEdge(6, 30, 0.3)   // wide outer glow
          drawEdge(1.5, 10, 0.9) // sharp inner line

          // Impact burst at center
          const rg = ctx.createRadialGradient(W / 2, tipY, 0, W / 2, tipY, 50)
          rg.addColorStop(0, 'rgba(255,255,255,0.55)')
          rg.addColorStop(0.5, 'rgba(180,210,255,0.12)')
          rg.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.save()
          ctx.fillStyle = rg
          ctx.beginPath()
          ctx.ellipse(W / 2, tipY, 50, 18, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // ── Canvas: particles ──────────────────────────────────────────────
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i]
          pt.x += pt.vx; pt.y += pt.vy
          pt.vx *= 0.92;  pt.vy *= 0.88
          pt.life--
          if (pt.life <= 0) { particles.splice(i, 1); continue }

          const a = (pt.life / pt.maxLife) * 0.9
          ctx.save()
          ctx.shadowBlur = 8
          ctx.shadowColor = 'rgba(180,210,255,0.8)'
          if (pt.isStreak) {
            ctx.strokeStyle = `rgba(255,255,255,${a})`
            ctx.lineWidth = pt.size * 0.45
            ctx.beginPath()
            ctx.moveTo(pt.x, pt.y)
            ctx.lineTo(pt.x - pt.vx * 5, pt.y - pt.vy * 5)
            ctx.stroke()
          } else {
            ctx.fillStyle = `rgba(255,255,255,${a})`
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, pt.size * a, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()
        }
      } else {
        // outside active range — ensure panels retract
        const zero = 'polygon(0% 0%, 50% 0%, 50% 0%)'
        left.style.clipPath  = zero
        right.style.clipPath = zero
        particles.length = 0
      }

      rafId = requestAnimationFrame(draw)
    }
    draw()

    // ── GSAP crack flicker ─────────────────────────────────────────────────
    const cracks = Array.from(
      document.querySelectorAll<SVGElement>('#k-cracks .k-cl, #k-cracks .k-cr')
    )
    const flickers = cracks.map((el, i) =>
      gsap.to(el, {
        opacity: 0.2 + Math.random() * 0.7,
        duration: 0.06 + Math.random() * 0.22,
        repeat: -1, yoyo: true,
        delay: i * 0.04,
        ease: 'steps(1)',
      })
    )

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      flickers.forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: 30, pointerEvents: 'none', opacity: 0 }}
    >
      {/* Left ink tear panel */}
      <div ref={leftRef} style={{
        position: 'absolute', inset: 0,
        background: '#060809',
        clipPath: 'polygon(0% 0%, 50% 0%, 50% 0%)',
      }} />

      {/* Right ink tear panel */}
      <div ref={rightRef} style={{
        position: 'absolute', inset: 0,
        background: '#060809',
        clipPath: 'polygon(50% 0%, 100% 0%, 50% 0%)',
      }} />


      {/* Canvas — glow trail, tear edge, particles */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        mixBlendMode: 'screen',
      }} />

      {/* Sword SVG */}
      <div ref={swordRef} style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%) translateY(-900px)',
        width: 'clamp(65px, 6.5vw, 105px)',
        willChange: 'transform',
        filter: [
          'drop-shadow(0 0 10px rgba(255,255,255,0.6))',
          'drop-shadow(0 0 28px rgba(180,210,255,0.35))',
          'drop-shadow(0 0 55px rgba(255,255,255,0.14))',
        ].join(' '),
      }}>
        <KatanaSVG />
      </div>
    </div>
  )
}
