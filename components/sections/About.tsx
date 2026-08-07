'use client'
import Reveal from '@/components/Reveal'
import CinematicReveal from '@/components/CinematicReveal'
import AnimeReveal from '@/components/AnimeReveal'
import StatCounter from '@/components/StatCounter'
import AmbientCanvas from '@/components/AmbientCanvas'

type Props = {
  content: Record<string,unknown>
  about: { tags: string[]; stats: [string,string][] }
  animePhoto: string
  realPhoto:  string
}

export default function About({ content, about, animePhoto, realPhoto }: Props) {
  const aboutContent = content.about as { heading: string; bio: string[] }
  const TAGS  = about.tags
  const STATS = about.stats

  return (
    <section id="about" className="py-[110px] bg-ink rounded-t-[32px]" style={{ zIndex: 20, boxShadow: '0 -40px 80px rgba(0,0,0,0.85)' }}>
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-t-[32px] pointer-events-none" style={{ zIndex: 0 }}>
        <AmbientCanvas palette="gold" count={22} />
      </div>
      <div className="relative max-w-[1120px] mx-auto px-12" style={{ zIndex: 1 }}>

        <Reveal>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[9px] tracking-[.5em] uppercase text-gold">About Me</span>
            <div className="w-[60px] h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <CinematicReveal>
              <h2 className="font-heading font-bold text-[clamp(34px,5.5vw,68px)] leading-[.95] uppercase tracking-[.04em] mb-14">
                {aboutContent.heading.split(' ').map((w, i, a) => i < a.length - 1 ? <span key={i}>{w}<br /></span> : w)}
              </h2>
            </CinematicReveal>

            <Reveal delay={100}>
              <div className="space-y-[18px] text-[13px] leading-[1.9] text-paper/72 tracking-[.02em] mb-9">
                {aboutContent.bio.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(([val, lbl]) => (
                  <div key={lbl} className="border border-gold/20 p-[22px] bg-gold/[.03] hover:border-gold/40 transition-colors duration-200">
                    <StatCounter value={val} className="font-display text-[44px] leading-none text-gold" />
                    <div className="text-[8px] tracking-[.3em] uppercase text-paper/55 mt-1">{lbl}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="hidden md:block">
            <AnimeReveal animeImg={animePhoto} realImg={realPhoto} alt="Nileet Savale" />
            <div className="flex flex-wrap gap-2 mt-5">
              {TAGS.map(t => (
                <span key={t} className="text-[8px] tracking-[.22em] uppercase px-3.5 py-1.5 border border-gold/25 text-paper/55 hover:border-gold hover:text-paper transition-all duration-200 cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
