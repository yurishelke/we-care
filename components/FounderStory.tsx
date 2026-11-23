import { FOUNDER } from "@/lib/content";
import { HandHeart } from "./icons";
import Reveal from "./Reveal";

/* The emotional peak of the page — dark, full-bleed, and deliberately
   louder than the testimonials below it (scroll order + hierarchy).
   Copy verbatim from plan.mhtml; no CTA here by design: this section
   asks for feeling, not clicks. The two CTAs live elsewhere. */

export default function FounderStory() {
  return (
    <section className="wc-founder" id="story">
      <span className="wc-founder-glow" aria-hidden="true" />
      <div className="wc-container">
        <Reveal className="wc-head left">
          <span className="wc-kicker">Our story</span>
          <h2 className="wc-h2">{FOUNDER.title}</h2>
        </Reveal>

        <div className="wc-founder-grid">
          <Reveal as="div" className="wc-founder-body" delay={60}>
            {FOUNDER.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "wc-founder-lead" : undefined}>
                {p}
              </p>
            ))}
            <p className="wc-founder-sign">
              <HandHeart size={19} />
              {FOUNDER.sign}
            </p>
          </Reveal>

          <div>
            <Reveal className="wc-founder-pull" delay={140}>
              <blockquote>{FOUNDER.pull}</blockquote>
            </Reveal>
            <Reveal as="ul" className="wc-founder-facts" delay={220}>
              {FOUNDER.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
