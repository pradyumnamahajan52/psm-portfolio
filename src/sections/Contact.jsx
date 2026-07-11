import { Mail, Github, Linkedin, FileText } from 'lucide-react'
import profile from '../data/profile.json'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import GlowButton from '../components/GlowButton.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl scroll-mt-20 px-4 py-24 text-center sm:px-6">
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative">
        <SectionHeading
          kicker="Contact"
          title="Let's build something together"
          subtitle="Whether you have a freelance project in mind or a role you think I'd fit — my inbox is open."
        />
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4">
            <GlowButton href={`mailto:${profile.email}`}>
              <Mail size={17} aria-hidden /> Email me
            </GlowButton>
            {profile.googleFormUrl && (
              <GlowButton variant="ghost" href={profile.googleFormUrl}>
                <FileText size={17} aria-hidden /> Project enquiry form
              </GlowButton>
            )}
            <GlowButton variant="ghost" href={profile.social.linkedin}>
              <Linkedin size={17} aria-hidden /> LinkedIn
            </GlowButton>
            <GlowButton variant="ghost" href={profile.social.github}>
              <Github size={17} aria-hidden /> GitHub
            </GlowButton>
          </div>
          <p className="mt-8 text-sm text-muted">
            {profile.email} · {profile.location}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
