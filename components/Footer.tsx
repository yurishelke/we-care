import { BRAND, COMING_SOON, LIVE_CITIES, SERVICES, waLink } from "@/lib/content";
import { HandHeart, Shield, Verified } from "./icons";

export default function Footer() {
  return (
    <footer className="wc-foot">
      <div className="wc-container">
        <div className="wc-foot-grid">
          <div className="wc-foot-brand">
            <a className="wc-logo" href="#top" aria-label="We Care home">
              <span className="wc-logo-mark">
                <HandHeart size={21} />
              </span>
              <span>
                <b>{BRAND.name}</b>
                <small>{BRAND.tagline}</small>
              </span>
            </a>
            <p>
              Dedicated, compassionate care companions for your parents —
              hospital visits, home wellness, and daily logistics, with
              complete peace of mind on your phone.
            </p>
            <div className="wc-foot-badges">
              <span className="wc-foot-badge">
                <Verified size={15} /> 100% Background Checked
              </span>
              <span className="wc-foot-badge">
                <Shield size={15} /> Elder Dignity Charter
              </span>
            </div>
          </div>

          <div>
            <h4>Active locations</h4>
            <ul>
              {LIVE_CITIES.map((c) => (
                <li key={c.name}>
                  <span>
                    {c.name} · {c.zone}
                  </span>
                </li>
              ))}
              <li>
                <span>{COMING_SOON} (Opening Soon)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Care services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
              <li>
                <a href="#pricing">Pricing &amp; packages</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Company &amp; trust</h4>
            <ul>
              <li>
                <a href="#trust">Trust &amp; safety standards</a>
              </li>
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href={waLink("Hi We Care, this is an urgent eldercare request.")} target="_blank" rel="noopener noreferrer">
                  Emergency desk · WhatsApp
                </a>
              </li>
              <li>
                <a href={waLink("Hi We Care, I'd like to apply to become a care companion.")} target="_blank" rel="noopener noreferrer">
                  Become a companion
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="wc-foot-bar">
          <span>© 2026 {BRAND.legal} · Made with care in India.</span>
          <nav aria-label="Legal">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#trust">Elder Safeguarding Code</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}