import { TESTIMONIALS } from "@/lib/content";
import { Heart } from "./icons";
import Reveal from "./Reveal";

function StoryCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className={`wc-story t-${t.tone}`}>
      <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="wc-story-who">
        <span className="wc-story-ava">{t.initials}</span>
        <span>
          <b>{t.name}</b>
          <small>{t.meta}</small>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Stories() {
  return (
    <section className="wc-sec">
      <div className="wc-container">
        <Reveal className="wc-reel-head">
          <div className="wc-head left" style={{ margin: 0 }}>
            <span className="wc-kicker">Family stories</span>
            <h2 className="wc-h2 wc-reel-h2">What the families tell us.</h2>
          </div>
          <span className="wc-rating">
            <Heart size={17} /> Families abroad · Parents in Nagpur
          </span>
        </Reveal>
      </div>

      <Reveal delay={120} className="wc-reels">
        <div className="wc-reel-track">
          <div className="wc-reel-set">
            {TESTIMONIALS.map((t) => (
              <StoryCard key={t.initials} t={t} />
            ))}
          </div>
          <div className="wc-reel-set" aria-hidden="true">
            {TESTIMONIALS.map((t) => (
              <StoryCard key={`dup-${t.initials}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}