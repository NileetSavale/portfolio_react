'use client'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'about',      label: 'About'    },
  { id: 'skills',     label: 'Skills'   },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Journey'  },
  { id: 'contact',    label: 'Contact'  },
]

export default function SectionIndicator() {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show after scrolling past the hero
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.25 }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[55] hidden lg:flex flex-col gap-[14px] transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {SECTIONS.map(s => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2.5 justify-end"
            aria-label={`Scroll to ${s.label}`}
          >
            {/* Label — appears on hover or when active */}
            <span
              className={`text-[7px] tracking-[.28em] uppercase transition-all duration-200 ${
                isActive
                  ? 'opacity-100 text-gold'
                  : 'opacity-0 group-hover:opacity-100 text-paper/50'
              }`}
            >
              {s.label}
            </span>
            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:  isActive ? 8 : 4,
                height: isActive ? 8 : 4,
                background: isActive ? '#f4c430' : 'rgba(239,232,218,.3)',
                boxShadow: isActive ? '0 0 8px rgba(244,196,48,.6)' : 'none',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
