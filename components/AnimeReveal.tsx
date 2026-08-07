'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

type Props = { animeImg: string; realImg: string; alt?: string }

const TILT = 18 * Math.PI / 180
const TAN  = Math.tan(TILT)

export default function AnimeReveal({ animeImg, realImg, alt = '' }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const animeWrapRef  = useRef<HTMLDivElement>(null)
  const lineRef       = useRef<HTMLDivElement>(null)
  const sparkRef      = useRef<HTMLCanvasElement>(null)
  const flashRef      = useRef<HTMLDivElement>(null)
  const hintRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el    = containerRef.current
    const anime = animeWrapRef.current
    const line  = lineRef.current
    const spark = sparkRef.current
    const flash = flashRef.current
    const hint  = hintRef.current
    if (!el || !anime || !line || !spark || !flash || !hint) return

    const ctx = spark.getContext('2d')!
    let sw = 0, sh = 0, halfShift = 0
    let sx = 1, sTarget = 1, prevTarget = 1
    type Spark = { x:number; y:number; vx:number; vy:number; r:number; life:number; col:string }
    const sparks: Spark[] = []
    let raf = 0
    let leaveTimer = 0

    const resize = () => {
      sw = el.clientWidth; sh = el.clientHeight
      halfShift = (sh / 2) * TAN
      spark.width  = sw * devicePixelRatio
      spark.height = sh * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const applyClip = () => {
      const cx   = sx * sw
      const xTop = cx - halfShift
      const xBot = cx + halfShift
      anime.style.clipPath = `polygon(0 0,${xTop.toFixed(1)}px 0,${xBot.toFixed(1)}px ${sh}px,0 ${sh}px)`
      line.style.transform = `translateX(${cx.toFixed(1)}px) rotate(18deg)`
      line.style.opacity   = Math.min(1, Math.abs(sTarget - sx) * 14 + 0.25).toFixed(2)
    }

    const loop = () => {
      sx += (sTarget - sx) * 0.10
      applyClip()
      if (sparks.length) {
        ctx.clearRect(0, 0, sw, sh)
        ctx.globalCompositeOperation = 'lighter'
        for (let i = sparks.length - 1; i >= 0; i--) {
          const p = sparks[i]
          p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 0.034
          if (p.life <= 0) { sparks.splice(i, 1); continue }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.col},${p.life})`; ctx.fill()
        }
        ctx.globalCompositeOperation = 'source-over'
        if (!sparks.length) ctx.clearRect(0, 0, sw, sh)
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    const addSparks = (py: number) => {
      const speed = Math.abs(sTarget - prevTarget)
      const n = Math.min(14, Math.floor(speed * 220))
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: sTarget * sw + (Math.random() - .5) * 12,
          y: py + (Math.random() - .5) * 70,
          vx: (Math.random() - .5) * 3.5,
          vy: (Math.random() - .7) * 2.8,
          r: .8 + Math.random() * 2.2,
          life: 1,
          col: Math.random() < .5 ? '207,214,228' : '244,196,48',
        })
      }
    }

    const setPointer = (clientX: number, clientY: number) => {
      const r   = el.getBoundingClientRect()
      const edge = sw ? halfShift / sw : 0
      const raw  = (clientX - r.left) / sw
      prevTarget = sTarget
      sTarget = Math.min(1 + edge, Math.max(-edge, raw * (1 + edge * 2) - edge))
      hint.style.opacity = '0'
      addSparks(clientY - r.top)
    }

    const onMove  = (e: MouseEvent)     => setPointer(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent)     => setPointer(e.touches[0].clientX, e.touches[0].clientY)
    const onLeave = () => {
      leaveTimer = window.setTimeout(() => {
        sTarget = 1
        hint.style.opacity = '1'
      }, 500)
    }
    const onEnter = () => {
      clearTimeout(leaveTimer)
      flash.style.opacity = '0.12'
      setTimeout(() => { flash.style.opacity = '0' }, 110)
    }

    el.addEventListener('mousemove',  onMove)
    el.addEventListener('touchmove',  onTouch, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseenter', onEnter)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(leaveTimer)
      window.removeEventListener('resize', resize)
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('touchmove',  onTouch)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-crosshair select-none"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Real photo — bottom layer */}
      <Image src={realImg} alt={alt} fill className="object-cover object-top" sizes="(max-width:768px) 100vw,50vw" />

      {/* Anime photo — top layer, clip-path controlled by JS */}
      <div ref={animeWrapRef} className="absolute inset-0 z-[2]" style={{ willChange: 'clip-path' }}>
        <Image src={animeImg} alt={alt} fill className="object-cover object-top" sizes="(max-width:768px) 100vw,50vw" />
      </div>

      {/* Diagonal slash line */}
      <div
        ref={lineRef}
        aria-hidden
        className="absolute top-[-30%] left-0 h-[160%] z-[3] pointer-events-none"
        style={{
          width: '2.5px',
          background: 'linear-gradient(180deg,transparent,#cfd6e4 12%,#fff 50%,#cfd6e4 88%,transparent)',
          boxShadow: '0 0 10px 2px rgba(207,214,228,.75),0 0 22px 5px rgba(244,196,48,.45)',
          transform: 'translateX(100vw) rotate(18deg)',
          transformOrigin: 'center',
          opacity: 0,
        }}
      />

      {/* Sparks canvas */}
      <canvas ref={sparkRef} aria-hidden className="absolute inset-0 w-full h-full z-[4] pointer-events-none" />

      {/* Flash on hover enter */}
      <div
        ref={flashRef}
        aria-hidden
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(180deg,rgba(239,233,223,.9) 0%,rgba(244,196,48,.4) 40%,transparent 85%)', opacity: 0, transition: 'opacity 120ms' }}
      />

      {/* Drag hint */}
      <div
        ref={hintRef}
        aria-hidden
        className="absolute inset-x-0 bottom-5 z-[6] flex justify-center pointer-events-none transition-opacity duration-500"
      >
        <span className="text-[9px] tracking-[.28em] uppercase text-paper/80 bg-ink/60 px-4 py-2 border border-white/10 backdrop-blur-sm">
          ← drag to reveal →
        </span>
      </div>
    </div>
  )
}
