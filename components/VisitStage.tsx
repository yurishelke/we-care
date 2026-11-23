"use client";

import { useEffect, useState } from "react";
import { VISIT_DEMO } from "@/lib/content";
import { HandHeart, NoteIcon, Pin, Users, Video } from "./icons";

/* "A week of care" — an emotional vignette, not a process replay.
   No door PIN, no step track: the full flow lives only in How it works.
   Same auto-cycle cadence the hero animation had, new content. */

const PHASES = ["meeting", "together", "report", "atEase"] as const;
type Phase = (typeof PHASES)[number];

const PHASE_META: Record<
  Phase,
  { tone: string; label: string; icon: typeof Users }
> = {
  meeting: {
    tone: "peach",
    label: "A familiar face",
    icon: HandHeart,
  },
  together: {
    tone: "green",
    label: "Time together",
    icon: Users,
  },
  report: {
    tone: "yellow",
    label: "Told, the same day",
    icon: NoteIcon,
  },
  atEase: {
    tone: "blue",
    label: "Miles away, at ease",
    icon: Video,
  },
};

const PHASE_MS = 2800;

export default function VisitStage() {
  const [idx, setIdx] = useState(0);
  const phase = PHASES[idx];
  const meta = PHASE_META[phase];
  const TagIco = meta.icon;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIdx(3); /* rest on the reassuring final state */
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
        {/* family, connected from afar */}
        <div className="wc-stage-you">
          <span className="wc-stage-you-ico">
            <Video size={19} />
          </span>
          <span className="wc-stage-you-t">
            <small>Connected, from wherever you are</small>
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

          {/* quiet facts, appearing with the report phase */}
          <div className="wc-stage-vitals">
            <span className="wc-vital">
              <NoteIcon size={15} /> {VISIT_DEMO.reportLine}
            </span>
            <span className="wc-vital">
              <Pin size={15} /> {VISIT_DEMO.place}
            </span>
          </div>

          {/* the companion at the centre; rings ripple as she arrives */}
          <div className="wc-stage-center">
            <span className="wc-stage-ring" />
            <span className="wc-stage-ring" />
            <span className="wc-stage-ring" />
            <div className="wc-stage-avatar">
              <b>{VISIT_DEMO.initials}</b>
            </div>
          </div>

          {/* phase: meeting — a warm greeting at the door */}
          <div
            className={`wc-stage-float wc-float-meeting ${
              phase === "meeting" ? "is-on" : ""
            }`}
          >
            <small>At the door</small>
            <b>{VISIT_DEMO.greeting}</b>
          </div>

          {/* phase: together — company, not chores */}
          <div
            className={`wc-stage-float wc-float-together ${
              phase === "together" ? "is-on" : ""
            }`}
          >
            <small>This week, together</small>
            <b>{VISIT_DEMO.together}</b>
          </div>

          {/* phase: report — the written note the family reads */}
          <div
            className={`wc-stage-float wc-float-report ${
              phase === "report" ? "is-on" : ""
            }`}
          >
            <span className="wc-note-head">
              <NoteIcon size={16} /> Visit report · shared just now
            </span>
            <p>{VISIT_DEMO.note}</p>
          </div>

          {/* phase: atEase — the feeling the brand sells */}
          <div
            className={`wc-stage-float wc-float-atease ${
              phase === "atEase" ? "is-on" : ""
            }`}
          >
            <small>And you, wherever you are</small>
            <b>Miles away, never alone.</b>
          </div>
        </div>
      </div>
    </div>
  );
}
