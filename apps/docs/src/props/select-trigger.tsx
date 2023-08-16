import { PropTable } from "@/components/props-table"
import { PropDataMap } from "@/types/props"

const selectTriggerProps: PropDataMap = [
  {
    prop: "size",
    type: {
      type: "enum",
      values: ["small", "regular"],
    },
    defaultValue: "regular",
  },
]

const Props = () => {
  return <PropTable props={selectTriggerProps} />
}

export default Props
