import { PropDataMap } from "@/types/props"
import { PropTable } from "../components/props-table"

const labelProps: PropDataMap = [
  {
    prop: "size",
    type: {
      type: "enum",
      values: ["xsmall", "small", "base", "large"],
    },
    defaultValue: "base",
  },
  {
    prop: "weight",
    type: {
      type: "enum",
      values: ["regular", "plus"],
    },
    defaultValue: "regular",
  },
]

const Props = () => {
  return <PropTable props={labelProps} />
}

export default Props
