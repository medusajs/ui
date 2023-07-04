import plugin from "tailwindcss/plugin"

export default plugin(
  ({ addBase, config, theme }) => {
    addBase({
      body: {
        color: config("theme.colors.fg.DEFAULT"),
      },
    })

    addBase({
      "*": {
        borderColor: theme("colors.border.DEFAULT"),
      },
    })
  },
  () => {
    return {
      theme: {
        extends: {
          colors: {
            fg: {
              DEFAULT: "#000",
              subtle: "#000",
              muted: "#000",
              disabled: "#000",
              error: "#000",
              "on-color": "#000",
              inverted: "#000",
              interactive: "#000",
              "interactive-hover": "#000",
            },
          },
        },
      },
    }
  }
)
