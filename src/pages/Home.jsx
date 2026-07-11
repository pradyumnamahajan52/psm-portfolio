import PageTransition from '../components/PageTransition.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Skills from '../sections/Skills.jsx'
import FeaturedProjects from '../sections/FeaturedProjects.jsx'
import Experience from '../sections/Experience.jsx'
import GithubActivity from '../sections/GithubActivity.jsx'
import Services from '../sections/Services.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  usePageTitle()
  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <GithubActivity />
      <Services />
      <Contact />
    </PageTransition>
  )
}
