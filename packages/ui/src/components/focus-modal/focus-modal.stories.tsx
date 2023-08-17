import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/button"
import { FocusModal } from "./focus-modal"

const meta: Meta<typeof FocusModal.Root> = {
  title: "Components/FocusModal",
  component: FocusModal.Root,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof FocusModal.Root>

export const Default: Story = {
  render: () => {
    return (
      <FocusModal.Root>
        <FocusModal.Trigger asChild>
          <Button>Edit Variant</Button>
        </FocusModal.Trigger>
        <FocusModal.Content>
          <FocusModal.Header>
            <Button>Save</Button>
          </FocusModal.Header>
          <FocusModal.Body></FocusModal.Body>
        </FocusModal.Content>
      </FocusModal.Root>
    )
  },
}
