import { useState, useCallback, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/#services" },
  { label: "Solutions", path: "/#solutions" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/#about" },
  { label: "Contact", path: "/#contact" },
] as const

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const isActive = to === "/"
    ? location.pathname === "/" && !location.hash
    : to.startsWith("/#")
      ? location.pathname === "/" && location.hash === to.slice(1)
      : location.pathname === to

  const handleClick = (e: React.MouseEvent) => {
    if (to === "/" && location.pathname === "/" && !location.hash) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="relative group py-1"
    >
      <span className={cn(
        "relative text-sm font-medium transition-colors duration-200",
        isActive ? "text-text-primary" : "text-text-tertiary group-hover:text-text-primary",
      )}>
        {children}
        <span className={cn(
          "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )} />
      </span>
    </Link>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { pathname, hash } = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    onClose()
  }, [pathname, hash, onClose])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  const transition = reduced 
    ? { duration: 0 } 
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-surface/80 backdrop-blur-2xl"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={reduced ? {} : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduced ? {} : { x: "100%" }}
            transition={transition}
            className="relative flex flex-col h-full max-w-sm w-full ml-auto bg-surface border-l border-border"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 h-16 shrink-0 border-b border-border">
              <Logo />
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] text-white transition-colors hover:bg-white/10"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6" aria-label="Mobile navigation">
              <div className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={reduced ? {} : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={reduced ? {} : { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => {
                        onClose()
                        if (item.path === "/" && pathname === "/" && !hash) {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }}
                      className="block py-3 text-xl font-heading font-medium text-text-primary hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduced ? {} : { delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                <Link to="/#contact" onClick={onClose}>
                  <Button variant="primary" size="lg" className="w-full">
                    Book Discovery Call
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const isScrolled = useScrollPosition(50)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "absolute inset-0 -z-10 border-b transition-all duration-300",
            isScrolled
              ? "bg-surface/85 backdrop-blur-xl border-border/60"
              : "bg-surface/50 backdrop-blur-sm border-transparent",
          )}
        />
        <div className="relative">
          <Container>
            <nav
              className={cn(
                "flex items-center justify-between transition-all duration-300",
                isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20",
              )}
              aria-label="Main navigation"
            >
              <Logo />

              <div className="hidden lg:flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.path} to={item.path}>
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden lg:block">
                  <Link to="/#contact">
                    <Button variant="primary" size="sm" className="inline-flex items-center gap-1.5">
                      Book Discovery Call
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>

                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] text-white transition-colors hover:bg-white/10"
                  aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
                  aria-expanded={isMobileOpen}
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <motion.path
                      animate={isMobileOpen ? { d: "M18 6L6 18" } : { d: "M4 6h16" }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.path
                      animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      d="M4 12h16"
                    />
                    <motion.path
                      animate={isMobileOpen ? { d: "M6 6l12 12" } : { d: "M4 18h16" }}
                      transition={{ duration: 0.3 }}
                    />
                  </svg>
                </button>
              </div>
            </nav>
          </Container>
        </div>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  )
}
