"use client";

import { useState } from "react";
import {
  LIVE_CITIES,
  MAX_HOURS,
  MIN_HOURS,
  PRICE_FIRST_HOUR,
  PRICE_PER_EXTRA_30MIN,
  SERVICES,
  visitPrice,
  waLink,
} from "@/lib/content";
import { ArrowRight, SERVICE_ICONS, WhatsApp } from "./icons";
import Reveal from "./Reveal";

export default function BookEstimator() {
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [hours, setHours] = useState(2);
  const [city, setCity] = useState(LIVE_CITIES[0].name);

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];
  const total = visitPrice(hours);
  const extraHalfHours = Math.max(0, Math.round((hours - 1) * 2));

  const waText = `Hi We Care, I'd like to book a visit in ${city} for ${hours} hour${hours > 1 ? "s" : ""} — ${service.title} (estimated ₹${total}). Please confirm availability.`;

  return (
    <section className="wc-sec wc-book" id="book">
      <div className="wc-container">
        <Reveal className="wc-head">
          <span className="wc-kicker">No account needed</span>
          <h2 className="wc-h2">Book a visit in a minute.</h2>
          <p className="wc-sub">
            Pick what is needed, where and for how long. You see the exact
            price before you confirm — clear pricing, no surprise fees.
          </p>
        </Reveal>

        <Reveal delay={120} className="wc-bookcard">
          <div className="wc-book-picks">
            <div>
              <span className="wc-book-label">What is needed</span>
              <div className="wc-pick-row" role="radiogroup" aria-label="Service">
                {SERVICES.map((s) => {
                  const Ico = SERVICE_ICONS[s.icon];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={serviceId === s.id}
                      className={`wc-pick t-${s.tone} ${serviceId === s.id ? "is-on" : ""}`}
                      onClick={() => setServiceId(s.id)}
                    >
                      <Ico size={17} />
                      {s.id === "medical"
                        ? "Medical escort"
                        : s.id === "wellness"
                          ? "In-home wellness"
                          : "Errands & banking"}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="wc-book-label">For how long</span>
              <div className="wc-stepper">
                <button
                  type="button"
                  aria-label="Less time"
                  disabled={hours <= MIN_HOURS}
                  onClick={() => setHours((h) => Math.max(MIN_HOURS, h - 0.5))}
                >
                  −
                </button>
                <output aria-live="polite">
                  {hours} hour{hours > 1 ? "s" : ""}
                  <small>30-minute steps</small>
                </output>
                <button
                  type="button"
                  aria-label="More time"
                  disabled={hours >= MAX_HOURS}
                  onClick={() => setHours((h) => Math.min(MAX_HOURS, h + 0.5))}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <span className="wc-book-label">Your parent&apos;s city</span>
              <div className="wc-pick-row" role="radiogroup" aria-label="City">
                {LIVE_CITIES.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    role="radio"
                    aria-checked={city === c.name}
                    className={`wc-pick t-${c.tone} ${city === c.name ? "is-on" : ""}`}
                    onClick={() => setCity(c.name)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="wc-book-sum">
            <h3>Your visit</h3>
            <div className="wc-sum-rows">
              <div className="wc-sum-row">
                <span>{service.title}</span>
                <b>{city}</b>
              </div>
              <div className="wc-sum-row">
                <span>First hour</span>
                <b>₹{PRICE_FIRST_HOUR}</b>
              </div>
              <div className="wc-sum-row">
                <span>
                  Extra time · {extraHalfHours} × 30 min @ ₹
                  {PRICE_PER_EXTRA_30MIN}
                </span>
                <b>₹{extraHalfHours * PRICE_PER_EXTRA_30MIN}</b>
              </div>
            </div>
            <div className="wc-sum-total">
              <span>Estimated total</span>
              <b>₹{total}</b>
            </div>
            <a
              className="wc-btn lg light wide"
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp size={19} /> Book on WhatsApp
              <ArrowRight size={18} className="wc-arrow" />
            </a>
            <small className="wc-fine">
              A care coordinator confirms your companion within minutes.
            </small>
          </div>
        </Reveal>
      </div>
    </section>
  );
}