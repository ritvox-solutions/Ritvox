import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface CardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
  hover?: boolean
  id?: string
}

export function Card({ className, children, tilt, hover = true, ...rest }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || reduced || !tilt) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    if (reduced || !tilt) return
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt && !reduced ? { rotateX, rotateY, perspective: 800 } : undefined}
      className={cn(
        "group relative rounded-xl border border-border bg-surface-secondary/40 backdrop-blur-sm transition-all duration-400",
        hover && "hover:border-accent/20 hover:bg-surface-tertiary/40",
        tilt && "cursor-default",
        className,
      )}
      {...rest}
    >
      {/* Hover gradient overlay */}
      {hover && (
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.03] via-transparent to-accent-secondary/[0.03]" />
        </div>
      )}
      {children}
    </motion.div>
  )
}
