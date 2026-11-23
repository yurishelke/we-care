"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { CONTACT, PLAN_HEADING, waLink } from "@/lib/content";
import { ArrowRight, PhoneCall } from "./icons";
import Reveal from "./Reveal";

/* #contact — the closing urgency band and the form, per plan.mhtml.
   Submitting opens WhatsApp with the filled details; there is no
   backend yet. Free-visit framing removed per business override. */

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

type FormState = {
  name: string;
  base: string;
  area: string;
  need: string;
  note: string;
};

const EMPTY: FormState = { name: "", base: "", area: "", need: "", note: "" };

export default function Contact() {
  const [v, setV] = useState<FormState>(EMPTY);
  const [copied, setCopied] = useState(false);

  const set =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setV((s) => ({ ...s, [k]: e.target.value }));

  /* the WhatsApp message grows with whatever the family filled in */
  const lines = [CONTACT.waContext];
  if (v.name) lines.push(`Name: ${v.name}`);
  if (v.base) lines.push(`Based in: ${v.base}`);
  if (v.area) lines.push(`Parents' area: ${v.area}`);
  if (v.need) lines.push(`A good time: ${v.need}`);
  if (v.note) lines.push(`Note: ${v.note}`);
  const href = waLink(lines.join("\n"));

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const copyNumber = () => {
    navigator.clipboard
      ?.writeText(CONTACT.phone)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  return (
    <section className="wc-sec" style={{ paddingTop: 0 }} id="contact">
      <div className="wc-container">
        <Reveal className="wc-closecard">
          <Waves />
          <div className="wc-contact-in">
            <p className="wc-contact-kicker">{CONTACT.kicker}</p>
            <h2 className="wc-display sm">{CONTACT.title}</h2>
            <p>{CONTACT.lead}</p>
            <span className="wc-urgency">{PLAN_HEADING.eyebrow}</span>

            <form
              className="wc-form"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(href, "_blank", "noopener,noreferrer");
              }}
            >
              <div className="wc-form-row">
                <div>
                  <label htmlFor="f-name">{CONTACT.fields.name.label}</label>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={v.name}
                    onChange={set("name")}
                  />
                </div>
                <div>
                  <label htmlFor="f-base">{CONTACT.fields.base.label}</label>
                  <input
                    id="f-base"
                    name="base"
                    type="text"
                    autoComplete="off"
                    placeholder={CONTACT.fields.base.placeholder}
                    value={v.base}
                    onChange={set("base")}
                  />
                </div>
              </div>

              <div className="wc-form-row">
                <div>
                  <label htmlFor="f-area">{CONTACT.fields.area.label}</label>
                  <input
                    id="f-area"
                    name="area"
                    type="text"
                    autoComplete="off"
                    placeholder={CONTACT.fields.area.placeholder}
                    value={v.area}
                    onChange={set("area")}
                  />
                </div>
                <div>
                  <label htmlFor="f-need">{CONTACT.fields.need.label}</label>
                  <select id="f-need" name="need" value={v.need} onChange={set("need")}>
                    <option value="">Choose one</option>
                    {CONTACT.fields.need.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="f-note">{CONTACT.fields.note.label}</label>
                <textarea
                  id="f-note"
                  name="note"
                  value={v.note}
                  onChange={set("note")}
                />
                <p className="wc-form-hint">{CONTACT.fields.note.hint}</p>
              </div>

              <button type="submit" className="wc-btn lg light wide">
                {CONTACT.submitLabel} <ArrowRight size={18} className="wc-arrow" />
              </button>
            </form>

            <div className="wc-direct">
              <span>Prefer to call or message directly?</span>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                <PhoneCall size={16} /> {CONTACT.phone}
              </a>
              <button type="button" className="wc-copy" onClick={copyNumber}>
                {copied ? "Copied!" : "Copy number"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
