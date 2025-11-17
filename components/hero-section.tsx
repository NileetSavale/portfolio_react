"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import Image from "next/image"

// Simple icons
const ArrowDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.794-.261.794-.578v-2.234c-3.338.727-4.034-1.416-4.034-1.416-.545-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.664-.305-5.466-1.334-5.466-5.93 0-1.312.468-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.177 0 0 1.008-.322 3.3 1.23.958-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.005.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.117 3.177.77.84 1.236 1.91 1.236 3.222 0 4.609-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.8 24 17.303 24 12 24 5.373 18.627 0 12 0z" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.046c.477-.9 1.638-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.063.925 2.063 2.063 0 1.139-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)


// ----------------------------------------
// LATTE ART + FLOATING BEANS + STEAM
// ----------------------------------------

function LatteArtSwirl() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.18]">
      <svg width="600" height="600">
        <defs>
          <radialGradient id="latte-gradient">
            <stop offset="0%" stopColor="#ffffff55" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="200" fill="url(#latte-gradient)" />
      </svg>
    </div>
  )
}

function FloatingBeans() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-slow opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <svg width="20" height="24" viewBox="0 0 16 20" fill="currentColor" className="text-amber-900/50">
            <path d="M8 2C5.5 2 3 4 3 7c0 2 1 4 2 5.5C6 14 7 15 8 16c1-1 2-2 3-3.5C12 11 13 9 13 7c0-3-2.5-5-5-5z" />
          </svg>
        </div>
      ))}
    </div>
  )
}


// ⭐⭐⭐ UPDATED: FloatingCoffeeCup now uses your SVG file
function FloatingCoffeeCup() {
  return (
    <div className="absolute bottom-6 left-1/2 translate-x-2 pointer-events-none z-20">
      <div className="relative flex justify-center items-center animate-cup-float">

        {/* Rising steam */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="
              absolute 
              -top-10 
              left-1/2 
              -translate-x-1     /* ⭐ steam moved slightly left */
              opacity-50 
              animate-steam 
              z-30
            "
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <svg width="14" height="34" viewBox="0 0 6 20" className="text-amber-100">
              <path
                d="M3 20 Q1 15 3 10 Q5 5 3 0"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}


        {/* ⭐ Your Cup SVG */}
        <Image
          src="/cup.svg"
          alt="Coffee Cup"
          width={130}
          height={130}
          className="drop-shadow-xl z-20 opacity-80 brightness-90"
          // ↑ cup slightly dimmed
        />
      </div>
    </div>
  )
}



// ----------------------------------------
// MAIN HERO COMPONENT
// ----------------------------------------

export function HeroSection() {
  const scrollToAbout = () => {
    const section = document.getElementById("about")
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-amber-200/80 via-orange-300/70 to-orange-400/80">

      <LatteArtSwirl />
      <FloatingBeans />
      <FloatingCoffeeCup />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        
        {/* TITLE */}
        <h1 className="font-playfair font-bold text-5xl md:text-7xl text-orange-950 leading-tight mb-6">
          Welcome to My
          <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2">
            Digital Café
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-lg md:text-xl text-orange-900/90 leading-relaxed mb-8">
          I'm <b>Nileet Savale</b>, a Computer Science graduate student at Indiana University, 
          crafting innovative AI/ML solutions and full-stack applications.  
          Pull up a chair and explore my world of tech & creativity.
        </p>

        {/* BUTTON + ICONS */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <Button
            size="lg"
            onClick={scrollToAbout}
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
          >
            Explore My Work
            <ArrowDownIcon className="ml-2 h-4 w-4 animate-bounce" />
          </Button>

          <div className="flex gap-4 text-orange-800/80">
            <a href="mailto:savalenileet@gmail.com" className="hover:text-orange-950 transition">
              <MailIcon className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/nileet-savale" target="_blank" className="hover:text-orange-950 transition">
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a href="https://github.com/NileetSavale" target="_blank" className="hover:text-orange-950 transition">
              <GithubIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
