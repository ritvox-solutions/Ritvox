import { forwardRef, useRef, useState, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg" | "xl"
}

const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-br from-accent to-highlight text-white shadow-[0_0_20px_rgba(109,94,249,0.15)] hover:shadow-[0_0_35px_rgba(109,94,249,0.3)] hover:brightness-110",
  secondary: "bg-surface-tertiary border border-border text-text-primary hover:border-border-strong hover:bg-surface-tertiary/80",
  outline: "border border-border text-text-secondary hover:text-text-primary hover:border-border-strong",
  ghost: "text-text-secondary hover:text-text-primary",
}

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-3.5 text-base",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", onClick, children, ...props }, ref) => {
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
      onClick?.(e)
    }

    return (
      <button
        ref={(node) => {
          btnRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          "relative inline-flex items-center justify-center gap-1.5 rounded-lg font-medium overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute pointer-events-none rounded-full bg-white/30 animate-ripple"
            style={{ left: r.x, top: r.y, width: 4, height: 4, marginLeft: -2, marginTop: -2 }}
          />
        ))}
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)
Button.displayName = "Button"
