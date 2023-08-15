import preset from "@medusajs/ui-preset"
import path from "path"
import type { Config } from "tailwindcss"

// Get two levels up from require.resolve("@medusajs/ui")
const root = path.join(require.resolve("@medusajs/ui"), "../..")
const uiPath = path.join(root, "**/*.{js,ts,jsx,tsx,mdx}")

const config: Config = {
  presets: [preset as Config],
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/examples/**/*.{js,ts,jsx,tsx,mdx}",
    uiPath,
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          "2xl": "1400px",
        },
      },
      screens: {
        xs: "576px",
        lg: "992px",
        xl: "1419px",
        xxl: "1440px",
      },
      width: {
        sidebar: "280px",
        main: "calc(100% - 280px)",
        content: "calc(100% - 484px)",
        code: "468px",
      },
      height: {
        navbar: "57px",
      },
      maxWidth: {
        "main-content": "1140px",
        "main-content-hidden-sidebar": "1440px",
        xl: "1419px",
        xxl: "1440px",
      },
      minWidth: {
        xl: "1419px",
      },
    },
  },
}
export default config
