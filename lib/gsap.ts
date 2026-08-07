// Client-only — import only inside 'use client' components
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Guard for SSR — GSAP plugins need browser globals
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Global defaults: smooth, expo-feel easing
gsap.defaults({ ease: 'expo.out', duration: 0.85 })

export { gsap, ScrollTrigger }
