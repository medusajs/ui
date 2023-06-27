import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: "brand",
    size: "md",
    children: "Action",
  },
}

export const Disabled: Story = {
  args: {
    variant: "brand",
    size: "md",
    children: "Action",
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    variant: "brand",
    size: "md",
    children: [
      "Action",
      <span key={1} className="w-5 h-5 flex items-center justify-center">
        x
      </span>,
    ],
  },
}
