'use client'
import { useRef, useEffect } from 'react'
import Reveal from '@/components/Reveal'
import CinematicReveal from '@/components/CinematicReveal'
import AmbientCanvas from '@/components/AmbientCanvas'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { SkillCat } from '@/data/skills'

function SkillCatBlock({ cat, delay }: { cat: SkillCat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll<HTMLElement>('[data-pct]').forEach((bar, i) => {
        const pct = Number(bar.dataset.pct ?? 0)
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width:    `${pct}%`,
            ease:     'expo.out',
            duration: 1.4,
            delay:    i * 0.08,
            scrollTrigger: {
              trigger:       ref.current,
              start:         'top 85%',
              toggleActions: 'play none none reset',
            },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <Reveal delay={delay}>
      <div ref={ref}>
        <h3 className="font-heading text-[11px] tracking-[.35em] uppercase text-gold mb-6 pb-2.5 border-b border-gold/20">
          {cat.title}
        </h3>
        <div className="space-y-[18px]">
          {cat.skills.map(s => (
            <div key={s.name}>
              <div className="flex justify-between mb-[7px]">
                <span className="text-[10px] tracking-[.15em] uppercase">{s.name}</span>
                <span className="text-[9px] tracking-[.1em] text-paper/55">{s.level}</span>
              </div>
              <div className="skill-track h-px bg-white/[.07] relative overflow-hidden">
                <div
                  data-pct={s.pct}
                  className={`absolute inset-y-0 left-0 w-0 bg-gradient-to-r ${cat.grad}`}
                  style={{ willChange: 'width' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Skills({ cats }: { cats: unknown[] }) {
  const SKILL_CATS = cats as SkillCat[]
  return (
    <section id="skills" className="py-[110px] bg-storm rounded-t-[32px]" style={{ boxShadow: '0 -40px 80px rgba(0,0,0,0.85)' }}>
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-t-[32px] pointer-events-none" style={{ zIndex: 0 }}>
        <AmbientCanvas palette="violet" count={20} />
      </div>
      <div className="relative max-w-[1120px] mx-auto px-12" style={{ zIndex: 1 }}>

        <Reveal>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[9px] tracking-[.5em] uppercase text-gold">Abilities</span>
            <div className="w-[60px] h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </Reveal>

        <CinematicReveal delay={50}>
          <h2 className="font-heading font-bold text-[clamp(34px,5.5vw,68px)] leading-[.95] uppercase tracking-[.04em] mb-14">
            Skill<br />Roster
          </h2>
        </CinematicReveal>

        <div className="grid md:grid-cols-3 gap-9">
          {SKILL_CATS.map((cat, i) => <SkillCatBlock key={cat.title} cat={cat} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
