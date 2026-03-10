# Page Dependency Trees

## `/`
Entry: `src/pages/Index.tsx`

Dependencies:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/label.tsx`
- `src/components/ContactForm.tsx`
  - `src/services/emailService.ts`
- `src/components/SEO.tsx`
  - `src/lib/seo.ts`
- `src/components/MobileNavigation.tsx`
  - `src/components/ui/button.tsx`
- `src/components/Footer.tsx`
- `src/lib/motion.ts`
- `src/lib/utils.ts`
- `src/index.css`
- `tailwind.config.ts`

## `/about`
Entry: `src/pages/About.tsx`

Dependencies:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/SEO.tsx`
- `src/components/MobileNavigation.tsx`
- `src/components/Footer.tsx`

## `/pricing`
Entry: `src/pages/Pricing.tsx`

Dependencies:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/SEO.tsx`
- `src/components/MobileNavigation.tsx`
- `src/components/Footer.tsx`

## `/contact`
Entry: `src/pages/Contact.tsx`

Dependencies:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ContactForm.tsx`
- `src/components/SEO.tsx`
- `src/components/MobileNavigation.tsx`
- `src/components/Footer.tsx`
