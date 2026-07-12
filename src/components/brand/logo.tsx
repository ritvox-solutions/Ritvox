import { Link } from "react-router-dom"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Ritvox Solutions — home">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d5ef9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logo-grad)" opacity="0.15" />
        <path d="M16 6 L26 16 L16 26 L6 16 Z" fill="none" stroke="url(#logo-grad)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 10 L22 16 L16 22 L10 16 Z" fill="url(#logo-grad)" opacity="0.6" />
      </svg>
      <span className="font-heading text-base font-semibold text-text-primary">Ritvox Solutions</span>
    </Link>
  )
}
