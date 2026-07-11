import { MapPin, Briefcase } from 'lucide-react'
import profile from '../data/profile.json'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Prose from '../components/Prose.jsx'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading kicker="About" title="Who I am" />
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <ScrollReveal>
          <Prose html={profile.bio} className="mb-6 text-lg leading-relaxed text-muted" />
          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-accent" aria-hidden /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Briefcase size={16} className="text-accent" aria-hidden />
              Open to: {profile.openTo.join(' · ')}
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-line bg-surface p-6">
            <h3 className="mb-3 font-display font-bold">Quick facts</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>💼 Full-time developer at DeccanLogic, Pune</li>
              <li>🚀 Freelancing since 2020 — real products shipped</li>
              <li>🛒 Launched my own e-commerce store (myntome.com)</li>
              <li>🎓 PG-DAC from C-DAC ACTS, Pune</li>
              <li>🏆 Sunbeam Hackathon winner</li>
            </ul>
            <GlowButton variant="ghost" href={profile.resumeUrl} download className="mt-5 w-full justify-center text-sm">
              Download Resume
            </GlowButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
