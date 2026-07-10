# Dunn Development Site — Developer Handoff Document

> **Last updated:** 2026-07-10
> **Contact:** Mr. Hickey (ItsAutomatic) · MrHickey@itsautomatic.co · (786) 383-3960
> **Client:** Dunn Development, LLC · info@dunndevelopment.net · (954) 589-6566
> **Intended domain:** dunndevelopment.net
> **Repository root:** `D:\Dunn\04 Website Build`
> **GitHub remote:** https://github.com/SpacePoppa/dunndevelopment (branch `main`)

---

## 1. Project Overview

Dunn Development is a South Florida commercial general contractor (est. 2014, CGC-licensed in FL, licensed in LA). This repository is their marketing/portfolio site — a static Astro site.

Timeline: the site was originally built and pushed directly to `github.com/SpacePoppa/dunndevelopment` in April 2026 as a prospect demo, and deployed to a CloudFront distribution (Section 6). Separately, a copy of the same code lived inside the ItsAutomatic agency monorepo at `apps/client-dunn-development`. On 2026-07-09 that monorepo copy was extracted into this standalone repo, and on 2026-07-10 it was reconciled and merged with the original GitHub history — this repo and `SpacePoppa/dunndevelopment` are now the same history, kept in sync going forward.

**Business goal of the site:** Showcase completed project portfolio to win commercial GC bids, and capture two types of leads: (1) potential clients via the contact form, (2) subcontractors via a dedicated intake form.

---

## 2. Current Status — Read This First

| Question | Answer |
|---|---|
| Is there a git repo? | **Yes.** Local repo at `D:\Dunn\04 Website Build`, pushed to `github.com/SpacePoppa/dunndevelopment` (branch `main`), histories reconciled 2026-07-10. |
| Is it deployed anywhere? | **Yes — as a demo, not production.** Live at https://d49zcp76y7ew.cloudfront.net (CloudFront `E11G3J8JFTBI0D`, S3 bucket `dunndevelopment-demo`). The production domain `dunndevelopment.net` is not yet pointed at it — see Section 6. |
| Does the lead form work? | **No.** `config.crm.webhookUrl` is empty, so both the contact form and the subcontractor form submit to `action="#"` — they do nothing. No backend, no reCAPTCHA, no honeypot. |
| Can I run it locally? | **Yes**, fully. `pnpm install && pnpm run dev`. Build verified working (`pnpm run build`, 9 pages, no errors) both before and after the history merge. |

So: **a live demo already exists; production cutover is what's blocked.** Section 6 covers exactly what's needed and what's outstanding from the client.

---

## 3. Repository Structure

```
D:\Dunn\04 Website Build\          ← Standalone repo root (own package.json, own git)
├── src/
│   ├── config/
│   │   └── client.config.ts       ← SINGLE SOURCE OF TRUTH for all site content
│   ├── content/
│   │   └── news/                  ← Markdown articles (Astro content collection)
│   ├── content.config.ts          ← Content collection schema
│   ├── layouts/
│   │   └── Layout.astro           ← Global layout: head, nav, footer
│   ├── pages/
│   │   ├── index.astro            ← Homepage
│   │   ├── portfolio.astro        ← Portfolio slider/gallery page
│   │   ├── subcontractor.astro    ← Subcontractor intake form page
│   │   └── news/
│   │       ├── index.astro        ← News listing page
│   │       └── [slug].astro       ← Dynamic news article route
│   ├── portfolio/                 ← 62 project photos (WebP), imported by portfolio.astro
│   └── styles/
│       └── global.css             ← Tailwind v4 imports + base styles
├── public/
│   └── dunn-development.webp
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── .gitignore
```

No monorepo wrapper, no Turborepo, no shared packages — this project has zero dependency on the ItsAutomatic repo. See Section 8 for context docs also carried over (`SCOPE-phase1-draft.md`, `SPEC-developer-handoff.md`, etc.).

---

## 4. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | ^5.0.0 (installed: 5.18.2) |
| CSS | Tailwind CSS v4 | ^4.0.0 |
| Tailwind plugin | @tailwindcss/vite | ^4.0.0 |
| Typography plugin | @tailwindcss/typography | ^0.5.0 |
| Language | TypeScript | Astro built-in |
| Package manager | pnpm | 10.30.3 |
| Hosting (demo) | AWS S3 + CloudFront | `dunndevelopment-demo` / `E11G3J8JFTBI0D` |
| Hosting (production) | Not yet cut over | Domain `dunndevelopment.net` not attached |
| Form backend | **Not provisioned** | — |

**Important:** Tailwind v4 uses a Vite plugin — there is **no `tailwind.config.js`**. Configuration is CSS-based via `@theme` directives in `global.css`. Same convention as the ItsAutomatic agency site.

`package.json` includes a `"pnpm.onlyBuiltDependencies": ["esbuild", "sharp"]` entry — required for `pnpm install` to run `sharp`'s native build step, which Astro needs for image optimization. Without it, `pnpm install` will silently skip the build script and image processing may fail.

---

## 5. Local Development

```bash
# Prerequisites: Node.js 20+, pnpm 10+

cd "D:\Dunn\04 Website Build"

# Install dependencies
pnpm install

# Start dev server
pnpm run dev
# → http://localhost:4321 (default Astro port; check terminal output)

# Build for production
pnpm run build
# → output: dist/

# Preview the production build locally
pnpm run preview
```

---

## 6. Deploying to AWS — Demo Exists, Production Cutover Is What's Left

A demo deployment already exists (S3 `dunndevelopment-demo` + CloudFront `E11G3J8JFTBI0D`, us-east-1), same static S3 + CloudFront pattern as the ItsAutomatic agency site. Cutting over to production at `dunndevelopment.net` is blocked on items from the client, not on infrastructure work.

### 6a. Blocked on — collect from Dunn Development

- [ ] Logo file — DD monogram SVG or PNG (seen in a screenshot only, never received as a file)
- [ ] Florida CGC license number (for `client.config.ts` licenses block, currently a placeholder)
- [ ] Louisiana contractor license number (same)
- [ ] CRM webhook URL — or ItsAutomatic builds the Lambda pipeline instead (see Section 6c)
- [ ] `dunndevelopment.net` DNS access (Route 53 delegation or CNAME) for the production cutover

### 6b. Production cutover steps (once unblocked)

1. Request an ACM certificate in `us-east-1` for `dunndevelopment.net` + `www.dunndevelopment.net`
2. Add the cert ARN to CloudFront distribution `E11G3J8JFTBI0D` as an alternate domain
3. Add an A ALIAS (apex) + CNAME (`www`) in DNS pointing at the CloudFront distribution's domain
4. Wire `config.crm.webhookUrl` in `client.config.ts` to the CRM/Lambda endpoint once it exists

### 6c. Deploy commands (already usable against the demo bucket today)

```bash
# 1. Build
pnpm run build

# 2. Sync to S3
aws s3 sync dist/ s3://dunndevelopment-demo/ --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E11G3J8JFTBI0D \
  --paths "/*"
```

### 6d. Before going fully live, also decide

- **Lead form backend** — needs the same shape as ItsAutomatic's: an API Gateway + Lambda (or equivalent) that `config.crm.webhookUrl` points to, plus reCAPTCHA v3 and a honeypot field (currently absent — see Section 7). This is the same open question as the "CRM webhook URL" item in 6a — either the client provides an existing CRM endpoint, or ItsAutomatic builds one.
- **Email delivery** — if lead notifications should go out via SES, the domain (`dunndevelopment.net` or a subdomain) needs to be verified there, same as `itsautomatic.co` was.
- **IAM scope** — confirm whatever credentials deploy to `dunndevelopment-demo`/`E11G3J8JFTBI0D` are scoped to just this bucket/distribution, not broader account access, if that isn't already the case.

---

## 7. Known Gaps

| Item | Status | Notes |
|---|---|---|
| Contact form backend | Not implemented | `config.crm.webhookUrl` is `""`; form `action` falls back to `"#"` — submits nowhere |
| Subcontractor form backend | Not implemented | Same issue — `subcontractor.astro` uses the same empty webhook URL |
| Spam protection | Not implemented | No reCAPTCHA, no honeypot field on either form |
| Production DNS | Not cut over | Demo hosting exists (`E11G3J8JFTBI0D`); `dunndevelopment.net` isn't pointed at it yet — see Section 6 |
| Git remote | **Configured** | `origin` → `github.com/SpacePoppa/dunndevelopment`, branch `main`, reconciled 2026-07-10 |
| Sitemap | Not configured | No `@astrojs/sitemap` integration |
| Analytics | None | No GA4, Plausible, or other tracking installed |
| `config.social.googleMaps` | Present but unverified | Confirm the linked map pin is accurate before launch |

---

## 8. Reference Documents (carried over from monorepo)

These live at the repo root and predate the code — useful context on scope and positioning:

- `SCOPE-phase1-draft.md` — phase 1 scope draft
- `SPEC-developer-handoff.md` — original build spec
- `BRIEF-website-before-after.md` — before/after positioning brief
- `PITCH-ai-services.md` — AI/automation services pitch angle
- `SUMMARY-executive.md` — executive summary

---

## 9. Site Configuration — Single Source of Truth

**`src/config/client.config.ts`** controls all business data: contact info, licenses, stats, client logos, services (6), portfolio entries, automation-services pitch content, locations served, social links, and SEO defaults. Edit here, not in page files — `index.astro` and `subcontractor.astro` both consume this config directly.

---

## 10. Git History

```
75e46c1  merge: reconcile with existing SpacePoppa/dunndevelopment history
├── b93d820  feat: update transparency section headline to "Leading with Technology"
├── b61ab62  feat: agency site redesign, Dunn Development client site, lead scraper
├── a3a30d3  feat: scaffold Dunn Development client site
6f39103  docs: add developer handoff document (repo status, AWS deploy plan, known gaps)
4338894  feat: initial import of Dunn Development site from ItsAutomatic monorepo
```

Pushed to `origin/main` (`github.com/SpacePoppa/dunndevelopment`) 2026-07-10 as a clean fast-forward — no history was rewritten or force-pushed.
