'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function CinematicReveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set via style directly — avoids any GSAP cache reading ambiguity
    el.style.clipPath = 'inset(0 100% 0 0)'
    let tween: gsap.core.Tween | null = null

    const io = new IntersectionObserver(([entry]) => {
      tween?.kill()
      if (entry.isIntersecting) {
        // fromTo with explicit from — never reads current state from cache
        tween = gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.15, delay: delay / 1000, ease: 'expo.out' }
        )
      } else {
        el.style.clipPath = 'inset(0 100% 0 0)'
      }
    }, { threshold: 0 }) // fire the moment any pixel enters/leaves viewport

    io.observe(el)
    return () => { io.disconnect(); tween?.kill() }
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}
