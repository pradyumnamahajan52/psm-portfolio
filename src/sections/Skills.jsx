import skills from '../data/skills.json'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import TechBadge from '../components/TechBadge.jsx'
import CodeDrift from '../components/CodeDrift.jsx'

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 overflow-hidden bg-surface/30 py-24">
      <CodeDrift />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Skills"
          title="Technologies I work with"
          subtitle="A full-stack toolkit built across professional work, freelance projects and formal training."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <ScrollReveal key={group.group} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50">
                <h3 className="mb-4 font-display font-bold text-accent-soft">{group.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechBadge key={item} name={item} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
