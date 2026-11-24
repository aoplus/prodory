# prodory.com

Website for Prodory, the cloud-native and platform engineering practice of AO Plus Solutions Pvt Ltd.

- **Site:** Astro 6, static output in `dist/`, deployed to GitHub Pages (custom domain `prodory.com`, see `public/CNAME`).
- **Forms:** every enquiry posts to the Worker in `worker/`, which creates a lead on crm.aoplus.in and syncs consented contacts to Mautic. See `worker/README.md`.
- **Content source:** `src/data/*.ts` (site facts, services, industries). Pages are in `src/pages/`.
- **Plan:** the redesign blueprint (dated 2026-11-24) is in the Prodory master prompt, not in this repo.

## Commands

```
npm ci
npm run dev       # local preview
npm run build     # static site into dist/
npm test          # enquiry Worker tests
```

Node 22.12 or newer is required (Astro 6). CI uses Node 22.

## Rules for content

- Only verified facts. No client logos, testimonials, savings percentages, partner badges or certifications until verified and approved.
- No prices on the site. Engagement scope is agreed in writing.
- Every production change goes through a reviewed pull request.

## Deployment

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`. Work is done on feature branches and merged through a pull request.
