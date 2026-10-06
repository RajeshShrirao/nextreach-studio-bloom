export const WHATSAPP_NUMBER = "919822379976";
export const FORM_ENDPOINT = "https://formspree.io/f/xbldeqzw";

export const websitePackages = [
  {
    id: "quick-launch",
    name: "Quick Launch",
    price: 5000,
    priceLabel: "₹5,000",
    originalPriceLabel: "₹12,000",
    deliveryTime: "1–2 days",
    badge: "Fastest route live",
    tagline: "One focused page that gives your business a credible home and a clear next action.",
    idealFor: "Freelancers, consultants, solo professionals and single-service businesses",
    features: [
      "Custom one-page website",
      "Mobile-first layout and speed foundations",
      "WhatsApp and click-to-call buttons",
      "Lead capture section",
      "Domain connection and launch handover",
    ],
    demoUrl: "/portfolio",
    demoLabel: "See quick-launch work",
    whatsappMessage: "Hi NextReach Studio, I am interested in the Quick Launch website package (₹5,000). My business is:",
  },
  {
    id: "business",
    name: "Business",
    price: 7500,
    priceLabel: "₹7,500",
    originalPriceLabel: "₹18,000",
    deliveryTime: "2–3 days",
    badge: "Most popular",
    tagline: "The complete local-business presence: services, proof, contact routes and search foundations.",
    idealFor: "Clinics, restaurants, contractors, local shops and growing service businesses",
    features: [
      "Three to five sections or pages",
      "Services, gallery and trust-building content",
      "Lead capture with WhatsApp routing",
      "Local SEO and Google Maps schema foundations",
      "Domain setup and full source handover",
    ],
    demoUrl: "/portfolio",
    demoLabel: "See business website work",
    whatsappMessage: "Hi NextReach Studio, I am interested in the Business website package (₹7,500). My business is:",
  },
  {
    id: "premium",
    name: "Premium Flagship",
    price: 10000,
    priceLabel: "₹10,000",
    originalPriceLabel: "₹25,000",
    deliveryTime: "3 days",
    badge: "For standout brands",
    tagline: "A richer digital experience for businesses where presentation and booking flow matter.",
    idealFor: "Restaurants, boutique brands, hospitality, agencies and polished professional practices",
    features: [
      "Five to seven bespoke pages",
      "Custom visual direction and motion details",
      "Technical SEO, analytics and schema foundations",
      "Booking or enquiry flow with WhatsApp concierge",
      "Deployment, repository and asset handover",
    ],
    demoUrl: "/demos/saffron-and-smoke",
    demoLabel: "See flagship demo",
    whatsappMessage: "Hi NextReach Studio, I am interested in the Premium Flagship website package (₹10,000). My business is:",
  },
] as const;

export type WebsitePackage = (typeof websitePackages)[number];

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function packageById(id: string) {
  return websitePackages.find((pkg) => pkg.id === id) ?? websitePackages[1];
}
