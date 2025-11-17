"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const CoffeeIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-6 w-6"} fill="currentColor" viewBox="0 0 24 24">
    <path d="M2 21h18v-2H2v2zM20 8h-2V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H4a1 1 0 0 0-1 1v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-6a1 1 0 0 0-1-1zM8 6h8v2H8V6zm8 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5h10v5z" />
  </svg>
)

const MenuIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <CoffeeIcon
              className={`h-6 w-6 transition-colors duration-300 ${
                scrolled ? "text-white" : "text-orange-900"
              }`}
            />
            <span
              className={`font-playfair text-xl font-bold transition-colors duration-300 ${
                scrolled ? "text-white" : "text-orange-900"
              }`}
            >
              Nileet Savale
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`cursor-pointer font-semibold transition-colors duration-300 ${
                scrolled ? "text-white hover:text-amber-100" : "text-orange-900 hover:text-orange-700"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className={`cursor-pointer font-semibold transition-colors duration-300 ${
                scrolled ? "text-white hover:text-amber-100" : "text-orange-900 hover:text-orange-700"
              }`}
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className={`cursor-pointer font-semibold transition-colors duration-300 ${
                scrolled ? "text-white hover:text-amber-100" : "text-orange-900 hover:text-orange-700"
              }`}
            >
              Projects
            </button>

            {/* Resume (opens PDF) */}
            <button
              onClick={() => window.open("/resume.pdf", "_blank")}
              className={`cursor-pointer font-semibold transition-colors duration-300 ${
                scrolled ? "text-white hover:text-amber-100" : "text-orange-900 hover:text-orange-700"
              }`}
            >
              Resume
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className={`cursor-pointer font-semibold transition-colors duration-300 ${
                scrolled ? "text-white hover:text-amber-100" : "text-orange-900 hover:text-orange-700"
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden cursor-pointer">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`cursor-pointer transition-colors duration-300 ${
                scrolled ? "text-white" : "text-orange-900"
              }`}
            >
              {isOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">

              <button
                onClick={() => scrollToSection("home")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                Projects
              </button>

              <button
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                Resume
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                Contact
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
