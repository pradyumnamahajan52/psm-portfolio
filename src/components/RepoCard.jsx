import { Star, ExternalLink } from 'lucide-react'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
}

export default function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col justify-between rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/60"
    >
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <h3 className="truncate font-display text-sm font-bold group-hover:text-accent-soft">
            {repo.name}
          </h3>
          <ExternalLink size={14} className="shrink-0 text-muted group-hover:text-accent" aria-hidden />
        </div>
        <p className="mb-3 line-clamp-2 text-xs text-muted">
          {repo.description || 'No description yet.'}
        </p>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: LANG_COLORS[repo.language] || '#8b5cf6' }}
              aria-hidden
            />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star size={13} aria-hidden /> {repo.stargazers_count}
        </span>
      </div>
    </a>
  )
}
