# Blackbox Rescue Implementation Plan

## Goal
Transform this app from a docs-service marketing site into a high-converting sales site for the `Blackbox Rescue` offer: a 100% async, $79 flat-fee, 24-hour code rescue for AI-built MVPs that are stuck on deployment, auth, or payment blockers.

## Positioning
- Public brand: `Blackbox Rescue`
- Parent/studio name: only use `NextReach Studio` if it is legally required, and keep it out of the marketing UI
- Audience: first-time, non-technical solo founders shipping AI-built MVPs with broken production behavior
- Core promise: one critical blocker fixed, a clean PR returned, and a short Loom post-mortem delivered within 24 hours

## Non-Negotiables
- Remove every docs-service reference from the public site
- Remove every “help center”, “docs sprint”, “docs-as-a-service”, and demo-docs framing
- Remove the current product story about writing or shipping documentation
- Replace the current design language with a darker, more premium, forensic sales aesthetic
- Keep the site aggressively focused on one offer, one buyer, and one CTA

## New Site Structure
- Home page becomes the main sales landing page
- Contact/intake becomes the only primary conversion page
- Legal pages stay, but all copy must be rebranded to the new offer
- Remove or repurpose any pages that do not directly support selling the rescue offer

## Required Content Blocks
- Hero section with the production-wall headline, the $79 flat fee, and one primary CTA
- Problem section focused on Vercel 500s, Supabase auth loops, Stripe webhooks, env vars, CORS, and broken deploys
- Offer section that explains exactly what is included: surgical fix, clean PR, Loom post-mortem
- How-it-works section with the 3-step async flow: checkout, intake form, fix delivery
- Comparison section against agencies, freelancers, ChatGPT/Cursor, and DIY tutorial hell
- Trust section with proof points, guarantees, and risk reversal
- FAQ section that handles scope, stack support, security, and refund expectations
- Final CTA section with urgency and a direct path to purchase or submit the intake

## Visual Direction
- Use a dark, high-contrast palette with one sharp accent color
- Make the interface feel precise, quiet, and expensive
- Avoid playful docs-tool visuals, card-grid blog styling, and generic SaaS gradients
- Replace the current logo treatment with one that matches the new brand
- Use stronger hierarchy, tighter copy, and fewer decorative elements

## Files to Replace or Retire
- Rework `src/App.tsx` to remove old routes that do not sell the offer
- Rewrite `src/pages/Index.tsx` into the new sales landing page
- Replace `src/pages/About.tsx` with either a founder/proof page or remove it entirely
- Replace `src/pages/Pricing.tsx` with the actual $79 offer page or remove it if the home page already carries pricing
- Rewrite `src/pages/Contact.tsx` into the intake flow for repo URL, live URL, and error message
- Rewrite `src/components/SiteHeader.tsx` so navigation matches the sales site, not the docs site
- Rewrite `src/components/Footer.tsx` to match the new brand and remove docs language
- Rewrite `src/components/MobileNavigation.tsx` to mirror the new route structure
- Rewrite `src/components/SEO.tsx` and `src/lib/seo.ts` so titles, descriptions, OG tags, and schema match `Blackbox Rescue`
- Remove or heavily refactor `src/pages/DemoDocs.tsx`
- Remove `src/data/docs.ts` and any docs-demo-specific content if it is no longer used
- Review `content/docs/**` and delete it if the docs demo is no longer part of the sales story
- Replace any image, favicon, or logo asset that still says `NextReach Studio` or suggests a docs product

## Copy Rewrite Rules
- Lead with the painful truth, not the studio identity
- Use short, concrete sentences that sound like a calm expert
- Emphasize the outcome, the time-to-fix, and the low-friction process
- Never use “docs”, “help center”, or “knowledge base” unless the page is explicitly legal or internal
- Never talk about building documentation tooling, templates, or content strategy
- Keep the copy specific to AI-built MVPs and production blockers

## Technical Changes
- Update all route-level metadata, canonical URLs, and structured data to the new brand
- Ensure the sitemap and robots files only expose pages that matter for the new offer
- Replace any placeholder email, phone, WhatsApp, or social links with the real sales contact points
- Remove dead routes and redirects that point to old docs paths
- Check that the service worker, manifest, and PWA metadata do not expose the old brand
- Verify the build has no imports from retired docs-demo files

## Migration Order
- Inventory every public-facing string and asset that mentions the current docs brand
- Replace the homepage first so the primary sales surface is correct
- Update navigation, footer, and mobile menu next so the rest of the site matches
- Rework contact/intake flow so the CTA actually captures the buyer’s blocker
- Clean up SEO, legal, social, and metadata after the visible UI is correct
- Delete unused demo/docs code only after nothing imports it anymore

## Acceptance Criteria
- The public site reads as `Blackbox Rescue`, not a docs agency
- The homepage sells one offer, one price, and one outcome
- There are no public references to docs sprints, docs-as-a-service, or help-center packages
- The app has no leftover demo-docs UX, demo routes, or docs content in the public flow
- Meta tags, page titles, social previews, and structured data all match the new brand
- Mobile and desktop both present the new offer cleanly
- The site contains a single, obvious conversion path with no confusing alternates

## Done When
- [ ] The marketing site is fully rebranded to `Blackbox Rescue`
- [ ] Every old docs-service page or reference is removed, rewritten, or hidden
- [ ] The landing page clearly sells the $79 async rescue offer
- [ ] The intake/contact flow matches the promised buyer journey
- [ ] A repo-wide search for old brand terms returns only intentional legal/internal references
- [ ] The site builds cleanly and the public routes all support the new offer

## Final QA Checklist
- Search for `docs`, `help center`, `docs sprint`, `docs-as-a-service`, and `NextReach Studio`
- Confirm no stale demo route is linked from navigation or footer
- Confirm homepage CTA, intake form, and FAQ all reinforce the same offer
- Confirm OG image, title, description, favicon, and schema are all brand-consistent
- Confirm legal pages do not accidentally keep the old positioning language
