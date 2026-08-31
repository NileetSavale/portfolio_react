'use client'
import { useEffect, useState } from 'react'

const LABELS: Record<string, string> = {
  hero: '§ HERO', about: '§ ABOUT', skills: '§ SKILLS',
  projects: '§ PROJECTS', experience: '§ JOURNEY', contact: '§ CONTACT',
}

export default function HudBottom() {
  const [sec, setSec] = useState('§ HERO')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach(e => { if (e.isIntersecting) setSec(LABELS[e.target.id] ?? '§ ' + e.target.id.toUpperCase()) }),
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div aria-hidden className="hidden md:flex fixed bottom-0 left-0 right-0 z-[60] px-12 py-[18px] justify-between items-end pointer-events-none text-[9px] tracking-[.28em] uppercase text-paper/55">
      <span>savalenileet@gmail.com</span>
<span>{sec}</span>
    </div>
  )
}
