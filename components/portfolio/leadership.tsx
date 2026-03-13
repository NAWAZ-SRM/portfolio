"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Calendar, Trophy, TrendingUp, Heart, Database } from "lucide-react"

const experiences = [
  {
    title: "Web3 Technical Supervisor",
    organization: "CodeKrafter SRMIST",
    period: "2023 - 2024",
    description: "Led technical initiatives for the largest coding club at SRM IST",
    achievements: [
      { icon: Users, text: "Managed team of 20 members", value: "20" },
      { icon: Calendar, text: "Organized 8 workshops", value: "8" },
      { icon: Trophy, text: "Conducted 3 hackathons", value: "3" },
      { icon: TrendingUp, text: "40% proficiency boost in participants", value: "40%" },
    ],
    stats: {
      participants: "500+",
      events: "11",
      impact: "High",
    },
    color: "#00D4FF",
  },
  {
    title: "Technical Volunteer",
    organization: "Maatram Educational Trust",
    period: "May - Jun 2025",
    description: "Built healthcare management system for underserved communities",
    achievements: [
      { icon: Database, text: "SQL-automated clinic records", value: "SQL" },
      { icon: Heart, text: "Community healthcare impact", value: "100+" },
      { icon: Users, text: "Served rural patients", value: "Direct" },
      { icon: TrendingUp, text: "Streamlined operations", value: "80%" },
    ],
    stats: {
      patients: "100+",
      system: "SQL",
      impact: "Direct",
    },
    color: "#39FF14",
  },
]

export function Leadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="leadership" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#39FF14/5,transparent_50%)]" />
      
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono text-[#39FF14] border border-[#39FF14]/30 rounded-full bg-[#39FF14]/5">
            COMMAND.CENTER
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-[#39FF14] to-[#7C3AED] bg-clip-text text-transparent">
              Leadership
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building communities, mentoring peers, and driving technical excellence.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF] via-[#7C3AED] to-[#39FF14]" />
          
          {/* Experiences */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-[#0a0a0f] z-10"
                  style={{ borderColor: exp.color }}
                >
                  <div 
                    className="absolute inset-1 rounded-full animate-pulse"
                    style={{ backgroundColor: exp.color }}
                  />
                </div>
                
                {/* Content */}
                <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div 
                    className="glass rounded-2xl p-6 hover:border-[#00D4FF]/30 transition-all hover:-translate-y-1"
                    style={{ borderColor: `${exp.color}20` }}
                  >
                    {/* Period badge */}
                    <div 
                      className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-4"
                      style={{ 
                        backgroundColor: `${exp.color}15`,
                        color: exp.color,
                      }}
                    >
                      {exp.period}
                    </div>
                    
                    {/* Title & Organization */}
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{exp.organization}</p>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6">{exp.description}</p>
                    
                    {/* Achievements */}
                    <div className={`grid grid-cols-2 gap-4 ${index % 2 === 0 ? "md:justify-items-end" : ""}`}>
                      {exp.achievements.map((achievement, i) => {
                        const Icon = achievement.icon
                        return (
                          <div 
                            key={i}
                            className={`flex items-center gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                          >
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${exp.color}15` }}
                            >
                              <Icon className="w-4 h-4" style={{ color: exp.color }} />
                            </div>
                            <div className={index % 2 === 0 ? "md:text-right" : ""}>
                              <div className="text-sm font-bold" style={{ color: exp.color }}>
                                {achievement.value}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {achievement.text}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
