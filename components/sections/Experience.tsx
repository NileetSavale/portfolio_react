'use client'
import { useRef, useEffect } from 'react'
import Reveal from '@/components/Reveal'
import CinematicReveal from '@/components/CinematicReveal'
import AmbientCanvas from '@/components/AmbientCanvas'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { TimelineItem } from '@/data/experience'

export default function Experience({ timeline }: { timeline: unknown[] }) {
  const TIMELINE    = timeline as TimelineItem[]
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical timeline line from top to bottom as user scrolls
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY:          1,
          ease:            'expo.inOut',
          duration:        2,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger:       timelineRef.current,
            start:         'top 80%',
            toggleActions: 'play none none reset',
          },
        }
      )

      // Entries slide in after line starts drawing
      gsap.from('.timeline-entry', {
        x:        -28,
        duration: 0.65,
        stagger:  0.16,
        ease:     'expo.out',
        delay:    0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start:   'top 80%',
          toggleActions: 'play none none reset',
        },
      })
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="py-[110px] bg-storm rounded-t-[32px]" style={{ boxShadow: '0 -40px 80px rgba(0,0,0,0.85)' }}>
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-t-[32px] pointer-events-none" style={{ zIndex: 0 }}>
        <AmbientCanvas palette="crimson" count={18} />
      </div>
      <div className="relative max-w-[1120px] mx-auto px-12" style={{ zIndex: 1 }}>

        <Reveal>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[9px] tracking-[.5em] uppercase text-gold">Chronicle</span>
            <div className="w-[60px] h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </Reveal>

        <CinematicReveal delay={50}>
          <h2 className="font-heading font-bold text-[clamp(34px,5.5vw,68px)] leading-[.95] uppercase tracking-[.04em] mb-14">
            Journey &amp;<br />Education
          </h2>
        </CinematicReveal>

        <div ref={timelineRef} className="relative pl-9">
          {/* Animated gradient line — draws top to bottom on scroll */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom,#f4c430,#c0001a,#7b3ff2,transparent)', transformOrigin: 'top' }}
          />

          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-entry relative mb-[52px]">
              <div className={`timeline-dot absolute -left-[41px] top-[5px] w-3 h-3 border ${item.dotCls} bg-storm rotate-45`} />
              <p className={`text-[9px] tracking-[.35em] uppercase mb-1.5 ${item.dateCls}`}>{item.date}</p>
              <h3 className="font-heading text-[19px] tracking-[.06em] uppercase mb-1">{item.role}</h3>
              <p className="text-[10px] tracking-[.2em] uppercase text-paper/55 mb-2.5">{item.org}</p>
              <p className="text-[12px] leading-[1.85] text-paper/62">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
