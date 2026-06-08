# spec/evidence

This folder holds verification artifacts for the promotion calendar and other operational steps that need a record of truth outside the codebase.

## What lands here

- Screenshots that confirm a third-party setup step completed successfully.
- Screenshots of confirmation emails (with personal data cropped out).
- Short text notes that record a manual verification timestamp when a screenshot is not possible.

## Naming convention

Use lowercase, hyphen-separated names with the verification subject and the date:

- `pinterest-domain-verified-YYYY-MM-DD.png`
- `pinterest-board-list-YYYY-MM-DD.png` (future sessions)
- `vercel-analytics-receiving-data-YYYY-MM-DD.png` (future sessions)
- `resend-domain-verified-YYYY-MM-DD.png` (future sessions)

## What does not belong here

- Pin design drafts. Those live in the Canva folder named `MFSH Pins`, not in the repo.
- Source images for guide pages. Those live in `public/` or the relevant content folder.
- API keys, secrets, or credentials in any form.
- Full-page screenshots that include account email addresses or other identifying data in headers. Crop those out before saving.

## Why this folder exists

When a step in the promotion calendar says `verified` or `claimed`, there needs to be a single file that proves it later. This folder is that record. Do not delete files from here without first noting the removal in the relevant progress log.
