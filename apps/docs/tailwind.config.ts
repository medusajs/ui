import preset from "@medusajs/ui-preset"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [preset as Config],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    require.resolve("@medusajs/ui"),
  ],
}
export default config
