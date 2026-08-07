'use client'
import { useEffect, useRef } from 'react'

// Approximate half-height of the icon strip (lines + icons + gaps)
const STRIP_HALF = 140

export default function FloatingSocials() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const progress = Math.min(1, window.scrollY / window.innerHeight)
      const startBottom = 80                                      // lower-left in hero
      const endBottom   = window.innerHeight / 2 - STRIP_HALF   // centered on screen
      el.style.bottom = `${startBottom + (endBottom - startBottom) * progress}px`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-label="Social links"
      className="hidden md:flex fixed left-10 z-[60] flex-col items-center gap-4 pointer-events-none"
      style={{ bottom: 80 }}
    >
      <div className="w-px h-8 bg-gradient-to-b from-transparent to-paper/25" />

      <a href="https://github.com/NileetSavale" target="_blank" rel="noopener" aria-label="GitHub" className="pointer-events-auto text-paper/40 hover:text-gold transition-colors duration-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      </a>

      <a href="https://linkedin.com/in/nileet" target="_blank" rel="noopener" aria-label="LinkedIn" className="pointer-events-auto text-paper/40 hover:text-gold transition-colors duration-200">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      <a href="https://x.com/SavaleNileet" target="_blank" rel="noopener" aria-label="X / Twitter" className="pointer-events-auto text-paper/40 hover:text-gold transition-colors duration-200">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      <a href="mailto:savalenileet@gmail.com" aria-label="Email" className="pointer-events-auto text-paper/40 hover:text-gold transition-colors duration-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </a>

      <a href="/Nileet-Savale-Resume.pdf" target="_blank" rel="noopener" aria-label="Resume" className="pointer-events-auto text-paper/40 hover:text-gold transition-colors duration-200">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      </a>

      <div className="w-px h-12 bg-gradient-to-b from-paper/25 to-transparent" />
    </div>
  )
}
