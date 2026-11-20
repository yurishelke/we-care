import { SERVICES } from "@/lib/content";
import { ArrowRight, CheckCircle, SERVICE_ICONS } from "./icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section className="wc-sec" id="services">
      <div className="wc-container">
        <Reveal className="wc-head left">
          <span className="wc-kicker">Focused assistance</span>
          <h2 className="wc-h2">Care services tailored for everyday dignity.</h2>
          <p className="wc-sub">
            Concise, reliable support categories designed to handle every
            physical, administrative, and emotional need of your elderly
            parents.
          </p>
        </Reveal>

        <div className="wc-services-grid">
          {SERVICES.map((s, i) => {
            const Ico = SERVICE_ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={i * 110} className={`wc-service t-${s.tone}`}>
                <span className="wc-ico-tile">
                  <Ico size={26} />
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p className="blurb">{s.blurb}</p>
                </div>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>
                      <CheckCircle size={17} />
                      {b}
                    </li>
                  ))}
                </ul>
                <a className="wc-service-link" href="#book">
                  {s.cta} <ArrowRight size={16} />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}