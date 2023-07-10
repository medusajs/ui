import plugin from "tailwindcss/plugin"
import { theme } from "./theme/extension/theme"
import { colors } from "./theme/tokens/colors"
import { components } from "./theme/tokens/components"
import { effects } from "./theme/tokens/effects"

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
