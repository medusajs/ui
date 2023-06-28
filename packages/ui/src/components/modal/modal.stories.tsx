import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./modal"

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => {
    return (
      <Modal>
        <ModalTrigger>
          <Button>Edit Variant</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Variant</ModalTitle>
            <ModalDescription>
              Make changes to your variant here and click save when you&apos;re
              done.
            </ModalDescription>
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  },
}
