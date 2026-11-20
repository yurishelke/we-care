import { PRICING, PRICING_SUFFIX, waLink } from "@/lib/content";
import { ArrowRight, Check } from "./icons";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section className="wc-sec" id="pricing">
      <div className="wc-container">
        <Reveal className="wc-head">
          <span className="wc-kicker">Pricing</span>
          <h2 className="wc-h2">Transparent &amp; dignified pricing.</h2>
          <p className="wc-sub">
            Start with a single hour, bundle recurring visits, or choose a
            dedicated monthly companion. Every plan includes door PIN
            security and post-visit notes.
          </p>
        </Reveal>

        <div className="wc-pricing-grid">
          {PRICING.map((tier, i) => (
            <Reveal
              key={tier.id}
              delay={i * 110}
              className={`wc-tier ${tier.featured ? "featured" : ""}`}
            >
              {tier.ribbon && <span className="wc-tier-ribbon">{tier.ribbon}</span>}
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
                      {PRICING_SUFFIX[tier.id]?.[j] ?? ""}
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
      </div>
    </section>
  );
}