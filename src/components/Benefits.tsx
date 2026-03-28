export default function Benefits() {
  const benefits = [
    {
      icon: "💬",
      title: "Answers Questions 24/7",
      description:
        "\"What are your hours?\" \"Do you accept insurance?\" \"How much does X cost?\" — handled automatically, even at 2 AM.",
    },
    {
      icon: "📅",
      title: "Books Appointments",
      description:
        "Customers can schedule directly through the chatbot. No phone tag, no missed calls, no lost bookings.",
    },
    {
      icon: "🎯",
      title: "Captures Every Lead",
      description:
        "Website visitors who leave without calling? The chatbot grabs their info before they bounce. You wake up to new leads.",
    },
    {
      icon: "🧠",
      title: "Custom Trained on YOUR Business",
      description:
        "Not a generic bot. It knows your services, pricing, policies, and personality. Customers can't tell it's not a person.",
    },
    {
      icon: "💰",
      title: "Cheaper Than a Receptionist",
      description:
        "A part-time receptionist costs $1,500-2,500/month. Your AI employee? $49/month. And it never calls in sick.",
    },
    {
      icon: "🌐",
      title: "Works on Your Website",
      description:
        "Seamlessly embedded on your site. No redirects, no pop-ups from third parties. It looks and feels like part of your brand.",
    },
    {
      icon: "🎛️",
      title: "You Stay in Control",
      description:
        "Full dashboard to review conversations, update answers, and see what customers are actually asking. Real insights, real data.",
    },
    {
      icon: "⚡",
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
            <div className="mt-0.5 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-base shrink-0 group-hover:bg-white/[0.07] group-hover:border-white/[0.1] transition-all duration-300">
              {b.icon}
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
