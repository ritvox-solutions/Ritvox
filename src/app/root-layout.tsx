import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LenisProvider } from "./lenis-provider"

function PageFallback() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="size-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  )
}

export function RootLayout() {
  return (
    <LenisProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-x-0 focus:top-0 focus:z-50 focus:bg-accent focus:p-4 focus:text-center focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" role="main">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </LenisProvider>
  )
}
