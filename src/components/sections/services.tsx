import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import { Brain, Workflow, Cpu, Building2, Rocket, Code2, ArrowUpRight } from "lucide-react"

const services = [
  { title: "AI Agents", description: "Autonomous agents that reason, act, and learn — designed for production reliability.", icon: Brain },
  { title: "AI Automation", description: "End-to-end pipelines that eliminate manual workflows and scale with your business.", icon: Workflow },
  { title: "Custom AI Applications", description: "Tailored AI solutions built from the ground up for your specific use case.", icon: Cpu },
  { title: "Enterprise Software", description: "Robust, secure, and scalable systems that integrate with your existing stack.", icon: Building2 },
  { title: "MVP Development", description: "From concept to working product in 4-8 weeks with rapid iteration cycles.", icon: Rocket },
  { title: "Full Stack Engineering", description: "Frontend, backend, infrastructure — end-to-end delivery with modern tooling.", icon: Code2 },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export function ServicesSection({ id }: { id?: string }) {
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
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">What We Do</span>
          <h2 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">Services</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">
            From strategy to deployment — we engineer AI systems that deliver measurable business outcomes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card tilt className="group/card p-6 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-tertiary text-accent transition-all duration-300 group-hover/card:border-accent/30 group-hover/card:bg-accent/5 group-hover/card:text-accent group-hover/card:shadow-[0_0_16px_rgba(109,94,249,0.12)]">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <service.icon className="size-5" />
                    </motion.div>
                  </div>
                  <ArrowUpRight className="size-4 text-text-tertiary transition-all duration-300 group-hover/card:text-accent group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 opacity-0 group-hover/card:opacity-100" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-text-primary">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
