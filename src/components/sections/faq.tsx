import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Accordion } from "@/components/ui/accordion"

const faqItems = [
  { title: "How long does a typical engagement take?", content: "Most MVPs take 4-8 weeks. Enterprise projects typically run 3-6 months depending on scope and complexity." },
  { title: "Do you work with startups or only enterprises?", content: "Both. We partner with early-stage startups building their first AI product and established enterprises scaling AI across their organization." },
  { title: "What does an engagement look like?", content: "We start with a discovery sprint to define scope and success metrics, then move into two-week build sprints with continuous delivery and feedback loops." },
  { title: "How do you handle data security?", content: "Security is built into every layer. We follow SOC 2 aligned practices, encrypt data in transit and at rest, and sign NDAs and DPAs as standard." },
  { title: "Can you work with our existing tech stack?", content: "Yes. We integrate with your existing infrastructure rather than forcing a migration. Our team is experienced across Python, TypeScript, cloud platforms, and major AI frameworks." },
  { title: "What happens after launch?", content: "We offer ongoing support, monitoring, and optimization. Most clients continue with a retainer for maintenance, feature development, and performance tuning." },
]

export function FAQSection() {
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
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">FAQ</span>
          <h2 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">Everything you need to know about working with Ritvox Solutions.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 mx-auto max-w-3xl"
        >
          <Accordion items={faqItems} />
        </motion.div>
      </Container>
    </section>
  )
}
