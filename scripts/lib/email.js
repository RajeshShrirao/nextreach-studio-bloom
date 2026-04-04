// scripts/lib/email.js — Shared email helpers for pipeline scripts
// Imported by send-initial-emails.mjs and auto-followups.mjs

export const COMPLIMENTS = [
  "The reviews from your customers are great — clearly people trust your work.",
  "Love how you've built reputation in the community — it shows in Google reviews.",
  "Your online presence and customer reviews really stand out.",
  "The photos from your groom transformations look fantastic.",
  "Your customers' reviews keep coming back positive — that says a lot."
];

export const OBSERVATIONS = [
  "a lot of groomers miss calls when their hands are busy",
  "most salons only handle bookings during business hours",
  "after-hours website visitors don't get any response for hours",
  "customers are searching and calling but not getting through when phone lines are busy"
];

export function pickFrom(arr, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return arr[Math.abs(hash) % arr.length];
}

export function formatLocation(lead) {
  if (!lead.city || lead.city.toLowerCase() === "unknown") return "";
  return lead.state ? `${lead.city}, ${lead.state}` : lead.city;
}
