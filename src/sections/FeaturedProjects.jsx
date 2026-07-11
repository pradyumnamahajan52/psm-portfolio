import { ArrowRight } from 'lucide-react'
import projects from '../data/projects.json'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import GlowButton from '../components/GlowButton.jsx'

export default function FeaturedProjects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 4)

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Projects"
        title="Featured work"
        subtitle="My strongest projects — click any card for the full case study."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((p, i) => (
          <ScrollReveal key={p.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={p} />
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.2} className="mt-10 text-center">
        <GlowButton variant="ghost" to="/projects">
          All projects <ArrowRight size={17} aria-hidden />
        </GlowButton>
      </ScrollReveal>
    </section>
  )
}
