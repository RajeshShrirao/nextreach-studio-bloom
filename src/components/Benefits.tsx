import { MessageCircle, Calendar, Target, Brain, DollarSign, Globe, Settings, Zap } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: MessageCircle,
      title: "Answers Questions 24/7",
      description:
        "\"What are your hours?\" \"Do you accept insurance?\" \"How much does X cost?\" — handled automatically, even at 2 AM.",
    },
    {
      icon: Calendar,
      title: "Books Appointments",
      description:
        "Customers can schedule directly through the chatbot. No phone tag, no missed calls, no lost bookings.",
    },
    {
      icon: Target,
      title: "Captures Every Lead",
      description:
        "Website visitors who leave without calling? The chatbot grabs their info before they bounce. You wake up to new leads.",
    },
    {
      icon: Brain,
      title: "Custom Trained on YOUR Business",
      description:
        "Not a generic bot. It knows your services, pricing, policies, and personality. Customers can't tell it's not a person.",
    },
    {
      icon: DollarSign,
      title: "Cheaper Than a Receptionist",
      description:
        "A part-time receptionist costs $1,500-2,500/month. Your AI employee? $49/month. And it never calls in sick.",
    },
    {
      icon: Globe,
      title: "Works on Your Website",
      description:
        "Seamlessly embedded on your site. No redirects, no pop-ups from third parties. It looks and feels like part of your brand.",
    },
    {
      icon: Settings,
      title: "You Stay in Control",
      description:
        "Full dashboard to review conversations, update answers, and see what customers are actually asking. Real insights, real data.",
    },
    {
      icon: Zap,
      title: "One Customer Pays for It",
      description:
        "One captured lead, one booked appointment, one question answered at midnight — and the chatbot has already paid for itself.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        What your AI employee does while you&apos;re sleeping.
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {benefits.map((b, i) => (
          <div
            key={b.title}
            className="flex items-start gap-4 p-5 rounded-xl hover:bg-white/[0.02] transition-all duration-300 group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 shrink-0">
              <b.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1 group-hover:text-zinc-100 transition-colors">
                {b.title}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}