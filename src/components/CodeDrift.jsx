import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// Faint code tokens floating behind a section; each one drifts at its own
// speed as the section scrolls through the viewport (parallax layers).
const TOKENS = [
  { text: '</>', x: '6%', y: '16%', speed: 90, className: 'text-2xl text-accent/25' },
  { text: '{ }', x: '88%', y: '10%', speed: -70, className: 'text-xl text-accent-soft/20' },
  { text: '=>', x: '78%', y: '72%', speed: 120, className: 'text-3xl text-glow/15' },
  { text: 'const', x: '12%', y: '64%', speed: -100, className: 'text-lg text-accent/20' },
  { text: 'git push', x: '58%', y: '88%', speed: 70, className: 'text-sm text-accent-soft/15' },
  { text: 'npm run dev', x: '30%', y: '8%', speed: -55, className: 'text-sm text-accent/15' },
  { text: '&&', x: '46%', y: '30%', speed: 140, className: 'text-2xl text-accent-soft/10' },
  { text: ';', x: '92%', y: '48%', speed: -130, className: 'text-4xl text-glow/15' },
]

function Token({ token, progress, reduce }) {
  const drift = useTransform(progress, [0, 1], [token.speed, -token.speed])
  return (
    <motion.span
      style={{ left: token.x, top: token.y, y: reduce ? 0 : drift }}
      className={`absolute select-none font-mono ${token.className}`}
    >
      {token.text}
    </motion.span>
  )
}

export default function CodeDrift() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {TOKENS.map((t) => (
        <Token key={t.text} token={t} progress={scrollYProgress} reduce={reduce} />
      ))}
    </div>
  )
}
