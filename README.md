# mirika-web

The official website for **Mirika** — a local-first AI desktop ghost — served at **[mirika.dev](https://mirika.dev/)**.

Built with React 19 + Vite + TypeScript + Tailwind CSS 4 + Framer Motion.

> This repository holds the public website only. The Mirika desktop app itself is proprietary and lives in a separate private repository.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` auto-deploys to Cloudflare Pages (project `mirika`) via GitHub Actions — see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The workflow needs two repository secrets:

- `CLOUDFLARE_API_TOKEN` — a token with the **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID
