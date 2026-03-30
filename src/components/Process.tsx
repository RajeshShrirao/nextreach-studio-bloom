import Image from "next/image";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Tell Us About Your Salon",
      description:
        "Fill out a quick form: your services, breeds you handle, pricing, hours, and the questions pet parents always ask. Takes 10 minutes.",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    },
    {
      number: "02",
      title: "We Build Your AI Receptionist",
      description:
        "We train it on your business — breed-specific grooming packages, vaccination requirements, your booking flow. It sounds like your best front-desk person.",
      image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&q=80",
    },
    {
      number: "03",
      title: "It Goes Live & Books While You Groom",
      description:
        "Embedded on your site. Answers questions, books appointments, captures leads — all while you&apos;re busy with a pup. You get a notification for every new booking.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mb-3">How It Works</p>
        <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-4 leading-[1.15]">
          Live in 3 days. No tech headaches.
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto leading-[1.65] text-[16px]">
          From &quot;I want this&quot; to &quot;it&apos;s booking on my site&quot; in under a week. We handle everything.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[21px] relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent z-0" />
        <div className="hidden md:block absolute top-[52px] left-[33%] w-1.5 h-1.5 rounded-full bg-zinc-600 -translate-x-1/2 z-10" />
        <div className="hidden md:block absolute top-[52px] left-[66%] w-1.5 h-1.5 rounded-full bg-zinc-600 -translate-x-1/2 z-10" />

        {steps.map((step, i) => (
          <div
            key={step.number}
            className="glass-panel glass-panel-hover rounded-2xl relative overflow-hidden group"
          >
            {/* Step image with gradient overlay */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={step.image}
                alt={step.title}
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-zinc-950/90" />
              {/* Step number badge */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-[11px] text-amber-400 font-mono">
                {step.number}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-[16px] font-semibold text-white mb-2 leading-[1.3]">
                {step.title}
              </h3>
              <p className="text-[13px] text-zinc-400 leading-[1.6]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
