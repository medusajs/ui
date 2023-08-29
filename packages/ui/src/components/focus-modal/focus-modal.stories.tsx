import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/button"
import {
  BuildingStorefront,
  CircleDottedLine,
  CurrencyDollar,
  Tools,
} from "@medusajs/icons"
import { FocusModal } from "./focus-modal"

const meta: Meta<typeof FocusModal> = {
  title: "Components/FocusModal",
  component: FocusModal,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof FocusModal>

export const Default: Story = {
  render: () => {
    return (
      <FocusModal>
        <FocusModal.Trigger asChild>
          <Button>Edit Variant</Button>
        </FocusModal.Trigger>
        <FocusModal.Content>
          <FocusModal.Header>
            <Button>Save</Button>
          </FocusModal.Header>
          <FocusModal.Body></FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    )
  },
}

export const WithTabs: Story = {
  render: () => {
    return (
      <FocusModal defaultTab="general">
        <FocusModal.Trigger asChild>
          <Button>Edit Variant</Button>
        </FocusModal.Trigger>
        <FocusModal.Content>
          <FocusModal.Header>
            <FocusModal.TabsList>
              <FocusModal.TabsTrigger
                value="general"
                className="group/general flex items-center gap-x-2"
              >
                <CircleDottedLine className="text-ui-fg-muted group-data-[state='active']/general:text-ui-fg-interactive group-data-[state='active']/general:hover:text-ui-fg-interactive" />
                General
              </FocusModal.TabsTrigger>
              <FocusModal.TabsTrigger
                value="prices"
                className="group/prices flex items-center gap-x-2"
              >
                <CircleDottedLine className="text-ui-fg-muted group-data-[state='active']/prices:text-ui-fg-interactive group-data-[state='active']/prices:hover:text-ui-fg-interactive" />
                Prices
              </FocusModal.TabsTrigger>
              <FocusModal.TabsTrigger
                value="inventory"
                disabled
                className="group/inventory flex items-center gap-x-2"
              >
                <CircleDottedLine className="text-ui-fg-muted group-data-[state='active']/inventory:text-ui-fg-interactive group-data-[state='active']/inventory:hover:text-ui-fg-interactive" />
                Inventory
              </FocusModal.TabsTrigger>
            </FocusModal.TabsList>
            <Button>Save</Button>
          </FocusModal.Header>
          <FocusModal.Body className="text-ui-fg-muted">
            <FocusModal.TabsContent value="general" className="h-full">
              <div className="flex h-full w-full items-center justify-center">
                <Tools />
              </div>
            </FocusModal.TabsContent>
            <FocusModal.TabsContent value="prices" className="h-full">
              <div className="flex h-full w-full items-center justify-center">
                <CurrencyDollar />
              </div>
            </FocusModal.TabsContent>
            <FocusModal.TabsContent value="inventory" className="h-full">
              <div className="flex h-full w-full items-center justify-center">
                <BuildingStorefront />
              </div>
            </FocusModal.TabsContent>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    )
  },
}
