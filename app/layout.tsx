import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { FAQS, PRICING, BRAND } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/* TODO: replace with the real production domain before shipping. */
const SITE_URL = "https://wecareforparents.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "We Care — Companionship & coordination for your parents in Nagpur",
  description:
    "Founded and run by the Jaiswal family in Nagpur. Weekly visits, doctor accompaniment, errands and a written report after every visit — one plan covering both parents, from ₹2,749 a month.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "We Care — Their companion. Your peace of mind.",
    description:
      "Attentive, dependable support for your parents in Nagpur, wherever in the world you are.",
    type: "website",
    url: SITE_URL,
    siteName: "We Care",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "We Care — Their companion. Your peace of mind.",
    description:
      "Attentive, dependable support for your parents in Nagpur, wherever in the world you are.",
  },
};

/* Structured data for SEO rich results and AEO/GEO answer engines.
   FAQ answers are collapsed behind JS in the DOM, so the JSON-LD graph
   is what makes the facts reliably extractable by non-rendering crawlers.
   Sources: PRICING, FAQS and BRAND — keep in sync via lib/content.ts. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#business`,
      name: "We Care",
      description:
        "Companionship and coordination service for the parents of families living away from Nagpur. Weekly visits, doctor accompaniment, errands and a written report after every visit.",
      slogan: BRAND.tagline,
      url: SITE_URL,
      telephone: "+91-93229-66592",
      priceRange: "₹2,749 - ₹7,999",
      founder: { "@type": "Person", name: "Jaiswal family" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nagpur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 21.1458, longitude: 79.0882 },
      areaServed: { "@type": "City", name: "Nagpur" },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "23:59",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Care Plan — Both Parents",
        itemListElement: PRICING.map((p) => ({
          "@type": "Offer",
          name: p.title,
          priceCurrency: "INR",
          price: p.price.replace(/[₹,]/g, ""),
          description: p.blurb,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* Enables scroll-reveal hiding only when JS runs and motion is allowed,
   so content is never invisible without JS or for reduced-motion users. */
const motionScript = `
(function(){
  try {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("motion");
    }
  } catch(e){}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* motion class is added pre-hydration by the head script */
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}