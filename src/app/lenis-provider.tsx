import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    ;(window as unknown as Record<string, unknown>).lenis = lenis

    return () => {
      lenis.destroy()
      delete (window as unknown as Record<string, unknown>).lenis
    }
  }, [])

  return <>{children}</>
}
