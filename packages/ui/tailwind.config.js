/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        base: "#FFFFFF",
        "base-hover": "#F8F9FA",
        "base-active": "#F1F3F5",
        disabled: "#ECEEF0",
        "button-brand": "#6E56CF",
        "button-brand-hover": "#644FC1",
        "button-brand-active": "#5746AF",
        "button-transparent": "transparent",
        "button-transparent-hover": "#F8F9FA",
        "button-transparent-active": "#F1F3F5",
        "button-neutral": "#FFFFFF",
        "button-neutral-hover": "#F8F9FA",
        "button-neutral-active": "#F1F3F5",
        "button-inverted": "#151718",
        "button-inverted-hover": "#202425",
        "button-inverted-active": "#26292B",
        "button-danger": "#E5484D",
        "button-danger-hover": "#DC3D43",
        "button-danger-active": "#CD2B31",
      },
      borderColor: {
        base: "#E6E8EB",
        "neutral-button": "rgba(17, 24, 28, 0.16)",
        "colored-button": "rgba(17, 24, 28, 0.35)",
      },
      textColor: {
        base: "#11181C",
        disabled: "#C1C8CD",
        "on-color": "#FFFFFF",
      },
    },
  },
  plugins: [],
}
