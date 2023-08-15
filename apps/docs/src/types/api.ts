export type EnumType = {
  type: "enum"
  values: string[]
}

type PropType = "string" | "number" | "boolean" | "array" | EnumType | string

export type PropData = {
  prop: string
  type: PropType
  defaultValue?: string
}

export type PropDataMap = PropData[]
