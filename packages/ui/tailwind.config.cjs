const preset = require("@medusajs/ui-preset")

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class", // or 'media' or 'class
}
