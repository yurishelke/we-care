"use client";

import { useEffect, useRef } from "react";

/* Shared IntersectionObserver — adds .is-in once, then unobserves.
   Elements carry data-reveal; CSS hides them only under html.motion,
   so content stays fully visible without JS or with reduced motion. */

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.();
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
  }
  return observer;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in", "no-anim");
      return;
    }
    const io = getObserver();
    callbacks.set(el, () => el.classList.add("is-in"));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, []);

  return ref;
}

/* True when ambient loops should run (motion allowed + tab visible). */
export function useMotionOk(): boolean {
  const ok = useRef(true);
  if (typeof window !== "undefined" && ok.current) {
    ok.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ok.current;
}