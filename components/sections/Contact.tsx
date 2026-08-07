'use client'
import { useRef, useEffect } from 'react'
import Reveal from '@/components/Reveal'
import CinematicReveal from '@/components/CinematicReveal'
import AmbientCanvas from '@/components/AmbientCanvas'
import { gsap } from '@/lib/gsap'
import type { Social } from '@/data/socials'

const FIELDS = [
  { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your name'      },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
]

type Props = { socials: unknown[]; content: Record<string,unknown>; personal: Record<string,unknown> }

export default function Contact({ socials, content, personal }: Props) {
  const SOCIALS = socials as Social[]
  const contactContent = content.contact as { heading: string; intro: string }
  const formRef    = useRef<HTMLFormElement>(null)
  const statusRef  = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const beamRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(beamRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'expo.out',
          duration: 1.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reset',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd      = new FormData(e.currentTarget)
    const name    = fd.get('name') as string
    const email   = fd.get('email') as string
    const message = fd.get('message') as string

    const status = statusRef.current
    if (status) { status.textContent = 'SENDING…'; status.className = 'text-[10px] tracking-[.22em] uppercase text-paper/50 min-h-4' }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    if (res.ok) {
      if (status) { status.textContent = 'MESSAGE SENT ✓'; status.className = 'text-[10px] tracking-[.22em] uppercase text-gold min-h-4' }
      formRef.current?.reset()
      setTimeout(() => { if (status) { status.textContent = ''; status.className = 'text-[10px] tracking-[.22em] uppercase min-h-4' } }, 4000)
    } else {
      if (status) { status.textContent = 'FAILED — TRY AGAIN'; status.className = 'text-[10px] tracking-[.22em] uppercase text-crimson min-h-4' }
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-[110px] bg-ink rounded-t-[32px]" style={{ boxShadow: '0 -40px 80px rgba(0,0,0,0.85)' }}>

      {/* Ambient gold particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-t-[32px] pointer-events-none" style={{ zIndex: 0 }}>
        <AmbientCanvas palette="gold" count={30} />
      </div>

      {/* Cinematic entry beam — draws left→right on scroll enter */}
      <div ref={beamRef} aria-hidden className="absolute top-0 left-0 right-0 h-px origin-left pointer-events-none" style={{ background: 'linear-gradient(90deg,#f4c430 0%,#c0001a 38%,#7b3ff2 68%,rgba(123,63,242,0) 100%)', zIndex: 2 }} />

      <div className="relative max-w-[1120px] mx-auto px-12" style={{ zIndex: 1 }}>

        <Reveal>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[9px] tracking-[.5em] uppercase text-gold">Connect</span>
            <div className="w-[60px] h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
        </Reveal>

        <CinematicReveal delay={50}>
          <h2 className="font-heading font-bold text-[clamp(34px,5.5vw,68px)] leading-[.95] uppercase tracking-[.04em] mb-14">
            {contactContent.heading.split(' ').map((w, i, a) => i < a.length - 1 ? <span key={i}>{w}<br /></span> : w)}
          </h2>
        </CinematicReveal>

        <div className="grid md:grid-cols-2 gap-16">

          <Reveal delay={100}>
            <h3 className="font-heading text-[13px] tracking-[.3em] uppercase text-gold mb-[18px]">Let&apos;s Build Something</h3>
            <p className="text-[12px] leading-[1.85] text-paper/55 mb-9">
              {contactContent.intro}
            </p>
            <div className="flex flex-col">
              {SOCIALS.map(s => (
                <a
                  key={s.num}
                  href={s.href}
                  {...(s.ext ? { target: '_blank', rel: 'noopener' } : {})}
                  className="flex items-center gap-3.5 text-[10px] tracking-[.2em] uppercase text-paper/55 no-underline hover:text-gold transition-colors duration-200 py-3.5 border-b border-white/[.05]"
                >
                  <span className="text-white/22 text-[9px]">{s.num}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {FIELDS.map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[8px] tracking-[.38em] uppercase text-paper/55 mb-[7px]">{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required
                    className="w-full bg-white/[.03] border border-white/10 text-paper placeholder:text-paper/25 focus:border-gold outline-none px-4 py-3 text-[12px] transition-colors duration-200 font-mono"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-[8px] tracking-[.38em] uppercase text-paper/55 mb-[7px]">Message</label>
                <textarea
                  id="message" name="message" placeholder="What's on your mind?" required rows={5}
                  className="w-full bg-white/[.03] border border-white/10 text-paper placeholder:text-paper/25 focus:border-gold outline-none px-4 py-3 text-[12px] resize-none transition-colors duration-200 font-mono"
                />
              </div>
              <p ref={statusRef} className="text-[10px] tracking-[.22em] uppercase min-h-4" />
              <button type="submit" className="self-start px-[34px] py-[13px] text-[9px] tracking-[.32em] uppercase bg-gold text-ink border border-gold hover:bg-transparent hover:text-gold transition-all duration-200">
                Send Message
              </button>
            </form>
          </Reveal>

        </div>

        {/* End of chapter marker */}
        <Reveal>
          <div className="mt-16 flex items-center gap-5">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,rgba(244,196,48,0),rgba(244,196,48,0.2),rgba(244,196,48,0))' }} />
            <span className="text-[8px] tracking-[.55em] uppercase text-gold/40">End of Chapter</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,rgba(244,196,48,0),rgba(244,196,48,0.2),rgba(244,196,48,0))' }} />
          </div>
        </Reveal>

      </div>
    </section>
  )
}
