import {
  PLAN_FOOTNOTES,
  PLAN_HEADING,
  PLAN_INCLUDED,
  PLAN_NOT_INCLUDED,
  PRICING,
  waLink,
} from "@/lib/content";
import { ArrowRight, Check } from "./icons";
import Reveal from "./Reveal";

/* One plan, three ways to pay. CTA is the site-wide secondary action
   "Book Free Consultation" -> WhatsApp with per-tier context. */

export default function Pricing() {
  return (
    <section className="wc-sec" id="plan">
      <div className="wc-container">
        <Reveal className="wc-head">
          <span className="wc-kicker">{PLAN_HEADING.eyebrow}</span>
          <h2 className="wc-h2">{PLAN_HEADING.title}</h2>
          <p className="wc-plan-line">{PLAN_HEADING.kicker}</p>
          <p className="wc-sub">{PLAN_HEADING.lead}</p>
        </Reveal>

        <div className="wc-pricing-grid">
          {PRICING.map((tier, i) => (
            <Reveal
              key={tier.id}
              delay={i * 110}
              className={`wc-tier ${tier.featured ? "featured" : ""}`}
            >
              {tier.ribbon && (
                <span className="wc-tier-ribbon">{tier.ribbon}</span>
              )}
              <div>
                <span className="wc-tier-kicker">{tier.kicker}</span>
                <h3>{tier.title}</h3>
                <p className="blurb">{tier.blurb}</p>
              </div>
              <div className="wc-tier-price">
                <b>{tier.price}</b>
                <span>{tier.unit}</span>
              </div>
              <ul>
                {tier.bullets.map((b, j) => (
                  <li key={j}>
                    <Check size={17} />
                    <span>
                      {b.text}
                      {b.strong && <strong>{b.strong}</strong>}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                className="wc-btn wide"
                href={waLink(tier.waText)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tier.cta} <ArrowRight size={17} className="wc-arrow" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="wc-plan-panel">
          <div>
            <h3>What the plan includes</h3>
            <p className="wc-plan-not">
              <b>Please note.</b> {PLAN_NOT_INCLUDED}
            </p>
          </div>
          <ul className="wc-plan-list">
            {PLAN_INCLUDED.map((it) => (
              <li key={it.title}>
                <Check size={17} />
                <span>
                  <b>{it.title}.</b> {it.body}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="wc-plan-foot">
          {PLAN_FOOTNOTES.map((f) => (
            <p key={f}>{f}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
