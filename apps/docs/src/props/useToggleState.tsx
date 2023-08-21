import { PropTable } from "@/components/props-table"
import { PropDataMap } from "@/types/props"

const useToggleStateProps: PropDataMap = [
  {
    prop: "initial",
    type: "boolean",
    defaultValue: false,
  },
]

const Props = () => {
  return <PropTable props={useToggleStateProps} />
}

export default Props
