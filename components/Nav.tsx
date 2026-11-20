"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, waLink } from "@/lib/content";
import { ArrowRight, HandHeart, WhatsApp } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight the section currently in view */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`wc-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="wc-nav-in">
          <a className="wc-logo" href="#top" aria-label="We Care home" onClick={close}>
            <span className="wc-logo-mark">
              <HandHeart size={21} />
            </span>
            <span>
              <b>We Care</b>
              <small>Elder Companionship</small>
            </span>
          </a>

          <nav className="wc-nav-links" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? "is-active" : ""}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="wc-nav-end">
            <a
              className="wc-nav-wa"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <WhatsApp size={19} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a className="wc-btn sm" href="#book">
              Book a Visit
            </a>
            <button
              type="button"
              className="wc-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`wc-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Menu">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ ["--k" as string]: i }}
              tabIndex={open ? 0 : -1}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ["--k" as string]: NAV_LINKS.length }}
            tabIndex={open ? 0 : -1}
            onClick={close}
          >
            WhatsApp us
          </a>
          <a
            className="wc-btn lg wide"
            href="#book"
            style={{ ["--k" as string]: NAV_LINKS.length + 1 }}
            tabIndex={open ? 0 : -1}
            onClick={close}
          >
            Book a Visit <ArrowRight size={18} className="wc-arrow" />
          </a>
        </nav>
      </div>
    </>
  );
}