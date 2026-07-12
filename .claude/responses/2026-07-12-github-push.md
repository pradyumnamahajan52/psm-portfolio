# 2026-07-12 — Pushed project to GitHub

## What happened

- User asked to create a GitHub repo (same/proper name), ensure README + .gitignore,
  and push all code.
- README.md and .gitignore already existed from the build phases and were complete
  (node_modules, dist, `*.local`, WSL `*Zone.Identifier` / `*SandBoxSafeFile` all
  ignored; no unwanted files tracked). No changes needed to either.
- Verified `gh` CLI already authenticated as **pradyumnamahajan52** (https protocol).
- User explicitly chose **public** visibility when asked.
- Created repo and pushed in one step:
  `gh repo create psm-portfolio --public --source=. --remote=origin --push`
  with description "Personal portfolio website — React + Vite, Tailwind CSS v4,
  Framer Motion. Fully static, dark futuristic theme."

## Result

- Repo: https://github.com/pradyumnamahajan52/psm-portfolio (PUBLIC)
- `main` pushed (4 commits, HEAD `813161b`), local `main` tracks `origin/main`.
- Verified via `gh repo view`: name/visibility/default branch/description all correct.

## Notes

- Resume PDF is tracked twice by design-ish: `public/resume/` (served by site) and a
  working copy at repo root. Both are now public — harmless since the site serves the
  resume publicly anyway, but the root copy could be untracked later if desired.
- This summary + state.md update were committed and pushed after the initial push.

## Follow-up (same day): netlify.toml removed

User: "for now don't add netlify.toml, I will host on Hostinger." Removed the file from
the repo (decision #15). Its exact contents are preserved verbatim in
`docs/deployment.md` (Netlify section, step 2) so migration later is copy-paste.
README, deployment guide, decisions log, and state.md all updated to match.
