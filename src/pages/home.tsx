import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Hero } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { SolutionsSection } from "@/components/sections/solutions"
import { FeaturedProjectsSection } from "@/components/sections/featured-projects"
import { AboutSection } from "@/components/sections/about"
import { ProcessSection } from "@/components/sections/process"
import { WhyUsSection } from "@/components/sections/why-us"
import { FAQSection } from "@/components/sections/faq"
import { ContactSection } from "@/components/sections/contact"

export function HomePage() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const scroll = () => {
      if (hash) {
        const el = document.getElementById(hash.slice(1))
        el?.scrollIntoView({ behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(scroll))
  }, [hash, pathname])

  return (
    <>
      <Hero />
      <ServicesSection id="services" />
      <SolutionsSection id="solutions" />
      <FeaturedProjectsSection id="case-studies" />
      <AboutSection id="about" />
      <ProcessSection />
      <WhyUsSection />
      <FAQSection />
      <ContactSection id="contact" />
    </>
  )
}
