import { PropDataMap } from "@/types/props"
import { PropTable } from "../components/props-table"

const hintProps: PropDataMap = [
  {
    prop: "variant",
    type: {
      type: "enum",
      values: ["info", "error"],
    },
    defaultValue: "info",
  },
]

const Props = () => {
  return <PropTable props={hintProps} />
}

export default Props
