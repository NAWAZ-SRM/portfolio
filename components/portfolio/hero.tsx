"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "CGPA", value: "9.39" },
  { label: "Projects", value: "4+" },
  { label: "Workshop Attendees", value: "500+" },
  { label: "Diagnostic Boost", value: "25%" },
]

const roles = [
  "Machine Learning Engineer",
  "Full-Stack Architect", 
  "Deep Learning Innovator",
  "Zoho Project Trainee",
]

function GlitchText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("")
  const [isGlitching, setIsGlitching] = useState(true)
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  
  useEffect(() => {
    if (!isGlitching) return
    
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (char === " ") return " "
          if (index < iteration) return text[index]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join("")
      )
      
      if (iteration >= text.length) {
        clearInterval(interval)
        setIsGlitching(false)
      }
      
      iteration += 1/3
    }, 30)
    
    return () => clearInterval(interval)
  }, [text, isGlitching])
  
  return (
    <span className="font-mono">
      {displayText || text}
    </span>
  )
}

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentText = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts])
  
  return (
    <span className="text-[#00D4FF]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = []
    const particleCount = 100
    const colors = ["#00D4FF", "#7C3AED", "#39FF14"]
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    
    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        
        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = "#00D4FF"
      ctx.font = `${fontSize}px monospace`
      
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        ctx.globalAlpha = 0.15
        ctx.fillText(char, x, y * fontSize)
        ctx.globalAlpha = 1
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }
    
    const interval = setInterval(draw, 50)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" />
}

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <MatrixRain />
      <ParticleField />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/5 to-transparent animate-pulse" />
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)] z-10" />
      
      {/* Main content */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5"
        >
          <MapPin className="w-4 h-4 text-[#00D4FF]" />
          <span className="text-sm text-[#00D4FF]">Tiruvallur, Tamil Nadu</span>
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
        </motion.div>
        
        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          <span className="bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#39FF14] bg-clip-text text-transparent">
            <GlitchText text="NAWAZ SHERIFF K N" />
          </span>
        </motion.h1>
        
        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 h-8 font-mono"
        >
          <TypewriterText texts={roles} />
        </motion.div>
        
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-muted-foreground"
        >
          <a href="mailto:nk2496@srmist.edu.in" className="flex items-center gap-2 hover:text-[#00D4FF] transition-colors">
            <Mail className="w-4 h-4" />
            <span>nk2496@srmist.edu.in</span>
          </a>
          <a href="tel:+919789831254" className="flex items-center gap-2 hover:text-[#00D4FF] transition-colors">
            <Phone className="w-4 h-4" />
            <span>9789831254</span>
          </a>
        </motion.div>
        
        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="glass rounded-lg p-4 float-animation"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#00D4FF] neon-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("projects")}
            className="relative bg-[#00D4FF] text-[#0a0a0f] hover:bg-[#00D4FF]/90 font-semibold pulse-glow"
          >
            VIEW PROJECTS
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("skills")}
            className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]"
          >
            SKILLS MATRIX
          </Button>
          <div className="flex gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-[#2a2a3e] hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-[#2a2a3e] hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-[#00D4FF] transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}
