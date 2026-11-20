"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BRAND,
  HERO_BADGES,
  LIVE_CITIES,
  ROTATING_PHRASES,
} from "@/lib/content";
import { ArrowRight, BADGE_ICONS } from "./icons";
import Reveal from "./Reveal";
import VisitStage from "./VisitStage";

/* ——— line-art city landmarks (stroke-draw on activation) ——— */

function Landmark({ city }: { city: string }) {
  const paths: Record<string, string[]> = {
    /* Vidhana Soudha — dome + colonnade */
    Bangalore: [
      "M4 42H44",
      "M8 42V26H40V42",
      "M8 30H40",
      "M13 42V33M19 42V33M25 42V33M31 42V33M37 42V33",
      "M16 26V20H32V26",
      "M16 20Q24 8 32 20",
      "M24 12V7",
    ],
    /* Bara Imambara — grand arch facade */
    Lucknow: [
      "M4 42H44",
      "M10 42V22H38V42",
      "M18 42V32Q18 25 24 21Q30 25 30 32V42",
      "M12 22C17 20 20 14 24 8C28 14 31 20 36 22",
      "M24 8V5",
      "M6 42V24H10M42 42V24H38",
    ],
    /* Deekshabhoomi — stupa dome */
    Nagpur: [
      "M4 42H44",
      "M8 42V38H40V42",
      "M11 38V33H37V38",
      "M11 33A13 13 0 0 1 37 33",
      "M20 20.5V16H28V20.5",
      "M24 16V9",
      "M21 9H27",
    ],
  };
  const d = paths[city] ?? paths.Bangalore;
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.map((p, i) => (
        <path key={`g${i}`} className="ghost" d={p} />
      ))}
      {d.map((p, i) => (
        <path key={`d${i}`} d={p} pathLength={1} style={{ ["--k" as string]: i }} />
      ))}
    </svg>
  );
}

/* ——— "Live in" pill with sliding pastel thumb ——— */

function CityChips() {
  const [on, setOn] = useState(0);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thumbRef = useRef<HTMLSpanElement | null>(null);
  const wrapRef = useRef<HTMLParagraphElement | null>(null);

  const place = (idx: number) => {
    const chip = chipRefs.current[idx];
    const thumb = thumbRef.current;
    if (!chip || !thumb) return;
    thumb.style.width = `${chip.offsetWidth}px`;
    thumb.style.transform = `translate(${chip.offsetLeft}px, 0)`;
  };

  useLayoutEffect(() => {
    place(on);
    const onResize = () => place(on);
    window.addEventListener("resize", onResize);
    /* re-measure once webfont settles */
    document.fonts?.ready.then(() => place(on));
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setOn((v) => (v + 1) % LIVE_CITIES.length);
    }, 3000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <p className="wc-livein" ref={wrapRef}>
      <span className="sr-only">
        Live in {LIVE_CITIES.map((c) => c.name).join(", ")}
      </span>
      <span
        ref={thumbRef}
        aria-hidden="true"
        className={`wc-livein-thumb c-${LIVE_CITIES[on].tone}`}
      />
      <span className="wc-livein-t" aria-hidden="true">
        Live in
      </span>
      {LIVE_CITIES.map((c, i) => (
        <span
          key={c.name}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          aria-hidden="true"
          className={`wc-lc c-${c.tone} ${i === on ? "is-on" : ""}`}
        >
          <span className="wc-lc-g">
            <Landmark city={c.name} />
          </span>
          {c.name}
        </span>
      ))}
    </p>
  );
}

/* ——— rotating highlighted phrases in the H1 ——— */

function RotatingWords() {
  const [on, setOn] = useState(0);
  const boxRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const fit = (idx: number) => {
    const box = boxRef.current;
    const word = wordRefs.current[idx];
    if (box && word) box.style.width = `${word.offsetWidth}px`;
  };

  useLayoutEffect(() => {
    fit(on);
    const onResize = () => fit(on);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => fit(on));
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setOn((v) => (v + 1) % ROTATING_PHRASES.length);
    }, 2600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <span className="wc-rot">
      <span className="wc-rot-box" ref={boxRef}>
        {ROTATING_PHRASES.map((p, i) => (
          <span
            key={p.text}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={`wc-rot-w ${i === on ? "is-on" : ""}`}
            style={{ gridArea: "1 / 1" }}
            aria-hidden="true"
          >
            <span className={`wc-mark t-${p.tone}`}>{p.text}</span>
          </span>
        ))}
      </span>
      <span className="sr-only">
        {" "}
        at the hospital, at home, at the bank, for the errands and for the
        readings.
      </span>
    </span>
  );
}

/* ——— hero ——— */

export default function Hero() {
  return (
    <section className="wc-hero" id="top">
      <div className="wc-container">
        <Reveal delay={0}>
          <CityChips />
        </Reveal>

        <Reveal delay={80}>
          <h1 className="wc-display" style={{ marginTop: 26 }}>
            Someone there
            <br />
            for your parents,
            <RotatingWords />
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="wc-hero-lead">{BRAND.lead}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="wc-hero-cta">
            <a className="wc-btn lg" href="#book">
              Book a Care Visit <ArrowRight size={18} className="wc-arrow" />
            </a>
            <a className="wc-btn lg ghost" href="#pricing">
              Explore Plans &amp; Pricing
            </a>
          </div>
          <p className="wc-hero-note">
            From ₹199 for the first hour · then ₹100 per 30 min · no account
            needed
          </p>
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