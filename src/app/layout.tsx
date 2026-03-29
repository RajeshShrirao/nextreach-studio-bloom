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
  title: "Your 24/7 AI Employee | NextReach Studio",
  description:
    "Custom AI chatbots for small businesses. Answers questions, books appointments, captures leads — 24/7. From $299. Live in 3-5 days.",
  keywords: [
    "AI chatbot",
    "small business",
    "lead capture",
    "customer service",
    "automation",
  ],
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Your 24/7 AI Employee | NextReach Studio",
    description:
      "Custom AI chatbots for small businesses. Answers questions, books appointments, captures leads — 24/7. From $299. Live in 3-5 days.",
    type: "website",
    siteName: "NextReach Studio",
    images: ["/link-previews.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your 24/7 AI Employee | NextReach Studio",
    description:
      "Custom AI chatbots for small businesses. Answers questions, books appointments, captures leads — 24/7. From $299. Live in 3-5 days.",
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
