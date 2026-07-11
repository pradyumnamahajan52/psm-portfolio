import PageTransition from '../components/PageTransition.jsx'
import GlowButton from '../components/GlowButton.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function NotFound() {
  usePageTitle('404')
  return (
    <PageTransition>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mb-3 mt-4 font-display text-2xl font-bold">Page not found</h1>
        <p className="mb-8 text-muted">The page you're looking for doesn't exist or has moved.</p>
        <GlowButton to="/">Back to home</GlowButton>
      </div>
    </PageTransition>
  )
}
