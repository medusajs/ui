import { Effect } from "@medusajs/figma-api"
import { colorToRGBA } from "./colors"

function createDropShadowVariable(effects: Effect[]) {
  const shadows = effects.filter(
    (effect) => effect.type === "DROP_SHADOW" || effect.type === "INNER_SHADOW"
  )

  if (shadows.length === 0) {
    return null
  }

  const value = shadows
    .map((shadow) => {
      const { color, offset, radius, spread, type } = shadow

      const x = offset?.x ?? 0
      const y = offset?.y ?? 0

      const b = radius
      const s = spread ?? 0

      const c = color ? colorToRGBA(color) : ""

      const t = type === "INNER_SHADOW" ? "inset" : ""

      return `${x}px ${y}px ${b}px ${s}px ${c} ${t}`.trim()
    })
    .join(", ")

  if (value.length === 0) {
    return null
  }

  return value
}

export { createDropShadowVariable }
