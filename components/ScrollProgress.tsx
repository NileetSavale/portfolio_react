'use client'
import { useRef, useEffect } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current
      if (!bar) return
      const { scrollY, innerHeight } = window
      const docH = document.documentElement.scrollHeight
      bar.style.transform = `scaleX(${Math.min(1, scrollY / (docH - innerHeight))})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] h-[2px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: 'linear-gradient(90deg,#f4c430 0%,#ff7a2f 55%,#c0001a 100%)',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
