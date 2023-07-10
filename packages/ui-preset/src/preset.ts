import type { Config } from "tailwindcss"

import plugin from "./plugin"

const preset = {
  content: [],
  plugins: [plugin, require("tailwindcss-animate")],
} satisfies Config

export { preset }
