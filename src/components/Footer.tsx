import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="pricing"
      className="relative bg-[#020202] pt-20 pb-10 px-6 text-center"
    >
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      <h2 className="text-4xl font-bold text-white mb-6">
        Every missed call is a pet parent who went somewhere else.
      </h2>
      <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
        Your AI receptionist catches every inquiry, books every appointment, and never takes a day off. Live on your site in 3 days.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <a
          href="mailto:hello@nextreachstudio.com?subject=AI receptionist for my grooming salon"
          className="px-10 py-5 bg-amber-400 text-black font-bold text-lg rounded-xl hover:bg-amber-300 transition-all btn-primary-glow"
        >
          Starter — $299
        </a>
        <a
          href="mailto:hello@nextreachstudio.com?subject=Pro AI receptionist package"
          className="px-10 py-5 bg-zinc-800 text-white font-bold text-lg rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700 hover:border-zinc-600"
        >
          Pro — $499
        </a>
      </div>

      {/* Social proof with real images */}
      <div className="mb-12 flex items-center justify-center gap-3 text-sm text-zinc-500">
        <div className="flex -space-x-2">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&q=80"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover"
          />
        </div>
        <span>50+ grooming salons and vet clinics trust NextReach</span>
      </div>

      <div className="gradient-divider max-w-6xl mx-auto mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-xs text-zinc-600">
        <p>&copy; 2026 NextReach Studio. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          AI Receptionists for Pet Grooming & Vet Clinics.
        </p>
      </div>
    </footer>
  );
}
