'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { NAV_LINKS } from '@/data/personal'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [open, setOpen]         = useState(false)

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

  // Close menu on route change / link click
  function handleNavClick() { setOpen(false) }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-300 ${scrolled || open ? 'bg-ink/95 backdrop-blur-[14px]' : ''}`}>
        <a href="#hero" className="flex items-center gap-3 no-underline group" onClick={handleNavClick}>
          <Image src="/logo2.svg" alt="Nileet Savale" width={32} height={32} className="flex-none" />
          <span className="text-[13px] tracking-[.18em] uppercase text-paper font-display group-hover:text-gold transition-colors duration-200">
            Nileet Savale
          </span>
        </a>

        {/* Desktop links */}
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

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
        >
          <span className={`block w-5 h-px bg-paper transition-all duration-300 origin-center ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block w-5 h-px bg-paper transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-paper transition-all duration-300 origin-center ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div className={`fixed inset-x-0 top-[73px] z-[59] md:hidden bg-ink/95 backdrop-blur-[14px] border-b border-white/8 transition-all duration-300 overflow-hidden ${open ? 'max-h-screen py-6' : 'max-h-0'}`}>
        <div className="flex flex-col px-6 gap-1">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className={`py-3 text-[10px] tracking-[.28em] uppercase no-underline border-b border-white/6 transition-colors duration-200 ${active === l.href ? 'text-gold' : 'text-paper/60 hover:text-paper'}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume"
            onClick={handleNavClick}
            className="mt-4 px-4 py-3 border border-gold/40 text-[10px] tracking-[.28em] uppercase text-gold text-center no-underline hover:bg-gold hover:text-ink transition-all duration-200"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  )
}
