'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

// "/" diagonal parallelogram — 60-unit lean, 170-unit wide so every y-row is covered.
// Consistent M L L L Z / M L structures let GSAP number-interpolate the d attribute cleanly.
const D = {
  fill: {
    in:   'M -230,-5 L -60,-5 L 0,105 L -170,105 Z',
    full: 'M -65,-5 L 105,-5 L 165,105 L -5,105 Z',
    out:  'M 100,-5 L 270,-5 L 330,105 L 160,105 Z',
  },
  // TR→BR of the parallelogram — the leading diagonal edge
  edge: {
    in:   'M -60,-5 L 0,105',
    full: 'M 105,-5 L 165,105',
    out:  'M 270,-5 L 330,105',
  },
}

export default function SVGTransition() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const edgeRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const fill = fillRef.current
    const edge = edgeRef.current
    if (!wrap || !fill || !edge) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const play = () => {
      gsap.killTweensOf([fill, edge])
      fill.setAttribute('d', D.fill.in)
      edge.setAttribute('d', D.edge.in)
      wrap.style.visibility = 'visible'

      const t1 = { duration: 0.45, ease: 'power2.in'  as const }
      const t2 = { duration: 0.55, ease: 'power2.out' as const, delay: 0.12 }

      gsap.to(fill, { attr: { d: D.fill.full }, ...t1 })
      gsap.to(edge, {
        attr: { d: D.edge.full },
        ...t1,
        onComplete() {
          gsap.to(fill, { attr: { d: D.fill.out }, ...t2 })
          gsap.to(edge, {
            attr: { d: D.edge.out },
            ...t2,
            onComplete() { wrap.style.visibility = 'hidden' },
          })
        },
      })
    }

    window.addEventListener('section-snap', play as EventListener)
    return () => window.removeEventListener('section-snap', play as EventListener)
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: 9998, visibility: 'hidden', pointerEvents: 'none' }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#060809" />
            <stop offset="100%" stopColor="#0d1820" />
          </linearGradient>
        </defs>
        {/* Dark slash fill */}
        <path ref={fillRef} d={D.fill.in} fill="url(#dg)" />
        {/* Gold leading edge — visible as the slash cuts across the screen */}
        <path
          ref={edgeRef}
          d={D.edge.in}
          fill="none"
          stroke="#f4c430"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
