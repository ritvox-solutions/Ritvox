import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: "default" | "accent" | "success"
}

const variants: Record<string, string> = {
  default: "border-border text-text-tertiary",
  accent: "border-accent/20 text-accent/90 bg-accent/5",
  success: "border-success/20 text-success/90 bg-success/5",
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
