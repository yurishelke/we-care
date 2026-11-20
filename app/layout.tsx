import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Care — Dedicated Eldercare & Companion Support",
  description:
    "Professional, vetted care companions for your parents in Bangalore, Lucknow and Nagpur. Hospital escorts, in-home wellness and errands — from ₹199 for the first hour, with live visit updates on your phone.",
  openGraph: {
    title: "We Care — Someone there for your parents",
    description:
      "Dedicated, compassionate care companions. Book by the hour or choose a monthly plan — with complete peace of mind on your phone.",
    type: "website",
  },
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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}