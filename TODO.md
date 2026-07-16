# Dunn Development Site — TODO List

_Last updated: 2026-07-10_

---

## Blocked on client

- [ ] Logo file — DD monogram SVG or PNG (seen in a screenshot only, never received as a file)
- [ ] Florida CGC license number (placeholder in `client.config.ts`)
- [ ] Louisiana contractor license number (placeholder in `client.config.ts`)
- [ ] CRM webhook URL — or ItsAutomatic builds the Lambda pipeline instead. **Possible shortcut**: `itsautomatic-lead-capture` + `itsautomatic-api` (existing multi-tenant Lambda/API Gateway pipeline, keyed by `clientId`) may already solve this — worth checking before building something new.
- [x] `dunndevelopment.net` DNS access — resolved, Patrick has GoDaddy access and is working with us directly

## Domain migration to AWS (in progress)

Full detail in `09 Project Tracker`'s correspondence/notes — summary here for this repo's context.

- [x] Route53 hosted zone created for `dunndevelopment.net` (`Z067564638LHBSV04K2NF`)
- [x] Full 36-record DNS inventory pulled from GoDaddy
- [x] Identified current live site is hosted on a Linode VPS (`45.79.44.192` / `66.228.53.90`), not GoDaddy's builder
- [x] Identified `time`/`dev.time` subdomains as a TimeTrax time-clock app being retired — drop from new zone, don't replicate
- [ ] Resolve a likely-misconfigured duplicate `_dmarc` record (waiting on Chris, the outgoing IT contact, to confirm intent)
- [ ] Confirm `dev` subdomain purpose (waiting on Chris)
- [ ] Confirm whether SES/Resend/Brevo email integrations are affected by the planned VPS shutdown (waiting on Chris)
- [x] Get `mike@dunndevelopment.net` M365 admin account — received 2026-07-13, not yet logged in. See `DNS-MIGRATION-CHECKLIST.md` for the first-login verification steps (MX/SPF/DKIM/autodiscover) before replicating anything into Route53
- [ ] Populate Route53 zone with verified M365 records + remaining non-M365 records (Teams/SIP, verification TXTs)
- [ ] Point `@` and `www` to CloudFront demo distribution via Route53 alias (only these two records actually change vs. the current GoDaddy setup)
- [ ] Request ACM cert in us-east-1 for `dunndevelopment.net` + `www.dunndevelopment.net`, validate via Route53
- [ ] Cut over nameservers at GoDaddy to Route53 (**only** once all records — M365 and website — are staged together; not before)
- [ ] Verify site + email + Teams/SIP + SES/Resend/Brevo all still work post-cutover
- [ ] Tell Chris once fully verified so he can shut down the VPS (he's explicitly waiting on our signal — not an independent deadline)
- [ ] Separately: domain registration transfer to Route53 Domains (decoupled from DNS hosting — nameservers stay on GoDaddy during this) — unlock in progress, EPP code not yet retrieved

## Production cutover (after domain migration above)

- [ ] Add cert ARN to CloudFront distribution `E11G3J8JFTBI0D`
- [ ] Wire `config.crm.webhookUrl` to the CRM/Lambda endpoint once it exists

## Lead form backend

- [ ] Build or connect a form backend (API Gateway + Lambda, matching the ItsAutomatic agency site pattern, or the client's existing CRM)
- [ ] Add reCAPTCHA v3 to both the contact form and the subcontractor form
- [ ] Add a honeypot field to both forms

## Site polish

- [ ] Add `@astrojs/sitemap` integration
- [ ] Add analytics (GA4 or Plausible)
- [ ] Verify `config.social.googleMaps` pin is accurate

---

## Notes
- Full context and technical detail: `DEVELOPMENT.md`
- Session log: `SESSIONS.md`
