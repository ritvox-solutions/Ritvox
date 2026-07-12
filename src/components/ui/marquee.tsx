import type { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  speed?: number
  pauseOnHover?: boolean
}

export function Marquee({ children, speed = 30, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <div
        className="flex gap-4 marquee-content"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "fit-content",
        }}
        {...(pauseOnHover ? { onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused" } } : {})}
        {...(pauseOnHover ? { onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running" } } : {})}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
