# Decisions Log

Confirmed decisions with date and reasoning. Add new entries at the top.

## 2026-07-11 — Initial planning session

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Framework | **React + Vite** (JavaScript, not TypeScript) | Hostinger shared hosting serves only static files — Next.js SSR can't run there. Vite's `dist/` output works identically on Hostinger and Netlify (zero-rework migration). React is Pradyumna's strongest professional skill. User chose JS over TS to match current experience. |
| 2 | Content storage | **Local JSON files in `src/data/`** bundled at build time | Fastest possible (no runtime requests), no CMS/backend to maintain. Adding a project = edit one JSON entry + rebuild. |
| 3 | GitHub projects | **Client-side fetch of public GitHub REST API** | No backend needed. 60 req/hr unauthenticated limit is fine with localStorage cache (6h TTL) + static fallback JSON (`github-fallback.json`). |
| 4 | Theme | **Dark & futuristic** — bg `#0a0a0f`, electric-violet accent (~`#8b5cf6`), glow effects, subtle particles | User picked from 4 previewed directions. |
| 5 | Styling | **Tailwind CSS v4** with CSS-variable palette | Fast iteration; industry-standard résumé keyword. |
| 6 | Animation | **Framer Motion** + small custom canvas particle field (no heavy particle library) | Scroll reveals, page transitions, hover micro-interactions; keep bundle lean; respect `prefers-reduced-motion`. |
| 7 | Site structure | **Hybrid**: single scrolling home page (all main sections) + React Router pages `/projects` and `/projects/:slug` for detailed case studies | User wants ranked/primary projects on home, click-through to full detail pages. Requires SPA rewrite config: `.htaccess` (Hostinger) + `netlify.toml` redirect (Netlify). |
| 8 | Contact | **Google Form** + direct links (email, LinkedIn, GitHub) | User preference. Host-independent, zero moving parts. (Netlify Forms rejected: would break on Hostinger.) |
| 9 | Session persistence | All plan/context/state stored in-repo: `docs/` + `.claude/` (state.md, context/, responses/) | User's explicit workflow requirement so any new session can resume with full history. See working agreement in `CLAUDE.md`. |
| 11 | Admin panel | **Local dev-only `/admin` panel** — visual JSON editors + image upload, powered by a Vite dev-server middleware; nothing ships to production. Decap CMS considered as a post-Netlify upgrade. | Live site is static (browser can't write files to Hostinger), so a hosted admin needs a backend — rejected. Local panel fits the existing rebuild-and-upload publish flow. User chose this over Decap-later, both, or hand-editing. |
| 10 | Featured projects (initial ranking) | 1. Crime Reporting System, 2. Money Mentor, 3. BookBroker, 4. myntome.com | Strongest/most complete work per resume + GitHub stars. Ranking editable via `rank` field in `projects.json`. |
