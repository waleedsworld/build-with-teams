
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidePanel } from "@/components/SidePanel";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background p-4">
      <div className="flex items-center justify-between">
        <a href="/" className="font-normal text-2xl">TaaS</a>
        <div className="flex items-center gap-4">
          <SidePanel />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
