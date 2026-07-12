import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import profile from '../data/profile.json'

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-surface/40">
      <div className="border-b border-line/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 font-mono text-xs text-muted sm:px-6">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            status: online
          </span>
          <span aria-hidden>·</span>
          <span>branch: main</span>
          <span aria-hidden className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">env: production</span>
          <span aria-hidden className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">uptime: always shipping</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name} · Built with React & a lot of ☕
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent-soft">
            <Github size={19} />
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent-soft">
            <Linkedin size={19} />
          </a>
          <a href={profile.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter / X"
            className="text-muted transition-colors hover:text-accent-soft">
            <Twitter size={19} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email"
            className="text-muted transition-colors hover:text-accent-soft">
            <Mail size={19} />
          </a>
        </div>
      </div>
    </footer>
  )
}
