# Landing hero — A/B layout variant (`?variant=b`)

The landing page ships two hero experiences that can be selected explicitly via
the URL, on top of the existing copy-only 50/50 split test.

## Two independent experiments

1. **Copy split (organic traffic).** `heroVariants` in `src/pages/Index.tsx`
   buckets each visitor 50/50 into headline copy "A" or "B" and persists the
   choice in `localStorage` (`heroVariant`). This only changes the headline and
   subheadline text of the control layout. Unchanged by this variant work.

2. **Layout variant (this addition).** A full alternate hero **layout** —
   `src/components/HeroVariantB.tsx` — selectable with the `?variant=` query
   string. This is a structurally different hero, not just different copy.

## Toggling the layout

| URL                         | Hero shown                                            |
| --------------------------- | ----------------------------------------------------- |
| `/` (no param)              | Control: two-column copy + product video              |
| `/?variant=a`               | Forces the control layout                             |
| `/?variant=b`               | Variant B: centered, single-column conversion hero    |

The override is read once on mount by `getHeroLayoutOverride()` in
`src/pages/Index.tsx` (case-insensitive; anything other than `a`/`b` is ignored
and falls through to the control). It is intentionally deterministic — no random
bucketing — so either arm can be deep-linked for demos, QA and stakeholder
review.

## What differs in Variant B

| Aspect      | Control                                  | Variant B                                        |
| ----------- | ---------------------------------------- | ------------------------------------------------ |
| Layout      | Two-column (copy left, video right)      | Single-column, centered, gradient backdrop       |
| Headline    | "Team as a Service" / copy-test variant  | "Skip the hiring. Ship the product."             |
| Subheadline | Service description                      | Outcome-led, "…a senior team that starts this week." |
| CTA         | "Try for free" + "Get a demo" buttons    | Inline pill prompt bar → "Build my team" + ghost "book a 15-min demo" |
| Social proof| Three-step icon row + brand carousel     | Trust chips: 48h kickoff / vetted talent / AI copilot |

Variant B reuses the same `prompt` state and callbacks as the control
(`onStartBuild` opens the beta signup once a prompt is entered; `onGetDemo`
opens the beta dialog), so both arms feed the same conversion funnel.

## Analytics hook

- Control headline carries `data-hero-variant={A|B}` (copy test).
- Variant B's root `<section>` carries `data-hero-variant="B-layout"`.

Both attributes can be read by an analytics layer to attribute conversions to
the right experiment arm.

## Design notes

`HeroVariantB` is self-contained: it adds one new component and only a minimal,
surgical conditional in `Index.tsx`. Removing the experiment is a matter of
deleting the component and unwrapping the ternary — the control hero is never
rewritten.
