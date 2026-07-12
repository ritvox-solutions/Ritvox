import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Search, Map, Layout, Code, FlaskConical, Rocket, BarChart3 } from "lucide-react"

const steps = [
  { icon: Search, title: "Discovery", description: "Understand your business, goals, and technical landscape." },
  { icon: Map, title: "Strategy", description: "Define the roadmap, milestones, and success metrics." },
  { icon: Layout, title: "Architecture", description: "Design scalable systems with the right tech stack." },
  { icon: Code, title: "Development", description: "Build iteratively in two-week sprints with continuous delivery." },
  { icon: FlaskConical, title: "Testing", description: "Rigorous QA, security audits, and performance testing." },
  { icon: Rocket, title: "Deployment", description: "Production launch with monitoring and rollback plans." },
  { icon: BarChart3, title: "Optimization", description: "Ongoing performance tuning and feature iteration." },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">How We Work</span>
          <h2 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">Our Process</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">A proven methodology that delivers results — from discovery to production and beyond.</p>
        </motion.div>

        <div ref={ref} className="relative mt-16 mx-auto max-w-5xl">
          {/* Desktop timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-visible">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-accent via-highlight to-accent-secondary"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
            />
            {/* Glow on the timeline */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 size-16 rounded-full bg-accent/20 blur-xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: [0, 0.3, 0.15, 0.3, 0.1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-2">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-4 ${isLeft ? "lg:pr-8 lg:text-right lg:flex-row-reverse" : "lg:pl-8 lg:col-start-2"}`}
                >
                  {/* Timeline node */}
                  <div className="relative flex-shrink-0">
                    <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-accent/20 bg-surface text-accent shadow-[0_0_16px_rgba(109,94,249,0.1)] transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(109,94,249,0.2)]">
                      <step.icon className="size-5" />
                    </div>
                    {/* Desktop connector */}
                    <div className="hidden lg:block absolute top-1/2 w-4 h-px bg-gradient-to-r from-accent/30 to-accent-secondary/30" style={{ [isLeft ? "right" : "left"]: "-20px" }} />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2 lg:justify-start" style={{ flexDirection: isLeft ? "row-reverse" : "row" }}>
                      <span className="text-xs font-mono text-accent/60 tabular-nums">0{i + 1}</span>
                      <h3 className="font-heading text-base font-semibold text-text-primary">{step.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-text-tertiary leading-relaxed max-w-xs">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
