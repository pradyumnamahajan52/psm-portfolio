import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import profile from '../data/profile.json'

const LINKS = [
  { label: 'About', to: '/#about' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-xl font-bold" onClick={() => setOpen(false)}>
          <span className="text-gradient">{profile.shortName}</span>
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm transition-colors hover:text-accent-soft ${
                l.to === '/projects' && pathname.startsWith('/projects') ? 'text-accent-soft' : 'text-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <span
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted"
            title="Open to freelance & full-time work"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            open to work
          </span>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/50 px-3.5 py-1.5 text-sm text-accent-soft transition-colors hover:bg-accent hover:text-white"
          >
            <Download size={15} aria-hidden /> Resume
          </a>
        </div>

        <button
          className="text-text md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line/60 bg-bg/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-accent-soft"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={profile.resumeUrl}
                download
                className="mt-1 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-accent-soft"
              >
                <Download size={15} aria-hidden /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
