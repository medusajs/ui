import { ProgressTabs } from "@medusajs/ui"

export default function ProgressTabsDemo() {
  return (
    <div className="h-full w-full p-4">
      <ProgressTabs defaultValue="general">
        <ProgressTabs.List className="w-full">
          <ProgressTabs.Trigger value="general">
            <ProgressTabs.Indicator status="completed" />
            General
          </ProgressTabs.Trigger>
          <ProgressTabs.Trigger value="prices">
            <ProgressTabs.Indicator status="in_progress" />
            Prices
          </ProgressTabs.Trigger>
          <ProgressTabs.Trigger value="inventory" disabled>
            <ProgressTabs.Indicator status="not_started" />
            Inventory
          </ProgressTabs.Trigger>
        </ProgressTabs.List>
        <div className="txt-compact-medium text-ui-fg-base mt-4 p-3">
          <ProgressTabs.Content value="general" className="h-full">
            General content
          </ProgressTabs.Content>
          <ProgressTabs.Content value="prices" className="h-full">
            Prices content
          </ProgressTabs.Content>
          <ProgressTabs.Content value="inventory" className="h-full">
            Inventory content
          </ProgressTabs.Content>
        </div>
      </ProgressTabs>
    </div>
  )
}
