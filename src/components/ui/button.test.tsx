import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders its children as a native button by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn.tagName).toBe("BUTTON");
  });

  it("fires onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Nope" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "bg-destructive",
    );
  });

  it("renders as a child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/somewhere">Link button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link button" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/somewhere");
  });
});
