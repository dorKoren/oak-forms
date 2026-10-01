import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // Root + workspace can resolve different Vite type versions; runtime is fine.
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ] as import("vite").PluginOption[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
