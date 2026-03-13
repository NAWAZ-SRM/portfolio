import { Navigation } from "@/components/portfolio/navigation"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Projects } from "@/components/portfolio/projects"
import { Certifications } from "@/components/portfolio/certifications"
import { Leadership } from "@/components/portfolio/leadership"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { CyberBackground } from "@/components/portfolio/cyber-background"
import { ScrollParticles, FloatingOrbs } from "@/components/portfolio/scroll-particles"
import { DraggableElements } from "@/components/portfolio/draggable-elements"
import { CursorTrailer, CustomCursor } from "@/components/portfolio/cursor-trailer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-foreground overflow-x-hidden">
      {/* 3D Background */}
      <CyberBackground />
      
      {/* Cursor Effects */}
      <CursorTrailer />
      <CustomCursor />
      
      {/* Scroll-based particles */}
      <ScrollParticles />
      <FloatingOrbs />
      
      {/* Draggable floating icons */}
      <DraggableElements />
      
      {/* Main content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Leadership />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
