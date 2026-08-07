'use client'
import { useRef, useEffect, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function LidReveal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef       = useRef<HTMLDivElement>(null)
  const botRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // Lids open as you scroll: start when section top hits 82%, finish at 18%
          start: 'top 82%',
          end:   'top 18%',
          scrub: 0.9,       // slight smoothing so it doesn't feel mechanical
        },
      })
      tl.to(topRef.current, { yPercent: -101, ease: 'none' }, 0)
        .to(botRef.current, { yPercent:  101, ease: 'none' }, 0)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {children}

      {/* Top lid */}
      <div
        ref={topRef}
        aria-hidden
        className="absolute pointer-events-none z-[20]"
        style={{
          top: 0, left: '-5%', right: '-5%',
          height: 'calc(50% + 3px)',
          background: 'linear-gradient(180deg,#0c1216 0%,#080d10 100%)',
          willChange: 'transform',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: 'linear-gradient(0deg,rgba(244,196,48,.25) 0%,transparent 100%)', boxShadow: '0 2px 20px rgba(244,196,48,.1)' }} />
      </div>

      {/* Bottom lid */}
      <div
        ref={botRef}
        aria-hidden
        className="absolute pointer-events-none z-[20]"
        style={{
          bottom: 0, left: '-5%', right: '-5%',
          height: 'calc(50% + 3px)',
          background: 'linear-gradient(0deg,#0c1216 0%,#080d10 100%)',
          willChange: 'transform',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, background: 'linear-gradient(180deg,rgba(244,196,48,.25) 0%,transparent 100%)', boxShadow: '0 -2px 20px rgba(244,196,48,.1)' }} />
      </div>
    </div>
  )
}
