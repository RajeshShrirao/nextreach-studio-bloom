# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Founders and small-to-growing businesses evaluating a studio to move an existing business, idea, or workflow into a stronger digital product.

## Product Purpose

NextReach Studio is a founder-led digital studio that helps businesses move from where they are to what is next through websites, AI products and agents, mobile apps, automations, and digital experiences.

## Positioning

The studio combines creative direction with hands-on engineering and a direct founder-led working relationship. It is intentionally smaller and more personal than a corporate agency.

## Operating Context

Prospective clients discover the studio through its homepage, services, work, industry pages, and direct project conversations. The homepage must communicate the studio's range quickly without making visitors parse a long agency pitch.

## Capabilities and Constraints

- The site is an Astro 6 static site with React islands for interactive components.
- The homepage can use Three.js for a progressive-enhancement visual, but it must have a beautiful non-WebGL fallback.
- Interactive visuals should pause when off-screen or hidden, clean up on navigation, and avoid heavy post-processing.
- The core homepage message is supplied by the user; do not invent statistics, clients, or performance claims.

## Brand Commitments

- The name is NextReach Studio.
- The central idea is “Reach what’s next.”
- The voice is confident, technical, modern, ambitious, slightly playful, premium, understated, and founder-led.
- Avoid agency clichés, corporate jargon, excessive claims, and generic technology-marketing language.

## Evidence on Hand

- Existing homepage and service content in `src/pages/index.astro` and `src/pages/services/`.
- Existing brand fonts, mark, and design tokens in `src/styles/globals.css` and `public/brand/`.
- No new customer proof or metrics were supplied for this task.

## Product Principles

- Show the mechanism instead of over-explaining it.
- Keep the direct path between the founder and the client visible.
- Treat engineering quality and visual craft as one discipline.
- Make the next action clear without manufacturing urgency.

## Accessibility & Inclusion

- Preserve keyboard navigation and visible focus states.
- Keep interactive targets touch-friendly and avoid gesture-only actions.
- Respect `prefers-reduced-motion` with a static visual treatment and no continuous render loop.
- Keep the hero readable and operable at mobile widths without horizontal overflow.
