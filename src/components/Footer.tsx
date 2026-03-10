import { BookOpenText, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-[#121316] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff66] text-[#121316]">
                  <BookOpenText className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-white">
                  NextReach Studio
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Done-for-you docs sites for indie SaaS founders who keep postponing documentation. Async intake, written content, searchable docs, and launch in 5 days.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Service</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="/pricing" className="transition-colors hover:text-[#d9ff66]">
                    Docs Sprint
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="transition-colors hover:text-[#d9ff66]">
                    Docs + IA
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="transition-colors hover:text-[#d9ff66]">
                    Searchable Docs
                  </a>
                </li>
                <li>
                  <a href="/contact" className="transition-colors hover:text-[#d9ff66]">
                    Async Delivery
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="/about" className="transition-colors hover:text-[#d9ff66]">
                    About
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="transition-colors hover:text-[#d9ff66]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/contact" className="transition-colors hover:text-[#d9ff66]">
                    Start a project
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="transition-colors hover:text-[#d9ff66]">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-white/70 transition-colors hover:text-[#d9ff66]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-[#d9ff66] group-hover:text-[#121316]">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>WhatsApp intake</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:admin@nextreachstudio.com"
                    className="group flex items-center space-x-2 text-white/70 transition-colors hover:text-[#d9ff66]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-[#d9ff66] group-hover:text-[#121316]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>admin@nextreachstudio.com</span>
                  </a>
                </li>
                <li className="pt-2 text-white/60">
                  <p className="text-xs">Replies within 24 hours</p>
                  <p className="text-xs">Fully async. No calls required.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="mb-4 text-sm text-white/50 md:mb-0">
                © 2026 NextReach Studio. Docs-as-a-Service for indie SaaS.
              </p>
              <div className="flex space-x-6 text-sm text-white/50">
                <a href="/privacy" className="transition-colors hover:text-[#d9ff66]">Privacy Policy</a>
                <a href="/terms" className="transition-colors hover:text-[#d9ff66]">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
