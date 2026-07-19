import { test, expect } from "@playwright/test";

// Core user-facing flows for the TaaS marketing + product site. These run
// against a real production build served by vite preview.

test.describe("landing page", () => {
  test("loads and shows the TaaS hero", async ({ page }) => {
    await page.goto("/");
    // The site brands itself as "TaaS" / "Team as a Service".
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByText(/TaaS/i).first()).toBeVisible();
  });

  test("throws no uncaught page errors on load", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});

test.describe("careers flow", () => {
  test("careers page lists open roles", async ({ page }) => {
    await page.goto("/careers");
    await expect(
      page.getByRole("heading", { name: "Join Our Team" }),
    ).toBeVisible();
    // Each role card links to its detail route.
    const detailLinks = page.locator('a[href^="/careers/"]');
    await expect(detailLinks.first()).toBeVisible();
    expect(await detailLinks.count()).toBeGreaterThan(0);
  });

  test("clicking a role opens its detail page", async ({ page }) => {
    await page.goto("/careers");
    const firstDetail = page.locator('a[href^="/careers/"]').first();
    const href = await firstDetail.getAttribute("href");
    await firstDetail.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("personality test", () => {
  test("renders the first question", async ({ page }) => {
    await page.goto("/ptest");
    // The test shows a "Question 1 of N" progress indicator.
    await expect(page.getByText(/Question 1 of/i)).toBeVisible();
  });
});

test.describe("routing", () => {
  test("unknown route renders the not-found page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    // SPA serves 200 for the shell; the NotFound component renders the 404 UI.
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText(/404/).first()).toBeVisible();
  });
});
