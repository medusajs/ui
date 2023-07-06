import plugin from "tailwindcss/plugin"
import { theme } from "./extension/theme"
import { colors } from "./tokens/colors"
import { components } from "./tokens/components"

export default plugin(
  function medusaUi({ addBase, addComponents, config, theme }) {
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
      ":root": colors.light,
    })

    if (darkMode === "class") {
      addBase({
        [className]: colors.dark,
      })
    } else {
      addBase({
        "@media (prefers-color-scheme: dark)": {
          ":root": colors.dark,
        },
      })
    }
  },
  {
    theme: theme,
  }
)
