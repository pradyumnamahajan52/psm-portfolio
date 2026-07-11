import { Github } from 'lucide-react'
import profile from '../data/profile.json'
import useGithubRepos from '../hooks/useGithubRepos.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import RepoCard from '../components/RepoCard.jsx'
import GlowButton from '../components/GlowButton.jsx'

export default function GithubActivity() {
  const { repos, loading } = useGithubRepos()
  const top = (repos || []).slice(0, 6)

  return (
    <section id="github" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Open Source"
        title="Fresh from my GitHub"
        subtitle="Pulled live from the GitHub API — always up to date, no backend involved."
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg border border-line bg-surface" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={i * 0.06}>
              <RepoCard repo={repo} />
            </ScrollReveal>
          ))}
        </div>
      )}

      <ScrollReveal delay={0.2} className="mt-10 text-center">
        <GlowButton variant="ghost" href={profile.social.github}>
          <Github size={17} aria-hidden /> View all on GitHub
        </GlowButton>
      </ScrollReveal>
    </section>
  )
}
