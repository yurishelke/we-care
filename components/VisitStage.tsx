"use client";

import { useEffect, useState } from "react";
import { VISIT_DEMO } from "@/lib/content";
import { Lock, NoteIcon, Users, Verified, Video, Vitals, Pin } from "./icons";

const PHASES = ["asking", "accepted", "door", "note"] as const;
type Phase = (typeof PHASES)[number];

const PHASE_META: Record<
  Phase,
  { tone: string; label: string; sub: string; icon: typeof Users }
> = {
  asking: {
    tone: "green",
    label: "Asking companions",
    sub: "Every one free nearby, at once",
    icon: Users,
  },
  accepted: {
    tone: "blue",
    label: "Accepted",
    sub: "Verified · 1.4 km away",
    icon: Verified,
  },
  door: {
    tone: "peach",
    label: "At the door",
    sub: "PIN matched",
    icon: Lock,
  },
  note: {
    tone: "yellow",
    label: "Visit note shared",
    sub: "On your phone, same day",
    icon: NoteIcon,
  },
};

const TRACK_LABELS = ["Asking", "Accepted", "At the door", "Note"];
const PHASE_MS = 2800;

export default function VisitStage() {
  const [idx, setIdx] = useState(0);
  const phase = PHASES[idx];
  const meta = PHASE_META[phase];
  const TagIco = meta.icon;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIdx(3); /* rest on the informative final state */
      return;
    }
    const t = window.setInterval(() => {
      if (!document.hidden) setIdx((v) => (v + 1) % PHASES.length);
    }, PHASE_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="wc-stage-wrap">
      <div className="wc-stage" data-phase={phase}>
        {/* family watching from abroad */}
        <div className="wc-stage-you">
          <span className="wc-stage-you-ico">
            <Video size={19} />
          </span>
          <span className="wc-stage-you-t">
            <small>Watching live</small>
            <b>{VISIT_DEMO.family}</b>
          </span>
          <span className="wc-stage-you-dot" />
        </div>

        <div className={`wc-stage-card t-${meta.tone}`}>
          <p className="wc-stage-tag">
            <span className="wc-stage-tag-ico">
              <TagIco size={16} />
            </span>
            <span className="txt" key={phase}>
              {meta.label}
            </span>
          </p>

          {/* vitals appear with the visit note */}
          <div className="wc-stage-vitals">
            <span className="wc-vital">
              <Vitals size={15} /> {VISIT_DEMO.vitals}
            </span>
            <span className="wc-vital">
              <Pin size={15} /> {VISIT_DEMO.place}
            </span>
          </div>

          {/* radar + companion avatar */}
          <div className="wc-stage-center">
            <span className="wc-stage-ring" />
            <span className="wc-stage-ring" />
            <span className="wc-stage-ring" />
            <div className="wc-stage-avatar">
              <b>{VISIT_DEMO.initials}</b>
              <span className="wc-verified">
                <Verified size={18} />
              </span>
            </div>
          </div>

          {/* phase: asking */}
          <div className={`wc-stage-float wc-float-asking ${phase === "asking" ? "is-on" : ""}`}>
            <small>Broadcast to every verified companion</small>
            <b>Free nearby right now — at once</b>
          </div>

          {/* phase: accepted */}
          <div className={`wc-stage-float wc-float-accepted ${phase === "accepted" ? "is-on" : ""}`}>
            <small>{VISIT_DEMO.service} · with {VISIT_DEMO.parent}</small>
            <b>{VISIT_DEMO.companion} · Verified</b>
          </div>

          {/* phase: door PIN */}
          <div className="wc-pinpad">
            <small>Your mother reads out the PIN</small>
            <div className="wc-pinpad-digits">
              {VISIT_DEMO.pin.map((d, i) => (
                <span key={i} style={{ ["--k" as string]: i }}>
                  {d}
                </span>
              ))}
            </div>
            <span className="wc-pinpad-ok">
              <Verified size={14} /> PIN matched. The right person is here.
            </span>
          </div>

          {/* phase: note */}
          <div className={`wc-stage-float wc-float-note ${phase === "note" ? "is-on" : ""}`}>
            <span className="wc-note-head">
              <NoteIcon size={16} /> Visit note · shared 8m ago
            </span>
            <p>{VISIT_DEMO.note}</p>
          </div>
        </div>

        {/* journey progress */}
        <div className="wc-stage-track" aria-hidden="true">
          {TRACK_LABELS.map((label, i) => (
            <span
              key={label}
              className={`wc-stage-step ${i < idx ? "is-done" : ""} ${i === idx ? "is-on" : ""}`}
            >
              <i key={`${label}-${i === idx ? idx : "x"}`} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}