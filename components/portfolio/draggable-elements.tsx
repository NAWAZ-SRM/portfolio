"use client"

import { motion, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Cpu, Database, Code2, Zap, Brain, Globe } from "lucide-react"

interface DraggableIconProps {
  icon: React.ReactNode
  color: string
  initialX: number
  initialY: number
  label: string
}

function DraggableIcon({ icon, color, initialX, initialY, label }: DraggableIconProps) {
  const constraintRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const springConfig = { stiffness: 300, damping: 30 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleDragEnd = () => {
    setIsDragging(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={constraintRef}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.2, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="relative p-4 rounded-2xl glass transition-all duration-300"
        style={{
          boxShadow: isDragging
            ? `0 20px 40px ${color}40, 0 0 20px ${color}30`
            : `0 4px 20px ${color}20`,
          borderColor: isDragging ? color : "transparent",
          borderWidth: 1,
        }}
      >
        <div style={{ color }}>{icon}</div>
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDragging ? 1 : 0 }}
          style={{ color }}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  )
}

export function DraggableElements() {
  const icons = [
    { icon: <Brain className="w-8 h-8" />, color: "#00D4FF", x: 5, y: 20, label: "Machine Learning" },
    { icon: <Database className="w-8 h-8" />, color: "#7C3AED", x: 90, y: 35, label: "Database" },
    { icon: <Code2 className="w-8 h-8" />, color: "#39FF14", x: 8, y: 60, label: "Full Stack" },
    { icon: <Zap className="w-8 h-8" />, color: "#00D4FF", x: 88, y: 70, label: "Performance" },
    { icon: <Globe className="w-8 h-8" />, color: "#7C3AED", x: 3, y: 85, label: "Web3" },
    { icon: <Cpu className="w-8 h-8" />, color: "#39FF14", x: 92, y: 15, label: "Deep Learning" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {icons.map((item, i) => (
        <div key={i} className="pointer-events-auto">
          <DraggableIcon
            icon={item.icon}
            color={item.color}
            initialX={item.x}
            initialY={item.y}
            label={item.label}
          />
        </div>
      ))}
    </div>
  )
}

// Magnetic button effect component
interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={buttonRef}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// Parallax scrolling section wrapper
interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.innerHeight - rect.top
        setOffset(scrolled * speed * 0.1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: offset }}
    >
      {children}
    </motion.div>
  )
}
