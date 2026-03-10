import { ArrowRight, CheckCircle2, FileSearch, Files, MessageSquareMore, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const painPoints = [
  "Your launch is live, but support questions keep repeating.",
  "Docs are still in Notion, scattered Slack replies, or nowhere.",
  "You know documentation matters, but it never beats shipping features.",
];

const deliverables = [
  "Live docs site built in Next.js with Nextra or Fumadocs",
  "Core product docs written for your main features and flows",
  "Searchable help center structure with clean navigation",
  "Deployment on Vercel with your domain and async handoff video",
];

const process = [
  { step: "01", title: "You send the brief", copy: "Product link, feature list, screenshots, and rough priorities through a form or chat." },
  { step: "02", title: "We write and structure", copy: "We turn your product into clear user-facing docs, information architecture, and page hierarchy." },
  { step: "03", title: "We ship the site", copy: "You get a live searchable docs site, deployed and ready to share with users." },
];

const faqs = [
  {
    question: "Who is this for?",
    answer: "Indie SaaS founders, solo developers, and tiny product teams who need docs but keep delaying them.",
  },
  {
    question: "Do I need existing content?",
    answer: "No. Existing notes help, but the sprint is designed for founders starting with rough bullets, product UI, and a live app.",
  },
  {
    question: "How async is it?",
    answer: "Completely async. Intake happens by form, email, WhatsApp, or Discord. No calls are required.",
  },
  {
    question: "How fast is delivery?",
    answer: "Standard scope ships in 5 days once the brief and product access are in.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SEO pageKey="home" />
      <SiteHeader />

      <main>
        <section className="docs-grid overflow-hidden border-b border-border">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="max-w-3xl">
                <Badge className="mb-6 bg-accent text-accent-foreground hover:bg-accent" variant="secondary">
                  Async docs delivery for indie SaaS
                </Badge>
                <h1 className="max-w-3xl text-5xl font-bold leading-[0.96] tracking-[-0.04em] md:text-7xl">
                  Stop postponing docs.
                  <span className="block text-muted-foreground">Get a live help center in 5 days.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                  NextReach Studio turns your product into a clean, searchable docs site. We write the content, structure the help center, build the site, and ship it fully async.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="border-0 bg-foreground text-background hover:bg-foreground/90"
                    onClick={() => {
                      window.location.href = "/contact";
                    }}
                  >
                    Start a docs sprint
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      document.getElementById("deliverables")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    See deliverables
                  </Button>
                </div>
                <div className="mt-10 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-card px-4 py-4">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Timeline</div>
                    <div className="mt-2 text-2xl font-semibold text-foreground">5 days</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card px-4 py-4">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Package</div>
                    <div className="mt-2 text-2xl font-semibold text-foreground">$149-$299</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card px-4 py-4">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Workflow</div>
                    <div className="mt-2 text-2xl font-semibold text-foreground">Async only</div>
                  </div>
                </div>
              </div>

              <Card className="noise-card overflow-hidden border-border/70 shadow-xl">
                <CardHeader className="border-b border-border/70 bg-[#121316] text-white">
                  <div className="font-mono text-xs uppercase tracking-[0.24em] text-[#d9ff66]">docs-scope.md</div>
                  <CardTitle className="mt-4 text-3xl font-semibold">What you hand off</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {painPoints.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
                      <Sparkles className="mt-1 h-5 w-5 text-highlight" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                  <div className="rounded-2xl bg-[#121316] p-5 text-white">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-[#d9ff66]">includes</div>
                    <div className="mt-3 grid gap-2 text-sm text-white/80">
                      <span>Feature docs</span>
                      <span>Quickstart and onboarding</span>
                      <span>FAQs and troubleshooting</span>
                      <span>Deploy + handoff</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="deliverables" className="border-b border-border bg-card/40">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">What you get</div>
              <h2 className="mt-4 text-4xl md:text-5xl">A docs stack that feels shipped, not improvised.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {deliverables.map((item) => (
                <Card key={item} className="border-border/70 bg-card">
                  <CardContent className="flex items-start gap-4 p-6">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-success" />
                    <p className="text-base text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-8 lg:grid-cols-3">
              {process.map((item) => (
                <Card key={item.step} className="border-border/70 bg-card">
                  <CardHeader>
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">{item.step}</div>
                    <CardTitle className="mt-3 text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-6 lg:grid-cols-4">
              <Card className="border-border/70 lg:col-span-2">
                <CardHeader>
                  <FileSearch className="h-6 w-6 text-highlight" />
                  <CardTitle className="mt-4">Content first</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We write for the questions users actually ask after signup, not generic placeholder docs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/70">
                <CardHeader>
                  <Search className="h-6 w-6 text-highlight" />
                  <CardTitle className="mt-4">Searchable structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Categories, navigation, and page titles built so users can self-serve faster.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/70">
                <CardHeader>
                  <Files className="h-6 w-6 text-highlight" />
                  <CardTitle className="mt-4">Production-ready handoff</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Delivered live on Vercel with your domain plus an async walkthrough for future edits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">Fast validation</div>
                <h2 className="mt-4 text-4xl md:text-5xl">Start with one docs sprint, not a giant content project.</h2>
                <p className="mt-5 text-lg text-muted-foreground">
                  The offer is scoped for founders who want momentum: core docs, clean IA, live site, and no meeting overhead.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {faqs.map((item) => (
                  <Card key={item.question} className="border-border/70 bg-card">
                    <CardHeader>
                      <CardTitle className="text-xl">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121316] py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-[#d9ff66]">Start async</div>
                <h2 className="mt-4 text-4xl md:text-5xl">Send the product link. We’ll map the docs sprint.</h2>
                <p className="mt-5 max-w-xl text-white/70">
                  Best fit for launched or near-launch SaaS products that need quickstart docs, feature pages, FAQs, and a clean searchable help center.
                </p>
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <MessageSquareMore className="mt-1 h-5 w-5 text-[#d9ff66]" />
                  <p>
                    Include your app URL, target user, top 3 features, and whether you want Nextra or Fumadocs. That’s enough to start.
                  </p>
                </div>
              </div>
              <Card className="border-white/10 bg-white/5 shadow-none">
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
