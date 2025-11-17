"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, FileText, Twitter } from "lucide-react"

export default function FloatingSocialBar() {
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.3)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isMounted) return null

  const items = [
    { icon: <FileText size={22} />, href: "/resume.pdf", label: "Resume" },
    { icon: <Github size={22} />, href: "https://github.com/NileetSavale", label: "GitHub" },
    { icon: <Linkedin size={22} />, href: "https://linkedin.com/in/nileet", label: "LinkedIn" },
    { icon: <Twitter size={22} />, href: "https://x.com/SavaleNileet", label: "Twitter" },
    { icon: <Mail size={22} />, href: "mailto:savalenileet@gmail.com", label: "Email" },
  ]

  return (
    <div className="
      fixed left-6 top-1/2 -translate-y-1/2 
      flex flex-col items-center gap-6 
      z-50 select-none
      hidden lg:flex
    ">
      {/* Top glow line */}
      <div 
        className={`w-[3px] h-14 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-b from-amber-300/80 to-transparent' 
            : 'bg-gradient-to-b from-orange-700/60 to-transparent'
        }`}
      ></div>

      {/* Icons */}
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={`
            transition-all duration-300 
            hover:scale-110
            ${isScrolled 
              ? 'text-amber-200/70 hover:text-amber-100 hover:drop-shadow-[0_0_8px_rgba(255,200,150,0.6)]' 
              : 'text-orange-800/70 hover:text-orange-900 hover:drop-shadow-[0_0_8px_rgba(217,119,6,0.6)]'
            }
          `}
        >
          {item.icon}
        </Link>
      ))}

      {/* Bottom glow line */}
      <div 
        className={`w-[3px] h-14 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-t from-amber-300/80 to-transparent' 
            : 'bg-gradient-to-t from-orange-700/60 to-transparent'
        }`}
      ></div>
    </div>
  )
}
