import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import projects from '../data/projects.json'
import PageTransition from '../components/PageTransition.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import TechBadge from '../components/TechBadge.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Prose from '../components/Prose.jsx'
import NotFound from './NotFound.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const sorted = [...projects].sort((a, b) => a.rank - b.rank)
  const index = sorted.findIndex((p) => p.slug === slug)
  const project = sorted[index]
  usePageTitle(project ? project.title : 'Not found')

  if (!project) return <NotFound />

  const prev = sorted[index - 1]
  const next = sorted[index + 1]

  return (
    <PageTransition>
      <article className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-soft"
        >
          <ArrowLeft size={16} aria-hidden /> All projects
        </Link>

        <ScrollReveal>
          <h1 className="mb-3 font-display text-3xl font-bold sm:text-5xl">
            <span className="text-gradient">{project.title}</span>
          </h1>
          <p className="mb-6 text-lg text-muted">{project.summary}</p>

          <div className="mb-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            <span>
              <strong className="text-text">Role:</strong> {project.role}
            </span>
            <span>
              <strong className="text-text">Duration:</strong> {project.duration}
            </span>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>

          <div className="mb-10 flex flex-wrap gap-4">
            {project.liveUrl && (
              <GlowButton href={project.liveUrl}>
                <ExternalLink size={17} aria-hidden /> Live site
              </GlowButton>
            )}
            {project.repoUrl && (
              <GlowButton variant="ghost" href={project.repoUrl}>
                <Github size={17} aria-hidden /> Source code
              </GlowButton>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-10 overflow-hidden rounded-xl border border-line">
            <img src={project.images[0]} alt={`${project.title} screenshot`} className="w-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="mb-4 font-display text-xl font-bold">About this project</h2>
          <Prose html={project.description} className="mb-10 leading-relaxed text-muted" />
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="mb-4 font-display text-xl font-bold">Highlights</h2>
          <ul className="mb-14 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-muted">
                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <nav className="flex justify-between gap-4 border-t border-line pt-8" aria-label="Project navigation">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-soft"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-2 text-right text-sm text-muted transition-colors hover:text-accent-soft"
            >
              {next.title}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}
        </nav>
      </article>
    </PageTransition>
  )
}
