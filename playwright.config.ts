import { defineConfig, devices } from "@playwright/test";

// End-to-end smoke tests run against a production build served by `vite
// preview`. Playwright boots the server itself (building first) and tears it
// down when the run finishes.
const PORT = Number(process.env.E2E_PORT ?? 8963);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Serve a pre-built production bundle. `npm run pretest:e2e` (and the CI
  // workflow) run `vite build` first, so this only needs to boot the static
  // preview server — keeping the managed process a single, long-lived process.
  webServer: {
    command: `npm run preview -- --port ${PORT} --host 127.0.0.1 --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
