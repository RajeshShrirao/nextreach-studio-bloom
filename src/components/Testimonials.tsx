import Image from "next/image";

const testimonials = [
  {
    quote:
      "I used to miss calls constantly — you can't answer the phone with a wet poodle on the table. The AI receptionist booked 8 appointments on its first weekend. I didn't change a thing.",
    name: "Jennifer Martinez",
    role: "Barks & Bubbles Pet Salon",
    city: "Denver, CO",
    initials: "JM",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    results: "47 fewer missed calls, 31 new bookings in 30 days",
  },
  {
    quote:
      "Pet parents ask the same 15 questions: Do you do doodles? What vaccines do you need? How much for a full groom? Now the bot handles all of that and just sends me the bookings.",
    name: "Mike Patterson",
    role: "Pawsome Cuts Mobile Grooming",
    city: "Phoenix, AZ",
    initials: "MP",
    color: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    results: "23 new bookings in 30 days, 4 hours/week saved",
  },
  {
    quote:
      "We're a vet clinic with 3 groomers. The chatbot handles grooming bookings separately from vet appointments. Even knows which groomer handles which breed. Wild.",
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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mb-3">
          Testimonials
        </p>
        <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-4 leading-[1.15]">
          Groomers are booking more. Sleeping better.
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto leading-[1.65] text-[16px]">
          Real results from salons and clinics that stopped losing customers
          after hours.
        </p>
      </div>

      {/* Testimonial cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[21px]">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass-panel glass-panel-hover p-7 rounded-2xl relative"
          >
            {/* Quote text */}
            <p className="text-zinc-300 text-[15px] leading-[1.65] mb-6 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author info */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold border shrink-0 ${t.color}`}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-white text-[14px] font-medium leading-tight">{t.name}</p>
                <p className="text-zinc-500 text-[12px] leading-tight mt-0.5">
                  {t.role} — {t.city}
                </p>
              </div>
            </div>

            {/* Results highlight */}
            <div className="border-t border-white/[0.06] pt-3">
              <p className="text-[12px] text-emerald-400/80 leading-relaxed">{t.results}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}