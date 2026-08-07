'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function ChapterCard({
  num, title, kanji, sub,
}: {
  num: string
  title: string
  kanji: string
  sub?: string
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const lineRef  = useRef<HTMLDivElement>(null)
  const numRef   = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef   = useRef<HTMLParagraphElement>(null)
  const kanjiRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub the whole card out as the user scrolls past (Zoro sword-drop intro style)
      gsap.to(innerRef.current, {
        yPercent:   -8,
        ease:       'none',
        scrollTrigger: {
          trigger: innerRef.current,
          start:   'top top',
          end:     'bottom top',
          scrub:   true,
        },
      })

      // Content reveal — staggered, one-shot on enter
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: innerRef.current,
          start:   'top 90%',
          toggleActions: 'play none none reset',
          onEnter: () => {
            if (flashRef.current) {
              gsap.fromTo(flashRef.current,
                { opacity: 0.22 },
                { opacity: 0, duration: 0.55, ease: 'power2.out' }
              )
            }
          },
        },
      })
      tl.fromTo(kanjiRef.current,
          { y: 40 },
          { y: 0, duration: 1.4, ease: 'expo.out' }
        )
        .fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'expo.out' },
          '-=1.0'
        )
        .from(numRef.current, { y: 20, duration: 0.5, ease: 'expo.out' }, '-=0.6')
        .fromTo(titleRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out' },
          '-=0.45'
        )
      if (subRef.current) {
        tl.from(subRef.current, { y: 14, duration: 0.6, ease: 'expo.out' }, '-=0.65')
      }
    }, innerRef)

    return () => ctx.revert()
  }, [])

  return (
    // Outer wrapper gives 60vh of "hold" scroll distance after the card fills screen
    <div style={{ height: '160vh' }}>
      <div
        ref={innerRef}
        className="sticky top-0 h-screen bg-ink overflow-hidden flex flex-col justify-center rounded-t-[32px]"
        style={{ boxShadow: '0 -40px 80px rgba(0,0,0,0.85)' }}
      >
        {/* Scene-cut flash */}
        <div ref={flashRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ opacity: 0, background: 'radial-gradient(ellipse at center,rgba(244,196,48,0.28) 0%,rgba(255,122,47,0.08) 45%,transparent 70%)', zIndex: 14 }} />

        {/* Scanline texture */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.012) 3px,rgba(255,255,255,.012) 4px)' }} />

        {/* Radial vignette */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.65) 100%)' }} />

        {/* Ghost kanji — fills the center */}
        <div ref={kanjiRef} aria-hidden className="absolute inset-0 flex items-center justify-end pr-[8vw] select-none pointer-events-none">
          <span className="font-kanji leading-none" style={{ fontSize: 'clamp(180px,28vw,420px)', color: 'transparent', WebkitTextStroke: '1px rgba(244,196,48,.07)' }}>
            {kanji}
          </span>
        </div>

        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(244,196,48,.3),rgba(192,0,26,.18),transparent)' }} />

        {/* Content */}
        <div className="relative max-w-[1120px] mx-auto px-12 w-full" style={{ zIndex: 2 }}>
          <div ref={numRef} className="mb-5">
            <p className="text-[8px] tracking-[.65em] uppercase text-gold/50">Chapter — {num}</p>
          </div>

          <div
            ref={lineRef}
            className="h-px mb-8 origin-left"
            style={{ background: 'linear-gradient(90deg,#f4c430 0%,#c0001a 38%,#7b3ff2 68%,rgba(123,63,242,0) 100%)' }}
          />

          <div ref={titleRef} className="overflow-visible">
            <h2
              className="font-display uppercase leading-[.85] tracking-[.05em]"
              style={{ fontSize: 'clamp(52px,9vw,130px)', background: 'linear-gradient(130deg,#efe8da 20%,#f4c430 55%,#ff7a2f 95%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
            >
              {title}
            </h2>
          </div>

          {sub && (
            <p ref={subRef} className="mt-7 text-[12px] leading-[1.9] tracking-[.03em] text-paper/40 max-w-[480px] italic">
              {sub}
            </p>
          )}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[8px] tracking-[.4em] uppercase text-paper">Scroll</span>
          <i className="block w-px h-10 bg-gradient-to-b from-gold to-transparent not-italic" style={{ animation: 'drip 1.9s ease-in-out infinite' }} />
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(244,196,48,.12),transparent)' }} />
      </div>
    </div>
  )
}
