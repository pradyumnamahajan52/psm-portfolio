import { motion, useReducedMotion } from 'framer-motion'
import profile from '../data/profile.json'

// Mock terminal window in the hero — lines "type in" one after another and
// end on a live status line with a blinking caret.
const LINES = [
  { prompt: true, text: 'whoami' },
  { text: `${profile.name.toLowerCase().replace(' ', '-')} · full-stack developer` },
  { prompt: true, text: 'git log --oneline -1' },
  { text: 'f3a9c21 ship: another project delivered 🚀' },
  { prompt: true, text: 'npm run dev' },
  { vite: true, text: 'VITE ready in 214 ms' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.45, delayChildren: 0.6 } },
}
const line = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function Terminal() {
  const reduce = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface/80 shadow-[0_0_40px_rgba(139,92,246,0.12)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted">~/portfolio — zsh</span>
      </div>

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : 'hidden'}
        animate="show"
        className="space-y-2 p-4 font-mono text-[13px] leading-relaxed"
      >
        {LINES.map((l, i) => (
          <motion.p key={i} variants={reduce ? undefined : line} className="whitespace-nowrap">
            {l.prompt && <span className="mr-2 text-accent">$</span>}
            <span className={l.prompt ? 'text-text' : l.vite ? 'text-accent-soft' : 'text-muted'}>
              {l.text}
            </span>
          </motion.p>
        ))}
        <motion.p variants={reduce ? undefined : line} className="whitespace-nowrap">
          <span className="mr-2 text-glow">➜</span>
          <span className="text-muted">status:</span>{' '}
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            live
          </span>
          <span className="caret" aria-hidden />
        </motion.p>
      </motion.div>
    </div>
  )
}
