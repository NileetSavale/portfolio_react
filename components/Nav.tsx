'use client'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/data/personal'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })

    const obs = new IntersectionObserver(
      (es) => es.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] px-12 py-6 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-ink/90 backdrop-blur-[14px]' : ''}`}>
      <a href="#hero" className="text-[20px] tracking-[.28em] text-paper no-underline font-display">
        NS<span className="text-gold">.</span>
      </a>
      <div className="hidden md:flex gap-7 items-center">
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            className={`text-[9px] tracking-[.28em] uppercase no-underline transition-colors duration-200 ${active === l.href ? 'text-gold' : 'text-paper/55 hover:text-paper'}`}
          >
            {l.label}
          </a>
        ))}
        <a href="/resume" className="px-4 py-[7px] border border-gold/40 text-[9px] tracking-[.28em] uppercase text-gold no-underline hover:bg-gold hover:text-ink transition-all duration-200">
          Resume
        </a>
      </div>
    </nav>
  )
}
