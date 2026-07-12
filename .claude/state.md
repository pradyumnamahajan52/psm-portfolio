# Project State

_Last updated: 2026-07-12 (CI/CD workflow + coding-vibe restyle, branch `claude/new-session-qd6ag2`)_

## Current status: ALL BUILD PHASES (0–7) COMPLETE and verified. Code is on GitHub: https://github.com/pradyumnamahajan52/psm-portfolio (public). Site is ready to deploy to Hostinger — now with an auto-deploy GitHub Actions workflow (needs SSH secrets configured). Waiting only on user-provided content (see "Waiting on user").

## Latest session (CI/CD + coding vibe — decisions #16–#17, on branch `claude/new-session-qd6ag2`)

- **`.github/workflows/deploy.yml`**: push to `main` → build → rsync `dist/` to
  Hostinger over SSH. Needs repo secrets `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_PORT`,
  `SSH_USER`, `DEPLOY_PATH` (documented in the file header). Manual dispatch enabled.
- **Coding-vibe layer**: JetBrains Mono accents, `// kicker` section headings +
  accent dot on titles, hero mock terminal (lg+), scroll-progress bar,
  scroll-linked parallax (hero copy/orb, About card via `Parallax.jsx`, floating
  code tokens via `CodeDrift.jsx` in hero + skills), pulsing "open to work"
  navbar pill, server-style footer status strip. All honor reduced motion.
- New dep: `@fontsource/jetbrains-mono`. Bundle now 409 kB JS / 137 kB gzip.
- Verified headlessly (screenshots + numeric parallax/progress checks); recipe
  saved to `.claude/skills/verify/SKILL.md`. Details in
  `.claude/responses/2026-07-12-cicd-coding-vibe.md`.

## Previous session (admin UX rework — decisions #12–#13)

- Admin panel now has **form editors for every data file** (was raw JSON for all but
  projects): `ProfileEditor`, `SkillsEditor`, `ExperienceEditor`, `ServicesEditor`
  (+ existing `ProjectsEditor`), shared primitives in `src/admin/fields.jsx`.
  List views with Edit/Delete/↑↓ reorder; "Edit raw JSON" checkbox as escape hatch.
- **CKEditor 5** (`ckeditor5` + `@ckeditor/ckeditor5-react`, licenseKey 'GPL') for
  project description + profile bio via `src/admin/RichTextField.jsx`; dark theme in
  `src/admin/admin.css`. HTML stored in JSON; rendered by `src/components/Prose.jsx`
  (plain legacy strings render unchanged). Verified NOT in production bundle.
- **Equal-height cards** in all home/projects grids (`h-full` chains in ProjectCard,
  RepoCard, ScrollReveal wrappers). Measured equal via headless Chromium.
- Verified end-to-end with Playwright (scratchpad): CKEditor edit → save → JSON on
  disk → site renders rich HTML; validation probes (empty name, empty skill group,
  unknown data file) all reject cleanly. Test data restored via git afterwards.
- Headless-browser gotcha on this WSL box: Playwright Chromium needs libnspr4/libnss3/
  libasound2t64 — no sudo, so `apt-get download` + `dpkg-deb -x` + `LD_LIBRARY_PATH`.

## Done

- [x] Phase 0: docs + session-persistence structure (`CLAUDE.md`, `docs/`, `.claude/`).
- [x] Phase 1: Vite 6 + React 18 (JS) scaffold; Tailwind v4, framer-motion,
      react-router-dom v7, lucide-react, react-icons, @fontsource (Space Grotesk + Inter);
      dark theme (#0a0a0f bg, violet accent) in `src/index.css`.
- [x] Phase 2: `src/data/*.json` populated with real resume/GitHub content;
      resume PDF at `public/resume/`; `github-fallback.json` snapshot.
- [x] Phase 3: Navbar, Footer, routes in `App.jsx` (AnimatePresence transitions,
      ScrollManager for hash/scroll restoration), NotFound page.
- [x] Phase 4: all home sections — Hero (ParticleField, Typewriter, CTAs), About, Skills,
      FeaturedProjects, Experience, GithubActivity (`useGithubRepos` hook: 6h localStorage
      cache + fallback), Services, Contact.
- [x] Phase 5: `/projects` grid + `/projects/:slug` case-study pages
      (placeholder SVG covers in `public/projects/<slug>/cover.svg`).
- [x] Phase 5b: dev-only admin panel — `adminApiPlugin.js` (Vite middleware,
      `apply: 'serve'`: GET/PUT `/api/admin/data/:file` with whitelist validation,
      POST `/api/admin/upload` base64 → `public/projects/<folder>/`);
      `/admin` route registered only when `import.meta.env.DEV`.
- [x] Phase 6: favicon.svg, robots.txt, sitemap.xml, SEO title/meta, reduced-motion
      support, `usePageTitle` hook.
- [x] Phase 7: `public/.htaccess` (SPA rewrite, ships into dist), `netlify.toml`,
      README with deploy guide.
- [x] **Verified 2026-07-11:** `npm run build` succeeds (≈394 kB JS / 132 kB gzip);
      `dist/.htaccess` present; production bundle contains NO admin code (grep-verified —
      only project copy mentions "admin"); `vite preview` serves `/` and deep link
      `/projects/crime-reporting-system` (SPA fallback OK); dev server admin API works
      and rejects unknown data files.
- [x] **git initialized** (branch `main`), initial commit `6e553bd` with everything.
      `.gitignore` also excludes WSL `*Zone.Identifier` / `*SandBoxSafeFile` artifacts.
- [x] **Pushed to GitHub 2026-07-12:** public repo
      `https://github.com/pradyumnamahajan52/psm-portfolio`, `origin/main` tracking set.
      Created via `gh repo create` (user chose public visibility). README + .gitignore
      already existed and were pushed as-is. Netlify import is now unblocked.

## Key knowledge (reuse, don't re-derive)

- Data flow, GitHub API facts, and admin panel design: see the 2026-07-11 entries in
  `.claude/responses/2026-07-11-planning.md` and `docs/plan.md` (unchanged, still accurate).
- Content edits happen ONLY in `src/data/*.json` (by hand or via `/admin` in dev).
- Publish flow: `npm run build` → upload `dist/` contents to Hostinger `public_html`
  (keep `.htaccess`). `netlify.toml` was REMOVED 2026-07-12 (user hosts on Hostinger
  only) — contents preserved in `docs/deployment.md` for later Netlify migration.

## In progress

- (nothing)

## Next

1. **User QA:** run `npm run dev`, click through every section/route, try `/admin`.
2. Manual checks not automatable here: GitHub section offline-fallback test (devtools
   offline), `prefers-reduced-motion` emulation, Lighthouse audit on `npm run preview`
   (target 90+), mobile/tablet responsive pass.
3. **Deploy to Hostinger** following `docs/deployment.md` / README.
4. Replace placeholder SVG covers with real screenshots (via `/admin` upload or manually
   into `public/projects/<slug>/`).
5. ~~Push to GitHub~~ done 2026-07-12. Optional later: Netlify migration (recreate
   netlify.toml per docs/deployment.md — removed at user request); Decap CMS upgrade.

## Waiting on user (non-blocking for deploy, needed before launch)

- Google Form URL for the contact section (placeholder link in `profile.json` until then)
- Project screenshots (placeholder SVGs in use)
- WhatsApp contact button — yes/no (number needed if yes)
- GitHub profile homework: repo descriptions, topics, Website fields, bio update, pins
