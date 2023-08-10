import preset from "@medusajs/ui-preset"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [preset as Config],
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    require.resolve("@medusajs/ui"),
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
}
export default config
