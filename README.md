# mirika-web

The official website for **Mirika** — a local-first AI desktop ghost — served at **[mirika.dev](https://mirika.dev/)**.

Built with React 19 + Vite + TypeScript + Tailwind CSS 4 + Motion.

> This repository holds the public website only. The Mirika desktop app itself is proprietary and lives in a separate private repository.

## Develop

```bash
pnpm install
pnpm dev         # local dev server
pnpm typecheck   # vite build does not type-check; this does
pnpm test        # the Pages Function behind the download list
pnpm build       # production build to dist/
pnpm preview     # preview the production build
```

The package manager is pnpm (pinned in `package.json`); there is one lockfile, `pnpm-lock.yaml`.

## Keeping the docs true

The usage docs (`src/components/docs-body-*.tsx`, five languages) and the command list
(`src/components/docs-commands.ts`) describe the newest build, previews included. A feature that
has not reached a stable release yet carries a small version mark (`<Since v="0.6.9" />`, or
`since` on a command).

After each app release, the app repository's `scripts/site-commands-check.mjs` compares its command
table with `docs-commands.ts` and reports commands or arguments missing here. The Discord bot
answers how-to questions from these docs, so its index is refreshed after a docs change — in the bot
repository, `node scripts/index-docs.mjs`, then `node scripts/docs-recall-check.mjs` to see that
how-to questions really find their section.

Both tools *run* `docs-commands.ts` as a module, and the bot's indexer also calls `DocsBodyJa` from
`docs-body-ja.tsx` and walks the tree it returns. Keep those two files free of hooks and
browser-only code, and keep an `id` on every `<H2>`.

## Deploy

Pushing to `main` auto-deploys to Cloudflare Pages (project `mirika`) via GitHub Actions — see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The workflow needs two repository secrets:

- `CLOUDFLARE_API_TOKEN` — a token with the **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID
