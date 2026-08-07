'use client'
import { useRef, useEffect } from 'react'

const N = 28

function makeOffsets(s: number): number[] {
  return Array.from({ length: N + 1 }, (_, i) => {
    const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453
    return (v - Math.floor(v) - 0.5) * 7
  })
}

// Polygon covering LEFT of crack — LTR reveal (cut: -10 → 110)
function ltrClip(cut: number, offs: number[], jit: number, t: number) {
  const pts: string[] = []
  for (let i = N; i >= 0; i--) {
    const y = (i / N) * 100
    const active = cut > -5 && cut < 105
    const x = cut + offs[i] + (active ? Math.sin(t * 4 + i * 1.1) * jit : 0)
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
  }
  return `polygon(0% 0%,0% 100%,${pts.join(',')})`
}

// Polygon covering RIGHT of crack — RTL reveal (cut: -10 → 110, mirrored)
function rtlClip(cut: number, offs: number[], jit: number, t: number) {
  const pts: string[] = []
  for (let i = N; i >= 0; i--) {
    const y = (i / N) * 100
    const active = cut > -5 && cut < 105
    const x = 100 - cut - offs[i] + (active ? Math.sin(t * 4 + i * 1.1) * jit : 0)
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
  }
  return `polygon(100% 0%,100% 100%,${pts.join(',')})`
}

type Variant = 'ltr' | 'rtl'

export default function CrackReveal({
  children,
  delay = 0,
  duration = 950,
  variant = 'ltr',
  className,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  variant?: Variant
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const offs = makeOffsets(Math.random() * 1000)
    let rafId = 0
    let started = false
    let t = 0

    el.style.clipPath = variant === 'rtl' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'

    const trigger = () => {
      if (started) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        started = true
        window.removeEventListener('scroll', trigger)
        setTimeout(() => {
          const target = el
          const t0 = performance.now()
          function frame(now: number) {
            const p = Math.min(1, (now - t0) / duration)
            const eased = 1 - Math.pow(1 - p, 4)
            const cut = -10 + eased * 120
            t += 0.018
            target.style.clipPath = variant === 'rtl'
              ? rtlClip(cut, offs, 1.6, t)
              : ltrClip(cut, offs, 1.6, t)
            if (p < 1) rafId = requestAnimationFrame(frame)
            else target.style.clipPath = ''
          }
          rafId = requestAnimationFrame(frame)
        }, delay)
      }
    }

    window.addEventListener('scroll', trigger, { passive: true })
    trigger() // fire immediately if already in view
    return () => { window.removeEventListener('scroll', trigger); cancelAnimationFrame(rafId) }
  }, [delay, duration, variant])

  return <div ref={ref} className={className}>{children}</div>
}
