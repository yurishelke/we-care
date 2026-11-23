"use client";

import { BRAND, CONTACT, FOOTER, NAV_LINKS, consultLink } from "@/lib/content";
import { useBooking } from "./BookingContext";
import { HandHeart, PhoneCall, WhatsApp } from "./icons";

export default function Footer() {
  const { openBooking } = useBooking();
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
            <p>{FOOTER.disclaimer}</p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#promise">Our promise</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a
                  href={consultLink(
                    "I'd like to know more about caring for my parents."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp size={15} /> Book Free Consultation
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  <PhoneCall size={15} /> {CONTACT.phone}
                </a>
              </li>
              <li>
                {/* anchor kept for the no-JS fallback to #contact */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    openBooking();
                  }}
                >
                  Book your visit
                </a>
              </li>
            </ul>
            <p className="wc-foot-sos">In an emergency, call 108 or 112.</p>
          </div>
        </div>

        <div className="wc-foot-bar">
          <span>© 2026 {FOOTER.brandLine} · Made with care in India.</span>
          <nav aria-label="Legal">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
