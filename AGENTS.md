# TIC Clinic: information-only mode

Owner instruction 2026-09-09: company/licensing is pending. Keep lib/site-policy.json in information-only mode. No prices, discounts, promotions, giveaways, Lucky Spin, customer reviews, before/after, branded sales copy or booking invitations. Apply this to routes, metadata and directly accessible published assets. Never claim legal approval.

## Restoring features
Do so ONLY after explicit owner instruction. Original entrypoints are preserved in archive/routes/*.txt; home.txt maps to app/page.tsx and others to app/<name>/page.tsx. Use apply_patch to restore only the authorized pages. Components, catalog variants, cart, checkout and spin logic remain in source. Reconnect CartProvider in layout only when commerce is authorized. Do not blindly restore the old site: its testimonial quotes and medical/staff claims are unverified. No card collection or real charges until a payment provider is implemented and authorized. Gold weight MUST remain zero.

## Publication
Existing target is GitHub Pages tawandaeng007/TIC-test, docs folder. Run npm run build:pages and node --test tests/information-only.test.mjs. Preserve source assets; the build filters restricted assets out of generated docs. Legacy storefront rendered-html/pages-export tests describe the disabled site and are not acceptance tests for this mode.

## Editorial integrity
research/inventory-*.json lists reference URLs, not completed articles. Never claim every article was rewritten until its status is tracked and completed. Do not closely paraphrase another clinic's entire collection. Write original educational content using authoritative medical sources. No sales CTA in articles. Never invent reviews, doctor names, qualifications, parking, location, hours, official accounts or opening date. Require real information before publishing those fields.
