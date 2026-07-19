import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidePanel } from "@/components/SidePanel";

export function Navigation() {
  // Header stays transparent over the hero, then settles into a frosted-glass
  // bar once the visitor starts scrolling — a small cue that adds depth.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={[
        "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6",
        "transition-all duration-300 ease-out",
        scrolled
          ? "glass-nav py-2.5 shadow-[0_4px_24px_-12px_hsl(var(--foreground)/0.25)]"
          : "bg-transparent py-4",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="group inline-flex items-center gap-2 text-2xl font-semibold tracking-tight press"
          aria-label="TaaS home"
        >
          <span className="text-gradient transition-opacity group-hover:opacity-80">
            TaaS
          </span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-foreground/70 transition-transform duration-300 group-hover:scale-150"
          />
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <SidePanel />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
