import { AllIcons } from "@/components/icon-display"
import { Text } from "@medusajs/ui"

export default async function Page() {
  return (
    <div>
      <h1 className="h1-docs text-ui-fg-base mb-2">Overview</h1>
      <Text className="text-ui-fg-subtle" size="large">
        Medusa UI is a React component library for building Medusa apps.
      </Text>
      <AllIcons />
    </div>
  )
}
