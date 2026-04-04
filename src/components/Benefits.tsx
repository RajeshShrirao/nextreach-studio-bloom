import { Calendar, Shield, MessageCircle, Clock, DollarSign, Target } from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Books while you groom",
    description:
      "Takes calls, locks in appointments — without you leaving your station.",
  },
  {
    icon: Target,
    title: "Knows your prices",
    description:
      "Answers pricing questions correctly every time.",
  },
  {
    icon: Shield,
    title: "Sends reminders automatically",
    description:
      "No-shows drop. Your schedule stays full without lifting a finger.",
  },
  {
    icon: MessageCircle,
    title: "Handles rescheduling",
    description:
      "Client cancels? It fills the slot immediately.",
  },
  {
    icon: Clock,
    title: "Answers FAQs 24/7",
    description:
      "Hours, location, breeds, products — handled before you wake up.",
  },
  {
    icon: DollarSign,
    title: "Works on any site",
    description:
      "One line of code. Live in 3 days.",
  },
];

function BenefitCard({ b }: { b: (typeof benefits)[number] }) {
  return (
    <div className="flex items-start gap-5 p-6 rounded-2xl hover:bg-white/[0.02] transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/[0.04]">
      <div className="w-12 h-12 rounded-xl bg-amber-400/[0.08] flex items-center justify-center text-amber-400/80 shrink-0 transition-all duration-300 group-hover:bg-amber-400/[0.12] group-hover:text-amber-400">
        <b.icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-white text-base mb-2 group-hover:text-amber-100 transition-colors duration-300">
          {b.title}
        </h4>
        <p className="text-sm text-zinc-400 leading-[1.7]">
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
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4">Capabilities</p>
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          Your new employee. Without the overhead.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {benefits.map((b) => (
          <BenefitCard key={b.title} b={b} />
        ))}
      </div>
    </section>
  );
}
