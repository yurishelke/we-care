import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...rest }: P): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...rest,
  };
}

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const CheckCircle = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.2l2.4 2.4 4.6-5" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg {...base(p)} strokeWidth={1.8}>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
    <path d="M9 8.8c-.3 2.6 3.6 6.5 6.2 6.2l.9-1.4-2-1.2-.9.7c-.9-.4-1.9-1.4-2.3-2.3l.7-.9-1.2-2-1.4.9Z" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l7 2.6v5.6c0 4.6-3 7.6-7 9.8-4-2.2-7-5.2-7-9.8V5.6L12 3Z" />
    <path d="M9 11.8l2.2 2.2 3.8-4.2" />
  </svg>
);

export const Heart = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);

export const HandHeart = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 8.2s-2.6-1.7-2.6-3.5A1.6 1.6 0 0 1 12 3.6a1.6 1.6 0 0 1 2.6 1.1c0 1.8-2.6 3.5-2.6 3.5Z" />
    <path d="M4 13.5h3l3.2 1.2h3.3a1.2 1.2 0 0 1 0 2.4H10" />
    <path d="M7 17.5l6.8 2.3c.6.2 1.3.1 1.8-.3l4.9-3.6a1.3 1.3 0 0 0-1.5-2.1l-2.7 1.5" />
    <path d="M4 12.5v7" />
  </svg>
);

export const Lock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <path d="M12 14.5v2" />
  </svg>
);

export const NoteIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 3.5h9L19 7.5v13H6v-17Z" />
    <path d="M14.5 3.5v4.5H19" />
    <path d="M9 12h6M9 15.5h6" />
  </svg>
);

export const Pin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </svg>
);

export const Verified = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.8l2.2 1.6 2.7-.3 1 2.5 2.5 1-.3 2.7 1.6 2.2-1.6 2.2.3 2.7-2.5 1-1 2.5-2.7-.3-2.2 1.6-2.2-1.6-2.7.3-1-2.5-2.5-1 .3-2.7L2.3 12l1.6-2.2-.3-2.7 2.5-1 1-2.5 2.7.3L12 2.8Z" />
    <path d="M8.8 12.2l2.2 2.2 4.2-4.6" />
  </svg>
);

export const Calendar = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
    <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    <path d="M9 14.5l2 2 4-4" />
  </svg>
);

export const Hospital = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20.5h16" />
    <path d="M6 20.5V7l6-3.5L18 7v13.5" />
    <path d="M12 8v5M9.5 10.5h5" />
    <path d="M10 20.5v-3.5h4v3.5" />
  </svg>
);

export const HomeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 11l8-7 8 7" />
    <path d="M6 9.5V20h12V9.5" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

export const Bank = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 9.5L12 4l8.5 5.5h-17Z" />
    <path d="M5.5 9.5v8M9.5 9.5v8M14.5 9.5v8M18.5 9.5v8" />
    <path d="M3.5 20h17M4.5 17.5h15" />
  </svg>
);

export const Star = (p: P) => (
  <svg {...base(p)} fill="currentColor" strokeWidth={1}>
    <path d="M12 3.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.3 6.9 19l1.1-5.6-4.2-3.9 5.7-.7L12 3.6Z" />
  </svg>
);

export const PhoneCall = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l1.5 4.5-2.2 1.6a12 12 0 0 0 5.6 5.6l1.6-2.2L20 15v4a1.8 1.8 0 0 1-2 1.8C10.5 20 4 13.5 3.2 6A1.8 1.8 0 0 1 5 4Z" />
  </svg>
);

export const Chevron = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 9.5l6 6 6-6" />
  </svg>
);

export const Video = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="6.5" width="13" height="11" rx="2.5" />
    <path d="M16 10.5l5-2.5v8l-5-2.5" />
  </svg>
);

export const Vitals = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 12h4l2-5 3.5 10 2.5-5h6" />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const Users = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3 2.8-4.7 5.5-4.7s4.9 1.7 5.5 4.7" />
    <path d="M15.5 5.8a3.2 3.2 0 0 1 0 5.9M17.8 15.1c1.6.7 2.5 2.1 2.9 4.4" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4l1.8 4.7L18.5 10l-4.7 1.8L12 16.5l-1.8-4.7L5.5 10l4.7-1.3L12 4Z" />
    <path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
  </svg>
);

export const SERVICE_ICONS = {
  hospital: Hospital,
  home: HomeIcon,
  bank: Bank,
} as const;

export const TRUST_ICONS = {
  shield: Shield,
  heart: Heart,
  lock: Lock,
  note: NoteIcon,
} as const;

export const BADGE_ICONS = {
  verified: Verified,
  pin: Pin,
  note: NoteIcon,
  calendar: Calendar,
} as const;