import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Your 24/7 AI Employee | NextReach Studio",
  description:
    "Custom AI chatbots for small businesses. Answers questions, books appointments, captures leads — 24/7. From $299. Live in 3-5 days.",
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
