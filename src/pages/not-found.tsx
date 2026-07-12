import { Link } from "react-router-dom"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center">
      <Container>
        <div className="text-center">
          <h1 className="font-heading text-6xl font-semibold gradient-text bg-gradient-to-r from-accent to-accent-secondary">404</h1>
          <p className="mt-4 text-lg text-text-secondary">Page not found</p>
          <p className="mt-2 text-sm text-text-tertiary">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/" className="mt-8 inline-block">
            <Button variant="primary">Go Home</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
