import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckSquare,
  DollarSign,
  Home,
  Info,
  LayoutDashboard,
  LayoutGrid,
  ListChecks,
  Monitor,
  Moon,
  Sun,
  User,
} from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  keywords?: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/", icon: Home, keywords: ["landing", "start", "taas"] },
  { label: "Workspace", to: "/workspace", icon: LayoutGrid, keywords: ["board", "project"] },
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, keywords: ["employee", "worker", "metrics"] },
  { label: "Calendar", to: "/calendar", icon: Calendar, keywords: ["schedule", "events"] },
  { label: "Tasks", to: "/task", icon: CheckSquare, keywords: ["todo", "ticket"] },
  { label: "Team Member", to: "/person", icon: User, keywords: ["profile", "people"] },
  { label: "Pricing", to: "/pricing", icon: DollarSign, keywords: ["plans", "cost", "billing"] },
  { label: "About", to: "/about", icon: Info, keywords: ["company", "story"] },
  { label: "Careers", to: "/careers", icon: Briefcase, keywords: ["jobs", "hiring", "roles"] },
  { label: "Personality Test", to: "/ptest", icon: ListChecks, keywords: ["quiz", "assessment"] },
];

/**
 * A global command palette. Press Cmd/Ctrl+K (or "/") anywhere to open a
 * searchable launcher for jumping between pages and switching themes —
 * keyboard-first navigation without hunting through the menu.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // "/" is a familiar "focus search" shortcut, but only when the user
      // isn't already typing into a field.
      if (e.key === "/" && !isTyping && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runAction = useCallback((action: () => void) => {
    setOpen(false);
    // Defer so the dialog's close animation doesn't fight the navigation.
    requestAnimationFrame(action);
  }, []);

  const themeActions = useMemo(
    () => [
      { label: "Light theme", value: "light" as const, icon: Sun },
      { label: "Dark theme", value: "dark" as const, icon: Moon },
      { label: "System theme", value: "system" as const, icon: Monitor },
    ],
    []
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command menu</DialogTitle>
      <CommandInput placeholder="Search pages or type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.to}
              value={`${item.label} ${(item.keywords ?? []).join(" ")}`}
              onSelect={() => runAction(() => navigate(item.to))}
            >
              <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{item.label}</span>
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity data-[selected=true]:opacity-100 group-aria-selected:opacity-100" />
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Appearance">
          {themeActions.map((t) => (
            <CommandItem
              key={t.value}
              value={`theme ${t.label}`}
              onSelect={() => runAction(() => setTheme(t.value))}
            >
              <t.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{t.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-end gap-1 border-t px-3 py-2 text-xs text-muted-foreground">
        <span>Toggle with</span>
        <CommandShortcut className="ml-0 rounded border px-1.5 py-0.5">⌘K</CommandShortcut>
      </div>
    </CommandDialog>
  );
}
