import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/button"
import { Toaster } from "../../components/toaster/toaster"
import { Toast, useToast } from "./use-toast"

const Demo = () => {
  const { toast } = useToast()

  const handleUndo = async () => {
    // Wait 3 seconds then resolve with true
    const confirmed = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })

    return confirmed
  }

  const handleSchedule = () => {
    const onAction = async (
      id: string,
      fn: (update: Partial<Toast>) => void
    ) => {
      fn({
        title: "Sending",
        description: "Removing post from queue.",
        variant: "loading",
        action: undefined,
      })

      const confirmed = await handleUndo().then((confirmed) => {
        if (confirmed) {
          fn({
            title: "Sent",
            description: "Your post has been sent.",
            variant: "success",
          })
        } else {
          fn({
            title: "Error",
            description: "Your post was not sent.",
            variant: "error",
          })
        }
      })
    }

    const t = toast({
      title: "Scheduled",
      description: "Your post has been scheduled for 12:00 PM",
      variant: "success",
      action: {
        label: "Undo",
        onClick: () => onAction(t.id, t.update),
        altText: "Undo scheduling post",
      },
    })
  }

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <Button onClick={handleSchedule}>Schedule</Button>
      <Toaster />
    </div>
  )
}

const meta: Meta<typeof Demo> = {
  title: "Hooks/useToast",
  component: Demo,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Demo>

export const Default: Story = {}
