import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  divider?: boolean
}

export function Section({ children, id, className, divider }: SectionProps) {
  return (
    <section id={id} className={cn("section-padding-lg relative", className)}>
      {divider && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-accent/20 to-transparent" aria-hidden="true" />
      )}
      {children}
    </section>
  )
}
