> **Frozen 2026-07-16** — new session entries go to the engagement-wide log at `D:\Dunn\SESSIONS.md`. Entries below are the historical record for this repo.

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

## 2026-07-10 — Project tracker tool built; production domain migration to AWS kicked off

### Done
- Built `D:\Dunn\09 Project Tracker`, a standalone shared project-tracker tool for the whole engagement (separate AWS stack: S3 + CloudFront + Lambda@Edge Basic Auth + API Gateway/Lambda for shared live state). Full detail in its own `DEVELOPMENT.md`.
- Kicked off the production domain migration for `dunndevelopment.net`:
  - Confirmed DNS access is available — Patrick Dunn (client contact) has GoDaddy access and is working with us directly
  - Created a Route53 hosted zone (`Z067564638LHBSV04K2NF`) — inert so far, GoDaddy still authoritative
  - Pulled the full 36-record DNS inventory from GoDaddy
  - Discovered the current live site is hosted on a Linode VPS (`45.79.44.192` apex, `66.228.53.90` for a `dev` subdomain), not GoDaddy's own builder — this is what production cutover actually replaces
  - Identified `time`/`dev.time` subdomains as a TimeTrax time-clock app that's being retired (backup already delivered via OneDrive) — these get dropped, not migrated
  - Found a likely-misconfigured duplicate `_dmarc` TXT record (a misnamed one that's never actually been live) — pending Chris's confirmation of intent
  - Corresponded with Chris Hewitt (outgoing IT contact) via email and text: TimeTrax backup received; confirmed the VPS shutdown is gated on **our** go-ahead, not an independent deadline; got his (sound) recommendation to verify all M365-related DNS records (MX/SPF/DKIM/autodiscover/Teams) against M365 Admin Center before replicating them, rather than trusting the current GoDaddy config as-is
  - Requested `mike@dunndevelopment.net` M365 admin account from Chris — not yet received
  - Started the domain **registration** transfer to Route 53 Domains separately (decoupled from DNS hosting) — domain unlock in progress at GoDaddy, EPP/auth code not yet retrieved

### Decisions made
- Domain registration transfer and DNS hosting migration are sequenced independently: the registrar transfer can proceed now since it doesn't touch nameservers (GoDaddy stays authoritative during the transfer), but the actual DNS cutover (nameserver flip) will only happen once the Route53 zone has **all** records staged — M365 records included, not just the website A/AAAA — to avoid an email/Teams outage gap
- Will not replicate M365-specific DNS records from GoDaddy blindly — will verify each one against M365 Admin Center first, per Chris's recommendation, given the DMARC record we already found was drifted/misconfigured
- Will not tell Chris "everything's transferred" (his signal to shut down the VPS) until the cutover is fully propagated and verified working — asked him to clarify whether that phrase means the DNS cutover, the registrar transfer, or both

### Pending / watch list
- Waiting on Chris for: `dev` subdomain purpose, whether SES/Resend/Brevo are included in the VPS/services shutdown, which `_dmarc` policy was intended, and the `mike@dunndevelopment.net` M365 admin account
- Once Chris departs, the GoDaddy account's contact phone/email (currently still his, per him receiving verification codes) needs to be updated away from him — flagged, not yet done
- Domain registration transfer not yet started on the AWS side (no EPP code in hand yet)

### Next session start here
Once the M365 admin account arrives: cross-check M365-required DNS records via Admin Center against the GoDaddy inventory, populate the rest of the Route53 zone (M365 records + `@`/`www` aliased to the CloudFront demo distribution), request the ACM cert, and only then coordinate the nameserver cutover with an explicit go-ahead to Chris. Domain registration transfer can proceed independently once the EPP code is retrieved from GoDaddy.

---
