import { ComponentType, LazyExoticComponent } from "react"

export type EnumType = {
  type: "enum"
  values: (string | number | boolean)[]
}

type PropType = "string" | "number" | "boolean" | "array" | EnumType | string

export type PropData = {
  prop: string
  type: PropType
  defaultValue?: string | number | boolean | null
}

export type PropDataMap = PropData[]

export type PropRegistryItem = {
  table: LazyExoticComponent<ComponentType>
}
