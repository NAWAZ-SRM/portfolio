"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  angle: number
}

// Individual particle component to properly use hooks
function ScrollParticle({ 
  particle, 
  smoothProgress 
}: { 
  particle: Particle
  smoothProgress: ReturnType<typeof useSpring>
}) {
  const yOffset = useTransform(
    smoothProgress,
    [0, 1],
    [0, -particle.speed * 500]
  )
  
  const xOffset = useTransform(
    smoothProgress,
    [0, 1],
    [0, Math.cos(particle.angle) * 100]
  )

  const opacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.3, 0.8, 0.3]
  )

  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 1.5, 1]
  )

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        y: yOffset,
        x: xOffset,
        opacity,
        scale,
      }}
    />
  )
}

export function ScrollParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const particles = useMemo(() => {
    const colors = ["#00D4FF", "#7C3AED", "#39FF14"]
    const newParticles: Particle[] = []
    
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
      })
    }
    
    return newParticles
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      {particles.map((particle) => (
        <ScrollParticle 
          key={particle.id} 
          particle={particle} 
          smoothProgress={smoothProgress} 
        />
      ))}
    </div>
  )
}

// Floating orbs that follow cursor with delay
export function FloatingOrbs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const orbs = [
    { size: 300, color: "#00D4FF", delay: 0.1, opacity: 0.1 },
    { size: 200, color: "#7C3AED", delay: 0.2, opacity: 0.15 },
    { size: 150, color: "#39FF14", delay: 0.3, opacity: 0.1 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - orb.size / 2,
            y: mousePosition.y - orb.size / 2,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            delay: orb.delay,
          }}
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity: orb.opacity,
          }}
        />
      ))}
    </div>
  )
}

// Scroll-triggered lines that animate across sections
export function ScrollLines() {
  const { scrollYProgress } = useScroll()
  
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <div className="fixed left-0 right-0 top-1/2 pointer-events-none z-[2]">
      <motion.div
        className="h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"
        style={{ width: lineWidth, opacity: lineOpacity }}
      />
    </div>
  )
}
