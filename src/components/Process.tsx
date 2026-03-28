export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Tell Us About Your Business",
      description:
        "Fill out a quick form: your business name, what you do, and the top 10-20 questions your customers ask most. That's all we need.",
    },
    {
      number: "02",
      title: "We Build Your AI Chatbot",
      description:
        "We train a custom chatbot on your business — your hours, services, pricing, FAQs, everything. It knows your business better than your newest employee.",
    },
    {
      number: "03",
      title: "It Goes Live & Captures Leads",
      description:
        "We embed it on your website. It starts answering questions, booking appointments, and capturing leads 24/7. You get notified of every qualified lead.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Live in 3 days. No headaches.
        </h2>
        <p className="text-zinc-400">
          From &quot;I want one&quot; to &quot;it&apos;s live on my site&quot; in under a week.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass-panel p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="text-5xl font-black text-white/5 absolute -top-2 -right-2">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
              {step.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
