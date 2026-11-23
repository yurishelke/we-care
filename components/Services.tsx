"use client";

import { CARE_ALSO, CARE_HEADING, CARE_SERVICES } from "@/lib/content";
import { useBooking } from "./BookingContext";
import { ArrowRight, CARE_ICONS } from "./icons";
import Reveal from "./Reveal";

const TONES = ["green", "peach", "blue", "yellow", "lilac"] as const;

/* "What we do" — the plan's eight cards. This section sells breadth of
   care only: no per-card CTAs, no process steps (those live in #how). */

export default function Services() {
  const { openBooking } = useBooking();
  return (
    <section className="wc-sec" id="what">
      <div className="wc-container">
        <Reveal className="wc-head left">
          <span className="wc-kicker">{CARE_HEADING.kicker}</span>
          <h2 className="wc-h2">{CARE_HEADING.title}</h2>
          {CARE_HEADING.leads.map((l) => (
            <p className="wc-sub" key={l}>
              {l}
            </p>
          ))}
        </Reveal>

        <div className="wc-services-grid wc-care-grid">
          {CARE_SERVICES.map((s, i) => {
            const Ico = CARE_ICONS[s.icon];
            return (
              <Reveal
                key={s.id}
                delay={(i % 4) * 90}
                className={`wc-service wc-care-card t-${TONES[i % TONES.length]}`}
              >
                <span className="wc-ico-tile">
                  <Ico size={26} />
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p className="blurb">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="wc-also">
          <div className="wc-also-item t-yellow">
            <span className="wc-also-tag">Coming soon</span>
            <p>{CARE_ALSO.comingSoon}</p>
          </div>
          <div className="wc-also-item t-blue">
            <span className="wc-also-tag">Please note</span>
            <p>{CARE_ALSO.pleaseNote}</p>
          </div>
        </Reveal>

        <Reveal delay={100} className="wc-care-cta">
          <button type="button" className="wc-btn lg" onClick={openBooking}>
            Book your visit <ArrowRight size={18} className="wc-arrow" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
