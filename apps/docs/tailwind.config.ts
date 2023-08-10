import preset from "@medusajs/ui-preset"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [preset as Config],
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/examples/**/*.{js,ts,jsx,tsx,mdx}",
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
