Let me quickly check the hero animation stages and remaining components so the revised plan is precise.


All seven corrections cross-checked against the current code (`VisitStage.tsx` phases, `Nav.tsx`, `Footer.tsx`) and the plan doc. Here is the **revised implementation plan** — where a correction conflicts with `plan.mhtml`, the correction wins and is flagged with ⭑.

---

# Revised Homepage Alignment Plan v2 (north star: plan.mhtml + 7 owner corrections)

## What changed from v1

| v1 decision | v2 decision | Driver |
|---|---|---|
| Delete testimonials → replaced by founder block | **Keep `Stories.tsx`**; founder gets its **own section**, placed before it | #1 |
| 2 tiers (+1 unconfirmed) | **3 tiers confirmed**, ₹2,749 auto-renew is real and visually distinct | #2 |
| Plan's "free first visit" everywhere | **All free-visit framing removed** ⭑ overrides plan.mhtml | #3 |
| Remove HowItWorks phone animation | **Keep animation** — replaced by a new scroll-scrubbed "journey map" concept | #4 |
| Mixed CTA labels per section | **Exactly two CTA labels** site-wide | #5 |
| Keep hero stage animation as-is | Keep the stage, **replace PIN phase + delete the step track** (anti-repetition) | #6 |
| Trust section = promises | Retained; strict **one-job-per-section** audit added | #7 |
| Phone | `919322966592` everywhere (unchanged from v1) | — |

## Section job map & final scroll order (`app/page.tsx`)

```
Nav → Hero → Services → HowItWorks → FounderStory → Stories
    → Pricing → Trust → InterestStrip → Faq → ClosingCta → Footer
```

- ⭑ `#book` anchors retired — ClosingCta becomes `id="contact"`; Services→`#what`, HowItWorks→`#how`, Pricing→`#plan`, Trust→`#promise` (keep `#services` alias if simpler; just be consistent in `NAV_LINKS`)
- ⭑ **Remove `BookEstimator.tsx`** from the page (hourly estimator contradicts the plan model) and delete the file
- ⭑ `FounderStory.tsx` is a **new component**; `Stories.tsx` stays but moves after it

---

## Phase 0 — `lib/content.ts`

Carry over all v1 Phase 0 rewrites (BRAND copy, 8 SERVICES, PLAN tiers/included/not-included, PROMISES, HOW_STEPS, 12 FAQS, FOUNDER, WORLD, SAMPLE_REPORT, CONTACT, FOOTER_DISCLAIMER, `WHATSAPP_NUMBER = "919322966592"`), **with these amendments**:

### 0.1 ⭑ Remove every "free visit" string
- `PLAN_FOOTNOTES`: drop the sentence *"Your first visit is free, so you and your parents can meet us before you decide."* Keep UPI/advance-payment, at-actual-cost, Nagpur-travel-included.
- `CONTACT.lead` — Before (plan): "Your first visit is free. We meet your parents at home in Nagpur…" → After: **"Tell us about your parents and we will reply the same day to fix a time for your first visit — wherever in the world you are."**
- `HOW_STEPS` — renumber the plan's flow, step 2 reframed away from a free visit:
  1. **Get in touch** — "Message us on WhatsApp or send the form below. We will reply the same day."
  2. **We plan it with you** — "We learn your parents' routine, doctors and preferences, and agree with you how your 8 hours a month are used and who to contact if needed."
  3. **Weekly visits** — "We meet your parents every week, accompany them and stay for the whole visit. If you need us in between, you can reach us."
  4. **Your report** — "The same day, on WhatsApp: what took place, the doctor's advice and the next steps."
- `FAQS`: replace plan's *"Can we try the service first?"* (free-visit answer) → **"How do we get started?"** — "Tell us about your parents on WhatsApp or with the form. We will call to understand their routine, then schedule your first visit at a time that suits you and your parents."
- New `HERO_NOTE`: "One plan, both parents · Same-day written report · No lock-in" (replaces the ₹199 line; **no** "first visit free")

### 0.2 ⭑ #2 — `PRICING` = 3 confirmed tiers
| id | tag | price | sub | ribbon | CTA |
|---|---|---|---|---|---|
| monthly | Monthly | `₹2,999*` `/ month` | "Billed monthly. Cancel before the next billing date." | — | Book Free Consultation |
| auto-renew | Monthly · auto-renew | `₹2,749*` `/ month` | "Recurring subscription at the founding-family rate. Cancel before the next billing date." | **"Most popular · Auto-renews"** (`featured: true`) | Book Free Consultation |
| quarterly | 3 months · prepaid | `₹7,999*` `/ 3 months` | "About ₹2,666 per month. Paid in advance for the three months." | "Best value · Prepaid" | Book Free Consultation |

Per-tier WhatsApp context, e.g. `waLink("Hello We Care, I'd like the auto-renewing monthly plan at ₹2,749.")`.

### 0.3 ⭑ #1 — `TESTIMONIALS` kept, minimal city correction only
Keep the section and quotes, but the Nagpur-only mandate still applies to geography: change "Parents in Bangalore/Lucknow" metas to **Nagpur** ("Son · Living in Singapore (Parents in Nagpur)", "…Mother in Nagpur", "Retired Resident · Dharampeth, Nagpur"). Flag the "4.9/5 · 1,000+ visits" rating strip for owner sign-off — keep only if the numbers are real.

### 0.4 ⭑ #5 — CTA helpers
```
export const consultLink = (context: string) =>
  waLink(`Hello We Care, ${context}`);   // keeps "Hello We Care" prefix + section context
```
All existing `waText` strings must start `"Hello We Care"` (currently "Hi We Care" — global change).

### 0.5 ⭑ #6 — `VISIT_DEMO` de-process-ified
Delete `pin`; rename fields for the emotional vignette (see Phase 1). Keep `companion`, `parent`, `place: "Dharampeth, Nagpur"` (no hospital-as-venue-of-a-step), `note`, `family`.

### 0.6 ⭑ #7 — anti-repetition content rules
- `HERO_BADGES` → shrink to **3 chips** with pure trust facts not restated elsewhere verbatim: "Families sign up from anywhere in the world", "Founded and run by the Yuris family, Nagpur" *(confirm wording)*, "Early access · limited founding family slots". If the middle one feels invented, use "Same faces, every week" instead.
- `PROMISES` (Trust) keep the 5 plan promises — but Pricing's included-list and Trust must not share sentences: pricing says *what you get*, trust says *how we're accountable*. Already distinct in plan copy; verify no >30% overlap after translation to JSX.
- `NAV_LINKS` per v1 (What we do / How it works / The plan / Stories / FAQ).

---

## Phase 1 — `Hero.tsx` + `VisitStage.tsx` (#5, #6, #7)

**Hero.tsx** (copy changes as in v1 — Nagpur headline, new lead):
- [ ] Delete `CityChips` + `Landmark` (multi-city) and `RotatingWords`
- [ ] CTA row → exactly the two CTAs: **"Book your visit"** (`href="#contact"`, primary) + **"Book Free Consultation"** (`consultLink("I'd like to know more about caring for my parents.")`, ghost). Delete "Explore Plans & Pricing" / "View the Care Plan".
- [ ] Replace ₹199 note with `HERO_NOTE`; badges → 3 chips per 0.6

**VisitStage.tsx** — keep the loved auto-cycling stage mechanic; swap its content from *process* to *relationship*:
- [ ] **Delete** the door-PIN pad (`wc-pinpad*`), `TRACK_LABELS` progress strip (this is the process enumeration the anti-repetition rule bans), and all "Verified / Police-verified / Asking companions" strings
- [ ] New 4 phases — **"A week of care"** vignette (emotion, not steps):

| Phase | Label | Sub | Tone/icon |
|---|---|---|---|
| meeting | A familiar face | "Namaste, Aunty — here's Ananya" | peach · HandHeart |
| together | Time together | "A walk, tea, and a real conversation" | green · Users |
| report | You're told, the same day | "A written report on WhatsApp" | yellow · NoteIcon |
| atEase | Miles away, at ease | "Your parents, never alone" | blue · Video |

- [ ] Floating cards show warmth artifacts (a chat bubble, the sample-report snippet, a video-call thumbnail with `VISIT_DEMO.family`), not booking/PIN mechanics
- [ ] Keep `PHASE_MS ≈ 2800` cadence and the reduced-motion fallback (rest on `atEase` phase)
- [ ] CSS: remove `.wc-pinpad*` / `.wc-stage-track` rules, add float styles reusing existing `wc-stage-float` pattern; keep the ring/avatar center (it reads as "companion arriving" — the greeting moment #6 suggests)

---

## Phase 2 — `Services.tsx` (#5, #7)

- [ ] As v1: kicker "Your love, our hands.", heading "What we do ♥♥", 8 plan cards, 2 leads, Coming-soon + Please-note (`also`) block
- [ ] **Remove per-card "Book Medical Escort" style CTAs** (job #7: services doesn't sell; and labels must be the two approved ones). One section-level action row only: **"Book your visit"** → `#contact`
- [ ] Copy guard: no process language ("schedule in advance with you" is fine as a promise, but no numbered flow, no "first/then/next")

## Phase 3 — `HowItWorks.tsx` — ⭑ new animation concept (#3, #4, #6)

**The only place on the page that enumerates steps.**

### Proposed concept — "The Care Journey, drawn as you scroll" *(for your review)*
- **Name:** Scroll-drawn journey map
- **Layout:** sticky section (~300vh) containing a hand-drawn-style SVG path (gentle S-curve through Nagpur-ish landmarks: home → temple → clinic → kitchen → back home). 4 numbered stations sit on the path at 20/45/70/90% of its length.
- **Trigger:** `IntersectionObserver` + scroll-progress mapping. Path `stroke-dashoffset` scrubs **1:1 with scroll** while the section is pinned. As the drawing head crosses a station, that station activates and its card (step 1–4 from `HOW_STEPS`) swaps in beside the map.
- **Properties animated:** `stroke-dashoffset` (path draw), station node `scale 0.8→1` + ring pulse, card `opacity` + `translateY(24px)→0`, connector arrow dashoffset into the card.
- **Easing:** scrub itself is linear (direct scroll control = physical feel). Node pop: `cubic-bezier(0.34, 1.56, 0.64, 1)` (light overshoot), 450ms. Card swap-out: 200ms ease-in; card swap-in: 400ms cubic-bezier(0.16, 1, 0.3, 1).
- **Duration:** scroll-driven, ~50ms render lag max (rAF-throttled). Clicking a station snaps scroll to its progress window (smooth, 600ms).
- **Interruption:** fully reversible — scrubbing back un-draws the path and re-lights stations (no fire-and-forget timers).
- **Reduced-motion / no-JS fallback:** unpinned static layout — the 4 steps as numbered cards with the completed path as a static SVG backdrop; no scrub.
- **Why it doesn't fatigue next to the hero:** hero = time-driven auto-cycling card stage (crossfades, floats). HowItWorks = scroll-driven line drawing with spatial progression. Zero shared mechanics, zero shared properties.
- **Rejected alternates (1-liners):** staggered card reveals w/ connecting line — good but passive, and its auto-stagger echoes the hero cycle; progress-indicator stepper — cleanest but lowest delight, keep as the reduced-motion tier of this design.

### Implementation steps
- [ ] Remove old phone mockup (route map, PIN digits, "Paid online · ₹399", "Police-verified", auto-cycle `setInterval`)
- [ ] Build `JourneyMap` sub-component (SVG path + `pathLength={1}` dashoffset scrub via `--p` CSS var set in a rAF scroll handler)
- [ ] Render the 4 revised `HOW_STEPS` (no free-visit step)
- [ ] Heading: keep **"How it works"**; sub: "Four steps, and you're part of every one of them." (does not restate pricing/PIN/trust claims)
- [ ] Section CTA: **"Book your visit"** → `#contact`

## Phase 4 — ⭑ NEW `FounderStory.tsx` (#1 — the emotional climax)

Placed **between HowItWorks and Stories**, `id="story"`, added to `NAV_LINKS` as "Our story".

- [ ] **Full-bleed dark band** (the plan's `on-night` treatment) — the only full-width ink section besides hero/contact, so it visually outweighs everything
- [ ] Type hierarchy: `wc-display` heading at ~1.25× the testimonials heading — **"Why we started We Care"**; body in a large serif measure (max ~62ch), generous `clamp()` sizing, wide section padding (≥ 25% more vertical space than any other band)
- [ ] The plan's 3 paragraphs verbatim (20 years UK hospitality → "We are fine." → "We attend as companions, not carers… you deal with us directly, not a call centre."), signature line "Founders, We Care"
- [ ] Treat the line *"Even when we call, somewhere along the way they tell us, 'We are fine.'"* as a **pull-quote**: oversized, italic, its own block between paragraphs — this is the emotional peak beat
- [ ] Optional scroll-in: single slow staged fade-up (opacity + 16px translate, 700ms, 150ms stagger, ease-out) — deliberately quieter than the journey scrub; no loop, fires once
- [ ] Side rail: the 5 `FOUNDER.facts` as a quiet list (20+ years UK hospitality · UK DBS check 2025 · Based in Nagpur, Maharashtra · …) — small caps, secondary weight, **not** a competing grid
- [ ] No CTA inside this section (its job is emotion, not action; the next sections carry the CTAs) — keeps the >30%-overlap rule clean

## Phase 5 — `Stories.tsx` (#1, #7)

- [ ] Section stays: reels marquee, cards, rating strip — only content edits from 0.3 (city metas → Nagpur)
- [ ] Heading — Before: "Trusted by families around the world." → After: **"Families who were away, and how it went."** *(job: proof only — no service enumeration, no process words like "booked/assigned/PIN")*
- [ ] Fix quote tenses/claims if needed to stay honest post-Nagpur-switch (Rahul K.'s "companion kept me updated every 30 minutes, handled the discharge papers" — flag for owner; keep as-is per correction #1 unless rejected)

## Phase 6 — `Pricing.tsx` (#2, #5)

- [ ] As v1 Phase 4, but with the **3-tier grid** from 0.2; `featured` = auto-renew (₹2,749) with "Most popular · Auto-renew" ribbon; quarterly keeps "Best value · Prepaid" ribbon
- [ ] Remove all free-visit references from notes/footnotes (0.1)
- [ ] Card CTA on every tier: **"Book Free Consultation"** via `consultLink("I'd like the <tier> plan.")` — plan's "Choose monthly/3 months" labels dropped per rule #5
- [ ] Included-list (7), Not-included box, GST asterisk footnote; payment-terms note **without** the free-visit sentence
- [ ] Heading: "Care Plan – Both Parents" + kicker "We'll hold their hand while you're away."

## Phase 7 — `Trust.tsx` (#7)

- [ ] As v1: 5 `PROMISES`, id `#promise`, kicker "Our promise", heading "What you can count on"
- [ ] Stats strip removed (claims) → replaced by a one-line band: "Early access · limited founding family slots" *(already in pricing eyebrow — if that's a dupe by your 30% bar, drop the line here entirely; recommended)*
- [ ] CTA (section-level, low-commitment): **"Book Free Consultation"** → `consultLink("I have questions about your safety standards.")`

## Phase 8 — `InterestStrip.tsx` (#7 guard)

- [ ] As v1 (world band). ⚠️ Overlap check: hero chip "Families sign up from anywhere" (0.6) vs this band's tag — if both ship, reword hero chip to something else (e.g. "Same faces, every week"). This band's job = geography/audience; don't restate weekly-hours or reporting copy.
- [ ] CTA: **"Book your visit"** → `#contact`

## Phase 9 — `Faq.tsx` (#3, #5)

- [ ] 12-item `FAQS` from content.ts (with the #3 edits in 0.1)
- [ ] Side CTA — Before: "Ask on WhatsApp · We reply within minutes." → After: **"Book Free Consultation"** + "We reply the same day." (plan's own promise wording)
- [ ] Verify no answer reintroduces "free visit" anywhere

## Phase 10 — `ClosingCta.tsx` / `#contact` (#3, #5)

- [ ] As v1 contact form, kicker "Miles away, never alone.", heading **"Book your visit"** (⭑ not "Book your free visit")
- [ ] Lead from 0.1 (no free-visit framing)
- [ ] Form submit → `consultLink()` composed with field values, button label **"Book your visit"**; direct line `+91 93229 66592` + copy button
- [ ] Secondary: **"Book Free Consultation"** → plain `wa.me/919322966592?text=Hello%20We%20Care`
- [ ] Delete old headings: "Give your parents the dedicated care they deserve." (overlaps hero's job) and "Schedule a Consultation" label

## Phase 11 — `Nav.tsx`, `Footer.tsx`, `layout.tsx`, `ComingSoon`

- [ ] **Nav**: sub-line "Their companion. Your peace of mind."; links incl. "Our story"; button — Before: "Book a Visit" → After: **"Book your visit"** → `#contact` (mobile menu button likewise); bare WhatsApp icon keeps `waLink("Hello We Care")`
- [ ] **Footer**: plan disclaimer line; delete "Active locations" city list → "Serving Nagpur, Maharashtra · Families sign up from anywhere"; badges "100% Background Checked / Elder Dignity Charter" removed (absent from plan, unverifiable); legal bar keeps privacy/terms; WhatsApp helper links relabeled **"Book Free Consultation"** with contexts (`…consultation about my parents.`, `…career as a care companion.` for the recruit link — keep label, vary text); delete "Emergency desk" link (plan says emergency = 108/112, not us)
- [ ] **layout.tsx metadata**: "We Care accompanies your parents in Nagpur — weekly visits, appointments, errands and a same-day written report. One plan, both parents, from ₹2,749*/month."
- [ ] **ComingSoon** (`#medical`) block — keep plan's 5 future services; place inside Services' `also` area or as a slim band before FAQ; CTA **"Book Free Consultation"** → `consultLink("please let me know when your new services are available.")`

## Phase 12 — Global sweep & verification

- [ ] `grep -ri "free visit|first visit is free"` across `app/ components/ lib/` → **zero** hits
- [ ] `grep -ri "bangalore|lucknow|pune|hyderabad|3 cities"` → zero (except form placeholder "e.g. London, Pune, Dubai")
- [ ] `grep -ri "₹199|₹100 per|₹399|₹899|₹2,499|first hour|door PIN|pin matched|police|bundle"` → zero
- [ ] `grep -ri "book a|explore|get started|learn more|contact us|choose monthly|notify me|talk to"` on button/anchor text → only the two approved CTA labels render as button/link-CTA text (nav anchors excluded)
- [ ] `grep -ri "Hi We Care"` → zero (all "Hello We Care")
- [ ] Each `wa.me/919322966592` link opens with its section-context prefilled text
- [ ] Process steps appear **only** in `#how` (grep "step|first|then|next" as a copy smell-check; VisitStage track labels deleted)
- [ ] Overlap pass: read the rendered page top-to-bottom; kill any sentence appearing ≥2× (§0.6, Phase 8 checks)
- [ ] `npm run dev`: journey scrub pins/unpins cleanly on fast scroll & interrupt (wheel ↔ touch), stations reversible; hero stage cycles w/o PIN; founder pull-quote lands; reduced-motion → static journey + final-state hero card + no reveals
- [ ] Mobile: 8-card grid, sticky journey height (shorten to ~240vh), marquee, form
- [ ] `npm run lint && npm run build`

---

### Open items needing your confirmation before I code
1. **Journey-map scrub** (Phase 3 concept) — approve, or pick an alternate (staggered cards + connector line / progress stepper)?
2. Founder-section treatment: **dark full-bleed + pull-quote** as specified, or lighter band?
3. The invented-feeling trust chip "Founded and run by the Yuris family, Nagpur" — approve wording or replace with "Same faces, every week"?
4. ₹2,749 tier ribbon wording: "Most popular · Auto-renews"?

Say the word and I'll start executing Phase 0 (`lib/content.ts`).