## 2026-07-09/10 — Extracted to standalone repo, reconciled with GitHub history, tracking set up

### Done
- Extracted this project out of the ItsAutomatic monorepo (`apps/client-dunn-development`) into its own standalone repo at `D:\Dunn\04 Website Build`
- New standalone `package.json` (renamed to `dunn-development-website`), own `.gitignore`, fresh scoped `pnpm-lock.yaml`, `pnpm.onlyBuiltDependencies` carried over for `esbuild`/`sharp`
- Discovered a live demo and GitHub repo already existed for this client from an April 2026 session (`github.com/SpacePoppa/dunndevelopment`, demo at `https://d49zcp76y7ew.cloudfront.net`, CloudFront `E11G3J8JFTBI0D`, S3 `dunndevelopment-demo`) — the monorepo copy and GitHub repo had diverged into untracked histories
- Reconciled: added GitHub as `origin`, fetched, diffed (confirmed nothing unique would be lost), merged with `--allow-unrelated-histories`, resolved one `package.json` conflict, pushed as a clean fast-forward
- Wrote `DEVELOPMENT.md` (technical handoff doc) and this session-tracking system (`CLAUDE.md`, `TODO.md`, `SESSIONS.md`), mirroring the setup used in the ItsAutomatic monorepo

### Decisions made
- This repo is standalone going forward — no dependency on or coupling to the ItsAutomatic monorepo
- `github.com/SpacePoppa/dunndevelopment` is the canonical remote
- The original `apps/client-dunn-development/` copy in the ItsAutomatic monorepo is being kept for now (user's call, not this repo's concern)

### Pending / watch list
- Production cutover blocked on 4 items from Dunn Development: logo file, FL CGC license number, LA license number, CRM webhook URL — plus DNS access
- No lead form backend, no reCAPTCHA, no honeypot — both forms currently submit nowhere

### Next session start here
Nothing to do until the client provides the outstanding items in `TODO.md`. If they arrive, start with the production cutover steps in `DEVELOPMENT.md` Section 6b.

---
