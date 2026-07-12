import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/projects"

const featured = projects.slice(0, 3)

export function FeaturedProjectsSection({ id }: { id?: string }) {
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
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-text-tertiary">Case Studies</span>
          <h2 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">Featured Projects</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">Real results from real engagements — each project delivered on time and on budget.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {featured.map((project) => (
            <motion.div
              key={project.slug}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
            >
              <Link to={`/projects/${project.slug}`} className="group block h-full">
                <div className="relative rounded-xl border border-border bg-surface-secondary/40 p-6 h-full transition-all duration-400 hover:border-accent/20 hover:bg-surface-tertiary/40 hover:shadow-[0_0_24px_rgba(109,94,249,0.06)]">
                  {/* Hover gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.03] via-transparent to-accent-secondary/[0.03]" />
                  </div>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-400 group-hover:opacity-5 pointer-events-none ${project.gradient}`} />
                  <div className="relative">
                    <Badge variant="accent">{project.category}</Badge>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">{project.title}</h3>
                      <ArrowUpRight className="size-4 shrink-0 text-text-tertiary transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">{project.description}</p>
                    <div className="mt-4 space-y-1">
                      {project.results.slice(0, 2).map((r) => (
                        <p key={r} className="text-sm text-text-tertiary">&bull; {r}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-text-tertiary bg-surface-tertiary rounded-md px-2 py-0.5 transition-colors group-hover:bg-accent/5 group-hover:text-accent/80">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-highlight transition-colors">
            View All Projects <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
