# Project State

_Last updated: 2026-07-11 (planning session, post admin-panel decision)_

## Current status: Phase 0 complete + plan extended with admin panel — PAUSED, waiting for user "go" to start Phase 1 (scaffolding). No code written yet.

## Done

- [x] Read resume (`Pradyumna_Mahajan_Resume.pdf`) and scanned GitHub profile
      (pradyumnamahajan52 — 32 public repos). Summary in `.claude/context/profile.md`.
- [x] All architecture/design decisions confirmed with user — 11 decisions in `docs/decisions.md`.
- [x] Full plan approved — `docs/plan.md`.
- [x] Phase 0: created `CLAUDE.md`, `docs/` (plan, decisions, content-guide, deployment),
      `.claude/` (state, context/, responses/).
- [x] Explained data flows to user (recorded below so it's never re-derived).
- [x] Decision #11 (2026-07-11): **local dev-only admin panel** — added as Phase 5b.

## Key knowledge (explained to user this session — reuse, don't re-explain)

### Data flow architecture
1. **Curated content (build time):** `src/data/*.json` → `import` in components → Vite
   inlines into the JS bundle at `npm run build` → zero runtime requests. Home page shows
   `featured: true` sorted by `rank` (top 3–4); `/projects` shows all; `/projects/:slug`
   looks up `projects.find(p => p.slug === slug)` via React Router `useParams`.
   Trade-off: content changes need rebuild + re-upload (on Netlify later: just `git push`).
2. **GitHub repos (runtime, visitor's browser):** `useGithubRepos` hook →
   localStorage cache (<6h? render it) → else fetch
   `api.github.com/users/pradyumnamahajan52/repos?per_page=100&sort=updated` →
   filter forks, sort by stars/recency → cache → render. On failure: render bundled
   `github-fallback.json`. Hook exposes `{ repos, loading, error }`.
3. **Outbound only contact:** Google Form link + mailto/LinkedIn/GitHub buttons. No server.

### GitHub API facts (user asked "what to do")
- Nothing to register/configure — public read-only JSON API, no key needed.
- 60 req/hr per visitor IP; fine with the 6h cache (≤1 request per visitor).
- NEVER put a GitHub token in frontend code (static JS is public; it would be stolen).
- User's GitHub homework (content, not code): write good repo descriptions (they become
  card text), set Website field on repos with live demos, add topics (become tags),
  update bio (currently "Student") to e.g. "Full Stack Developer — React · Django · Spring Boot",
  pin the featured repos.

### Admin panel design (Phase 5b — full spec in docs/plan.md "Local admin panel")
- Dev-only `/admin` route (registered only when `import.meta.env.DEV`), nothing in prod build.
- Vite dev-server middleware plugin: `GET/PUT /api/admin/data/:file` (read/write
  `src/data/*.json` with validation), `POST /api/admin/upload` (multipart images →
  `public/projects/<slug>/`, auto-updates the project's `images` array).
- Editors for: projects (title, slug, rank, featured, tech tags, summary, description,
  highlights, live/repo links, role, duration, images), skills, experience, services, profile.
- User workflow: `npm run dev` → edit at `localhost:5173/admin` → live preview →
  `npm run build` → upload `dist/` (later: `git push` on Netlify).
- Rejected alternatives: hosted admin (needs backend — breaks static design),
  Decap CMS (only viable after Netlify migration; noted as possible future upgrade).

## In progress

- (nothing — awaiting user "go" for Phase 1)

## Next (in order — mirrors docs/plan.md and the session task list #2–#9)

1. **Phase 1:** Scaffold Vite + React (JS) app in this directory; Tailwind v4,
   framer-motion, react-router-dom, lucide-react, react-icons, @fontsource fonts;
   dark theme CSS variables (#0a0a0f bg, ~#8b5cf6 accent); git init.
2. **Phase 2:** Data layer — `src/data/*.json` from `.claude/context/profile.md`;
   resume PDF → `public/resume/`.
3. **Phase 3:** Layout shell — Navbar, Footer, routes, AnimatePresence transitions, 404.
4. **Phase 4:** Home sections — Hero (particles, typewriter, CTAs), About, Skills,
   FeaturedProjects, Experience, GithubActivity, Services, Contact.
5. **Phase 5:** `/projects` + `/projects/:slug` case-study pages.
6. **Phase 5b:** Local dev-only admin panel (spec above).
7. **Phase 6:** Polish — reduced motion, SEO/OG, favicon, responsive QA, Lighthouse 90+.
8. **Phase 7:** `.htaccess`, `netlify.toml`, README deploy guide, build verification.

## Waiting on user (non-blocking for build, needed before launch)

- Google Form URL for the contact section
- Project screenshots (placeholders will be used until provided)
- WhatsApp contact button — yes/no (number needed if yes)
- GitHub homework listed above (descriptions, topics, bio, pins)
