# Requirements & User Preferences

_Captured 2026-07-11 from the initial planning conversation._

## Who

Pradyumna Mahajan — full-time Associate Software Developer at DeccanLogic (Pune), also
freelancing. Email: pradyumnamahajan52@gmail.com. GitHub: pradyumnamahajan52.
Owns domain pradyumnamahajan.in (listed on GitHub profile). Hosting: Hostinger shared.

## Original request (paraphrased)

Build a portfolio website to showcase work to **both freelance clients and future
employers**. Requirements:

- Simple but highly creative, with modern animations.
- Choose between React / Vite / Next.js / Vanilla JS (all within his experience).
- Dynamic and easy to add data; very fast; asked whether JSON files or other approaches.
- Must work on Hostinger shared hosting **now**, with easy migration to Netlify free tier later.
- Dynamically fetch and display GitHub projects **without a custom backend**.
- Wants recommendations on themes, styling, animation libraries, content strategy,
  and a step-by-step development plan.

## Confirmed answers (via AskUserQuestion, 2026-07-11)

1. **Theme:** Dark & futuristic (near-black bg, electric-violet accent, glow, particles).
2. **Language:** JavaScript (not TypeScript).
3. **Contact:** Google Form + direct links (email, LinkedIn, GitHub). No form backend.
4. **Structure:** Hybrid — main/basic sections on one scrolling home page with ranked
   primary projects; clicking a project opens a **detail page** with full information
   (`/projects`, `/projects/:slug`).

## Workflow preferences (important — apply every session)

- User re-entered plan mode to insist: **documentation first, before any code.**
- All plan/context/state must be persisted **in the repo**: `docs/` + `.claude/`
  (state.md, context/, responses/) so any new session can pick up full history.
- Always save session summaries in `.claude/responses/` and keep `.claude/state.md` current.
- User writes in informal English; confirm understanding of ambiguous phrasing rather
  than assuming.
