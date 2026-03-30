# NextReach Studio — Design System

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** NextReach Studio
**Generated:** 2026-03-30
**Category:** Premium Dark SaaS (Pet Grooming AI)

---

## Golden Ratio Typography Scale (φ = 1.618)

| Role | Size | Weight | Line-height | Letter-spacing |
|------|------|--------|-------------|----------------|
| Display (H1 hero) | 55px | 700 | 1.1 | -0.02em |
| H1 | 34px | 700 | 1.15 | -0.015em |
| H2 | 21px | 600 | 1.2 | -0.01em |
| H3 | 16px | 600 | 1.3 | -0.005em |
| Body Large | 18px | 400 | 1.6 | 0 |
| Body | 16px | 400 | 1.5 | 0 |
| Body Small | 13px | 400 | 1.4 | 0.01em |
| Caption | 11px | 500 | 1.3 | 0.04em |

---

## Spacing System (Golden Ratio: 4/8/13/21/34/55/89px)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Icon gaps, tight inline |
| `--space-2` | 8px | Inline gaps, small padding |
| `--space-3` | 13px | Component padding, list gaps |
| `--space-4` | 21px | Card padding, section gaps |
| `--space-5` | 34px | Section padding, large gaps |
| `--space-6` | 55px | Major section spacing |
| `--space-7` | 89px | Page section rhythm (hero) |

---

## Color System (Dark Theme)

### Semantic Tokens
```
--color-bg-base:       #050505
--color-bg-elevated:   #0a0a0a
--color-bg-surface:    rgba(255,255,255,0.03)
--color-bg-overlay:    rgba(255,255,255,0.06)

--color-text-primary:   #FFFFFF
--color-text-secondary:  #A1A1AA (zinc-400)
--color-text-tertiary:  #71717A (zinc-500)
--color-text-disabled:  #52525B (zinc-600)

--color-accent:         #FBBF24 (amber-400)
--color-accent-hover:   #F59E0B (amber-500)
--color-accent-subtle:  rgba(251,191,36,0.08)
--color-accent-glow:   rgba(251,191,36,0.15)

--color-success:        #34D399 (emerald-400)
--color-success-subtle: rgba(52,211,153,0.1)
--color-danger:         #F87171 (red-400)

--color-border-subtle:  rgba(255,255,255,0.06)
--color-border-default: rgba(255,255,255,0.1)
--color-border-strong:  rgba(255,255,255,0.15)
```

### Glass Surface System
```
--glass-bg:        linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)
--glass-border:    1px solid rgba(255,255,255,0.08)
--glass-shadow:    0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02) inset
--glass-blur:      blur(20px) saturate(180%)
```

---

## Apple Design Principles

1. **Hierarchy First** — Visual hierarchy via size/weight/spacing, not color alone
2. **Clarity** — Every element has one clear purpose
3. **Depth** — Layered surfaces with purposeful blur and shadow
4. **Motion with Meaning** — Every animation = cause-effect (150-300ms)
5. **Touch Targets** — Minimum 44×44px for all interactive elements
6. **Accessibility** — 4.5:1 contrast; keyboard nav; reduced-motion respected

---

## Typography

### Font Stack
- Primary: `Inter` (variable, 300-700 weights) via next/font/google
- Fallback: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Scale
```
--text-caption:   11px / 1.3 / 500 / 0.04em  (uppercase labels)
--text-small:     13px / 1.4 / 400 / 0.01em
--text-body:      16px / 1.5 / 400 / 0
--text-body-lg:   18px / 1.6 / 400 / 0
--text-h3:        16px / 1.3 / 600 / -0.005em
--text-h2:        21px / 1.2 / 600 / -0.01em
--text-h1:        34px / 1.15 / 700 / -0.015em
--text-display:   55px / 1.1 / 700 / -0.02em  (hero)
```

---

## Component Patterns

### Glass Panel
```css
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: 16px;
}
```

### Primary Button (Apple-style)
- Height: 48px (min 44px touch target)
- Padding: 16px 28px
- Border radius: 12px
- Font: 15px / 600
- States: default → hover (shadow lift, scale 1.01) → active (scale 0.97) → disabled (opacity 0.4)
- Transition: 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Card (Apple-style)
- Border radius: 20px
- Inner highlight: inset 0 1px 0 rgba(255,255,255,0.05)
- Hover: translateY(-3px) + shadow increase + border brightening
- Transition: 250ms cubic-bezier(0.34, 1.56, 0.64, 1) (spring)

### Typography Hierarchy
- Section label: caption style, uppercase, tracking 0.08em, zinc-500
- Section heading: H2, white, tracking -0.01em
- Body: zinc-400, line-height 1.6
- No text under 13px for readable content

---

## Animation Specifications

### Micro-interactions (150-300ms)
- Button press: scale(0.97) → scale(1) over 200ms spring
- Card hover lift: translateY(-3px) over 250ms spring
- Icon rotation: 45° over 200ms ease-out
- Opacity fade: 0→1 over 200ms ease-out

### Entrance Animations
- Section entrance: translateY(21px) opacity(0) → resting, 400ms ease-out
- Card stagger: each card delays by index × 80ms

### Physics
- Spring easing: cubic-bezier(0.34, 1.56, 0.64, 1) (light overshoot)
- Smooth easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) (Apple standard)
- Exit faster than enter: exit = 60% of enter duration

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| mobile-sm | 375px | Small phones |
| mobile | 428px | Regular phones |
| tablet | 768px | Tablets |
| desktop | 1024px | Laptops |
| desktop-lg | 1280px | Desktops |
| desktop-xl | 1440px | Large desktops |

### Mobile-First Rules
- Base: mobile (375-428px) — single column, 16px horizontal padding
- tablet (768px+): 2-column grids, 24px padding
- desktop (1024px+): 3+ columns, max-w-6xl centered, 32px padding

---

## Layout Rhythm

- Section padding: 89px top/bottom (desktop), 55px (tablet), 34px (mobile)
- Component gap: 21px between sibling elements
- Card inner padding: 21px
- Max text width: 672px (max-w-2xl) for readability

---

## Accessibility Requirements

1. **Contrast**: Primary text on dark bg ≥ 4.5:1 (zinc-300 on #050505 = ~7:1 ✓)
2. **Focus rings**: 2px amber outline, 2px offset on all interactive elements
3. **Touch targets**: All interactive elements ≥ 44×44px
4. **Motion**: prefers-reduced-motion respected
5. **Labels**: All icon-only buttons have aria-label
6. **Semantic HTML**: Proper heading hierarchy (h1→h2→h3)
7. **Color not sole indicator**: Icons + text accompany color meaning

---

## Anti-Patterns (Avoid)

1. **No emoji** — Use Lucide SVG icons exclusively
2. **No raw hex** — Always use CSS custom properties / Tailwind semantic tokens
3. **No 0ms transitions** — Every state change needs 150-300ms
4. **No fixed heights** — Let content dictate height
5. **No horizontal scroll** — Content must never overflow viewport horizontally
6. **No hover-only interactions** — Primary actions work on tap/click
7. **No motion on reduced-motion** — Respect prefers-reduced-motion
8. **No border-radius mixing** — 16px cards OR 9999px pills, not both arbitrarily
