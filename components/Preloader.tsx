'use client'
import { useRef, useEffect } from 'react'

export default function Preloader() {
  const rootRef  = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el    = rootRef.current
    const flash = flashRef.current
    if (!el || !flash) return

    const run = () => {
      setTimeout(() => {
        // Brief white flash — scene cut
        flash.style.transition = 'opacity 0.07s ease-out'
        flash.style.opacity    = '1'
        setTimeout(() => {
          flash.style.opacity = '0'
          // Curtain lifts — preloader slides up off screen
          el.style.transition      = 'transform 0.85s cubic-bezier(0.77,0,0.18,1)'
          el.style.transform       = 'translateY(-100%)'
          setTimeout(() => { el.style.display = 'none' }, 900)
        }, 80)
      }, 2900)
    }

    if (document.readyState === 'complete') run()
    else window.addEventListener('load', run, { once: true })
  }, [])

  const K = { fontFamily: 'var(--font-kanji)' }
  const D = { fontFamily: 'var(--font-display)' }

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center gap-5">
      {/* Flash overlay — fires on exit */}
      <div ref={flashRef} aria-hidden className="absolute inset-0 bg-paper pointer-events-none" style={{ opacity: 0, zIndex: 10 }} />

      {/* Gold leading edge — visible as curtain exits */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg,transparent,#f4c430 20%,#ff7a2f 50%,#f4c430 80%,transparent)', zIndex: 11 }} />

      <div className="flex gap-7" style={K}>
        {[
          { char: 'ニ', color: '#ff7a2f', shadow: 'rgba(255,122,47,.4)', delay: '.10s' },
          { char: 'リ', color: '#f4c430', shadow: 'rgba(244,196,48,.4)', delay: '.30s' },
          { char: 'ー', color: '#9fe8ff', shadow: 'rgba(159,232,255,.4)', delay: '.50s' },
          { char: 'ト', color: '#c06aff', shadow: 'rgba(192,106,255,.4)', delay: '.70s' },
        ].map(({ char, color, shadow, delay }) => (
          <span
            key={char}
            className="text-[clamp(48px,10vw,80px)] font-bold opacity-0"
            style={{ color, textShadow: `0 0 30px ${shadow}`, animation: `fadeUp .4s ${delay} forwards` }}
          >
            {char}
          </span>
        ))}
      </div>

      <div
        className="text-[clamp(22px,5vw,52px)] tracking-[.18em] text-paper opacity-0"
        style={{ ...D, animation: 'fadeUp .5s 1.2s forwards' }}
      >
        NILEET SAVALE
      </div>

      <div className="w-[180px] h-px bg-white/10 relative overflow-hidden opacity-0" style={{ animation: 'fadeUp .3s 1.5s forwards' }}>
        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-flame to-gold" style={{ animation: 'barFill 1.1s 1.6s ease-out forwards' }} />
      </div>

      <p className="text-[9px] tracking-[.45em] uppercase text-paper/55 opacity-0" style={{ animation: 'fadeUp .3s 1.5s forwards' }}>
        INITIALIZING...
      </p>
    </div>
  )
}
