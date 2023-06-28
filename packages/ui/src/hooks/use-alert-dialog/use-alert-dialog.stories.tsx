import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/button"
import { useAlertDialog } from "./use-alert-dialog"

type DemoProps = {
  verificationText?: string
}

const Demo = ({ verificationText }: DemoProps) => {
  const dialog = useAlertDialog()

  const handleDangerousAction = async () => {
    const confirmed = await dialog({
      title: "Delete Product",
      description:
        "Are you sure you want to delete this product? This action cannot be undone.",
      verificationText,
    })

    if (confirmed) {
      alert("Product deleted")
    } else {
      alert("Product not deleted")
    }

    return
  }

  return (
    <Button variant="danger" onClick={handleDangerousAction}>
      Delete Product
    </Button>
  )
}

const meta: Meta<typeof useAlertDialog> = {
  title: "Hooks/useAlertDialog",
  component: Demo,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Demo>

export const Default: Story = {}

export const WithVerificationText: Story = {
  args: {
    verificationText: "product",
  },
}
