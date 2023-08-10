import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  banner: {
    js: "'use client'",
  },
  outDir: "build",
  tsconfig: "./tsconfig.build.json",
  ...options,
}))
