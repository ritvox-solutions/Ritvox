import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"

export function AboutSection({ id }: { id?: string }) {
  return (
    <section id={id} className="py-16 md:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">Who We Are</span>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-text-primary md:text-4xl">
            About <span className="gradient-text bg-gradient-to-r from-accent to-accent-secondary">Ritvox Solutions</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            We are a team of engineers, designers, and AI researchers who build intelligent systems
            that solve real business problems. Every engagement is measured by outcomes —
            not lines of code or model parameters.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
