import { PropDataMap } from "@/types/props"
import { PropTable } from "../components/props-table"

const timeInputProps: PropDataMap = [
  {
    prop: "hourCycle",
    type: {
      type: "enum",
      values: [12, 24],
    },
    defaultValue: undefined,
  },
]

const Props = () => {
  return <PropTable props={timeInputProps} />
}

export default Props
