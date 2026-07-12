import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Container } from "./container"
import { Logo } from "@/components/brand/logo"

const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ritvoxsolutions",
    icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/ritvoxsolutions",
    icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>),
  },
  {
    label: "X",
    href: "https://x.com/ritvoxsolutions",
    icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
  },
]

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      to={href}
      className="group flex items-center gap-1 text-sm text-text-tertiary transition-colors duration-200 hover:text-text-primary"
    >
      {label}
      <ArrowUpRight className="size-3 opacity-0 -translate-y-0.5 transition-all duration-200 group-hover:opacity-60 group-hover:translate-y-0" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-4 md:gap-12">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-tertiary">
                We design and ship intelligent systems that solve real business problems.
                From AI agents to enterprise software, every engagement is measured by outcomes.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">Navigation</h4>
              <nav className="mt-5 flex flex-col gap-3" aria-label="Footer navigation">
                {navigation.map((link) => <FooterLink key={link.label} {...link} />)}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">Connect</h4>
              <div className="mt-5 flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-text-tertiary transition-colors duration-200 hover:text-text-primary"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-xs text-text-tertiary">&copy; {new Date().getFullYear()} Ritvox Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-text-tertiary transition-colors duration-200 hover:text-text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-text-tertiary transition-colors duration-200 hover:text-text-primary">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
