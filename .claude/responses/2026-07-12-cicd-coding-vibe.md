# 2026-07-12 — CI/CD workflow + coding-vibe restyle session

## What the user asked

1. A GitHub Actions workflow "easy for deploy" to Hostinger, based on an example
   they pasted (SSH key setup + rsync). They said they'll add the secrets/details
   in the repo themselves later.
2. More "coding vibe" styling and more animation, specifically animations that
   move with scroll to make the site feel live.

## What was done

### Deploy workflow (`.github/workflows/deploy.yml`)

- Trigger: push to `main` + manual `workflow_dispatch`.
- Steps: checkout → Node 20 (npm cache) → `npm ci` → `npm run build` → SSH key
  setup (from secrets) → `rsync -avz --delete dist/ …:DEPLOY_PATH/`.
- Adapted from the user's example: their version synced a `frontend/` folder;
  this repo is a Vite app at the root, so we build and sync `dist/` (which
  already contains `.htaccess`).
- Required secrets (documented in a header comment): `SSH_PRIVATE_KEY`,
  `SSH_HOST`, `SSH_PORT` (Hostinger shared = 65002 usually), `SSH_USER`,
  `DEPLOY_PATH`.
- Excludes protect `api/`, `storage/`, `.git/`, `.well-known/` on the server
  from `--delete`.

### Coding-vibe + scroll animations

New components:
- `src/components/ScrollProgress.jsx` — gradient scroll-progress bar fixed
  under the navbar (`useScroll` + `useSpring`), hidden for reduced motion.
- `src/components/Terminal.jsx` — mock `~/portfolio — zsh` window in the hero:
  staggered "typed" lines (`whoami`, `git log`, `npm run dev`, `VITE ready…`),
  ends on `status: ● live` with pulsing dot + blinking caret (`.caret` CSS).
- `src/components/CodeDrift.jsx` — faint mono code tokens (`</>`, `{ }`, `=>`,
  `const`, `git push`, `npm run dev`, `&&`, `;`) absolutely positioned behind a
  section, each drifting at its own speed with scroll (per-token
  `useTransform`); used in Hero and Skills.
- `src/components/Parallax.jsx` — generic scroll-linked y-drift wrapper
  (`+speed → -speed` px across the viewport); used on About's quick-facts card.

Edits:
- `Hero.jsx` — two-column layout on lg (copy + Terminal), scroll-away parallax
  (copy drifts down slower + fades via `useTransform(scrollY…)`), glow orb on
  its own parallax layer, kicker now `// Hi, my name is` in mono.
- `SectionHeading.jsx` — kicker rendered as `// kicker` (mono, lowercase),
  accent `.` appended to every title.
- `Navbar.jsx` — pulsing green "open to work" pill (desktop).
- `Footer.jsx` — server-style status strip: `● status: online · branch: main ·
  env: production · uptime: always shipping`.
- `index.css` — `--font-mono` (JetBrains Mono), `caret-blink` keyframes.
- `main.jsx` — `@fontsource/jetbrains-mono` 400/500 imports (new dependency).
- `App.jsx` — mounts `<ScrollProgress />`.

All new motion respects `prefers-reduced-motion` (transforms skipped / bar
hidden / static terminal).

## Verification (headless Chromium on `vite preview`)

- Build passes: 409 kB JS / 137 kB gzip (was 394/132 — mono font + new
  components account for the diff).
- Screenshots confirmed hero terminal, `//` kickers, pill, footer strip,
  drifting tokens, `/projects` route intact.
- Numeric checks: progress-bar scaleX 0.079 → 0.42 across a 2000 px scroll;
  CodeDrift token moved ~28 px absolute over a 400 px scroll (parallax live).
- Mobile 390×844: no horizontal overflow; terminal + pill hidden as intended.
- Reduced-motion context renders fine.
- Only console error: `api.github.com` cert failure — sandbox proxy CA issue,
  falls back to `github-fallback.json` by design.
- Verify recipe persisted at `.claude/skills/verify/SKILL.md`.

## Follow-ups / user actions

- Add the 5 SSH secrets in GitHub → Settings → Secrets and variables → Actions,
  and add the public key to Hostinger (hPanel → Advanced → SSH Access).
- Workflow deploys on push to `main` — merge this branch to main to activate.
- User mentioned they'll share "other details/path" for the workflow later —
  adjust `DEPLOY_PATH`/excludes then if needed.
