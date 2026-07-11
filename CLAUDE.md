# PSM Portfolio — Pradyumna Mahajan's Portfolio Website

Personal portfolio site for Pradyumna Mahajan (full-stack developer), targeting both
freelance clients and recruiters. React + Vite static site, dark futuristic theme,
deployed on Hostinger shared hosting now with a zero-rework migration path to Netlify.

## Session bootstrap — READ FIRST, IN THIS ORDER

1. `.claude/state.md` — current progress: what is done, in progress, and next.
2. `docs/plan.md` — the full approved plan (source of truth for architecture & decisions).
3. `.claude/context/requirements.md` — original request and confirmed user preferences.
4. `.claude/context/profile.md` — resume + GitHub scan content that feeds the site data.
5. `.claude/responses/` — dated summaries of past sessions if deeper history is needed.

## Working agreement — persist information EVERY session

Before ending any working session (and at each milestone):

- Update `.claude/state.md` (done / in progress / next).
- Add a dated summary file in `.claude/responses/` (e.g. `2026-07-11-planning.md`).
- Record any new decisions in `docs/decisions.md` with date and reasoning.
- Keep `docs/` guides current when the workflow they describe changes.

Never rely on chat history alone — these files are the project's memory.

## Quick facts

- **Stack:** Vite + React 18 (JavaScript/JSX), Tailwind CSS v4, Framer Motion,
  React Router; local JSON in `src/data/` is the ONLY place content is edited.
- **GitHub section:** client-side fetch of `api.github.com/users/pradyumnamahajan52/repos`,
  localStorage cache (6h TTL), static fallback JSON — no backend anywhere.
- **Structure:** single scrolling home page + `/projects` and `/projects/:slug` detail routes.
- **Contact:** Google Form + direct links (email, LinkedIn, GitHub). No form backend.
- **Hosting:** build output `dist/` → Hostinger `public_html` (needs `.htaccess` SPA rewrite);
  later Netlify via `netlify.toml`. See `docs/deployment.md`.

## Commands (after Phase 1 scaffold)

- `npm run dev` — dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
