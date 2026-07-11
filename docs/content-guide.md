# Content Guide — how to update the site

All editable content lives in `src/data/` (created in Phase 2). You never need to touch
components to change text, projects, or skills. After any edit: `npm run build` and re-upload
`dist/` (Hostinger) — or just `git push` once on Netlify.

## Add a new project

1. Open `src/data/projects.json` and add an entry:

```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "rank": 5,
  "featured": false,
  "tech": ["React.js", "Django", "MySQL"],
  "summary": "One-line plain-language description shown on cards.",
  "description": "Longer case-study text for the detail page. Problem, solution, your role.",
  "highlights": ["Key achievement 1", "Key achievement 2"],
  "images": ["/projects/my-new-project/cover.png"],
  "liveUrl": "https://example.com",
  "repoUrl": "https://github.com/pradyumnamahajan52/my-new-project",
  "role": "Full Stack Developer",
  "duration": "2 Months"
}
```

2. Drop screenshots into `public/projects/my-new-project/` (cover.png ≈ 1200×675 recommended).
3. To show it on the home page's Featured section, set `"featured": true` and adjust `rank`
   (lower rank = shown first; home shows the top 3–4 featured).
4. Rebuild.

## Edit skills / experience / services

- `src/data/skills.json` — grouped lists (languages, frontend, backend, databases, tools).
- `src/data/experience.json` — jobs and education for the timeline (newest first).
- `src/data/services.json` — freelance offerings shown to clients.
- `src/data/profile.json` — name, role, bio, email, social URLs, Google Form URL.

## Update the resume PDF

Replace `public/resume/Pradyumna_Mahajan_Resume.pdf` with the new file (same filename,
so the download link never breaks). Rebuild.

## Refresh the GitHub fallback snapshot

`src/data/github-fallback.json` is the static copy shown if the GitHub API is unreachable.
Regenerate occasionally:

```bash
curl -s "https://api.github.com/users/pradyumnamahajan52/repos?per_page=100&sort=updated" \
  > src/data/github-fallback.json
```

The live section updates itself automatically — this file is only the offline safety net.
