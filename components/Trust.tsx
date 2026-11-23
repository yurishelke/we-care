import { PROMISES, PROMISE_TITLE } from "@/lib/content";
import { PROMISE_ICONS } from "./icons";
import Reveal from "./Reveal";

/* "What you can count on" — the plan's five promise rows, editorial
   layout (title left, body right). Replaces the unverifiable
   "police-verified / door-PIN" standards and the fake stats band. */

export default function Trust() {
  return (
    <section className="wc-sec" id="promise">
      <div className="wc-container">
        <Reveal className="wc-head left">
          <span className="wc-kicker">Our promise</span>
          <h2 className="wc-h2">{PROMISE_TITLE}</h2>
        </Reveal>

        <div className="wc-promises">
          {PROMISES.map((p, i) => {
            const Ico = PROMISE_ICONS[p.icon];
            return (
              <Reveal key={p.title} delay={i * 70} className="wc-promise">
                <div className="wc-promise-head">
                  <span className="wc-ico-tile">
                    <Ico size={20} />
                  </span>
                  <h3>{p.title}</h3>
                </div>
                <p>{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
