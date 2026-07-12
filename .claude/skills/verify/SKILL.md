---
name: verify
description: Build, serve, and drive this site headlessly to verify UI changes end-to-end.
---

# Verifying psm-portfolio changes

Surface: GUI (static Vite SPA). Verify by serving the production build and
driving it with headless Chromium via Playwright — screenshots are the evidence.

## Recipe that works in the remote sandbox

1. `npm run build`
2. `npm run preview -- --port 4173 --strictPort` (run in background)
3. Playwright is installed globally (`/opt/node22/lib/node_modules/playwright`)
   and browsers live at `/opt/pw-browsers` (`PLAYWRIGHT_BROWSERS_PATH` already
   set). Do NOT run `playwright install`.
4. ESM scripts can't resolve the global package via `NODE_PATH`. In the
   scratchpad dir: `mkdir -p node_modules && ln -sfn
   /opt/node22/lib/node_modules/playwright node_modules/playwright`, then
   `node drive.mjs` works with a plain `import { chromium } from 'playwright'`.

## Flows worth driving

- `/` hero (wait ~3.5 s for stagger + terminal type-in), scroll partway
  (parallax + scroll-progress bar), `#skills`, footer status bar.
- `/projects` and a `/projects/:slug` deep link (SPA fallback regression).
- Mobile 390×844: check `document.documentElement.scrollWidth <= clientWidth`
  (no horizontal overflow); terminal and navbar pill are hidden below `lg`.
- `reducedMotion: 'reduce'` page context should still render everything.

## Gotchas

- `api.github.com` fetch fails in the sandbox with `ERR_CERT_AUTHORITY_INVALID`
  (proxy CA). That console error is environmental — the GitHub section falls
  back to `github-fallback.json` by design. Don't count it as a failure.
- Scroll-progress bar: assert its computed `transform` scaleX grows between two
  scroll offsets. CodeDrift tokens: compare a token's absolute Y at two scroll
  offsets (they differ when parallax works).

## On WSL (user's local box, historical)

Playwright Chromium needs libnspr4/libnss3/libasound2t64 — no sudo, so
`apt-get download` + `dpkg-deb -x` + `LD_LIBRARY_PATH`.
