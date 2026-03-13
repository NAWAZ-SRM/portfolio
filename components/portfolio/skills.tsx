"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "Python", level: 95, color: "#00D4FF", snippet: "import sklearn\nfrom sklearn.pipeline import Pipeline" },
      { name: "JavaScript", level: 92, color: "#7C3AED", snippet: "const model = await tf.loadLayersModel()" },
      { name: "TypeScript", level: 88, color: "#39FF14", snippet: "interface MLModel<T extends Tensor>" },
      { name: "C", level: 85, color: "#00D4FF", snippet: "#include <neural.h>\nvoid backprop()" },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "React", level: 90, color: "#00D4FF", snippet: "const [state, dispatch] = useReducer()" },
      { name: "Node.js", level: 88, color: "#39FF14", snippet: "app.use(cors()); await db.connect()" },
      { name: "PyTorch", level: 85, color: "#7C3AED", snippet: "model = nn.Sequential(*layers)" },
      { name: "TensorFlow", level: 82, color: "#00D4FF", snippet: "tf.keras.Model.fit(x_train, y_train)" },
    ],
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "MongoDB", level: 88, color: "#39FF14", snippet: "db.collection.aggregate([{$match}])" },
      { name: "PostgreSQL", level: 85, color: "#00D4FF", snippet: "SELECT * FROM neural_weights" },
      { name: "Git", level: 90, color: "#7C3AED", snippet: "git rebase -i HEAD~3" },
      { name: "GCP", level: 80, color: "#00D4FF", snippet: "gcloud ai models deploy" },
    ],
  },
]

function SkillBar({ skill, index, isInView }: { skill: typeof skillCategories[0]["skills"][0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      
      <div className="relative h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            boxShadow: `0 0 10px ${skill.color}50`
          }}
        />
      </div>
      
      {/* Code snippet tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute top-full left-0 right-0 mt-2 p-3 rounded-lg bg-[#0a0a0f] border border-[#2a2a3e] z-20"
        style={{ display: isHovered ? "block" : "none" }}
      >
        <pre className="text-xs font-mono text-[#00D4FF] whitespace-pre-wrap">
          {skill.snippet}
        </pre>
      </motion.div>
    </motion.div>
  )
}

function SkillOrb({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex flex-col items-center cursor-pointer"
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative"
        style={{
          background: `conic-gradient(${color} ${level}%, transparent ${level}%)`,
          boxShadow: isHovered ? `0 0 30px ${color}60` : `0 0 15px ${color}30`,
        }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0a0a0f] flex items-center justify-center">
          <span className="text-xs sm:text-sm font-bold" style={{ color }}>{level}%</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-mono text-muted-foreground">{name}</span>
    </motion.div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#7C3AED/5,transparent_50%)]" />
      
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono text-[#7C3AED] border border-[#7C3AED]/30 rounded-full bg-[#7C3AED]/5">
            TECHNICAL.CAPABILITIES
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#00D4FF] bg-clip-text text-transparent">
              Skills Matrix
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover over skills to see live code snippets. A comprehensive toolkit for building intelligent systems.
          </p>
        </motion.div>
        
        {/* Skill orbs - mobile visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {[
            { name: "Python", level: 95, color: "#00D4FF" },
            { name: "React", level: 90, color: "#7C3AED" },
            { name: "PyTorch", level: 85, color: "#39FF14" },
            { name: "Node.js", level: 88, color: "#00D4FF" },
            { name: "TensorFlow", level: 82, color: "#7C3AED" },
          ].map((skill, index) => (
            <SkillOrb key={skill.name} {...skill} delay={0.3 + index * 0.1} />
          ))}
        </motion.div>
        
        {/* Detailed skill bars */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + catIndex * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-6 text-[#00D4FF]" style={{ fontFamily: "var(--font-orbitron)" }}>
                {category.name}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
