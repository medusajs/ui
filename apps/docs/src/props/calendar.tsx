import { PropDataMap } from "@/types/props"
import { PropTable } from "../components/props-table"

const calendarProps: PropDataMap = [
  {
    prop: "mode",
    type: {
      type: "enum",
      values: ["single", "range"],
    },
    defaultValue: "single",
  },
  {
    prop: "showOutsideDays",
    type: "boolean",
    defaultValue: true,
  },
  {
    prop: "numberOfMonths",
    type: "number",
    defaultValue: 1,
  },
]

const Props = () => {
  return <PropTable props={calendarProps} />
}

export default Props
