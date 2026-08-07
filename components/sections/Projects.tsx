'use client'
import { useRef, useEffect } from 'react'
import Reveal from '@/components/Reveal'
import CinematicReveal from '@/components/CinematicReveal'
import type { Project } from '@/data/projects'

const CARD_STEP = 424 // 400px card + 24px gap

export default function Projects({ projects }: { projects: unknown[] }) {
  const PROJECTS   = projects as Project[]
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const mobileRef  = useRef<HTMLDivElement>(null)
  const idxRef     = useRef(0)
  const accRef     = useRef(0)

  const goTo = (n: number) => {
    const c = cardsRef.current
    if (!c) return
    idxRef.current = Math.max(0, Math.min(PROJECTS.length - 1, n))
    c.scrollTo({ left: idxRef.current * CARD_STEP, behavior: 'smooth' })
  }

  const scrollPrev = () => {
    if (window.innerWidth >= 768) goTo(idxRef.current - 1)
    else mobileRef.current?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' })
  }
  const scrollNext = () => {
    if (window.innerWidth >= 768) goTo(idxRef.current + 1)
    else mobileRef.current?.scrollBy({ left: window.innerWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards) return

    const onCardsScroll = () => {
      idxRef.current = Math.round(cards.scrollLeft / CARD_STEP)
    }
    cards.addEventListener('scroll', onCardsScroll, { passive: true })

    let resetTimer: ReturnType<typeof setTimeout>

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return
      const maxLeft = cards.scrollWidth - cards.clientWidth
      if (cards.scrollLeft <= 0 && e.deltaY < 0) return           // at start → let page scroll up
      if (cards.scrollLeft >= maxLeft - 1 && e.deltaY > 0) return // at end → let page scroll down
      e.preventDefault()
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => { accRef.current = 0 }, 250)
      accRef.current += e.deltaY
      if (Math.abs(accRef.current) > 60) {
        goTo(idxRef.current + (accRef.current > 0 ? 1 : -1))
        accRef.current = 0
      }
    }

    // Only intercept wheel when hovering the cards rail, not the whole section
    cards.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      cards.removeEventListener('wheel', onWheel)
      cards.removeEventListener('scroll', onCardsScroll)
      clearTimeout(resetTimer)
    }
  }, [])

  const Card = ({ p }: { p: Project }) => (
    <div className="proj-card shrink-0 w-[100vw] md:w-[400px] group relative border border-gold/15 p-[34px] bg-gold/[.025] overflow-hidden hover:border-gold/40 transition-colors duration-250">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-gold to-flame scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <div aria-hidden className="absolute top-3.5 right-5 font-display text-[68px] leading-none text-gold/7 select-none">{p.num}</div>
      <span className={`inline-block text-[8px] tracking-[.22em] uppercase px-2.5 py-[3px] mb-3.5 ${p.badgeCls}`}>{p.badge}</span>
      <h3 className="font-heading text-[18px] tracking-[.06em] uppercase mb-3">{p.title}</h3>
      <p className="text-[12px] leading-[1.85] text-paper/62 mb-[22px]">{p.desc}</p>
      <div className="flex flex-wrap gap-[7px] mb-[22px]">
        {p.tech.map(t => <span key={t} className="text-[8px] tracking-[.2em] uppercase px-2.5 py-[3px] border border-white/13 text-paper/55">{t}</span>)}
      </div>
      <div className="flex gap-[18px]">
        {p.links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noopener" className="text-[9px] tracking-[.25em] uppercase text-gold no-underline hover:opacity-65 transition-opacity duration-200">{l.label}</a>)}
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-ink overflow-hidden flex flex-col md:h-screen md:justify-center md:gap-10 py-14 md:py-0 rounded-t-[32px]"
      style={{ zIndex: 25, boxShadow: '0 -40px 80px rgba(0,0,0,0.85)' }}
    >
      {/* Header */}
      <div className="relative max-w-[1120px] mx-auto px-12 w-full" style={{ zIndex: 1 }}>
        <Reveal>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[9px] tracking-[.5em] uppercase text-gold">Missions</span>
            <div className="w-[60px] h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </Reveal>
        <div className="flex items-end justify-between">
          <CinematicReveal>
            <h2 className="font-heading font-bold text-[clamp(34px,5.5vw,68px)] leading-[.95] uppercase tracking-[.04em]">
              Featured<br />Projects
            </h2>
          </CinematicReveal>
          <p className="hidden md:block text-[8px] tracking-[.3em] uppercase text-paper/30 mb-1">scroll or use arrows</p>
        </div>
      </div>

      {/* Desktop rail with flanking arrows */}
      <div className="relative hidden md:flex" style={{ zIndex: 1 }}>
        <div className="w-full px-24 flex items-center gap-4">
          <button onClick={scrollPrev} aria-label="Previous project" className="shrink-0 w-10 h-10 border border-gold/25 flex items-center justify-center text-paper/40 hover:border-gold hover:text-gold transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div ref={cardsRef} className="flex-1 flex gap-6 overflow-x-auto pb-4 hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
            {PROJECTS.map(p => <Card key={p.num} p={p} />)}
          </div>
          <button onClick={scrollNext} aria-label="Next project" className="shrink-0 w-10 h-10 border border-gold/25 flex items-center justify-center text-paper/40 hover:border-gold hover:text-gold transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile swipeable — full bleed */}
      <div ref={mobileRef} className="md:hidden flex overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar" style={{ zIndex: 1 }}>
        {PROJECTS.map(p => (
          <div key={p.num} className="snap-start shrink-0">
            <Card p={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
