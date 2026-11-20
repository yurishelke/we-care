"use client";

import { useEffect, useState } from "react";
import { HOW_STEPS, VISIT_DEMO } from "@/lib/content";
import { ArrowRight, CheckCircle, Clock, NoteIcon, Verified } from "./icons";
import Reveal from "./Reveal";

const STEP_MS = 3400;

export default function HowItWorks() {
  const [idx, setIdx] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setIdx((v) => (v + 1) % HOW_STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(t);
  }, [resetKey]);

  const pick = (i: number) => {
    setIdx(i);
    setResetKey((k) => k + 1); /* restart the auto-cycle from the picked step */
  };

  return (
    <section className="wc-sec wc-how" id="how">
      <div className="wc-container">
        <Reveal className="wc-head left">
          <span className="wc-kicker">How it works</span>
          <h2 className="wc-h2">You will know every step of it.</h2>
          <p className="wc-sub">
            From wherever you are, on your phone — booked, verified,
            authenticated at the door, and reported back the same day.
          </p>
        </Reveal>

        <div className="wc-how-grid">
          <Reveal delay={100}>
            <div className="wc-how-steps" role="tablist" aria-label="Visit steps">
              {HOW_STEPS.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  role="tab"
                  aria-selected={idx === i}
                  className={`wc-how-step ${idx === i ? "is-on" : ""}`}
                  onClick={() => pick(i)}
                >
                  <span className="wc-how-step-n">{s.n}</span>
                  <span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </span>
                </button>
              ))}
            </div>
            <div className="wc-how-cta">
              <a className="wc-btn" href="#book">
                Book a visit <ArrowRight size={17} className="wc-arrow" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={200} className="wc-phone-zone">
            <div className="wc-phone" aria-hidden="true">
              <div className="wc-phone-screen">
                <span className="wc-phone-notch" />
                <div className="wc-phone-status">
                  <span>9:41</span>
                  <span>We Care</span>
                </div>
                <div className="wc-phone-body">
                  {/* 1 · booked */}
                  <div className={`wc-screen ${idx === 0 ? "is-on" : ""}`}>
                    <span className="wc-screen-title">Visit booked</span>
                    <div className="wc-mini-card">
                      <small>Hospital trip · {VISIT_DEMO.place}</small>
                      <b>Tuesday · 10:00 AM · 2 hours</b>
                    </div>
                    <div className="wc-mini-card wc-mini-row">
                      <Clock size={18} />
                      <span>
                        <small>Payment</small>
                        <b>Paid online · ₹399</b>
                      </span>
                    </div>
                    <span className="wc-pill-ok">
                      <CheckCircle size={13} /> Confirmed
                    </span>
                  </div>

                  {/* 2 · on the way */}
                  <div className={`wc-screen ${idx === 1 ? "is-on" : ""}`}>
                    <span className="wc-screen-title">On her way</span>
                    <div className="wc-route">
                      <svg viewBox="0 0 300 110" preserveAspectRatio="none">
                        <path
                          className="wc-route-path"
                          d="M42 74 C 104 92, 150 18, 232 26"
                          fill="none"
                          stroke="var(--bar)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="42" cy="74" r="5" fill="var(--chip)" stroke="var(--mut)" strokeWidth="1.5" />
                        <circle cx="232" cy="26" r="5" fill="var(--green)" stroke="var(--on-green)" strokeWidth="1.5" />
                      </svg>
                      <span className="wc-route-dot" />
                    </div>
                    <div className="wc-mini-card wc-mini-row">
                      <span className="wc-mini-ava">{VISIT_DEMO.initials}</span>
                      <span>
                        <b>{VISIT_DEMO.companion}</b>
                        <small>Police-verified · We Care ID</small>
                      </span>
                    </div>
                    <span className="wc-pill-ok">
                      <Clock size={13} /> 8 min away
                    </span>
                  </div>

                  {/* 3 · at the door */}
                  <div className={`wc-screen ${idx === 2 ? "is-on" : ""}`}>
                    <span className="wc-screen-title">At the door</span>
                    <div className="wc-mini-card">
                      <small>{VISIT_DEMO.parent} reads out the PIN</small>
                      <b>One-time code for this visit</b>
                    </div>
                    <div className="wc-phone-pin">
                      {VISIT_DEMO.pin.map((d, i) => (
                        <span key={i} style={{ ["--k" as string]: i }}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <span className="wc-pill-ok">
                      <Verified size={13} /> PIN matched
                    </span>
                  </div>

                  {/* 4 · visit note */}
                  <div className={`wc-screen ${idx === 3 ? "is-on" : ""}`}>
                    <span className="wc-screen-title">Visit note</span>
                    <div className="wc-mini-card">
                      <small>
                        <NoteIcon size={13} /> {VISIT_DEMO.vitals}
                      </small>
                      <b>2 prescription changes logged</b>
                    </div>
                    {[92, 100, 78, 96, 60].map((w, i) => (
                      <span
                        key={i}
                        className="wc-note-line"
                        style={{ width: `${w}%`, ["--k" as string]: i }}
                      />
                    ))}
                    <span className="wc-pill-ok">
                      <CheckCircle size={13} /> Shared with family
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}