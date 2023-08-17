import plugin from "tailwindcss/plugin"
import { FONT_FAMILY_MONO, FONT_FAMILY_SANS } from "./constants"
import { theme } from "./theme/extension/theme"
import { colors } from "./theme/tokens/colors"
import { components } from "./theme/tokens/components"
import { effects } from "./theme/tokens/effects"
import { typography } from "./theme/tokens/typography"

export default plugin(
  function medusaUi({ addBase, addComponents, config }) {
    const [darkMode, className = ".dark"] = ([] as string[]).concat(
      config("darkMode", "media")
    )

    addBase({
      "*": {
        borderColor: "var(--border-base)",
      },
    })

    addComponents(components)
    addComponents(typography)

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
    theme: {
      extend: {
        ...theme.extend,
        fontFamily: {
          sans: FONT_FAMILY_SANS,
          mono: FONT_FAMILY_MONO,
        },
        transitionProperty: {
          fg: "color, background-color, border-color, box-shadow",
        },
      },
    },
  }
)
