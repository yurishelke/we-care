"use client";

import { BRAND, HERO_BADGES, HERO_NOTE, consultLink } from "@/lib/content";
import { useBooking } from "./BookingContext";
import { ArrowRight, BADGE_ICONS } from "./icons";
import Reveal from "./Reveal";
import VisitStage from "./VisitStage";

/* ——— hero ———
   Nagpur only: no city chips, no rotating words. The stage below shows
   an emotional vignette ("a week of care"), never the process steps —
   those live only in How it works. */

export default function Hero() {
  const { openBooking } = useBooking();
  return (
    <section className="wc-hero" id="top">
      <div className="wc-container">
        <Reveal delay={0}>
          <p className="wc-hero-tag">{BRAND.eyebrow}</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="wc-display" style={{ marginTop: 26 }}>
            {BRAND.headline}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="wc-hero-lead">{BRAND.lead}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="wc-hero-cta">
            <button type="button" className="wc-btn lg" onClick={openBooking}>
              Book your visit <ArrowRight size={18} className="wc-arrow" />
            </button>
            <a
              className="wc-btn lg ghost"
              href={consultLink(
                "I'd like to know more about caring for my parents."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Consultation
            </a>
          </div>
          <p className="wc-hero-note">{HERO_NOTE}</p>
        </Reveal>

        <Reveal delay={320}>
          <VisitStage />
        </Reveal>

        <div className="wc-badges">
          {HERO_BADGES.map((b, i) => {
            const Ico = BADGE_ICONS[b.icon];
            return (
              <Reveal key={b.title} delay={i * 90} className="wc-badge">
                <Ico size={24} />
                <span>
                  <b>{b.title}</b>
                  <small>{b.sub}</small>
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
