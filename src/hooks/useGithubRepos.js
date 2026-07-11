import { useEffect, useState } from 'react'
import profile from '../data/profile.json'
import fallbackRepos from '../data/github-fallback.json'

const CACHE_KEY = 'psm-gh-repos-v1'
const TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

function slim(repo) {
  return {
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    topics: repo.topics || [],
    homepage: repo.homepage || '',
    pushed_at: repo.pushed_at,
  }
}

function sortRepos(repos) {
  return [...repos].sort(
    (a, b) =>
      b.stargazers_count - a.stargazers_count ||
      new Date(b.pushed_at) - new Date(a.pushed_at),
  )
}

export default function useGithubRepos() {
  const [repos, setRepos] = useState(null)
  const [source, setSource] = useState('loading') // loading | live | cache | fallback

  useEffect(() => {
    let cancelled = false

    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
      if (cached && Date.now() - cached.at < TTL_MS && Array.isArray(cached.repos)) {
        setRepos(sortRepos(cached.repos))
        setSource('cache')
        return
      }
    } catch {
      /* corrupt cache — fall through to fetch */
    }

    fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
    )
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        const cleaned = data.filter((r) => !r.fork).map(slim)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos: cleaned }))
        setRepos(sortRepos(cleaned))
        setSource('live')
      })
      .catch(() => {
        if (cancelled) return
        setRepos(sortRepos(fallbackRepos))
        setSource('fallback')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { repos, loading: repos === null, source }
}
