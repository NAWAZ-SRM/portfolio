"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TrailPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

export function CursorTrailer() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const idCounter = useRef(0)

  useEffect(() => {
    let animationFrame: number
    
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      const newPoint: TrailPoint = {
        id: idCounter.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      }

      setTrail((prev) => {
        const now = Date.now()
        const filtered = prev.filter((p) => now - p.timestamp < 300)
        return [...filtered, newPoint].slice(-20)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const cleanup = () => {
      const now = Date.now()
      setTrail((prev) => prev.filter((p) => now - p.timestamp < 300))
      animationFrame = requestAnimationFrame(cleanup)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    animationFrame = requestAnimationFrame(cleanup)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {isVisible && trail.map((point, index) => {
          const age = Date.now() - point.timestamp
          const opacity = Math.max(0, 1 - age / 300)
          const scale = Math.max(0.2, 1 - age / 300)
          const hue = (index * 12 + 180) % 360

          return (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: opacity * 0.6, scale }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                left: point.x,
                top: point.y,
                backgroundColor: `hsl(${hue}, 100%, 60%)`,
                boxShadow: `0 0 10px hsl(${hue}, 100%, 60%)`,
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Custom cursor with glow effect
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      )
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[101] mix-blend-difference"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-5 h-5 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[100]"
        animate={{
          x: position.x - 25,
          y: position.y - 25,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div
          className="w-[50px] h-[50px] rounded-full border-2 border-[#00D4FF] opacity-50"
          style={{
            boxShadow: isPointer
              ? "0 0 20px #00D4FF, inset 0 0 20px #00D4FF"
              : "0 0 10px #00D4FF40",
          }}
        />
      </motion.div>
    </>
  )
}
