import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CareersPage from "./CareersPage";
import { jobListings } from "@/data/jobListings";

const renderPage = () =>
  render(
    <MemoryRouter>
      <CareersPage />
    </MemoryRouter>,
  );

describe("CareersPage", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: "Join Our Team" }),
    ).toBeInTheDocument();
  });

  it("renders a card for every job listing", () => {
    renderPage();
    for (const job of jobListings) {
      expect(screen.getByText(job.title)).toBeInTheDocument();
    }
  });

  it("links each listing to its detail route", () => {
    renderPage();
    const detailLinks = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"))
      .filter((href): href is string => href?.startsWith("/careers/") ?? false);
    // At least one detail link per listing should be present.
    for (const job of jobListings) {
      expect(detailLinks).toContain(`/careers/${job.id}`);
    }
  });
});
