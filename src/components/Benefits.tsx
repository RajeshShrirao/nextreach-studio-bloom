import { MessageCircle, Calendar, Target, Shield, Dog, Clock, Settings, DollarSign } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: Calendar,
      title: "Books Grooming Appointments",
      description:
        "Pet parents pick a service, breed, and time slot — right from your website. No phone tag. No DMs lost in Instagram.",
    },
    {
      icon: Dog,
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
    {
      icon: MessageCircle,
      title: "Answers at Midnight",
      description:
        "\"What are your hours?\" \"Do you do nail trims?\" \"Can I bring two dogs?\" — answered instantly, even when you're closed.",
    },
    {
      icon: Target,
      title: "Captures Leads Before They Leave",
      description:
        "Someone visits your site at 11 PM but doesn't book? The bot gets their info and what they needed. You follow up in the morning.",
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
    {
      icon: Settings,
      title: "You Stay in Control",
      description:
        "Update services, pricing, or availability anytime. See every conversation. The bot works for you, not the other way around.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        What your AI receptionist handles.
      </h2>
      <p className="text-zinc-500 text-center mb-12 max-w-lg mx-auto">
        So you can focus on the dogs on your table, not the phone ringing off the hook.
      </p>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {benefits.map((b, i) => (
          <div
            key={b.title}
            className="flex items-start gap-4 p-5 rounded-xl hover:bg-white/[0.02] transition-all duration-300 group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/[0.08] flex items-center justify-center text-amber-400/70 shrink-0">
              <b.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1 group-hover:text-amber-100 transition-colors">
                {b.title}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
