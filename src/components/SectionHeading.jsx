import ScrollReveal from './ScrollReveal.jsx'

export default function SectionHeading({ kicker, title, subtitle }) {
  return (
    <ScrollReveal className="mb-12">
      <p className="mb-2 font-mono text-sm text-accent">
        <span className="text-muted/60">{'// '}</span>
        {kicker.toLowerCase()}
      </p>
      <h2 className="font-display text-3xl font-bold sm:text-4xl">
        {title}
        <span className="text-accent">.</span>
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </ScrollReveal>
  )
}
