import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Blackbox Rescue | NextReach Studio",
  description:
    "Your AI MVP looks great locally. On Vercel, it's a 500 error nightmare. We fix it — $79 flat, 24hr turnaround, zero calls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} text-zinc-300 antialiased min-h-screen selection:bg-zinc-800 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
