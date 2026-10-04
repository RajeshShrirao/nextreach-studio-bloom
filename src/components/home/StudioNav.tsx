"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon as ArrowUpRight, ListIcon as List, XIcon as X, SunIcon as Sun, MoonIcon as Moon, CaretDownIcon } from "@phosphor-icons/react";

const groups: Record<string, { label: string; href: string }[]> = {
  Services: [
    { label: "Overview", href: "/services" },
    { label: "AI Agents", href: "/services/ai-agent-development-pune" },
    { label: "AI Automation", href: "/services/ai-automation-pune" },
    { label: "Custom Software", href: "/services/custom-software-development-pune" },
    { label: "Web Apps", href: "/services/web-application-development-pune" },
    { label: "MVP Development", href: "/services/mvp-development-pune" },
    { label: "Mobile Apps", href: "/services/flutter-app-development-pune" },
    { label: "API Integration", href: "/services/api-integration-pune" },
    { label: "AI Consulting", href: "/services/ai-consulting-pune" },
  ],
  Industries: ["Manufacturing", "Logistics", "Education", "Real Estate", "Healthcare", "Retail", "Restaurants", "Construction", "Pet Grooming"].map(label => ({ label, href: `/industries/${label.toLowerCase().replaceAll(" ", "-")}` })),
  Resources: ["Blog", "Guides", "Tools", "Resources"].map(label => ({ label, href: `/${label.toLowerCase()}` })),
};

const links = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries/restaurants" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

export default function StudioNav() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let saved: string | null = null;
    try { saved = localStorage.getItem("nextreach-studio-theme"); } catch { /* System theme remains available. */ }
    const apply = (isDark: boolean) => {
      setDark(isDark);
      document.querySelector("[data-studio-home]")?.setAttribute("data-theme", isDark ? "dark" : "light");
    };
    apply(saved ? saved === "dark" : media.matches);
    const onChange = (event: MediaQueryListEvent) => {
      try { if (localStorage.getItem("nextreach-studio-theme")) return; } catch { /* Follow the system theme. */ }
      apply(event.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    const closeOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setDropdown(null);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navRef.current?.querySelector<HTMLButtonElement>(`[data-dropdown="${dropdown}"]`)?.focus();
        setDropdown(null);
      }
    };
    document.addEventListener("click", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => { document.removeEventListener("click", closeOutside); document.removeEventListener("keydown", closeEscape); };
  }, [dropdown]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, summary") ?? [])].filter((item): item is HTMLElement => item !== null).filter(item => item.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1100) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.querySelector("[data-studio-home]")?.setAttribute("data-theme", next ? "dark" : "light");
    try { localStorage.setItem("nextreach-studio-theme", next ? "dark" : "light"); } catch { /* Theme changes still work without storage. */ }
  }

  return <header className="studio-header">
    <nav ref={navRef} className="studio-nav studio-container" aria-label="Main navigation">
      <a href="/" className="studio-brand" aria-label="NextReach Studio home"><img src="/brand/logo-mark.png" alt="" width="30" height="38" /><span>NextReach <span>Studio</span></span></a>
      <div className="studio-desktop-links">{links.map(link => groups[link.label] ? <div className="studio-nav-group" key={link.label} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(null); }}>
        <button type="button" data-dropdown={link.label} aria-expanded={dropdown === link.label} aria-controls={`studio-dropdown-${link.label}`} onClick={() => setDropdown(dropdown === link.label ? null : link.label)}>{link.label}<CaretDownIcon size={11} /></button>
        <div id={`studio-dropdown-${link.label}`} className="studio-nav-dropdown" hidden={dropdown !== link.label}>{groups[link.label].map(child => <a key={child.href} href={child.href}>{child.label}<ArrowUpRight size={14} /></a>)}</div>
      </div> : <a key={link.label} href={link.href}>{link.label}</a>)}<a href="#packages">Packages</a></div>
      <div className="studio-nav-actions"><button className="studio-theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button><a href="/contact" className="studio-nav-cta">Start a project <ArrowUpRight size={18} /></a><button ref={toggleRef} className="studio-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="studio-mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={26} /> : <List size={26} />}</button></div>
    </nav>
    <div ref={menuRef} id="studio-mobile-menu" className="studio-mobile-menu" hidden={!open}>
      {[...links, { label: "Packages", href: "#packages" }, { label: "Start a project", href: "/contact" }].map(link => groups[link.label] ? <details className="studio-mobile-group" key={link.label}><summary>{link.label}<CaretDownIcon size={20} /></summary><div>{groups[link.label].map(child => <a key={child.href} href={child.href} onClick={() => setOpen(false)}>{child.label}<ArrowUpRight size={17} /></a>)}</div></details> : <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={24} /></a>)}
    </div>
  </header>;
}
