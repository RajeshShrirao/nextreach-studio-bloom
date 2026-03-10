import { Clock3, FileText, MessageSquare, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const principles = [
  {
    icon: Rocket,
    title: "Built for launch speed",
    copy: "Founders are shipping fast. The docs offer is intentionally scoped so documentation stops being a blocker.",
  },
  {
    icon: MessageSquare,
    title: "Async by default",
    copy: "No sales calls, no kickoff meetings. Product links, screenshots, and founder notes are enough to start.",
  },
  {
    icon: FileText,
    title: "Writing is part of the product",
    copy: "This is not just a theme setup. The service includes actual documentation writing and structure.",
  },
  {
    icon: Clock3,
    title: "Short turnaround, tight scope",
    copy: "The 5-day sprint works because it focuses on the core docs users need first: onboarding, features, FAQs, and troubleshooting.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEO pageKey="about" />
      <SiteHeader />
      <main>
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">About the studio</div>
              <h1 className="mt-4 text-5xl font-bold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                NextReach Studio exists for founders who know docs matter but keep pushing them to later.
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                Most indie SaaS products don’t fail because the team cannot write documentation. They fail because docs never win against shipping product. This service closes that gap with a fixed-scope async sprint.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-6 md:grid-cols-2">
              {principles.map((item) => (
                <Card key={item.title} className="border-border/70">
                  <CardHeader>
                    <item.icon className="h-6 w-6 text-highlight" />
                    <CardTitle className="mt-4 text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">What makes the offer different</div>
              <h2 className="mt-4 text-4xl md:text-5xl">A founder doesn’t need another docs tool. They need the docs done.</h2>
            </div>
            <div className="mt-8 grid gap-4 text-muted-foreground md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">DIY tools still leave founders with a blank page and a writing problem.</div>
              <div className="rounded-2xl border border-border bg-card p-6">Freelance writing is often detached from the actual docs site and deployment.</div>
              <div className="rounded-2xl border border-border bg-card p-6">NextReach Studio combines writing, structure, implementation, and launch into one async sprint.</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
