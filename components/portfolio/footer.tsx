"use client"

import { motion } from "framer-motion"
import { Heart, Code, Coffee } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative py-8 px-4 border-t border-[#2a2a3e]">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo/Name */}
          <div className="flex items-center gap-2">
            <span 
              className="text-xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              NAWAZ
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground font-mono">ML Engineer</span>
          </div>
          
          {/* Made with */}
          <motion.div 
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Built with</span>
            <Heart className="w-4 h-4 text-[#FF6B6B] fill-[#FF6B6B]" />
            <Code className="w-4 h-4 text-[#00D4FF]" />
            <span>&</span>
            <Coffee className="w-4 h-4 text-[#7C3AED]" />
          </motion.div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground font-mono">
            &copy; {currentYear} Nawaz Sheriff K N
          </div>
        </div>
        
        {/* Tech stack */}
        <div className="mt-6 pt-6 border-t border-[#2a2a3e] flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
            <span key={tech} className="px-2 py-1 rounded border border-[#2a2a3e] hover:border-[#00D4FF]/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
