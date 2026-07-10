# Dunn Development Site — Developer Handoff Document

> **Last updated:** July 2026
> **Contact:** Mr. Hickey (ItsAutomatic) · MrHickey@itsautomatic.co · (786) 383-3960
> **Client:** Dunn Development, LLC · info@dunndevelopment.net · (954) 589-6566
> **Intended domain:** dunndevelopment.net
> **Repository root:** `D:\Dunn\04 Website Build`

---

## 1. Project Overview

Dunn Development is a South Florida commercial general contractor (est. 2014, CGC-licensed in FL, licensed in LA). This repository is their marketing/portfolio site — a static Astro site, currently **standalone with no hosting or backend infrastructure provisioned yet**.

This project was extracted from the ItsAutomatic agency monorepo (`apps/client-dunn-development`) into its own repo on 2026-07-09 so it can be developed and deployed independently.

**Business goal of the site:** Showcase completed project portfolio to win commercial GC bids, and capture two types of leads: (1) potential clients via the contact form, (2) subcontractors via a dedicated intake form.

---

## 2. Current Status — Read This First

| Question | Answer |
|---|---|
| Is there a git repo? | **Yes.** Initialized 2026-07-09, standalone (not a submodule or subtree of ItsAutomatic). One commit so far. No remote configured yet — it exists only on this machine. |
| Is it deployed anywhere? | **No.** No AWS resources exist for this project — no S3 bucket, no CloudFront distribution, no domain routing. `dunndevelopment.net` in `site.config.ts` is aspirational, not live. |
| Does the lead form work? | **No.** `config.crm.webhookUrl` is empty, so both the contact form and the subcontractor form submit to `action="#"` — they do nothing. No backend, no reCAPTCHA, no honeypot. |
| Can I run it locally? | **Yes**, fully. `pnpm install && pnpm run dev`. Build has been verified working (`pnpm run build`, 9 pages, no errors). |

So: **code is in good shape, infrastructure is not started.** Sections 5–6 below cover what's needed to get from "builds locally" to "live on AWS."

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
| Hosting | **Not provisioned** | — |
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

## 6. Deploying to AWS — What Needs to Happen

Nothing is provisioned yet. The recommended path mirrors the pattern already proven on the ItsAutomatic agency site (static S3 + CloudFront, no server, no SSR) — same team, same tooling, same operational muscle memory. This is a recommendation, not something already decided; alternatives (Amplify Hosting, Vercel, Netlify) are viable too if you'd rather have git-push-to-deploy instead of manual/CLI syncs.

### 6a. One-time AWS setup (not yet done)

1. **Create an S3 bucket** for the built site (e.g. `dunndevelopment-site`), same region convention as ItsAutomatic (`us-east-1`).
2. **Create a CloudFront distribution** pointing at the bucket's static website endpoint, with a security headers policy (CSP, HSTS, X-Frame-Options) — can reuse/clone `itsautomatic-security-headers` as a starting template.
3. **Request/attach an ACM certificate** for `dunndevelopment.net` (must be in `us-east-1` for CloudFront) and point DNS (Route 53 or the client's registrar) at the CloudFront distribution.
4. **S3 bucket policy** — decide public-access approach. ItsAutomatic uses the S3 *website endpoint* with a partially relaxed public access block (documented in its own `CLAUDE.md`); an Origin Access Control (OAC) setup is the more locked-down alternative and is cleaner to start with fresh, since ItsAutomatic's OAC migration is still pending anyway.
5. **IAM credentials** for whoever deploys — scoped to `s3:PutObject`/`s3:DeleteObject` on this bucket and `cloudfront:CreateInvalidation` on this distribution only (least privilege — don't reuse the `its-automatic-deploy` user's broader scope for a different client's infra unless that's an intentional shared-ops decision).

### 6b. Deploy commands (once infra exists)

```bash
# 1. Build
pnpm run build

# 2. Sync to S3
aws s3 sync dist/ s3://<BUCKET_NAME>/ --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id <DISTRIBUTION_ID> \
  --paths "/*"
```

Fill in `<BUCKET_NAME>` and `<DISTRIBUTION_ID>` once 6a is done, and this document should be updated with the real values (see the "Infrastructure" table pattern in the ItsAutomatic `CLAUDE.md` for how that project tracks it).

### 6c. Before going live, also decide

- **Lead form backend** — needs the same shape as ItsAutomatic's: an API Gateway + Lambda (or equivalent) that `config.crm.webhookUrl` points to, plus reCAPTCHA v3 and a honeypot field (currently absent — see Section 7).
- **Email delivery** — if lead notifications should go out via SES, the domain (`dunndevelopment.net` or a subdomain) needs to be verified there, same as `itsautomatic.co` was.

---

## 7. Known Gaps

| Item | Status | Notes |
|---|---|---|
| Contact form backend | Not implemented | `config.crm.webhookUrl` is `""`; form `action` falls back to `"#"` — submits nowhere |
| Subcontractor form backend | Not implemented | Same issue — `subcontractor.astro` uses the same empty webhook URL |
| Spam protection | Not implemented | No reCAPTCHA, no honeypot field on either form |
| Hosting / DNS | Not provisioned | No S3 bucket, no CloudFront distribution, no domain routing — see Section 6 |
| Git remote | Not configured | Repo is local-only; no GitHub/GitLab remote set up yet |
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
4338894  feat: initial import of Dunn Development site from ItsAutomatic monorepo
```

Single root commit as of this document. No remote configured — push destination (GitHub org, etc.) is an open decision.
