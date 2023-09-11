import { BuildingStorefront, CurrencyDollar, Tools } from "@medusajs/icons"
import { Button, FocusModal, ProgressTabs } from "@medusajs/ui"

export default function FocusModalWithTabsDemo() {
  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button>Edit Variant</Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <ProgressTabs defaultValue="general">
          <FocusModal.Header>
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
            <Button>Save</Button>
          </FocusModal.Header>
          <FocusModal.Body className="text-ui-fg-muted">
            <ProgressTabs.Content value="general" className="h-full">
              <Tools />
            </ProgressTabs.Content>
            <ProgressTabs.Content value="prices" className="h-full">
              <CurrencyDollar />
            </ProgressTabs.Content>
            <ProgressTabs.Content value="inventory" className="h-full">
              <BuildingStorefront />
            </ProgressTabs.Content>
          </FocusModal.Body>
        </ProgressTabs>
      </FocusModal.Content>
    </FocusModal>
  )
}
