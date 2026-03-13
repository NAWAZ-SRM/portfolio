"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Star, GitFork, Calendar, Cpu, Database, Globe, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "FreightX",
    date: "Aug 2024",
    description: "ML-powered cargo booking platform with dynamic pricing algorithms",
    highlights: [
      "500+ cargo clients served",
      "1000 concurrent sessions handled",
      "80% process automation achieved",
      "Real-time chat & notifications",
    ],
    tech: ["React", "Node.js", "MongoDB", "Machine Learning", "OAuth", "CronJobs"],
    icon: Globe,
    color: "#00D4FF",
    stars: 45,
    forks: 12,
    published: false,
  },
  {
    title: "Neural Style Transfer",
    date: "Jan 2025",
    description: "Deep learning research published in FMDB Transactions on Sustainable Computing",
    highlights: [
      "VGG-19 architecture - 94% similarity",
      "90+ SNR achieved",
      "15% improvement over ResNet50",
      "PyTorch → TensorFlowJS deployment",
    ],
    tech: ["PyTorch", "TensorFlow.js", "VGG-19", "CNN", "Research"],
    icon: Cpu,
    color: "#39FF14",
    stars: 128,
    forks: 34,
    published: true,
  },
  {
    title: "Personalized Learning",
    date: "Jul 2025",
    description: "CPU-optimized adaptive learning platform with handwritten OCR",
    highlights: [
      "CPU-only deployment",
      "+40% OCR accuracy improvement",
      "T5-Small + INT8 quantization",
      "<2s quiz generation",
    ],
    tech: ["FastAPI", "React", "Transformers", "T5-Small", "OCR"],
    icon: BookOpen,
    color: "#7C3AED",
    stars: 67,
    forks: 18,
    published: false,
  },
  {
    title: "JStore Marketplace",
    date: "Sep 2024",
    description: "Student project trading platform with secure UPI payments",
    highlights: [
      "Student project trading",
      "UPI payment integration",
      "Role-based dashboards",
      "95% UX satisfaction rate",
    ],
    tech: ["MERN Stack", "OAuth", "UPI", "Role-based Auth"],
    icon: Database,
    color: "#00D4FF",
    stars: 32,
    forks: 8,
    published: false,
  },
]

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = project.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div 
        className="relative h-full glass rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-[#00D4FF]/30"
        style={{
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered ? `0 20px 40px ${project.color}20` : "none",
        }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 50%)`,
          }}
        />
        
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: project.color }} />
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                {project.title}
                {project.published && (
                  <Badge className="bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/30">
                    PUBLISHED
                  </Badge>
                )}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {project.date}
              </div>
            </div>
          </div>
          
          {/* GitHub stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {project.forks}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="relative z-10 text-sm text-muted-foreground mb-4">
          {project.description}
        </p>
        
        {/* Highlights */}
        <ul className="relative z-10 space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              {highlight}
            </li>
          ))}
        </ul>
        
        {/* Tech stack */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded border border-[#2a2a3e] bg-[#1a1a2e]/50"
            >
              {tech}
            </span>
          ))}
        </div>
        

      </div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00D4FF/3,transparent_50%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono text-[#39FF14] border border-[#39FF14]/30 rounded-full bg-[#39FF14]/5">
            MISSION.CONTROL
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00D4FF] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Production-grade applications showcasing ML innovation and full-stack expertise.
          </p>
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
