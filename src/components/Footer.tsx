import Link from "next/link";

export default function Footer() {
  const plans = [
    {
      name: "Starter",
      price: "$299 + $49/mo",
      features: "1 location, basic booking, email notifications",
      href: "https://tally.so/r/1AMoR1?plan=starter",
      primary: true,
    },
    {
      name: "Pro",
      price: "$499 + $79/mo",
      features: "Multi-location, booking integration, SMS reminders, custom branding",
      href: "https://tally.so/r/1AMoR1?plan=pro",
      primary: false,
    },
  ];

  return (
    <footer
      id="pricing"
      className="relative bg-[#020202] pt-20 pb-10 px-4 sm:px-6 text-center"
    >
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      {/* Hero text */}
      <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold text-white mb-5 leading-[1.15] max-w-2xl mx-auto">
        Every missed call is a pet parent who went somewhere else.
      </h2>
      <p className="text-zinc-400 mb-4 max-w-xl mx-auto leading-[1.65] text-[16px]">
        Your AI receptionist catches every inquiry, books every appointment, and never takes a day off. Live on your site in 3 days.
      </p>
      <p className="text-zinc-500 text-[13px] mb-10">
        No payment until you approve your personalized demo. Cancel anytime.
      </p>

      {/* Pricing cards */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <a
            key={plan.name}
            href={plan.href}
            className={`flex-1 p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
              plan.primary
                ? "bg-amber-400/[0.05] border-amber-400/20 hover:bg-amber-400/[0.08] hover:border-amber-400/30"
                : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]"
            }`}
          >
            <p className={`text-[13px] font-semibold mb-1 ${plan.primary ? "text-amber-400" : "text-white"}`}>
              {plan.name}
            </p>
            <p className={`text-[22px] font-bold mb-2 ${plan.primary ? "text-amber-300" : "text-white"}`}>
              {plan.price}
            </p>
            <p className="text-[12px] text-zinc-500 leading-[1.5]">{plan.features}</p>
          </a>
        ))}
      </div>

      {/* Social proof */}
      <div className="mb-12 text-[13px] text-zinc-500">
        <p>Trusted by salons in: Denver, Phoenix, Austin, Seattle, Miami & more.</p>
      </div>

      <div className="gradient-divider max-w-6xl mx-auto mb-6" />

      {/* Founder blurb */}
      <p className="text-[11px] text-zinc-600 mb-5">
        Built by pet business operators who hated missing calls.
      </p>

      {/* Footer links */}
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 text-[12px] text-zinc-600">
        <a
          href="mailto:hello@nextreachstudio.com"
          className="hover:text-zinc-400 transition-colors duration-200 cursor-pointer"
        >
          hello@nextreachstudio.com
        </a>
        <span className="text-zinc-800">|</span>
        <Link href="/privacy" className="hover:text-zinc-400 transition-colors duration-200 cursor-pointer">Privacy Policy</Link>
        <span className="text-zinc-800">|</span>
        <Link href="/terms" className="hover:text-zinc-400 transition-colors duration-200 cursor-pointer">Terms of Service</Link>
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-0 text-[11px] text-zinc-600">
        <p>&copy; 2026 NextReach Studio. All rights reserved.</p>
        <p className="md:ml-4">AI Receptionists for Pet Grooming &amp; Vet Clinics.</p>
      </div>
    </footer>
  );
}