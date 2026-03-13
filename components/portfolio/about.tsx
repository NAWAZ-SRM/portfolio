"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { GraduationCap, Briefcase, Award, Zap, Building2 } from "lucide-react"

const timeline = [
  {
    year: "2022",
    title: "B.Tech CSE @ SRM IST",
    description: "Started Computer Science journey with CGPA 9.39/10",
    icon: GraduationCap,
    color: "#00D4FF",
  },
  {
    year: "2024",
    title: "Production Engineer Intern @ Vyuhaa Med Data",
    description: "Worked on healthcare data solutions and production engineering",
    icon: Briefcase,
    color: "#7C3AED",
  },
  {
    year: "2025",
    title: "Neural Style Transfer",
    description: "Published research in FMDB Transactions",
    icon: Award,
    color: "#39FF14",
  },
  {
    year: "2026",
    title: "Zoho Project Trainee",
    description: "Currently building enterprise solutions",
    icon: Building2,
    color: "#00D4FF",
  },
  {
    year: "2026",
    title: "Software Engineer (Full Stack & ML)",
    description: "Seeking Full Stack and ML opportunities",
    icon: Zap,
    color: "#7C3AED",
  },
]

const domains = [
  "Machine Learning",
  "Deep Learning",
  "Full Stack",
  "DevOps",
  "MLOps",
]

function DomainCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % domains.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {domains.map((domain, index) => (
        <motion.span
          key={domain}
          animate={{
            opacity: index === currentIndex ? 1 : 0.4,
            scale: index === currentIndex ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`px-4 py-2 rounded-full border font-mono text-sm transition-all ${
            index === currentIndex
              ? "border-[#00D4FF] text-[#00D4FF] bg-[#00D4FF]/10"
              : "border-[#2a2a3e] text-muted-foreground"
          }`}
        >
          {domain}
        </motion.span>
      ))}
    </div>
  )
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#00D4FF/5,transparent_50%)]" />
      
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono text-[#00D4FF] border border-[#00D4FF]/30 rounded-full bg-[#00D4FF]/5">
            SYSTEM.ARCHITECTURE
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate technologist bridging the gap between cutting-edge ML research and production-grade full-stack solutions.
          </p>
        </motion.div>
        
        {/* Zoho badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39FF14]"></span>
            </span>
            <span className="font-mono text-[#7C3AED]">Currently @ Zoho Corporation</span>
            <Briefcase className="w-4 h-4 text-[#7C3AED]" />
          </div>
        </motion.div>
        
        {/* Domain mastery carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <DomainCarousel />
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF] via-[#7C3AED] to-[#39FF14] hidden md:block" />
          
          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div 
                      className="glass rounded-xl p-6 inline-block hover:border-[#00D4FF]/30 transition-all hover:-translate-y-1"
                      style={{ borderColor: `${item.color}20` }}
                    >
                      <div 
                        className="text-sm font-mono mb-2"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Center icon */}
                  <div 
                    className="hidden md:flex w-12 h-12 rounded-full items-center justify-center border-2 bg-[#0a0a0f] z-10"
                    style={{ borderColor: item.color }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  
                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
