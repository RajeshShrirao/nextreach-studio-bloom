import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${inter.className} text-zinc-300 antialiased min-h-screen selection:bg-zinc-800 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
