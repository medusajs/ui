import { PropDataMap } from "@/types/props"
import { PropTable } from "../components/props-table"

const switchProps: PropDataMap = [
  {
    prop: "size",
    type: {
      type: "enum",
      values: ["small", "base"],
    },
    defaultValue: "base",
  },
]

const Props = () => {
  return <PropTable props={switchProps} />
}

export default Props
