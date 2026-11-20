"use client";

import { useEffect, useRef } from "react";
import { waLink } from "@/lib/content";
import { ArrowRight, Calendar } from "./icons";
import Reveal from "./Reveal";

/* three soft sine fields drifting along the bottom of the ink card */
const WAVES = [
  { color: "rgba(169, 204, 98, 0.55)", amp: 16, len: 0.008, speed: 0.00042, base: 0.78, phase: 0 },
  { color: "rgba(143, 176, 74, 0.4)", amp: 22, len: 0.006, speed: 0.0003, base: 0.85, phase: 2.1 },
  { color: "rgba(205, 229, 239, 0.2)", amp: 28, len: 0.0045, speed: 0.00022, base: 0.92, phase: 4.2 },
];

function Waves() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const wv of WAVES) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 6) {
          const y =
            h * wv.base +
            Math.sin(x * wv.len + t * wv.speed + wv.phase) * wv.amp +
            Math.sin(x * wv.len * 2.3 + t * wv.speed * 1.6) * (wv.amp * 0.35);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wv.color;
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      raf = 0;
      if (visible && !document.hidden) draw(t);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!raf && visible && !reduced) raf = requestAnimationFrame(loop);
    };

    size();
    if (reduced) {
      draw(1200); /* one calm static frame */
    } else {
      kick();
    }

    const ro = new ResizeObserver(() => {
      size();
      if (reduced) draw(1200);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    const onVis = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="wc-waves" aria-hidden="true" />;
}

export default function ClosingCta() {
  return (
    <section className="wc-sec" style={{ paddingTop: 0 }}>
      <div className="wc-container">
        <Reveal className="wc-closecard">
          <Waves />
          <div className="wc-closecard-in">
            <h2 className="wc-display sm">
              Give your parents the dedicated care they deserve.
            </h2>
            <p>
              From ₹199 for the first hour · Bangalore, Lucknow &amp; Nagpur.
              A verified companion can be at their door today.
            </p>
            <div className="wc-hero-cta">
              <a className="wc-btn lg light" href="#book">
                Book a Care Visit <ArrowRight size={18} className="wc-arrow" />
              </a>
              <a
                className="wc-btn lg outline"
                href={waLink("Hi We Care, I'd like to schedule a consultation about care for my parents.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar size={18} /> Schedule a Consultation
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}