"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon, QuotesIcon } from "@phosphor-icons/react";

// Existing homepage testimonials, with verbatim excerpts for the featured card.
//
// Saffron & Smoke is deliberately absent. The page presents it as a demo two sections
// above this one, so a testimonial attributed to its founder contradicted the page's own
// labelling — and a reader who spots that discounts every other quote here.
const reviews = [
  { name: "Dr. Ananya Joshi", role: "Medical Director", company: "Kaya Aesthetics Atelier", initials: "AJ", excerpt: "Direct developer access was a breath of fresh air.", quote: "Traditional agencies quoted us ₹80k and a 6-week timeline with account managers who knew nothing about tech. NextReach built our patient consultation funnel for ₹10,000 in 3 days. Direct developer access was a breath of fresh air." },
  { name: "Rohan Kulkarni", role: "VP of Product", company: "LogiCore Systems", initials: "RK", excerpt: "Clean code, comprehensive documentation, and full Git repository handover on day one.", quote: "They engineered our internal operations dashboard and client portal. Clean code, comprehensive documentation, and full Git repository handover on day one. No hostage retainers." },
  { name: "Sherrill B.", role: "Managing Director", company: "Horizon Strategic B2B", initials: "SB", excerpt: "NextReach guided the entire architecture and launched in 72 hours.", quote: "I was ready to take the next step in professionalizing my consulting firm with a bespoke digital presence. I didn't know the first thing about web frameworks. NextReach guided the entire architecture and launched in 72 hours." },
  { name: "Meera Sen", role: "Creative Director", company: "Banbha Fine Jewelry", initials: "MS", excerpt: "The visual taste and typography are extraordinary.", quote: "The visual taste and typography are extraordinary. Our jewelry catalog looks like an Architectural Digest editorial, and our direct WhatsApp concierge inquiries doubled within the first week of launching." },
  { name: "Gaurav Mehta", role: "Principal Partner", company: "Zenith Capital", initials: "GM", excerpt: "Finding software engineers who understand high-converting investor messaging and ultra-fast static Astro architecture is exceedingly rare.", quote: "Finding software engineers who understand high-converting investor messaging and ultra-fast static Astro architecture is exceedingly rare. 10/10 execution, perfect Lighthouse 100/100 score." },
  { name: "Karan Deshmukh", role: "Co-Founder", company: "QuickPulse Logistics", initials: "KD", excerpt: "NextReach scoped it cleanly, quoted a fixed price with zero surprises, and delivered early.", quote: "We needed a fleet tracking portal with real-time driver dispatch. NextReach scoped it cleanly, quoted a fixed price with zero surprises, and delivered early." },
  { name: "Amy Watson", role: "Head of Growth", company: "Moreno Global Hospitality", initials: "AW", excerpt: "Making high-performing websites would have been ten times more expensive without NextReach!", quote: "They helped us with all the backend APIs and headless CMS setup that I had no idea how to configure. Making high-performing websites would have been ten times more expensive without NextReach!" },
  { name: "Siddharth Rao", role: "Founder", company: "CloudAutomate Systems", initials: "SR", excerpt: "It qualifies leads 24/7 and books demos directly into Google Calendar.", quote: "NextReach built our AI customer support agent with WhatsApp routing. It qualifies leads 24/7 and books demos directly into Google Calendar. Paid for itself within 14 days." },
];

export default function StudioReviews() {
  const [{ index, direction }, setSelection] = useState({ index: 0, direction: 1 });
  const reduce = useReducedMotion();
  const review = reviews[index]!;
  function move(step: number) {
    setSelection(current => ({ index: (current.index + step + reviews.length) % reviews.length, direction: step }));
  }

  return <section className="studio-reviews studio-container studio-section" id="wall-of-love" aria-labelledby="reviews-heading">
    <div className="studio-reviews-main">
      <div className="studio-reviews-heading">
        <QuotesIcon size={46} weight="light" className="studio-review-heading-icon" aria-hidden="true" />
        <h2 id="reviews-heading">Good work.<br /><span className="studio-muted">Better company.</span></h2>
        <p>Great partnerships leave a lasting impression.<br />Here’s what ours have to say.</p>
        <div className="studio-review-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous review"><ArrowLeftIcon size={21} /></button><span>{String(index + 1).padStart(2, "0")} <span>/ {String(reviews.length).padStart(2, "0")}</span></span><button type="button" onClick={() => move(1)} aria-label="Next review"><ArrowRightIcon size={21} /></button></div>
      </div>
      <div className="studio-review-deck" aria-roledescription="carousel" aria-label="Client reviews">
        <div className="studio-review-sheet studio-review-sheet-back" aria-hidden="true" />
        <div className="studio-review-sheet studio-review-sheet-middle" aria-hidden="true" />
        <div className="studio-review-stage" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.article key={index} className="studio-review-card" custom={direction}
              drag={reduce ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={.12} dragDirectionLock
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 500) move(info.offset.x < 0 ? 1 : -1); }}
              variants={{ enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 45, rotate: reduce ? 0 : d * 2 }), center: { opacity: 1, x: 0, rotate: 0 }, exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -35, rotate: reduce ? 0 : d * -2 }) }}
              initial="enter" animate="center" exit="exit" transition={{ duration: reduce ? 0 : .32, ease: [.16, 1, .3, 1] }} style={{ touchAction: "pan-y" }}>
              <div className="studio-review-card-top"><span className="studio-review-stars" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <StarIcon size={15} weight="fill" key={i} />)}</span><span className="studio-review-company">{review.company}</span></div>
              <blockquote>“{review.excerpt}”</blockquote>
              <details className="studio-review-full"><summary>Read full review</summary><p>{review.quote}</p></details>
              <div className="studio-review-person"><span className="studio-review-monogram" aria-hidden="true">{review.initials}</span><div><h3>{review.name}</h3><p>{review.role}</p></div><QuotesIcon size={32} weight="fill" aria-hidden="true" /></div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
    <div className="studio-review-selector" aria-label="Choose a client review">{reviews.map((item, i) => <button type="button" key={item.name} aria-pressed={index === i} className={index === i ? "is-active" : ""} onClick={() => setSelection({ index: i, direction: i > index ? 1 : -1 })}><span>{String(i + 1).padStart(2, "0")}</span>{item.company}</button>)}</div>
  </section>;
}
