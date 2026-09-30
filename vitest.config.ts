import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
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
