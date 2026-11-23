"use client";

import { useState } from "react";
import { FAQS, consultLink } from "@/lib/content";
import { Chevron, WhatsApp } from "./icons";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="wc-sec" id="faq">
      <div className="wc-container">
        <div className="wc-faq-grid">
          <Reveal className="wc-faq-side">
            <div className="wc-head left" style={{ margin: 0 }}>
              <span className="wc-kicker">FAQ</span>
              <h2 className="wc-h2">Questions, answered.</h2>
              <p className="wc-sub">
                The things families ask us most before their first visit.
              </p>
            </div>
            <div className="wc-faq-cta">
              <a
                className="wc-btn sm"
                href={consultLink("I have a question about your eldercare companion service.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp size={16} /> Book Free Consultation
              </a>
              <span>We reply the same day.</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="wc-faq">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`wc-faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="wc-faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <Chevron size={19} />
                  </button>
                  <div className="wc-faq-a" id={`faq-a-${i}`} role="region">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}