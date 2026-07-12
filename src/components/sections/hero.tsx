import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { HeroNetwork } from "@/components/hero/hero-network"
import { MagneticButton } from "@/components/hero/magnetic-button"
import { TechnologyCards } from "@/components/hero/technology-cards"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

function DataPanel({ className, children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-xl border border-border/50 bg-surface-secondary/20 backdrop-blur-sm ${className ?? ""}`}
      animate={{ y: [0, -6, 0], opacity: [0.4, 0.65, 0.4] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

function PulseDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex size-1.5 ${className}`}>
      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
      <span className="absolute inset-0 rounded-full bg-accent" />
    </span>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen pt-32 md:pt-40 lg:pt-48 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Aurora gradients */}
        <div className="absolute top-1/4 left-1/4 size-[500px] rounded-full bg-accent/5 blur-[150px] animate-aurora-slow" />
        <div className="absolute bottom-1/4 right-1/4 size-[500px] rounded-full bg-highlight/5 blur-[150px] animate-aurora-fast" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-accent-secondary/3 blur-[180px] animate-radial-shift" />

        {/* Ambient light orbs */}
        <div className="absolute top-[15%] right-[20%] size-32 rounded-full bg-accent/4 blur-[80px] animate-float-slow" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-[20%] left-[15%] size-40 rounded-full bg-accent-secondary/3 blur-[100px] animate-float" style={{ animationDuration: "10s" }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {!reduced && <HeroNetwork />}

      {/* Floating data panels */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden max-md:hidden" aria-hidden="true">
          <DataPanel className="left-[6%] top-[22%] p-3" delay={0}>
            <div className="flex items-center gap-2.5">
              <div className="flex gap-[3px]">
                {[1, 1.5, 1, 0.5].map((w, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full"
                    style={{ height: `${w * 12}px`, background: i % 2 === 0 ? "#6d5ef9" : "#00d4ff", opacity: 0.5 + w * 0.2 }}
                  />
                ))}
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-text-tertiary">
                <PulseDot /> live
              </span>
            </div>
          </DataPanel>
          <DataPanel className="right-[8%] top-[35%] p-4" delay={1}>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-text-tertiary tracking-wide">inference</span>
                <span className="text-[10px] font-mono text-accent-secondary">1.2ms</span>
              </div>
              <div className="h-px bg-border/40" />
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-text-tertiary tracking-wide">accuracy</span>
                <span className="text-[10px] font-mono text-success">99.7%</span>
              </div>
              <div className="h-px bg-border/40" />
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-text-tertiary tracking-wide">uptime</span>
                <span className="text-[10px] font-mono text-accent">99.99%</span>
              </div>
            </div>
          </DataPanel>
          <DataPanel className="left-[12%] top-[58%] p-2.5" delay={2}>
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg border border-border-strong/30 flex items-center justify-center bg-accent/5">
                <div className="size-1.5 rounded-full bg-accent animate-glow-pulse" />
              </div>
              <span className="text-[10px] font-medium text-text-tertiary">model active</span>
            </div>
          </DataPanel>
          <DataPanel className="right-[15%] top-[65%] p-3" delay={0.5}>
            <div className="text-center">
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm font-semibold gradient-text bg-gradient-to-r from-accent to-accent-secondary">98%</span>
                <span className="text-[8px] text-text-tertiary">uptime</span>
              </div>
              <div className="mt-1 h-1 w-16 rounded-full bg-border/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 2, delay: 1, ease: easing }}
                />
              </div>
            </div>
          </DataPanel>
        </div>
      )}

      <Container>
        <motion.div
          ref={ref}
          initial={reduced ? undefined : { opacity: 0 }}
          animate={isInView || reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="relative mx-auto max-w-5xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/4 px-4 py-1.5 text-xs font-medium text-accent/80">
              <PulseDot />
              AI Engineering Studio
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easing, delay: 0.4 }}
            className="mt-8 font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-tight"
          >
            Ship Intelligent Systems{" "}
            <span className="gradient-text bg-gradient-to-r from-accent via-highlight to-accent-secondary">
              That Mean Business
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easing, delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary/90 md:text-lg"
          >
            From autonomous AI agents to enterprise-grade software — we engineer systems that drive measurable outcomes, not impressions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easing, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <Button variant="primary" size="xl" className="gap-1.5">
                Book Discovery Call
                <ArrowRight className="size-4" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" size="xl" onClick={() => navigate("/projects")}>
                View Projects
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easing, delay: 1.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs text-text-tertiary"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent opacity-60" />
              <span className="font-semibold text-text-primary/70">4–8 week</span> MVP delivery
            </span>
            <span className="hidden sm:block size-1 rounded-full bg-border-strong" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent-secondary opacity-60" />
              <span className="font-semibold text-text-primary/70">Enterprise</span> grade security
            </span>
            <span className="hidden sm:block size-1 rounded-full bg-border-strong" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-highlight opacity-60" />
              <span className="font-semibold text-text-primary/70">Outcome</span> based pricing
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-16 flex justify-center motion-reduce:hidden"
        >
          <div className="flex flex-col items-center gap-2 text-text-tertiary/60">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="size-3.5" />
            </motion.div>
          </div>
        </motion.div>

        {/* Technology Cards */}
        <TechnologyCards />
      </Container>
    </section>
  )
}
