import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  timeout: 180_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  reporter: [["list"]],
  outputDir: process.env.VISUAL_QA_OUTPUT || "/tmp/hepburn-visual-qa/test-results",
  use: {
    baseURL: process.env.VISUAL_QA_BASE_URL || "http://localhost:3002",
    browserName: "chromium",
    launchOptions: process.platform === "darwin" ? { executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" } : undefined,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
