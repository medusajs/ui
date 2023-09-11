import { PropTable } from "@/components/props-table"
import { PropDataMap } from "@/types/props"

const iconBadgeProps: PropDataMap = [
  {
    prop: "color",
    type: {
      type: "enum",
      values: ["green", "red", "blue", "orange", "grey", "purple"],
    },
    defaultValue: "grey",
  },
  {
    prop: "size",
    type: {
      type: "enum",
      values: ["base", "large"],
    },
    defaultValue: "base",
  },
]

const Props = () => {
  return <PropTable props={iconBadgeProps} />
}

export default Props
