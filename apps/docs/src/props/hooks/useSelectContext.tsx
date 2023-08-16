import { HookTable } from "@/components/hook-table"
import { HookDataMap } from "@/types/hooks"

const useSelectContextValues: HookDataMap = [
  {
    value: "selectedItems",
    type: "SelectItem[]",
    description:
      "All the selected items. Only populated in a multi-select context.",
  },
  {
    value: "clearSelectedItems",
    type: {
      type: "function",
      signature: "() => void",
    },
    description: "Clears all selected items, in a multi-select context.",
  },
  {
    value: "selectAll",
    type: {
      type: "function",
      signature: "() => void",
    },
    description: "Selects all available items, in a multi-select context.",
  },
  {
    value: "allSelected",
    type: "boolean",
    description:
      "Whether all available items are selected, in a multi-select context.",
  },
]

const Props = () => {
  return <HookTable props={useSelectContextValues} />
}

export default Props
