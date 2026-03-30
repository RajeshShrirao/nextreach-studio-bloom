import Image from "next/image";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Tell Us About Your Salon",
      description:
        "Share your services, breeds, pricing, hours. 10 minutes to set up.",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    },
    {
      number: "02",
      title: "We Build Your AI",
      description:
        "Trained on your breed-specific packages, vaccination requirements, and booking flow.",
      image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&q=80",
    },
    {
      number: "03",
      title: "Go Live & Profit",
      description:
        "Live on your site. Answering questions, booking appointments, capturing leads 24/7.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4 font-light">Process</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          Live in 3 days.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto leading-[1.7] text-lg font-light">
          From setup to booking on your site. We handle everything.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-[64px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent z-0" />
        <div className="hidden md:block absolute top-[64px] left-[33%] w-2 h-2 rounded-full bg-zinc-600/60 -translate-x-1/2 z-10" />
        <div className="hidden md:block absolute top-[64px] left-[66%] w-2 h-2 rounded-full bg-zinc-600/60 -translate-x-1/2 z-10" />

        {steps.map((step, i) => (
          <div
            key={step.number}
            className="glass-panel glass-panel-hover rounded-3xl relative overflow-hidden group"
          >
            {/* Step image with gradient overlay */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={step.image}
                alt={step.title}
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/80" />
              {/* Step number badge */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-xs text-amber-400 font-light tracking-wide">
                {step.number}
              </div>
            </div>

            {/* Content */}
            <div className="p-7">
              <h3 className="text-lg font-light text-white mb-3 leading-[1.4]">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-[1.7] font-light">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
