export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "We were getting 20+ calls a day asking about our hours and pricing. Now the chatbot handles all of that. My staff can finally focus on actual customers instead of answering the same questions on repeat.",
      name: "Priya M.",
      role: "Salon Owner",
    },
    {
      quote:
        "I was skeptical, but the chatbot booked 3 appointments on its first night. THREE. While I was sleeping. The $299 paid for itself in 48 hours.",
      name: "James R.",
      role: "Dental Clinic",
    },
    {
      quote:
        "I couldn't afford a receptionist at $2,000/month. This chatbot does 80% of the job for $49/month. It's the best investment I've made for my practice.",
      name: "Dr. Anika S.",
      role: "Physiotherapy Clinic",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Business owners are sleeping better. Literally.
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="glass-panel p-8 rounded-2xl">
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700" />
              <div>
                <p className="text-white text-sm font-medium">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
