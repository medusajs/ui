/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [dts(), react()],
  resolve: {
    alias: {
      "@/components": "/src/components",
      "@/hooks": "/src/hooks",
      "@/utils": "/src/utils",
    },
  },
  test: {
    setupFiles: "./setup-test.ts",
    coverage: {
      all: true,
      reporter: ["lcov", "text"],
      include: ["src/**"],
      exclude: ["**/*.stories.tsx", "**/index.ts"], // exclude stories and index files
    },
    globals: true,
    environment: "jsdom",
    css: false,
  },
})
