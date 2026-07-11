import ScrollReveal from './ScrollReveal.jsx'

export default function SectionHeading({ kicker, title, subtitle }) {
  return (
    <ScrollReveal className="mb-12">
      <p className="mb-2 font-display text-sm font-medium uppercase tracking-[0.25em] text-accent">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </ScrollReveal>
  )
}
