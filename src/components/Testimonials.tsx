export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I spent 3 weeks in tutorial hell trying to get Supabase auth to work on my Lovable export. I felt completely stupid and was ready to quit. Sent the repo over, woke up to a perfectly working Vercel link. Saved my sanity.",
      name: "Marcus K.",
      role: "Solo Founder",
    },
    {
      quote:
        "Every dev I contacted wanted a $3,000 retainer and a 4-week timeline to 'refactor' my app. I just needed the Stripe webhook fixed. Paid the $79, got a clean PR the next morning, and launched to my beta users.",
      name: "Sarah T.",
      role: "SaaS Creator",
    },
    {
      quote:
        "The best part was not having to get on a Zoom call and embarrass myself trying to explain my messy, AI-generated spaghetti code. The completely async process is an introvert's dream.",
      name: "David L.",
      role: "Indie Builder",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Stop letting a single routing error hold your launch hostage.
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
