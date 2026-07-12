import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import { HeadphonesIcon, TrendingUp, BookOpen, Workflow, FileText, Target } from "lucide-react"

const solutions = [
  { title: "Customer Support AI", problem: "48hr response times, overwhelmed teams", solution: "AI agents resolve 90% of queries autonomously", impact: "60% cost reduction", icon: HeadphonesIcon },
  { title: "Sales Automation", problem: "70% of sales time spent on manual work", solution: "AI pipeline scores, sequences, and nurtures", impact: "3x qualified meetings", icon: TrendingUp },
  { title: "Internal Knowledge Assistant", problem: "Critical knowledge scattered across tools", solution: "RAG-based assistant with citation-backed answers", impact: "40% research time recovered", icon: BookOpen },
  { title: "Workflow Automation", problem: "3-5 day cross-department processes", solution: "AI orchestrator routes and reconciles data", impact: "80% faster completion", icon: Workflow },
  { title: "Document Intelligence", problem: "Hours spent on manual data extraction", solution: "Multi-stage AI pipeline with 95% accuracy", impact: "10k+ documents processed daily", icon: FileText },
  { title: "Lead Qualification", problem: "60% of time wasted on unconverting leads", solution: "ML scoring model with intent analysis", impact: "50% more qualified meetings", icon: Target },
]

export function SolutionsSection({ id }: { id?: string }) {
  return (
    <section id={id} className="py-16 md:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">Use Cases</span>
          <h2 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">AI Solutions</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">Proven solutions for real business challenges across every function.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((s) => (
            <motion.div
              key={s.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
            >
              <Card tilt className="group/sol p-6 h-full">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-tertiary text-accent-secondary transition-all duration-300 group-hover/sol:border-accent-secondary/30 group-hover/sol:bg-accent-secondary/5 group-hover/sol:text-accent-secondary group-hover/sol:shadow-[0_0_16px_rgba(0,212,255,0.12)]">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-text-primary">{s.title}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-text-tertiary/70"><span className="text-destructive/60">Problem:</span> {s.problem}</p>
                  <p className="text-text-secondary"><span className="text-success/70">Solution:</span> {s.solution}</p>
                </div>
                <p className="mt-3 text-sm font-semibold gradient-text bg-gradient-to-r from-accent to-accent-secondary">{s.impact}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
