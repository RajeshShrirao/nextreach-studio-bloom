import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const cabinet = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextreachstudio.com"),
  title: "AI Receptionist for Pet Grooming & Vet Clinics | NextReach Studio",
  description:
    "An AI receptionist built for pet grooming salons and vet clinics. Books appointments, answers pet parent questions, handles breed inquiries — 24/7. From $299. Live in 3 days.",
  keywords: [
    "pet grooming chatbot",
    "vet clinic AI",
    "grooming salon software",
    "pet booking system",
    "AI receptionist",
  ],
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "AI Receptionist for Pet Grooming & Vet Clinics | NextReach Studio",
    description:
      "An AI receptionist built for pet grooming salons and vet clinics. Books appointments, answers pet parent questions — 24/7. From $299.",
    type: "website",
    siteName: "NextReach Studio",
    images: ["/link-previews.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Receptionist for Pet Grooming & Vet Clinics | NextReach Studio",
    description:
      "An AI receptionist built for pet grooming salons and vet clinics. Books appointments, answers pet parent questions — 24/7. From $299.",
    images: ["/link-previews.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cabinet.variable} scroll-smooth`}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap" rel="stylesheet" media="all" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${cabinet.className} text-zinc-300 antialiased min-h-screen selection:bg-zinc-800 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
