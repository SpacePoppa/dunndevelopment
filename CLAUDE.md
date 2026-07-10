# Dunn Development Site — Claude Context

## What this project is
Marketing/portfolio site for Dunn Development, LLC — a South Florida commercial general contractor. Static Astro + Tailwind site. Standalone repo, extracted from the ItsAutomatic agency monorepo on 2026-07-09 and reconciled with its original GitHub history on 2026-07-10.

Full technical detail (stack, structure, pages, config) lives in `DEVELOPMENT.md` — read that for anything code-shaped. This file is for session context and conventions.

## Key facts
- GitHub remote: `origin` → `github.com/SpacePoppa/dunndevelopment`, branch `main`
- Demo hosting: S3 `dunndevelopment-demo` + CloudFront `E11G3J8JFTBI0D` (us-east-1) — live, not yet production
- Production domain `dunndevelopment.net` is not cut over — blocked on 4 items from the client (see `TODO.md`)
- Config single source of truth: `src/config/client.config.ts`
- Lead form backend does not exist — `config.crm.webhookUrl` is empty, forms submit nowhere

## Conventions
- Astro static output, no SSR adapter
- Tailwind v4 via `@tailwindcss/vite` — no `tailwind.config.js`, theme is CSS-based in `global.css`
- `pnpm.onlyBuiltDependencies` in `package.json` must include `esbuild`/`sharp` or image optimization breaks on install

## Deploy
```bash
pnpm run build
aws s3 sync dist/ s3://dunndevelopment-demo/ --delete
aws cloudfront create-invalidation --distribution-id E11G3J8JFTBI0D --paths "/*"
```
Full production cutover steps (ACM cert, DNS, CloudFront alias) are in `DEVELOPMENT.md` Section 6.

## Outstanding work
See `TODO.md` and `SESSIONS.md` for current state.

## Session tracking
At the end of any session with non-trivial changes (features, infra/deploy changes, decisions made, anything a future session would need to avoid re-deriving), update:
- `SESSIONS.md` — append a dated entry (`## YYYY-MM-DD — title`, with `### Done` / `### Decisions made` / `### Pending` / `### Next session start here`)
- `TODO.md` — check off completed items, add new ones, bump the `_Last updated_` date

Do this without being asked when the session warrants it. Small isolated fixes or pure Q&A don't need an entry.
