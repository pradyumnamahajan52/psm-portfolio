import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

// Thin gradient bar under the navbar that fills as the page scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-50 h-0.5 origin-left bg-gradient-to-r from-accent via-accent-soft to-glow"
      aria-hidden
    />
  )
}
