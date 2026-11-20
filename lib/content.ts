/* We Care — single source of truth for all site content.
   Transcribed verbatim from temp/We Care.html (approved business material). */

export const WHATSAPP_NUMBER = "919535328769";

export function waLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const BRAND = {
  name: "We Care",
  tagline: "Elder Companionship",
  eyebrow: "Dignified Eldercare Companionship",
  headline: "Dedicated, compassionate care companions for your parents.",
  lead: "Professional, vetted companions for hospital visits, home wellness, and daily logistics. Book by the hour or choose a dedicated monthly plan — with complete peace of mind on your phone.",
  legal: "We Care Companion Services Pvt. Ltd.",
};

export type City = {
  name: string;
  zone: string;
  tone: "green" | "peach" | "blue";
};

export const LIVE_CITIES: City[] = [
  { name: "Bangalore", zone: "All Zones", tone: "green" },
  { name: "Lucknow", zone: "Gomti Nagar & Beyond", tone: "peach" },
  { name: "Nagpur", zone: "Central & Suburbs", tone: "blue" },
];

export const COMING_SOON = "Pune & Hyderabad";

export const ROTATING_PHRASES = [
  { text: "at the hospital.", tone: "green" },
  { text: "at home.", tone: "peach" },
  { text: "at the bank.", tone: "yellow" },
  { text: "for the errands.", tone: "blue" },
  { text: "for the readings.", tone: "lilac" },
] as const;

export type Service = {
  id: string;
  icon: "hospital" | "home" | "bank";
  tone: "green" | "peach" | "blue";
  title: string;
  blurb: string;
  bullets: string[];
  cta: string;
};

export const SERVICES: Service[] = [
  {
    id: "medical",
    icon: "hospital",
    tone: "green",
    title: "Healthcare & Medical Escort",
    blurb:
      "Patient, hands-on accompaniment through complex medical environments and consultations.",
    bullets: [
      "Doctor consultations & OPD appointments",
      "Lab investigations & diagnostic scans",
      "Pharmacy medicine collection",
      "Hospital admission & discharge assistance",
    ],
    cta: "Book Medical Escort",
  },
  {
    id: "wellness",
    icon: "home",
    tone: "peach",
    title: "In-Home Wellness & Companionship",
    blurb:
      "Empathetic in-person presence to reduce isolation and keep everyday domestic life organized.",
    bullets: [
      "Warm, engaging conversation & tea time",
      "Gentle neighborhood walks & mobility support",
      "Sorting weekly pill strips & reminders",
      "Tech help, smartphone setup & family video calls",
    ],
    cta: "Book In-Home Care",
  },
  {
    id: "errands",
    icon: "bank",
    tone: "blue",
    title: "Errands, Logistics & Banking",
    blurb:
      "Reliable feet on the ground to tackle administrative tasks and essential errands outside the home.",
    bullets: [
      "Bank visits, KYC paperwork & life certificates",
      "Pension office, electricity & utility payments",
      "Grocery shopping, provisions & dry cleaning",
      "Supervising domestic home repairs and vendors",
    ],
    cta: "Book Errands & Banking",
  },
];

/* Approved pricing — exact figures from We Care.html */
export const PRICE_FIRST_HOUR = 199;
export const PRICE_PER_EXTRA_30MIN = 100;
export const MIN_HOURS = 1;
export const MAX_HOURS = 4;

export function visitPrice(hours: number): number {
  const extraHalfHours = Math.max(0, Math.round((hours - 1) * 2));
  return PRICE_FIRST_HOUR + extraHalfHours * PRICE_PER_EXTRA_30MIN;
}

export type PricingTier = {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  price: string;
  unit: string;
  featured?: boolean;
  ribbon?: string;
  bullets: { text: string; strong?: string }[];
  cta: string;
  waText: string;
};

export const PRICING: PricingTier[] = [
  {
    id: "on-demand",
    kicker: "Pay-As-You-Go",
    title: "On-Demand Care",
    blurb:
      "Perfect for occasional hospital appointments, OPD escorts, or one-off urgent tasks.",
    price: "₹199",
    unit: "/ first hour",
    bullets: [
      { text: "Book from 1 to 4 hours as needed" },
      { text: "₹100 for each additional 30 minutes" },
      { text: "Police-verified local companion matched" },
      { text: "Live door PIN & post-visit field note" },
      { text: "Zero subscription or recurring fee" },
    ],
    cta: "Book by the Hour",
    waText: "Hi We Care, I'd like to book an On-Demand visit",
  },
  {
    id: "packages",
    kicker: "Prepaid Bundles",
    title: "Care Packages",
    blurb:
      "Ideal for recurring clinic visits, physical therapy, and bi-weekly check-ins.",
    price: "₹899",
    unit: "/ 5-visit bundle",
    featured: true,
    ribbon: "Most Popular · Best Value",
    bullets: [
      { text: "Choice of ", strong: "5 or 10 visit bundles" },
      { text: "Valid for a full ", strong: "12 months" },
      { text: "", strong: "Discounted per-visit rate" },
      { text: "Priority companion reservation window" },
      { text: "Includes full door PIN & digital report log" },
    ],
    cta: "Get Care Package",
    waText: "Hi We Care, I'm interested in a Care Package Bundle",
  },
  {
    id: "monthly",
    kicker: "Membership",
    title: "Dedicated Monthly Care",
    blurb:
      "Comprehensive eldercare management for parents living independently.",
    price: "₹2,499",
    unit: "/ month",
    bullets: [
      { text: "", strong: "Dedicated assigned companion" },
      { text: "Weekly scheduled home or escort visits" },
      { text: "Routine vitals tracking (BP, pulse, blood sugar logs)" },
      { text: "Monthly consolidated health & activity summary" },
      { text: "", strong: "24/7 dedicated care coordinator" },
    ],
    cta: "Join Monthly Care",
    waText:
      "Hi We Care, I'd like to learn more about the Monthly Care Membership",
  },
];

/* Post-purchase suffixes kept faithful to the source bullets */
export const PRICING_SUFFIX: Record<string, string[]> = {
  packages: ["", " with zero expiry pressure", " vs standard hourly", "", ""],
  monthly: [
    " (familiar friendly face)",
    "",
    "",
    "",
    " for adult children",
  ],
};

export const HOW_STEPS = [
  {
    n: 1,
    title: "You book in a minute",
    body: "Select the service type, preferred duration (1 to 4 hours), and your parent's home address in Bangalore, Lucknow, or Nagpur. No cumbersome sign-up required.",
  },
  {
    n: 2,
    title: "A verified companion is assigned",
    body: "A background-checked, eldercare-trained companion in their neighborhood is assigned. You see who is coming before they reach the door.",
  },
  {
    n: 3,
    title: "A PIN at the door",
    body: "At the door, a randomized 4-digit security PIN is verified before entry — so you know the right person arrived.",
  },
  {
    n: 4,
    title: "A note when it is done",
    body: "Live arrival notifications, doctor consultation notes, prescription changes, photos, and vital readings — directly on your phone as the visit wraps up.",
  },
];

export const TRUST_STANDARDS = [
  {
    icon: "shield",
    title: "Police & Background Verification",
    body: "Rigorous 7-point background checks, local police clearance records, Aadhaar authentication, and physical address vetting for every companion.",
  },
  {
    icon: "heart",
    title: "Eldercare & Empathy Training",
    body: "Trained in geriatric communication, gentle mobility assistance, fall prevention awareness, and respecting elder autonomy and dignity.",
  },
  {
    icon: "lock",
    title: "Door PIN Authentication",
    body: "Every visit generates a one-time 4-digit code. The companion must confirm this PIN at the threshold before a visit session officially begins.",
  },
  {
    icon: "note",
    title: "Comprehensive Post-Visit Summaries",
    body: "Clear, transparent documentation sent directly to your phone: vitals logged, doctor updates, receipts, photos, and next-step recommendations.",
  },
] as const;

export const HERO_BADGES = [
  { icon: "verified", title: "100% Background Verified", sub: "Police clearance & Aadhaar check" },
  { icon: "pin", title: "Door PIN Security", sub: "Only right companion enters" },
  { icon: "note", title: "Live Visit Notes & Vitals", sub: "Instant updates to family phone" },
  { icon: "calendar", title: "Zero Cancellation Friction", sub: "Free reschedule & easy refunds" },
] as const;

export const STATS = [
  { value: "4.9/5", label: "Family rating" },
  { value: "1,000+", label: "Completed visits" },
  { value: "3", label: "Cities live today" },
];

export const TESTIMONIALS = [
  {
    initials: "RK",
    tone: "green",
    quote:
      "Being in Singapore while my father was admitted for eye surgery in Bangalore was gut-wrenching. Our companion kept me updated every 30 minutes, handled the discharge papers, and tucked him in safely.",
    name: "Rahul K.",
    meta: "Son · Living in Singapore (Parents in Bangalore)",
  },
  {
    initials: "NS",
    tone: "peach",
    quote:
      "When my mother experienced sudden dizziness late evening, a We Care companion arrived in 25 minutes. They coordinated the clinic triage and stayed until I could arrange travel.",
    name: "Neha S.",
    meta: "Daughter · Living in Dubai (Mother in Lucknow)",
  },
  {
    initials: "SV",
    tone: "blue",
    quote:
      "My companion Ramesh helps me with banking forms and drives me to the park. It relieves my children from worrying about my routine, and restores my own independence.",
    name: "Mr. Shyamlal V. (69)",
    meta: "Retired Resident · Whitefield, Bangalore",
  },
] as const;

export const FAQS = [
  {
    q: "What does a companion do versus a clinical nurse?",
    a: "Companions are dedicated personal navigators who accompany parents to hospitals, doctor OPDs, banks, and grocery runs, while providing warm social engagement, technology support, and medication organization. They do not perform invasive medical procedures (such as injections, intravenous lines, or catheter care).",
  },
  {
    q: "How does the door PIN verification work?",
    a: "When a booking is confirmed, a random 4-digit code is sent to your phone and visible to your parent. When the companion arrives at their residence, they must enter this exact code into their companion app to unlock the session. This guarantees only the authenticated person enters.",
  },
  {
    q: "Can I book and coordinate care from abroad?",
    a: "Yes, over 40% of our families reside in the UAE, US, UK, Singapore, and Canada. You can book seamlessly online or via WhatsApp, pay with international cards, and receive real-time notifications, photos, and post-visit reports formatted for your local timezone.",
  },
  {
    q: "What happens if an appointment or visit runs longer than planned?",
    a: "Hospitals and banks often experience unexpected delays. Your companion remains with your parent. Additional time beyond the booked slot is billed transparently in 30-minute intervals at our standard rate (₹100 per 30 mins) with zero penalty.",
  },
];

export const VISIT_DEMO = {
  companion: "Ananya K.",
  initials: "AK",
  parent: "Mrs. Sharma (68)",
  place: "Fortis Hospital, BLR",
  service: "OPD Escort",
  vitals: "BP: 122/80 · SpO2: 98%",
  pin: ["4", "7", "1", "9"],
  note: "Dr. Raman completed joint checkup. 2 prescription changes logged, medicines collected. Now escorting mother safely back home in cab.",
  family: "Dubai family connected",
};

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#trust", label: "Trust & Safety" },
  { href: "#faq", label: "FAQ" },
];