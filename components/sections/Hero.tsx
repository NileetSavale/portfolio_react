'use client'
import { useRef, useEffect } from 'react'

const COLS = ['rgba(244,196,48,','rgba(255,122,47,','rgba(192,0,26,','rgba(159,232,255,','rgba(123,63,242,']
const STREAK_COLS = ['rgba(244,196,48,','rgba(159,232,255,','rgba(255,122,47,']

type Dot    = { x:number; y:number; vx:number; vy:number; r:number; a:number; c:string; life:number; max:number }
type Spark  = { x:number; y:number; len:number; ang:number; a:number; timer:number }
type Streak = { x:number; y:number; len:number; spd:number; a:number; w:number; col:string }

function makeStreak(W:number,H:number): Streak {
  return { x:Math.random()*W, y:Math.random()*H*.9+H*.05, len:Math.random()*130+50, spd:Math.random()*8+4, a:Math.random()*.1+.03, w:Math.random()*.45+.12, col:STREAK_COLS[Math.floor(Math.random()*STREAK_COLS.length)] }
}

function makeDot(W: number, H: number, init = false): Dot {
  return { x:Math.random()*W, y:init ? Math.random()*H : H+4, vx:(Math.random()-.5)*.45, vy:-(Math.random()*.7+.15), r:Math.random()*1.8+.4, a:Math.random()*.45+.1, c:COLS[Math.floor(Math.random()*COLS.length)], life:0, max:Math.random()*200+100 }
}

type Props = { personal: Record<string,unknown>; content: Record<string,unknown> }

export default function Hero({ personal, content }: Props) {
  const hero = content.hero as { eyebrow: string; subtitle: string }
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  // Parallax targets
  const ghostRef   = useRef<HTMLDivElement>(null)
  const kanjiLRef  = useRef<HTMLDivElement>(null)
  const kanjiRRef  = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf: number
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const dots:    Dot[]    = Array.from({ length: 130 }, () => makeDot(W, H, true))
    const sparks:  Spark[]  = Array.from({ length: 14 },  () => ({ x:0, y:0, len:30, ang:0, a:0, timer:Math.random()*120 }))
    const streaks: Streak[] = Array.from({ length: 9 },   () => ({ ...makeStreak(W,H), x:Math.random()*W }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const g = ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.45,W*.55)
      g.addColorStop(0,'rgba(244,196,48,.045)'); g.addColorStop(.6,'rgba(192,0,26,.018)'); g.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H)
      for (const d of dots) {
        d.x+=d.vx; d.y+=d.vy; d.life++
        const t=d.life/d.max, alpha=t<.2?t/.2:t>.8?(1-t)/.2:1
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle=d.c+d.a*alpha+')'; ctx.fill()
        if(d.life>=d.max||d.y<-8) Object.assign(d,makeDot(W,H))
      }
      // Speed streaks — horizontal lines shooting left→right
      for (const s of streaks) {
        const g = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y)
        g.addColorStop(0, s.col + '0)')
        g.addColorStop(1, s.col + s.a + ')')
        ctx.beginPath(); ctx.moveTo(s.x - s.len, s.y); ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = g; ctx.lineWidth = s.w; ctx.stroke()
        s.x += s.spd
        if (s.x - s.len > W) Object.assign(s, makeStreak(W, H), { x: -10 })
      }
      for (const s of sparks) {
        s.timer--
        if(s.timer<=0) Object.assign(s,{x:Math.random()*W,y:Math.random()*H,ang:Math.random()*Math.PI*2,len:Math.random()*45+12,a:.65,timer:Math.random()*160+80})
        if(s.a>0){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x+Math.cos(s.ang+.45)*s.len*.5,s.y+Math.sin(s.ang+.45)*s.len*.5);ctx.lineTo(s.x+Math.cos(s.ang)*s.len,s.y+Math.sin(s.ang)*s.len);ctx.strokeStyle=`rgba(159,232,255,${s.a})`;ctx.lineWidth=.6;ctx.stroke();s.a-=.014}
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // Parallax — direct DOM mutation, no React re-render on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (ghostRef.current)   ghostRef.current.style.transform   = `translateX(-50%) translateY(${y * 0.45}px)`
      if (kanjiLRef.current)  kanjiLRef.current.style.transform   = `translateY(calc(-50% + ${y * 0.22}px))`
      if (kanjiRRef.current)  kanjiRRef.current.style.transform   = `translateY(calc(-50% + ${y * 0.22}px))`
      if (contentRef.current) contentRef.current.style.transform  = `translateY(${y * 0.12}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative sticky top-0 h-screen overflow-hidden bg-storm" style={{ zIndex: 10 }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Shade */}
      <div className="absolute inset-0" style={{ zIndex: 3, background: 'linear-gradient(180deg,rgba(4,5,7,.6) 0%,rgba(4,5,7,.18) 35%,rgba(4,5,7,.38) 70%,rgba(4,5,7,.97) 100%)' }} />

      {/* Ghost text — parallax layer 0.45× */}
      <div ref={ghostRef} aria-hidden className="absolute left-1/2 bottom-[2vh] -translate-x-1/2 z-[2] pointer-events-none select-none leading-none font-display" style={{ fontSize:'clamp(90px,18vw,300px)', color:'transparent', WebkitTextStroke:'1px rgba(244,196,48,.06)', whiteSpace:'nowrap' }}>
        SAVALE
      </div>

      {/* Kanji sides — parallax layer 0.22× */}
      <div ref={kanjiLRef} aria-hidden className="hidden md:block absolute top-1/2 left-8 z-[5] font-kanji" style={{ transform:'translateY(-50%)', writingMode:'vertical-rl', fontSize:'clamp(22px,2.8vw,40px)', letterSpacing:'.14em', color:'#ff7a2f', textShadow:'0 0 24px rgba(255,122,47,.45)', opacity:.75 }}>
        ニリート
      </div>
      <div ref={kanjiRRef} aria-hidden className="hidden md:block absolute top-1/2 right-8 z-[5] font-kanji" style={{ transform:'translateY(-50%)', writingMode:'vertical-rl', fontSize:'clamp(22px,2.8vw,40px)', letterSpacing:'.14em', color:'#9fe8ff', textShadow:'0 0 24px rgba(159,232,255,.4)', opacity:.75 }}>
        サヴァレ
      </div>

      {/* Main content — parallax layer 0.12× */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-5" style={{ zIndex: 5 }}>
        <p className="text-[10px] tracking-[.5em] uppercase text-volt mb-5 opacity-0" style={{ animation:'fadeUp .5s 2.8s forwards' }}>
          {hero.eyebrow}
        </p>
        <h1 className="leading-[.88] uppercase opacity-0 font-display" style={{ fontSize:'clamp(64px,13vw,200px)', letterSpacing:'.02em', background:'linear-gradient(170deg,#efe8da 20%,#f4c430 55%,#ff7a2f 90%)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', filter:'drop-shadow(0 4px 30px rgba(244,196,48,.18))', animation:'heroIn .8s 2.5s cubic-bezier(.16,1,.3,1) forwards' }}>
          {String(personal.name ?? '').split(' ')[0]}<br />{String(personal.name ?? '').split(' ')[1]}
        </h1>
        <p className="mt-[18px] uppercase text-paper/55 opacity-0" style={{ fontSize:'clamp(10px,1.3vw,13px)', letterSpacing:'.32em', animation:'fadeUp .5s 3.1s forwards' }}>
          {hero.subtitle}
        </p>
        <div className="mt-11 flex gap-4 flex-wrap justify-center opacity-0" style={{ animation:'fadeUp .5s 3.4s forwards' }}>
          <a href="#projects" className="px-[34px] py-[13px] text-[9px] tracking-[.32em] uppercase bg-gold text-ink border border-gold hover:bg-transparent hover:text-gold transition-all duration-200">View Projects</a>
          <a href="#contact"  className="px-[34px] py-[13px] text-[9px] tracking-[.32em] uppercase bg-transparent text-paper border border-paper/30 hover:border-gold hover:text-gold transition-all duration-200">Get in Touch</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-11 bottom-[52px] z-[6] text-right text-[9px] tracking-[.4em] uppercase text-paper/55 opacity-0" style={{ animation:'fadeUp .5s 3.6s forwards' }}>
        Scroll
        <i className="block w-px h-[46px] mt-2.5 ml-auto bg-gradient-to-b from-gold to-transparent not-italic" style={{ animation:'drip 1.9s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
