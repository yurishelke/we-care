"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HOW_STEPS } from "@/lib/content";
import { useBooking } from "./BookingContext";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

/* "The Care Journey" — a compact, self-contained loop.
   A head travels the path on a timer (~1s per step, no scroll dependency):
   each station lights as it arrives and swaps its step card, then the walk
   restarts. Different mechanics from the hero's timed card crossfade
   (travel + draw vs. crossfade).
   Reduced-motion / no-JS: static numbered list. */

const D =
  "M52 352 C 132 396, 214 368, 226 306 C 236 254, 172 218, 216 170 " +
  "C 262 120, 388 186, 446 146 C 492 114, 470 58, 540 46 C 580 39, 600 56, 606 78";
/* station positions as fractions of the path length */
const STATION_AT = [0.08, 0.4, 0.72, 0.95];
const VB = { w: 640, h: 420 };

/* ~3s per stage: a segment travels to a station (~1s) and then holds on it
   (2s of quiet reading time) before the next hop starts */
const TRAVEL_MS = 1000;
const READ_MS = 2000;
type Seg = { from: number; target: number; ms: number };
const SEGMENTS: Seg[] = (() => {
  const segs: Seg[] = [];
  let cur = 0;
  for (const at of STATION_AT) {
    segs.push({ from: cur, target: at, ms: TRAVEL_MS });
    segs.push({ from: at, target: at, ms: READ_MS });
    cur = at;
  }
  return segs;
})();
const CYCLE_MS = SEGMENTS.reduce((s, g) => s + g.ms, 0);

const easeInOut = (u: number) =>
  u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;

export default function HowItWorks() {
  const { openBooking } = useBooking();
  const [journey, setJourney] = useState(false);
  const [active, setActive] = useState(0);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<SVGPathElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const lenRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setJourney(true);
    }
  }, []);

  /* station + head coordinates live in viewBox units, measured from the path */
  useLayoutEffect(() => {
    if (!journey) return;
    const place = () => {
      const path = ghostRef.current;
      if (!path) return;
      lenRef.current = path.getTotalLength();
      setPts(
        STATION_AT.map((f) => {
          const q = path.getPointAtLength(f * lenRef.current);
          return { x: q.x, y: q.y };
        })
      );
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [journey]);

  /* the cycle itself: travel, hold ~2s on each card, loop */
  useEffect(() => {
    if (!journey) return;
    const el = pinRef.current;
    const path = ghostRef.current;
    const head = headRef.current;
    if (!el || !path || !head) return;

    let raf = 0;
    let prev = performance.now();
    let acc = 0;

    const walk = (p: number) => {
      el.style.setProperty("--p", p.toFixed(4));
      const q = path.getPointAtLength(p * lenRef.current);
      head.setAttribute("transform", `translate(${q.x} ${q.y})`);
      let next = 0;
      for (let i = 0; i < STATION_AT.length; i++) {
        if (p >= STATION_AT[i] - 0.02) next = i;
      }
      setActive((v) => (v === next ? v : next));
    };

    const frame = (now: number) => {
      if (document.hidden) prev = now; /* freeze instead of jumping ahead */
      acc += now - prev;
      prev = now;
      const t = acc % CYCLE_MS;
      let p = 0;
      let done = 0;
      for (const seg of SEGMENTS) {
        if (t <= done + seg.ms) {
          p = seg.from + (seg.target - seg.from) * easeInOut((t - done) / seg.ms);
          break;
        }
        done += seg.ms;
        p = seg.target;
      }
      walk(p);
      raf = requestAnimationFrame(frame);
    };

    walk(0);
    prev = performance.now();
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [journey, pts]);

  return (
    <section className="wc-sec wc-how" id="how">
      <div className="wc-container">
        <Reveal className="wc-head left">
          <span className="wc-kicker">From wherever you are</span>
          <h2 className="wc-h2">How it works</h2>
          <p className="wc-sub">
            Four steps, and you&apos;re part of every one of them.
          </p>
        </Reveal>
      </div>

      {journey ? (
        <div className="wc-container">
          <div className="wc-journey" ref={pinRef}>
            <div className="wc-journey-grid">
              <div className="wc-journey-map" aria-hidden="true">
                <svg viewBox={`0 0 ${VB.w} ${VB.h}`} fill="none">
                  <path
                    ref={ghostRef}
                    className="wc-journey-ghost"
                    d={D}
                    pathLength={1}
                  />
                  <path className="wc-journey-line" d={D} pathLength={1} />
                  <g ref={headRef}>
                    <circle className="wc-journey-halo" r="13" />
                    <circle className="wc-journey-head" r="7" />
                  </g>
                </svg>
                {pts.map((pt, i) => (
                  <span
                    key={i}
                    className={`wc-journey-station ${
                      i < active ? "is-done" : ""
                    } ${i === active ? "is-on" : ""}`}
                    style={{
                      left: `${(pt.x / VB.w) * 100}%`,
                      top: `${(pt.y / VB.h) * 100}%`,
                    }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>

              <div className="wc-journey-cards">
                <div className="wc-j-stack">
                  {HOW_STEPS.map((s, i) => (
                    <div
                      key={s.n}
                      className={`wc-how-step wc-j-card ${
                        i === active ? "is-on" : ""
                      }`}
                      aria-hidden={i !== active}
                    >
                      <span className="wc-how-step-n">{s.n}</span>
                      <span>
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="wc-how-cta">
                  <button type="button" className="wc-btn" onClick={() => openBooking()}>
                    Book your visit <ArrowRight size={17} className="wc-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wc-container">
          <div className="wc-how-steps wc-how-static">
            {HOW_STEPS.map((s) => (
              <div key={s.n} className="wc-how-step">
                <span className="wc-how-step-n">{s.n}</span>
                <span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </span>
              </div>
            ))}
          </div>
          <div className="wc-how-cta">
            <button type="button" className="wc-btn" onClick={() => openBooking()}>
              Book your visit <ArrowRight size={17} className="wc-arrow" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
