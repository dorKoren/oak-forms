import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@oak-forms/shared": path.resolve(__dirname, "shared/src/index.ts"),
    },
  },
  test: {
    passWithNoTests: true,
    include: [
      "shared/**/*.test.ts",
      "server/**/*.test.ts",
      "client/**/*.test.{ts,tsx}",
    ],
    environmentMatchGlobs: [
      ["client/**/*.test.{ts,tsx}", "jsdom"],
      ["**", "node"],
    ],
  },
});
