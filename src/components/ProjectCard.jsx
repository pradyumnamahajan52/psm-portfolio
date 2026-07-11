import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import TechBadge from './TechBadge.jsx'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="aspect-video overflow-hidden border-b border-line">
          <img
            src={project.images[0]}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold group-hover:text-accent-soft">
              {project.title}
            </h3>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </div>
          <p className="mb-4 text-sm text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>
      </Link>
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="absolute right-4 top-4 rounded-full bg-bg/70 p-2 text-muted opacity-0 backdrop-blur transition-all hover:text-accent group-hover:opacity-100"
        >
          <Github size={16} />
        </a>
      )}
    </motion.article>
  )
}
