import { memo } from "react"
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Brain, Code2, Database, Cloud, Zap, GitBranch, Container, MessageSquare, Search, Layers } from "lucide-react"

interface Technology {
  name: string
  icon: React.ReactNode
  category: string
  color: string
}

const technologies: Technology[] = [
  { name: "LangChain", icon: <Layers className="size-5" />, category: "AI Frameworks", color: "#1C3A24" },
  { name: "LangGraph", icon: <GitBranch className="size-5" />, category: "AI Frameworks", color: "#1A1F2E" },
  { name: "OpenAI", icon: <Brain className="size-5" />, category: "AI Models", color: "#10A37F" },
  { name: "Anthropic", icon: <MessageSquare className="size-5" />, category: "AI Models", color: "#D4AA00" },
  { name: "React", icon: <Code2 className="size-5" />, category: "Frontend", color: "#61DAFB" },
  { name: "TypeScript", icon: <Code2 className="size-5" />, category: "Language", color: "#3178C6" },
  { name: "PostgreSQL", icon: <Database className="size-5" />, category: "Database", color: "#336791" },
  { name: "Supabase", icon: <Database className="size-5" />, category: "Backend", color: "#3ECF8E" },
  { name: "Python", icon: <Code2 className="size-5" />, category: "Language", color: "#3776AB" },
  { name: "Docker", icon: <Container className="size-5" />, category: "DevOps", color: "#2496ED" },
  { name: "AWS", icon: <Cloud className="size-5" />, category: "Cloud", color: "#FF9900" },
  { name: "Vercel", icon: <Cloud className="size-5" />, category: "Hosting", color: "#000000" },
  { name: "Pinecone", icon: <Search className="size-5" />, category: "Vector DB", color: "#0085FF" },
  { name: "FastAPI", icon: <Zap className="size-5" />, category: "Backend", color: "#009688" },
]

const TechCard = memo(function TechCard({ tech }: { tech: Technology }) {
  return (
    <div className="group flex-shrink-0 w-48 md:w-56">
      <div className="relative rounded-xl border border-border/40 bg-surface-secondary/20 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/30 group-hover:bg-surface-secondary/40">
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent-secondary/0 opacity-0 transition-all duration-500 group-hover:from-accent/[0.03] group-hover:via-highlight/[0.02] group-hover:to-accent-secondary/[0.03] group-hover:opacity-100 pointer-events-none"
          style={{ margin: "-1px" }}
        />
        <div className="relative p-5 flex flex-col items-center text-center">
          <div
            className="mb-3 flex size-12 items-center justify-center rounded-xl border border-border bg-surface-tertiary text-text-secondary transition-all duration-300 group-hover:border-accent/30 group-hover:text-accent group-hover:shadow-[0_0_16px_rgba(109,94,249,0.15)]"
            style={{ background: `linear-gradient(135deg, ${tech.color}15, ${tech.color}05)` }}
          >
            <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              {tech.icon}
            </motion.div>
          </div>
          <h3 className="font-heading text-sm font-semibold text-text-primary">{tech.name}</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-text-tertiary uppercase tracking-wide">{tech.category}</p>
        </div>
      </div>
    </div>
  )
})

export function TechnologyCards() {
  const reduced = useReducedMotion()
  const scrollX = useMotionValue(0)
  const translateX = useTransform(scrollX, (x) => `${x}px`)
  const smoothX = useSpring(translateX, { stiffness: 100, damping: 30 })

  const allTechs = [...technologies, ...technologies]
  const itemWidth = 224
  const resetPoint = -(technologies.length * itemWidth)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const speed = 25
    const nextX = scrollX.get() - (speed * delta) / 1000
    if (nextX <= resetPoint) {
      scrollX.set(nextX - resetPoint)
    } else {
      scrollX.set(nextX)
    }
  })

  return (
    <div className="relative mt-16" aria-label="Technologies">
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div className="flex gap-4 will-change-transform" style={{ x: smoothX }}>
          {allTechs.map((tech, index) => (
            <TechCard key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
