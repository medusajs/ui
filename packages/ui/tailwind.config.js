/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        base: "#FFFFFF",
        "base-hover": "#F8F9FA",
        "base-active": "#F1F3F5",
        field: "#F8F9FA",
        "field-hover": "#F1F3F5",
        muted: "#E6E8EB",
        disabled: "#ECEEF0",
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
        interactive: "#0081F1",
      },
      ringColor: {
        interactive: "#0081F1",
      },
      borderColor: {
        base: "#E6E8EB",
        "neutral-button": "rgba(17, 24, 28, 0.16)",
        "colored-button": "rgba(17, 24, 28, 0.35)",
      },
      textColor: {
        default: "#11181C",
        disabled: "#C1C8CD",
        muted: "#889096",
        "on-color": "#FFFFFF",
      },
      boxShadowColor: {
        interactive: "#0081F1",
      },
      boxShadow: {
        high: "0px 4px 8px 0px rgba(17, 24, 28, 0.08), 0px 0px 0px 1px rgba(17, 24, 28, 0.08)",
      },
    },
  },
  plugins: [],
}
