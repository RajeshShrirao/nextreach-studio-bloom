import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNavigation from "@/components/MobileNavigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

interface SiteHeaderProps {
  ctaLabel?: string;
  ctaHref?: string;
}

export default function SiteHeader({
  ctaLabel = "Start a docs sprint",
  ctaHref = "/contact",
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/nextreach-logo.jpg"
              alt="NextReach Studio"
              className="h-10 w-10 rounded-2xl object-cover ring-1 ring-border"
            />
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-foreground">
                NextReach Studio
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Docs-as-a-Service
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button
              className="border-0 bg-foreground text-background hover:bg-foreground/90"
              size="sm"
              onClick={() => {
                window.location.href = ctaHref;
              }}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <MobileNavigation
        isOpen={isOpen}
        onToggle={() => setIsOpen((current) => !current)}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
