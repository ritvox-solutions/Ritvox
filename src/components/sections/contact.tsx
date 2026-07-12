import { useState } from "react"
import { Mail, ExternalLink, Calendar, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

type FormData = {
  name: string
  company: string
  email: string
  projectType: string
  budget: string
  message: string
}

const initialForm: FormData = {
  name: "", company: "", email: "", projectType: "", budget: "", message: "",
}

export function ContactSection({ id }: { id?: string }) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id={id} className="py-16 md:py-24 lg:py-32">
      <Container>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-lg text-center"
            >
              <CheckCircle className="mx-auto size-12 text-success" />
              <h2 className="mt-6 font-heading text-2xl font-semibold text-text-primary">Thank You</h2>
              <p className="mt-3 text-sm text-text-secondary">We&apos;ll review your project and get back to you within 24 hours with a preliminary assessment.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid gap-12 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <h2 className="font-heading text-3xl font-semibold text-text-primary">
                    Let&apos;s Build Something
                    <span className="gradient-text bg-gradient-to-r from-accent to-accent-secondary"> Intelligent</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    Tell us about your project. We&apos;ll get back to you within 24 hours with a preliminary assessment and next steps.
                  </p>

                  <div className="mt-8 space-y-4">
                    <a href="mailto:hello@ritvoxsolutions.com" className="group flex items-center gap-3 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary">
                      <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-tertiary text-text-tertiary transition-all duration-200 group-hover:border-accent/30 group-hover:text-accent"><Mail className="size-4" /></span>
                      hello@ritvoxsolutions.com
                    </a>
                    <a href="https://linkedin.com/company/ritvoxsolutions" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary">
                      <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-tertiary text-text-tertiary transition-all duration-200 group-hover:border-accent/30 group-hover:text-accent"><ExternalLink className="size-4" /></span>
                      linkedin.com/company/ritvoxsolutions
                    </a>
                    <a href="#" className="group flex items-center gap-3 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary">
                      <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-tertiary text-text-tertiary transition-all duration-200 group-hover:border-accent/30 group-hover:text-accent"><Calendar className="size-4" /></span>
                      Schedule a discovery call
                    </a>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">Name *</label>
                      <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-surface-secondary/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:border-accent/30 focus:outline-none focus:shadow-[0_0_0_1px_rgba(109,94,249,0.12)]" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-1.5">Company</label>
                      <input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-lg border border-border bg-surface-secondary/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:border-accent/30 focus:outline-none focus:shadow-[0_0_0_1px_rgba(109,94,249,0.12)]" placeholder="Company name" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">Email *</label>
                    <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-surface-secondary/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:border-accent/30 focus:outline-none focus:shadow-[0_0_0_1px_rgba(109,94,249,0.12)]" placeholder="your@email.com" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-text-secondary mb-1.5">Project Type</label>
                      <select id="projectType" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="w-full rounded-lg border border-border bg-surface-secondary/50 px-4 py-2.5 text-sm text-text-primary transition-all duration-200 focus:border-accent/30 focus:outline-none focus:shadow-[0_0_0_1px_rgba(109,94,249,0.12)]">
                        <option value="">Select type</option>
                        <option value="ai-agent">AI Agent</option>
                        <option value="automation">AI Automation</option>
                        <option value="app">Custom Application</option>
                        <option value="enterprise">Enterprise Software</option>
                        <option value="mvp">MVP Development</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-text-secondary mb-1.5">Budget Range</label>
                      <select id="budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full rounded-lg border border-border bg-surface-secondary/50 px-4 py-2.5 text-sm text-text-primary transition-all duration-200 focus:border-accent/30 focus:outline-none focus:shadow-[0_0_0_1px_rgba(109,94,249,0.12)]">
                        <option value="">Select budget</option>
                        <option value="10-25k">$10k - $25k</option>
                        <option value="25-50k">$25k - $50k</option>
                        <option value="50-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">Message *</label>
                    <textarea id="message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-border bg-surface-secondary/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:border-accent/30 focus:outline-none focus:shadow-[0_0_0_1px_rgba(109,94,249,0.12)] resize-y" placeholder="Tell us about your project..." />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">Send Message</Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  )
}
