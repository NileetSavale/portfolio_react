'use client'
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function StatCounter({ value, className }: { value: string; className?: string }) {
  const ref   = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([\d.]+)(.*)$/)
  const num   = match ? parseFloat(match[1]) : null
  const suf   = match ? match[2] : ''
  const dec   = num !== null && !Number.isInteger(num)

  useEffect(() => {
    if (num === null || !ref.current) return
    const el = ref.current
    let tween: gsap.core.Tween | null = null

    const st = ScrollTrigger.create({
      trigger: el,
      start:   'top 92%',
      onEnter: () => {
        tween?.kill()
        const obj = { v: 0 }
        el.textContent = '0' + suf
        tween = gsap.to(obj, {
          v:        num,
          duration: 1.8,
          ease:     'power3.out',
          onUpdate()   { el.textContent = (dec ? obj.v.toFixed(1) : Math.round(obj.v)) + suf },
          onComplete() { el.textContent = value },
        })
      },
      onLeaveBack: () => {
        tween?.kill()
        tween = null
        el.textContent = '0' + suf
      },
    })

    return () => { tween?.kill(); st.kill() }
  }, [num, suf, dec, value])

  return <span ref={ref} className={className}>{value}</span>
}
