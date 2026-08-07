'use client'
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y:        22,
        scale:    0.97,
        duration: 0.9,
        delay:    delay / 1000,
        ease:     'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start:   'top 95%',
          toggleActions: 'play none none reset',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={ref} className={className}>{children}</div>
  )
}
