# Arjan Hayre — Portfolio

Portfolio site: **https://the-asgardian.github.io/ArjanHayre/**

- **Stack**: Vite, vanilla HTML/CSS/JS  
- **Deploy**: Push to `main` → GitHub Actions builds and deploys to `gh-pages`.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production-like check

```bash
npm run build
npm run preview
```

Opens the built site with base path `/ArjanHayre/` so you can verify links and assets before pushing.

## Edit content

- **Projects**: Edit `src/data/projects.json` (title, description, tags, liveUrl, repoUrl). Current entries are based on your CV experience; add live/repo links when you have public demos.
- **Skills**: Edit `src/data/skills.json` (name, shortDescription, icon).
- **Contact**: Email, phone, GitHub, and LinkedIn are in `index.html`; update if needed.
- **CV**: Replace `public/ArjanHayreCV.pdf` with your latest CV when you update it.

## Deploy

1. In the repo: **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
2. Push to `main`. The workflow builds `dist/`, uploads it as an artifact, and deploys via `actions/deploy-pages`. The site will be at **https://the-asgardian.github.io/ArjanHayre/**.
