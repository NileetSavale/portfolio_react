'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
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
      <a href="#hero" className="flex items-center gap-3 no-underline group">
        <Image src="/logo2.svg" alt="Nileet Savale" width={32} height={32} className="flex-none" />
        <span className="text-[13px] tracking-[.18em] uppercase text-paper font-display group-hover:text-gold transition-colors duration-200">
          Nileet Savale
        </span>
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
