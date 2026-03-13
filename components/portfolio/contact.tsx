"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, FileText, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com", color: "#00D4FF" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "#7C3AED" },
  { name: "Resume", icon: FileText, href: "#", color: "#39FF14" },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    
    // Simulate sending
    setTimeout(() => {
      setFormState("sent")
      setTimeout(() => {
        setFormState("idle")
        setFormData({ name: "", email: "", message: "" })
      }, 3000)
    }, 1500)
  }
  
  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#00D4FF/5,transparent_50%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
      
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono text-[#00D4FF] border border-[#00D4FF]/30 rounded-full bg-[#00D4FF]/5">
            TRANSMISSION.HUB
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on ML projects or discuss opportunities? Let&apos;s connect.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact cards */}
            <div className="space-y-4">
              <a 
                href="mailto:sheriffnawaz641@gmail.com"
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-[#00D4FF]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center group-hover:bg-[#00D4FF]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-mono text-[#00D4FF]">sheriffnawaz641@gmail.com</div>
                </div>
              </a>
              
              <a 
                href="tel:+919789831254"
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-[#7C3AED]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-mono text-[#7C3AED]">+91 9789831254</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#39FF14]" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-mono text-[#39FF14]">Tiruvallur, Tamil Nadu</div>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl border border-[#2a2a3e] flex items-center justify-center hover:border-[#00D4FF]/50 transition-colors"
                    style={{ 
                      background: `linear-gradient(135deg, ${social.color}10, transparent)`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: social.color }} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="bg-[#0a0a0f] border-[#2a2a3e] focus:border-[#00D4FF] focus:ring-[#00D4FF]/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="bg-[#0a0a0f] border-[#2a2a3e] focus:border-[#00D4FF] focus:ring-[#00D4FF]/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    required
                    rows={5}
                    className="bg-[#0a0a0f] border-[#2a2a3e] focus:border-[#00D4FF] focus:ring-[#00D4FF]/20 resize-none"
                  />
                  <div className="mt-2 text-xs text-muted-foreground text-right">
                    {formData.message.length} characters
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={formState !== "idle"}
                className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-[#0a0a0f] font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {formState === "idle" && (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Transmission
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Transmitting...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Received!
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
