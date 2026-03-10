# Routes

Framework: React + Vite + React Router
Component library: shadcn/ui + Radix primitives + Tailwind CSS

## Router Config

`src/App.tsx`

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeMotionConfig } from "@/lib/motion-config";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import AIAgents from "./pages/AIAgents";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
```

## Route Map

- `/` -> `src/pages/Index.tsx`
- `/about` -> `src/pages/About.tsx`
- `/pricing` -> `src/pages/Pricing.tsx`
- `/ai-agents` -> `src/pages/AIAgents.tsx`
- `/contact` -> `src/pages/Contact.tsx`
- `/privacy` -> `src/pages/PrivacyPolicy.tsx`
- `/terms` -> `src/pages/Terms.tsx`
- `/admin-nextreach-studio-2024` -> `src/pages/AdminDashboard.tsx`

## Key Page Summary

- `/`: hero-led marketing homepage with service overview, portfolio, and contact CTA
- `/about`: company story and values page
- `/pricing`: multi-tier pricing page
- `/contact`: contact details plus lead form
