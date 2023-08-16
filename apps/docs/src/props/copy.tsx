import { PropTable } from "@/components/props-table"
import { PropDataMap } from "@/types/props"

const copyProps: PropDataMap = [
  {
    prop: "content",
    type: "string",
  },
]

const Props = () => {
  return <PropTable props={copyProps} />
}

export default Props
