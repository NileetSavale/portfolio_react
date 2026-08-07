'use client'
import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

export default function SectionSnap() {
  useEffect(() => {
    // Touch / stylus devices — let native scroll do its thing
    if (window.matchMedia('(hover: none)').matches) return

    let busy  = false
    let timer: ReturnType<typeof setTimeout>
    let snaps: number[] = []

    const calcSnaps = () => {
      snaps = Array.from(document.querySelectorAll<HTMLElement>('[data-snap]'))
        .map(el => Math.round(el.getBoundingClientRect().top + window.scrollY))
        .sort((a, b) => a - b)
    }

    // Projects is GSAP-pinned; while it fills the viewport, let GSAP drive scroll
    const inProjects = () => {
      const el = document.getElementById('projects')
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.top <= 2 && r.bottom >= window.innerHeight - 2
    }

    const onWheel = (e: WheelEvent) => {
      if (inProjects()) return
      if (busy) { e.preventDefault(); return }
      if (!snaps.length) return

      const dir = e.deltaY > 0 ? 1 : -1
      const cur = window.scrollY

      // Which snap are we at or just past?
      let idx = 0
      for (let i = 0; i < snaps.length; i++) {
        if (snaps[i] <= cur + 5) idx = i
      }

      const next = Math.max(0, Math.min(snaps.length - 1, idx + dir))
      if (Math.abs(snaps[next] - cur) < 5) return // already there

      e.preventDefault()
      busy = true
      window.scrollTo({ top: snaps[next], behavior: 'smooth' })
      clearTimeout(timer)
      timer = setTimeout(() => { busy = false }, 1150)
    }

    // Recalculate after GSAP adds pin spacers (which shifts element positions)
    const onRefresh = () => calcSnaps()
    ScrollTrigger.addEventListener('refresh', onRefresh)
    setTimeout(calcSnaps, 600)

    window.addEventListener('resize', () => { setTimeout(calcSnaps, 200) }, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      clearTimeout(timer)
    }
  }, [])

  return null
}
