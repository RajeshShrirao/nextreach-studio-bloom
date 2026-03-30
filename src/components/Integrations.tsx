import Image from "next/image";

const integrations = [
  {
    name: "Gingr",
    description: "Pet care management",
    logo: "/integrations/gingr.svg",
  },
  {
    name: "PetExec",
    description: "Kennel & daycare software",
    logo: "/integrations/petexec.svg",
  },
  {
    name: "PetDesk",
    description: "Veterinary client engagement",
    logo: "/integrations/petdesk.svg",
  },
  {
    name: "Google Calendar",
    description: "Appointment scheduling",
    logo: "/integrations/google-calendar.png",
  },
  {
    name: "Square Appointments",
    description: "Booking & payments",
    logo: "/integrations/Square_Logo_2025_White.svg",
  },
];

export default function Integrations() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-40">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500 mb-4 font-light">
          Integrations
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.01em] mb-6 leading-[1.2]">
          Works with your tools.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto leading-[1.7] text-lg font-light">
          Plug into existing systems or use standalone. We integrate seamlessly.
        </p>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {integrations.map((integ) => (
          <div
            key={integ.name}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center group min-h-[140px] transition-all duration-300"
          >
            {/* Logo container */}
            <div className="w-14 h-14 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={integ.logo}
                alt={`${integ.name} logo`}
                width={48}
                height={48}
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <p className="text-white text-sm font-light leading-tight mb-1">{integ.name}</p>
            <p className="text-zinc-500 text-xs leading-tight font-light">{integ.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
