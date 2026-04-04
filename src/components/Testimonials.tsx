import Image from "next/image";

const testimonials = [
  {
    quote:
      "I used to spend Sunday nights calling back missed numbers. Now I don't think about it. It just handles itself.",
    name: "Jennifer Martinez",
    role: "Barks & Bubbles Pet Salon",
    city: "Denver, CO",
    initials: "JM",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    results: "47 fewer missed calls, 31 new bookings in 30 days",
  },
  {
    quote:
      "First week it booked 14 appointments I would have missed. That's not a tool anymore — that's a business partner.",
    name: "Mike Patterson",
    role: "Pawsome Cuts Mobile Grooming",
    city: "Phoenix, AZ",
    initials: "MP",
    color: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    results: "23 new bookings in 30 days, 4 hours/week saved",
  },
  {
    quote:
      "My clients think I have a receptionist now. Professional, fast, never has a bad day.",
    name: "Dr. Amanda Torres",
    role: "Riverside Pet Clinic & Spa",
    city: "Austin, TX",
    initials: "AT",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    results: "62 fewer missed calls, 28 new grooming bookings in 30 days",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4">
          Groomers doing more of what they love
        </p>
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          They stopped missing calls. Then stopped thinking about it.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto leading-[1.7] text-lg">
          Real results from salons that stopped losing customers after hours.
        </p>
      </div>

      {/* Testimonial cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass-panel glass-panel-hover p-8 rounded-3xl relative"
          >
            {/* Quote text */}
            <p className="font-display text-quote text-zinc-300 text-base leading-[1.8] mb-8 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author info */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm border shrink-0 ${t.color}`}              >
                {t.initials}
              </div>
              <div>
                <p className="text-white text-sm leading-tight">{t.name}</p>
                <p className="text-zinc-500 text-xs leading-tight mt-1">
                  {t.role} — {t.city}
                </p>
              </div>
            </div>

            {/* Results highlight */}
            <div className="border-t border-white/[0.04] pt-4">
              <p className="text-xs text-emerald-400/70 leading-relaxed">{t.results}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
