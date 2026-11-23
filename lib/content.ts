/* We Care — single source of truth for all site content.
   Transcribed from temp/plan.mhtml (north star), with owner-approved
   overrides: ₹2,749 auto-renew tier, no free-visit framing,
   two CTAs only ("Book your visit" → booking modal, "Book Free Consultation" → WhatsApp). */

export const WHATSAPP_NUMBER = "919322966592";

export function waLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/* Every "Book Free Consultation" CTA routes through this so the
   message always opens with "Hello We Care" + section context. */
export function consultLink(context: string): string {
  return waLink(`Hello We Care, ${context}`);
}

export const BRAND = {
  name: "We Care",
  tagline: "Their companion. Your peace of mind.",
  eyebrow: "Companionship and coordination · Nagpur",
  headline: "Dependable support for your parents in Nagpur.",
  // Concise rewrite (owner-requested, overrides plan.mhtml): warm tone kept,
  // "living away" angle now carried by the world strip instead of restating.
  lead: "Weekly companionship and attentive support for your parents — appointments accompanied, errands handled, and a written report to you after every visit. Wherever you are, we are here for your parents.",
};

/* ——— hero ——— */

export const HERO_NOTE =
  "No lock-in · Cancel before the next billing date · Travel within Nagpur city included";

export const HERO_BADGES = [
  {
    icon: "verified",
    title: "Founded and run by the Jaiswal family, Nagpur",
    sub: "Based in Nagpur, Maharashtra",
  },
  {
    icon: "calendar",
    title: "One plan, both parents",
    sub: "At one monthly fee",
  },
  {
    icon: "note",
    title: "Early access",
    sub: "Limited founding family slots",
  },
] as const;

/* ——— families band (world strip) ——— */

export const WORLD = {
  tag: "Families sign up from anywhere",
  places: [
    "USA",
    "UK",
    "Canada",
    "Europe",
    "UAE",
    "Australia",
    "New Zealand",
    "across India",
  ],
  more: "and many more",
  note: "Wherever you live, we look after your parents here in Nagpur.",
};

/* ——— what we do ——— */

export const CARE_ICON_KEYS = [
  "compass",
  "pill",
  "briefcase",
  "home",
  "person",
  "chat",
  "video",
  "alert",
] as const;
export type CareIcon = (typeof CARE_ICON_KEYS)[number];

export type CareService = {
  id: string;
  icon: CareIcon;
  title: string;
  body: string;
};

export const CARE_SERVICES: CareService[] = [
  {
    id: "accompaniment",
    icon: "compass",
    title: "Accompaniment and outings",
    body: "Doctor and hospital appointments, with registration, waiting and consultation handled and the doctor's advice sent to you. Also temple visits, family functions, property visits, and airport or railway station drops.",
  },
  {
    id: "medicines",
    icon: "pill",
    title: "Medicines, check-ups and diagnostics",
    body: "Pharmacy collection and home delivery, medication reminders as prescribed, and booking of routine check-ups and tests, with reports brought home.",
  },
  {
    id: "errands",
    icon: "briefcase",
    title: "Errands and paperwork",
    body: "Groceries, bill payments, bank visits, documents and government-office errands, carried out and reported back to you. We do not provide legal, tax or financial advice.",
  },
  {
    id: "home-tech",
    icon: "home",
    title: "Home and technology assistance",
    body: "Arranging and supervising repairs through local technicians, and helping with phones, apps and video calls so your parents stay close to you.",
  },
  {
    id: "companionship",
    icon: "person",
    title: "Companionship",
    body: "A walk, a conversation, a temple visit or an outing. Time with someone who listens and makes the day a little brighter.",
  },
  {
    id: "reporting",
    icon: "chat",
    title: "Regular reporting",
    body: "A WhatsApp report after every visit, with the doctor's advice, prescriptions, receipts and our observations, plus photos or a short video with your parent's consent.",
  },
  {
    id: "video-calls",
    icon: "video",
    title: "Video calls and a monthly summary",
    body: "Video calls with you arranged during visits, and a short monthly summary of how your parents are doing, based on our observations.",
  },
  {
    id: "extra-sessions",
    icon: "alert",
    title: "Extra sessions on request",
    body: "Physiotherapy and similar sessions are not part of the plan. Talk to us and we will arrange sessions, online or at home, and quote them separately.",
  },
];

export const CARE_HEADING = {
  kicker: "Your love, our hands.",
  title: "What we do",
  leads: [
    "Every care below is part of one plan, with each visit scheduled in advance with you and your parent. Caring for parents is more than doctor visits. What matters most is genuine connection — someone they feel at ease with.",    
  ],
};

export const CARE_ALSO = {
  comingSoon:
    "Doctor on call, nurse visits, physiotherapy sessions, yoga and nutrition guidance.",
  pleaseNote:
    "We are not a medical or emergency service. In an emergency, call 108 or 112. For property, utilities, repairs or legal matters, we will refer you to a suitable local professional.",
};

/* ——— coming soon services (#medical) ——— */

export const COMING_SOON_SECTION = {
  eyebrow: "Coming soon",
  title: "More services, coming soon",
  lead: "We are adding these services soon. They are not yet available; until they are, we accompany your parent to the doctor, nurse and laboratory they already use.",
  items: [
    {
      title: "Doctor on call",
      body: "Access to a registered doctor for consultations, through our partners.",
    },
    {
      title: "Nurse",
      body: "Home nursing visits through registered nursing partners.",
    },
    {
      title: "Physiotherapy sessions",
      body: "Sessions with a qualified physiotherapist, at home or online.",
    },
    {
      title: "Yoga",
      body: "Gentle yoga suited to your parent, at home or online.",
    },
    {
      title: "Nutrition",
      body: "Practical guidance on healthy eating for older adults.",
    },
  ],
  waContext: "please let me know when your new services are available.",
};

/* ——— care plan & pricing ——— */

export const PLAN_HEADING = {
  eyebrow: "Early access · limited founding family slots",
  title: "Care Plan – Both Parents",
  kicker: "We'll hold their hand while you're away.",
  lead: "One family plan that covers both parents: one 2-hour visit every week (4 visits, 8 hours a month) and a written report after each visit. Joining offer: 2 extra hours free in your first month.",
};

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

/* Owner-confirmed third tier (₹2,749 auto-renew) supersedes plan.mhtml,
   which lists only ₹2,999 and ₹7,999. */
export const PRICING: PricingTier[] = [
  {
    id: "monthly",
    kicker: "Monthly",
    title: "Monthly Plan",
    blurb: "Billed monthly. Cancel before the next billing date.",
    price: "₹2,999",
    unit: "* / month",
    bullets: [
      { text: "One 2-hour visit every week ", strong: "(8 hours a month)" },
      { text: "", strong: "Covers both parents" },
      { text: "2 extra hours free in your first month" },
      { text: "A written report after every visit" },
      { text: "", strong: "No lock-in" },
    ],
    cta: "Book Free Consultation",
    waText: "Hello We Care, I'd like to start the monthly plan.",
  },
  {
    id: "auto-renew",
    kicker: "Monthly · Auto-renew",
    title: "Auto-renewing Monthly",
    blurb:
      "Recurring subscription at the founding-family rate. Cancel before the next billing date.",
    price: "₹2,749",
    unit: "* / month",
    featured: true,
    ribbon: "Most popular · Auto-renews",
    bullets: [
      { text: "", strong: "Everything in the monthly plan" },
      { text: "₹250* less every month, on auto-renewal" },
      { text: "Billed automatically each month" },
      { text: "One 2-hour visit every week (8 hours a month)" },
      { text: "A written report after every visit" },
    ],
    cta: "Book Free Consultation",
    waText: "Hello We Care, I'd like the auto-renewing monthly plan at ₹2,749.",
  },
  {
    id: "quarterly",
    kicker: "3 months · Prepaid",
    title: "3-Month Plan",
    blurb: "About ₹2,666 per month. Paid in advance for the three months.",
    price: "₹7,999",
    unit: "* / 3 months",
    ribbon: "Best value · Prepaid",
    bullets: [
      { text: "About ", strong: "₹2,666 per month" },
      { text: "One 2-hour visit every week (8 hours a month)" },
      { text: "", strong: "Covers both parents" },
      { text: "Extra visits at ₹499* each for members" },
      { text: "A written report after every visit" },
    ],
    cta: "Book Free Consultation",
    waText: "Hello We Care, I'd like to start the 3-month plan.",
  },
];

export const PLAN_INCLUDED = [
  {
    title: "Covers both parents",
    body: "One plan for your mother and father together, at one fee.",
  },
  {
    title: "One visit a week",
    body: "A 2-hour visit every week, 4 visits and 8 hours a month. Or use your 8 hours as per your convenience; just let us know.",
  },
  {
    title: "Extra visits",
    body: "₹499* for each extra 2-hour visit, for members, whenever you need one.",
  },
  {
    title: "Joining offer",
    body: "2 extra hours free in your first month.",
  },
  {
    title: "Assistance outside service hours",
    body: "Non-emergency help outside service hours can be organised if needed. Please call us; we understand how important that is.",
  },
  {
    title: "A written report after every visit",
    body: "Sent the same day on WhatsApp: what took place, the doctor's advice and the next steps.",
  },
  {
    title: "Errands, paperwork and technology support",
    body: "Within your scheduled visits: groceries, bills, bank and office errands, and assistance with phones and video calls.",
  },
];

export const PLAN_NOT_INCLUDED =
  "Emergency services: in an emergency, call 108 or 112. Physiotherapy and other sessions: we arrange them on request and quote separately. Medicines, doctors' and laboratory fees: charged at actual cost.";

/* Free-visit sentence from plan.mhtml intentionally omitted (business override). */
export const PLAN_FOOTNOTES = [
  "Fees are payable in advance by UPI or bank transfer. Medicines, doctors' and laboratory fees, and any cab or ambulance for your parent, are charged at actual cost, with receipts. Our travel within Nagpur city is included.",
  "* GST, where applicable, will be added to these fees at the prevailing rate.",
];

/* ——— our promise (#promise) ——— */

export const PROMISE_TITLE = "What you can count on";

export const PROMISE_ICON_KEYS = [
  "accountable",
  "familiar",
  "transparent",
  "report",
  "private",
] as const;
export type PromiseIcon = (typeof PROMISE_ICON_KEYS)[number];

export type CarePromise = {
  icon: PromiseIcon; /* mapped to PROMISE_ICONS in icons.tsx */
  title: string;
  body: string;
};

export const PROMISES: CarePromise[] = [
  {
    icon: "accountable",
    title: "Accountable to you",
    body: "Every visit is scheduled with you in advance and reported to you on the same day.",
  },
  {
    icon: "familiar",
    title: "Familiar company",
    body: "Your parents are introduced to us before the first visit, so no one arrives as a stranger.",
  },
  {
    icon: "transparent",
    title: "Transparent fees",
    body: "The plan fee is published on this page. Anything outside it, such as medicines or consultation fees, is charged at actual cost, with receipts.",
  },
  {
    icon: "report",
    title: "Same-day reporting",
    body: "A written WhatsApp report follows every visit, and we respond to your messages the same day.",
  },
  {
    icon: "private",
    title: "Confidentiality",
    body: "We share your parent's health information only with you, and only with their consent.",
  },
];

/* ——— how it works (the ONLY place steps are enumerated) ———
   plan.mhtml step 2 ("Free first visit") replaced per business override:
   the flow begins at initial contact → planning → paid weekly visits. */
export const HOW_STEPS = [
  {
    n: 1,
    title: "Get in touch",
    body: "Message us on WhatsApp or send the form below. We will reply the same day.",
  },
  {
    n: 2,
    title: "We plan it with you",
    body: "We learn your parents' routine, doctors and preferences, and agree with you how your 8 hours a month are used and who to contact if needed.",
  },
  {
    n: 3,
    title: "Weekly visits",
    body: "We meet your parents every week, accompany them and stay for the whole visit. If you need us in between, you can reach us.",
  },
  {
    n: 4,
    title: "Your report",
    body: "The same day, on WhatsApp: what took place, the doctor's advice and the next steps.",
  },
];

/* ——— founder story (emotional climax) ——— */

export const FOUNDER = {
  title: "Why we started We Care",
  paragraphs: [
    "I spent more than two decades in the UK, working in hospitality operations, where I trained teams and coordinated people when things went wrong. I am now based in Nagpur, where my wife and I are building We Care together. I hold a UK DBS check from 2025.",
    "Living in the UK for so long taught me something many people living away from home will recognise. Our parents miss our presence, yet they rarely say so. Even when we call, somewhere along the way they tell us, “We are fine.” They have friends and relatives, but in today's world everyone is busy.",
    "That is why we created We Care: dependable, caring company that you can genuinely rely on. We attend as companions, not carers. We sit with your parents in the waiting room, we listen, and we make the day easier. You deal with us directly, not a call centre.",
  ],
  pull: "“We are fine.”",
  sign: "Founders, We Care",
  facts: [
    "20+ years in UK hospitality operations",
    "Every visit scheduled with you in advance",
    "UK DBS check, 2025",
    "Direct contact with the founders",
    "Based in Nagpur, Maharashtra",
  ],
};

/* ——— family stories (kept; cities corrected to Nagpur) ——— */

export const TESTIMONIALS = [
  {
    initials: "RK",
    tone: "green",
    quote:
      "Being in Singapore while my father was admitted for eye surgery in Nagpur was gut-wrenching. Our companion kept me updated every 30 minutes, handled the discharge papers, and tucked him in safely.",
    name: "Rahul K.",
    meta: "Son · Living in Singapore (Parents in Nagpur)",
  },
  {
    initials: "NS",
    tone: "peach",
    quote:
      "When my mother experienced sudden dizziness late evening, a We Care companion arrived in 25 minutes. They coordinated the clinic triage and stayed until I could arrange travel.",
    name: "Neha S.",
    meta: "Daughter · Living in Dubai (Mother in Nagpur)",
  },
  {
    initials: "SV",
    tone: "blue",
    quote:
      "My companion Ramesh helps me with banking forms and drives me to the park. It relieves my children from worrying about my routine, and restores my own independence.",
    name: "Mr. Shyamlal V. (69)",
    meta: "Retired Resident · Dharampeth, Nagpur",
  },
] as const;

/* ——— faq ——— */

export const FAQS = [
  {
    q: "Do you provide medical advice or medicines?",
    a: "No. We accompany, coordinate and report. We do not diagnose, advise on treatment or supply medicines. Medical decisions remain with your parent's doctor and your family.",
  },
  {
    q: "Do you provide emergency services?",
    a: "No. We Care is not an emergency service. In an emergency, please call 108 or 112. If your parent feels unwell while we are with them, we call for help and inform you and your nominated family contact straight away.",
  },
  {
    q: "Are you a medical or nursing service?",
    a: "No. We provide accompaniment and coordination, not medical care. If your parent needs a doctor, nurse, physiotherapist or laboratory, we can help you find and coordinate one.",
  },
  {
    q: "How do we get started?",
    a: "Tell us about your parents on WhatsApp or with the form. We will call to understand their routine, then schedule your first visit at a time that suits you and your parents.",
  },
  {
    q: "Is there a lock-in period?",
    a: "No. The monthly plan is billed monthly and you can cancel before the next billing date; the auto-renewing plan renews monthly and can likewise be cancelled before the next billing date. The 3-month plan is paid in advance for the three months. We are currently in early access with a limited number of founding family slots.",
  },
  {
    q: "Does the plan cover both parents?",
    a: "Yes. The Care Plan is one family plan for both parents, at one fee.",
  },
  {
    q: "Which cities is We Care available in?",
    a: "We are only in Nagpur for now. Families sign up from anywhere in India or abroad. Tell us where your parents live and we will confirm whether we can help, or prioritise your city for the next launch.",
  },
  {
    q: "How much does it cost?",
    a: "₹2,999* per month, ₹2,749* per month on an auto-renewing subscription, or ₹7,999* for 3 months, for both parents. *GST, where applicable, is added. Every plan includes one 2-hour visit a week (8 hours a month), with 2 extra hours free in your first month, extra visits at ₹499* each for members, assistance outside service hours if needed, and a written report after every visit. Medicines, doctors' and laboratory fees are charged at actual cost.",
  },
  {
    q: "What counts as a visit?",
    a: "A home visit, or one accompanied appointment such as a doctor, laboratory or bank, usually of 2 hours. You can also use your hours in one go, for example for a long hospital day. Visits are agreed in advance with you and your parent.",
  },
  {
    q: "Can I call outside service hours?",
    a: "Yes, for non-emergency help, which can be organised if needed. We are not an emergency service or a medical helpline: in an emergency, call 108 or 112.",
  },
  {
    q: "What if my parent needs more than one visit a week?",
    a: "Members can add extra 2-hour visits at ₹499* each, whenever you need them. Just tell us and we will book it.",
  },
  {
    q: "What if you are not available on the day?",
    a: "We take on a limited number of families so that every visit receives proper attention. If a visit cannot take place, you will be told as early as possible and it will be rescheduled. No one arrives at your parent's door without your knowledge.",
  },
];

/* ——— sample visit report (hero side card) ——— */

export const SAMPLE_REPORT = {
  title: "Visit report",
  tag: "Sample",
  rows: [
    { label: "Arrived", value: "Clinic at 10:05. Seen by the doctor at 10:30." },
    {
      label: "Consultation",
      value: "Continue current tablets. Repeat blood test in 4 weeks.",
    },
    {
      label: "Medicines",
      value: "Collected from the pharmacy. Bill attached (₹1,240).",
    },
    {
      label: "Observations",
      value: "In good spirits. Mentioned knee discomfort on the stairs.",
    },
    {
      label: "Next",
      value: "Follow-up on 2 November, 11:00. Booked.",
    },
  ],
  foot: "A report like this reaches you on WhatsApp after every visit.",
};

/* ——— contact (#contact) ——— */

export const CONTACT = {
  kicker: "Miles away, never alone.",
  title: "Book your visit",
  lead: "Tell us about your parents and we will reply the same day to fix a time for your first visit — wherever in the world you are.",
  fields: {
    name: { label: "Your name", placeholder: "" },
    base: { label: "Where you are based", placeholder: "e.g. London, Pune, Dubai" },
    area: { label: "Your parent's area in Nagpur", placeholder: "e.g. Dharampeth" },
    need: {
      label: "When would suit your parents?",
      options: ["Weekday morning", "Weekday afternoon", "Weekend", "Any time"],
    },
    note: {
      label: "Anything else we should know",
      hint: "Please leave out medical details. We will ask for these on a call.",
    },
  },
  submitLabel: "Book your visit",
  phone: "+91 93229 66592",
  waContext: "I'd like to book a visit for my parents.",
};

/* ——— booking modal ("Book your visit" flow) ———
   Step 1 embeds Calendly inline (auto-resize); step 2 mounts the
   RazorPay payment button once an appointment is confirmed.
   No backend: receipts are handled by the RazorPay button config. */

export const BOOKING = {
  title: "Book your visit",
  stepLabels: ["Schedule visit", "Confirm & pay"],
  calendlyUrl: "https://calendly.com/wecare-forparents/we-care-visit",
  calendlyScriptSrc: "https://assets.calendly.com/assets/external/widget.js",
  razorpayScriptSrc: "https://checkout.razorpay.com/v1/payment-button.js",
  razorpayButtonId: "pl_U3irBuIT4S0noQ",
  loading: "Loading the scheduler…",
  loadFailed:
    "The scheduler could not load here. You can open it in a new tab instead — it takes a minute.",
  openTab: "Open Calendly in a new tab",
  continueLabel: "Already picked a slot? Continue to payment",
  confirmTitle: "Your visit is scheduled.",
  confirmBody:
    "Calendly has sent the details to your inbox. Complete the payment below to lock the slot in — the confirmation reaches you automatically by email.",
  payNote: "Secure payment via Razorpay · confirmation emailed to you",
  payFailed:
    "The payment button could not load here. Message us on WhatsApp and we will sort it out together.",
  helpContext: "I've scheduled a visit and need help with the payment.",
};

export const FOOTER = {
  brandLine: "We Care ♥♥ · Nagpur, Maharashtra",
  disclaimer:
    "We Care provides accompaniment and coordination. We are not a medical or emergency service; in an emergency, call 108 or 112.",
};

export const NAV_LINKS = [
  { href: "#what", label: "What we do" },
  { href: "#how", label: "How it works" },
  { href: "#plan", label: "The plan" },
  { href: "#story", label: "Our story" },
  { href: "#faq", label: "FAQ" },
];

/* VisitStage's "week of care" vignette copy — hero animation data. */
export const VISIT_DEMO = {
  initials: "AK",
  place: "Dharampeth, Nagpur",
  note: "Doctor's advice noted, medicines collected. Back home safely with tea on the table.",
  family: "Family abroad, connected",
  greeting: "Namaste, Aunty — here's Ananya",
  together: "A walk, tea, and a real conversation",
  reportLine: "A written report on WhatsApp, the same day",
};
