import { Mail, MessageCircle, Send, TimerReset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const contactOptions = [
  {
    icon: Send,
    title: "Email brief",
    copy: "Send your product URL, top features, and rough scope.",
    value: "admin@nextreachstudio.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp intake",
    copy: "Useful if you want a quick async back-and-forth without calls.",
    value: "+91 98765 43210",
  },
  {
    icon: TimerReset,
    title: "Response window",
    copy: "You’ll get a scoped reply with next steps within 24 hours.",
    value: "24 hours",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SEO pageKey="contact" />
      <SiteHeader />
      <main>
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">Contact</div>
              <h1 className="mt-4 text-5xl font-bold leading-[0.98] tracking-[-0.04em] md:text-7xl">
                Start with a short brief. No calls, no meetings, no long kickoff.
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                Best briefs include your product URL, target user, top 3 features, current docs situation, and desired launch date.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-6 md:grid-cols-3">
              {contactOptions.map((item) => (
                <Card key={item.title} className="border-border/70 bg-card">
                  <CardHeader>
                    <item.icon className="h-6 w-6 text-highlight" />
                    <CardTitle className="mt-4 text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.copy}</p>
                    <div className="mt-4 font-medium text-foreground">{item.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121316] py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-[#d9ff66]">Before you submit</div>
                <h2 className="mt-4 text-4xl md:text-5xl">A simple brief is enough.</h2>
                <div className="mt-6 space-y-4 text-white/70">
                  <p>Product URL or demo link</p>
                  <p>Main user type</p>
                  <p>Top features to document first</p>
                  <p>Preferred stack: Nextra or Fumadocs</p>
                </div>
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <Mail className="mt-1 h-5 w-5 text-[#d9ff66]" />
                  <p>If the form fails, email `admin@nextreachstudio.com` directly and include the same details.</p>
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
