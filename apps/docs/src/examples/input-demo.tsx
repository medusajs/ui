import { Input, Label } from "@medusajs/ui"

export default function InputDemo() {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <Label htmlFor="sales-channel-name">Name</Label>
      <Input placeholder="Sales Channel Name" id="sales-channel-name" />
    </div>
  )
}
