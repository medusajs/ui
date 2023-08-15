import { PropDataMap } from "@/types/props"
import { PropTable } from "../components/props-table"

const inputProps: PropDataMap = [
  {
    prop: "size",
    type: {
      type: "enum",
      values: ["base", "small"],
    },
    defaultValue: "base",
  },
]

const Props = () => {
  return <PropTable props={inputProps} />
}

export default Props
