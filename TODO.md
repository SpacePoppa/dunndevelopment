# Dunn Development Site — TODO List

_Last updated: 2026-07-10_

---

## Blocked on client

- [ ] Logo file — DD monogram SVG or PNG (seen in a screenshot only, never received as a file)
- [ ] Florida CGC license number (placeholder in `client.config.ts`)
- [ ] Louisiana contractor license number (placeholder in `client.config.ts`)
- [ ] CRM webhook URL — or ItsAutomatic builds the Lambda pipeline instead
- [ ] `dunndevelopment.net` DNS access (Route 53 delegation or CNAME)

## Production cutover (blocked on items above)

- [ ] Request ACM cert in us-east-1 for `dunndevelopment.net` + `www.dunndevelopment.net`
- [ ] Add cert ARN to CloudFront distribution `E11G3J8JFTBI0D`
- [ ] Add A ALIAS + www CNAME in DNS → CloudFront domain
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
