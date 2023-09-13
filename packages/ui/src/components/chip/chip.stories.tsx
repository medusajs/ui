import type { Meta, StoryObj } from "@storybook/react"

import { Chip } from "./chip"

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    children: "Chip",
  },
}
