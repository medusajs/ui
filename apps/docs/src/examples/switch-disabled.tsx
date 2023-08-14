import { Label, Switch } from "@medusajs/ui"

export default function SwitchDisabled() {
  return (
    <div className="flex items-center gap-x-2">
      <Switch id="manage-inventory-disabled" diasbled={true} />
      <Label htmlFor="manage-inventory-disabled">Manage Inventory</Label>
    </div>
  )
}
