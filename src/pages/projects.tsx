import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/layout/container"
import { ProjectCard } from "@/components/projects/project-card"
import { projects, projectCategories } from "@/data/projects"
import { cn } from "@/lib/utils"

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeCategory) || p.category === activeCategory)

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 text-center"
          >
            <h1 className="font-heading text-4xl font-semibold text-text-primary md:text-5xl">Projects</h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary">
              A selection of projects we&apos;ve delivered — from AI agents to enterprise platforms.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300",
                  activeCategory === cat
                    ? "border-accent/30 bg-accent/8 text-accent shadow-[0_0_12px_rgba(109,94,249,0.1)]"
                    : "border-border text-text-tertiary hover:text-text-secondary hover:border-border-strong",
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full border border-accent/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-sm text-text-tertiary py-12">No projects found in this category.</p>
          )}
        </Container>
      </section>
    </>
  )
}
