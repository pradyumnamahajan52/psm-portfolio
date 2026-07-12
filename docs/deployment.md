# Deployment Guide

The site is a fully static build — the same `dist/` output works on both hosts.

## Build

```bash
npm run build     # outputs dist/
npm run preview   # optional: test the production build locally
```

## Hostinger shared hosting (current)

1. Run `npm run build`.
2. Open Hostinger hPanel → **File Manager** (or connect via FTP/SFTP with the
   credentials from hPanel → Files → FTP Accounts).
3. Go to `public_html/` and delete old site files (keep any unrelated folders).
4. Upload **the contents of `dist/`** (not the folder itself): `index.html`, `assets/`,
   `.htaccess`, `resume/`, `projects/`, etc.
5. Verify `.htaccess` made it (File Manager hides dotfiles by default — enable
   "Show hidden files"). It contains the SPA rewrite so deep links like
   `/projects/crime-reporting-system` load correctly:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

6. Test: home page, a project detail URL pasted directly in the address bar, resume download.

## Netlify free tier (future migration — zero code changes)

1. ~~Push the repo to GitHub~~ — done 2026-07-12: https://github.com/pradyumnamahajan52/psm-portfolio
2. Recreate `netlify.toml` at the repo root (removed 2026-07-12 while Hostinger is the
   only target — decision #15) with exactly this content, commit and push:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. On https://app.netlify.com → **Add new site → Import an existing project** → pick the
   repo. Netlify reads `netlify.toml` automatically.
4. Deploy. Every future `git push` auto-deploys.
5. Point the domain: in Netlify → Domain settings → add custom domain, then at the domain
   registrar change the A/CNAME records (or switch nameservers to Netlify DNS).
   Free HTTPS is automatic via Let's Encrypt.

## Notes

- `.htaccess` only matters on Hostinger (Apache). `netlify.toml` only matters on Netlify —
  it is currently NOT in the repo (user decision, 2026-07-12); recreate it from step 2
  above when migrating.
- No environment variables or server functions are used anywhere, which is what keeps
  this migration path trivial.
