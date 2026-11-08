# Prakul Sherikar — Mechanical Engineering Portfolio

Responsive React + TypeScript + Vite portfolio. Project copy and status live in `src/data/projects.ts`; case-study content lives in `src/data/projectDetails.ts`.

## Run locally

Install a current Node.js LTS release, then from this folder:

```sh
npm install
npm run dev
```

The production bundle can be created with `npm run build` and previewed with `npm run preview`.

## Update projects and images

- Edit names, summaries, roles, statuses, tags, and reported highlights in `src/data/projects.ts`.
- Edit verified case-study descriptions in `src/data/projectDetails.ts`.
- Add verified project images under `public/assets/projects/<project-name>/` and reference them from project data when ready.
- Current project visuals are labeled placeholders, not project imagery.
- The résumé PDF is `public/Resume_A1_Prakul_PC.pdf`; the résumé page uses this file for its embedded preview and PDF actions. The existing DOCX remains available as a fallback.
- Routes are handled by a small path switch in `src/main.tsx`; no router dependency is used. Internal links and public assets are prefixed through `src/sitePath.ts`.

## Deploy

The GitHub Pages workflow in `.github/workflows/deploy-pages.yml` runs on pushes to `main` and manual dispatches. It installs from `package-lock.json`, builds the site, and publishes `dist/`. For `Prak2125/Prakul_Sherikar_Portfolio`, Vite uses `/Prakul_Sherikar_Portfolio/` as its production base; development uses `/` so `npm run dev` remains available at the localhost root. Internal links and public asset URLs use this configured base. The build emits route-specific `index.html` copies and a `404.html` fallback, supporting direct visits and refreshes under the project prefix. In the repository's Pages settings, set the publishing source to **GitHub Actions**. The repository also includes SPA fallback rules for Netlify/Cloudflare Pages (`public/_redirects`) and Vercel (`vercel.json`). Other static hosts need equivalent fallback routing to `index.html`.
