import { Button, Copy, Code } from "@medusajs/ui"

export default function CopyDemo() {
  return (
    <div className="flex items-center gap-x-8">
      <Code>yarn add @medusajs/ui</Code>
      <Copy content="yarn add @medusajs/ui">
        <Button>Copy this snippet</Button>
      </Copy>
    </div>
  )
}
