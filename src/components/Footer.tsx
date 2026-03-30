import Link from "next/link";

export default function Footer() {
  const plans = [
    {
      name: "Starter",
      price: "$299 + $49/mo",
      features: "AI receptionist, FAQ & services, 1,000 messages/mo, email support",
      href: "https://tally.so/r/1AMoR1?plan=starter",
      primary: true,
    },
    {
      name: "Business",
      price: "$499 + $49/mo",
      features: "Everything in Starter + breed-aware guidance, booking capture, 3,000 messages/mo, priority support",
      href: "https://tally.so/r/1AMoR1?plan=business",
      primary: false,
    },
  ];

  return (
    <footer
      id="pricing"
      className="relative bg-[#020202] pt-32 pb-16 px-6 sm:px-8 text-center"
    >
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      {/* Hero text */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-8 leading-[1.2] max-w-3xl mx-auto">
        Every missed call goes to a competitor.
      </h2>
      <p className="text-zinc-400 mb-6 max-w-xl mx-auto leading-[1.8] text-lg font-light">
        Your AI receptionist catches every inquiry, books every appointment, and never sleeps.
      </p>
      <p className="text-zinc-500 text-sm mb-16 font-light">
        No payment until you approve your demo. Cancel anytime.
      </p>

      {/* Pricing cards */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <a
            key={plan.name}
            href={plan.href}
            className={`flex-1 p-8 rounded-3xl border transition-all duration-300 cursor-pointer group ${
              plan.primary
                ? "bg-amber-400/[0.06] border-amber-400/15 hover:bg-amber-400/[0.1] hover:border-amber-400/25"
                : "bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.1]"
            }`}
          >
            <p className={`text-xs font-light mb-2 uppercase tracking-[0.08em] ${plan.primary ? "text-amber-400/70" : "text-zinc-500"}`}>
              {plan.name}
            </p>
            <p className={`text-3xl font-light mb-3 ${plan.primary ? "text-amber-300" : "text-white"}`}>
              {plan.price}
            </p>
            <p className="text-sm text-zinc-400 leading-[1.6] font-light">{plan.features}</p>
          </a>
        ))}
      </div>

      {/* Social proof */}
      <div className="mb-16 text-sm text-zinc-500 font-light">
        <p>Trusted by salons in Denver, Phoenix, Austin, Seattle, Miami &amp; more.</p>
      </div>

      <div className="gradient-divider max-w-6xl mx-auto mb-8" />

      {/* Founder blurb */}
      <p className="text-xs text-zinc-600 mb-8 font-light">
        Built by pet business operators who hated missing calls.
      </p>

      {/* Footer links */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 text-xs text-zinc-600 font-light">
        <a
          href="mailto:hello@nextreachstudio.com"
          className="hover:text-zinc-400 transition-colors duration-300 cursor-pointer"
        >
          hello@nextreachstudio.com
        </a>
        <span className="text-zinc-800">|</span>
        <Link href="/privacy" className="hover:text-zinc-400 transition-colors duration-300 cursor-pointer">Privacy Policy</Link>
        <span className="text-zinc-800">|</span>
        <Link href="/terms" className="hover:text-zinc-400 transition-colors duration-300 cursor-pointer">Terms of Service</Link>
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-0 text-xs text-zinc-600 font-light">
        <p>&copy; 2026 NextReach Studio.</p>
        <p className="md:ml-4">AI Receptionists for Pet Grooming &amp; Vet Clinics.</p>
      </div>
    </footer>
  );
}
