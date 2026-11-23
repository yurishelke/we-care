import { WORLD, consultLink } from "@/lib/content";
import { ArrowRight, Pin } from "./icons";
import Reveal from "./Reveal";

/* "Families sign up from anywhere" — the world band. Replaces the old
   interest strip with its invented 40% stat and off-menu CTA label. */

export default function InterestStrip() {
  return (
    <section className="wc-sec" style={{ paddingTop: 0 }}>
      <div className="wc-container">
        <Reveal className="wc-world">
          <div className="wc-world-top">
            <span className="wc-interest-pin" aria-hidden="true">
              <Pin size={28} />
              <i />
            </span>
            <h2>{WORLD.tag}</h2>
          </div>

          <ul className="wc-world-places">
            {WORLD.places.map((p) => (
              <li key={p}>{p}</li>
            ))}
            <li className="wc-world-more">{WORLD.more}</li>
          </ul>

          <div className="wc-world-foot">
            <p>{WORLD.note}</p>
            <a
              className="wc-btn"
              href={consultLink(
                "I live abroad and want to arrange care for my parents in Nagpur."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Consultation{" "}
              <ArrowRight size={17} className="wc-arrow" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
