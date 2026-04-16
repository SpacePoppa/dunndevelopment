# Dunn Development — Developer Handoff Spec
**Prepared by ItsAutomatic · April 5, 2026**

---

## Project Overview

Demo site built for Dunn Development, LLC as a prospect deliverable. Production-ready. Pending client asset delivery and DNS cutover before going live at dunndevelopment.net.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5.x (static output, zero JS by default) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` plugin |
| Typography | `@tailwindcss/typography` for news article prose |
| Language | TypeScript (config), HTML/Astro templates |
| Content | Astro Content Collections (`src/content/news/*.md`) |
| Images | Vite asset pipeline via `import.meta.glob` (hashed filenames, cache-safe) |
| Build output | Static HTML + assets in `dist/` |
| Package manager | pnpm (monorepo workspace under `d:/ItsAutomatic/`) |

---

## Hosting & Infrastructure

| Component | Service | Detail |
|---|---|---|
| CDN / HTTPS | AWS CloudFront | Distribution ID: `E11G3J8JFTBI0D` |
| Demo URL | https://d49zcp76y7ew.cloudfront.net | Production-ready, HTTPS |
| Origin | AWS S3 | Bucket: `dunndevelopment-demo` (us-east-1) |
| S3 mode | Static website endpoint | HTTP origin → CloudFront redirects to HTTPS |
| Cache policy | CachingOptimized | Standard CloudFront managed policy |
| Price class | PriceClass_100 | US + Europe edge locations |
| Source repo | https://github.com/SpacePoppa/dunndevelopment | Standalone repo via git subtree |

---

## Repo Structure

```
apps/client-dunn-development/
├── src/
│   ├── config/
│   │   └── client.config.ts      # Single source of truth — all business data
│   ├── layouts/
│   │   └── Layout.astro          # Nav, footer, JSON-LD schema, cookie consent
│   ├── pages/
│   │   ├── index.astro           # Homepage (8 sections)
│   │   ├── portfolio.astro       # Full-screen image slider portfolio
│   │   ├── subcontractor.astro   # Trade partner intake form (15 fields)
│   │   └── news/
│   │       ├── index.astro       # News index
│   │       └── [slug].astro      # Dynamic article pages
│   ├── content/
│   │   ├── news/                 # 5 markdown articles
│   │   └── content.config.ts     # Collection schema
│   ├── portfolio/                # 62 webp images (5 categories)
│   └── styles/
│       └── global.css            # Tailwind import + scroll-behavior
├── public/
│   └── dunn-development.webp     # Hero background image
├── astro.config.mjs
└── package.json
```

---

## Key Configuration File

All business data lives in one file: `src/config/client.config.ts`

Items controlled from config (no template edits required):
- Business name, phone, email, address
- Florida + Louisiana license numbers and verify URLs
- Stats (100+, 1,000+, 12+, 2)
- Client roster (15 clients)
- 6 services with descriptions
- 6 portfolio entries
- 6 automation/transparency service descriptions
- CRM webhook URL (currently empty — needs client input)
- Social links (LinkedIn, Facebook, Google Maps)
- SEO title and meta description

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `index.astro` | Homepage: hero, stats, services, portfolio preview, client logos, transparency, why Dunn, subcontractors, licenses, contact form |
| `/portfolio` | `portfolio.astro` | Full-screen sliders: 5 categories, 62 images, thumbnail strip, keyboard nav |
| `/subcontractor` | `subcontractor.astro` | Trade partner application: 15 fields, 3 fieldset sections |
| `/news` | `news/index.astro` | Article index, sorted by publish date |
| `/news/[slug]` | `news/[slug].astro` | Individual articles (5 published) |

---

## Portfolio Image Categories

Images live in `src/portfolio/` and are categorized by filename prefix at build time. To add images: drop a `.webp` in `src/portfolio/` with the appropriate prefix and rebuild.

| Prefix | Category | Count |
|---|---|---|
| `airport-` | Airport | 11 |
| `commercial-` | Commercial & Office | 14 |
| `biomedical-` + `industrial-` | Industrial / Biomedical | 14 |
| `luxury-` | Luxury Homes | 10 |
| `civil-` | Civil & Municipal | 13 |

---

## SEO & Structured Data

- `GeneralContractor` JSON-LD schema in `<head>` on every page (more precise than `LocalBusiness` for Google Maps and rich results)
- Meta description targeting South Florida commercial construction
- Proper H1 → H2 → H3 heading hierarchy throughout
- All form inputs have associated `<label for="">` and `id` attributes (WCAG AA compliant)
- News articles accumulate as long-term SEO assets

---

## Google Lighthouse Scores (April 3–4, 2026)

| Category | Mobile | Desktop |
|---|---|---|
| Performance | 98 | 100 |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

---

## Pending Before Production Go-Live

1. **Logo file** — DD monogram (gray/red) for nav and footer (currently using styled text)
2. **FL CGC license number** — to complete the Florida verify link in config
3. **LA license number** — to complete the Louisiana verify link in config
4. **CRM webhook URL** — `config.crm.webhookUrl` (routes contact + subcontractor form submissions)
5. **DNS cutover** — Point `dunndevelopment.net` A/CNAME to CloudFront distribution `d49zcp76y7ew.cloudfront.net` (~30 min)
6. **SSL cert** — Request ACM certificate for `dunndevelopment.net` in us-east-1, attach to CloudFront distribution

---

## Deploy Commands

```bash
# From apps/client-dunn-development/
pnpm build                        # Outputs to dist/

# Sync to S3
aws s3 sync dist/ s3://dunndevelopment-demo --delete --region us-east-1

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E11G3J8JFTBI0D \
  --paths "/*"
```

On Windows/Git Bash, prefix aws commands with `MSYS_NO_PATHCONV=1`.

---

## Local Development

```bash
cd apps/client-dunn-development
pnpm dev        # Dev server at http://localhost:4321
pnpm build      # Production build
pnpm preview    # Preview production build locally
```

---

*Built by ItsAutomatic · MrHickey@itsautomatic.co · (786) 383-3960 · itsautomatic.co*
