"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING, consultLink } from "@/lib/content";
import { ArrowRight, CheckCircle, Close, WhatsApp } from "./icons";

/* Two-step booking modal.
   Step 1 — Calendly inline embed (widget.js loaded once, resize: true).
   Step 2 — RazorPay payment button, mounted only after the booking is
   confirmed (calendly.event_scheduled postMessage) or via the manual
   safety-net link. No backend: receipts are handled by the RazorPay
   button config itself. */

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

/* Module-level promise cache: closing/reopening the modal never refetches
   widget.js, but the widget itself is re-initialised on the fresh node. */
const scriptCache = new Map<string, Promise<void>>();
function loadScript(src: string): Promise<void> {
  let p = scriptCache.get(src);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => {
        scriptCache.delete(src);
        reject(new Error(`failed to load ${src}`));
      };
      document.head.appendChild(el);
    });
    scriptCache.set(src, p);
  }
  return p;
}

type Props = {
  booked: boolean;
  onClose: () => void;
  onBooked: () => void;
  getOpener: () => HTMLElement | null;
};

export default function BookingModal({
  booked,
  onClose,
  onBooked,
  getOpener,
}: Props) {
  const [step, setStep] = useState<1 | 2>(booked ? 2 : 1);
  const [calStatus, setCalStatus] = useState<"loading" | "ready" | "failed">(
    "loading"
  );
  const [payFailed, setPayFailed] = useState(false);

  const embedRef = useRef<HTMLDivElement>(null);
  const payRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* lock page scroll while open (same technique as the mobile menu) */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* return focus to the CTA that opened the modal */
  useEffect(
    () => () => {
      getOpener()?.focus?.();
    },
    [getOpener]
  );

  /* step 1: load widget.js once, then init the inline embed on this node */
  useEffect(() => {
    if (step !== 1) return;
    const el = embedRef.current;
    if (!el) return;
    let cancelled = false;
    loadScript(BOOKING.calendlyScriptSrc)
      .then(() => {
        if (cancelled || !window.Calendly) return;
        el.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: BOOKING.calendlyUrl,
          parentElement: el,
          resize: true,
        });
        setCalStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setCalStatus("failed");
      });
    return () => {
      cancelled = true;
    };
  }, [step]);

  /* booking confirmation arrives as postMessage from the Calendly iframe */
  useEffect(() => {
    if (step !== 1) return;
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const ev = (e.data as { event?: string } | null)?.event;
      /* current docs use snake_case, older embeds camelCase — accept both */
      if (ev === "calendly.event_scheduled" || ev === "calendly.eventScheduled") {
        onBooked();
        setStep(2);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [step, onBooked]);

  /* step 2: mount the RazorPay button with a fresh script node so it
     re-renders on every open (the URL itself is browser-cached) */
  useEffect(() => {
    if (step !== 2) return;
    const host = payRef.current;
    if (!host) return;
    const form = document.createElement("form");
    const script = document.createElement("script");
    script.src = BOOKING.razorpayScriptSrc;
    script.async = true;
    /* underscore attribute — dataset would hyphenate it and RazorPay
       would reject the button id */
    script.setAttribute("data-payment_button_id", BOOKING.razorpayButtonId);
    script.onerror = () => setPayFailed(true);
    form.appendChild(script);
    host.appendChild(form);
    /* the generated button is a same-tab anchor — open it in a new tab
       so the modal (and the booking context) survives the payment */
    const onPay = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(
        "a[href*='razorpay']"
      );
      if (a) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    };
    host.addEventListener("click", onPay, true);
    return () => {
      host.removeEventListener("click", onPay, true);
      form.remove();
      setPayFailed(false);
    };
  }, [step]);

  /* Esc closes, Tab stays inside the panel */
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="wc-modal-shell"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="wc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wc-modal-title"
      >
        <header className="wc-modal-head">
          <h2 id="wc-modal-title" className="wc-modal-title">
            {BOOKING.title}
          </h2>
          <ol className="wc-modal-steps" aria-label="Booking progress">
            {BOOKING.stepLabels.map((label, i) => {
              const n = (i + 1) as 1 | 2;
              const state =
                step === n ? "is-on" : step > n ? "is-done" : "";
              return (
                <li key={label} className={state}>
                  <i aria-hidden="true">{state === "is-done" ? "✓" : n}</i>
                  <span>{label}</span>
                </li>
              );
            })}
          </ol>
          <button
            ref={closeRef}
            type="button"
            className="wc-modal-x"
            aria-label="Close booking"
            onClick={onClose}
          >
            <Close size={20} />
          </button>
        </header>

        <div className="wc-modal-body">
          {step === 1 ? (
            <div key="s1" className="wc-step-in wc-book-step">
              {calStatus === "loading" && (
                <p className="wc-modal-note">{BOOKING.loading}</p>
              )}
              {calStatus === "failed" ? (
                <p className="wc-modal-note wc-modal-error">
                  {BOOKING.loadFailed}{" "}
                  <a
                    href={BOOKING.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {BOOKING.openTab}
                  </a>
                </p>
              ) : (
                <div id="calendly-embed" ref={embedRef} className="wc-calendly-embed" />
              )}
              {/* safety net if the postMessage never arrives */}
              <button
                type="button"
                className="wc-book-continue"
                onClick={() => setStep(2)}
              >
                {BOOKING.continueLabel}{" "}
                <ArrowRight size={15} className="wc-arrow" />
              </button>
            </div>
          ) : (
            <div key="s2" className="wc-step-in wc-pay">
              <CheckCircle size={44} className="wc-pay-check" />
              <h3>{BOOKING.confirmTitle}</h3>
              <p className="wc-pay-body">{BOOKING.confirmBody}</p>
              {payFailed ? (
                <p className="wc-modal-note wc-modal-error">{BOOKING.payFailed}</p>
              ) : (
                <>
                  <div className="wc-pay-btn" ref={payRef} />
                  <p className="wc-pay-note">{BOOKING.payNote}</p>
                </>
              )}
              <a
                className="wc-pay-help"
                href={consultLink(BOOKING.helpContext)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp size={15} /> Book Free Consultation
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
