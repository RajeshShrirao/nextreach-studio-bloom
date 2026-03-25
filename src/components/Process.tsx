export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Drop the Link",
      description:
        "Click checkout and paste three things: your GitHub repo URL, your Vercel URL, and the exact terminal error. No onboarding docs required.",
    },
    {
      number: "02",
      title: "The Silent Fix",
      description:
        "I pull your code into an isolated environment. I find the broken state logic, fix the routing, correct the ENVs, and neutralize the deployment blocker.",
    },
    {
      number: "03",
      title: "You Launch",
      description:
        "Within 24 hours, you get a clean PR and a 2-minute Loom video explaining exactly what broke so you don&apos;t repeat the mistake. You merge and launch.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Get unstuck without saying a single word.
        </h2>
        <p className="text-zinc-400">
          A high-end, zero-friction process engineered for solo founders.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass-panel p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="text-5xl font-black text-white/5 absolute -top-2 -right-2">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
              {step.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
