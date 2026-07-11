import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import profile from '../data/profile.json'
import ParticleField from '../components/ParticleField.jsx'
import Typewriter from '../components/Typewriter.jsx'
import GlowButton from '../components/GlowButton.jsx'

export default function Hero() {
  const reduce = useReducedMotion()
  const stagger = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.15 * i, ease: 'easeOut' },
        }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <ParticleField />
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6">
        <motion.p {...stagger(0)} className="mb-4 font-display text-accent">
          Hi, my name is
        </motion.p>
        <motion.h1
          {...stagger(1)}
          className="mb-3 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">{profile.name}</span>
        </motion.h1>
        <motion.h2
          {...stagger(2)}
          className="mb-6 min-h-[2.5rem] font-display text-2xl font-medium text-muted sm:text-3xl"
        >
          <Typewriter words={profile.roles} />
        </motion.h2>
        <motion.p {...stagger(3)} className="mb-10 max-w-xl text-lg text-muted">
          {profile.tagline}
        </motion.p>

        <motion.div {...stagger(4)} className="mb-12 flex flex-wrap items-center gap-4">
          <GlowButton to="/projects">View My Work</GlowButton>
          <GlowButton variant="ghost" to="/#contact">
            Hire Me
          </GlowButton>
          <div className="ml-1 flex items-center gap-4">
            <a href={profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="text-muted transition-colors hover:text-accent-soft">
              <Github size={22} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-accent-soft">
              <Linkedin size={22} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email"
              className="text-muted transition-colors hover:text-accent-soft">
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        <motion.div {...stagger(5)} className="flex flex-wrap gap-8">
          {profile.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-accent-soft">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-muted hover:text-accent"
      >
        <ChevronDown />
      </a>
    </section>
  )
}
