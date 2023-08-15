"use client"

import { useTheme } from "next-themes"
import { colors as allColors } from "../../../../packages/ui-preset/src/theme/tokens/colors"
import React from "react"
import { Copy, clx } from "@medusajs/ui"

type Color = {
  name: string
  code: string
}

type ColorsTable = {
  backgrounds: Color[]
  foregrounds: Color[]
  borders: Color[]
  buttons: Color[]
  code: Color[]
  tags: Color[]
}

const PREFIXES: { [k: string]: keyof ColorsTable } = {
  "--bg": "backgrounds",
  "--fg": "foregrounds",
  "--border": "borders",
  "--button": "buttons",
  "--code": "code",
  "--tag": "tags",
}

interface ColorBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  colour: Color
}

const ColorBlock = ({ colour, className, ...props }: ColorBlockProps) => {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <div
        className={
          "border-ui-border-base h-[48px] w-[48px] rounded-lg border p-1"
        }
      >
        <div
          className={clx("h-full w-full rounded-[4px]", className)}
          style={{ background: colour.code }}
          {...props}
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="txt-compact-xsmall-plus text-ui-fg-base text-start">
          {cssVarToTailwindClass(colour.name)}
        </p>
        <p className="txt-compact-xsmall text-ui-fg-subtle">{colour.code}</p>
      </div>
    </div>
  )
}

const cssVarToTailwindClass = (name: string) => {
  if (name.startsWith("--bg") || name.startsWith("--button"))
    return name.replace("-", "bg-ui")

  if (name.startsWith("--fg")) return name.replace("-", "text-ui")

  if (name.startsWith("--border")) return name.replace("-", "border-ui")

  if (name.startsWith("--tag") || name.startsWith("--code")) {
    if (name.includes("bg")) return name.replace("-", "bg-ui")
    if (name.includes("border")) return name.replace("-", "border-ui")
    if (name.includes("icon") || name.includes("text"))
      return name.replace("-", "text-ui")
  }

  return name
}

const Colors = () => {
  const { theme } = useTheme()

  const mode = React.useMemo(
    () => (theme === "light" ? "light" : "dark"),
    [theme]
  )

  const colors: ColorsTable = {
    backgrounds: [],
    foregrounds: [],
    borders: [],
    buttons: [],
    code: [],
    tags: [],
  }

  for (const [tag, value] of Object.entries(allColors[mode])) {
    let prefix = tag.match(/(--[a-zA-Z]+)/gi)
    if (prefix && Object.keys(PREFIXES).includes(prefix[0])) {
      if (!tag.includes("gradient"))
        colors[PREFIXES[prefix[0]]].push({
          name: tag,
          code: value,
        })
    }
  }

  for (let [, section] of Object.entries(colors)) {
    section.sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  return (
    <div>
      {Object.entries(colors).map(([section, colors]) => (
        <div className="mb-16" key={`colours-section-${section}`}>
          <h2 className="h2-docs mb-4 mt-10">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </h2>
          <hr className="mb-4" />
          <div className="mb-8 grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((colour) => (
              <Copy
                content={cssVarToTailwindClass(colour.name)}
                key={`colours-section-${section}-${colour.name}`}
              >
                <ColorBlock colour={colour} />
              </Copy>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Colors }
