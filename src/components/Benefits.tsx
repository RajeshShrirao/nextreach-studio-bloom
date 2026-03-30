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
    <div className="flex items-start gap-4 p-5 rounded-xl hover:bg-white/[0.015] transition-all duration-200 group cursor-pointer">
      <div className="w-11 h-11 rounded-xl bg-amber-400/[0.08] flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-200 group-hover:scale-[1.05]">
        <b.icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-white font-medium text-[15px] mb-1.5 group-hover:text-amber-100 transition-colors duration-200">
          {b.title}
        </h4>
        <p className="text-[13px] text-zinc-400 leading-[1.6]">
          {b.description}
        </p>
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mb-3">Features</p>
        <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-4 leading-[1.15]">
          What your AI receptionist handles.
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto leading-[1.65] text-[16px]">
          So you can focus on the dogs on your table, not the phone ringing off the hook.
        </p>
      </div>

      <div className="space-y-8">
        {/* Booking & Client Management */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-600 mb-4 px-1">Booking & Client Management</p>
          <div className="grid grid-cols-1 gap-y-2">
            {bookingBenefits.map((b) => (
              <BenefitCard key={b.title} b={b} />
            ))}
          </div>
        </div>

        <div className="gradient-divider" />

        {/* Operations & Revenue */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-600 mb-4 px-1">Operations & Revenue</p>
          <div className="grid grid-cols-1 gap-y-2">
            {opsBenefits.map((b) => (
              <BenefitCard key={b.title} b={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}