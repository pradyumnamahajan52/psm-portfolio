import { Briefcase, GraduationCap } from 'lucide-react'
import experience from '../data/experience.json'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-surface/30 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading kicker="Experience" title="Where I've worked & studied" />
        <div className="relative border-l border-line pl-8">
          {experience.map((item, i) => {
            const Icon = item.type === 'work' ? Briefcase : GraduationCap
            return (
              <ScrollReveal key={`${item.org}-${item.title}`} delay={i * 0.08}>
                <div className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-bg text-accent">
                    <Icon size={15} aria-hidden />
                  </span>
                  <p className="mb-1 text-sm text-accent-soft">{item.period}</p>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mb-3 text-sm text-muted">
                    {item.org} · {item.location}
                  </p>
                  {item.points.length > 0 && (
                    <ul className="space-y-1.5 text-sm text-muted">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
