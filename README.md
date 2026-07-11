# Pradyumna Mahajan — Portfolio

Personal portfolio site: React + Vite, Tailwind CSS v4, Framer Motion, React Router.
Fully static — no backend. GitHub projects are fetched live from the public GitHub API
in the visitor's browser (cached 6h, with a bundled fallback).

## Commands

```bash
npm install       # once
npm run dev       # dev server + local admin panel at /admin
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Editing content

Two ways:

1. **Admin panel (recommended):** `npm run dev` → open `http://localhost:5173/admin`.
   Visual editors for projects (with image upload), profile, skills, experience, services.
   Changes write straight to `src/data/*.json` and hot-reload the preview.
   The admin exists **only in dev** — none of it ships in the production build.
2. **By hand:** edit `src/data/*.json` directly. See `docs/content-guide.md`.

After editing: `npm run build` and re-upload `dist/` (Hostinger) — or `git push` (Netlify).

## Deployment

Full step-by-step guide in [`docs/deployment.md`](docs/deployment.md).

- **Hostinger (current):** upload the *contents* of `dist/` to `public_html/`.
  The included `.htaccess` handles SPA deep links. Enable "show hidden files" to verify it uploaded.
- **Netlify (future):** push to GitHub → import on Netlify → `netlify.toml` does the rest.

## Project docs & session memory

- `docs/` — plan, decisions log, content guide, deployment guide.
- `.claude/` — working state (`state.md`), context, and dated session summaries, so any
  future Claude Code session resumes with full history.
