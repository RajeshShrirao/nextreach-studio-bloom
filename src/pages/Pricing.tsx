import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter Sprint",
    price: "$149",
    description: "For new products that need a lean docs base fast.",
    features: [
      "Up to 5 docs pages",
      "Quickstart + core feature docs",
      "Basic help center navigation",
      "Vercel deployment",
      "Async Loom handoff",
    ],
  },
  {
    name: "Growth Sprint",
    price: "$249",
    description: "Best for launched products with repeat support questions.",
    features: [
      "Up to 10 docs pages",
      "Feature docs + FAQs + troubleshooting",
      "Search-ready IA structure",
      "Domain setup support",
      "One async revision pass",
    ],
    popular: true,
  },
  {
    name: "Docs + IA",
    price: "$299",
    description: "For products needing a cleaner architecture and migration help.",
    features: [
      "Up to 12 docs pages",
      "Content rewrite or migration planning",
      "Improved categories and page hierarchy",
      "Searchable docs setup",
      "Priority async support during sprint",
    ],
  },
];

const notes = [
  "Scope assumes a focused product with clear core workflows.",
  "Large API reference libraries or multi-version docs are custom scoped.",
  "Communication stays async through email, WhatsApp, or Discord.",
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SEO pageKey="pricing" />
      <SiteHeader />
      <main>
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">Pricing</div>
              <h1 className="mt-4 text-5xl font-bold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Fixed-scope docs sprints for founders who need shipping speed, not agency overhead.
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                The pricing is deliberately narrow so it converts for indie SaaS products: enough scope to create useful docs, without turning into a months-long content project.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={plan.popular ? "border-foreground bg-card shadow-xl" : "border-border/70 bg-card"}>
                  <CardHeader>
                    {plan.popular ? <Badge className="w-fit bg-foreground text-background">Most popular</Badge> : null}
                    <CardTitle className="mt-4 text-3xl">{plan.name}</CardTitle>
                    <div className="mt-3 text-5xl font-semibold">{plan.price}</div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-8 w-full border-0 bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => {
                        window.location.href = "/contact";
                      }}
                    >
                      Start {plan.name}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">Scope notes</div>
              <h2 className="mt-4 text-4xl md:text-5xl">What keeps these packages fast and affordable</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {notes.map((note) => (
                <div key={note} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
