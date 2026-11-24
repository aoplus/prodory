# Enquiry Worker (prodory.com forms)

Receives every prodory.com enquiry and writes it to **crm.aoplus.in** as a CRM Lead (service interest "Cloud & DevOps", source "Website").
Contacts who ticked the marketing box are also synced to **Mautic**, tagged `Website Lead`, `service-<slug>`, `brand-prodory`, `consent-marketing`.
If the CRM write fails, the enquiry is kept in a D1 queue and the visitor still sees success.

## Run the tests

```
npm test
```

## One-time setup

1. Create the D1 database and the queue table:
   ```
   npx wrangler d1 create prodory-enquiry-queue
   npx wrangler d1 execute prodory-enquiry-queue --remote --command "CREATE TABLE IF NOT EXISTS pending_enquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, payload TEXT NOT NULL, mautic_only INTEGER NOT NULL DEFAULT 0);"
   ```
2. Put the returned `database_id` into `wrangler.toml` (replace `REPLACE_WITH_D1_DATABASE_ID`).
3. Set secrets (values come from `/home/aoplus/.env.shared`; never commit them):
   ```
   npx wrangler secret put CRM_AOPLUS_URL
   npx wrangler secret put CRM_AOPLUS_API_KEY
   npx wrangler secret put CRM_AOPLUS_API_SECRET
   npx wrangler secret put MAUTIC_URL
   npx wrangler secret put MAUTIC_USER
   npx wrangler secret put MAUTIC_PASSWORD
   ```
4. Deploy with dry run on (the default in `wrangler.toml`):
   ```
   npx wrangler deploy
   ```
5. Copy the Worker URL into the site: set `PUBLIC_ENQUIRY_URL` at build time to `https://<worker>/enquiry`
   (the default in `src/data/site.ts` is a placeholder until this is done).
6. Send one test enquiry from a staging page. Check the lead on crm.aoplus.in. Then set `CRM_DRY_RUN` and `MAUTIC_DRY_RUN` to `0` (in `wrangler.toml` or the dashboard).

## Go-live checklist

- [ ] Dry run tested, lead visible on crm.aoplus.in
- [ ] Mautic contact created and tagged correctly
- [ ] Mautic segments and campaigns built (not created by this code)
- [ ] Privacy notice signed off by counsel
- [ ] Retry queue replayed (see `src/handler.mjs` `makeReplay`) on a schedule, or manually
