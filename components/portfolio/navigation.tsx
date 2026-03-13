"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Leadership", href: "#leadership" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Determine active section
      const sections = navItems.map(item => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-[#2a2a3e]" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              NAWAZ
            </button>
            
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-sm font-mono rounded-lg transition-all ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[#00D4FF] bg-[#00D4FF]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#1a1a2e]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* CTA button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("#contact")}
                size="sm"
                className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-[#0a0a0f] font-semibold hover:opacity-90"
              >
                Hire Me
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-[#2a2a3e] md:hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-mono transition-all ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[#00D4FF] bg-[#00D4FF]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#1a1a2e]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="w-full mt-4 bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-[#0a0a0f] font-semibold"
              >
                Hire Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
