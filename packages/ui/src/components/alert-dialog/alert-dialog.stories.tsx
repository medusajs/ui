import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/button"
import { AlertDialog } from "./alert-dialog"

const meta: Meta<typeof AlertDialog.Root> = {
  title: "Components/AlertDialog",
  component: AlertDialog.Root,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof AlertDialog.Root>

export const Default: Story = {
  render: () => {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button>Open</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete something</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure? This cannot be undone.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    )
  },
}
