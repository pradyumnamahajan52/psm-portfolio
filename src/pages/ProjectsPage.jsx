import projects from '../data/projects.json'
import PageTransition from '../components/PageTransition.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function ProjectsPage() {
  usePageTitle('Projects')
  const sorted = [...projects].sort((a, b) => a.rank - b.rank)

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        <SectionHeading
          kicker="Portfolio"
          title="All projects"
          subtitle="Everything I've built — professional, freelance, academic and hackathon work. Click any project for the full story."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p, i) => (
            <ScrollReveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
