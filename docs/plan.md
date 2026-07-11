# Pradyumna Mahajan — Portfolio Website Plan

## Context

Pradyumna is a full-stack developer (React.js/React Native at DeccanLogic; Django/Spring Boot project experience) who wants a portfolio site targeting **both freelance clients and recruiters**. It must be simple but creative with modern animations, deploy to **Hostinger shared hosting today** and migrate to **Netlify free tier later** with zero rework, and make adding new projects trivial without a backend.

Decisions confirmed with the user:
- **Framework:** React + Vite (static build → works on both hosts; Next.js SSR can't run on shared hosting)
- **Language:** JavaScript (JSX)
- **Theme:** Dark & futuristic — near-black `#0a0a0f` bg, electric-violet accent, glow effects, subtle animated particles/grid
- **Structure:** Hybrid — single scrolling home page (hero → about → skills → featured projects → experience → services → contact) **plus** React Router detail pages: `/projects` (all projects) and `/projects/:slug` (case study per project)
- **Contact:** Google Form link/embed + direct buttons (email, LinkedIn, GitHub, WhatsApp)
- **Data:** Local JSON files bundled at build time; GitHub repos fetched client-side from the public GitHub API (no backend)

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Build | Vite 6 + React 18, JavaScript | Static `dist/`, instant dev server |
| Routing | React Router v7 (library mode) | Needed for project detail pages |
| Styling | Tailwind CSS v4 | Fast iteration, dark theme via CSS variables |
| Animation | Framer Motion (`motion` package) | Scroll-reveal, page transitions, hover micro-interactions |
| Icons | `lucide-react` + `react-icons` (brand/tech logos) | |
| Fonts | Self-hosted via `@fontsource` (e.g. Space Grotesk for display, Inter for body) | No external requests, fast |

No particle library — a lightweight custom canvas/CSS animated grid + floating dots keeps the bundle small.

## PHASE 0 — Documentation & Session Persistence (FIRST deliverable, before any code)

Per the user's explicit request, this structure is created **first, on its own**, before any site code. All planning/context lives **inside the repo** so any new session can resume from it:

```
psm-portfolio/
├── CLAUDE.md                  ← auto-loaded by Claude Code each session; instructs: read
│                                .claude/state.md first, then docs/plan.md; ALWAYS update
│                                state/responses/context before ending a session
├── docs/
│   ├── plan.md                (this full plan — the source of truth)
│   ├── decisions.md           (confirmed choices: stack, theme, structure, contact, hosting)
│   ├── content-guide.md       (how to add a project / edit skills / update resume)
│   └── deployment.md          (Hostinger steps now, Netlify migration later)
└── .claude/
    ├── state.md               (current progress: what's done / in progress / next)
    ├── context/               (everything needed to rebuild session knowledge)
    │   ├── profile.md         (resume summary + GitHub scan results feeding the content)
    │   └── requirements.md    (original request, confirmed answers, user preferences)
    └── responses/             (dated summary of every working session,
                                e.g. 2026-07-11-planning.md)
```

**Working agreement (applies to every future session too):** at each milestone and at the end of every session, update `.claude/state.md`, add a dated file in `.claude/responses/`, and record any new decisions in `docs/decisions.md` — so history is never lost between sessions.

Phase 0 completes and is shown to the user **before coding begins** (Phases 1+).

## Project Structure

```
psm-portfolio/
├── public/
│   ├── resume/Pradyumna_Mahajan_Resume.pdf   (download link)
│   ├── projects/           (screenshots per project)
│   └── .htaccess           (SPA rewrite for Hostinger — copied into dist)
├── src/
│   ├── data/               ← THE ONLY PLACE TO EDIT CONTENT
│   │   ├── profile.json    (name, role, bio, socials, email, Google Form URL)
│   │   ├── projects.json   (ranked; each: slug, title, rank, featured, tech[],
│   │   │                    summary, description, images[], liveUrl, repoUrl,
│   │   │                    highlights[], role, duration)
│   │   ├── skills.json     (grouped: languages / frontend / backend / db / tools)
│   │   ├── experience.json (jobs + education timeline)
│   │   ├── services.json   (freelance offerings)
│   │   └── github-fallback.json (static snapshot of repos, used if API fails)
│   ├── hooks/useGithubRepos.js   (fetch + localStorage cache + fallback)
│   ├── components/         (Navbar, Footer, SectionHeading, ProjectCard,
│   │                        TechBadge, GlowButton, ParticleField, ScrollReveal…)
│   ├── sections/           (Hero, About, Skills, FeaturedProjects, Experience,
│   │                        GithubActivity, Services, Contact)
│   ├── pages/              (Home, ProjectsPage, ProjectDetail, NotFound)
│   ├── App.jsx  (routes + AnimatePresence page transitions + scroll restoration)
│   └── main.jsx
├── netlify.toml            (build cmd + publish dir + SPA redirect)
└── vite.config.js
```

## Key Behaviors

### Local admin panel (dev-only, added 2026-07-11)
A visual editor for all content, available **only on Pradyumna's machine** during `npm run dev`
— nothing admin-related ships in the production build:

- **UI:** `/admin` route (registered only when `import.meta.env.DEV` is true) with forms for
  every data file: project editor (title, slug, rank, featured toggle, tech tags, summary,
  description, highlights, live/repo links, duration, role), plus skills, experience,
  services, and profile editors.
- **Images:** upload control per project — files are saved to `public/projects/<slug>/`
  and the JSON `images` array is updated automatically.
- **Persistence:** a small custom Vite dev-server middleware plugin exposes
  `GET/PUT /api/admin/data/:file` (read/write `src/data/*.json` with validation) and
  `POST /api/admin/upload` (multipart → `public/projects/`). The middleware exists only in
  the dev server, so the live site has no write endpoints at all.
- **Publish flow unchanged:** edit in `/admin` → files on disk change → `npm run build` →
  upload `dist/` (or `git push` once on Netlify).
- Possible future upgrade (post-Netlify migration): Decap CMS for edit-from-anywhere.

### GitHub integration (no backend)
`useGithubRepos` hook: fetch `https://api.github.com/users/pradyumnamahajan52/repos?per_page=100&sort=updated` client-side → filter out forks → sort by stars/recency → cache JSON in `localStorage` with a 6-hour TTL → on any fetch error, render `github-fallback.json`. Unauthenticated limit is 60 req/hr per visitor IP; with caching each visitor makes ≤1 request. Shown in a "More on GitHub" section as compact cards (name, description, language dot, stars, link).

### Curated projects vs. GitHub repos
- `projects.json` drives the **Featured Projects** section (top 3–4 by `rank`) and the `/projects` + `/projects/:slug` pages — full case studies with screenshots, problem/solution, tech stack, live/repo links.
- The GitHub API section is separate: an automatic, always-fresh view of everything else.
- **Adding a project later = add one JSON entry + drop screenshots in `public/projects/` + rebuild.**

### Content strategy (what each audience sees)
- **Recruiters:** hero title "Full Stack Developer", skills grid with familiar tech logos, experience/education timeline, resume PDF download button, GitHub activity, project case studies emphasizing architecture (JWT auth, REST APIs, Redux, AWS S3).
- **Freelance clients:** "Services" section (web apps, mobile apps with React Native, e-commerce w/ payment integration — backed by real work: myntome.com, BookBroker/Razorpay), plain-language project summaries, prominent "Hire Me" CTA in hero + contact section.
- **Featured 4:** Crime Reporting System (8★, strongest), Money Mentor, BookBroker, myntome.com.

### Design & animation details
- CSS variables for palette: `--bg: #0a0a0f`, `--surface`, `--accent: electric violet (~#8b5cf6)`, `--text`, `--muted`; glow via layered box-shadows.
- Hero: typewriter/staggered text reveal, subtle particle field, two CTAs (View Work / Hire Me).
- Scroll-triggered section reveals via Framer Motion `whileInView` (a reusable `<ScrollReveal>` wrapper).
- Project cards: hover lift + accent glow border; page transitions with `AnimatePresence`.
- Restraint rules: respect `prefers-reduced-motion`, animate only `transform`/`opacity`, keep total JS bundle lean.
- Responsive mobile-first; sticky navbar with smooth-scroll links (home sections) + route links.
- SEO: proper `<title>`/meta/OG tags, semantic HTML, `robots.txt`, sitemap.

### Dual-host deployment
- **Hostinger (now):** `npm run build` → upload `dist/` contents to `public_html` (via File Manager or FTP). `public/.htaccess` ships the SPA rewrite (`RewriteRule . /index.html`) so `/projects/:slug` deep links work.
- **Netlify (later):** `netlify.toml` with `command = "npm run build"`, `publish = "dist"`, and a `/* → /index.html 200` redirect. Migration = push repo to GitHub → "Import from Git" on Netlify. Nothing in the code changes.

## Implementation Steps

0. **Phase 0 — docs & session state (standalone, before any code):** create `docs/` (plan.md, decisions.md, content-guide.md, deployment.md), `.claude/` (state.md, context/profile.md, context/requirements.md, responses/2026-07-11-planning.md), and root `CLAUDE.md` as described above. Populate them with the full plan, all confirmed decisions, the resume/GitHub context, and current state. Pause point: user reviews this before coding starts.
1. **Scaffold:** `npm create vite@latest` (React JS), install Tailwind v4, Framer Motion, React Router, icons, fonts; set up theme CSS variables + base styles; `git init`.
2. **Data layer:** write all JSON files populated from the resume + GitHub scan (real content, not lorem ipsum); copy resume PDF into `public/resume/`.
3. **Layout shell:** Navbar (smooth-scroll + route links, mobile menu), Footer, route setup in `App.jsx` with page transitions and 404 page.
4. **Home sections** in order: Hero (particles, typewriter, CTAs) → About → Skills → Featured Projects → Experience timeline → GitHub Activity (hook + cache + fallback) → Services → Contact (Google Form + direct links).
5. **Project pages:** `/projects` grid of all curated projects; `/projects/:slug` case-study template (hero image, overview, highlights, tech, links, prev/next navigation). Placeholder screenshots initially — Pradyumna swaps in real ones.
5b. **Local admin panel:** Vite dev-middleware plugin (read/write `src/data/*.json`, image upload to `public/projects/`), dev-only `/admin` route with editors for projects (incl. images & links), skills, experience, services, profile. Verify it is absent from the production build.
6. **Polish:** reduced-motion support, SEO meta/OG tags, favicon, Lighthouse pass (target 90+ performance), responsive QA at mobile/tablet/desktop widths.
7. **Deployment artifacts:** `.htaccess`, `netlify.toml`, and a `README.md` with step-by-step Hostinger upload + future Netlify migration instructions and "how to add a new project" guide.

## Verification

- `npm run dev` — click through every section and route; test mobile viewport in devtools.
- GitHub section: verify live fetch renders repos, then block network (devtools offline) and confirm fallback JSON renders.
- `npm run build && npm run preview` — confirm production build works, deep-link directly to `/projects/<slug>` to validate SPA routing.
- Check `prefers-reduced-motion` emulation disables animations.
- Lighthouse audit on the preview build.

## Needed from Pradyumna (non-blocking, can be added later)
- Google Form URL for the contact section
- Project screenshots (placeholders used until then)
- WhatsApp number if he wants that contact button
