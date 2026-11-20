import { STATS, TRUST_STANDARDS } from "@/lib/content";
import { TRUST_ICONS } from "./icons";
import Reveal from "./Reveal";

const TONES = ["green", "peach", "blue", "yellow"] as const;

export default function Trust() {
  return (
    <section className="wc-sec" id="trust">
      <div className="wc-container">
        <Reveal className="wc-head">
          <span className="wc-kicker">Trust &amp; safety</span>
          <h2 className="wc-h2">Verified at every step, not just promised.</h2>
          <p className="wc-sub">
            Four non-negotiable standards stand between your parent and
            every companion we send.
          </p>
        </Reveal>

        <div className="wc-trust-grid">
          {TRUST_STANDARDS.map((s, i) => {
            const Ico = TRUST_ICONS[s.icon];
            return (
              <Reveal
                key={s.title}
                delay={i * 100}
                className={`wc-trust-card t-${TONES[i]}`}
              >
                <span className="wc-ico-tile">
                  <Ico size={24} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150} className="wc-stats">
          {STATS.map((s) => (
            <div key={s.label} className="wc-stat">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}