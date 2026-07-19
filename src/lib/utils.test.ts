import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (className merge helper)", () => {
  it("joins plain class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("applies conditional object syntax", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("de-duplicates conflicting tailwind utilities, keeping the last", () => {
    // tailwind-merge should resolve px-2 vs px-4 to px-4.
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("merges conflicting colors keeping the later declaration", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("flattens array inputs", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c");
  });
});
