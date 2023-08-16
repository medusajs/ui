import { PropTable } from "@/components/props-table"
import { PropDataMap } from "@/types/props"

const selectItem: PropDataMap = [
  {
    prop: "item",
    type: {
      type: "object",
      name: "SelectItem",
      shape: "{ [k: string]: any }",
    },
  },
]

const Props = () => {
  return <PropTable props={selectItem} />
}

export default Props
