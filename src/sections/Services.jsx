import { Globe, Smartphone, ShoppingCart, Server } from 'lucide-react'
import services from '../data/services.json'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

const ICONS = { globe: Globe, smartphone: Smartphone, cart: ShoppingCart, server: Server }

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-surface/30 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Services"
          title="What I can build for you"
          subtitle="Available for freelance projects — from a landing page to a full product with payments."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Globe
            return (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-line bg-surface p-6 transition-all hover:border-accent/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="mb-2 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mb-4 text-sm text-muted">{s.description}</p>
                  <ul className="space-y-1.5 text-sm text-muted">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
