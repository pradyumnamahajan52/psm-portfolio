import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Home from './pages/Home.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import NotFound from './pages/NotFound.jsx'

// Dev-only: the whole admin bundle is eliminated from production builds
// because import.meta.env.DEV is statically false there.
const AdminPage = import.meta.env.DEV
  ? lazy(() => import('./admin/AdminPage.jsx'))
  : null

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Navbar />
      <ScrollProgress />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            {AdminPage && (
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<div className="p-10 text-muted">Loading admin…</div>}>
                    <AdminPage />
                  </Suspense>
                }
              />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
