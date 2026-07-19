import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vitest configuration for unit + component tests.
// End-to-end tests live in tests/e2e and are driven by Playwright, so we
// exclude them here to avoid Vitest trying to execute Playwright specs.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", "tests/e2e/**"],
    coverage: {
      provider: "v8",
      include: [
        "src/lib/**",
        "src/data/**",
        "src/components/career/**",
      ],
      reporter: ["text", "html"],
    },
  },
});
