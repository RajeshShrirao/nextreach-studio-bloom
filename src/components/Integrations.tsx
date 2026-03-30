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
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mb-3">
          Integrations
        </p>
        <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-4 leading-[1.15]">
          Works with your existing tools.
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto leading-[1.65] text-[16px]">
          Already using a booking system? We plug right in. Or use it
          standalone with email and SMS notifications.
        </p>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[13px]">
        {integrations.map((integ) => (
          <div
            key={integ.name}
            className="glass-panel glass-panel-hover rounded-xl p-5 flex flex-col items-center justify-center text-center group min-h-[120px]"
          >
            {/* Logo container */}
            <div className="w-12 h-12 flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105">
              <Image
                src={integ.logo}
                alt={`${integ.name} logo`}
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <p className="text-white text-[13px] font-medium leading-tight mb-0.5">{integ.name}</p>
            <p className="text-zinc-500 text-[11px] leading-tight">{integ.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
