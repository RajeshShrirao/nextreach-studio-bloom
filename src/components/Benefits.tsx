export default function Benefits() {
  const benefits = [
    {
      title: "Zero Discovery Calls",
      description:
        "Your time is better spent talking to users, not explaining environment variables to a freelancer on Zoom.",
    },
    {
      title: "Surgical Precision",
      description:
        "I don&apos;t rebuild your app from scratch to inflate the bill. I find the exact broken dependency and neutralize it.",
    },
    {
      title: "Safe Space for Messy Code",
      description:
        "AI writes weird code. I don&apos;t care. There is zero judgment here — just rapid problem-solving.",
    },
    {
      title: "The Loom Post-Mortem",
      description:
        "You don&apos;t just get fixed code; you get a quick private video explaining the why behind the bug.",
    },
    {
      title: "Deep Stack Mastery",
      description:
        "Next.js routing, Supabase state management, and Stripe webhook handshakes are my native language.",
    },
    {
      title: "No Scope Creep",
      description:
        "A flat $79 fee means you never get hit with an unexpected invoice because a bug took an hour longer.",
    },
    {
      title: "No Retainer Dependency",
      description:
        "I fix the blocker and get out of your way. I build my own studio products; I don&apos;t want to be your permanent CTO.",
    },
    {
      title: "Identity Restoration",
      description:
        "The psychological weight of a broken app is heavy. We remove the block so you can get back to leading.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Why founders quietly use this service to cross the finish line.
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-4">
            <div className="mt-1 w-2 h-2 rounded-full bg-white shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">{b.title}</h4>
              <p className="text-sm text-zinc-400">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
