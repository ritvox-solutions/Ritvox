import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import { Zap, Shield, Cpu, Handshake, Award, Lock } from "lucide-react"

const reasons = [
  { icon: Zap, title: "Faster Delivery", description: "4-8 week MVPs with rapid iteration cycles." },
  { icon: Shield, title: "Scalable Architecture", description: "Systems built for growth from day one." },
  { icon: Cpu, title: "Business-First AI", description: "Every model ties directly to a measurable outcome." },
  { icon: Handshake, title: "Long-Term Partnership", description: "We stay for the long haul — support and iteration included." },
  { icon: Award, title: "Enterprise Quality", description: "Production-grade security, testing, and monitoring." },
  { icon: Lock, title: "Security First", description: "SOC 2 aligned processes and data privacy built in." },
]

export function WhyUsSection() {
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
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">Why Us</span>
          <h2 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">Why Ritvox Solutions</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">We don&apos;t build AI for the sake of it. Every model, pipeline, and integration ties directly to a measurable business outcome.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div key={reason.title} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}>
              <Card className="group/why p-6 h-full">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-tertiary text-highlight transition-all duration-300 group-hover/why:border-highlight/30 group-hover/why:bg-highlight/5 group-hover/why:text-highlight group-hover/why:shadow-[0_0_16px_rgba(139,92,246,0.12)]">
                  <reason.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-text-primary">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{reason.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
