import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <Card tilt className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="accent">{project.category}</Badge>
            <span className="text-[11px] text-text-tertiary">{project.status}</span>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-text-tertiary transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h3 className="mt-3 font-heading text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs text-text-tertiary bg-surface-tertiary rounded-md px-2 py-0.5 transition-colors group-hover:bg-accent/5 group-hover:text-accent/80">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs text-text-tertiary">+{project.technologies.length - 4}</span>
          )}
        </div>
      </Card>
    </Link>
  )
}
