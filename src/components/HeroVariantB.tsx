import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

/**
 * HeroVariantB
 *
 * The "B" arm of the landing-page A/B test, activated via the `?variant=b`
 * query string (see `src/pages/Index.tsx`). Where the default hero splits the
 * viewport between copy and a product video, variant B is a single-column,
 * centered, conversion-focused layout with a bolder headline, an outcome-led
 * subheadline, an inline prompt-to-CTA bar, and a row of trust chips.
 *
 * It is intentionally self-contained (its own markup, no shared-file rewrites)
 * so the experiment can be added or removed without touching the control hero.
 */
export interface HeroVariantBProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onStartBuild: () => void;
  onGetDemo: () => void;
}

const trustChips = [
  { icon: Zap, label: "Kickoff in 48 hours" },
  { icon: ShieldCheck, label: "Vetted senior talent" },
  { icon: Sparkles, label: "AI copilot included" },
] as const;

export function HeroVariantB({
  prompt,
  setPrompt,
  onStartBuild,
  onGetDemo,
}: HeroVariantBProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onStartBuild();
    }
  };

  return (
    <section
      data-hero-variant="B-layout"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16 overflow-hidden"
    >
      {/* Soft gradient backdrop — distinct from the control hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative container max-w-3xl text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Your product team, on demand
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[68px] font-semibold leading-tight tracking-tight">
          Skip the hiring.
          <br className="hidden sm:block" />{" "}
          <span className="text-primary">Ship the product.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
          Describe what you want to build and we'll assemble a senior team —
          designers, engineers and PMs, backed by an AI copilot — that starts
          this week.
        </p>

        {/* Inline prompt-to-CTA bar */}
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:bg-background/80 sm:p-2 sm:shadow-lg sm:backdrop-blur">
            <Input
              type="text"
              placeholder="e.g. a booking app for my clinic..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-12 sm:h-12 flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 sm:px-4"
            />
            <Button
              onClick={onStartBuild}
              size="lg"
              className="h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 min-h-[44px]"
            >
              Build my team
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-3 flex justify-center">
            <Button
              variant="ghost"
              onClick={onGetDemo}
              className="rounded-full text-sm text-muted-foreground hover:text-foreground"
            >
              or book a 15-min demo →
            </Button>
          </div>
        </div>

        {/* Trust chips replace the control hero's three-step icons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
          {trustChips.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs sm:text-sm text-muted-foreground backdrop-blur"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroVariantB;
