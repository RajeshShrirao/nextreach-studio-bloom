export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "We were getting 20+ calls a day asking about our hours and pricing. Now the chatbot handles all of that. My staff can finally focus on actual customers instead of answering the same questions on repeat.",
      name: "Priya M.",
      role: "Salon Owner",
      rating: 5,
    },
    {
      quote:
        "I was skeptical, but the chatbot booked 3 appointments on its first night. THREE. While I was sleeping. The $299 paid for itself in 48 hours.",
      name: "James R.",
      role: "Dental Clinic",
      rating: 5,
    },
    {
      quote:
        "I couldn't afford a receptionist at $2,000/month. This chatbot does 80% of the job for $49/month. It's the best investment I've made for my practice.",
      name: "Dr. Anika S.",
      role: "Physiotherapy Clinic",
      rating: 5,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Business owners are sleeping better. Literally.
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="glass-panel glass-panel-hover p-8 rounded-2xl relative"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Quote mark */}
            <div className="absolute top-4 right-6 text-5xl text-white/[0.03] font-serif leading-none select-none">
              &ldquo;
            </div>

            {/* Star rating */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} className="text-amber-400/80 text-sm">
                  ★
                </span>
              ))}
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-medium">
                {t.name.charAt(0)}
              </div>
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
