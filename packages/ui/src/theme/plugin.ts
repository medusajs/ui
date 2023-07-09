import plugin from "tailwindcss/plugin"
import { theme } from "./extension/theme"
import { colors } from "./tokens/colors"
import { components } from "./tokens/components"
import { effects } from "./tokens/effects"

export default plugin(
  function medusaUi({ addBase, addComponents, addUtilities, config, theme }) {
    const [darkMode, className = ".dark"] = ([] as string[]).concat(
      config("darkMode", "media")
    )

    addBase({
      body: {
        color: config("theme.colors.ui.fg.base"),
      },
      "*": {
        borderColor: theme("colors.ui.border.base"),
      },
    })

    addComponents(components)

    addUtilities({
      ".btn-mix": {
        // CSS selector that applies a style if the last child is a svg
        "&:last-child:is(svg)": {
          paddingRight: "0.5rem",
        },
      },
    })

    addBase({
      ":root": { ...colors.light, ...effects.light },
    })

    if (darkMode === "class") {
      addBase({
        [className]: { ...colors.dark, ...effects.dark },
      })
    } else {
      addBase({
        "@media (prefers-color-scheme: dark)": {
          ":root": { ...colors.dark, ...effects.dark },
        },
      })
    }
  },
  {
    theme: theme,
  }
)
