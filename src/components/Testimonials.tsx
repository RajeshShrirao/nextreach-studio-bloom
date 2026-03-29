import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I used to miss calls constantly — you can't answer the phone with a wet poodle on the table. The AI receptionist booked 8 appointments on its first weekend. I didn't change a thing.",
      name: "Sarah K.",
      role: "Owner, Paws & Bubbles Grooming",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      rating: 5,
    },
    {
      quote:
        "Pet parents ask the same 15 questions: Do you do doodles? What vaccines do you need? How much for a full groom? Now the bot handles all of that and just sends me the bookings.",
      name: "Marcus T.",
      role: "Happy Tails Mobile Grooming",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      rating: 5,
    },
    {
      quote:
        "We're a vet clinic with 3 groomers. The chatbot handles grooming bookings separately from vet appointments. Even knows which groomer handles which breed. Wild.",
      name: "Dr. Lisa Chen",
      role: "Furry Friends Vet & Groom",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
      rating: 5,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-32">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Groomers are booking more. Sleeping better.
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Real results from salons and clinics that stopped losing customers after hours.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="glass-panel glass-panel-hover p-8 rounded-2xl relative"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Star rating */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
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
