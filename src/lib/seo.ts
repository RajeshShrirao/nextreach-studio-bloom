export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: OpenGraphData;
  twitter?: TwitterCardData;
  structuredData?: StructuredData;
  robots?: string;
  author?: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  url: string;
  type: "website" | "article" | "profile" | "business.business";
  siteName: string;
  locale?: string;
}

export interface TwitterCardData {
  card: "summary" | "summary_large_image" | "app" | "player";
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  site?: string;
  creator?: string;
}

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export const BUSINESS_INFO = {
  name: "NextReach Studio",
  description:
    "Docs-as-a-Service for indie SaaS founders. We write your core product documentation and ship a live searchable docs site in 5 days.",
  url: "https://nextreachstudio.com",
  logo: "https://nextreachstudio.com/nextreach-logo.jpg",
  email: "admin@nextreachstudio.com",
  phone: "+91-9876543210",
  address: {
    streetAddress: "Remote",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  },
  socialMedia: {
    twitter: "https://x.com/nextreachstudio",
  },
  services: [
    "Documentation writing",
    "Help center setup",
    "Docs site implementation",
    "Searchable knowledge base",
    "Docs migration",
  ],
} as const;

export const DEFAULT_SEO: SEOMetadata = {
  title: "NextReach Studio | Docs-as-a-Service for Indie SaaS",
  description:
    "Done-for-you help centers and docs sites for indie SaaS founders. Async intake, written content, searchable docs, and launch in 5 days.",
  keywords: [
    "docs as a service",
    "saas documentation service",
    "help center setup",
    "developer docs writer",
    "nextra docs setup",
    "fumadocs docs site",
    "indie saas documentation",
  ],
  canonical: BUSINESS_INFO.url,
  author: BUSINESS_INFO.name,
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "NextReach Studio | Docs-as-a-Service for Indie SaaS",
    description:
      "We write your core docs and ship a live searchable docs site in 5 days.",
    image: `${BUSINESS_INFO.url}/nextreach-logo.jpg`,
    imageAlt: "NextReach Studio docs service",
    url: BUSINESS_INFO.url,
    type: "website",
    siteName: BUSINESS_INFO.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextReach Studio | Docs-as-a-Service for Indie SaaS",
    description:
      "Async docs delivery for SaaS founders who keep postponing documentation.",
    image: `${BUSINESS_INFO.url}/nextreach-logo.jpg`,
    imageAlt: "NextReach Studio docs service",
    site: "@nextreachstudio",
    creator: "@nextreachstudio",
  },
};

export const PAGE_SEO: Record<string, Partial<SEOMetadata>> = {
  home: {
    title: "NextReach Studio | Done-for-You Docs Sites in 5 Days",
    description:
      "We take your product, write the docs, and deliver a live searchable docs site in 5 days. Built for indie SaaS founders. Fully async.",
    keywords: [
      "done for you docs",
      "help center service",
      "docs site setup",
      "indie hacker docs",
      "async documentation service",
    ],
    structuredData: createOrganizationSchema(),
  },
  about: {
    title: "About NextReach Studio | Async Docs Service for Indie SaaS",
    description:
      "Why NextReach Studio exists: indie SaaS founders ship fast, but docs lag. We fix that with an async docs sprint.",
    structuredData: createAboutPageSchema(),
  },
  pricing: {
    title: "Pricing | NextReach Studio Docs Sprints",
    description:
      "Fixed-scope docs packages for indie SaaS founders. Clear deliverables, async workflow, and launch in 5 days.",
    structuredData: createPricingSchema(),
  },
  contact: {
    title: "Start a Docs Sprint | NextReach Studio",
    description:
      "Send your product link and scope. NextReach Studio replies async within 24 hours with the right docs sprint.",
    structuredData: createContactSchema(),
  },
  privacy: {
    title: "Privacy Policy | NextReach Studio",
    description: "Privacy policy for NextReach Studio.",
    robots: "index, nofollow",
  },
  terms: {
    title: "Terms of Service | NextReach Studio",
    description: "Terms of service for NextReach Studio.",
    robots: "index, nofollow",
  },
};

export const generateSEOMetadata = (
  pageKey: keyof typeof PAGE_SEO,
  customMetadata?: Partial<SEOMetadata>
): SEOMetadata => {
  const pageDefaults = PAGE_SEO[pageKey] || {};

  return {
    ...DEFAULT_SEO,
    ...pageDefaults,
    ...customMetadata,
    openGraph: {
      ...DEFAULT_SEO.openGraph!,
      ...pageDefaults.openGraph,
      ...customMetadata?.openGraph,
    },
    twitter: {
      ...DEFAULT_SEO.twitter!,
      ...pageDefaults.twitter,
      ...customMetadata?.twitter,
    },
  };
};

function createOrganizationSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.phone,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.address,
    },
    sameAs: Object.values(BUSINESS_INFO.socialMedia),
    areaServed: "Worldwide",
    serviceType: BUSINESS_INFO.services,
  };
}

function createAboutPageSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About NextReach Studio",
    description: BUSINESS_INFO.description,
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
    },
  };
}

function createPricingSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Docs Sprint",
    provider: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
    },
    areaServed: "Worldwide",
    serviceType: BUSINESS_INFO.services,
  };
}

function createContactSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a Docs Sprint",
    description: "Contact NextReach Studio to start an async docs sprint.",
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      email: BUSINESS_INFO.email,
      telephone: BUSINESS_INFO.phone,
    },
  };
}
