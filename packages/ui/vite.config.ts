/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import pkg from "./package.json"

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      staticImport: true,
      rollupTypes: false,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@/components": "/src/components",
      "@/hooks": "/src/hooks",
      "@/utils": "/src/utils",
    },
  },
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].mjs",
          exports: "named",
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          exports: "named",
        },
      ],
    },
  },
  test: {
    setupFiles: "./setup-test.ts",
    coverage: {
      all: true,
      reporter: ["lcov", "text"],
      include: ["src/**"],
      exclude: ["**/*.stories.tsx"],
    },
    globals: true,
    environment: "happy-dom",
    css: false,
  },
})
