'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import CinematicReveal from '@/components/CinematicReveal'

export type GalleryItem = {
  num:     string
  src:     string
  caption: string
  sub?:    string
}

const CARD_W = 480

function Card({ item }: { item: GalleryItem }) {
  return (
    <div
      className="relative flex-none overflow-hidden border border-white/10 hover:border-gold/40 transition-colors duration-300 group"
      style={{ width: CARD_W, aspectRatio: '16/9' }}
    >
      <Image
        src={item.src}
        alt={item.caption}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        sizes="380px"
      />

      {/* Gold gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,8,9,0.92) 0%, rgba(6,8,9,0.3) 45%, transparent 100%)' }}
      />

      {/* Chapter number */}
      <div className="absolute top-4 left-4 text-[9px] tracking-[.45em] uppercase text-gold/60 font-mono">
        {item.num}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[13px] tracking-[.04em] text-paper font-heading leading-tight mb-1">
          {item.caption}
        </p>
        {item.sub && (
          <p className="text-[9px] tracking-[.25em] uppercase text-gold/70">{item.sub}</p>
        )}
      </div>

      {/* Hover slash accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #f4c430, #c0001a, transparent)' }}
      />
    </div>
  )
}

export default function Gallery({ items }: { items: unknown[] }) {
  const ITEMS    = items as GalleryItem[]
  const railRef  = useRef<HTMLDivElement>(null)
  const idxRef   = useRef(0)
  const accRef   = useRef(0)

  const goTo = (n: number) => {
    const c = railRef.current
    if (!c) return
    idxRef.current = Math.max(0, Math.min(ITEMS.length - 1, n))
    c.scrollTo({ left: idxRef.current * (CARD_W + 24), behavior: 'smooth' })
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const onScroll = () => { idxRef.current = Math.round(rail.scrollLeft / (CARD_W + 24)) }
    rail.addEventListener('scroll', onScroll, { passive: true })

    let resetTimer: ReturnType<typeof setTimeout>
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return
      const maxLeft = rail.scrollWidth - rail.clientWidth
      if (rail.scrollLeft <= 0 && e.deltaY < 0) return
      if (rail.scrollLeft >= maxLeft - 1 && e.deltaY > 0) return
      e.preventDefault()
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => { accRef.current = 0 }, 250)
      accRef.current += e.deltaY
      if (Math.abs(accRef.current) > 60) {
        goTo(idxRef.current + (accRef.current > 0 ? 1 : -1))
        accRef.current = 0
      }
    }
    rail.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      rail.removeEventListener('scroll', onScroll)
      rail.removeEventListener('wheel', onWheel)
      clearTimeout(resetTimer)
    }
  }, [])

  if (!ITEMS.length) return null

  return (
    <section id="gallery" className="py-[110px] bg-ink">
      <div className="max-w-[1120px] mx-auto px-12 mb-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[9px] tracking-[.5em] uppercase text-gold">Moments</span>
            <div className="w-[60px] h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </Reveal>
        <CinematicReveal delay={50}>
          <h2 className="font-heading font-bold text-[clamp(34px,5.5vw,68px)] leading-[.95] uppercase tracking-[.04em]">
            The<br />Journey
          </h2>
        </CinematicReveal>
      </div>

      {/* Desktop rail */}
      <div className="relative hidden md:block">
        <div className="w-full px-24 flex items-center gap-4">

          <button
            onClick={() => goTo(idxRef.current - 1)}
            aria-label="Previous"
            className="flex-none w-10 h-10 border border-white/15 text-paper/60 hover:border-gold hover:text-gold transition-all duration-200 flex items-center justify-center text-lg"
          >
            ←
          </button>

          <div
            ref={railRef}
            className="flex-1 flex gap-6 overflow-x-auto pb-2 hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {ITEMS.map(item => <Card key={item.num} item={item} />)}
          </div>

          <button
            onClick={() => goTo(idxRef.current + 1)}
            aria-label="Next"
            className="flex-none w-10 h-10 border border-white/15 text-paper/60 hover:border-gold hover:text-gold transition-all duration-200 flex items-center justify-center text-lg"
          >
            →
          </button>

        </div>
      </div>

      {/* Mobile scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto px-6 pb-2 hide-scrollbar">
        {ITEMS.map(item => (
          <div key={item.num} className="flex-none" style={{ width: '92vw' }}>
            <Card item={item} />
          </div>
        ))}
      </div>

      <Reveal>
        <p className="text-center text-[8px] tracking-[.4em] uppercase text-paper/25 mt-8">
          More chapters ahead
        </p>
      </Reveal>
    </section>
  )
}
