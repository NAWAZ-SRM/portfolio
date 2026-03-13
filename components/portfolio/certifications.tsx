"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, CheckCircle, ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.ai",
    date: "Dec 2023",
    color: "#00D4FF",
    skills: ["Supervised Learning", "Neural Networks", "Decision Trees"],
  },
  {
    title: "Complete Web Development Bootcamp",
    issuer: "Udemy",
    date: "Sep 2024",
    color: "#7C3AED",
    skills: ["React", "Node.js", "MongoDB", "Full Stack"],
  },
  {
    title: "Machine Learning",
    issuer: "IIT Kharagpur (NPTEL)",
    date: "Sep 2024",
    color: "#39FF14",
    skills: ["ML Algorithms", "Statistical Learning", "Model Evaluation"],
  },
  {
    title: "SQL Bootcamp: MySQL",
    issuer: "Udemy",
    date: "Oct 2024",
    color: "#00D4FF",
    skills: ["MySQL", "Database Design", "Query Optimization"],
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    date: "Feb 2025",
    color: "#7C3AED",
    skills: ["Pandas", "NumPy", "Data Visualization"],
  },
]

export function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="certifications" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#7C3AED/5,transparent_50%)]" />
      
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono text-[#7C3AED] border border-[#7C3AED]/30 rounded-full bg-[#7C3AED]/5">
            CREDENTIALS.VERIFIED
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#39FF14] bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning validated by industry-leading platforms and institutions.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line - desktop only */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent" />
          
          {/* Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-[#0a0a0f] z-10 items-center justify-center"
                  style={{ borderColor: cert.color }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cert.color }}
                  />
                </div>
                
                {/* Card */}
                <div 
                  className="mt-8 glass rounded-xl p-4 h-full hover:border-[#00D4FF]/30 transition-all group-hover:-translate-y-2"
                  style={{
                    borderColor: `${cert.color}20`,
                  }}
                >
                  {/* Date badge */}
                  <div 
                    className="inline-block px-2 py-1 text-xs font-mono rounded mb-3"
                    style={{ 
                      backgroundColor: `${cert.color}20`,
                      color: cert.color,
                    }}
                  >
                    {cert.date}
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <Award className="w-5 h-5" style={{ color: cert.color }} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-sm mb-1 line-clamp-2">{cert.title}</h3>
                  
                  {/* Issuer */}
                  <p className="text-xs text-muted-foreground mb-3">{cert.issuer}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <span 
                        key={skill}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <CheckCircle className="w-3 h-3" style={{ color: cert.color }} />
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hover link */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-1 text-xs" style={{ color: cert.color }}>
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
