import { Calendar, Shield, MessageCircle, Clock, DollarSign, Target } from "lucide-react";

const bookingBenefits = [
  {
    icon: Calendar,
    title: "Books Grooming Appointments",
    description:
      "Pet parents pick a service, breed, and time slot — right from your website. No phone tag. No DMs lost in Instagram.",
  },
  {
    icon: Target,
    title: "Knows Your Breeds",
    description:
      "\"Do you groom Great Pyrenees?\" \"How much for a poodle cut?\" It knows your breed-specific pricing and services off the bat.",
  },
  {
    icon: Shield,
    title: "Handles Vaccination Checks",
    description:
      "Automatically asks about rabies and other required vaccines before booking. You stay compliant without the awkward phone calls.",
  },
];

const opsBenefits = [
  {
    icon: MessageCircle,
    title: "Answers Questions & Captures Leads 24/7",
    description:
      "Midnight pricing questions, breed inquiries, booking requests — answered instantly. Visitors who don't book get their info captured for morning follow-up.",
  },
  {
    icon: Clock,
    title: "Cuts No-Shows in Half",
    description:
      "Sends automatic reminders before each appointment. Pet parents confirm or reschedule with one click. Fewer empty slots.",
  },
  {
    icon: DollarSign,
    title: "Costs Less Than One Groom",
    description:
      "At $49/month, it costs less than a single large-breed grooming session. And it works every hour of every day.",
  },
];

function BenefitCard({ b }: { b: (typeof bookingBenefits)[number] }) {
  return (
    <div className="flex items-start gap-5 p-6 rounded-2xl hover:bg-white/[0.02] transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/[0.04]">
      <div className="w-12 h-12 rounded-xl bg-amber-400/[0.08] flex items-center justify-center text-amber-400/80 shrink-0 transition-all duration-300 group-hover:bg-amber-400/[0.12] group-hover:text-amber-400">
        <b.icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-white font-light text-base mb-2 group-hover:text-amber-100 transition-colors duration-300">
          {b.title}
        </h4>
        <p className="text-sm text-zinc-400 leading-[1.7] font-light">
          {b.description}
        </p>
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4 font-light">Capabilities</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          What your AI handles.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto leading-[1.7] text-lg font-light">
          So you focus on grooming. We handle the bookings, questions, and follow-ups.
        </p>
      </div>

      <div className="space-y-12">
        {/* Booking & Client Management */}
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-zinc-600 mb-6 px-1 font-light">Booking &amp; Client Management</p>
          <div className="grid grid-cols-1 gap-4">
            {bookingBenefits.map((b) => (
              <BenefitCard key={b.title} b={b} />
            ))}
          </div>
        </div>

        <div className="gradient-divider" />

        {/* Operations & Revenue */}
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-zinc-600 mb-6 px-1 font-light">Operations &amp; Revenue</p>
          <div className="grid grid-cols-1 gap-4">
            {opsBenefits.map((b) => (
              <BenefitCard key={b.title} b={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
