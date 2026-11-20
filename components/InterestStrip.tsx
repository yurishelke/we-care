import { waLink } from "@/lib/content";
import { ArrowRight, Pin, WhatsApp } from "./icons";
import Reveal from "./Reveal";

export default function InterestStrip() {
  return (
    <section className="wc-sec" style={{ paddingTop: 0 }}>
      <div className="wc-container">
        <Reveal className="wc-interest">
          <span className="wc-interest-pin" aria-hidden="true">
            <Pin size={28} />
            <i />
          </span>
          <div>
            <h2>Parents somewhere else?</h2>
            <p>
              Over 40% of our families live in the UAE, US, UK, Singapore,
              and Canada. Book from your timezone — we handle everything
              on the ground, and you watch it happen on your phone.
            </p>
          </div>
          <a
            className="wc-btn"
            href={waLink("Hi We Care, I live abroad and want to arrange care for my parents in India.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp size={18} /> Talk to a coordinator
            <ArrowRight size={17} className="wc-arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}