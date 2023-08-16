import { PropTable } from "@/components/props-table"
import { PropDataMap } from "@/types/props"

const selectProps: PropDataMap = [
  {
    prop: "multi",
    type: "boolean",
    defaultValue: false,
  },
  {
    prop: "search",
    type: "boolean",
    defaultValue: false,
  },
  {
    prop: "onChange",
    type: {
      type: "function",
      signature:
        "(value: SelectItem) => void |\n(values: SelectItem[]) => void",
    },
  },
  {
    prop: "onSearch",
    type: {
      type: "function",
      signature: "(searchTerm: string) => void",
    },
  },
  {
    prop: "onScrollToBottom",
    type: {
      type: "function",
      signature: "() => void",
    },
  },
]

const Props = () => {
  return <PropTable props={selectProps} />
}

export default Props
