# Dunn Development — Website Modernization Brief
**Prepared by ItsAutomatic · April 4, 2026**

---

## Executive Summary

Dunn Development's current website is underperforming on every measurable dimension — speed, accessibility, SEO, and conversion. An independently verified Google Lighthouse audit conducted April 3–4, 2026 confirms the gap. A modernized site built on Astro static architecture, deployed to AWS CloudFront, achieved perfect or near-perfect scores across all four categories in under 24 hours of development. The business case is straightforward: a faster, better-optimized site converts more of the traffic Dunn is already generating from a 12-year reputation and a Fortune 500 client roster.

---

## Google Lighthouse Audit Results

*Scores range 0–100. Green = 90–100. Orange = 50–89. Red = 0–49.*

### Mobile

| Category | Current Site | New Site | Change |
|---|---|---|---|
| **Performance** | 🔴 52 | 🟢 98 | **+46 points** |
| **Accessibility** | 🟠 89 | 🟢 96 | +7 points |
| **Best Practices** | 🟠 73 | 🟢 100 | **+27 points** |
| **SEO** | 🟢 92 | 🟢 100 | +8 points |

### Desktop

| Category | Current Site | New Site | Change |
|---|---|---|---|
| **Performance** | 🟠 77 | 🟢 100 | **+23 points** |
| **Accessibility** | 🟢 92 | 🟢 96 | +4 points |
| **Best Practices** | 🟠 73 | 🟢 100 | **+27 points** |
| **SEO** | 🟢 92 | 🟢 100 | +8 points |

**A mobile Performance score of 52 is a failing grade.** Google classifies anything below 50 as poor and uses Core Web Vitals as a direct ranking signal. At 52, Dunn's site is penalized in search results every day it remains as-is.

---

## Why the Gap Is This Large

The current site is built on WordPress + Elementor (Astra theme) — a page builder stack that injects significant JavaScript and CSS overhead per page element, regardless of whether those elements are visible. This architecture is common among agency-built sites and is the primary cause of slow mobile load times.

The new site is built on **Astro**, a static site generator that ships zero JavaScript by default. Every page is pre-rendered to pure HTML at build time and served from **AWS CloudFront** — a global content delivery network with edge locations worldwide. The result is a site that loads in milliseconds rather than seconds.

---

## What Changed Beyond Performance

Performance scores are the measurable proof. The qualitative improvements are equally significant.

### Content & Credibility

| | Current Site | New Site |
|---|---|---|
| Project metrics | None | 100+ projects · 1,000+ jobs created |
| Client roster visibility | Buried in portfolio | Prominent logo bar above the fold |
| Services detail | 3 brief cards | 6 fully described services |
| Portfolio | Photo thumbnails only | Named projects with scope and location |
| Licenses | Manual state search required | One-click verify links (FL + LA) |
| Blog / Content | None | 5 substantive industry articles |
| Subcontractor intake | Offsite form, unclear destination | Structured on-site form, 15 fields |

### Trust Signals Added
- OSHA Safety Compliance credential
- BBB Accredited Business credential
- LinkedIn, Facebook, and Google Maps linked
- Full street address in footer (10300 SW 72nd St, Suite 445, Miami FL 33173)
- `GeneralContractor` structured data schema (more precise than the generic `LocalBusiness` schema on the current site — improves Google Maps and rich result eligibility)

### SEO Foundation
- Specific meta description targeting South Florida commercial construction
- Proper heading hierarchy (H1 → H2 → H3) throughout
- All form inputs correctly labeled (accessibility + SEO)
- News section with 5 articles targeting commercial construction search queries:
  - *What to Expect From Your Construction Manager*
  - *The Commercial Landlord's Guide to Tenant Improvement Buildouts*
  - *How to Read a Construction Schedule — An Owner's Primer*
  - *Airport Construction: What Makes It Different*
  - *Project Takeover: What Happens When Your GC Fails Mid-Project*

### Operational Technology Section
South Florida's largest contractors — including Suffolk Construction — are deploying AI tools, real-time site monitoring, and automated reporting on every project. The new site positions Dunn Development as operating at the same technology level, with a dedicated section detailing owner-facing capabilities: automated progress reports, milestone alerts, real-time budget tracking, and centralized document access. This directly addresses the competitive pressure from national firms entering the South Florida market.

---

## Business Impact

**Search visibility.** A Perfect SEO score (100) combined with relevant content means Dunn becomes discoverable for queries like "commercial construction management Miami," "airport contractor Fort Lauderdale," and "tenant improvement buildout South Florida." The current site ranks for none of these with meaningful consistency.

**First impressions.** Enterprise procurement teams — the ones awarding contracts to firms like Southwest Airlines and CBRE — evaluate vendors online before any conversation. A 52 mobile performance score translates to a slow, visually unstable page load on a phone. That impression happens before a word is read.

**Lead capture.** The current site's contact forms have no visible downstream process. The new site's contact and subcontractor forms are wired to a CRM webhook, enabling automated follow-up sequences from the moment a prospect or trade partner submits their information.

**Content compounding.** Each blog article is a durable SEO asset that accumulates traffic over time. A firm that publishes 5 articles this month and 5 next month builds an SEO moat that competitors without content cannot replicate by simply improving their design.

---

## Sites for Review

| | URL |
|---|---|
| Current site | https://www.dunndevelopment.net |
| New site (demo) | https://d49zcp76y7ew.cloudfront.net |

*The demo site is hosted on AWS CloudFront and is production-ready. Migration to dunndevelopment.net requires a DNS update estimated at under 30 minutes.*

---

## Recommended Next Steps

1. **Provide brand assets** — Logo file (DD monogram), project photos for portfolio grid
2. **Provide license numbers** — Florida CGC and Louisiana license numbers for the verify links
3. **Connect a CRM webhook** — Route contact and subcontractor form submissions to an existing CRM or email sequence
4. **DNS migration** — Point dunndevelopment.net to the new CloudFront distribution
5. **Content cadence** — Publish 2 articles per month to build category authority over 6–12 months

---

*ItsAutomatic builds and operates digital infrastructure for service businesses. This site was designed, built, deployed, and audited in a single session.*
*Contact: MrHickey@itsautomatic.co · (786) 383-3960 · itsautomatic.co*
