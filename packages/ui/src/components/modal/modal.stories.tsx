import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/button"
import { Modal } from "./modal"

const meta: Meta<typeof Modal.Root> = {
  title: "Components/Modal",
  component: Modal.Root,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => {
    return (
      <Modal.Root>
        <Modal.Trigger asChild>
          <Button>Edit Variant</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Edit Variant</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button variant="secondary">Cancel</Button>
            </Modal.Close>
            <Button>Save</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    )
  },
}
