"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import BookingModal from "./BookingModal";

/* One shared booking flow: every "Book your visit" CTA on the page calls
   openBooking() and drives the same modal instance, so the Calendly and
   RazorPay scripts are only ever mounted once. Pricing cards pass their
   tier id so step 2 shows that plan's payment button. State is
   session-only — whoever booked mid-session resumes at step 2 on reopen. */

type BookingCtx = { openBooking: (planId?: string) => void };

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking(): BookingCtx {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [planId, setPlanId] = useState<string | undefined>(undefined);
  const openerRef = useRef<HTMLElement | null>(null);

  const openBooking = useCallback((plan?: string) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setPlanId(plan);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const markBooked = useCallback(() => setBooked(true), []);
  /* read the opener lazily on unmount — refs must not be rendered */
  const getOpener = useCallback(
    () => openerRef.current,
    []
  );

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {open && (
        <BookingModal
          booked={booked}
          planId={planId}
          onClose={close}
          onBooked={markBooked}
          getOpener={getOpener}
        />
      )}
    </Ctx.Provider>
  );
}
