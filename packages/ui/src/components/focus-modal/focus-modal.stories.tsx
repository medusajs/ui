import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/button"
import {
  FocusModal,
  FocusModalBody,
  FocusModalContent,
  FocusModalHeader,
  FocusModalTrigger,
} from "./focus-modal"

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
        <FocusModalTrigger>
          <Button>Edit Variant</Button>
        </FocusModalTrigger>
        <FocusModalContent>
          <FocusModalHeader>
            <Button>Save</Button>
          </FocusModalHeader>
          <FocusModalBody></FocusModalBody>
        </FocusModalContent>
      </FocusModal>
    )
  },
}
