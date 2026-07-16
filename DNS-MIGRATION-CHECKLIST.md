# M365 / DNS Migration — Verification Checklist

Context: Route53 zone `Z067564638LHBSV04K2NF` exists but is inert — GoDaddy is still authoritative. This checklist is for the **first login** to the `mike@dunndevelopment.net` M365 admin account (just received, not yet used) and the reconciliation work that follows. See `TODO.md` → "Domain migration to AWS" and `SESSIONS.md` (2026-07-10) for full background.

**Read-only first pass.** Nothing here should touch GoDaddy DNS or Route53 yet — this is reconnaissance to build one canonical record list before anything is cut over.

---

## 1. Where to look in M365 Admin Center

- **Settings → Domains → dunndevelopment.net** — shows Microsoft's required DNS records (MX, SPF, two DKIM CNAMEs, autodiscover CNAME, and SIP/lyncdiscover records if Teams/Skype for Business is enabled on this domain).
- Confirm the domain shows **Verified**, not just added.
- **Exchange Admin Center → Protection → DKIM** — confirm whether DKIM signing is actually turned ON for this domain. If it's off, the DKIM CNAMEs may not matter yet — don't assume they're required just because M365 lists them.

## 2. Reconcile against the GoDaddy inventory (36 records, already pulled)

There's currently no saved static export of that 36-record inventory in this repo — only correspondence/notes. **First action: export the current GoDaddy zone to a file and save it here** (e.g. `dns-inventory-godaddy-2026-07.txt`) before changing anything. This is the rollback reference if anything goes wrong post-cutover.

Then compare record-by-record:

| Record | What to check |
|---|---|
| MX | Should point to `dunndevelopment-net.mail.protection.outlook.com` (typical M365 MX) — confirm GoDaddy matches |
| SPF (TXT @ root) | **Highest-risk item** — see callout below |
| DKIM (2x CNAME) | Only matters if DKIM signing is enabled (see step 1) |
| DMARC (_dmarc TXT) | Already flagged as a likely-duplicate/misconfigured record — needs Chris's confirmation of intended policy before replicating |
| autodiscover (CNAME) | Needed for Outlook auto-config — should point to `autodiscover.outlook.com` |
| SIP/lyncdiscover | Only relevant if Teams/Skype is used on this domain — confirm before assuming it's needed |

## 3. The SPF trap (read this before touching SPF)

A domain can only have **one** SPF TXT record. If SES, Resend, and/or Brevo were added to GoDaddy's DNS after the original M365 SPF record was set, they were likely merged into a single combined TXT (e.g. `v=spf1 include:spf.protection.outlook.com include:amazonses.com include:spf.resend.com ... ~all`) rather than as separate records — multiple SPF TXT records is invalid and can cause every sender to fail SPF.

**Action:** get the exact SPF fragment each of SES/Resend/Brevo requires from their own dashboards (they won't show in M365), and make sure the single Route53 SPF record includes M365 + all three (whichever are actually still in use — see open question below).

## 4. Open questions still waiting on Chris (outgoing IT contact)

These block finalizing the canonical record list — don't cut over without answers:
- `_dmarc` — which policy was actually intended (the current GoDaddy record looks like a misconfigured duplicate)
- `dev` subdomain — purpose, keep or drop
- Whether SES/Resend/Brevo are still active and tied to the VPS shutdown, or independent

## 5. Order of operations (don't skip ahead)

1. Log into M365 Admin Center — read-only, confirm domain status + required records (steps 1–2 above)
2. Export and save the current GoDaddy 36-record inventory to this repo
3. Get Chris's answers on `_dmarc`, `dev`, and SES/Resend/Brevo
4. Build one canonical record list (M365 + third-party senders + website `@`/`www` alias to CloudFront)
5. Populate the Route53 zone fully with the canonical list — GoDaddy is still authoritative, so this is zero-risk staging
6. Request the ACM cert (us-east-1) and validate via Route53
7. Lower TTLs at GoDaddy on records that will change, ahead of cutover, so DNS propagates fast if something needs rolling back
8. Cut nameservers at GoDaddy → Route53, during a low-traffic window, with Patrick's sign-off
9. Immediately verify: mail flow in/out, SPF/DKIM/DMARC pass (use a checker like MXToolbox), Teams/SIP if applicable, website + forms
10. Only after full verification, signal Chris to shut down the VPS — he's explicitly waiting on this signal, not a deadline

## Billing note

This DNS/domain migration work is pre-launch production cutover — it's part of the original one-time project scope (deployment), not the monthly managed IT support plan, even though monthly support billing starts today. Don't count these hours against the 2-hr monthly allotment.
