import { Link, useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/projects"

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="pt-32 pb-16">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-semibold text-text-primary">Project Not Found</h1>
            <p className="mt-4 text-sm text-text-secondary">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Button variant="outline" className="mt-6" onClick={() => navigate("/projects")}>
              <ArrowLeft className="size-4" /> Back to Projects
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  const related = projects.filter((p) => p.slug !== slug && p.category === project.category).slice(0, 3)

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/projects" className="group inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8">
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" /> Back to Projects
            </Link>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <Badge variant="accent">{project.category}</Badge>
              <h1 className="mt-4 font-heading text-3xl font-semibold text-text-primary md:text-4xl">{project.title}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">{project.longDescription}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="md" className="gap-1.5">Live Demo <ExternalLink className="size-3.5" /></Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="md" className="gap-1.5">
                      View Source
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-sm"
            >
              <div className="rounded-lg border border-border bg-surface-secondary/30 p-4"><span className="text-text-tertiary">Client</span><p className="text-text-primary font-medium mt-0.5">{project.client}</p></div>
              <div className="rounded-lg border border-border bg-surface-secondary/30 p-4"><span className="text-text-tertiary">Year</span><p className="text-text-primary font-medium mt-0.5">{project.year}</p></div>
              <div className="rounded-lg border border-border bg-surface-secondary/30 p-4"><span className="text-text-tertiary">Status</span><p className="text-text-primary font-medium mt-0.5">{project.status}</p></div>
              <div className="rounded-lg border border-border bg-surface-secondary/30 p-4">
                <span className="text-text-tertiary">Technologies</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-surface-tertiary rounded-md px-2 py-0.5 text-text-secondary">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl border border-border bg-gradient-to-br ${project.gradient} p-1`}
          >
            <div className="rounded-xl bg-surface p-12 md:p-16 text-center">
              <p className="text-sm text-text-tertiary">Project showcase</p>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {[
                { title: "Overview", content: project.overview },
                { title: "Challenge", content: project.challenge },
                { title: "Solution", content: project.solution },
              ].map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-heading text-xl font-semibold text-text-primary">{section.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{section.content}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-heading text-xl font-semibold text-text-primary">Key Features</h2>
                <ul className="mt-3 space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/60" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <div className="sticky top-28">
                <h2 className="font-heading text-xl font-semibold text-text-primary">Results</h2>
                <ul className="mt-4 space-y-3">
                  {project.results.map((r, i) => (
                    <motion.li
                      key={r}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-lg border border-border bg-surface-secondary/30 p-3 hover:border-accent/20 transition-colors"
                    >
                      <p className="text-sm font-medium gradient-text bg-gradient-to-r from-accent to-accent-secondary">{r}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="pb-16">
          <Container>
            <h2 className="font-heading text-2xl font-semibold text-text-primary">Related Projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="group block">
                  <div className="relative rounded-xl border border-border bg-surface-secondary/40 p-6 h-full transition-all duration-400 hover:border-accent/20 hover:bg-surface-tertiary/40 hover:shadow-[0_0_24px_rgba(109,94,249,0.06)]">
                    <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.03] via-transparent to-accent-secondary/[0.03]" />
                    </div>
                    <Badge variant="accent">{p.category}</Badge>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                      <ArrowUpRight className="size-4 shrink-0 text-text-tertiary transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-highlight/5 p-12 text-center"
          >
            <h2 className="font-heading text-2xl font-semibold text-text-primary">Let&apos;s Build Something Similar</h2>
            <p className="mt-3 text-sm text-text-secondary max-w-lg mx-auto">Have a project in mind? We&apos;d love to hear about it.</p>
            <Link to="/#contact" className="mt-6 inline-block">
              <Button variant="primary" size="lg">Start a Conversation</Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
