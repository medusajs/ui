import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../button"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
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
        <ModalTrigger asChild>
          <Button>Edit Variant</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Variant</ModalTitle>
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <Button>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  },
}
